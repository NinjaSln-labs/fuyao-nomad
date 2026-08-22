# 升级与争用协议

> **状态：③ 设计 · v0.3**  
> 衔接：[contention-rules.md](./contention-rules.md) · [default-handoff.md](./default-handoff.md) · [message-protocol.md](./message-protocol.md)

## 触发链

```
并行争用 / gate 阻塞 / 审计 blocked
        ↓
progress.blockers 或 message.type=request
        ↓
handoff（默认 blocked → progress 槽位）
        ↓
推进槽位协调 → 串行化 / 人工确认 / 继续并行
```

## 争用（contention）

见 [contention-rules.md](./contention-rules.md)。Roster 可选声明：

```yaml
orchestration:
  mode: parallel
  parallel_groups:
    - [slot-a, slot-b]
  contention_policy: escalate_to_progress  # 默认
```

| policy | 行为 |
|--------|------|
| `escalate_to_progress` | 写入 `blockers` → 推进槽位 |
| `serial_fallback` | 争用槽位改串行 |
| `human` | `gate_confirm`，暂停至人工确认 |

## 升级（escalate）

| 来源 | 载体 | 目标槽位 |
|------|------|----------|
| `progress.blockers` | plan-progress | `escalate_to_slot_id` 或正交 `progress` |
| `message.type=request` · `reason: escalate` | `.agents/messages/` | `requested_slot_id` |
| `gate_level: confirm` | 槽位配置 | 主 agent 或推进槽位 |
| `audit` verdict `blocked` | audit-record | `auditor` 或 `progress` |

## 消息与计划联动

`plan-progress.progress.messages_dir` 指向槽位消息目录（建议 `.agents/messages/<roster_id>/`）。  
摘要仍写 `handoff_snippet`；完整 payload 写 message 文件。

## 合并单点（重端）

`flow_weight` ≥ 中重时，并行实现后由单槽位（verifier / auditor）做合并与代码质量审计。

## V0.3 验收

- [x] 文档与 roster `contention_policy` schema
- [x] plan-progress `messages_dir`
- [x] 自动争用检测（git / territory / active work_items）— [file-lock-contract.md](./file-lock-contract.md) · `npm run check:contention`
