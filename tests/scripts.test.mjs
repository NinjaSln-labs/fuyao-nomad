import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Resolve npm-cli.js across Windows Node installs and Linux/GHA toolcache layouts. */
function resolveNpmCli() {
  const binDir = dirname(process.execPath);
  const candidates = [
    // Windows: <prefix>/node.exe + <prefix>/node_modules/npm/...
    join(binDir, "node_modules", "npm", "bin", "npm-cli.js"),
    // Unix / actions/setup-node: <prefix>/bin/node + <prefix>/lib/node_modules/npm/...
    join(binDir, "..", "lib", "node_modules", "npm", "bin", "npm-cli.js"),
    join(binDir, "..", "lib64", "node_modules", "npm", "bin", "npm-cli.js"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

function run(cmd, args, cwd = ROOT) {
  // Cross-platform npm: bare "npm" / "npm.cmd" fail under Node 24 on Windows
  // (ENOENT / EINVAL). Prefer npm-cli.js with the same node binary.
  if (cmd === "npm") {
    const npmCli = resolveNpmCli();
    if (npmCli) {
      return spawnSync(process.execPath, [npmCli, ...args], { cwd, encoding: "utf8" });
    }
    const bin = process.platform === "win32" ? "npm.cmd" : "npm";
    return spawnSync(bin, args, {
      cwd,
      encoding: "utf8",
      shell: process.platform === "win32",
    });
  }
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

test("install --roster applies model_policy hints", () => {
  const r = run("npm", [
    "run",
    "install:cursor-agents",
    "--",
    "--project",
    ROOT,
    "--roster",
    join(ROOT, "agents/examples/minimal-roster.yaml"),
  ]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  const research = readFileSync(join(ROOT, ".cursor/agents/research-analyst.md"), "utf8");
  assert.match(research, /^model:\s*fast$/m);
  const auditor = readFileSync(join(ROOT, ".cursor/agents/quality-auditor.md"), "utf8");
  assert.match(auditor, /^model:\s*inherit$/m);
  // restore mapping-only install so later --check stays green
  const restore = run("npm", ["run", "install:cursor-agents", "--", "--project", ROOT]);
  assert.equal(restore.status, 0, restore.stdout + restore.stderr);
});

test("pack validate minimal-research-to-spec", () => {
  const r = run("npm", ["run", "pack", "--", "validate", "packs/minimal-research-to-spec"]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test("check:contention advisory passes on repo", () => {
  const r = run("npm", ["run", "check:contention", "--", "--project", ROOT]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test("check:contention strict fails on territory overlap fixture", () => {
  const r = run("npm", [
    "run",
    "check:contention",
    "--",
    "--project",
    ROOT,
    "--plan",
    join(ROOT, "tests/fixtures/plan-territory-overlap.yaml"),
    "--strict",
  ]);
  const out = r.stdout + r.stderr;
  assert.equal(r.status, 1, out);
  assert.match(out, /territory|overlap|contention/i);
});

test("check:contention strict fails on active work_item overlap fixture", () => {
  const r = run("npm", [
    "run",
    "check:contention",
    "--",
    "--project",
    ROOT,
    "--plan",
    join(ROOT, "tests/fixtures/plan-active-contention.yaml"),
    "--strict",
  ]);
  const out = r.stdout + r.stderr;
  assert.equal(r.status, 1, out);
  assert.match(out, /active|overlap|contention|work_item/i);
});

test("check:traceability advisory passes on dogfood plan", () => {
  const r = run("npm", [
    "run",
    "check:traceability",
    "--",
    "--project",
    ROOT,
    "--plan",
    join(ROOT, "agents/examples/plan-research-spec-impl.example.yaml"),
  ]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test("check:traceability strict passes on dogfood plan", () => {
  const r = run("npm", [
    "run",
    "check:traceability",
    "--",
    "--project",
    ROOT,
    "--plan",
    join(ROOT, "agents/examples/plan-research-spec-impl.example.yaml"),
    "--strict",
  ]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /traceability check passed \(strict\)/);
});

test("check:traceability advisory success message", () => {
  const r = run("npm", [
    "run",
    "check:traceability",
    "--",
    "--project",
    ROOT,
    "--plan",
    join(ROOT, "agents/examples/plan-research-spec-impl.example.yaml"),
  ]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /traceability check passed \(advisory\)/);
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

test("pack export with --id writes fork then import", () => {
  const scratchBase = join(ROOT, ".scratch");
  mkdirSync(scratchBase, { recursive: true });
  const out = mkdtempSync(join(scratchBase, "fuyao-export-"));
  const exportDir = join(out, "my-fork-pack");
  const rExport = run("npm", [
    "run",
    "pack:export",
    "--",
    "--pack",
    join(ROOT, "packs/minimal-research-to-spec"),
    "--out",
    exportDir,
    "--id",
    "my-fork-pack",
  ]);
  assert.equal(rExport.status, 0, rExport.stdout + rExport.stderr);
  const manifest = readFileSync(join(exportDir, "pack.yaml"), "utf8");
  assert.match(manifest, /id:\s*my-fork-pack/);
  assert.match(manifest, /upstream_id:\s*minimal-research-to-spec/);

  const project = mkdtempSync(join(scratchBase, "fuyao-import-"));
  const rImport = run("npm", [
    "run",
    "pack:import",
    "--",
    "--pack",
    exportDir,
    "--project",
    project,
  ]);
  assert.equal(rImport.status, 0, rImport.stdout + rImport.stderr);
  assert.ok(existsSync(join(project, "agents/packs/my-fork-pack/pack.yaml")));
  assert.ok(existsSync(join(project, ".cursor/agents/research-analyst.md")));
});
