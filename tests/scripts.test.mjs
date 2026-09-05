import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
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

function spawn(cmd, args, opts) {
  return spawnSync(cmd, args, opts);
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

test("check:identity strict passes on ok fixture", () => {
  const r = run("npm", [
    "run",
    "check:identity",
    "--",
    "--project",
    ROOT,
    "--plan",
    join(ROOT, "tests/fixtures/plan-identity-ok.yaml"),
    "--strict",
  ]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /identity check passed \(strict\)/);
});

test("check:identity strict fails on bad fixture", () => {
  const r = run("npm", [
    "run",
    "check:identity",
    "--",
    "--project",
    ROOT,
    "--plan",
    join(ROOT, "tests/fixtures/plan-identity-bad.yaml"),
    "--strict",
  ]);
  const out = r.stdout + r.stderr;
  assert.equal(r.status, 1, out);
  assert.match(out, /missing evidence|identity check failed/i);
});

test("check:identity skips when no identity_constraints", () => {
  const r = run("npm", [
    "run",
    "check:identity",
    "--",
    "--project",
    ROOT,
    "--plan",
    join(ROOT, "tests/fixtures/plan-identity-empty.yaml"),
  ]);
  const out = r.stdout + r.stderr;
  assert.equal(r.status, 0, out);
  assert.match(out, /no identity_constraints \(skip\)/);
});

test("check:identity advisory records issues without failing", () => {
  const r = run("npm", [
    "run",
    "check:identity",
    "--",
    "--project",
    ROOT,
    "--plan",
    join(ROOT, "tests/fixtures/plan-identity-bad.yaml"),
  ]);
  const out = r.stdout + r.stderr;
  assert.equal(r.status, 0, out);
  assert.match(out, /issue:/);
  assert.match(out, /non-fatal|identity check passed \(advisory\)/i);
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

test("release:preflight --skip-checks exits 0 without GH_TOKEN (advisory)", () => {
  const env = { ...process.env };
  delete env.GH_TOKEN;
  delete env.GITHUB_TOKEN;
  const r = spawn(process.execPath, [
    join(ROOT, "scripts/release-preflight.mjs"),
    "--skip-checks",
  ], { cwd: ROOT, encoding: "utf8", env });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /preflight PASSED/);
});

test("release:preflight --skip-checks --strict-gh fails without GH_TOKEN", () => {
  const env = { ...process.env };
  delete env.GH_TOKEN;
  delete env.GITHUB_TOKEN;
  const r = spawn(process.execPath, [
    join(ROOT, "scripts/release-preflight.mjs"),
    "--skip-checks",
    "--strict-gh",
  ], { cwd: ROOT, encoding: "utf8", env });
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout + r.stderr, /preflight FAILED|strict-gh/);
});

test("release:preflight passes guards in clean tree (skip-checks)", () => {
  // 2.5 publish guard must pass on the real repo: private files untracked,
  // desensitization scan clean, no stale filter-repo marker.
  const env = { ...process.env };
  delete env.GH_TOKEN;
  delete env.GITHUB_TOKEN;
  const r = spawn(process.execPath, [
    join(ROOT, "scripts/release-preflight.mjs"),
    "--skip-checks",
  ], { cwd: ROOT, encoding: "utf8", env });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /repo guard/);
  assert.match(r.stdout, /no private files tracked/);
  assert.match(r.stdout, /desensitization scan clean/);
  assert.match(r.stdout, /no git filter-repo marker/);
});

test("release:preflight sensitization scan catches leaked absolute home path", () => {
  const scratchBase = join(ROOT, ".scratch");
  mkdirSync(scratchBase, { recursive: true });
  const tmp = mkdtempSync(join(scratchBase, "fuyao-preflight-"));
  // clone minimal git repo with the tracked script's repo layout
  spawnSync("git", ["init", "-q"], { cwd: tmp, encoding: "utf8" });
  spawnSync("git", ["config", "user.email", "test@example.com"], { cwd: tmp, encoding: "utf8" });
  spawnSync("git", ["config", "user.name", "t"], { cwd: tmp, encoding: "utf8" });
  mkdirSync(join(tmp, "scripts"), { recursive: true });
  writeFileSync(join(tmp, "package.json"), JSON.stringify({ name: "fuyao-nomad", version: "0.0.0" }));
  writeFileSync(
    join(tmp, "scripts/release-preflight.mjs"),
    readFileSync(join(ROOT, "scripts/release-preflight.mjs"), "utf8"),
  );
  // assemble leak strings at runtime so THIS test file never contains the literals
  const leakHome = ["", "home", "someone", "secret", "path"].join("/");
  const leakSsh = ["~", ".ssh", "id_rsa"].join("/");
  writeFileSync(join(tmp, "docs.md"), `leak: ${leakHome} and ${leakSsh}\n`);
  spawnSync("git", ["add", "."], { cwd: tmp, encoding: "utf8" });
  spawnSync("git", ["commit", "-q", "-m", "init"], { cwd: tmp, encoding: "utf8" });
  const r = spawnSync(process.execPath, [
    join(tmp, "scripts/release-preflight.mjs"),
    "--skip-checks",
  ], { cwd: tmp, encoding: "utf8" });
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout + r.stderr, /sensitization: docs\.md/);
});

