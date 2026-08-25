# 路线图 · Roadmap

> 与 [post-v01-roadmap.md](docs/product/post-v01-roadmap.md) 同步。

## 已完成

### v0.9.0（2026-08-25）

- 编排导出映射契约 · [export-orchestration-mapping.md](docs/design/export-orchestration-mapping.md)
- LangGraph / CrewAI Flow 薄适配 POC（MAPPING · mapping.example · 角色片段）
- 示例 · [orchestration-export-mapping.md](docs/product/examples/orchestration-export-mapping.md)

### v0.8.0（2026-08-23）

- 追溯链 schema · [traceability-contract.md](docs/design/traceability-contract.md)
- 计划↔DoD 双向 `plan_refs` · dogfood 示例
- `check:traceability`（本地 · 未入 CI）

### v0.7.0（2026-08-23）

- team-pack `pack_revision` · `fork` 元数据
- roster `model_hint` · Cursor `model_hints` 安装
- 治理模板：ADR · stage · commit-policy
- 调研→规格→实现 dogfood 链

### v0.6.0（2026-08-22）

- progress · auditor harness 片段
- `active_work_item_ids` 争用联动

### v0.5.0 及更早

见 [CHANGELOG.md](CHANGELOG.md)

## 后续

| 优先级 | 主题 | 状态 |
|--------|------|------|
| P1 | 计划↔DoD 联动示例深化 · 追溯链 | ✅ v0.8.0 |
| P2 | LangGraph / CrewAI Flow 导出映射 POC | ✅ v0.9.0 |

## 里程碑

```
v0.6.0 ✅ → v0.7.0 ✅ → v0.8.0 ✅ → v0.9.0 ✅ 编排导出 POC
```

## 原则

不做 harness · 技能不进 harness · 审计本地私有 · **不做** 编排 runtime

---

*Last updated: 2026-08-25*
