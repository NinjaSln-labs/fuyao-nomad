# 计划 ↔ DoD 联动 · 追溯链示例

> **状态：④ 交付 · v0.8**  
> 对齐能力模型 P1：意图 → 领域 → 任务 · 计划里程碑 ↔ DoD checklist。

## 链路图

```text
intent（顶层）
    ↓
traceability.domain_concepts（领域）
    ↓ links / domain_concept_ids
plan.work_items（任务）
    ↕ dod_checklist_ids ↔ dod.checklist[].plan_refs
plan.milestones（里程碑 + audit_gate）
```

## 权威文件

| 文件 | 用途 |
|------|------|
| [traceability-contract.md](../../design/traceability-contract.md) | 契约与轻/重端裁剪 |
| [plan-research-spec-impl.example.yaml](../../../agents/examples/plan-research-spec-impl.example.yaml) | 完整 dogfood 计划 |
| [dod-中.yaml](../../templates/dod-中.yaml) | 双向 `plan_refs` |
| [research-spec-impl-chain.md](research-spec-impl-chain.md) | 槽位换手与 harness |

## 字段速查

```yaml
intent: 一句话意图

traceability:
  domain_concepts:
    - id: dc-example
      name: ExampleConcept
      source: docs/design/domain-language.md
  links:
    - domain_concept_id: dc-example
      work_item_id: wi-1

plan:
  work_items:
    - id: wi-1
      domain_concept_ids: [dc-example]
      dod_checklist_ids: [intent_clear]
  milestones:
    - id: m-1
      dod_checklist_ids: [intent_clear, audit_gates_passed]
      audit_gate: design   # 与 audit_gates_passed 语义对齐

# dod 模板侧
dod:
  checklist:
    - id: intent_clear
      plan_refs:
        milestone_ids: [m-1]
        work_item_ids: [wi-1]
```

## 校验

```bash
npm run check:traceability -- --project .
npm run check:traceability -- --project . --strict
npm run validate
npm test
```

`--strict` 要求存在 `traceability.domain_concepts`（重端 dogfood 场景）。

## 与推进者 / auditor

- **progress-keeper**：更新 `progress` 时保持 `handoff_snippet` 与 checklist `handoff_snippet_updated` 一致  
- **quality-auditor**：按 `plan_refs` 核对里程碑 `audit_gate` 与审计记录  
- **消息协议**：`message.trace.*` id 与本计划 id 对齐；`payload.dod_status` 键名 = checklist `id`
