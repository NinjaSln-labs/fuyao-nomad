# 模板族

与 `flow_weight` 绑定，**三套并列**（DoD · verification · ddd-gate）。

## 档位

| flow_weight | dod | verification | ddd-gate |
|-------------|-----|--------------|----------|
| 轻 | `dod-轻.yaml` | `verification-轻.yaml` | `ddd-gate-轻.yaml` |
| 轻中 | `dod-轻中.yaml` | `verification-轻中.yaml` | `ddd-gate-轻中.yaml` |
| 中 | `dod-中.yaml` | `verification-中.yaml` | `ddd-gate-中.yaml` |
| 中重 | `dod-中重.yaml` | `verification-中重.yaml` | `ddd-gate-中重.yaml` |
| 重 | `dod-重.yaml` | `verification-重.yaml` | `ddd-gate-重.yaml` |
| 全流程 | `dod-全流程.yaml` | `verification-全流程.yaml` | `ddd-gate-全流程.yaml` |

## 治理与阶段（v0.7+）

| 模板 | 说明 |
|------|------|
| `adr-中.yaml` | ADR 草案 |
| `commit-policy-中.yaml` | commit 策略与 `gate_level` 对齐 |
| `stage-轻.yaml` | 可配置阶段（非固定 S0–S5） |

同一 `flow_weight` 下三文件一起使用。

DoD `checklist[].plan_refs`（v0.8+，**六档已齐** v0.11）：与 plan-progress 里程碑/工作项双向联动；模板内 id 为**示例**，项目替换为自身 plan id。见 [traceability-contract.md](../design/traceability-contract.md)。

## 设计参考

- [verification-by-flow-weight.md](../design/verification-by-flow-weight.md)
- [audit-by-flow-weight.md](../design/audit-by-flow-weight.md)
- [delivery-model.md](../product/delivery-model.md)

校验：`npm run validate`
