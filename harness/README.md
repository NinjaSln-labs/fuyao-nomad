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
| [qoder/](./qoder/) | Qoder IDE / CLI | `.qoder/agents/` 项目级 + headless | **挂载级·headless 委派（v0.35）** |
| [claude/](./claude/) | Claude Code | `.claude/agents/` + 第三方模型接入 | **挂载级·第三方模型（v0.35）** |
| [cli/](./cli/) | 命令行（通用） | runners 片段 | 文档级 |
| [openhands/](./openhands/) | OpenHands | — | ❄️ **冻结**（无维护者环境，欢迎社区认领；幽灵命令引用已清偿） |
| [langgraph/](./langgraph/) | LangGraph 编排导出 | 导出映射 + smoke 参考实现 | **runtime smoke 级（v0.36 · 6/6 PASS · R15）** |
| [crewai/](./crewai/) | CrewAI Flow / Crew 导出 | 导出映射 | 文档级（v0.36 对照标注 · smoke 待社区认领） |

## 片段 frontmatter 能力面（五家权威终表）

槽位片段的 frontmatter 承载面随 harness 机制而异。本表为**唯一权威源**（v0.35 散落各
MAPPING 的局部终表于此上提合并）；各 MAPPING.md 只列本家差异维与机制说明，不复制全表。

| 能力面 | pi | dsh | cursor | qoder | claude |
|--------|----|----|--------|-------|--------|
| model 承载 | ❌（实例启动参数 `--provider`/`--model`） | ❌（委派参数 `provider`/`model`） | ✅ `model: inherit` | ✅ `model:` 字段 | ✅ `model: inherit` |
| readonly | ❌（prompt 约束） | ❌ | ✅ `readonly: true` | ❌（tools 白名单替代） | ❌（prompt 约束替代） |
| tools 白名单 | ❌ | ❌ | ❌ | ✅ `tools: [Read, Grep]` | ❌ |
| 权限模式 | ❌（confirm 门·人在主控终端） | ❌（approval 辅助） | ❌（CLI flag） | ✅ `permissionMode` | ❌（CLI flag / settings 承担） |
| 再委派控制 | ❌ | ❌ | ❌ | ✅ `Agent(name)` / `disallowedTools: [Agent]` | ❌ |

片段 frontmatter 与各 harness 机制的机制级说明（如 cursor 产物落盘型槽位须移除
`readonly`、qoder headless 权限语义）见各 MAPPING.md 差异维。

换 harness 只换映射表，不换 roster / pack。

设计契约：[pi/dsh](../docs/design/pi-harness-contract.md) · 编排导出公共契约 [export-orchestration-mapping.md](../docs/design/export-orchestration-mapping.md) · CLI/OpenHands 深化 [cli-openhands-adapter.md](../docs/design/cli-openhands-adapter.md)。
