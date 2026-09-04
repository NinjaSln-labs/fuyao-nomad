# Dogfood · cursor harness 挂载关仓笔记

> v0.34 · 场景：[dogfood-cursor-harness-scenario.md](./dogfood-cursor-harness-scenario.md)  
> Sandbox：`fuyao-dogfood-cursor-harness`（本地 only · 不上 GitHub）

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-09-05 |
| **包** | minimal-research-to-spec @ 1.2.0（同源零改动 · 第三家） |
| **Harness** | **cursor**（Cursor CLI v2026.09.02 · print 模式 + `.cursor/agents` subagents） |
| **flow_weight** | 中 · identity `ic-cursor-mount` 满足（auditor 核对 + blocker evidence） |
| **结论** | **挂载级成立** · audit pass_with_notes |

## 关仓要点

1. **首家适配目录的回归实证**：v0.31 诚实降级（安装级）→ 本版以 CLI print 委派补足挂载级证据——
   「只到安装级」的欠账清偿
2. **落点同构（骨架级）**：与 pi / dsh 全同构——plan-progress 三绿 + 四类型 message
   （handoff / status 隐含 / request-gate-confirm / audit）+ docs 双产物 + audit 报告
3. **pack 零改动三家通吃**：同一 pack 在 pi / dsh / cursor 三家挂载实跑，roster / pack / schema 零改动
   ——「换 harness 只换映射表」的三家实证

## cursor 特有发现（R8–R10）

- **R8（readonly 维度）**：cursor 片段 frontmatter `readonly: true` 是机制事实；产物落盘型槽位须移除。
  pi/dsh 片段无此字段——三家片段差异最大维度，MAPPING 已增补「readonly 维度挂载时显式声明」
- **R9（WSL 凭据复用）**：CLI auth.json 可从 Windows IDE 登录态（state.vscdb cursorAuth）合法迁移——
  WSL/headless 场景的认证路径
- **R10（print 委派实证）**：`agent -p --trust` 支持委派 subagents；机制探针先行（probe-agent）再全链

## 移植版图（本版后）

```
pi ✅ 挂载级·真多实例（v0.32.1）· dsh ✅ 挂载级·委派驱动（v0.33）· cursor ✅ 挂载级·CLI 委派（v0.34）
北极星「移植」2/2 达标 + 第三家纵深 ✅
qoder/claude ⏳ v0.35（Mac runbook）· langgraph/crewai ⏳ runtime smoke v0.36 · openhands ❄️ 冻结
（后续实况：qoder/claude 已于 v0.35 挂载级（Mac 远程直测）· 候选五家全数收敛）
```

## 备注

- sandbox 内 plan-progress 为 dsh 副本复用（改名/ic 换 cursor），auditor notes 指出的 pi/dsh 残留文案属
  副本历史噪音（gate-confirm 裁决记录）——不影响挂载结论；三家骨架 diff 见 landing-comparison
- message schema 三类型（handoff/request/audit）在本链全部实测过验——message 体系跨 harness 稳定性的直接证据
