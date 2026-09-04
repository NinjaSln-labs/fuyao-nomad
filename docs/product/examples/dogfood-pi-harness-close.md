# Dogfood · pi harness 挂载关仓笔记

> v0.32.1 · 场景：[dogfood-pi-harness-scenario.md](./dogfood-pi-harness-scenario.md)  
> Sandbox：`fuyao-dogfood-pi-harness`（本地 only · 不上 GitHub）

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-09-04（round 2 多实例补测） |
| **包** | minimal-research-to-spec @ 1.2.0 |
| **Harness** | **pi**（挂载级实跑 — 移植验证第一家） |
| **flow_weight** | 中 · identity `ic-pi-mount` 满足（auditor 逐词核对） |
| **结论** | **挂载级成立（真多实例）** · audit pass_with_notes |

## 证据等级演进（诚实记录）

| 轮 | 驱动方式 | 证据等级 |
|----|---------|---------|
| round 1 | 单 pi 会话扮演全部角色（我作为操作者连续上下文） | **单会话链级**（不足以称挂载级——被用户质疑后认定） |
| **round 2** | **3 个独立 SDK AgentSession**（research/spec/auditor），fresh context、片段开场、仅经 `.agents/` 落点通信 | **挂载级** ✅ |

round 1 产物归档 sandbox `docs/round1-archive/`；挂载级结论以 round 2 为准。

## round 2 实跑机制（SDK 多实例）

- 每槽位 `createAgentSession()` 独立 spawn（pi SDK），context 完全隔离
- 槽位片段（`harness/pi-agents/<slot>.md`）作会话首 prompt
- **会话间零共享记忆**：spec 实例仅靠读 handoff message 落点获知 research 结论
- 产出全部由对应实例独立完成（research 快照 / spec 规格含 confirm 门核对 / auditor 审计 + request message）

## 落点证据（sandbox 内 · round 2）

| 落点 | 文件 | 校验 |
|------|------|------|
| plan-progress | `.agents/plan-progress.yaml` | validate ✅ · identity strict ✅ · traceability strict ✅ |
| handoff message | `.agents/messages/.../2026-09-04T2100-handoff.yaml` | message schema ✅ |
| request message | `.agents/messages/.../2026-09-04T2130-request.yaml` | message schema ✅（auditor 独立产出） |
| 工作产物 | `docs/research/multi-instance-snapshot.md`（Fact×4 引 pi 官方原文）· `docs/spec/multi-instance-mount-spec.md` · `docs/verify/landing-compare-r2.md` | — |
| 审计 | `.agents/audit/round2-multi-instance-audit.md` | pass_with_notes（身份词逐词 ✅） |

## 落点同构结论（移植核心验证）

| 维度 | cursor 挂载 | pi round 2 | 同构 |
|------|------------|---------|------|
| spec 层（`.agents/` 结构 · schema · id 集） | ✅ | ✅ | **✅ 完全一致** |
| harness 载体 | `.cursor/agents/` | pack 内 `harness/pi-agents/` | 允许差异 |

## 多实例协作发现（round 2 独有 → 已转待办）

- **R3（写冲突现场）**：spec 实例更新 plan-progress 时把 `blockers` 重置为 `[]`，覆盖 progress 先落的身份证据——contention-rules 原则 3 的**活案例**（检测→progress 协调→恢复，全流程走通）。处置：evidence 重落 + identity strict 恢复绿。**MAPPING 增补**（v0.32.1 已入）：plan-progress 为共享可变落点，多实例并发写须声明 territory 归属
- R4：auditor 独立实例对 round 2 自身 verdict `pass_with_notes`
- R1/R2（round 1 发现）维持：cursor 样本 `status: closed` 存量偏差（债务归档）；message 文件实跑仓内首次

## 移植验证进度

```
pi ✅ 挂载级·真多实例（v0.32.1 · 本笔记）
dsh ⏳ v0.33 · cursor ⏳ 挂载级补测 v0.34 · qoder ⏳ v0.35（Mac runbook）· claude ⏳ v0.35
（后续实况：五家已于 v0.32–v0.35 全数挂载级 · 见 [harness/README](../../../harness/README.md) 证据级表）
openhands ❄️ 冻结 · langgraph/crewai ⏳ runtime smoke v0.36
```

北极星「移植」（同一团队包 ≥2 harness 挂载）进度：**1/2**。
