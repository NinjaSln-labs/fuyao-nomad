# Dogfood · dsh harness 挂载实跑场景

> v0.33 · [关仓笔记](./dogfood-dsh-harness-close.md)  
> Sandbox：`fuyao-dogfood-dsh-harness`（本地 only · 不上 GitHub）

## 1. 目的

在 dsh（DeepSeek Harness · 构建在 pi 之上的 profile/plugin 层 harness）下挂载并实跑
minimal-research-to-spec——**验证 `ctx.subagents` 委派通道能否驱动扶摇槽位链**。
这是移植验证第二家：与 pi（人肉多实例）不同，dsh 有机制化的 subagent 委派——
扶摇槽位首次实现**自动委派驱动**（父会话协调，子代理产产物）。

## 2. 挂载操作

```bash
# sandbox 拷入 pack（与 pi 版同源——pack 零改动验证）
cp -r <fuyao-nomad>/agents/packs/minimal-research-to-spec/* agents/packs/minimal-research-to-spec/
cp <fuyao-nomad>/harness/dsh/agents/*.md agents/packs/minimal-research-to-spec/harness/dsh-agents/
# plan-progress 基于模板落 .agents/，intent 改 dsh 声明
```

适配层只有：槽位片段（`harness/dsh-agents/`）+ MAPPING 差异维翻译。roster / pack / schema 零改动。

## 3. 链执行（ctx.subagents 委派 · headless 无头模式）

驱动形态：`dsh --profile headless "<任务>"`（一次性模式 · 退出码 0/1 · 无 GUI）。
分段委派（每槽位一进程——headless「一次一任务」语义，R6 发现）：

| 步 | 槽位 | 委派形态 | 产物（全部子代理自己写） |
|----|------|---------|------------------------|
| s1 | research | one-shot 子代理 | `docs/research/dsh-subagent-snapshot.md`（Fact×21 引证）+ `1000-handoff.yaml` + plan-progress edit |
| 门 | —（操作者） | confirm 门人核 | `1050-gate-confirm.yaml`（S-01..S-09 + 第 0 维共 10 项裁决） |
| s2 | spec | one-shot 子代理（fresh 进程，输入=落点） | `docs/spec/dsh-mount-spec.md`（24 AC + 三家 tree diff + 逐词核对） |
| 门 | auditor | one-shot 子代理（只读） | `.agents/audit/dsh-mount-audit.md`（pass_with_notes）+ `1100-request.yaml` |
| 收 | progress | 协调收尾 | `docs/verify/landing-comparison.md` + blocker evidence |

**委派真实性证据**（`.dsh/sessions/` 会话日志）：
- 父会话：`subagent` 工具调用（label = 槽位任务）；产物核查用 grep（协调者行为，非代写）
- 子代理：`subagent/descriptor`（`mode: one-shot · provider: spawn`）+ 独立 `session.jsonl`，
  产物性 write 全部发生在子代理会话内

## 4. 五维翻译实测（dsh MAPPING）

| 维度 | 结果 |
|------|------|
| 槽位→委派 | ✅ 父会话读片段原文委派（子代理以片段为角色指令） |
| 正交→continuable | ◐ 按 S-03 降级裁决：按需委派 + 状态落盘（与 pi 文件驱动同构） |
| model→agentOptions | ◐ 按 S-01 降级裁决：dsh 片段 frontmatter 无 model 承载面，委派时显式传参或省略继承（AC-M3 观测替代） |
| serial→落点守门 | ✅ 父会话委派前查落点（AC-S2/S3 补偿谓词实测） |
| 无头实跑 | ✅ headless 分段全链 + 退出码判定（R5/R6 两条任务设计约定反哺 MAPPING） |

## 5. 校验

- validate / identity strict / traceability strict：三绿
- message schema：handoff + request 双类型过验
- auditor 独立 verdict：`pass_with_notes`（N-1..N-6 明细，N-1/N-2 已当场处置）
