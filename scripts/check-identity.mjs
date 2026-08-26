#!/usr/bin/env node
/**
 * Advisory identity-constraint check: cleared identity blockers must carry evidence.
 *
 * Usage:
 *   node scripts/check-identity.mjs --project <root> [--plan <path>] [--strict]
 *
 * Not wired into CI (same discipline as check:traceability).
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  let projectRoot = process.cwd();
  let planPath = null;
  let strict = false;

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project" && argv[i + 1]) {
      const p = argv[++i];
      projectRoot = isAbsolute(p) ? p : resolve(process.cwd(), p);
    } else if (argv[i] === "--plan" && argv[i + 1]) {
      const p = argv[++i];
      planPath = isAbsolute(p) ? p : resolve(process.cwd(), p);
    } else if (argv[i] === "--strict") strict = true;
    else if (argv[i] === "--help") {
      console.log(`
Usage: npm run check:identity -- [--project <root>] [--plan <path>] [--strict]
`);
      process.exit(0);
    }
  }

  if (!planPath) {
    const local = join(projectRoot, ".agents/plan-progress.yaml");
    const example = join(ROOT, "agents/examples/plan-research-spec-impl.example.yaml");
    planPath = existsSync(local) ? local : example;
  }

  return { projectRoot, planPath, strict };
}

function hasEvidence(ev) {
  if (ev == null) return false;
  if (typeof ev === "string") return ev.trim().length > 0;
  if (typeof ev === "object" && typeof ev.path === "string") {
    return ev.path.trim().length > 0;
  }
  return false;
}

function blockerStatus(b) {
  return b.status === "cleared" ? "cleared" : "open";
}

function runCheck({ planPath, strict }) {
  const plan = YAML.parse(readFileSync(planPath, "utf8"));
  const constraints = plan.identity_constraints ?? [];
  const mode = strict ? "strict" : "advisory";
  const issues = [];
  const warnings = [];

  console.log(`扶摇 · Nomad identity check (${mode})`);
  console.log(`plan: ${planPath}`);

  if (!Array.isArray(constraints) || constraints.length === 0) {
    console.log(`identity check passed (${mode}) — no identity_constraints (skip)`);
    return 0;
  }

  const constraintIds = new Set(constraints.map((c) => c.id).filter(Boolean));
  const blockers = plan.progress?.blockers ?? [];
  const completed = new Set(plan.progress?.completed_work_item_ids ?? []);

  let relatedAny = false;
  let anyEvidence = false;

  for (const b of blockers) {
    const related = (b.related_identity_constraint_ids ?? []).filter((id) =>
      constraintIds.has(id),
    );
    if (related.length === 0) continue;
    relatedAny = true;
    const st = blockerStatus(b);
    if (st === "cleared") {
      if (!hasEvidence(b.evidence)) {
        issues.push(
          `cleared identity blocker ${b.id ?? "(no id)"} missing evidence (related: ${related.join(", ")})`,
        );
      } else {
        anyEvidence = true;
      }
    }
    // open identity blockers are honest — OK
  }

  if (!relatedAny) {
    warnings.push(
      "identity_constraints present but no blocker references related_identity_constraint_ids; consider recording held evidence",
    );
    if (strict && completed.size > 0 && !anyEvidence) {
      issues.push(
        "strict: completed work_items present with identity_constraints but no cleared blocker evidence",
      );
    }
  }

  for (const w of warnings) console.log(`warn: ${w}`);
  for (const i of issues) console.log(`issue: ${i}`);

  if (issues.length === 0) {
    console.log(`identity check passed (${mode})`);
    return 0;
  }

  if (strict) {
    console.log(`identity check failed (${mode}) — ${issues.length} issue(s)`);
    return 1;
  }

  console.log(
    `identity check passed (${mode}) — ${issues.length} issue(s) recorded (non-fatal)`,
  );
  return 0;
}

const args = parseArgs(process.argv.slice(2));
process.exit(runCheck(args));
