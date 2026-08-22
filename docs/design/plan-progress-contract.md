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
| `goal` | ● | 目标 |
| `scope` | ● | 范围 |
| `phases` | ○ | 阶段/波次；重端建议填 |
| `work_items` | ○ | 可绑 `slot_id` |
| `milestones` | ○ | 完成标准；可设 `audit_gate`（design / implementation / code_quality） |
| `dependencies` | ○ | 外部依赖 |

**轻端**：`intent` + `goal` + `scope` + 少量 `work_items` 即可。  
**重端**：补全 `phases`、`milestones`、与 DoD/追溯引用。

## 进度块（Progress）

| 字段 | 说明 |
|------|------|
| `current_phase_id` / `current_milestone_id` | 当前阶段/里程碑 |
| `active_work_item_ids` / `active_slot_id` | 正在做什么、谁在做 |
| `blockers` | 阻塞 + `waiting_on` + 可选 `escalate_to_slot_id` |
| `next_actions` | 下一步 + 负责槽位 |
| `handoff_snippet` | 会话交接用摘要 |
| `messages_dir` | 槽位消息目录（见 [message-protocol.md](../design/message-protocol.md)） |

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
