# CrewAI 薄适配 · 导出映射

> **状态：文档级（v0.36 对照标注）** —— 未实跑；LangGraph 侧已 runtime smoke 级（见 [langgraph MAPPING](../langgraph/MAPPING.md)）  
> 与 [LangGraph MAPPING](../langgraph/MAPPING.md) · [Cursor MAPPING](../cursor/MAPPING.md) 同构精神；侧重 **Flow / Crew 导出**。

## 原则

- roster YAML 为 harness 无关源
- 本目录仅 **映射说明 + 示例 mapping + agent 片段**；不实现 CrewAI runtime
- 用户在自有 Python 项目按映射表组装 Crew 或 Flow

## 布局

| 扶摇 | CrewAI（示意） |
|------|----------------|
| `agents/packs/<id>/roster.yaml` | Crew agents / Flow steps 输入 |
| `harness/crewai/mapping.yaml` | 槽位 id → Agent / step 名 |
| `harness/crewai/agents/` | 角色 prompt 片段 |

## 映射示例

见 [mapping.example.yaml](./mapping.example.yaml) — 对齐 `minimal-research-to-spec`。

## 加载流程（概念）

1. 读取 roster `slots` · `orchestration` · `orthogonal_slots`
2. 查 `mapping.yaml`：每个槽位 → 一个 CrewAI Agent（或 Flow method）
3. `serial_order` → Flow `@start` → `@listen` 链，或 Crew 顺序 tasks
4. `orthogonal_slots` → 独立 listener / 第二 Crew（progress · auditor）
5. handoff / plan-progress → Flow `state` 字段或外挂 YAML 路径
6. `gate_level: confirm` → human feedback / Flow pause（HITL）
7. 争用 · 追溯仍用扶摇脚本：`check:contention` · `check:traceability`
8. 模型：按 [model-harness-contract.md](../../docs/design/model-harness-contract.md) 解析有效 hint → Agent LLM 配置（**用户实现**）

## 示意 Flow（serial + 正交）

```text
@start research_step
    → @listen spec_step
         ↘ progress_listener（阻塞升级）
         ↘ auditor_listener（阶段门）
```

## Crew vs Flow

| 选型 | 适用 |
|------|------|
| **Crew** | 角色协作、任务委派与产出交接（贴近槽位） |
| **Flow** | 显式状态、事件驱动、HITL 门（贴近 orchestration + gate） |

POC **同时给出映射语义**；用户择一或组合，扶摇不规定必须用哪一层。

## 与 LangGraph 差异

| 项 | CrewAI | LangGraph |
|----|--------|-----------|
| 一等公民 | Agent / Flow step | Graph node / edge |
| HITL | human feedback / pause | 动态 `interrupt()` + `Command(resume=)`（R15） |
| 安装脚本 | 无 | 无 |
| **证据级** | **文档级**（v0.36 · 未实跑） | **runtime smoke 级**（v0.36 · 6/6 PASS） |

> v0.36 主计划 U1「二选一」选定 LangGraph 实跑（确定性 stub 可无 LLM 验证，守住「框架侧不调 LLM」边界）；
> CrewAI 维持文档级，smoke 参考实现待社区认领（形态可仿 `harness/langgraph/smoke/`）。

## 验收

- [x] MAPPING.md + mapping.example.yaml（v0.9）
- [x] agent 片段 — `agents/`（Research · Spec · Progress · Auditor）（v0.9）
- [x] 明确不做 CrewAI runtime（v0.9）
- [x] **v0.36 文档级诚实标注**（未实跑；LangGraph 侧 runtime smoke 已跑，两家证据级分层呈现）
