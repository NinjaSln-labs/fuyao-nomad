# 后 v0.1 路线（⑥+）

> **触发**：v0.1 开源发布审计 **100/100 · pass**（[release-audit](../audit/2026-08-22-v01-release-audit.md)）  
> **状态**：已启动

## 优先级

| P | 主题 | 产出 | 状态 |
|---|------|------|------|
| P0 | 团队包 **pack** 格式 | schema + `npm run pack` / `pack:install` | 🔄 |
| P1 | **消息协议** | [message-protocol.md](../design/message-protocol.md) + 示例 | 🔄 |
| P1 | ~~技能同步~~ | **不做** — 见 [skills/README.md](../../skills/README.md) | — |
| P2 | 第二 harness | 文档级适配（CLI / OpenHands 等） | ⏳ |
| P2 | flow_weight 扩展档 | 轻中/中重/重/全流程 模板 | ⏳ |

## 不做（v0.1 纪律延续）

- 不做通用 harness / IDE
- 不预设固定编制
- 竞品调研不自动升格 scope

## 里程碑建议

```
v0.1.0（⑤）→ v0.2.0（pack + 消息协议草案）→ v0.3.0（第二 harness POC）
```

跟踪：更新 `.agents/plan-progress.yaml` 或本文件表格。
