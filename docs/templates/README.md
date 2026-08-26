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
| `adr-中.yaml` | ADR 草案；已接受决策见 `docs/decisions/adr-*.yaml` |
| `commit-policy-中.yaml` | commit 策略与 `gate_level` 对齐 |
| `stage-轻.yaml` | 可配置阶段（非固定 S0–S5） |

## 研究与产品（v0.12+）

| 模板 | 说明 |
|------|------|
| `problem-statement-中.yaml` | 问题陈述实例化（叙述权威仍见 product/problem-statement.md） |
| `prd-lite-重.yaml` | 重端可选 PRD-lite；**非**全局最高权威 |

## 质量模块（v0.13+）

| 模板 | 说明 |
|------|------|
| `anti-metrics-重.yaml` | 反指标机制（自定义指标；非 R1/R2/R3）；轻端可关闭 |
| `adversarial-boundary-全流程.yaml` | 对抗/边界/容错可选模块（v0.14；默认 `enabled: false`） |

同一 `flow_weight` 下 DoD / verification / ddd-gate 三文件一起使用。

DoD `checklist[].plan_refs`（v0.8+，**六档已齐** v0.11）：与 plan-progress 里程碑/工作项双向联动；模板内 id 为**示例**，项目替换为自身 plan id。见 [traceability-contract.md](../design/traceability-contract.md)。

DoD `identity_constraints_held`（v0.16）：中档及以上 required；对照 [identity-constraints.md](../design/identity-constraints.md)。问题陈述 / PRD-lite schema 可选 `identity_constraints` 字段。

DoD `blocker_evidence_recorded`（v0.17）：中档及以上 required；身份类 blocker 清除须留 evidence。

## 设计参考

- [verification-by-flow-weight.md](../design/verification-by-flow-weight.md)
- [audit-by-flow-weight.md](../design/audit-by-flow-weight.md)
- [identity-constraints.md](../design/identity-constraints.md)
- [skills-binding.md](../design/skills-binding.md)
- [cli-openhands-adapter.md](../design/cli-openhands-adapter.md)
- [delivery-model.md](../product/delivery-model.md)
- [problem-prd-chain.md](../product/examples/problem-prd-chain.md)
- [identity-constraints-lesson.md](../product/examples/identity-constraints-lesson.md)

校验：`npm run validate`（含 `docs/templates/` · `docs/decisions/adr-*.yaml`）
