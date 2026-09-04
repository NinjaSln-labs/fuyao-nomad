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

解析优先级见 [model-harness-contract.md](../../docs/design/model-harness-contract.md)：

```
mapping.model_hints > slot.model_hint > model_policy.by_slot
> model_policy.by_slot_kind > model_policy.default
```

```bash
npm run install:cursor-agents -- --project . \
  --roster agents/examples/minimal-roster.yaml
```

未传 `--roster` 时仅应用 mapping `model_hints`（与 v0.7 兼容）。

## 并行

- `orchestration.mode=parallel` → Cursor `/multitask` 或并行 subagent（见 Cursor 文档）
- 争用规则：见 capability-model §2 P1（V1 文档级）

## 挂载步骤与维度增补（v0.34 实跑后）

- **readonly 维度（R8）**：`harness/cursor/agents/*.md` 的 `readonly: true` 是 cursor subagent 机制事实（只读语义）。
  **产物落盘型槽位挂载时须显式声明并移除该字段**（dogfood 场景如此）；只读审计槽位保留。
  pi/dsh 片段无此维度——三家片段差异最大处，挂载清单须逐 harness 核对 frontmatter
- **挂载步骤约定**：pack → `.cursor/agents/` 的同步由 `install:cursor-agents` 承担（脚本已存在）；
  sandbox 手工落位属实验偏离
- **WSL/headless 认证（R9）**：CLI `~/.config/cursor/auth.json` 可从 IDE 登录态（state.vscdb `cursorAuth/*`）合法迁移
- **print 委派（R10）**：`agent -p --trust` 一次性模式支持 subagents 委派；分段委派（每槽位一进程）
- **实跑证据**：[dogfood-cursor-harness](../../docs/product/examples/dogfood-cursor-harness-close.md)（v0.34 · 挂载级）

## V1 验收

- [x] `minimal-roster.yaml` 可映射到 ≥2 个 `.cursor/agents/*.md`
- [x] 换映射表不修改 roster 本体
- [x] `--roster` 合并 `model_policy`（v0.10）
