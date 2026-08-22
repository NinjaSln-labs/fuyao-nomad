#!/usr/bin/env node
/**
 * Validate rosters, plan-progress, and docs/templates against JSON schemas.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
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
  roster: ajv.compile(loadSchema("roster.schema.json")),
  plan: ajv.compile(loadSchema("plan-progress.schema.json")),
  dod: ajv.compile(loadSchema("template-dod.schema.json")),
  verification: ajv.compile(loadSchema("template-verification.schema.json")),
  ddd_gate: ajv.compile(loadSchema("template-ddd-gate.schema.json")),
  audit: ajv.compile(loadSchema("audit-record.schema.json")),
  pack: ajv.compile(loadSchema("team-pack.schema.json")),
};

function parseYaml(path) {
  try {
    return YAML.parse(readFileSync(path, "utf8"));
  } catch (err) {
    throw new Error(`Invalid YAML in ${path}: ${err.message}`);
  }
}

function validateData(data, validateFn, label, path) {
  const ok = validateFn(data);
  if (ok) {
    console.log(`✓ ${label}: ${path}`);
    return true;
  }
  console.error(`✗ ${label}: ${path}`);
  for (const err of validateFn.errors ?? []) {
    console.error(`  ${err.instancePath || "/"} ${err.message}`);
  }
  return false;
}

function classifyTemplate(name) {
  if (name.startsWith("dod-")) return "dod";
  if (name.startsWith("verification-")) return "verification";
  if (name.startsWith("ddd-gate-")) return "ddd_gate";
  return null;
}

function validateFile(path, labelOverride) {
  const name = path.split("/").pop();
  let kind = labelOverride;
  if (!kind) {
    if (name === "pack.yaml") kind = "pack";
    else if (name.includes("plan-progress")) kind = "plan";
    else if (name.includes("roster") || name === "minimal-roster.yaml") kind = "roster";
    else kind = classifyTemplate(name);
  }
  if (!kind || !validators[kind]) {
    console.warn(`⚠ skip (unknown type): ${path}`);
    return true;
  }
  const data = parseYaml(path);
  return validateData(data, validators[kind], kind, path);
}

function validateDir(dir, filter) {
  if (!existsSync(dir)) return { passed: 0, failed: 0 };
  let passed = 0;
  let failed = 0;
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".yaml") && !name.endsWith(".yml")) continue;
    if (filter && !filter(name)) continue;
    const ok = validateFile(join(dir, name));
    if (ok) passed++;
    else failed++;
  }
  return { passed, failed };
}

let passed = 0;
let failed = 0;

const args = process.argv.slice(2);
if (args[0] === "--path" && args[1]) {
  const p = isAbsolute(args[1]) ? args[1] : join(process.cwd(), args[1]);
  if (validateFile(p)) passed++;
  else failed++;
} else {
  const ex = validateDir(join(ROOT, "agents/examples"));
  passed += ex.passed;
  failed += ex.failed;

  const tpl = validateDir(join(ROOT, "docs/templates"), (n) => n !== "README.md");
  passed += tpl.passed;
  failed += tpl.failed;

  const auditDir = join(ROOT, "docs/audit");
  if (existsSync(auditDir)) {
    for (const name of readdirSync(auditDir)) {
      if (!name.endsWith(".audit.yaml")) continue;
      const ok = validateFile(join(auditDir, name), "audit");
      if (ok) passed++;
      else failed++;
    }
  }

  const packsDir = join(ROOT, "packs");
  if (existsSync(packsDir)) {
    for (const name of readdirSync(packsDir)) {
      const packYaml = join(packsDir, name, "pack.yaml");
      if (!existsSync(packYaml)) continue;
      const ok = validateFile(packYaml, "pack");
      if (ok) passed++;
      else failed++;
    }
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
