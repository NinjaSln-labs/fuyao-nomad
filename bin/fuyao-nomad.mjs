#!/usr/bin/env node
/**
 * fuyao-nomad — CLI entry (npm bin · 全名命令，与包名一致)
 *
 * Subcommands map 1:1 to the repo scripts (no new logic — one surface, many doors):
 *   fuyao-nomad init  → scripts/fuyao-init.mjs        (pack → install → plan skeleton)
 *   fuyao-nomad pack  → scripts/pack.mjs …            (validate | import | export)
 *   fuyao-nomad validate → scripts/validate.mjs …        (schema/contract validation)
 *   fuyao-nomad check → scripts/check-{identity,traceability,contention}.mjs
 *   fuyao-nomad install:cursor → scripts/install-cursor-agents.mjs …
 *
 * Version / help / unknown → repo metadata + usage.
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { readFileSync } from "node:fs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

const SCRIPTS = {
  init: "scripts/fuyao-init.mjs",
  "install:cursor": "scripts/install-cursor-agents.mjs",
  validate: "scripts/validate.mjs",
  pack: "scripts/pack.mjs",
};

const CHECKS = ["identity", "traceability", "contention"];

function usage() {
  console.log(`
fuyao-nomad ${pkg.version} — 扶摇 · Nomad Agent team framework CLI

Usage:
  fuyao-nomad init      --project <dir> [--pack <name|path>] [--intent "…"] [--force]
                  一条命令：选团队包 → 安装 → 生成 .agents/plan-progress.yaml 骨架
                  --pack 解析：裸名（源仓 packs/）· 相对路径（按 cwd）· 绝对路径——显式路径优先；省略时仓内唯一包自动选用
  fuyao-nomad pack validate <pack-dir>            校验团队包
  fuyao-nomad pack import   --pack <dir> --project <root>   安装团队包到项目
  fuyao-nomad pack export   --pack <dir> --out <dir> [--id <new-id>]   可移植复制/分叉
  fuyao-nomad validate   （无参=全仓扫描） --path <file> 单契约文件校验
  fuyao-nomad check identity|traceability|contention --project <root> [--plan <file>] [--strict]
  fuyao-nomad install:cursor [--mapping <yaml>] [--agents-dir <dir>] [--project <root>] [--roster <yaml>]

Docs: https://NinjaSln-labs.github.io/fuyao-nomad/  (GitHub Pages)
Repo: ${pkg.repository.url}
`);
}

const args = process.argv.slice(2);
if (!args.length || args[0] === "--help" || args[0] === "-h") {
  usage();
  process.exit(0);
}
if (args[0] === "--version" || args[0] === "-v") {
  console.log(pkg.version);
  process.exit(0);
}

// fuyao-nomad check identity … → scripts/check-identity.mjs …
if (args[0] === "check" && CHECKS.includes(args[1])) {
  const r = spawn(
    process.execPath,
    [join(ROOT, `scripts/check-${args[1]}.mjs`), ...args.slice(2)],
    { stdio: "inherit" },
  );
  r.on("exit", (c) => process.exit(c ?? 1));
} else if (SCRIPTS[args[0]]) {
  const r = spawn(process.execPath, [join(ROOT, SCRIPTS[args[0]]), ...args.slice(1)], {
    stdio: "inherit",
  });
  r.on("exit", (c) => process.exit(c ?? 1));
} else {
  console.error(`fuyao-nomad: unknown command "${args[0]}"`);
  usage();
  process.exit(1);
}
