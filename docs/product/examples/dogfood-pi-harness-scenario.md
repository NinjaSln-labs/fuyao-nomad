# Dogfood · pi harness 挂载实跑场景

> v0.32 · **移植验证第一家** · harness: pi（挂载级）  
> 矩阵对照：[dogfood-matrix-comparison.md](./dogfood-matrix-comparison.md) · 适配：[harness/pi/](../../../harness/pi/)

## 1. 目标

在 **pi**（AI coding CLI，无内置 subagent）下挂载扶摇团队包，实跑一条完整「调研→规格」链，验证 **`.agents/` 落点与 cursor 挂载同构**（北极星「移植」标准的第一块实跑证据）。

| 项 | 值 |
|----|-----|
| **代号** | pi-harness-mount |
| **Harness** | pi（会话实例 + skill 片段形态；人即编排） |
| **Sandbox** | `fuyao-dogfood-pi-harness` · 本地 · 不上 GitHub |
| **flow_weight** | 中 |
| **identity** | `ic-pi-mount` — 全程 pi 会话实例驱动槽位，禁止退化回 cursor subagents 或单 agent 长 prompt |

## 2. 与其它 dogfood 的差异

| | 档位 dogfood（ii–viii） | **本场景** |
|--|------------------------|-----------|
| 验证轴 | flow_weight 模板矩阵 | **harness 移植**（同一 pack 换挂载点） |
| 编排 | 默认（cursor 安装） | pi 会话角色串行/常驻约定 |

## 3. 槽位展开（MAPPING 五维翻译实跑 · round 2 真多实例）

**驱动机制（v0.32.1 补测后）**：每槽位为**独立 SDK AgentSession**（`createAgentSession()` spawn，fresh context），以槽位片段为首 prompt；会话间零共享记忆，仅经 `.agents/` 落点通信。round 1 单会话链证据降级归档。

| 槽位 | pi 形态 | 实跑动作（独立实例） |
|------|---------|---------|
| research | 独立实例 s1 | 片段开场 → 调研 pi 多实例机制（Fact×4 引官方原文）→ 产出快照 + handoff message 落点 |
| spec | 独立实例 s2（gate=confirm） | **仅读 handoff 落点**获知 research 结论 → 产出规格（含身份词逐词核对） |
| progress | 常驻协调 | 维护 plan-progress · R3 写冲突处置（contention 活例）· 触发审计 |
| auditor | 独立只读实例 | m-impl 门 → pass_with_notes + request message 落盘 |

## 4. 验收（DoD：intent_clear · plan_progress_synced）

- [x] 全程 pi 会话驱动（四槽位片段入场，零 cursor 机制）
- [x] handoff 经 `.agents/` 落点（不依赖会话记忆）
- [x] message 双类型落盘（handoff + request）— **仓内历史首次 message 文件实跑**
- [x] plan-progress schema validate ✅ · identity strict ✅ · traceability strict ✅
- [x] roster / pack 零改动（仅 harness 载体差异：`harness/pi-agents/` vs `.cursor/agents/`）

## 5. 关仓

见 [dogfood-pi-harness-close.md](./dogfood-pi-harness-close.md)。
