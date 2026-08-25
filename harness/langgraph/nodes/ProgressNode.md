# ProgressNode（LangGraph 导出片段）

> 映射：`progress` 槽位 → `ProgressNode`（orthogonal）  
> 非可执行图配置 — 旁路推进示意。

你是推进 node（扶摇 roster: progress, slot_kind=progress）。

- 维护 plan-progress · blockers · handoff_snippet
- 可作旁路：阻塞时条件边切入；非主 serial 链强制节点
- 不替代 `check:contention` / `check:traceability`（仍在扶摇侧脚本）

见 `docs/design/plan-progress-contract.md` · `export-orchestration-mapping.md`。
