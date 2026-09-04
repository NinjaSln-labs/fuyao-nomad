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

## 3. 槽位展开（MAPPING 五维翻译实跑）

| 槽位 | pi 形态 | 实跑动作 |
|------|---------|---------|
| research | 主链实例 1（串行 s1） | 按 `harness/pi-agents/research-analyst.md` 片段入场 → 产出 research_snapshot |
| spec | 主链实例 2（串行 s2 · gate=confirm） | 读 handoff message 落点 → 产出规格 + 人确认身份词 |
| progress | **常驻正交实例** | 维护 plan-progress · 落点对比验证 · 触发审计 request |
| auditor | **常驻正交实例（只读）** | m-impl code_quality 门 → pass_with_notes |

## 4. 验收（DoD：intent_clear · plan_progress_synced）

- [x] 全程 pi 会话驱动（四槽位片段入场，零 cursor 机制）
- [x] handoff 经 `.agents/` 落点（不依赖会话记忆）
- [x] message 双类型落盘（handoff + request）— **仓内历史首次 message 文件实跑**
- [x] plan-progress schema validate ✅ · identity strict ✅ · traceability strict ✅
- [x] roster / pack 零改动（仅 harness 载体差异：`harness/pi-agents/` vs `.cursor/agents/`）

## 5. 关仓

见 [dogfood-pi-harness-close.md](./dogfood-pi-harness-close.md)。
