# Dogfood VI 场景 · changelog-slice（变更摘要切片）

> v0.24 · **flow_weight=中重**（五阶段 s1–s5）· 本地 sandbox  
> 桥接对照：[dogfood-v-scenario.md](./dogfood-v-scenario.md)（轻中）· [dogfood-ii-scenario.md](./dogfood-ii-scenario.md)（中）

## 1. 场景

| 项 | 值 |
|----|-----|
| **代号** | changelog-slice |
| **Intent** | 从用户提供的变更 bullet 列表生成 CHANGELOG `## [Unreleased]` 切片（Added/Changed） |
| **flow_weight** | **中重** |
| **identity** | `ic-change-only` — 每条 changelog 须对应输入 bullet；禁止编造未列出的变更 |
| **Sandbox** | `<SANDBOX_ROOT>` · 本地 · 不上 GitHub |

中重特征：**五阶段**（含 s3 设计审计、s5 实现审计）；DoD 含 `integration_risk_addressed`；verification 要求 **integration_key_paths**。

## 2. 五模板（来源 v0.23.0）

`stage-中重` · `commit-policy-中重` · `dod-中重` · `verification-中重` · `ddd-gate-中重`

## 3. stage 映射

| stage | plan | AC |
|-------|------|-----|
| s1 调研 | wi-research | 问题陈述 + 约束 |
| s2 规格 | wi-spec · m-spec（前） | 追溯 + 规格 |
| s3 设计审计 | m-spec · audit_gate: design | design-audit.md pass |
| s4 实现 | wi-impl | changelog.js + unit + integration test |
| s5 实现审计 | m-impl | implementation-audit.md pass |

## 4. 三层审计（sandbox 本地 md）

| 层 | 路径 |
|----|------|
| design | `.agents/audit/design-audit.md` |
| implementation | `.agents/audit/implementation-audit.md` |

code_quality 并入 implementation 自评或单独 note（中重 verification 要求 CQ depth）。

## 5. 验证

```powershell
npm test
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
node "$Fuyao\scripts\check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
```
