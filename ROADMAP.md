# 路线图 · Roadmap

> 与 [post-v01-roadmap.md](docs/product/post-v01-roadmap.md) 同步。

## 已完成

### v0.16.0（2026-08-25）

- 身份约束（`identity_constraints` · DoD · 审计/confirm）
- dogfood 教训沉淀（一句话品类词不可裁剪）

### v0.15.0（2026-08-25）

- 团队包 `export` / `import` + fork 元数据
- 同 spec 换映射指南 [pack-import-export.md](docs/design/pack-import-export.md)
- `harness_adapters` 支持可选 cli / openhands

### v0.14.0（2026-08-25）

- 对抗/边界可选模块 · CLI/OpenHands 适配深化

### v0.13.0（2026-08-25）

- 反指标模板 · skills 绑定 · traceability strict 文案

### 更早

见 [CHANGELOG.md](CHANGELOG.md)

## 后续

| 优先级 | 主题 | 状态 |
|--------|------|------|
| P1 | 团队包导入/导出 | ✅ v0.15.0 |
| 候选 | 身份约束（dogfood 协议补丁） | ✅ v0.16.0 |
| 候选 | Eval 三门禁（高风险可选） | P2 / 远期 |

## 里程碑

```
v0.15.0 ✅ → v0.16.0 ✅ 身份约束 → 后续候选（Eval P2）
```

## 不做

- 编排引擎 / 新 harness runtime
- `check:traceability` 入 CI
- 团队包市场 · Jira/Linear · Eval 三门禁（默认）
- 框架侧自动 NLP 抽身份词 / 强制调 LLM

## 原则

不做 harness · 技能不进 harness · 审计本地私有 · **不做** 编排 runtime

---

*Last updated: 2026-08-25*
