# Dogfood · qoder 挂载关仓笔记

> v0.35 · 场景：[dogfood-qoder-harness-scenario.md](./dogfood-qoder-harness-scenario.md) · Sandbox：Mac `~/Documents/ninjasin-labs/fuyao-dogfood-qoder-harness`

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-09-05 |
| **包** | minimal-research-to-spec @ 1.2.0（零改动 · 第四家） |
| **Harness** | **qoder**（Qoder CLI CN v1.1.44 · headless + `.qoder/agents`） |
| **flow_weight** | 中 · identity `ic-qoder-mount` 满足（blocker evidence + 三绿） |
| **结论** | **挂载级成立** · audit verdict: pass |

## 关仓要点

1. **第五维 harness 的 frontmatter 能力面最强者**：qoder 片段可承载 model + tools 白名单 +
   permissionMode——tools 白名单使「只读审计槽位」（无 Write/Edit）成为机制事实（cursor readonly、
   dsh 委派参数之外的第三种解法，R12 梯度固化于 MAPPING 对照表）
2. **CN/国际双轨**：国际版（qoder.com）账号 credit 耗尽 → CN 版（qoder.cn · `@qodercn-ai/qoderclicn`）
   账号独立、额度可用——同产品双账号体系的实跑路径记录
3. **远程跨机实跑形态成立**（R11）：SSH 推装 + scp 落点同步 + WSL 侧三绿验证——v0.35 原约束
   「Mac runbook 待维护者执行」升级为「远程直测闭环」，无需 Mac 侧人工操作步骤

## 落点证据（Mac sandbox 内）

- plan-progress 三绿（validate + identity strict + traceability strict，WSL 拉回验证）
- message 三类型：`1300-handoff` · `1330-gate-confirm`（人核 §D 四项）· `1345-audit`——全过 schema
- docs/research（Fact×3 引证）· docs/spec（五维验收 + 逐词核对）· .agents/audit（verdict: pass）

## 移植版图（本版后）

```
pi ✅ · dsh ✅ · cursor ✅ · qoder ✅（第四家）· claude ✅（v0.35 同版 · 见 claude 关仓）
langgraph/crewai ⏳ runtime smoke v0.36 · openhands ❄️ 冻结
```
