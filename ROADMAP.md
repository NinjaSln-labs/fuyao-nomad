# 路线图 · Roadmap

> 与 [post-v01-roadmap.md](docs/product/post-v01-roadmap.md) 同步。

## 已完成

### v0.25.0（2026-08-27）

- Dogfood VII 全流程 grant-gate · 独立 sandbox · m-release 授权门
- dogfood 矩阵满（六档 + 桥接 + 全流程）

### v0.24.0（2026-08-27）

- Dogfood VI 中重 changelog-slice

### v0.23.0（2026-08-27）

- Dogfood V 轻中 · pack triple harness 1.2.0

### v0.22.0（2026-08-27）

- Dogfood playbook 完整 0–8 步 · 步 7 CLI 双 harness
- minimal-research-to-spec pack_revision 1.1.0

### v0.21.0（2026-08-27）

- Dogfood IV：audit-trail · flow_weight=重 · 六阶段 · 三层审计
- dogfood 轻/中/重矩阵对照表

### v0.20.0（2026-08-27）

- Dogfood III：todo-strip · flow_weight=轻 五模板实跑
- playbook：轻档两阶段 · sandbox 本地 only

### v0.19.0（2026-08-27）

- Dogfood II：reading-card sandbox · flow_weight=中 五模板实跑
- dogfood-playbook 六档模板绑定节 · dogfood-ii 场景/关仓范例

### v0.18.0（2026-08-27）

- stage / commit-policy 六档模板矩阵
- audit-record 可选评分字段 · identity skip/advisory 测试
- capability-model 已交付 P1 勾选对齐

### v0.17.0（2026-08-26）

- 协议硬化：blocker evidence · `check:identity` · dogfood 剧本 · 复盘
- Eval 三门禁可选模块（默认关闭）

### v0.16.0（2026-08-25）

- 身份约束（`identity_constraints` · DoD · 审计/confirm）
- dogfood 教训沉淀（一句话品类词不可裁剪）

### v0.15.0（2026-08-25）

- 团队包 `export` / `import` + fork 元数据
- 同 spec 换映射指南 [pack-import-export.md](docs/design/pack-import-export.md)
- `harness_adapters` 支持可选 cli / openhands

### 更早

见 [CHANGELOG.md](CHANGELOG.md)

## 后续

| 优先级 | 主题 | 状态 |
|--------|------|------|
| — | 无强制功能切片 | 稳态 |
| 候选 | 更远 P2（包市场等） | 非默认 |

## 里程碑

```
v0.24.0 ✅ 中重桥接档 → v0.25.0 ✅ 全流程 grant-gate → **稳态 · 矩阵满**
```

## 不做

- 编排引擎 / 新 harness runtime
- `check:traceability` / `check:identity` 入 CI
- 团队包市场 · Jira/Linear · Eval 默认开启
- 框架侧自动 NLP 抽身份词 / 强制调 LLM

## 原则

不做 harness · 技能不进 harness · 审计本地私有 · **不做** 编排 runtime

---

*Last updated: 2026-08-27*
