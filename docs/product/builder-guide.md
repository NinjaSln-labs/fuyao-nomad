# Builder 指南（v0.1）

## 快速开始

```bash
npm install
npm run validate    # roster · plan-progress · templates
npm test            # 脚本冒烟
npm run install:cursor-agents -- --project /path/to/project
npm run install:cursor-agents -- --check --project .   # 漂移检测
```

## 定义一支团队

1. 复制 [agents/examples/minimal-roster.yaml](../agents/examples/minimal-roster.yaml)
2. 加减 `slots`；`orchestration.serial_order` + `orthogonal_slots`（推进/审计）
3. **可选** `handoff.rules` — 不写则用 [默认 handoff](../design/default-handoff.md)
4. 设 `flow_weight`，配对 **三套模板**：
   - `docs/templates/dod-<weight>.yaml`
   - `docs/templates/verification-<weight>.yaml`
   - `docs/templates/ddd-gate-<weight>.yaml`
5. `npm run validate`

## 计划与进度

`.agents/plan-progress.yaml` — 见 [plan-progress-contract.md](../design/plan-progress-contract.md)。

里程碑可加 `audit_gate`。

## 领域与审计

- 术语：[domain-language.md](../design/domain-language.md)
- 分层审计：[audit-by-flow-weight.md](../design/audit-by-flow-weight.md)

## Cursor

- [harness/cursor/MAPPING.md](../../harness/cursor/MAPPING.md)
- 源文件：`harness/cursor/agents/`（**勿只改** `.cursor/agents/`）

## 许可与发布

- [Apache-2.0](../../LICENSE) · [CHANGELOG](../../CHANGELOG.md)
- 发布审计：[100/100](../audit/2026-08-22-v01-release-audit.md)
- 后续路线：[post-v01-roadmap.md](post-v01-roadmap.md)
