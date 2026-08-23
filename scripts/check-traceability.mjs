#!/usr/bin/env node
/**
 * Advisory traceability check: intent→domain→task links + plan↔DoD cross-refs.
 *
 * Usage:
 *   node scripts/check-traceability.mjs --project <root> [--plan <path>] [--dod <path>] [--strict]
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  let projectRoot = process.cwd();
  let planPath = null;
  let dodPath = null;
  let strict = false;

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project" && argv[i + 1]) {
      const p = argv[++i];
      projectRoot = isAbsolute(p) ? p : resolve(process.cwd(), p);
    } else if (argv[i] === "--plan" && argv[i + 1]) {
      const p = argv[++i];
      planPath = isAbsolute(p) ? p : resolve(process.cwd(), p);
    } else if (argv[i] === "--dod" && argv[i + 1]) {
      const p = argv[++i];
      dodPath = isAbsolute(p) ? p : resolve(process.cwd(), p);
    } else if (argv[i] === "--strict") strict = true;
    else if (argv[i] === "--help") {
      console.log(`
Usage: npm run check:traceability -- [--project <root>] [--plan <path>] [--dod <path>] [--strict]
`);
      process.exit(0);
    }
  }

  if (!planPath) {
    const local = join(projectRoot, ".agents/plan-progress.yaml");
    const example = join(ROOT, "agents/examples/plan-research-spec-impl.example.yaml");
    planPath = existsSync(local) ? local : example;
  }

  return { projectRoot, planPath, dodPath, strict };
}

function parseYaml(path) {
  return YAML.parse(readFileSync(path, "utf8"));
}

function resolveDodPath(projectRoot, plan, explicitDod) {
  if (explicitDod) return explicitDod;

  const fw = plan.flow_weight ?? "中";
  const candidates = [
    join(projectRoot, "agents/packs/minimal-research-to-spec/templates/dod.yaml"),
    join(projectRoot, "packs/minimal-research-to-spec/templates/dod.yaml"),
    join(ROOT, `docs/templates/dod-${fw}.yaml`),
  ];

  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

function collectIds(plan) {
  const workItemIds = new Set((plan.plan?.work_items ?? []).map((w) => w.id));
  const milestoneIds = new Set((plan.plan?.milestones ?? []).map((m) => m.id));
  const domainIds = new Set((plan.traceability?.domain_concepts ?? []).map((d) => d.id));
  return { workItemIds, milestoneIds, domainIds };
}

function runCheck({ planPath, dodPath, strict }) {
  const plan = parseYaml(planPath);
  const dodFile = resolveDodPath(dirname(planPath), plan, dodPath);
  const issues = [];
  const warnings = [];

  if (!dodFile) {
    warnings.push(`no DoD template found for flow_weight=${plan.flow_weight ?? "中"}; skipping DoD cross-ref checks`);
  }

  const dod =
    dodFile && existsSync(dodFile) ? parseYaml(dodFile) : { dod: { checklist: [] } };
  const checklistIds = new Set((dod.dod?.checklist ?? []).map((c) => c.id));
  const { workItemIds, milestoneIds, domainIds } = collectIds(plan);

  for (const link of plan.traceability?.links ?? []) {
    if (!domainIds.has(link.domain_concept_id)) {
      issues.push(`traceability link: unknown domain_concept_id ${link.domain_concept_id}`);
    }
    if (!workItemIds.has(link.work_item_id)) {
      issues.push(`traceability link: unknown work_item_id ${link.work_item_id}`);
    }
  }

  for (const wi of plan.plan?.work_items ?? []) {
    for (const dc of wi.domain_concept_ids ?? []) {
      if (!domainIds.has(dc)) {
        issues.push(`work_item ${wi.id}: unknown domain_concept_id ${dc}`);
      }
    }
    for (const cid of wi.dod_checklist_ids ?? []) {
      if (checklistIds.size && !checklistIds.has(cid)) {
        issues.push(`work_item ${wi.id}: unknown dod_checklist_id ${cid}`);
      }
    }
  }

  for (const ms of plan.plan?.milestones ?? []) {
    for (const cid of ms.dod_checklist_ids ?? []) {
      if (checklistIds.size && !checklistIds.has(cid)) {
        issues.push(`milestone ${ms.id}: unknown dod_checklist_id ${cid}`);
      }
    }
  }

  for (const item of dod.dod?.checklist ?? []) {
    const refs = item.plan_refs ?? {};
    for (const mid of refs.milestone_ids ?? []) {
      if (!milestoneIds.has(mid)) {
        issues.push(`DoD checklist ${item.id}: unknown plan_refs.milestone_id ${mid}`);
      }
    }
    for (const wid of refs.work_item_ids ?? []) {
      if (!workItemIds.has(wid)) {
        issues.push(`DoD checklist ${item.id}: unknown plan_refs.work_item_id ${wid}`);
      }
    }
  }

  if (strict && !plan.traceability?.domain_concepts?.length) {
    issues.push("strict: traceability.domain_concepts required");
  }

  return { planPath, dodFile, issues, warnings };
}

const args = parseArgs(process.argv.slice(2));
const result = runCheck({
  planPath: args.planPath,
  dodPath: args.dodPath,
  strict: args.strict,
});

console.log(`plan: ${result.planPath}`);
if (result.dodFile) console.log(`dod:  ${result.dodFile}`);

for (const w of result.warnings) console.log(`⚠ ${w}`);
for (const i of result.issues) console.log(`✗ ${i}`);

if (result.issues.length === 0) {
  console.log("✓ traceability check passed (advisory)");
  process.exit(0);
}

console.log(`\n${result.issues.length} issue(s)`);
process.exit(args.strict ? 1 : 0);
