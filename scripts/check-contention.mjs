#!/usr/bin/env node
/**
 * Advisory contention check: plan-progress + roster + git dirty files + territory overlap.
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

function normPath(p) {
  return p.replace(/\\/g, "/").replace(/\/+$/, "");
}

function pathUnderTerritory(filePath, territoryPath) {
  const f = normPath(filePath);
  const t = normPath(territoryPath);
  if (!t) return false;
  return f === t || f.startsWith(`${t}/`);
}

function pathsOverlap(a, b) {
  const na = normPath(a);
  const nb = normPath(b);
  return na === nb || pathUnderTerritory(na, nb) || pathUnderTerritory(nb, na);
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

function workItemsWithTerritory(planDoc) {
  const items = planDoc?.plan?.work_items ?? [];
  return items
    .filter((wi) => Array.isArray(wi.territory?.paths) && wi.territory.paths.length > 0)
    .map((wi) => ({
      id: wi.id,
      slot_id: wi.slot_id,
      paths: wi.territory.paths,
    }));
}

function findTerritoryOverlaps(items) {
  const overlaps = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      for (const pa of a.paths) {
        for (const pb of b.paths) {
          if (pathsOverlap(pa, pb)) {
            overlaps.push({
              work_items: [a.id, b.id],
              slots: [a.slot_id, b.slot_id],
              paths: [pa, pb],
            });
          }
        }
      }
    }
  }
  return overlaps;
}

function dirtyOutsideTerritories(dirty, items) {
  if (!dirty?.length || !items.length) return [];
  const allPaths = items.flatMap((wi) => wi.paths);
  return dirty.filter((file) => !allPaths.some((t) => pathUnderTerritory(file, t)));
}

function activeTerritoryItems(planDoc, territoryItems) {
  const ids = planDoc?.progress?.active_work_item_ids;
  if (Array.isArray(ids) && ids.length > 0) {
    return territoryItems.filter((wi) => ids.includes(wi.id));
  }
  const slot = planDoc?.progress?.active_slot_id;
  if (slot) {
    return territoryItems.filter((wi) => wi.slot_id === slot);
  }
  return [];
}

function dirtyHitsMultipleActiveTerritories(dirty, activeItems) {
  if (!dirty?.length || activeItems.length < 2) return { hit: false, workItemIds: [] };
  const hitIds = new Set();
  for (const file of dirty) {
    for (const wi of activeItems) {
      if (wi.paths.some((t) => pathUnderTerritory(file, t))) hitIds.add(wi.id);
    }
  }
  return { hit: hitIds.size >= 2, workItemIds: [...hitIds] };
}

const { projectRoot, planPath, rosterPath, strict } = parseArgs(process.argv.slice(2));

const planDoc = loadYaml(planPath);
const rosterDoc = loadYaml(rosterPath);
const dirty = gitDirtyFiles(projectRoot);

const orch = rosterDoc?.orchestration ?? {};
const parallel =
  orch.mode === "parallel" ||
  (Array.isArray(orch.parallel_groups) && orch.parallel_groups.length > 0);

const territoryItems = workItemsWithTerritory(planDoc);
const activeTerritory = activeTerritoryItems(planDoc, territoryItems);
const activeIds = planDoc?.progress?.active_work_item_ids ?? [];
const activeOverlaps =
  activeTerritory.length >= 2 ? findTerritoryOverlaps(activeTerritory) : [];
const planOverlaps =
  parallel && activeTerritory.length < 2 ? findTerritoryOverlaps(territoryItems) : [];

console.log("扶摇 · Nomad contention check (advisory)\n");
console.log(`project: ${projectRoot}`);
console.log(`plan: ${planPath}`);
console.log(`roster: ${rosterPath}`);

const policy = orch.contention_policy ?? "escalate_to_progress";
const blockers = planDoc?.progress?.blockers ?? [];
const activeSlot = planDoc?.progress?.active_slot_id;

console.log(`orchestration: mode=${orch.mode ?? "?"} parallel=${parallel} policy=${policy}`);
console.log(`active_slot: ${activeSlot ?? "—"}`);
console.log(
  `active_work_item_ids: ${activeIds.length ? activeIds.join(", ") : "—"}`
);
console.log(`blockers: ${blockers.length}`);
console.log(`work_items with territory: ${territoryItems.length}`);
console.log(`active territory work_items: ${activeTerritory.length}`);

if (activeOverlaps.length) {
  console.log(`active territory overlaps: ${activeOverlaps.length}`);
  activeOverlaps.forEach((o) => {
    console.log(`  · ${o.work_items.join(" ↔ ")} (${o.paths.join(" ∩ ")})`);
  });
}

if (planOverlaps.length) {
  console.log(`plan territory overlaps (parallel): ${planOverlaps.length}`);
  planOverlaps.forEach((o) => {
    console.log(`  · ${o.work_items.join(" ↔ ")} (${o.paths.join(" ∩ ")})`);
  });
}

if (dirty === null) {
  console.log("git: not a repository — skip dirty file scan");
} else {
  console.log(`git dirty files: ${dirty.length}`);
  if (dirty.length) dirty.slice(0, 20).forEach((f) => console.log(`  · ${f}`));
  if (dirty.length > 20) console.log(`  … +${dirty.length - 20} more`);
}

let warn = false;

if (activeOverlaps.length > 0) {
  console.log("\n⚠ overlapping territories among active work_items:");
  console.log("  · reduce active_work_item_ids or split territory paths");
  console.log("  · see file-lock-contract.md");
  warn = true;
}

if (planOverlaps.length > 0) {
  console.log("\n⚠ overlapping territories in plan (parallel roster):");
  console.log("  · split paths or serialize slots");
  console.log("  · see file-lock-contract.md");
  warn = true;
}

const multiActiveDirty = dirtyHitsMultipleActiveTerritories(dirty, activeTerritory);
if (multiActiveDirty.hit && blockers.length === 0) {
  console.log("\n⚠ dirty files span multiple active work_item territories:");
  console.log(`  · work_items: ${multiActiveDirty.workItemIds.join(", ")}`);
  console.log("  · add progress.blockers or message request (contention)");
  console.log(`  · contention_policy: ${policy}`);
  warn = true;
}

if (parallel && dirty && dirty.length > 0 && blockers.length === 0 && !multiActiveDirty.hit) {
  const scopeItems = activeTerritory.length ? activeTerritory : territoryItems;
  const outside = dirtyOutsideTerritories(dirty, scopeItems);
  console.log("\n⚠ parallel roster + dirty files — consider:");
  console.log("  · declare territories in plan.work_items");
  console.log("  · set active_work_item_ids when multiple slots run");
  console.log("  · add progress.blockers or message request (contention)");
  console.log(`  · contention_policy: ${policy}`);
  if (outside.length) {
    console.log(`  · dirty outside scoped territories: ${outside.length}`);
    outside.slice(0, 10).forEach((f) => console.log(`    - ${f}`));
  }
  warn = true;
}

if (!warn) console.log("\n✓ no contention advisory");

if (strict && warn) process.exit(1);
process.exit(0);
