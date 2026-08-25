# LangGraph 薄适配 · 导出映射 POC

> **状态：③ 设计 · v0.9 文档级 POC**  
> 与 [Cursor MAPPING](../cursor/MAPPING.md) · [CrewAI MAPPING](../crewai/MAPPING.md) 同构精神；侧重 **图编排导出**。

## 原则

- roster YAML 为 harness 无关源
- 本目录仅 **映射说明 + 示例 mapping + node 片段**；不实现 LangGraph runtime
- 用户在自有仓库用 Python 按映射表组装 `StateGraph`

## 布局

| 扶摇 | LangGraph（示意） |
|------|-------------------|
| `agents/packs/<id>/roster.yaml` | 图拓扑输入（槽位 → node） |
| `harness/langgraph/mapping.yaml` | 槽位 id → node 名 |
| `harness/langgraph/nodes/` | node 职责 / prompt 片段 |

## 映射示例

见 [mapping.example.yaml](./mapping.example.yaml) — 对齐 `minimal-research-to-spec`。

## 加载流程（概念）

1. 读取 roster `slots` · `orchestration` · `orthogonal_slots`
2. 查 `mapping.yaml`：每个槽位 → 一个 StateGraph node
3. `serial_order` → 添加边 `research → spec`（示例）
4. `orthogonal_slots`（progress · auditor）→ 条件边 / `interrupt_before` / 旁路 node（由用户选型）
5. handoff / plan-progress → 作为 **外挂状态**（读 `.agents/` 或注入 `state` 字段）；图引擎不替代争用顾问
6. `gate_level: confirm` → `interrupt_before` 该 node（HITL）
7. 模型：按 [model-harness-contract.md](../../docs/design/model-harness-contract.md) 解析有效 hint → node / 可配置 model（**用户实现**）

## 示意拓扑（serial + 正交）

```text
        ┌─ progress（旁路 / 阻塞升级）
start → research → spec → end
        └─ auditor（阶段门 / interrupt）
```

## 与 Cursor 差异

| 项 | LangGraph POC | Cursor POC |
|----|---------------|------------|
| 安装脚本 | **无** | `install:cursor-agents` |
| 产物形态 | 图 node / 边语义 | `.cursor/agents/*.md` |
| 争用 | 仍跑 `check:contention` | 同左 |

## V0.9 验收

- [x] MAPPING.md + mapping.example.yaml
- [x] node 片段 — `nodes/`（Research · Spec · Progress · Auditor）
- [x] 明确不做 StateGraph 实现
