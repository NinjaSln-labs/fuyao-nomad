# 槽位消息协议（草案）

> **状态：③ 设计 · v0.2 草案**  
> harness 无关 · 与 [default-handoff.md](./default-handoff.md) **并列**

## 定位

| 层 | 职责 |
|----|------|
| **Handoff（默认）** | 何时换手、载体优先级（`handoff_snippet` · outputs） |
| **Message（本协议）** | 换手时 payload **结构** — 类型、字段、追溯 id |

不替代 handoff；在需要机器可读交接时，payload 放入约定字段。

## 信封（Envelope）

所有槽位消息共享外壳：

```yaml
message:
  version: "0.1"
  type: handoff | status | audit | request
  from_slot_id: research
  to_slot_id: spec
  roster_id: minimal-research-to-spec
  trace:
    work_item_id: wi-research      # 可选
    milestone_id: m-define         # 可选
  payload: {}                      # 按 type 区分
  recorded_at: "2026-08-22T00:00:00Z"
```

## Payload 类型

### `handoff`

```yaml
payload:
  summary: string                  # 人类可读摘要（可镜像 handoff_snippet）
  artifacts:
    - kind: research_snapshot
      path: docs/research/foo.md   # 或 inline ref
  dod_status:
    intent_clear: true
  open_questions: []               # 可选
```

### `status`（正交槽位 · 推进）

```yaml
payload:
  phase_id: p1
  milestone_id: m-define
  blockers: []
  next_actions:
    - action: string
      slot_id: spec
```

### `audit`

```yaml
payload:
  audit_type: design | implementation | code_quality
  verdict: pass | pass_with_notes | blocked
  findings: []                     # 对齐 audit-record schema
```

### `request`（争用 / 升级）

```yaml
payload:
  reason: contention | escalate | gate_confirm
  detail: string
  requested_slot_id: progress      # 可选
```

## 存放位置

- 运行时：`.agents/messages/<roster-id>/<timestamp>-<type>.yaml`（建议）
- 计划进度：`plan-progress.progress.handoff_snippet` 仍可承载摘要；完整 message 写文件或 `payload` 块

## 与 flow_weight

| flow_weight | 要求 |
|-------------|------|
| 轻 | `summary` + 主 artifact 即可 |
| 中 | + `dod_status` · `trace.work_item_id` |
| 重 | + 完整 `findings` / 多 artifact |

## V0.2 验收

- [x] 文档与示例 YAML
- [x] JSON Schema（v0.2.0）
- [x] validate 扫描 message 文件（`packs/*/examples/` · `agents/examples/messages/` · `.agents/messages/`）

## 示例

见 [packs/minimal-research-to-spec/examples/message-handoff.example.yaml](../../packs/minimal-research-to-spec/examples/message-handoff.example.yaml)
