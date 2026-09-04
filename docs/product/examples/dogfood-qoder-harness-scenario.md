# Dogfood · qoder 挂载实跑场景

> v0.35 · [关仓笔记](./dogfood-qoder-harness-close.md) · Sandbox：`fuyao-dogfood-qoder-harness`（Mac · 本地 only）

## 1. 目的

在 qoder harness（**Qoder CLI CN** headless + `.qoder/agents` 项目级 subagents）下挂载并实跑
minimal-research-to-spec——移植验证第四家。Mac 远程实跑（R11 形态：harness 在 Mac、协调者在 WSL）。

## 2. 环境与挂载（Mac 远程）

- **CLI 安装**：`npm install -g @qodercn-ai/qoderclicn`（CN 版 · v1.1.44）——国际版 `@qoder-ai/qodercli` 已装但账号 credit 耗尽，**CN 账号（yangleitest）独立额度可用**
- **登录**：`qodercn login`（浏览器 OAuth · Mac GUI 经 SSH `open` 打开授权页）
- **挂载**：pack（`packs/minimal-research-to-spec` 零改动）+ `harness/qoder/agents/*.md` → `.qoder/agents/`（scp 推送）
- **验证识别**：`qoderclicn agents list` 显示 4 个 Project 级 agent

## 3. 链执行（headless 分段委派）

| 步 | 槽位 | 命令形态 | 产物（全部子代理写） |
|----|------|---------|---------------------|
| 探针 | probe-agent | `qodercn -p "use the probe-agent subagent..."` | 委派回话实证 |
| s1 | research | `qoderclicn -p "use the research-analyst subagent..." --permission-mode accept_edits` | 快照 + handoff + plan-progress |
| 门 | —（操作者） | confirm 人核 | gate-confirm（§D 四项裁决） |
| s2 | spec | spec-writer 委派 | 五维验收表规格（含待确认节） |
| 门 | auditor | quality-auditor 委派 | 审计报告 + audit message（verdict: pass） |
| 收 | progress | WSL 侧三绿 | 落点对比 + blocker evidence |

## 4. 发现

- **R11（远程跨机实跑）**：SSH + scp 落点同步 + WSL 三绿验证——harness 不在本机不再阻塞挂载验证
- **R12（frontmatter 能力面梯度）**：qoder（model+tools+permissionMode）> cursor（model+readonly）> dsh（无承载面）——MAPPING 对照表固化
- 沙盒偏差如实记录：外部文档不可达（research 快照 Assumption 标注）、plan-progress 副本残留（gate-confirm 裁决修正）