test("release:preflight repo guard fails outside fuyao-nomad package", () => {
  const scratchBase = join(ROOT, ".scratch");
  mkdirSync(scratchBase, { recursive: true });
  const tmp = mkdtempSync(join(scratchBase, "fuyao-guard-"));
  mkdirSync(join(tmp, "scripts"), { recursive: true });
  writeFileSync(join(tmp, "package.json"), JSON.stringify({ name: "some-other-repo" }));
  writeFileSync(
    join(tmp, "scripts/release-preflight.mjs"),
    readFileSync(join(ROOT, "scripts/release-preflight.mjs"), "utf8"),
  );
  const r = spawnSync(process.execPath, [
    join(tmp, "scripts/release-preflight.mjs"),
    "--skip-checks",
  ], { cwd: tmp, encoding: "utf8" });
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout + r.stderr, /repo guard.*wrong repo|refuse release/s);
});

test("fuyao:init generates validated plan-progress skeleton from starter-solo", () => {
  const scratchBase = join(ROOT, ".scratch");
  mkdirSync(scratchBase, { recursive: true });
  const tmp = mkdtempSync(join(scratchBase, "fuyao-init-"));
  const r = run("npm", [
    "run",
    "fuyao:init",
    "--",
    "--project",
    tmp,
    "--pack",
    join(ROOT, "packs/starter-solo"),
    "--intent",
    "单人开箱冒烟",
  ]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  // pack 已安装
  assert.ok(existsSync(join(tmp, "agents/packs/starter-solo/pack.yaml")));
  assert.ok(existsSync(join(tmp, ".cursor/agents/solo-builder.md")));
  // plan-progress 骨架：roster 驱动
  const plan = readFileSync(join(tmp, ".agents/plan-progress.yaml"), "utf8");
  assert.match(plan, /roster_id: starter-solo/);
  assert.match(plan, /flow_weight: 轻/);
  assert.match(plan, /intent: 单人开箱冒烟/);
  assert.match(plan, /wi-builder/);
  assert.match(plan, /wi-reviewer/);
  assert.match(plan, /wi-progress/);
  assert.match(plan, /wi-auditor/);
  assert.match(plan, /m-done/);
  assert.match(plan, /active_slot_id: builder/);
  // 骨架过 validate（plan-progress schema）
  const rv = run("node", [
    join(ROOT, "scripts/validate.mjs"),
    "--path",
    join(tmp, ".agents/plan-progress.yaml"),
  ]);
  assert.equal(rv.status, 0, rv.stdout + rv.stderr);
});

test("fuyao:init refuses to overwrite existing plan-progress", () => {
  const scratchBase = join(ROOT, ".scratch");
  mkdirSync(scratchBase, { recursive: true });
  const tmp = mkdtempSync(join(scratchBase, "fuyao-init-"));
  const args = [
    "run",
    "fuyao:init",
    "--",
    "--project",
    tmp,
    "--pack",
    join(ROOT, "packs/starter-solo"),
  ];
  const r1 = run("npm", args);
  assert.equal(r1.status, 0, r1.stdout + r1.stderr);
  const r2 = run("npm", args);
  assert.equal(r2.status, 1);
  assert.match(r2.stderr, /refusing to overwrite/);
});

test("starter-solo pack validates", () => {
  const r = run("npm", ["run", "pack", "--", "validate", join(ROOT, "packs/starter-solo")]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /Pack valid/);
});

// ============================================================
// 1.0.0-alpha.1 契约回归（ADR-0005 A–E 面 · 每契约字段一项断言）
// ============================================================

test("contract A: roster /v1 — 枚举与 required 冻结（gate_level / slot_kind / orchestration.mode / orthogonal）", () => {
  const schema = JSON.parse(readFileSync(join(ROOT, "docs/design/schemas/roster.schema.json"), "utf8"));
  assert.equal(schema["$id"], "https://github.com/NinjaSln-labs/fuyao-nomad/schemas/roster/v1");
  assert.deepEqual(schema.required, ["version", "id", "slots", "orchestration", "flow_weight"]);
  const slot = schema["$defs"].roleSlot;
  assert.deepEqual(slot.required, ["id", "purpose"]);
  assert.deepEqual(slot.properties.gate_level.enum.sort(), ["auto", "confirm", "forbid"].sort());
  assert.deepEqual(slot.properties.slot_kind.enum.sort(), ["auditor", "generic", "progress", "verifier"].sort());
  assert.deepEqual(schema.properties.orchestration.properties.mode.enum.sort(), ["mixed", "parallel", "serial"].sort());
  assert.ok(schema.properties.orchestration.properties.orthogonal_slots);
});

test("contract A: plan-progress /v1 — required 集 + identity_constraints 三字段 + blockers.evidence 语义", () => {
  const schema = JSON.parse(readFileSync(join(ROOT, "docs/design/schemas/plan-progress.schema.json"), "utf8"));
  assert.equal(schema["$id"], "https://github.com/NinjaSln-labs/fuyao-nomad/schemas/plan-progress/v1");
  assert.deepEqual(schema.required, ["version", "intent", "plan", "progress"]);
  const ic = schema.properties.identity_constraints.items;
  assert.deepEqual(ic.required, ["id", "phrase", "meaning"]);
  assert.deepEqual(ic.properties.enforcement.enum, ["blocker_if_unmet", "abolish"]);
  const blocker = schema["$defs"].progress.properties.blockers.items;
  assert.ok(blocker.properties.evidence, "blockers.evidence 保留（清除前须有）");
  assert.deepEqual(blocker.properties.status.enum, ["open", "cleared"]);
});

test("contract A: message /v1 — type 枚举 + 按 type 的 payload 条件结构", () => {
  const schema = JSON.parse(readFileSync(join(ROOT, "docs/design/schemas/message.schema.json"), "utf8"));
  assert.equal(schema["$id"], "https://github.com/NinjaSln-labs/fuyao-nomad/schemas/message/v1");
  const msg = schema.properties.message;
  assert.deepEqual(msg.properties.type.enum.sort(), ["audit", "handoff", "request", "status"].sort());
  assert.ok(msg.allOf, "按 type 的 payload 条件结构（allOf if/then）");
  assert.ok(schema["$defs"].handoffPayload && schema["$defs"].statusPayload && schema["$defs"].auditPayload);
});

test("contract A: audit-record /v1 — 三 type · 三 verdict · findings 枚举", () => {
  const schema = JSON.parse(readFileSync(join(ROOT, "docs/design/schemas/audit-record.schema.json"), "utf8"));
  assert.equal(schema["$id"], "https://github.com/NinjaSln-labs/fuyao-nomad/schemas/audit-record/v1");
  const audit = schema.properties.audit;
  assert.deepEqual(audit.properties.type.enum.sort(), ["code_quality", "design", "implementation"].sort());
  assert.deepEqual(audit.properties.verdict.enum, ["pass", "pass_with_notes", "blocked"]);
  const finding = audit.properties.findings.items;
  assert.deepEqual(finding.properties.severity.enum.sort(), ["critical", "major", "minor", "note"].sort());
  assert.deepEqual(finding.properties.status.enum.sort(), ["fixed", "open", "recorded"].sort());
});

test("contract A: team-pack /v1 — manifest required + harness_adapters + skills 不进 harness 路径", () => {
  const schema = JSON.parse(readFileSync(join(ROOT, "docs/design/schemas/team-pack.schema.json"), "utf8"));
  assert.equal(schema["$id"], "https://github.com/NinjaSln-labs/fuyao-nomad/schemas/team-pack/v1");
  assert.ok(schema.required.includes("roster") && schema.required.includes("templates"));
  // 行为断言：install 产物 skills 落 pack 内、不落 harness 目录（契约 E 半面）
  const scratchBase = join(ROOT, ".scratch");
  mkdirSync(scratchBase, { recursive: true });
  const tmp = mkdtempSync(join(scratchBase, "fuyao-contract-"));
  const r = run("npm", ["run", "pack:install", "--", "--pack", join(ROOT, "packs/minimal-research-to-spec"), "--project", tmp]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.ok(existsSync(join(tmp, "agents/packs/minimal-research-to-spec/skills/audit-readonly/README.md")));
  assert.ok(!existsSync(join(tmp, ".cursor/skills")), "skills 不得进 .cursor/skills（ADR-0005 A 面）");
});

test("contract B: pack 目录布局 — 四件套布局在双官方包冻结（manifest/roster/templates/adapter）", () => {
  for (const pack of ["starter-solo", "minimal-research-to-spec"]) {
    const dir = join(ROOT, "packs", pack);
    assert.ok(existsSync(join(dir, "pack.yaml")), `${pack}/pack.yaml`);
    assert.ok(existsSync(join(dir, "roster.yaml")), `${pack}/roster.yaml`);
    for (const t of ["dod", "verification", "ddd-gate"]) {
      assert.ok(existsSync(join(dir, "templates", `${t}.yaml`)), `${pack}/templates/${t}.yaml`);
    }
    assert.ok(existsSync(join(dir, "harness", "cursor", "mapping.yaml")), `${pack}/harness/cursor/mapping.yaml`);
  }
});

test("contract C: 退出码 — strict 发现 issue 退 1；advisory 记录仍退 0", () => {
  const bad = ROOT; // plan fixture 位于 tests/fixtures，project 根仅需存在
  const plan = join(ROOT, "tests/fixtures/plan-identity-bad.yaml");
  const rStrict = spawnSync(process.execPath, [
    join(ROOT, "scripts/check-identity.mjs"), "--project", bad,
    "--plan", plan, "--strict",
  ], { encoding: "utf8" });
  assert.equal(rStrict.status, 1, "strict 发现 issue 必须退 1（ADR-0005 C 面）");
  const rAdv = spawnSync(process.execPath, [
    join(ROOT, "scripts/check-identity.mjs"), "--project", bad,
    "--plan", plan,
  ], { encoding: "utf8" });
  assert.equal(rAdv.status, 0, "advisory 记录 issue 仍退 0");
  assert.match(rAdv.stdout, /non-fatal/, "advisory 输出须标注 non-fatal");
});

test("contract C: 退出码 — validate 失败退 1 / 通过退 0", () => {
  const scratchBase = join(ROOT, ".scratch");
  mkdirSync(scratchBase, { recursive: true });
  const tmp = mkdtempSync(join(scratchBase, "fuyao-exit-"));
  writeFileSync(join(tmp, "bad.plan.yaml"), "version: \"9.9\"\nintent: x\nplan: {}\nprogress: {}\n");
  const rBad = spawnSync(process.execPath, [
    join(ROOT, "scripts/validate.mjs"), "--path", join(tmp, "bad.plan.yaml"),
  ], { encoding: "utf8" });
  assert.equal(rBad.status, 1, "validate 失败必须退 1");
  const rOk = run("node", [join(ROOT, "scripts/validate.mjs")]);
  assert.equal(rOk.status, 0);
});

test("contract D: 模板六档绑定 — 六档 × dod/verification/ddd-gate 族全配对存在", () => {
  const tiers = ["轻", "轻中", "中", "中重", "重", "全流程"];
  for (const tier of tiers) {
    for (const fam of ["dod", "verification", "ddd-gate", "stage", "commit-policy"]) {
      const p = join(ROOT, "docs/templates", `${fam}-${tier}.yaml`);
      if (fam === "commit-policy" && tier === "轻") continue; // 轻档 commit-policy 按模板族豁免（historical: 轻档无独立 commit-policy）
      assert.ok(existsSync(p), `缺模板 ${fam}-${tier}.yaml`);
    }
  }
  // dod 六档示例 id 惯例零 wi-main/m-done 残留（v0.37/v0.38 两轮清偿的回归锁）
  for (const tier of tiers) {
    const t = readFileSync(join(ROOT, "docs/templates", `dod-${tier}.yaml`), "utf8");
    assert.ok(!/wi-main|m-done/.test(t), `dod-${tier} 不得残留 wi-main/m-done 示例 id`);
  }
});

test("contract E: fuyao:init 行为 — 拒覆盖 + 骨架过 /v1 校验（回归锁）", () => {
  const scratchBase = join(ROOT, ".scratch");
  mkdirSync(scratchBase, { recursive: true });
  const tmp = mkdtempSync(join(scratchBase, "fuyao-ce-"));
  const r = run("npm", ["run", "fuyao:init", "--", "--project", tmp, "--pack", join(ROOT, "packs/starter-solo")]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  const plan = readFileSync(join(tmp, ".agents/plan-progress.yaml"), "utf8");
  // 骨架结构契约：serial→work_items · 正交→p2 · m-done · active_slot=首 serial 槽
  assert.match(plan, /m-done: 主链完成|id: m-done/);
  assert.match(plan, /phase_id: p2/);
  assert.match(plan, /roster_id: starter-solo/);
});
