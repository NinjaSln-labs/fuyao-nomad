#!/usr/bin/env node
/**
 * Release preflight — repo guard + validate + test + GH_TOKEN advisory.
 * Does NOT create tags or GitHub Releases (explicit human/agent step).
 *
 * Usage:
 *   node scripts/release-preflight.mjs
 *   node scripts/release-preflight.mjs --strict-gh   # fail if GH_TOKEN missing
 *   node scripts/release-preflight.mjs --skip-checks # only guards + GH_TOKEN / reminders (tests)
 *
 * Steps:
 *   0.   repo guard    — cwd is fuyao-nomad root (package name assertion)
 *   1.   npm run validate
 *   2.   npm test
 *   2.5  publish guard — private files untracked · desensitization scan · filter-repo marker
 *   3.   GH_TOKEN advisory
 *
 * See docs/product/examples/release-checklist.md
 */
import { spawnSync as spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PKG_NAME = "fuyao-nomad";

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
  --skip-checks  skip validate/test, keep repo/publish guards (for unit tests / GH-only check)
`);
      process.exit(0);
    }
  }
  return { strictGh, skipChecks };
}

/**
 * Step 0 — repo guard: refuse to run outside the fuyao-nomad clone.
 * Shell cwd drifts (source repo / dogfood / adopt sandboxes); assert package name
 * at the resolved ROOT, and note when process cwd differs (the classic pitfall).
 */
function checkRepoGuard() {
  const pkgPath = join(ROOT, "package.json");
  if (!existsSync(pkgPath)) {
    console.error(`repo guard: package.json not found at ${ROOT} — wrong repo`);
    return false;
  }
  let name = null;
  try {
    name = JSON.parse(readFileSync(pkgPath, "utf8")).name;
  } catch {
    /* fallthrough */
  }
  if (name !== PKG_NAME) {
    console.error(`repo guard: package.name=${name} (expected '${PKG_NAME}') — refuse release, wrong repo`);
    return false;
  }
  console.log(`OK — repo is ${PKG_NAME} (root: ${ROOT})`);
  if (process.cwd() !== ROOT) {
    console.log(`note — process cwd is ${process.cwd()} (not repo root); running against ${ROOT}`);
  }
  return true;
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

/**
 * Step 2.5 — publish guard, three mechanical checks over the working tree:
 *
 *  a) private files must NOT be tracked: HANDOFF.md / HANDOFF-ARCHIVE/ / .agents/audit/ / .githooks/ / .cursor/
 *  b) desensitization scan over `git ls-files` (machine patterns, no prose):
 *     absolute home paths · Windows user paths · private key blocks · .ssh paths · token prefixes
 *  c) stale git filter-repo marker (.git/filter-repo) misclassifies the next rewrite task
 */
function git(args) {
  return spawn("git", args, { cwd: ROOT, encoding: "utf8" });
}

function checkPublishGuard() {
  let failed = false;

  console.log("=== 2.5 publish guard (private files · desensitization · filter-repo) ===");

  // a) private paths must not be tracked
  const ls = git(["ls-files"]);
  if (ls.status !== 0) {
    console.error("publish guard: git ls-files failed");
    return false;
  }
  const tracked = ls.stdout.split("\n").filter((l) => l.length > 0);
  const PRIVATE = ["HANDOFF.md", "HANDOFF-ARCHIVE/", ".agents/audit/", ".githooks/", ".cursor/"];
  const leaked = tracked.filter((f) =>
    PRIVATE.some((p) => (p.endsWith("/") ? f.startsWith(p) : f === p || f.startsWith(p + "/"))),
  );
  if (leaked.length > 0) {
    console.error("publish guard: private files are TRACKED — remove from git:");
    for (const f of leaked) console.error(`  git rm --cached '${f}'`);
    failed = true;
  } else {
    console.log("OK — no private files tracked (HANDOFF.md · HANDOFF-ARCHIVE/ · .agents/audit/ · .githooks/ · .cursor/)");
  }

  // b) desensitization scan on tracked files
  const patterns = [
    ["absolute home path", /(?:^|[^\w.])((?:\/home|\/Users)\/[A-Za-z0-9_.-]+|\/mnt\/[a-z]\/[A-Za-z0-9_.-]+)/],
    ["windows user path", /[A-Za-z]:[\\/]Users[\\/][A-Za-z0-9_.-]+/],
    ["private key block", /-----BEGIN (?:RSA |OPENSSH |EC |DSA |PGP )?PRIVATE KEY-----/],
    ["ssh private path", /(?:~\/.ssh[\\/]|.ssh[\\\/]id_(?:rsa|ed25519|ecdsa))/],
    ["api token", /(?:ghp_|gho_|github_pat_|sk-)[A-Za-z0-9]{20,}/],
  ];
  let sensHits = 0;
  for (const file of tracked) {
    let content;
    try {
      content = readFileSync(join(ROOT, file), "utf8");
    } catch {
      continue;
    }
    for (const [label, re] of patterns) {
      const m = content.match(re);
      if (m) {
        console.error(`sensitization: ${file} — ${label}: ${JSON.stringify(m[0].slice(0, 60))}`);
        sensHits++;
      }
    }
  }
  if (sensHits > 0) {
    console.error(`publish guard: ${sensHits} sensitization issue(s) — desensitize before release`);
    failed = true;
  } else {
    console.log("OK — desensitization scan clean (no home/key/token patterns in tracked files)");
  }

  // c) filter-repo marker
  if (existsSync(join(ROOT, ".git/filter-repo"))) {
    console.error("publish guard: .git/filter-repo marker present — stale state");
    console.error("  if no history rewrite is in progress: rm -rf .git/filter-repo");
    failed = true;
  } else {
    console.log("OK — no git filter-repo marker");
  }

  return !failed;
}

function main() {
  const { strictGh, skipChecks } = parseArgs(process.argv.slice(2));
  let failed = false;

  console.log("扶摇 · Nomad release preflight");
  console.log(`root: ${ROOT}`);
  console.log("");

  console.log("=== 0. repo guard (cwd 防呆) ===");
  if (!checkRepoGuard()) {
    console.error("");
    console.error("preflight FAILED");
    process.exit(1);
  }
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

  if (!checkPublishGuard()) {
    failed = true;
  }
  console.log("");

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
