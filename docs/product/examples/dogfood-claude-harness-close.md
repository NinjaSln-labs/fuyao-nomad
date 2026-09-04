# Dogfood · claude 挂载关仓笔记

> v0.35 · 场景：[dogfood-claude-harness-scenario.md](./dogfood-claude-harness-scenario.md) · Sandbox：Mac `~/Documents/ninjasin-labs/fuyao-dogfood-claude-harness`

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-09-05 |
| **包** | minimal-research-to-spec @ 1.2.0（零改动 · 第五家） |
| **Harness** | **claude**（Claude Code v2.1.260 · print + `.claude/agents` subagents） |
| **模型** | **tokenrouter 第三方接入**（免费 glm-5.3-free · Anthropic 兼容端点）——无 Anthropic 订阅 |
| **flow_weight** | 中 · identity `ic-claude-mount` 满足（审计报告含满足性证据节 + blocker evidence） |
| **结论** | **挂载级成立** · audit verdict: pass_with_notes |

## 关仓要点

1. **无订阅形态实证（R13）**：Claude Code 原生只说 Anthropic 协议，`ANTHROPIC_BASE_URL` 指向
   TokenRouter 兼容端点即可接第三方模型——五家 harness 全部零新增订阅成本（pi/dsh 本地、
   cursor 订阅已有、qoder CN 免费额度、claude 免费 key 中转）
2. **候选 harness 全数挂载级**：v0.32–v0.35 五连版把「当前使用中」的 harness 全部实证——
   pi · dsh · cursor · qoder · claude，同一 pack 零改动五家通吃，「换 harness 只换映射表」主张
   五家闭环
3. **规格互动力样本（R14）**：免费模型（glm-5.3-free）驱动下 spec 子代理仍产出六项自曝式待确认
  清单——扶摇 confirm 门协议不依赖模型档次

## 落点证据（Mac sandbox 内）

- plan-progress 三绿（WSL 拉回验证）+ message 三类型全过 schema
- docs/research（含 429 限流实测 Fact）· docs/spec（五维验收 + 六项待确认）·
  .agents/audit（pass_with_notes + ic-claude-mount 满足性证据节，gate-confirm #6 裁决兑现）

## 移植版图（本版后 · 候选集全数完成）

```
pi ✅ 挂载级·真多实例（v0.32.1）· dsh ✅ 委派驱动（v0.33）· cursor ✅ CLI 委派（v0.34）
qoder ✅ headless 委派（v0.35）· claude ✅ 第三方模型接入（v0.35）
北极星「移植」2/2 达标 + 五家纵深全数闭环
langgraph/crewai ⏳ runtime smoke v0.36 · openhands ❄️ 冻结
```

## 备注

- `.claude/agents` 与 `.cursor/agents` 同款 frontmatter 形态（cursor 兼容读取 `.claude/agents`）——
  两者适配代码高度同构，MAPPING 差异仅第三方模型接入维
- dangerously-skip-permissions 为一次性沙盒偏差（gate-confirm #1 裁决记录）；正式挂载 runbook 应
  改用 `--allowedTools` 白名单
