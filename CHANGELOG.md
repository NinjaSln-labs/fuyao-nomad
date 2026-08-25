# 变更日志

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本遵循 [SemVer](https://semver.org/lang/zh-CN/)。

## [0.16.0] - 2026-08-25

### Added

- 身份约束契约 [identity-constraints.md](docs/design/identity-constraints.md)（intent 品类/形态词不可裁剪）
- plan-progress / 问题陈述 / PRD-lite schema 可选 `identity_constraints`
- DoD checklist `identity_constraints_held`（六档 + pack）
- dogfood 教训 [identity-constraints-lesson.md](docs/product/examples/identity-constraints-lesson.md)

### Changed

- 审计 / confirm 门 / builder 指南：对照 intent + 身份约束，不得只看漂移规格
- Cursor 槽位 prompt（auditor · spec · progress）对齐身份约束

## [0.15.0] - 2026-08-25

### Added

- `pack export` / `pack import`（import ≡ install）· fork 元数据（`--id`）
- 导入/导出指南 [pack-import-export.md](docs/design/pack-import-export.md)
- `harness_adapters.cli` / `openhands` 可选字段（同 spec 换映射）

### Changed

- team-pack 契约与 packs README / Builder 指南对齐 v0.15
- ROADMAP / post-v01 / 0-1-path：v0.15 落地

## [0.14.0] - 2026-08-25

### Added

- 对抗/边界可选模块 `adversarial-boundary-全流程.yaml` + schema（默认关闭；可并入代码质量审计）
- CLI / OpenHands 适配深化 [cli-openhands-adapter.md](docs/design/cli-openhands-adapter.md)（编排 · delegation · 模型 · 争用）

### Changed

- `harness/cli` · `harness/openhands` MAPPING / mapping.example 对齐深化指南
- ROADMAP / post-v01 / 0-1-path：v0.14 落地

## [0.13.0] - 2026-08-25

### Added

- 反指标模板 `anti-metrics-重.yaml` + `template-anti-metrics.schema.json`
- skills 引用/绑定指南 [skills-binding.md](docs/design/skills-binding.md)
- 全流程 DoD 可选项 `anti_metrics_reviewed`

### Fixed

- `check:traceability --strict` 成功时输出 `(strict)` 而非误标 `(advisory)`

### Changed

- ROADMAP / post-v01 / 0-1-path：v0.13 落地；后续候选更新

## [0.12.0] - 2026-08-25

### Added

- ADR 回填：`docs/decisions/adr-0001`–`0004` + 索引 README
- `validate` 扫描 `docs/decisions/adr-*.yaml`
- 问题陈述模板 `problem-statement-中.yaml` + schema
- PRD-lite 模板 `prd-lite-重.yaml` + schema（重端可选 · 非全局权威）
- 示例链 [problem-prd-chain.md](docs/product/examples/problem-prd-chain.md)

### Changed

- ROADMAP / post-v01：v0.12 主题落地；v0.13 候选（反指标 · skills）

## [0.11.0] - 2026-08-25

### Added

- 六档 DoD 模板均含 `checklist[].plan_refs`（轻 · 轻中 · 中 · 中重 · 重 · 全流程）
- 追溯契约轻/重端表补齐六档联动说明

### Fixed

- Windows 下 `validate` 用 `basename` 识别模板（此前路径含 `\` 导致模板被 skip）

### Changed

- `docs/templates/README` · pack `dod.yaml` 注释对齐

## [0.10.0] - 2026-08-25

### Added

- roster 级 `model_policy`（`default` · `by_slot_kind` · `by_slot`）· [model-harness-contract.md](docs/design/model-harness-contract.md)
- `install:cursor-agents --roster`：按优先级合并 mapping / slot / policy
- 示例与 pack roster 含 `model_policy`
- 多 harness 映射文档引用统一解析优先级（CLI · OpenHands · LangGraph · CrewAI）

### Changed

- `npm test` 增至 10 项（含 `--roster` model_policy 解析）

## [0.9.0] - 2026-08-25

### Added

- 编排导出映射契约 [export-orchestration-mapping.md](docs/design/export-orchestration-mapping.md)
- LangGraph 薄适配 POC：`harness/langgraph/`（MAPPING · mapping.example · nodes 片段）
- CrewAI Flow/Crew 薄适配 POC：`harness/crewai/`（MAPPING · mapping.example · agents 片段）
- 示例 [orchestration-export-mapping.md](docs/product/examples/orchestration-export-mapping.md)

### Changed

- `harness/README` · ROADMAP · 产品后 v0.1 路线：P2 导出映射勾选完成

## [0.8.0] - 2026-08-23

### Added

- 追溯链契约 [traceability-contract.md](docs/design/traceability-contract.md)（意图→领域→任务）
- plan-progress `traceability` · `domain_concept_ids` · `dod_checklist_ids`
- DoD 模板 `checklist[].plan_refs`（里程碑/工作项双向联动）
- `npm run check:traceability`（本地 advisory · `--strict` 用于 dogfood）
- [plan-dod-traceability-chain.md](docs/product/examples/plan-dod-traceability-chain.md) 示例

### Changed

- dogfood 计划与 `dod-中` / pack `dod.yaml` 补全联动引用
- `npm test` 增至 9 项（含 traceability 校验）

## [0.7.0] - 2026-08-23

### Added

- team-pack `pack_revision` · `published_at` · `fork` 元数据
- roster `model_hint` · Cursor mapping `model_hints`（install 时写入 agent `model`）
- [model-harness-contract.md](docs/design/model-harness-contract.md)
- 治理模板：`adr-中` · `stage-轻` · `commit-policy-中`
- 调研→规格→实现示例链 · [research-spec-impl-chain.md](docs/product/examples/research-spec-impl-chain.md)

## [0.6.0] - 2026-08-22

### Added

- progress · auditor harness 片段：`harness/cli/runners/` · `harness/openhands/agents/`
- `check:contention` 与 `progress.active_work_item_ids` 联动（active territory 重叠 · 脏文件跨领地）

### Changed

- 设计文档验收项收口（composition · escalation · plan-progress · capability-model 索引）
- `0-1-path` 阶段 ⑥ 标记完成

## [0.5.0] - 2026-08-22

### Added

- plan-progress `work_items[].territory` schema 字段 + 示例
- `check:contention` territory 重叠检测
- CLI runner 片段：`harness/cli/runners/`
- OpenHands agent 片段：`harness/openhands/agents/`
- CI：`check:contention --strict` 门禁步骤

### Changed

- v0.4 审计文档对齐（README · product 索引 · domain-language）

## [0.4.0] - 2026-08-22

### Added

- Message 校验：`agents/examples/messages/` · 可选 `.agents/messages/`
- `npm run check:contention` — git 脏文件 + 并行 roster 顾问报告
- [file-lock-contract.md](docs/design/file-lock-contract.md)
- OpenHands 薄适配 POC：`harness/openhands/`

## [0.3.1] - 2026-08-22

### Changed

- **审计记录改为本地私有**：自 `docs/audit/` 移除具体报告；维护者使用 `.agents/audit/`（已 `.gitignore`）
- 公开保留：`docs/audit/README.md` · `audit-record.schema.json` · 审计设计文档

## [0.3.0] - 2026-08-22

### Added

- `flow_weight` 扩展模板：轻中 · 中重 · 重 · 全流程（dod / verification / ddd-gate）
- CLI harness 薄适配 POC：`harness/cli/MAPPING.md` · `mapping.example.yaml`
- [escalation-protocol.md](docs/design/escalation-protocol.md)
- roster `orchestration.contention_policy`
- plan-progress `progress.messages_dir`

## [0.2.0] - 2026-08-22

### Added

- 团队包：`team-pack.schema.json` · `packs/minimal-research-to-spec` · `npm run pack` / `pack:install`
- 槽位消息协议：`message.schema.json` · [message-protocol.md](docs/design/message-protocol.md)
- `validate` 扫描 pack 清单与 `packs/*/examples/` 消息示例
- `install-cursor-agents --agents-dir`（pack 内 agents 安装）

### Changed

- 技能 **不同步到 harness** — 留在 `agents/packs/<id>/skills/`；仅 agents 写入 `.cursor/agents/`
- Builder 指南更新至 v0.2

### Fixed

- CI：`pack install` 测试先创建 `.scratch/` 再 `mkdtemp`

## [0.1.0] - 2026-08-22

### Added

- 产品文档：问题陈述、北极星、交付模式、能力模型、0→1 路径
- 设计契约：编制协议、默认 handoff、计划进度、验证/审计随 flow_weight、领域语言
- JSON Schema：roster、plan-progress、dod、verification、ddd-gate、audit-record
- 模板族：`dod` · `verification` · `ddd-gate`（轻/中）
- 校验与测试：`npm run validate`、`npm test`
- Cursor 薄适配 POC：`harness/cursor/` + `install:cursor-agents`
- 示例：minimal-roster、plan-progress
- CI：`.github/workflows/validate.yml`
- 审计：交付审计、修复复验、100/100 发布审计

### Notes

- **不做 harness** — `harness/` 仅为薄适配
- **无固定官方编制** — `agents/examples/` 可删改

[0.8.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.8.0
[0.7.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.7.0
[0.6.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.6.0
[0.5.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.5.0
[0.4.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.4.0
[0.3.1]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.3.1
[0.3.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.3.0
[0.2.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.2.0
[0.1.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.1.0
