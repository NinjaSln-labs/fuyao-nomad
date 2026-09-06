#!/usr/bin/env node
/**
 * fuyao:init — 单人开箱初始化器
 *
 * Usage:
 *   npm run fuyao:init -- --project <root> [--pack <pack-dir>] [--intent "一句话目标"]
 *
 * 流程（选包 → 安装 → 生成 plan-progress 骨架）：
 *   1. 列出仓内 packs/（或用 --pack 指定）
 *   2. 调 pack:import 安装到 <project>
 *   3. 读 roster：按 serial_order / orthogonal_slots 生成 .agents/plan-progress.yaml 骨架
 *      - phases: p1（按 serial 链）/ p2（正交收尾）——单人极简两段
 *      - work_items: 每 serial 槽位一个 wi，slot_id 映射；territory 建议 docs/ 分区
 *      - milestones: m-done（对照 DoD 轻/中档 checklist id）
 *      - progress: status in_progress · messages_dir 按协议落点
 *   4. 骨架过 plan-progress.schema 校验后落盘；已有 plan-progress 拒绝覆盖（--force 覆写）
 *
 * --pack 解析三形态（显式路径优先）：
 *   绝对/相对路径 → 相对路径按调用方 cwd 解析；该路径下存在 pack.yaml 即用之
 *                   （边界：用户项目内恰有同名目录且含 pack.yaml 时，显式路径优先）
 *   裸名/目录名   → 回退源仓 packs/<name>
 *   省略          → 仓内 packs/ 唯一包时自动选用；多包则列包后报错
 *
 * 设计边界：只生成骨架，不替用户写 intent 细节/identity_constraints（identity 抽取
 * 是人的判断，见 identity-constraints.md）。
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join, dirname, isAbsolute, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import YAML from "yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCHEMAS = join(ROOT, "docs/design/schemas");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validatePlan = ajv.compile(
  JSON.parse(readFileSync(join(SCHEMAS, "plan-progress.schema.json"), "utf8"))
);

function parseYaml(path) {
  try {
    return YAML.parse(readFileSync(path, "utf8"));
  } catch (err) {
    throw new Error(`Invalid YAML in ${path}: ${err.message}`);
  }
}

function listPacks() {
  const packsDir = join(ROOT, "packs");
  const out = [];
  for (const name of readdirSync(packsDir)) {
    if (existsSync(join(packsDir, name, "pack.yaml"))) out.push(name);
  }
  return out;
}

/** 从 roster 生成 plan-progress 骨架（schema 校验后返回文本） */
function buildPlanProgress({ roster, intent }) {
  const serial = roster.orchestration?.serial_order ?? [];
  const orthogonal = roster.orchestration?.orthogonal_slots ?? [];

  const workItems = serial.map((slotId, idx) => ({
    id: `wi-${slotId}`,
    title: `${slotId} 槽位交付（第 ${idx + 1} 步）`,
    slot_id: slotId,
    phase_id: "p1",
    territory: idx === 0 ? { paths: ["docs/"] } : undefined,
  }));
  for (const slotId of orthogonal) {
    workItems.push({
      id: `wi-${slotId}`,
      title: `${slotId} 正交职责（贯穿全程）`,
      slot_id: slotId,
      phase_id: "p2",
    });
  }

  const plan = {
    version: "0.1",
    roster_id: roster.id,
    flow_weight: roster.flow_weight,
    intent: intent || "在此写一句话目标（fuyao:init 骨架）",
    plan: {
      goal: `${roster.name} · 单人开箱`,
      scope: "骨架生成后按 intent 修订",
      phases: [
        { id: "p1", name: "主链交付", depends_on: [] },
        { id: "p2", name: "正交收尾", depends_on: ["p1"] },
      ],
      work_items: workItems,
      milestones: [
        { id: "m-done", name: "主链完成", criteria: "DoD checklist 逐项通过" },
      ],
    },
    progress: {
      current_phase_id: "p1",
      current_milestone_id: "m-done",
      active_work_item_ids: workItems.length ? [workItems[0].id] : [],
      active_slot_id: serial[0] ?? null,
      completed_work_item_ids: [],
      blockers: [],
      handoff_snippet: `fuyao:init 骨架已生成（${roster.id}）`,
      messages_dir: `.agents/messages/${roster.id}`,
      updated_at: new Date().toISOString(),
    },
  };

  // territory: undefined 键在序列化前清掉
  for (const wi of plan.plan.work_items) {
    if (wi.territory === undefined) delete wi.territory;
  }

  const ok = validatePlan(plan);
  if (!ok) {
    const msgs = (validatePlan.errors ?? [])
      .map((e) => `${e.instancePath || "/"} ${e.message}`)
      .join("; ");
    throw new Error(`generated plan-progress invalid: ${msgs}`);
  }
  return `# 由 fuyao:init 生成 · 请修订 intent/scope 并按需加 identity_constraints\n\n${YAML.stringify(plan)}`;
}

