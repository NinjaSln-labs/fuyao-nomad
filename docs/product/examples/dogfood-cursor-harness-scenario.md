# Dogfood · cursor harness 挂载实跑场景

> v0.34 · [关仓笔记](./dogfood-cursor-harness-close.md)  
> Sandbox：`fuyao-dogfood-cursor-harness`（本地 only · 不上 GitHub）  
> 前置：v0.31 把 cursor 从隐含「实跑」诚实降级为安装级——本版补挂载级实证

## 1. 目的

在 cursor harness（Cursor CLI `agent` print 模式 + `.cursor/agents` subagents 委派）下挂载并实跑
minimal-research-to-spec——首家适配目录的**回归实证**（移植验证第三家 · 纵深扩展）。

## 2. 环境与挂载

- **CLI 安装**：官方安装脚本（`curl https://cursor.com/install | bash` → `~/.local/bin/agent`，v2026.09.02）
- **认证**：`~/.config/cursor/auth.json` 从 Windows 侧 IDE 登录态合法复用（state.vscdb `cursorAuth/*` → auth.json；WSL 无浏览器场景路径，R9）
- **挂载**：`pack:install` 同源 pack + `harness/cursor/agents/*.md` → `.cursor/agents/`（本次 sandbox 手工落位；正式挂载由 `install:cursor-agents` 承担）

## 3. 链执行（CLI print 委派 · 分段）

驱动形态：`agent -p --trust "<任务>"`（headless 一次性 · 父会话只协调不代写）。

| 步 | 槽位 | 委派形态 | 产物 |
|----|------|---------|------|
| s1 | research | `.cursor/agents/research-analyst.md` subagent | `docs/research/cursor-subagents-snapshot.md`（官方文档引用）+ `1200-handoff.yaml` |
| 门 | —（操作者） | confirm 人核 | `1230-gate-confirm.yaml`（spec §4 六项裁决） |
| s2 | spec | spec-writer subagent（输入=落点） | `docs/spec/cursor-mount-spec.md`（五维验收 + 逐词核对 + 待确认节） |
| 门 | auditor | quality-auditor subagent | `.agents/audit/cursor-mount-audit.md`（pass_with_notes）+ `1245-audit.yaml` |
| 收 | progress | 协调收尾 | `docs/verify/landing-comparison.md` + blocker evidence |

**机制探针先行**：正式链前先以 probe-agent 验证 `.cursor/agents` 委派真实成立（子代理独立回话），
再跑全链——与 dsh 版「机制核实先行」同纪律。

## 4. cursor 特有维度（R8–R10）

- **R8（readonly frontmatter）**：仓内片段 `readonly: true` 是 cursor 机制事实（subagent 只读语义）；
  dogfood 落盘需要 → sandbox 副本移除该字段。三家片段差异最大的一维（pi/dsh 无此字段）。
  **挂载约定**：readonly 维度须在挂载时显式声明（v0.34 MAPPING 增补）
- **R9（凭据复用）**：WSL 无浏览器场景，CLI 认证可从 IDE 登录态（state.vscdb cursorAuth）合法迁移
- **R10（print 委派）**：`-p --trust` 一次性模式支持 subagents 委派；分段委派（每槽位一进程）与 dsh R6 同形态

## 5. 校验

- validate / identity strict / traceability strict：三绿
- message schema：handoff + request + audit 三类型过验
- auditor 独立 verdict：`pass_with_notes`（notes 为 plan-progress 复用副本的历史噪音——裁决见 gate-confirm）
