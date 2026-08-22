# 模板族

与 `flow_weight` 绑定，**三套并列**（非合体文件）：

| 类型 | 文件示例 | 说明 |
|------|----------|------|
| **DoD** | `dod-轻.yaml` · `dod-中.yaml` | 交付物、边界、完成勾选 |
| **验证+审计** | `verification-轻.yaml` · `verification-中.yaml` | 测试/证据 + 三类审计深度 |
| **DDD 门** | `ddd-gate-轻.yaml` · `ddd-gate-中.yaml` | 设计门前检查 |

同一 `flow_weight` 下三文件一起使用。

详表：

- [verification-by-flow-weight.md](../design/verification-by-flow-weight.md)
- [audit-by-flow-weight.md](../design/audit-by-flow-weight.md)
- [domain-language.md](../design/domain-language.md)

校验：`npm run validate`
