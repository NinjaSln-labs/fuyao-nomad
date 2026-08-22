import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(cmd, args) {
  return spawnSync(cmd, args, { cwd: ROOT, encoding: "utf8" });
}

test("validate passes on examples and templates", () => {
  const r = run("npm", ["run", "validate"]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test("install --check detects no drift after install", () => {
  run("npm", ["run", "install:cursor-agents", "--", "--project", ROOT]);
  const r = run("npm", ["run", "install:cursor-agents", "--", "--check", "--project", ROOT]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});
