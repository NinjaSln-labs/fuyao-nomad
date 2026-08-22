# 0→1 路径

## 阶段分层

| 层 | 内容 | 状态 |
|----|------|------|
| **① 发现** | 问题陈述、北极星、交付模式、竞品调研 | ✅ 定稿 |
| **② 定义** | 能力模型、成功标准、定位 | ✅ 定稿 |
| **③ 设计** | schema、handoff、审计、Cursor 映射 | ✅ v0.1 |
| **④ 交付** | 校验、模板、测试、CI、审计修复 | ✅ v0.1 |
| **⑤ 开源发布** | LICENSE、README、CHANGELOG、100/100 审计 | ✅ **v0.1.0** |
| **⑥ 后 v0.1** | pack · 消息 · 六档模板 · CLI POC | ✅ **v0.3.0** |

## 当前落点

| 阶段 | 状态 |
|------|------|
| ①–⑤ | ✅ **v0.1.0 可发布** |
| ⑥ | ▶ 见 [post-v01-roadmap.md](post-v01-roadmap.md) |

## ⑤ 产出

| 产出 | 路径 |
|------|------|
| 许可 | [LICENSE](../../LICENSE) |
| 变更日志 | [CHANGELOG.md](../../CHANGELOG.md) |
| 贡献 | [CONTRIBUTING.md](../../CONTRIBUTING.md) |
| 发布审计 100/100 | [release-audit](../audit/2026-08-22-v01-release-audit.md) |

## ④ 产出（摘要）

| 产出 | 路径 |
|------|------|
| 校验 | `npm run validate` |
| 模板族 | `docs/templates/` |
| Builder 指南 | [builder-guide.md](builder-guide.md) |
| 交付审计 | [delivery-audit](../audit/2026-08-22-v01-delivery-audit.md) |

## 下一步（⑥）

1. 团队包 pack 格式 schema
2. 槽位消息协议草案
3. 第二 harness 文档 · 消息协议 schema

## 纪律

- **不做 harness** — 薄适配 only
- **无固定编制** — [composition-protocol.md](../design/composition-protocol.md)
- **轻-重流程重量** — [delivery-model.md](delivery-model.md)
