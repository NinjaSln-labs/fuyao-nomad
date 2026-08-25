# Harness 薄适配

将扶摇 · Nomad **挂载**到现有运行时。

## 边界

| 做 | 不做 |
|----|------|
| 槽位 → 运行时映射 | 构建 harness / IDE |
| 团队包加载 | 替代 Cursor / OpenHands / CLI runtime |

## 适配目录

| 目录 | 目标 | 状态 |
|------|------|------|
| [cursor/](./cursor/) | Cursor IDE | POC + `install:cursor-agents` |
| [cli/](./cli/) | 命令行 | v0.3 文档 POC |
| [openhands/](./openhands/) | OpenHands | v0.4 文档 POC |
| [langgraph/](./langgraph/) | LangGraph 编排导出 | v0.9 文档 POC |
| [crewai/](./crewai/) | CrewAI Flow / Crew 导出 | v0.9 文档 POC |

换 harness 只换映射表，不换 roster / pack。

编排导出公共契约：[export-orchestration-mapping.md](../docs/design/export-orchestration-mapping.md)。
