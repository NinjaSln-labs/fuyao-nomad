# Dogfood · langgraph runtime smoke 关仓笔记

> v0.36 · 场景：[dogfood-langgraph-harness-scenario.md](./dogfood-langgraph-harness-scenario.md) · Sandbox：WSL `~/ninjasin-labs/fuyao-dogfood-langgraph-harness`

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-09-05 |
| **包** | minimal-research-to-spec @ 1.2.0（零改动） |
| **Runtime** | **LangGraph 1.2.11**（Python 3.12 · venv） |
| **结论** | **runtime smoke 级成立** · 6/6 断言 PASS · sandbox git `f81919a` |

## 关仓要点

1. **首个 runtime smoke 级证据**：导出映射不再只是文档——`smoke/smoke.py`
   在真实 LangGraph 下消费 mapping + roster 组图执行，映射语义被 runtime 逐项消化
   （槽位→node · serial→边序 · orthogonal→旁路链 · confirm→门 · outputs→产出键）
2. **R15 契约修订（本版核心发现）**：v0.9 文档承诺的 `interrupt_before` 在
   LangGraph 1.2.x 实测失效（首跑不中断）；confirm 门修订为
   **node 内动态 `interrupt()` + `Command(resume=)`**。三形态探针记录入 MAPPING——
   文档级 POC 与真实 runtime 的落差只有 smoke 才能暴露
3. **证据级分层诚实化**：LangGraph runtime smoke 级 / CrewAI 文档级（未实跑，
   smoke 待社区认领）——「二选一」实跑，另一家不冒领

## 落点证据

- `.agents/langgraph-smoke/run.json`：断言 6 条全 PASS + final_trace + 逐槽位产出记录
- 执行序：`ResearchNode → [gate] → SpecNode → ProgressNode → AuditorNode`
- Phase A 纯数据断言（映射完整性）先于建图——契约对齐前置
- roster / pack 零改动；mapping/nodes/smoke 脚本为导出产物形态

## 与五家挂载级的区别

| 维度 | 挂载级（pi/dsh/cursor/qoder/claude） | runtime smoke 级（langgraph） |
|------|--------------------------------------|-------------------------------|
| 驱动对象 | 扶摇 `.agents/` 业务链（LLM 委派） | mapping 语义（确定性 stub） |
| 证据形态 | 落点文件 + 三绿 | 断言清单 + 执行 trace |
| 调 LLM | harness 侧（模型路由各异） | **否**（框架侧不调 LLM 边界守住） |
| 消费产物 | pack（roster/templates/skills） | mapping + roster（图拓扑） |

## 移植版图（本版后）

```
pi ✅ · dsh ✅ · cursor ✅ · qoder ✅ · claude ✅（挂载级五家）
langgraph ✅（runtime smoke · v0.36）· crewai 文档级 · openhands ❄️ 冻结
```
