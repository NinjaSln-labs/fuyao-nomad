# 路线图 · Roadmap

> 公开路线图 — 与 [docs/product/post-v01-roadmap.md](docs/product/post-v01-roadmap.md) 同步更新。

## 已完成 · Shipped

### v0.1.0（2026-08-22）

- 产品与设计文档：问题陈述、北极星、能力模型、编制协议、领域语言
- JSON Schema：roster、plan-progress、dod、verification、ddd-gate、audit-record
- 模板族（`flow_weight` = 轻 / 中）
- `npm run validate` · `npm test` · GitHub Actions CI
- Cursor 薄适配 POC + `install:cursor-agents`
- 发布审计 100/100

## 进行中 · In progress

| 优先级 | 主题 | 目标版本 | 状态 |
|--------|------|----------|------|
| P0 | 团队包 **pack** 格式 | v0.2.0 | 规划中 |
| P1 | 槽位 **消息协议**（harness 无关） | v0.2.0 | 规划中 |
| P1 | 技能同步 `skills/` → harness | v0.2.x | 规划中 |
| P2 | 第二 harness 适配文档 | v0.3.0 | 待启动 |
| P2 | `flow_weight` 扩展档（轻中/中重/重/全流程） | v0.3.0 | 待启动 |

## 里程碑 · Milestones

```
v0.1.0 ✅ 开源基线
    ↓
v0.2.0   pack + 消息协议草案
    ↓
v0.3.0   第二 harness POC + 扩展 flow_weight 模板
```

## 原则 · Principles（延续 v0.1）

- **不做 harness** — `harness/` 仅薄适配
- **无固定官方编制** — 示例可删改
- **DDD 必要** — 新术语进 domain-language
- **竞品去权威化** — 调研不自动升格 scope

## 如何参与

见 [CONTRIBUTING.md](CONTRIBUTING.md)。功能请求与讨论请使用 GitHub Issues。

---

*Last updated: 2026-08-22*
