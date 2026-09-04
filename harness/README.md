# Harness 薄适配

将扶摇 · Nomad **挂载**到现有运行时。

## 边界

| 做 | 不做 |
|----|------|
| 槽位 → 运行时映射 | 构建 harness / IDE |
| 团队包加载 | 替代任何 harness runtime |

## 证据级标注体系（v0.32 起）

| 级 | 含义 |
|----|------|
| 文档级 | 映射表与说明存在，未实跑 |
| 安装级 | 落盘脚本跑过（agent 文件已生成），未驱动过扶摇链 |
| **挂载级** | 同一 pack 在该 harness 下**实跑**过一条完整任务链（`.agents/` 落点验证） |
| runtime smoke 级 | 导出产物被外部 runtime 消费跑通 |

## 适配目录

| 目录 | 目标 | 形态 | 证据级 |
|------|------|------|--------|
| [cursor/](./cursor/) | Cursor IDE / CLI | install 脚本 + subagents + CLI print | **挂载级·CLI 委派（v0.34）** |
| [pi/](./pi/) | **pi CLI** | skill 片段 + 编排约定 | **挂载级·真多实例（v0.32.1）** |
| [dsh/](./dsh/) | **dsh（DeepSeek Harness）** | pi + subagent 通道 | **挂载级·委派驱动（v0.33）** ✅ 北极星移植 2/2 |
| [qoder/](./qoder/) | Qoder IDE | `.qoder/agents/` 项目级 | v0.35 排期（Mac runbook） |
| [claude/](./claude/) | Claude Code | `.claude/agents/` | v0.35 排期（第二梯队） |
| [cli/](./cli/) | 命令行（通用） | runners 片段 | 文档级 |
| [openhands/](./openhands/) | OpenHands | — | ❄️ **冻结**（无维护者环境，欢迎社区认领；幽灵命令引用已清偿） |
| [langgraph/](./langgraph/) | LangGraph 编排导出 | 导出映射 | 文档级 → runtime smoke 排 v0.36 |
| [crewai/](./crewai/) | CrewAI Flow / Crew 导出 | 导出映射 | 文档级 → runtime smoke 排 v0.36 |

换 harness 只换映射表，不换 roster / pack。

设计契约：[pi/dsh](../docs/design/pi-harness-contract.md) · 编排导出公共契约 [export-orchestration-mapping.md](../docs/design/export-orchestration-mapping.md) · CLI/OpenHands 深化 [cli-openhands-adapter.md](../docs/design/cli-openhands-adapter.md)。