function parseArgs(argv) {
  const args = { project: null, pack: null, intent: null, force: false, list: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project" && argv[i + 1]) args.project = argv[++i];
    else if (argv[i] === "--pack" && argv[i + 1]) args.pack = argv[++i];
    else if (argv[i] === "--intent" && argv[i + 1]) args.intent = argv[++i];
    else if (argv[i] === "--force") args.force = true;
    else if (argv[i] === "--list") args.list = true;
    else throw new Error(`unknown arg: ${argv[i]}`);
  }
  if (args.list) return args;
  if (!args.project) throw new Error("--project <root> required (or --list)");
  if (!isAbsolute(args.project)) args.project = resolve(process.cwd(), args.project);
  if (args.pack && !isAbsolute(args.pack)) args.pack = resolve(process.cwd(), args.pack);
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.list) {
    console.log("可用团队包（packs/）：");
    for (const name of listPacks()) console.log(`  - ${name}`);
    return;
  }

  // 1. 选包（支持目录名或绝对路径；目录名时从仓内 packs/ 解析）
  let packDir = args.pack;
  if (!packDir) {
    const packs = listPacks();
    if (packs.length !== 1) {
      console.log("未指定 --pack；可用团队包：");
      for (const name of packs) console.log(`  - ${name}`);
      throw new Error("多包时须 --pack <pack-dir>（或 --list 查看）");
    }
    packDir = packs[0];
  }
  if (!existsSync(join(packDir, "pack.yaml"))) {
    const base = basename(packDir);
    const fromRoot = join(ROOT, "packs", base);
    if (existsSync(join(fromRoot, "pack.yaml"))) {
      packDir = fromRoot; // 裸名/相对名 → 仓内 packs/<name>
    } else {
      throw new Error(`pack.yaml not found: ${packDir}`);
    }
  }

  // 2. 安装（复用 pack:import 全链校验 + cursor agents 安装）
  const projectRoot = args.project;
  mkdirSync(projectRoot, { recursive: true });
  const r = spawnSync(
    process.execPath,
    [join(ROOT, "scripts/pack.mjs"), "import", "--pack", packDir, "--project", projectRoot],
    { encoding: "utf8", cwd: ROOT }
  );
  process.stdout.write(r.stdout ?? "");
  if (r.status !== 0) {
    console.error(r.stderr ?? "");
    throw new Error("pack:import failed");
  }

  // 3. 生成 plan-progress 骨架（从已安装 roster 读取——保证与安装产物一致）
  const manifest = parseYaml(join(packDir, "pack.yaml"));
  const roster = parseYaml(join(packDir, manifest.roster));

  const planPath = join(projectRoot, ".agents/plan-progress.yaml");
  if (existsSync(planPath) && !args.force) {
    throw new Error(`refusing to overwrite existing ${planPath} (use --force)`);
  }
  mkdirSync(join(projectRoot, ".agents"), { recursive: true });
  const body = buildPlanProgress({ roster, intent: args.intent });
  writeFileSync(planPath, body, "utf8");

  console.log(`✓ plan-progress 骨架 → ${planPath}`);
  console.log(`\nNext:`);
  console.log(`  1. 修订 intent（一句话目标）与 scope`);
  console.log(`  2. 按 intent 抽 identity_constraints（可选；见 docs/design/identity-constraints.md）`);
  console.log(`  3. 校验：node ${join(ROOT, "scripts/validate.mjs")} --path ${planPath}`);
  console.log(`  4. 教程：docs/product/get-started.md（15 分钟）`);
}

try {
  main();
} catch (err) {
  console.error(`fuyao:init: ${err.message}`);
  process.exit(1);
}
