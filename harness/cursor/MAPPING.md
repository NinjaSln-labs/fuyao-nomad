# Cursor 薄适配 · 映射 POC

> **状态：③ 设计 · v0.1**  
> 团队 spec 不变；本文件仅描述 **槽位 → Cursor 运行时** 映射。

## 原则

- roster YAML 为 harness 无关源
- 映射表可 per-project、per-harness 多套

## 文件布局

| 扶摇 | Cursor |
|------|--------|
| `agents/examples/*.yaml` roster | 参考源，不直接加载 |
| `harness/cursor/agents/*.md` | `.cursor/agents/*.md` subagent 定义 |
| `harness/cursor/mapping.yaml` | 槽位 id → agent 文件名 |

## 映射表示例

见 [mapping.example.yaml](./mapping.example.yaml)。

## 加载流程（POC）

1. 读取 roster `slots[].id`
2. 查 `mapping.yaml` 得 subagent 名
3. 若存在 `harness/cursor/agents/<name>.md`，复制或 symlink 到 `.cursor/agents/`
4. 主 agent 按 `orchestration` 与默认 handoff 委派

## 模型（harness）

`model_hint` 与 mapping `model_hints` 由 harness 翻译；见 [model-harness-contract.md](./model-harness-contract.md)。

## 并行

- `orchestration.mode=parallel` → Cursor `/multitask` 或并行 subagent（见 Cursor 文档）
- 争用规则：见 capability-model §2 P1（V1 文档级）

## V1 验收

- [x] `minimal-roster.yaml` 可映射到 ≥2 个 `.cursor/agents/*.md`
- [x] 换映射表不修改 roster 本体
