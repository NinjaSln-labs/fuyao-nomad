# 路线图 · Roadmap

> 与 [post-v01-roadmap.md](docs/product/post-v01-roadmap.md) 同步。

## 已完成

### v0.14.0（2026-08-25）

- 对抗/边界可选模块 `adversarial-boundary-全流程` + schema
- CLI / OpenHands 适配深化 [cli-openhands-adapter.md](docs/design/cli-openhands-adapter.md)

### v0.13.0（2026-08-25）

- 反指标模板 `anti-metrics-重` + schema
- skills 引用/绑定指南 [skills-binding.md](docs/design/skills-binding.md)
- `check:traceability --strict` 成功文案修正

### v0.12.0（2026-08-25）

- ADR 回填 · decisions 索引 · `validate` 扫描 decisions
- 问题陈述（中）· PRD-lite（重）模板 + 示例链

### v0.11.0 及更早

见 [CHANGELOG.md](CHANGELOG.md)

## 后续

| 优先级 | 主题 | 状态 |
|--------|------|------|
| P1 | 对抗/边界 · CLI/OpenHands 深化 | ✅ v0.14.0 |
| 候选 | 团队包导入/导出体验深化 | 远期 |
| 候选 | Eval 三门禁（高风险可选） | P2 / 远期 |

## 里程碑

```
v0.13.0 ✅ → v0.14.0 ✅ 对抗/边界 + CLI/OpenHands → 后续候选
```

## 不做

- 编排引擎 / 新 harness runtime
- `check:traceability` 入 CI
- 团队包市场 · Jira/Linear · Eval 三门禁（默认）

## 原则

不做 harness · 技能不进 harness · 审计本地私有 · **不做** 编排 runtime

---

*Last updated: 2026-08-25*
