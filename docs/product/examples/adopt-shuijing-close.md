# Adopt 关仓 · shuijing

> `<ADOPT_ROOT>` · [scenario](./adopt-shuijing-scenario.md) · [vs-source](./adopt-vs-source-shuijing.md)

## 元信息

| 项 | 值 |
|----|-----|
| **flow_weight** | **轻中**（矩阵轻端首个 adopt） |
| **结论** | **closed** · git `e7488ea` |
| **harness** | **pi**（SDK AgentSession 三槽位 · 首个非 cursor adopt） |
| **源仓** | shuijing-v2 · **本会话零写入**（HEAD `83d645f` 未变 · 首尾 status 快照 diff 为空） |

## stage 自检（轻中档 s1–s3）

| stage | ✅ |
|-------|---|
| s1 research | ✅ 15 Fact 快照（pi research 独立实例 ×5 段产出） |
| s2 spec | ✅ 五概念规格 + 6 AC（confirm 门三项裁决：闭包封装 / 最小集 5 组 / 纯库无 CLI） |
| s3 impl + CQ audit | ✅ TDD v0 首跑红（1 fail）→ 实现 10/10 · auditor verdict: pass（行号级证据） |

## 校验

- `npm test` ✅ **10/10** · identity strict ✅ · traceability strict ✅ · contention 无冲突
- `ic-sole-commitment-exit` evidence ✅（blk-ic-v0: TDD 首跑红为 v0 违规证据 → 实现后 cleared）
- message 三类型：handoff（research→spec）· gate-confirm（三项裁决）· audit（verdict: pass）全落盘

## 关仓要点

1. **R16（headless 分段纪律收窄）**：pi SDK + kimi-k2.6 下「槽位片段前缀 + ≥2 文件并读 +
   长结构化产出要求」触发**读后停滞**（读完零 write、末轮纯 thinking）——七轮对照探针定位：
   单文件输入 + 填空模板产物稳定通过。对策固化：**1 输入文件/段 + 骨架填空**（v0.33
   「结构化模板+限定输入」纪律的进一步收窄：输入也须限 1）。
2. **dod-轻中模板示例 id 修正**（顺手清偿）：`docs/templates/dod-轻中.yaml` 前 3 项
   plan_refs 用 `m-done/wi-main` 孤例（dod-中 及其余档均用 m-spec/m-impl 惯例）——
   traceability strict 在轻中档必挂。已改齐惯例，nomad 21/47 无回归。
3. **identity 设计正面样本**：源仓「唯一承诺出口」原则直接翻译为闭包 token 强制
   （Symbol 模块私有 + 外部不可达），identity 从叙事到机器验证零损耗。

## 移植版图（本版后）

```
adopt 矩阵：qingfu（全流程）· shisui（中）· voyage（中）· shuijing（轻中 · pi harness）✅ 第 4 行
harness：五家挂载级 + langgraph runtime smoke · adopt 首证 pi 全程驱动可独立完成接手
```
