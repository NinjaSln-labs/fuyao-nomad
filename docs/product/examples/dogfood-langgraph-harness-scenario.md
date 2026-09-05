# Dogfood · langgraph runtime smoke 场景

> v0.36 · [关仓笔记](./dogfood-langgraph-harness-close.md) · Sandbox：`fuyao-dogfood-langgraph-harness`（WSL · 本地 only）

## 1. 目的

验证「导出映射产物可被真实编排 runtime 消费」——v0.36 首个 **runtime smoke 级**证据
（区别于五家挂载级：runtime 不驱动扶摇 `.agents/` 业务链，而是消费 mapping 语义组装图）。

## 2. 环境与挂载

| 项 | 值 |
|----|-----|
| Runtime | **LangGraph 1.2.11**（Python 3.12 · venv · `langgraph` + `pyyaml`） |
| 挂载 | pack 零改动导入（`pack:import`）+ mapping/nodes 拷入项目 `harness/langgraph/` |
| 链脚本 | `harness/langgraph/smoke/smoke.py`（用户侧组装参考实现 · 不调 LLM） |
| Sandbox | `~/ninjasin-labs/fuyao-dogfood-langgraph-harness`（git init · 单 commit 存档） |

## 3. 链执行（确定性 stub · 三阶段）

| 阶段 | 内容 | 产物 |
|------|------|------|
| Phase A 映射完整性 | roster 槽位 × mapping 逐项对齐（roster_id · 槽位集 · serial 序 · 正交集 · 无重叠） | 纯数据断言（不建图） |
| Phase B 组装+执行 | 按映射组 StateGraph：serial 边链 + 正交旁路链 + confirm 门内嵌 `interrupt()` | 首段停于门（HITL）→ `Command(resume=)` 裁决续跑至 END |
| Phase C 外挂状态 | 执行记录写 `.agents/langgraph-smoke/run.json`（图引擎不拥有状态） | 断言明细 + final_trace + 逐槽位记录 |

**执行序**：`ResearchNode → [confirm 门] → SpecNode → ProgressNode → AuditorNode → END`

## 4. 断言（6/6 PASS）

| # | 断言 | 结果 |
|---|------|------|
| 1 | confirm 槽位（spec / `gate_level: confirm`）触发 `interrupt()` 动态门 | PASS |
| 2 | 门前置槽位按 serial 序执行 | PASS |
| 3 | 全链执行序 = mapping 拓扑（serial + orthogonal 旁路） | PASS |
| 4 | serial 槽位产出 = roster 声明 outputs（键名逐一） | PASS |
| 5 | `Command(resume=)` 人工裁决后续跑通过门槽位 | PASS |
| 6 | 图 node 名集 = `mapping.mappings` 值集 | PASS |

## 5. 发现

- **R15（`interrupt_before` 在 LangGraph 1.2.x 不可靠）**：契约文档承诺的
  `compile(interrupt_before=...)` + `invoke` 形态首跑不中断（`__interrupt__` 为空）。
  三形态探针：compile 级 ✗ · config 内联 ✗ · node 内动态 `interrupt()` + `Command(resume=)` ✓。
  **契约修订**：confirm 门映射 → 动态 `interrupt()` + `Command(resume=)`；公共映射表与
  MAPPING 已同步（v0.36）。这正是 runtime smoke 的价值——文档级 POC 步入真实 runtime 才暴露。
- **确定性 stub 的边界价值**：不调 LLM 即可验证映射/拓扑/门语义（守住「框架侧不调 LLM」）；
  stub node 按 roster `outputs` 声明回填键名，roster 语义被 runtime 消费即为证据。
