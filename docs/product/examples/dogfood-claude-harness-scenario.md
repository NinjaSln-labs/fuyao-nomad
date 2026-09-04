# Dogfood · claude 挂载实跑场景

> v0.35 · [关仓笔记](./dogfood-claude-harness-close.md) · Sandbox：`fuyao-dogfood-claude-harness`（Mac · 本地 only）

## 1. 目的

在 claude harness（Claude Code print 模式 + `.claude/agents` subagents）下挂载并实跑
minimal-research-to-spec——移植验证第五家。特色：**无 Anthropic 订阅的第三方模型接入形态**（R13）。

## 2. 环境与挂载（Mac 远程 · 第三方模型）

- **CLI 安装**：`npm install -g @anthropic-ai/claude-code`（v2.1.260 · `--allow-scripts` 后需重装激活原生二进制）
- **模型接入（无订阅）**：
  ```bash
  export ANTHROPIC_BASE_URL=https://api.tokenrouter.com   # Anthropic 兼容端点 /v1/messages（实测 200）
  export ANTHROPIC_API_KEY=<tokenrouter-key>              # 用户既有免费 key（~/.pi/agent/models.json）
  export ANTHROPIC_MODEL=z-ai/glm-5.3-free                # 免费模型
  export ANTHROPIC_SMALL_FAST_MODEL=z-ai/glm-5.3-free
  export CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT=1  # 非官方名录模型窗口校验抑制
  ```
- **挂载**：pack 零改动 + `harness/claude/agents/*.md` → `.claude/agents/`

## 3. 链执行（print 分段委派）

| 步 | 槽位 | 形态 | 产物（全部子代理写） |
|----|------|------|---------------------|
| s1 | research | `claude -p`（stdin 传任务）+ Task 委派 | 快照（Fact×3 + 429 限流实测记录）+ handoff + plan-progress |
| 门 | —（操作者） | confirm 人核 | gate-confirm（六项裁决） |
| s2 | spec | spec-writer 委派 | 五维验收规格 + 六项待确认清单（含风险自曝） |
| 门 | auditor | quality-auditor 委派 | 审计报告（pass_with_notes + ic-claude-mount 满足性证据节）+ audit message |
| 收 | progress | WSL 三绿 | 落点对比 + blocker evidence |

## 4. 发现

- **R13（第三方模型接入）**：tokenrouter `/v1/messages` Anthropic 兼容端点 + 免费 glm-5.3-free 跑通
  Claude Code 全链——「用户已有 harness + 已有免费 key」零新增订阅成本。副作用如实记录：
  unrecognized-model 警告（抑制开关）、免费档 429（重试即成功）
- **R14（确认门互动力）**：spec 子代理六项待确认自曝（skip-permissions 风险 / 档位坍缩 / 证据缺口）+
  操作者逐项裁决落盘——confirm 门降级形态下最完整的闭环样本
