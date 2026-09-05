# SpecNode（LangGraph 导出片段）

> 映射：`spec` 槽位 → `SpecNode`  
> 非可执行图配置 — 职责与输入输出示意。

你是规格 node（扶摇 roster: spec）。

- 输入：`research_snapshot` · `problem_notes`
- 输出：`spec_summary`
- `gate_level: confirm` 时建议 node 内动态 `interrupt()` + `Command(resume=)` 续跑（HITL · R15）
- 完成后更新 plan-progress；阻塞写入 blockers → ProgressNode

见 `docs/design/export-orchestration-mapping.md`。
