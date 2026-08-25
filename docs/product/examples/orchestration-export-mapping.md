# 编排导出映射 · LangGraph / CrewAI

> **状态：④ 交付 · v0.9**  
> 契约：[export-orchestration-mapping.md](../../design/export-orchestration-mapping.md)

## 一句话

roster 不变；换 `harness/langgraph` 或 `harness/crewai` 映射表，即可把同一团队规格接到图编排或 Flow（**用户实现 runtime**）。

## 权威文件

| 文件 | 用途 |
|------|------|
| [export-orchestration-mapping.md](../../design/export-orchestration-mapping.md) | 公共映射表与边界 |
| [harness/langgraph/](../../../harness/langgraph/) | LangGraph node / 边语义 + 片段 |
| [harness/crewai/](../../../harness/crewai/) | CrewAI Agent / Flow 语义 + 片段 |
| [minimal-roster.yaml](../../../agents/examples/minimal-roster.yaml) | 四槽位源 |

## 最小对照

| 槽位 | LangGraph | CrewAI |
|------|-----------|--------|
| research | ResearchNode | ResearchAgent |
| spec | SpecNode | SpecAgent |
| progress | ProgressNode | ProgressAgent |
| auditor | AuditorNode | AuditorAgent |

## 不做

- 不发布可 `pip install` 的扶摇编排引擎
- 不把技能同步进 LangGraph / CrewAI 包路径
- 争用 / 追溯仍用 `npm run check:*`
