# 争用与并行规则

> **状态：④ 交付 · v0.1 草案**  
> 能力域：[capability-model.md](../product/capability-model.md) §2 P1

## 问题

多 agent 并行时可能：

- 同时改同一文件 / 同一聚合
- 重复做同一 work_item
- 子 agent 结论冲突

## 原则

1. **计划先行** — `plan.work_items` 尽量绑定唯一 `slot_id` 或声明可并行组
2. **文件归属** — 并行前在 plan 或 handoff 中声明目录/模块归属
3. **争用即阻塞** — 检测冲突 → `progress.blockers` → handoff 升级至 `progress` 或主 agent
4. **合并单点** — 并行实现后由单槽位（或人）做合并与代码质量审计

## roster 声明（草案）

```yaml
orchestration:
  mode: parallel
  parallel_groups:
    - [frontend-slot, backend-slot]
  contention_policy: escalate_to_progress  # 默认
```

| policy | 行为 |
|--------|------|
| `escalate_to_progress` | 争用写入 blockers，推进槽位协调 |
| `serial_fallback` | 争用槽位改串行 |
| `human` | 立即 `gate_confirm` |

## Harness 映射

- Cursor：并行 subagent 前提示文件归属；`/multitask` 仅用于无重叠 work_items
- 详见 [harness/cursor/MAPPING.md](../../harness/cursor/MAPPING.md)

## V1

文档级规则 + 推进槽位职责；自动争用检测留 P2（git status / 文件锁契约）。
