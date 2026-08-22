# 文件归属与争用检测契约

> **状态：③ 设计 · v0.5**  
> 实现：[contention-rules.md](./contention-rules.md) · [escalation-protocol.md](./escalation-protocol.md)

## 问题

并行槽位同时修改同一文件/模块 → 争用。框架提供 **轻量检测 + 人工升级**（`check:contention`），非自动 merge。

## 归属声明（建议）

在 `plan.work_items`（schema：`territory.paths`）或 handoff message 的 payload 中声明领地：

```yaml
work_items:
  - id: wi-fe
    title: 前端模块
    slot_id: frontend
    territory:
      paths:
        - src/ui/
  - id: wi-api
    title: API 模块
    slot_id: backend
    territory:
      paths:
        - src/api/
```

未声明领地时：并行前须在 handoff `summary` 中写明目录归属。

## 检测脚本（V0.4）

```bash
npm run check:contention -- --project .
```

| 输入 | 行为 |
|------|------|
| `.agents/plan-progress.yaml` | 读 blockers · active_slot |
| roster（`--roster` 或示例） | 读 `parallel_groups` · `contention_policy` |
| git 工作区 | 列出已修改文件（若在 git 仓库内） |

输出为 **顾问报告**（默认 exit 0）；`--strict` 时在顾问告警时 exit 1（含 **active work_items** territory 重叠）。

## 与 harness

- **不**替代 git merge / IDE 冲突 UI
- 争用 → `progress.blockers` 或 `message.type=request` · `reason: contention`

## V0.4 验收

- [x] 本文档
- [x] `scripts/check-contention.mjs`（含 territory 重叠检测）
- [x] plan-progress schema 正式 `territory` 字段 — v0.5
