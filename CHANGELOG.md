# 变更日志

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本遵循 [SemVer](https://semver.org/lang/zh-CN/)。

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

[0.3.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.3.0
[0.2.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.2.0
[0.1.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.1.0
