# Agent 工作区

本目录供 AI agent 在项目中读写上下文（计划进度、**本地私有审计**、消息、会话产物等）。

与 `agents/`（角色定义）区分：

- `agents/` — **谁**（角色编制）
- `.agents/` — **做了什么**（运行产物与元数据）

## 子目录

| 路径 | 说明 | 公开仓库 |
|------|------|----------|
| `plan-progress.yaml` | 计划与进度 | 可选提交 |
| `messages/` | 槽位结构化消息 | 可选提交 |
| `audit/` | **维护者审计报告** | **否**（`.gitignore`） |

审计规则与 schema 见 `docs/design/audit-by-flow-weight.md` · `docs/audit/README.md`。
