# 编排导出映射契约

> **状态：runtime smoke 级（v0.36 · LangGraph 侧实跑）**  
> 能力域：[capability-model.md](../product/capability-model.md) §2 · §8  
> 适配目录：[harness/langgraph/](../../harness/langgraph/) · [harness/crewai/](../../harness/crewai/)

## 目的

把扶摇 **团队层声明**（roster · orchestration · handoff · plan-progress）翻译成外部编排 runtime 可消费的 **映射表**，**不实现** LangGraph / CrewAI 引擎。

```
roster / pack（harness 无关）
        │
        ▼
  导出映射表（本契约 + harness/*/MAPPING.md）
        │
   ┌────┴────┐
   ▼         ▼
LangGraph   CrewAI Flow
（用户侧实现图/Flow）
```

## 边界

| 做 | 不做 |
|----|------|
| 槽位 → Node / Agent / Flow step 语义映射 | Python 编排 runtime |
| 串行 / 并行 / 正交槽位 → 图边 / Flow 监听语义 | 替代 Cursor / OpenHands 薄适配 |
| handoff · plan-progress · 争用 → 状态字段建议 | 内置 LLM 调用 |
| 示例 mapping + 角色片段 | 安装脚本（对比 Cursor） |

## 公共映射表

| 扶摇 | LangGraph | CrewAI Flow |
|------|-----------|-------------|
| `slots[].id` | StateGraph **node** id | Agent 名 / Flow **step** |
| `orchestration.mode=serial` + `serial_order` | 有向边链式 `A → B` | `@start` → `@listen` 顺序 |
| `orchestration.mode=parallel` | fan-out / `Send`（示意） | 并行 task / 多 Crew |
| `orthogonal_slots`（progress · auditor） | 条件边 / interrupt / 旁路 node | Flow 事件监听或独立 Crew |
| `handoff` / messages | `state` 通道字段 | Flow state / task output |
| `plan-progress` | checkpoint 外挂状态文件路径 | Flow state 引用路径 |
| `gate_level: confirm` | **node 内动态 `interrupt()` + `Command(resume=)` 续跑**（R15 修订，见 [langgraph MAPPING](../../harness/langgraph/MAPPING.md)） | human feedback / Flow pause |
| `model_policy` / `model_hint` | node 可配置 model（runtime） | Agent LLM 配置（runtime） |
| `check:contention` | **仍在扶摇侧**跑顾问；不进图引擎 | 同左 |

## 导出产物（建议布局）

```
harness/<runtime>/
  MAPPING.md              # 语义与加载流程 + runtime smoke 实跑证据（langgraph 已有）
  mapping.example.yaml    # 槽位 id → 运行时名
  nodes|agents/           # 角色 prompt 片段（可选）
  smoke/                  # runtime smoke 参考实现（langgraph 侧 v0.36 起；crewai 文档级待社区认领）
```

换 runtime **只换映射目录**，不改 `roster.yaml` / pack 本体。

## 证据级现状（v0.36）

| runtime | 证据级 | 说明 |
|---------|--------|------|
| LangGraph | **runtime smoke 级**（v0.36） | `smoke/smoke.py` 在真实 LangGraph 1.2.11 下 6/6 断言通过；R15 发现与修订已入 MAPPING |
| CrewAI | 文档级 | 映射表与片段存在，未实跑（见 [crewai MAPPING](../../harness/crewai/MAPPING.md)） |

## 与既有薄适配关系

| 适配 | 性质 | 安装脚本 |
|------|------|----------|
| Cursor | IDE subagent | `install:cursor-agents` |
| CLI · OpenHands | 文档 + 片段 | 无 |
| **LangGraph · CrewAI** | **编排导出**（文档级） | 无 |

三者同属「薄适配」层；LangGraph / CrewAI 侧重 **编排拓扑导出**，Cursor 侧重 **IDE 挂载**。

## V0.9 验收

- [x] 本契约文档
- [x] `harness/langgraph/` · `harness/crewai/`：MAPPING + mapping.example + 角色片段
- [x] 对齐 `minimal-research-to-spec` 四槽位
- [x] ROADMAP P2 勾选；明确不做 runtime

## v0.36 验收（runtime smoke）

- [x] LangGraph 侧实跑：mapping + roster 在真实 runtime 下组装 StateGraph，6/6 断言通过
- [x] R15 发现在契约层固化：`interrupt_before` → 动态 `interrupt()` + `Command(resume=)`
- [x] CrewAI 侧诚实标注：文档级（未实跑）
