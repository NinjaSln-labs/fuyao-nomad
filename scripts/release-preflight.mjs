#!/usr/bin/env node
/**
 * Release preflight — validate + test + GH_TOKEN advisory.
 * Does NOT create tags or GitHub Releases (explicit human/agent step).
 *
 * Usage:
 *   node scripts/release-preflight.mjs
 *   node scripts/release-preflight.mjs --strict-gh   # fail if GH_TOKEN missing
 *   node scripts/release-preflight.mjs --skip-checks # only GH_TOKEN / reminders (tests)
 *
 * See docs/product/examples/release-checklist.md
 */
import { spawnSync as spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  let strictGh = false;
  let skipChecks = false;
  for (const a of argv) {
    if (a === "--strict-gh") strictGh = true;
    else if (a === "--skip-checks") skipChecks = true;
    else if (a === "--help" || a === "-h") {
      console.log(`
Usage: npm run release:preflight -- [--strict-gh] [--skip-checks]

  --strict-gh    exit 1 if GH_TOKEN not in process env
  --skip-checks  skip validate/test (for unit tests / GH-only check)
`);
      process.exit(0);
    }
  }
  return { strictGh, skipChecks };
}

function resolveNpmCli() {
  const binDir = dirname(process.execPath);
  const candidates = [
    join(binDir, "node_modules", "npm", "bin", "npm-cli.js"),
    join(binDir, "..", "lib", "node_modules", "npm", "bin", "npm-cli.js"),
    join(binDir, "..", "lib64", "node_modules", "npm", "bin", "npm-cli.js"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

function runNpm(args) {
  const npmCli = resolveNpmCli();
  if (npmCli) {
    return spawn(process.execPath, [npmCli, ...args], {
      cwd: ROOT,
      encoding: "utf8",
      env: process.env,
    });
  }
  const bin = process.platform === "win32" ? "npm.cmd" : "npm";
  return spawn(bin, args, {
    cwd: ROOT,
    encoding: "utf8",
    shell: process.platform === "win32",
    env: process.env,
  });
}

function checkGhToken() {
  const t = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (t && t.trim().length > 0) {
    return { ok: true, source: process.env.GH_TOKEN ? "GH_TOKEN" : "GITHUB_TOKEN" };
  }
  return { ok: false, source: null };
}

function main() {
  const { strictGh, skipChecks } = parseArgs(process.argv.slice(2));
  let failed = false;

  console.log("扶摇 · Nomad release preflight");
  console.log(`root: ${ROOT}`);
  console.log("");

  if (!skipChecks) {
    console.log("=== 1. npm run validate ===");
    const v = runNpm(["run", "validate"]);
    process.stdout.write(v.stdout || "");
    process.stderr.write(v.stderr || "");
    if (v.status !== 0) {
      console.error("validate FAILED");
      failed = true;
    } else {
      console.log("validate OK");
    }

    console.log("");
    console.log("=== 2. npm test ===");
    const t = runNpm(["test"]);
    process.stdout.write(t.stdout || "");
    process.stderr.write(t.stderr || "");
    if (t.status !== 0) {
      console.error("test FAILED");
      failed = true;
    } else {
      console.log("test OK");
    }
    console.log("");
  } else {
    console.log("=== checks skipped (--skip-checks) ===");
    console.log("");
  }

  console.log("=== 3. GH_TOKEN ===");
  const gh = checkGhToken();
  if (gh.ok) {
    console.log(`OK — ${gh.source} present in process env (value not printed)`);
  } else {
    console.log("MISSING — process env has no GH_TOKEN / GITHUB_TOKEN");
    console.log("Before gh release create, load User token (PowerShell):");
    console.log(
      "  if (-not $env:GH_TOKEN) { $env:GH_TOKEN = [Environment]::GetEnvironmentVariable('GH_TOKEN','User') }"
    );
    if (strictGh) {
      console.error("strict-gh: GH_TOKEN required");
      failed = true;
    } else {
      console.log("(advisory — use --strict-gh to fail)");
    }
  }

  console.log("");
  console.log("=== 4. Dual-audit + docs sync reminder (manual) ===");
  console.log("  [ ] .agents/audit/*-release-audit.md  (100/100 pass)");
  console.log("  [ ] .agents/audit/*-code-quality-audit.md");
  console.log("  [ ] Docs sync: README(+en) · product/README · examples links · test counts");
  console.log("  [ ] Order: dual audit → packaging commit → tag → Release");
  console.log("  [ ] See docs/product/examples/release-checklist.md");
  console.log("");
  console.log("=== 5. Does NOT run ===");
  console.log("  git tag · git push · gh release create  (explicit next step)");
  console.log("");

  if (failed) {
    console.error("preflight FAILED");
    process.exit(1);
  }
  console.log("preflight PASSED");
}

main();
