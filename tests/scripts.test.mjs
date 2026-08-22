import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(cmd, args, cwd = ROOT) {
  return spawnSync(cmd, args, { cwd, encoding: "utf8" });
}

test("validate passes on examples, templates, packs", () => {
  const r = run("npm", ["run", "validate"]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test("install --check detects no drift after install", () => {
  run("npm", ["run", "install:cursor-agents", "--", "--project", ROOT]);
  const r = run("npm", ["run", "install:cursor-agents", "--", "--check", "--project", ROOT]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test("pack validate minimal-research-to-spec", () => {
  const r = run("npm", ["run", "pack", "--", "validate", "packs/minimal-research-to-spec"]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test("check:contention advisory passes on repo", () => {
  const r = run("npm", ["run", "check:contention", "--", "--project", ROOT]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test("pack install to temp project", () => {
  const scratchBase = join(ROOT, ".scratch");
  mkdirSync(scratchBase, { recursive: true });
  const tmp = mkdtempSync(join(scratchBase, "fuyao-pack-"));
  const r = run("npm", [
    "run",
    "pack:install",
    "--",
    "--pack",
    join(ROOT, "packs/minimal-research-to-spec"),
    "--project",
    tmp,
  ]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.ok(existsSync(join(tmp, "agents/packs/minimal-research-to-spec/pack.yaml")));
  assert.ok(existsSync(join(tmp, "agents/packs/minimal-research-to-spec/skills/audit-readonly/README.md")));
  assert.ok(existsSync(join(tmp, ".cursor/agents/research-analyst.md")));
  assert.ok(!existsSync(join(tmp, ".cursor/skills")));
});
