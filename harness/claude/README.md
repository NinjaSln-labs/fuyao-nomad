# claude 薄适配

> **状态：v0.35 · 挂载级实跑**（移植验证第五家 · Mac 远程实测 · 第三方模型接入形态）  
> Claude Code = Anthropic 官方 CLI coding agent（`.claude/agents/*.md` subagents）。  
> 设计契约：[pi-harness-contract.md](../../docs/design/pi-harness-contract.md)

| 项 | 值 |
|----|-----|
| **适配形态** | 槽位片段（`.claude/agents/*.md` · cursor 同款 frontmatter：name/description/model） |
| **主链槽位** | Task 工具委派 subagent（独立 context/transcript） |
| **无头实跑** | `claude -p "<任务>"`（print 模式 · `--dangerously-skip-permissions` / 权限配置） |
| **模型接入** | **第三方供应商**：`ANTHROPIC_BASE_URL` 指向 Anthropic 兼容端点（TokenRouter 实测：免费 glm-5.3-free 走 `/v1/messages`）——无 Anthropic 订阅可跑 |
| **安装** | `npm install -g @anthropic-ai/claude-code` |

## 第三方供应商接入（R13）

Claude Code 原生只说 Anthropic Messages 协议，但 `ANTHROPIC_BASE_URL` 可指向任何兼容端点：

```bash
export ANTHROPIC_BASE_URL=https://api.tokenrouter.com   # 该端点 /v1/messages 实测通
export ANTHROPIC_API_KEY=<tokenrouter-key>
export ANTHROPIC_MODEL=z-ai/glm-5.3-free                # 模型名覆盖（免费档）
export ANTHROPIC_SMALL_FAST_MODEL=z-ai/glm-5.3-free
```

- 实测证据：TokenRouter `/v1/messages` 返回标准 Anthropic 格式（message/content/usage/stop_reason），
  免费 glm-5.3 thinking 输出 200 OK；付费 Claude 系模型需账户余额
- 局限：非 Claude 模型下 Claude Code 的部分高级特性（context management 压缩等）可能降级——
  挂载验证（槽位委派 + 落点）不受影响
- 意义：**「用户已有的 harness + 用户已有的免费模型 key」即可挂载**——五家全部零新增订阅成本

## 与其他家对比

| 项 | cursor | qoder | **claude** |
|----|--------|-------|-----------|
| 片段目录 | `.cursor/agents/` | `.qoder/agents/` | **`.claude/agents/`（cursor 亦兼容读取）** |
| frontmatter | name/description/model/readonly | +tools/permissionMode | name/description/model（同 cursor 形态） |
| headless | `agent -p --trust` | `qoderclicn -p --permission-mode` | **`claude -p`** |

换 harness 只换映射表，不换 roster / pack。
