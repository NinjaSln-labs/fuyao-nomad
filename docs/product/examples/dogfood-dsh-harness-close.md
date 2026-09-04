# Dogfood · dsh harness 挂载关仓笔记

> v0.33 · 场景：[dogfood-dsh-harness-scenario.md](./dogfood-dsh-harness-scenario.md)  
> Sandbox：`fuyao-dogfood-dsh-harness`（本地 only · 不上 GitHub）

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-09-05 |
| **包** | minimal-research-to-spec @ 1.2.0（与 pi 实跑同源 · 零改动） |
| **Harness** | **dsh**（DeepSeek Harness · pi 之上）—— 挂载级实跑（移植验证第二家） |
| **flow_weight** | 中 · identity `ic-dsh-mount` 满足（auditor 逐词核对 + blocker evidence） |
| **结论** | **挂载级成立** · audit pass_with_notes · **北极星「移植」2/2 达标** ✅ |

## 结论要点

1. **委派通道成立**：`ctx.subagents` 完整承载扶摇槽位链——research（one-shot）→ 人核门 →
   spec（one-shot）→ auditor（one-shot 只读）→ progress 收尾。父会话全程只协调不代写
   （会话日志实证：产物性 write 全在子代理 session.jsonl）
2. **落点同构（骨架级）**：plan-progress 三绿 + messages 双类型（handoff / request / gate-confirm）
   + docs/research · docs/spec · .agents/audit——与 cursor 基准、pi round 2 同构
3. **pack 零改动跨 harness**：与 pi 实跑完全同源的 pack 在 dsh 下直接挂载——
   「换 harness 只换映射表」的移植主张**第二家实证**

## 发现（R5–R7 · 已反哺 MAPPING）

- **R5（headless 长任务停滞）**：auditor 全量任务在低配模型上流式停滞 30+ 分钟（工具调用 37/37
  配对后无产出）；**精简任务模板**（给定结论框架 + 限定读取清单）即 9 分钟完成。
  → 无头实跑任务设计约定：结构化模板 + 限定输入，写入 MAPPING
- **R6（分段委派）**：单 headless 进程 540s 跑不完三槽位——分段（每槽位一进程）即协议内形态
- **R7（confirm 门降级实证）**：dsh 无执行期阻断，降级为「产物内待确认节 + 人核落盘」
  （gate-confirm message）可行——S-05 裁决的实证
- 子代理审计还独立发现 N-1（gate-confirm 自述修复 3/4——spec-writer 残留 pi 引用），
  当场修复并回流仓内 `harness/dsh/agents/`（S-02 同款问题一并清偿）

## 五维翻译降级裁决（gate-confirm 十项 · S-01/S-03/S-05 关键）

| 降级项 | 裁决 | 实证 |
|--------|------|------|
| model 承载面缺失（S-01） | 委派时显式传 agentOptions / 省略继承 | AC-M3 观测替代 |
| 常驻语义无对应（S-03） | 按需委派 + 状态落盘（与 pi 文件驱动同构） | 本链即此形态 |
| confirm 门无阻断（S-05） | 待确认节 + 人核落盘 | gate-confirm message |

## 移植验证进度（本版后）

```
pi ✅ 挂载级·真多实例（v0.32.1）· dsh ✅ 挂载级·委派驱动（v0.33）—— 北极星 2/2 达标
cursor ⏳ v0.34 挂载级补测 · qoder/claude ⏳ v0.35 · langgraph/crewai ⏳ runtime smoke v0.36
openhands ❄️ 冻结（无维护者环境）
```

后续 harness 实跑（cursor 补测、qoder、claude）为纵深扩展，北极星「移植」标准已达标。
