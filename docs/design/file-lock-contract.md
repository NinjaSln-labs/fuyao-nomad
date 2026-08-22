# 文件归属与争用检测契约

> **状态：③ 设计 · v0.4 草案**  
> 实现：[contention-rules.md](./contention-rules.md) · [escalation-protocol.md](./escalation-protocol.md)

## 问题

并行槽位同时修改同一文件/模块 → 争用。框架 V0.4 提供 **轻量检测 + 人工升级**，非自动 merge。

## 归属声明（建议）

在 `plan.work_items` 或 handoff message 的 payload 中声明领地（可选字段，文档约定）：

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

输出为 **顾问报告**（默认 exit 0）；`--strict` 时在「并行 + 有脏文件 + 无 blockers」时 exit 1。

## 与 harness

- **不**替代 git merge / IDE 冲突 UI
- 争用 → `progress.blockers` 或 `message.type=request` · `reason: contention`

## V0.4 验收

- [x] 本文档
- [x] `scripts/check-contention.mjs`
- [ ] plan-progress schema 正式 `territory` 字段 — 可选 v0.5
