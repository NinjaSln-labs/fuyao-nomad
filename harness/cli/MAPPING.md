# CLI 薄适配 · 映射 POC

> **状态：③ 设计 · v0.14 深化**  
> **非运行时** — 仅描述槽位 → CLI 编排入口的映射约定。  
> 深化指南：[cli-openhands-adapter.md](../../docs/design/cli-openhands-adapter.md)

## 原则

与 [cursor/MAPPING.md](../cursor/MAPPING.md) 相同：

- roster 为 harness 无关源
- 本目录仅 **映射表 + 说明**；不实现 CLI harness

## 布局

| 扶摇 | CLI harness（示意） |
|------|----------------------|
| `agents/packs/<id>/roster.yaml` | 编排配置输入 |
| `harness/cli/mapping.yaml` | 槽位 id → runner 角色名 |
| `harness/cli/runners/` | 各角色 prompt/配置片段（可选） |

## 映射示例

见 [mapping.example.yaml](./mapping.example.yaml) — 与 minimal-research-to-spec 对齐；可含 `model_hints`。

## 加载流程（概念）

1. 读取 roster `slots[].id` 与 `orchestration`
2. 查 `mapping.yaml` 得 runner 名
3. CLI 编排器按 `serial_order` 或 `parallel_groups` 调用 runner
4. `orthogonal_slots`（progress · auditor）旁路调度，不插入主链除非项目约定
5. handoff 载体：`plan-progress.progress.handoff_snippet` 或 `.agents/messages/`
6. 模型：读有效 hint（优先级见 [model-harness-contract.md](../../docs/design/model-harness-contract.md)）；建议 env 约定见深化指南
7. 争用：扶摇侧 `npm run check:contention`（不进 CLI runtime）

## 与 Cursor 差异

| 项 | Cursor | CLI POC |
|----|--------|---------|
| 运行时 | `.cursor/agents/*.md` | 进程/子命令（由用户 CLI 实现） |
| 并行 | subagent / multitask | 进程池或任务队列 |
| 安装 | `install:cursor-agents`（可 `--roster`） | **无** — 仅文档与 mapping |
| 模型 | 写入 agent `model:` | runner 读有效 hint / 环境变量 |

## 验收

- [x] MAPPING.md + mapping.example.yaml
- [x] 示例 runner 片段 — `runners/`（research · spec · progress · auditor）
- [x] 编排 / 模型 / 争用语义与深化指南对齐（v0.14）
