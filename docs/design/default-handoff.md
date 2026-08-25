# 默认 Handoff 行为

> **状态：③ 设计 · v0.1**  
> 编制：[composition-protocol.md](../design/composition-protocol.md)

当 `roster.handoff.use_defaults` 为 true（默认）且无匹配自定义 `rules` 时，适用本表。

| 触发 | 条件 | 动作 |
|------|------|------|
| `dod_complete` | 槽位 A 的 DoD 满足 | `serial_order` 下一槽位；**正交槽位**（`orthogonal_slots`）不占用 serial 步序 |
| `blocked` | `progress.blockers` 非空 | 优先 `slot_kind=progress` 或 `orthogonal_slots` 中的推进槽；否则主 agent |
| `gate_confirm` | `gate_level=confirm` 且动作待执行 | 暂停 handoff，待人工确认后继续 |
| `gate_confirm`（规格） | 规格门 `confirm` | 确认时对照 **intent 原文**与 `identity_constraints`，身份词须仍在；见 [identity-constraints.md](./identity-constraints.md) |
| `gate_forbid` | `gate_level=forbid` | 不执行；记录审计 |

**交接载体（默认优先级）**

1. `plan-progress.progress.handoff_snippet`
2. 源槽位 `outputs` 声明的交付物
3. 空摘要 + 进度文件路径

自定义 `handoff.rules` 中 `overrides_default: true` 的项覆盖同 `(from,to)` 路径的默认行。
