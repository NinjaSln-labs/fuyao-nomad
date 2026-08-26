# 计划与进度契约

> **状态：③ 设计 · v0.1**  
> Schema：[plan-progress.schema.json](./schemas/plan-progress.schema.json)  
> 能力域：[capability-model.md](../product/capability-model.md) §3

## 目的

**计划（Plan）是推进的基础**，不是可选附录。本契约把「要做什么」与「做到哪了」放在同一载体，供推进者槽位、HANDOFF 与 harness 读取。

## 存放位置

| 方式 | 路径建议 |
|------|----------|
| 独立文件 | `.agents/plan-progress.yaml` |
| 并入 HANDOFF | `HANDOFF.md` 内结构化块（YAML frontmatter 或附录） |
| 小团队共享 | 仓库内 `docs/delivery/plan-progress.yaml`（按项目约定） |

## 计划块（Plan）

| 字段 | 必填 | 说明 |
|------|:----:|------|
| `intent` | ● | 一句话意图（顶层字段） |
| `identity_constraints` | ○ | 从 intent 抽出的身份约束；裁剪不得删除（见 [identity-constraints.md](./identity-constraints.md)） |
| `goal` | ● | 目标（`plan` 内） |
| `scope` | ● | 范围 |
| `phases` | ○ | 阶段/波次；重端建议填 |
| `work_items` | ○ | 可绑 `slot_id`；并行时可声明 `territory.paths` |
| `milestones` | ○ | 完成标准；可设 `audit_gate`（design / implementation / code_quality） |
| `dependencies` | ○ | 外部依赖 |

**轻端**：`intent` + `goal` + `scope` + 少量 `work_items` 即可；有品类/形态词时仍建议填 `identity_constraints`。  
**重端**：补全 `phases`、`milestones`、追溯链与 DoD 联动（见 [traceability-contract.md](./traceability-contract.md)）。

## 追溯与 DoD 联动

| 机制 | 字段 |
|------|------|
| 意图→领域→任务 | `intent` · `traceability` · `work_items[].domain_concept_ids` |
| 计划→DoD | `milestones[].dod_checklist_ids` · `work_items[].dod_checklist_ids` |
| DoD→计划 | `dod.checklist[].plan_refs` |

校验：`npm run check:traceability -- --project .`

## 进度块（Progress）

| 字段 | 说明 |
|------|------|
| `current_phase_id` / `current_milestone_id` | 当前阶段/里程碑 |
| `active_work_item_ids` / `active_slot_id` | 正在做什么、谁在做；争用检测优先 scope |
| `blockers` | 阻塞：`description`（必填）+ 可选 `id` · `waiting_on` · `escalate_to_slot_id` · `related_identity_constraint_ids` · `evidence` · `status` · `cleared_at` |
| `next_actions` | 下一步 + 负责槽位 |
| `handoff_snippet` | 会话交接用摘要 |
| `messages_dir` | 槽位消息目录（见 [message-protocol.md](../design/message-protocol.md)） |

**证据（v0.17）：** 身份类 blocker 清除前须填 `evidence`（路径或 `{ path, note }`）；见 [identity-constraints.md](./identity-constraints.md)「清除规则」。字段名用 `description`（不用 `summary`）。

阻塞与升级见 [escalation-protocol.md](../design/escalation-protocol.md)。

## 与 roster 的关系

```
roster（谁） + plan-progress（做什么、做到哪） + flow_weight（多重流程）
        ↓
   DoD / 验证模板选取
```

`roster_id` 与 `flow_weight` 应在进度文件中可声明，便于校验与模板绑定。

## V1 验收

- [x] 示例 YAML 通过 schema
- [x] HANDOFF 默认载体引用 `handoff_snippet` 字段（见 [default-handoff.md](./default-handoff.md)）
- [x] 推进者槽位 prompt 指引更新本文件（见 `harness/cursor/agents/progress-keeper.md`）
