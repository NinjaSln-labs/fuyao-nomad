# LangGraph 薄适配 · 导出映射

> **状态：runtime smoke 级（v0.36）** —— 导出产物已在真实 LangGraph runtime 下跑通 mapping smoke  
> 与 [Cursor MAPPING](../cursor/MAPPING.md) · [CrewAI MAPPING](../crewai/MAPPING.md) 同构精神；侧重 **图编排导出**。

## 原则

- roster YAML 为 harness 无关源
- 本目录提供 **映射说明 + 示例 mapping + node 片段 + runtime smoke 脚本**；**不实现** LangGraph 引擎、**不调 LLM**
- 用户在自有仓库用 Python 按映射表组装 `StateGraph`（`smoke/smoke.py` 即该形态的参考实现）

## 布局

| 扶摇 | LangGraph |
|------|-----------|
| `agents/packs/<id>/roster.yaml` | 图拓扑输入（槽位 → node） |
| `harness/langgraph/mapping.example.yaml` | 槽位 id → node 名 |
| `harness/langgraph/nodes/` | node 职责 / prompt 片段 |
| `harness/langgraph/smoke/smoke.py` | **runtime smoke 参考实现**（v0.36 起） |

## 加载流程

1. 读取 roster `slots` · `orchestration` · `orthogonal_slots`
2. 查 mapping：每个槽位 → 一个 StateGraph node
3. `serial_order` → 添加边 `research → spec`（示例）
4. `orthogonal_slots`（progress · auditor）→ 条件边旁路链 / `interrupt` / 独立旁路（由用户选型）
5. handoff / plan-progress → **外挂状态**（读 `.agents/` 或注入 `state` 字段）；图引擎不替代争用顾问
6. `gate_level: confirm` → **动态 `interrupt()` + `Command(resume=)`**（见 R15）
7. 模型：按 [model-harness-contract.md](../../docs/design/model-harness-contract.md) 解析有效 hint → node 可配置 model（**用户实现**）

## 示意拓扑（serial + 正交旁路）

```text
        ┌─ progress（旁路 / 阻塞升级）
start → research → spec → end
        └─ auditor（阶段门 / interrupt）
```

## Runtime Smoke 实跑（v0.36）

**证据**：LangGraph 1.2.11（Python 3.12 · venv）下，`smoke/smoke.py` 消费
`mapping.example.yaml` + `minimal-research-to-spec` roster，6/6 断言通过
（沙盒 git `f81919a` · 证据 `run.json`）：

| # | 断言 | 结果 |
|---|------|------|
| 1 | confirm 槽位（spec）触发 `interrupt()` 动态门 | PASS |
| 2 | 门前置槽位按 serial 序执行（ResearchNode） | PASS |
| 3 | 全链执行序 = mapping 拓扑（serial + orthogonal 旁路） | PASS |
| 4 | serial 槽位产出 = roster 声明 outputs（键名逐一） | PASS |
| 5 | `Command(resume=)` 人工裁决后续跑通过门槽位 | PASS |
| 6 | 图 node 名集 = `mapping.mappings` 值集 | PASS |

**复跑方式**（用户自备 Python ≥3.10 venv）：

```bash
python3 -m venv .venv && .venv/bin/pip install langgraph pyyaml
# 项目根内（已 pack:import + mapping 拷入 harness/langgraph/）
python harness/langgraph/smoke/smoke.py --project . --mapping harness/langgraph/mapping.example.yaml
```

## 实跑发现（R15）

**R15 · `interrupt_before` 在 LangGraph 1.2.x 不可靠**：
`compile(interrupt_before=[node])` + `invoke(input, config)` 首跑**不再中断**
（`__interrupt__` 为空，直接跑完全图）。三形态探针（2026-09-05 · langgraph 1.2.11）：

| 形态 | 中断? |
|------|-------|
| `compile(interrupt_before=["b"])` + dict invoke | ✗ |
| config 内联 `interrupt_before: ["b"]` | ✗ |
| node 内 `interrupt()` + `Command(resume=)` | ✓ |

**修订**：confirm 门语义映射从「`interrupt_before` 该 node」改为
「node 内动态 `interrupt()` + `Command(resume=)` 续跑」——v0.9 契约文档承诺的
`interrupt_before` 形态在当前 runtime 不可用；[export-orchestration-mapping.md](../../docs/design/export-orchestration-mapping.md)
公共映射表已同步修订。

## 与 Cursor 差异

| 项 | LangGraph | Cursor |
|----|-----------|--------|
| 安装脚本 | **无**（smoke 脚本除外） | `install:cursor-agents` |
| 产物形态 | 图 node / 边语义 | `.cursor/agents/*.md` |
| 争用 | 仍跑 `check:contention` | 同左 |

## 验收

- [x] MAPPING.md + mapping.example.yaml（v0.9）
- [x] node 片段 — `nodes/`（Research · Spec · Progress · Auditor）（v0.9）
- [x] **runtime smoke 参考实现 + 实跑证据**（v0.36 · 6/6 PASS · R15 发现与修订）
