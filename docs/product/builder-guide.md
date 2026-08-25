# Builder 指南（v0.2）

## 快速开始

```bash
npm install
npm run validate    # roster · pack · templates · messages
npm run check:contention -- --project .   # 争用顾问（可选）
npm test
npm run pack:install -- --pack packs/minimal-research-to-spec --project .
npm run install:cursor-agents -- --check --project .   # 漂移检测
```

## 定义一支团队

**方式 A — 团队包（推荐）**

```bash
npm run pack:install -- --pack packs/minimal-research-to-spec --project .
```

安装结果：

| 路径 | 内容 |
|------|------|
| `agents/packs/<id>/` | roster · 模板 · 包内 `skills/` · `harness/cursor/` |
| `.cursor/agents/` | **仅** subagent 定义（薄适配） |

**方式 B — 手写 roster**

1. 复制 [agents/examples/minimal-roster.yaml](../agents/examples/minimal-roster.yaml)
2. 加减 `slots`；`orchestration.serial_order` + `orthogonal_slots`
3. **可选** `handoff.rules` — [默认 handoff](../design/default-handoff.md)
4. 设 `flow_weight`，配对三套模板（`docs/templates/`）
5. `npm run validate`

## 技能与 harness 边界

- **技能** harness 无关 — 路径引用，如 `agents/packs/<id>/skills/audit-readonly`
- **不同步到 harness** — 不写 `.cursor/skills`；扶摇不替 IDE 挂载技能
- **agents** 可经 `install:cursor-agents` 或 `pack:install` 写入 `.cursor/agents/`

见 [skills-binding.md](../design/skills-binding.md) · [skills/README.md](../../skills/README.md) · [team-pack.md](../design/team-pack.md)

## 计划与进度

`.agents/plan-progress.yaml` — [plan-progress-contract.md](../design/plan-progress-contract.md)

结构化槽位消息（可选）：[message-protocol.md](../design/message-protocol.md)  
追溯与 DoD 联动：[traceability-contract.md](../design/traceability-contract.md) · `npm run check:traceability`  
运行时建议目录：`.agents/messages/<roster-id>/`

## 团队包命令

```bash
npm run pack -- validate packs/<pack-id>
npm run pack:install -- --pack packs/<pack-id> --project /path/to/project
```

## 领域与审计

- [domain-language.md](../design/domain-language.md)
- [audit-by-flow-weight.md](../design/audit-by-flow-weight.md) — **规则**（公开）
- 具体审计报告：**本地** `.agents/audit/`（见 [docs/audit/README.md](../../audit/README.md)）

## Cursor 薄适配

- [harness/cursor/MAPPING.md](../../harness/cursor/MAPPING.md)
- 改源文件：`harness/cursor/agents/`（勿只改 `.cursor/agents/`）

## 许可与路线

- [Apache-2.0](../../LICENSE) · [CHANGELOG](../../CHANGELOG.md)
- [ROADMAP.md](../../ROADMAP.md) · [post-v01-roadmap.md](post-v01-roadmap.md)
