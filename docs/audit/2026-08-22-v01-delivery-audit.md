# 扶摇 · Nomad v0.1 交付阶段审计

> **类型**：设计 + 实现 + 代码质量（合并报告，flow_weight=**中**）  
> **范围**：① 发现 ~ ④ 交付 v0.1 全仓文档、schema、脚本、示例、harness POC  
> **非范围**：⑤ 开源发布、运行时消息协议、第二 harness 实现  
> **审计门**：开源发布（⑤）前

```yaml
audit:
  type: design | implementation | code_quality
  flow_weight: 中
  verdict: pass_with_notes
  recorded_at: "2026-08-22T00:00:00Z"
  superseded_by: docs/audit/2026-08-22-v01-delivery-reaudit.md
```

**总结**：初审计发现 3 项 Major — **已全部修复**。复验见 [2026-08-22-v01-delivery-reaudit.md](./2026-08-22-v01-delivery-reaudit.md)（`pass`）。

---

## 1. 设计审计

**对照**：north-star · capability-model · delivery-model · composition-protocol · schemas · 8 能力域

### 通过项

| 项 | 证据 |
|----|------|
| 定位一致（团队框架、不做 harness、DDD、编制规则、flow_weight） | problem-statement / north-star / 竞品快照 |
| 8 能力域在 capability-model 有 P0/P1 边界 | `docs/product/capability-model.md` |
| handoff 默认 + 可选自定义 | schema `handoff.use_defaults` + default-handoff.md |
| 三类审计 + flow_weight | audit-by-flow-weight.md + verification-中.yaml |
| 计划含 audit_gate | plan-progress.schema.json + example |
| 竞品去权威化 | research 头注 |

### 发现项

| ID | 严重度 | 位置 | 问题 | 建议 | 状态 |
|----|--------|------|------|------|------|
| D-01 | **major** | capability-model §4 V1 | 声称「DDD 门检查表存在」— **无对应文件** | 新增 `docs/templates/ddd-gate-中.yaml` 或 `docs/design/ddd-gate.md` | fixed |
| D-02 | **major** | capability-model §4 / V1 切片 | 声称「2+ DoD 模板」— 仅有 `verification-轻/中.yaml`，**无独立 DoD 模板** | 拆分 `dod-*.yaml` 或 rename 并文档化 verification=DoD+audit 合体 | fixed |
| D-03 | **major** | 全仓 | 框架主张 **DDD 必要**，但**无自身领域模型/术语表**（dogfood 缺口） | 增 `docs/design/domain-language.md` + 精简 BC 图（Roster/Plan/Handoff/HarnessMount） | fixed |
| D-04 | minor | composition-protocol · capability-model |  prose 写 `handoff_rules`，schema 为 `handoff.rules` | 全文统一为 `handoff.rules` | fixed |
| D-05 | minor | problem-statement / product README | 仍写「交付重量可调」，主术语已改为「轻-重流程重量」 | 术语对齐 | fixed |
| D-06 | note | architecture.md L52 | 仍写「packages/core 校验脚本」待办 — **已实现** | 勾选更新 | fixed |
| D-07 | note | audit-by-flow-weight | 审计产物 YAML **无 JSON Schema** | ⑤ 前或续 ④ 增 `audit.schema.json` | fixed |

**设计审计结论**：`pass_with_notes` — 架构叙事成立，**产物与 V1 清单有缺口**。

---

## 2. 实现审计

**对照**：schema · 示例 · scripts · harness/cursor · templates · builder-guide

### 通过项

| 项 | 证据 |
|----|------|
| `npm run validate` | 2 passed（minimal-roster + plan-progress） |
| roster / plan-progress schema | `docs/design/schemas/*.json` |
| Cursor 映射 POC | MAPPING.md + 4 agents + mapping.example.yaml |
| install 脚本 | `scripts/install-cursor-agents.mjs` 可用 |
| 争用规则文档 | contention-rules.md |
| builder-guide 与脚本一致 | `docs/product/builder-guide.md` |

### 发现项

| ID | 严重度 | 位置 | 问题 | 建议 | 状态 |
|----|--------|------|------|------|------|
| I-01 | **major** | `minimal-roster.yaml` | `progress` 槽位在 `slots` 但**不在** `serial_order`；编排语义不清 | 文档标明「正交槽位」或 schema 增 `orthogonal_slots` | fixed |
| I-02 | minor | `mapping.example.yaml` | 含 `auditor` 映射，示例 roster **无 auditor 槽位** | 示例 roster 加可选 auditor 或 mapping 注释 | fixed |
| I-03 | minor | `scripts/validate.mjs` | 仅扫 `agents/examples/`；不校验 `docs/templates/` | 扩展校验或 `validate --path` | fixed |
| I-04 | minor | `skills/` | 目录空，capability 8 域「技能层」无示例 | 至少 1 个 skill 引用示例 | fixed |
| I-05 | minor | `harness/cli/` | 仅 README 占位 | V1 可接受；⑤ 前决定是否删或标 experimental | fixed |
| I-06 | note | `.cursor/agents/` vs `harness/cursor/agents/` | 安装副本，**无漂移检测** | install 脚本加 `--check` 或文档提醒改源文件 | fixed |

**实现审计结论**：`pass_with_notes` — 核心路径通，示例与映射有**语义缝隙**。

---

## 3. 代码质量审计

**范围**：`scripts/*.mjs`、`package.json`（无业务 runtime 代码）

### 通过项

| 项 | 证据 |
|----|------|
| 依赖少且明确 | ajv、yaml、ajv-formats |
| validate 失败 exit 1 | validate.mjs |
| install 缺 mapping 失败 exit 1 | install-cursor-agents.mjs |
| 无硬编码密钥 | — |

### 发现项

| ID | 严重度 | 位置 | 问题 | 建议 | 状态 |
|----|--------|------|------|------|------|
| C-01 | minor | scripts | **无自动化测试**（validate/install） | ④ 增 `node:test` 冒烟 | fixed |
| C-02 | minor | validate.mjs | `YAML.parse` 无 try/catch，坏 YAML 栈追踪不友好 | 包一层错误信息 | fixed |
| C-03 | note | package.json | 无 `engines`、无 LICENSE 字段 | ⑤ 开源前补 LICENSE + engines | fixed |

**代码质量审计结论**：`pass` — 含 `npm test`、LICENSE、CI workflow。

---

## 4. 开源发布（⑤）门禁预览

| 门禁 | 状态 |
|------|------|
| LICENSE | ✅ Apache-2.0 |
| README 快速开始 | ✅ |
| Builder 指南 | ✅ |
| Schema 校验 CI | ✅ `.github/workflows/validate.yml` |
| D-01 ~ D-03 Major 修复 | ✅ |

**建议**：可进入 ⑤ 开源发布。复验见 [2026-08-22-v01-delivery-reaudit.md](./2026-08-22-v01-delivery-reaudit.md)。

---

## 5. 修复优先级

全部 **已完成** — 见 §2–3 发现表 `fixed` 列与复验文档。

---

## 6. 审计门判定

| 目标 | 判定 |
|------|------|
| 继续 ④ 收尾 | ✅ 完成 |
| 进入 ⑤ 开源发布 | ✅ **允许** |
| 整体 | **pass**（初审计 pass_with_notes → 已修复） |

---

*初审计：2026-08-22 · 复验：2026-08-22-v01-delivery-reaudit.md*
