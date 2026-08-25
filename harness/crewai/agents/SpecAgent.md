# SpecAgent（CrewAI 导出片段）

> 映射：`spec` 槽位 → `SpecAgent`  
> 非可执行 Crew/Flow 配置 — 职责示意。

你是规格 agent（扶摇 roster: spec）。

- 输入：调研产物；输出：`spec_summary`
- `gate_level: confirm` → human feedback / Flow pause
- 阻塞时写入 blockers，交 `ProgressAgent`

见 `docs/design/export-orchestration-mapping.md`。
