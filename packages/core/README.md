# Core

Harness 无关的核心契约与校验。

## Schema（v0.1）

| 文件 | 说明 |
|------|------|
| [roster.schema.json](../../docs/design/schemas/roster.schema.json) | 团队 roster + `orthogonal_slots` |
| [plan-progress.schema.json](../../docs/design/schemas/plan-progress.schema.json) | 计划 + 进度 |
| [template-dod.schema.json](../../docs/design/schemas/template-dod.schema.json) | DoD 模板 |
| [template-verification.schema.json](../../docs/design/schemas/template-verification.schema.json) | 验证/审计模板 |
| [template-ddd-gate.schema.json](../../docs/design/schemas/template-ddd-gate.schema.json) | DDD 门模板 |
| [audit-record.schema.json](../../docs/design/schemas/audit-record.schema.json) | 审计记录 |
| [team-pack.schema.json](../../docs/design/schemas/team-pack.schema.json) | 团队包清单 |

## 脚本

```bash
npm run validate
npm test
npm run pack -- validate packs/<id>
npm run pack:install -- --pack packs/<id> --project .
npm run install:cursor-agents
```

## 设计文档

- [domain-language.md](../../docs/design/domain-language.md)
- [team-pack.md](../../docs/design/team-pack.md)
- [message-protocol.md](../../docs/design/message-protocol.md)
- [composition-protocol](../../docs/design/composition-protocol.md)
- [default-handoff](../../docs/design/default-handoff.md)
- [plan-progress-contract](../../docs/design/plan-progress-contract.md)
- [verification-by-flow-weight](../../docs/design/verification-by-flow-weight.md)
- [audit-by-flow-weight](../../docs/design/audit-by-flow-weight.md)
- [contention-rules](../../docs/design/contention-rules.md)
