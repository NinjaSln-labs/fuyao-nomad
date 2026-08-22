# 路线图 · Roadmap

> 公开路线图 — 与 [docs/product/post-v01-roadmap.md](docs/product/post-v01-roadmap.md) 同步更新。

## 已完成 · Shipped

### v0.2.0（2026-08-22）

- 团队包：schema · 官方 pack · `pack` / `pack:install`
- 槽位消息协议：schema · 文档 · pack 内示例
- 技能 harness 无关原则（不同步到 `.cursor/skills`）
- Builder 指南 v0.2 · CI 测试修复

### v0.1.0（2026-08-22）

- 产品与设计文档、JSON Schema 基线、模板族、validate/test、CI
- Cursor 薄适配 POC · 100/100 发布审计

## 进行中 · In progress

| 优先级 | 主题 | 目标版本 | 状态 |
|--------|------|----------|------|
| P2 | 第二 harness 适配文档 | v0.3.0 | 待启动 |
| P2 | `flow_weight` 扩展档 | v0.3.0 | 待启动 |
| P2 | 争用与升级协议 | v0.3.0 | 待启动 |

## 里程碑 · Milestones

```
v0.1.0 ✅ 开源基线
v0.2.0 ✅ pack + 消息协议 schema
    ↓
v0.3.0   第二 harness POC + 扩展 flow_weight 模板
```

## 原则 · Principles

- **不做 harness** — `harness/` 仅薄适配
- **技能不同步到 harness** — 只路径引用
- **无固定官方编制**
- **DDD 必要** · **竞品去权威化**

## 如何参与

[CONTRIBUTING.md](CONTRIBUTING.md) · GitHub Issues

---

*Last updated: 2026-08-22*
