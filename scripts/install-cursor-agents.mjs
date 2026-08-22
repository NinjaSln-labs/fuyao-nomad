#!/usr/bin/env node
/**
 * Install harness/cursor/agents into .cursor/agents/
 * Options: --mapping, --project, --check (drift detection)
 */
import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
let mappingPath = join(ROOT, "harness/cursor/mapping.example.yaml");
let agentsSrc = join(ROOT, "harness/cursor/agents");
let targetRoot = process.cwd();
let checkOnly = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--mapping" && args[i + 1]) mappingPath = args[++i];
  else if (args[i] === "--agents-dir" && args[i + 1]) agentsSrc = args[++i];
  else if (args[i] === "--project" && args[i + 1]) targetRoot = args[++i];
  else if (args[i] === "--check") checkOnly = true;
  else if (args[i] === "--help") {
    console.log(`
Usage: npm run install:cursor-agents -- [options]

  --mapping <path>   Mapping YAML
  --agents-dir <path>  Source agents directory (default: harness/cursor/agents)
  --project <path>   Target project root
  --check            Report drift without copying (edit harness/cursor/agents only)
`);
    process.exit(0);
  }
}

if (!existsSync(mappingPath)) {
  console.error(`Mapping not found: ${mappingPath}`);
  process.exit(1);
}

const mapping = YAML.parse(readFileSync(mappingPath, "utf8"));
const mappings = mapping.mappings ?? {};
const agentsDest = join(targetRoot, ".cursor/agents");

function filesEqual(a, b) {
  if (!existsSync(a) || !existsSync(b)) return false;
  return readFileSync(a, "utf8") === readFileSync(b, "utf8");
}

let installed = 0;
let drift = 0;

for (const [slotId, agentName] of Object.entries(mappings)) {
  const src = join(agentsSrc, `${agentName}.md`);
  const dest = join(agentsDest, `${agentName}.md`);
  if (!existsSync(src)) {
    console.warn(`⚠ skip ${slotId}: missing ${src}`);
    continue;
  }
  if (checkOnly) {
    if (!filesEqual(src, dest)) {
      console.error(`✗ drift: ${agentName} (update via install or edit harness source)`);
      drift++;
    } else {
      console.log(`✓ ${agentName} in sync`);
    }
    continue;
  }
  mkdirSync(agentsDest, { recursive: true });
  copyFileSync(src, dest);
  console.log(`✓ ${slotId} → .cursor/agents/${agentName}.md`);
  installed++;
}

if (checkOnly) {
  console.log(`\n${drift} drift(s)`);
  process.exit(drift > 0 ? 1 : 0);
}

console.log(`\nInstalled ${installed} agent(s) to ${agentsDest}`);
