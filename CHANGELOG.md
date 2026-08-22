# 变更日志

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本遵循 [SemVer](https://semver.org/lang/zh-CN/)。

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

[0.6.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.6.0
[0.5.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.5.0
[0.4.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.4.0
[0.3.1]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.3.1
[0.3.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.3.0
[0.2.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.2.0
[0.1.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.1.0
