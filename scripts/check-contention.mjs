#!/usr/bin/env node
/**
 * Advisory contention check: plan-progress + roster + git dirty files.
 *
 * Usage:
 *   node scripts/check-contention.mjs --project <root> [--strict]
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import YAML from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  let projectRoot = process.cwd();
  let planPath = null;
  let rosterPath = join(ROOT, "agents/examples/minimal-roster.yaml");
  let strict = false;

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project" && argv[i + 1]) {
      const p = argv[++i];
      projectRoot = isAbsolute(p) ? p : resolve(process.cwd(), p);
    } else if (argv[i] === "--plan" && argv[i + 1]) {
      const p = argv[++i];
      planPath = isAbsolute(p) ? p : resolve(process.cwd(), p);
    } else if (argv[i] === "--roster" && argv[i + 1]) {
      const p = argv[++i];
      rosterPath = isAbsolute(p) ? p : resolve(process.cwd(), p);
    } else if (argv[i] === "--strict") strict = true;
    else if (argv[i] === "--help") {
      console.log(`
Usage: npm run check:contention -- [--project <root>] [--plan <path>] [--roster <path>] [--strict]
`);
      process.exit(0);
    }
  }

  if (!planPath) {
    const local = join(projectRoot, ".agents/plan-progress.yaml");
    const example = join(ROOT, "agents/examples/plan-progress.example.yaml");
    planPath = existsSync(local) ? local : example;
  }

  return { projectRoot, planPath, rosterPath, strict };
}

function gitDirtyFiles(cwd) {
  const inside = spawnSync("git", ["rev-parse", "--is-inside-work-tree"], {
    cwd,
    encoding: "utf8",
  });
  if (inside.status !== 0 || inside.stdout.trim() !== "true") return null;

  const unstaged = spawnSync("git", ["diff", "--name-only"], { cwd, encoding: "utf8" });
  const staged = spawnSync("git", ["diff", "--cached", "--name-only"], { cwd, encoding: "utf8" });
  const files = new Set();
  for (const block of [unstaged.stdout, staged.stdout]) {
    for (const line of block.split("\n")) {
      const t = line.trim();
      if (t) files.add(t);
    }
  }
  return [...files].sort();
}

function loadYaml(path) {
  if (!existsSync(path)) return null;
  return YAML.parse(readFileSync(path, "utf8"));
}

const { projectRoot, planPath, rosterPath, strict } = parseArgs(process.argv.slice(2));

const planDoc = loadYaml(planPath);
const rosterDoc = loadYaml(rosterPath);
const dirty = gitDirtyFiles(projectRoot);

console.log("扶摇 · Nomad contention check (advisory)\n");
console.log(`project: ${projectRoot}`);
console.log(`plan: ${planPath}`);
console.log(`roster: ${rosterPath}`);

const orch = rosterDoc?.orchestration ?? {};
const parallel =
  orch.mode === "parallel" ||
  (Array.isArray(orch.parallel_groups) && orch.parallel_groups.length > 0);
const policy = orch.contention_policy ?? "escalate_to_progress";
const blockers = planDoc?.progress?.blockers ?? [];
const activeSlot = planDoc?.progress?.active_slot_id;

console.log(`orchestration: mode=${orch.mode ?? "?"} parallel=${parallel} policy=${policy}`);
console.log(`active_slot: ${activeSlot ?? "—"}`);
console.log(`blockers: ${blockers.length}`);

if (dirty === null) {
  console.log("git: not a repository — skip dirty file scan");
} else {
  console.log(`git dirty files: ${dirty.length}`);
  if (dirty.length) dirty.slice(0, 20).forEach((f) => console.log(`  · ${f}`));
  if (dirty.length > 20) console.log(`  … +${dirty.length - 20} more`);
}

let warn = false;
if (parallel && dirty && dirty.length > 0 && blockers.length === 0) {
  console.log("\n⚠ parallel roster + dirty files — consider:");
  console.log("  · declare territories in plan/handoff");
  console.log("  · add progress.blockers or message request (contention)");
  console.log(`  · contention_policy: ${policy}`);
  warn = true;
}

if (!warn) console.log("\n✓ no contention advisory");

if (strict && warn) process.exit(1);
process.exit(0);
