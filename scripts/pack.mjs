#!/usr/bin/env node
/**
 * Team pack: validate and install portable team bundles.
 *
 * Usage:
 *   node scripts/pack.mjs validate <pack-dir>
 *   node scripts/pack.mjs install --pack <pack-dir> --project <root>
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
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

function loadPack(packDir) {
  const manifestPath = join(packDir, "pack.yaml");
  if (!existsSync(manifestPath)) {
    throw new Error(`Missing pack.yaml in ${packDir}`);
  }
  const manifest = parseYaml(manifestPath);
  validateData(manifest, validators.pack, "pack", manifestPath);
  return { manifest, manifestPath, packDir };
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

  if (manifest.harness_adapters?.cursor) {
    const { mapping, agents_dir } = manifest.harness_adapters.cursor;
    const mapPath = join(packDir, mapping);
    if (!existsSync(mapPath)) throw new Error(`Missing cursor mapping: ${mapPath}`);
    console.log(`✓ cursor mapping: ${mapPath}`);
    const agentsPath = join(packDir, agents_dir);
    if (!existsSync(agentsPath)) throw new Error(`Missing agents_dir: ${agentsPath}`);
    const mappingData = parseYaml(mapPath);
    for (const agentName of Object.values(mappingData.mappings ?? {})) {
      const agentFile = join(agentsPath, `${agentName}.md`);
      if (!existsSync(agentFile)) {
        throw new Error(`Missing agent file: ${agentFile}`);
      }
    }
    console.log(`✓ cursor agents_dir: ${agentsPath}`);
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

function parseArgs(argv) {
  const cmd = argv[0];
  if (cmd === "validate") {
    const packDir = resolvePackDir(argv[1]);
    const { manifest } = loadPack(packDir);
    validatePackPaths(packDir, manifest);
    console.log("\nPack valid.");
    return;
  }

  if (cmd === "install") {
    let packDir = null;
    let projectRoot = process.cwd();
    for (let i = 1; i < argv.length; i++) {
      if (argv[i] === "--pack" && argv[i + 1]) packDir = resolvePackDir(argv[++i]);
      else if (argv[i] === "--project" && argv[i + 1]) {
        const p = argv[++i];
        projectRoot = isAbsolute(p) ? p : resolve(process.cwd(), p);
      }
    }
    if (!packDir) throw new Error("install requires --pack <dir>");
    installPack(packDir, projectRoot);
    return;
  }

  if (cmd === "--help" || !cmd) {
    console.log(`
Usage:
  node scripts/pack.mjs validate <pack-dir>
  node scripts/pack.mjs install --pack <pack-dir> --project <root>

Examples:
  npm run pack -- validate packs/minimal-research-to-spec
  npm run pack:install -- --pack packs/minimal-research-to-spec --project .
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
