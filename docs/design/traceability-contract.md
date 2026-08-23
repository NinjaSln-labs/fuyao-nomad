# 追溯链契约

> **状态：③ 设计 · v0.8**  
> Schema：[plan-progress.schema.json](./schemas/plan-progress.schema.json) · [template-dod.schema.json](./schemas/template-dod.schema.json)  
> 能力域：[capability-model.md](../product/capability-model.md) §3 · §4

## 目的

把 **意图 → 领域 → 任务** 与 **计划 ↔ DoD** 放在同一可校验载体，供推进者、auditor 与 harness 读取，避免「计划写了、DoD 勾了、领域对不上」。

## 三层追溯（意图 → 领域 → 任务）

| 层 | 载体字段 | 说明 |
|----|----------|------|
| **意图** | `intent` | 顶层一句话；轻端仅此 + `work_items` 亦可 |
| **领域** | `traceability.domain_concepts[]` | 术语/聚合/BC 等概念 id + 权威 `source` |
| **任务** | `plan.work_items[]` | 工作项；可声明 `domain_concept_ids` |

显式链接（重端建议）：

```yaml
traceability:
  domain_concepts:
    - id: dc-research
      name: CompetitiveResearch
      source: docs/research/2026-08-22-agent-team-landscape.md
  links:
    - domain_concept_id: dc-research
      work_item_id: wi-research
```

`work_items[].domain_concept_ids` 与 `links` 可并用：`links` 适合多对多；`domain_concept_ids` 适合槽位自检。

## 计划 ↔ DoD 联动

同一 `flow_weight` 下，DoD 模板与 plan-progress **双向引用**：

| 方向 | 字段 | 说明 |
|------|------|------|
| 计划 → DoD | `milestones[].dod_checklist_ids` · `work_items[].dod_checklist_ids` | 达成里程碑/完成工作项须满足的 checklist id |
| DoD → 计划 | `dod.checklist[].plan_refs` | `milestone_ids` / `work_item_ids` |

示例（节选）：

```yaml
# plan-progress
plan:
  milestones:
    - id: m-spec
      dod_checklist_ids: [intent_clear, plan_progress_synced, audit_gates_passed]

# dod-中.yaml
dod:
  checklist:
    - id: intent_clear
      required: true
      plan_refs:
        milestone_ids: [m-spec]
```

`audit_gates_passed` 与 `milestones[].audit_gate` 语义对齐：有 `audit_gate` 的里程碑须在审计记录中 pass 或 N/A。

## 轻端 vs 重端

| 重量 | 追溯 | 计划↔DoD |
|------|------|----------|
| **轻** | 仅 `intent` + `work_items` | 口头/模板默认 checklist，可不写 id 联动 |
| **中** | `domain_concepts` + 部分 `links` | 里程碑级 `dod_checklist_ids` |
| **重** | 全链 + 多源 `source` | 里程碑 + 工作项双向 `plan_refs` |

## 校验

```bash
npm run check:traceability -- --project .          # advisory
npm run check:traceability -- --project . --strict # 交叉引用须一致
```

检查项：领域 id 存在 · 链接指向有效 work_item · DoD checklist id 存在于当前 `flow_weight` 模板 · `plan_refs` 指向有效里程碑/工作项。

## 与消息协议

槽位消息 `trace.work_item_id` / `trace.milestone_id` 应与本文件 id 一致；`payload.dod_status` 键名对齐 DoD `checklist[].id`。

## 示例

- [plan-dod-traceability-chain.md](../product/examples/plan-dod-traceability-chain.md)
- [plan-research-spec-impl.example.yaml](../../agents/examples/plan-research-spec-impl.example.yaml)
