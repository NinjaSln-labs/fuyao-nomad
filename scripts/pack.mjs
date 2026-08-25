#!/usr/bin/env node
/**
 * Team pack: validate, install/import, and export portable team bundles.
 *
 * Usage:
 *   node scripts/pack.mjs validate <pack-dir>
 *   node scripts/pack.mjs install|import --pack <pack-dir> --project <root>
 *   node scripts/pack.mjs export --pack <pack-dir> --out <dir> [--id <new-id>] [--no-fork]
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import YAML from "yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCHEMAS = join(ROOT, "docs/design/schemas");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

function loadSchema(name) {
  return JSON.parse(readFileSync(join(SCHEMAS, name), "utf8"));
}

const validators = {
  pack: ajv.compile(loadSchema("team-pack.schema.json")),
  roster: ajv.compile(loadSchema("roster.schema.json")),
  dod: ajv.compile(loadSchema("template-dod.schema.json")),
  verification: ajv.compile(loadSchema("template-verification.schema.json")),
  ddd_gate: ajv.compile(loadSchema("template-ddd-gate.schema.json")),
};

function parseYaml(path) {
  try {
    return YAML.parse(readFileSync(path, "utf8"));
  } catch (err) {
    throw new Error(`Invalid YAML in ${path}: ${err.message}`);
  }
}

function validateData(data, fn, label, path) {
  const ok = fn(data);
  if (!ok) {
    const msgs = (fn.errors ?? [])
      .map((e) => `${e.instancePath || "/"} ${e.message}`)
      .join("; ");
    throw new Error(`${label} invalid at ${path}: ${msgs}`);
  }
}

function resolvePackDir(arg) {
  if (!arg) throw new Error("pack directory required");
  return isAbsolute(arg) ? arg : resolve(process.cwd(), arg);
}

function resolveOutDir(arg) {
  if (!arg) throw new Error("--out <dir> required");
  return isAbsolute(arg) ? arg : resolve(process.cwd(), arg);
}

function loadPack(packDir) {
  const manifestPath = join(packDir, "pack.yaml");
  if (!existsSync(manifestPath)) {
    throw new Error(`Missing pack.yaml in ${packDir}`);
  }
  const manifest = parseYaml(manifestPath);
  validateData(manifest, validators.pack, "pack", manifestPath);
  return { manifest, manifestPath, packDir };
}

function validateAdapterMapping(packDir, label, mappingRel, agentsOrRunnersDir) {
  const mapPath = join(packDir, mappingRel);
  if (!existsSync(mapPath)) throw new Error(`Missing ${label} mapping: ${mapPath}`);
  console.log(`✓ ${label} mapping: ${mapPath}`);
  if (!agentsOrRunnersDir) return;
  const dirPath = join(packDir, agentsOrRunnersDir);
  if (!existsSync(dirPath)) throw new Error(`Missing ${label} dir: ${dirPath}`);
  const mappingData = parseYaml(mapPath);
  for (const name of Object.values(mappingData.mappings ?? {})) {
    const file = join(dirPath, `${name}.md`);
    if (!existsSync(file)) {
      throw new Error(`Missing ${label} fragment: ${file}`);
    }
  }
  console.log(`✓ ${label} fragments: ${dirPath}`);
}

function validatePackPaths(packDir, manifest) {
  const checks = [
    ["roster", manifest.roster, validators.roster],
    ["dod", manifest.templates.dod, validators.dod],
    ["verification", manifest.templates.verification, validators.verification],
    ["ddd_gate", manifest.templates.ddd_gate, validators.ddd_gate],
  ];

  for (const [label, rel, fn] of checks) {
    const p = join(packDir, rel);
    if (!existsSync(p)) throw new Error(`Missing ${label}: ${p}`);
    validateData(parseYaml(p), fn, label, p);
    console.log(`✓ ${label}: ${p}`);
  }

  const adapters = manifest.harness_adapters ?? {};
  if (adapters.cursor) {
    validateAdapterMapping(
      packDir,
      "cursor",
      adapters.cursor.mapping,
      adapters.cursor.agents_dir
    );
  }
  if (adapters.cli) {
    validateAdapterMapping(packDir, "cli", adapters.cli.mapping, adapters.cli.runners_dir);
  }
  if (adapters.openhands) {
    validateAdapterMapping(
      packDir,
      "openhands",
      adapters.openhands.mapping,
      adapters.openhands.agents_dir
    );
  }

  for (const rel of manifest.skills ?? []) {
    const p = join(packDir, rel);
    if (!existsSync(p)) throw new Error(`Missing skill: ${p}`);
    console.log(`✓ skill: ${p}`);
  }

  console.log(`✓ pack manifest: ${join(packDir, "pack.yaml")}`);
}

function installPack(packDir, projectRoot) {
  const { manifest } = loadPack(packDir);
  validatePackPaths(packDir, manifest);

  const destPack = join(projectRoot, "agents/packs", manifest.id);
  mkdirSync(destPack, { recursive: true });

  cpSync(packDir, destPack, { recursive: true });
  console.log(`✓ copied pack → ${destPack}`);

  // Skills stay inside the pack (harness-agnostic). Never copy to .cursor/ or harness paths.

  if (manifest.harness_adapters?.cursor) {
    const mapping = join(destPack, manifest.harness_adapters.cursor.mapping);
    const agentsDir = join(destPack, manifest.harness_adapters.cursor.agents_dir);
    const r = spawnSync(
      "node",
      [
        join(ROOT, "scripts/install-cursor-agents.mjs"),
        "--mapping",
        mapping,
        "--agents-dir",
        agentsDir,
        "--project",
        projectRoot,
      ],
      { encoding: "utf8", cwd: ROOT }
    );
    if (r.status !== 0) {
      console.error(r.stdout + r.stderr);
      throw new Error("install-cursor-agents failed");
    }
    process.stdout.write(r.stdout);
  }

  console.log(`\nInstalled pack "${manifest.id}" to ${projectRoot}`);
}

function exportPack(packDir, outDir, { newId = null, writeFork = true } = {}) {
  const { manifest, manifestPath } = loadPack(packDir);
  validatePackPaths(packDir, manifest);

  if (existsSync(outDir)) {
    const hasContent = existsSync(join(outDir, "pack.yaml"));
    if (hasContent) {
      throw new Error(`Refusing to overwrite existing pack at ${outDir}`);
    }
  }
  mkdirSync(outDir, { recursive: true });
  cpSync(packDir, outDir, { recursive: true });

  const outManifestPath = join(outDir, "pack.yaml");
  const outManifest = parseYaml(outManifestPath);
  const upstreamId = manifest.id;
  const upstreamRevision = manifest.pack_revision ?? "unknown";

  if (newId && newId !== manifest.id) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(newId)) {
      throw new Error(`Invalid --id (expected a-z0-9-): ${newId}`);
    }
    outManifest.id = newId;
    if (writeFork) {
      outManifest.fork = {
        upstream_id: upstreamId,
        upstream_revision: String(upstreamRevision),
        forked_at: new Date().toISOString(),
        note: outManifest.fork?.note ?? "exported fork; swap harness mapping as needed",
      };
    }
    outManifest.published_at = new Date().toISOString();
    writeFileSync(outManifestPath, YAML.stringify(outManifest), "utf8");
    validateData(outManifest, validators.pack, "pack", outManifestPath);
    console.log(`✓ rewrote id: ${upstreamId} → ${newId}`);
    if (writeFork) console.log(`✓ fork metadata → upstream ${upstreamId}@${upstreamRevision}`);
  } else {
    console.log(`✓ exported id unchanged: ${manifest.id}`);
  }

  console.log(`✓ exported pack → ${outDir}`);
  console.log(`  source manifest: ${manifestPath}`);
  console.log(`\nNext: npm run pack -- validate ${outDir}`);
  console.log(`      npm run pack:import -- --pack ${outDir} --project <root>`);
  console.log(`      (swap harness mapping under harness/<runtime>/; keep roster/templates/skills)`);
}

function parseInstallArgs(argv) {
  let packDir = null;
  let projectRoot = process.cwd();
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--pack" && argv[i + 1]) packDir = resolvePackDir(argv[++i]);
    else if (argv[i] === "--project" && argv[i + 1]) {
      const p = argv[++i];
      projectRoot = isAbsolute(p) ? p : resolve(process.cwd(), p);
    }
  }
  if (!packDir) throw new Error("install/import requires --pack <dir>");
  return { packDir, projectRoot };
}

function parseExportArgs(argv) {
  let packDir = null;
  let outDir = null;
  let newId = null;
  let writeFork = true;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--pack" && argv[i + 1]) packDir = resolvePackDir(argv[++i]);
    else if (argv[i] === "--out" && argv[i + 1]) outDir = resolveOutDir(argv[++i]);
    else if (argv[i] === "--id" && argv[i + 1]) newId = argv[++i];
    else if (argv[i] === "--no-fork") writeFork = false;
  }
  if (!packDir) throw new Error("export requires --pack <dir>");
  if (!outDir) throw new Error("export requires --out <dir>");
  return { packDir, outDir, newId, writeFork };
}

function parseArgs(argv) {
  const cmd = argv[0];
  if (cmd === "validate") {
    const packDir = resolvePackDir(argv[1]);
    const { manifest } = loadPack(packDir);
    validatePackPaths(packDir, manifest);
    console.log("\nPack valid.");
    return;
  }

  if (cmd === "install" || cmd === "import") {
    const { packDir, projectRoot } = parseInstallArgs(argv.slice(1));
    installPack(packDir, projectRoot);
    return;
  }

  if (cmd === "export") {
    const { packDir, outDir, newId, writeFork } = parseExportArgs(argv.slice(1));
    exportPack(packDir, outDir, { newId, writeFork });
    return;
  }

  if (cmd === "--help" || !cmd) {
    console.log(`
Usage:
  node scripts/pack.mjs validate <pack-dir>
  node scripts/pack.mjs install|import --pack <pack-dir> --project <root>
  node scripts/pack.mjs export --pack <pack-dir> --out <dir> [--id <new-id>] [--no-fork]

Examples:
  npm run pack -- validate packs/minimal-research-to-spec
  npm run pack:install -- --pack packs/minimal-research-to-spec --project .
  npm run pack:export -- --pack packs/minimal-research-to-spec --out .scratch/exported-pack --id my-team-pack
  npm run pack:import -- --pack .scratch/exported-pack --project .
`);
    return;
  }

  throw new Error(`Unknown command: ${cmd}`);
}

try {
  parseArgs(process.argv.slice(2));
} catch (err) {
  console.error(`✗ ${err.message}`);
  process.exit(1);
}
