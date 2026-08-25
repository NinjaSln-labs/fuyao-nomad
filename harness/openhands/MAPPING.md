# OpenHands 薄适配 · 映射 POC

> **状态：③ 设计 · v0.4 文档级 POC**  
> 与 [Cursor MAPPING](../cursor/MAPPING.md) · [CLI MAPPING](../cli/MAPPING.md) 同构。

## 原则

- roster 为 harness 无关源
- 本目录仅 **映射说明 + 示例 mapping**；不实现 OpenHands runtime

## 布局（草案）

| 扶摇 | OpenHands（示意） |
|------|-------------------|
| `agents/packs/<id>/roster.yaml` | 委派图 / agent 配置输入 |
| `harness/openhands/mapping.yaml` | 槽位 id → OpenHands agent 角色名 |
| `harness/openhands/agents/` | 角色 prompt 片段（v0.5 POC） |

## 映射示例

[mapping.example.yaml](./mapping.example.yaml) — 对齐 `minimal-research-to-spec`。

## 加载流程（概念）

1. 读取 roster `slots` 与 `orchestration`
2. 查 `mapping.yaml` 映射到 OpenHands 侧 agent/delegate 配置
3. handoff：`plan-progress.progress.handoff_snippet` 或 `.agents/messages/`
4. 并行：遵循 [file-lock-contract.md](../../docs/design/file-lock-contract.md)
5. 模型：roster `model_policy` / `model_hint` → runtime agent 配置（见 [model-harness-contract.md](../../docs/design/model-harness-contract.md)）

## 与 Cursor 差异

| 项 | OpenHands POC | Cursor POC |
|----|---------------|------------|
| 安装脚本 | **无** | `install:cursor-agents`（可 `--roster`） |
| 运行时 | OpenHands SDK / 服务 | `.cursor/agents/` |
| 模型 | 用户侧读有效 hint | 安装写入 `model:` |

## V0.4 验收

- [x] MAPPING.md + mapping.example.yaml
- [x] 示例 agent 片段 — `agents/`（Research · Spec · Progress · Auditor，v0.6）
