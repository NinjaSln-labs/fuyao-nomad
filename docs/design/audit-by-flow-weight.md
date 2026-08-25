# 分层审计 · 随 flow_weight

> **状态：③ 设计 · v0.1**  
> 能力域：质量 §5 · 推进 §3（阶段门）· 治理 §6（留痕）  
> 与 [verification-by-flow-weight.md](./verification-by-flow-weight.md) **并列**：验证偏「跑通/证据」；审计偏「对照标准做评审」。

## 三类审计

| 类型 | 时机 | 看什么 |
|------|------|--------|
| **设计审计** | 实现前 / 阶段门 | DDD、架构、规格一致性、边界、追溯是否缺口 |
| **实现审计** | 实现中 / 阶段末 | 实现是否对齐设计与任务；invariant/追溯；交接是否完整 |
| **代码质量审计** | 实现后 / 合并前 | 坏味、安全、可维护性、测试充分性、风格与依赖 |

不是 Voyage 式「百波审计」默认 — **深度与频次随 `flow_weight` 伸缩**；重端/全流程可加旋转维度（继承 Voyage **结构**，非体量）。

## 与推进（计划 / 里程碑）

里程碑可声明 **审计门**（`audit_gate`），未通过则阶段不推进：

```
调研 → 规格 → [设计审计] → 实现 → [实现审计] → [代码质量审计] → 完成
```

轻端可合并为一次「轻量核对」；重端拆分三次，由 `slot_kind: auditor` 或 `verifier` 执行。

## 随 flow_weight 伸缩（草案）

### 设计审计

| flow_weight | 深度 |
|-------------|------|
| **轻** | 意图与范围自洽；无明显领域冲突（可自评） |
| **中** | DDD 核心：术语、BC/聚合草图、与任务追溯 |
| **重** | + 架构与规格交叉核对；Major 问题清零方可实现 |
| **全流程** | + 多层文档审计、设计评审轮次（按需，非默认 12 轮） |

### 实现审计

| flow_weight | 深度 |
|-------------|------|
| **轻** | 变更对应意图；关键路径可说明 |
| **中** | 对照设计/任务；DoD 勾选；handoff 产物齐全 |
| **重** | + invariant/追溯矩阵；跨槽位一致性 |
| **全流程** | + 分层审计记录（fixed/recorded 分类，非百波） |

### 代码质量审计

| flow_weight | 深度 |
|-------------|------|
| **轻** | lint/格式（若项目有）；无明显安全问题 |
| **中** | 变更范围代码评审；测试与 build 已过关 |
| **重** | + 安全面、依赖、可维护性；第二槽位或 readonly auditor |
| **全流程** | + 更广维度（可选对抗输入/边界模块）→ [adversarial-boundary-全流程.yaml](../templates/adversarial-boundary-全流程.yaml) |

## 审计产物（契约字段建议）

```yaml
audit:
  type: design | implementation | code_quality
  flow_weight: 中
  verdict: pass | pass_with_notes | blocked
  findings:
    - severity: critical | major | minor | note
      location: path or doc ref
      status: fixed | recorded | open
  auditor_slot_id: auditor
  recorded_at: "2026-08-22T00:00:00Z"
```

- **blocked** → 写入 `progress.blockers` → 默认 handoff 升级  
- 治理层决策/授权记录仍见治理域；本 schema 偏 **质量评审结论**

## 与槽位

| slot_kind | 职责 |
|-----------|------|
| `verifier` | 跑测试、核对证据、轻量核对 |
| `auditor` | 设计/实现/代码质量评审（建议 readonly） |

可合并为一个槽位并绑 audit + verification skills，但 schema 上类型分开便于 roster 加减。

## 与 Voyage / 青蚨使

| 继承 | 修正 |
|------|------|
| 发现表（severity、fixed/recorded） | 不默认每波独立 md 文件 |
| 旋转审计维度 | 重端/全流程可选 |
| 三层层文档审计 | 设计审计重端启用 |
| — | 不用 R1/R2/R3 作默认反指标；用 [anti-metrics-重.yaml](../templates/anti-metrics-重.yaml) 自定义 |

## 身份约束（不可裁剪）

审计**不得只对照已可能漂移的规格正文**。须同时核对：

1. `plan-progress.intent` 原文  
2. `identity_constraints[]`（若有）— phrase 是否仍在交付物中成立  
3. DoD `identity_constraints_held`

未满足 → `verdict: blocked`，写入 `progress.blockers`（或按 `enforcement: abolish` 建议废除），**不得**因「规格已改成不依赖 X」而判 pass。

见 [identity-constraints.md](./identity-constraints.md)。

## V1 验收

- [x] `中` flow_weight 示例含三类审计各至少 1 条检查项（`verification-中.yaml`）
- [x] 里程碑可表达 `audit_gate`（`plan-progress.example.yaml` · `m-design-audit`）
- [x] 与 verification 模板并列，不重复「测试已通过」与「代码质量审计」职责
- [x] 身份约束对照规则写入本文件（v0.16）
