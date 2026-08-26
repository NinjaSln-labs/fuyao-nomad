# Eval 三门禁（可选模块）

> **状态：v0.17 设计** · 能力模型 §5 P2  
> 模板：`docs/templates/eval-gates-重.yaml` · Schema：`template-eval-gates.schema.json`

## 目的

为 **高风险 AI 产品**提供可选评测门禁声明：任务 / 安全 / 回归。  
框架 **不执行** 评测、**不调 LLM**；只要求启用时声明门禁与证据落点。

## 何时启用

- `flow_weight` 建议 **重** 或 **全流程**  
- 产品主路径依赖模型输出，且错误代价高（安全、合规、资金、医疗等）  
- 轻/中档默认 **关闭**（`enabled: false`）

## 与相邻机制

| 机制 | 默认 | 作用 |
|------|------|------|
| [identity-constraints](./identity-constraints.md) | 有品类词应填 | **硬约束**；裁剪不可删 |
| [adversarial-boundary](../templates/adversarial-boundary-全流程.yaml) | false | 对抗输入 / 边界 / 容错用例 |
| **eval-gates（本模块）** | false | 任务评测 / 安全评测 / 回归评测三门 |

Eval **不替代** identity：启用 Eval 前身份约束仍须满足（或诚实 blocker + evidence）。

## 三门

| id | kind | 含义 |
|----|------|------|
| `task_eval` | task | 关键验收信号与身份约束有可复现评测记录 |
| `safety_eval` | safety | 越权/有害/密钥泄漏等有最小拒答或降级检查 |
| `regression_eval` | regression | 已知金样/清单不回退 |

每门含：`statement` · `signal` · 可选 `evidence` · `severity_level` · `required_when_enabled`。

## 与审计 / DoD

- 可 `fold_into_code_quality_audit: true` 并入代码质量审计扩展  
- DoD checklist：`eval_gates_reviewed`（重/全流程；`required: false`；仅 `enabled: true` 时须勾）  
- auditor：模块启用时对照三门与 evidence 落点  

## V1 验收

- [x] 模板默认 `enabled: false`  
- [x] schema + `npm run validate`  
- [x] 与 identity / adversarial 边界写入本文  

## 不做

- Eval 入 CI 或默认 DoD required  
- 框架侧自动跑模型评测套件  
- 红蓝/百波评测作轻端默认  
