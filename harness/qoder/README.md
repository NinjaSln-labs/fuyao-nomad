# qoder 薄适配

> **状态：v0.35 · 挂载级实跑**（移植验证第四家 · Mac 远程实测）  
> Qoder = 阿里 Agentic 编码平台（IDE + CLI）。本仓适配对象为 **Qoder CLI**（`qodercn -p` headless
> + `.qoder/agents/` 项目级 subagents）。  
> 设计契约：[pi-harness-contract.md](../../docs/design/pi-harness-contract.md)

| 项 | 值 |
|----|-----|
| **适配形态** | 槽位片段（`.qoder/agents/*.md` · qoder frontmatter）+ mapping |
| **主链槽位** | subagent 委派（`Use the <name> subagent ...` 显式点名） |
| **无头实跑** | `qodercn -p "<任务>"`（`--print` 一次性 · text/json/stream-json 输出） |
| **权限** | headless 默认拒绝需确认操作 → `--permission-mode accept_edits` / `--yolo`；或片段 `permissionMode` |
| **安装** | `npm install -g @qodercn-ai/qoderclicn`（CN）/ `@qoder-ai/qodercli`（国际） |
| **登录** | `qodercn login`（浏览器 OAuth）或 `QODERCN_PERSONAL_ACCESS_TOKEN`（CI/CD） |

## Qoder frontmatter（与 cursor 的差异）

| 字段 | cursor | **qoder** |
|------|--------|-----------|
| name / description | ✅ | ✅（description 驱动隐式选择；显式点名最稳） |
| model | `model: inherit` | `model: inherit / auto / lite / efficient / performance` |
| readonly | `readonly: true`（机制事实） | **无此字段** → 用 `tools` 白名单控制（只读 = 无 Write/Edit） |
| tools | 无（默认全量） | **有**：`tools: [Read, Grep, Glob]` / `Agent(name)` 限定再委派 |
| permissionMode | 无 | 有：default / acceptEdits / bypassPermissions / dontAsk / auto / plan |

**只读语义的翻译**：cursor 用 `readonly: true`；qoder 用 `tools` 白名单（auditor 片段 = 无 Write/Edit 的
只读审计，但审计报告写入由主会话或 `.agents/audit/` territory 约定承担——R8 的 qoder 侧解法）。

## 与 pi / dsh / cursor 对比

| 项 | pi | dsh | cursor | **qoder** |
|----|-----|-----|--------|-----------|
| 委派 | 无（人肉多实例） | ctx.subagents | `.cursor/agents` subagents | **`.qoder/agents` subagents（项目/用户/`--agents` 注入三级）** |
| headless | SDK 脚本 | `--profile headless` | `agent -p --trust` | **`qodercn -p`** |
| 落点 | `.agents/` 同构 | 同 | 同 | **同** |

换 harness 只换映射表，不换 roster / pack。
