# LangGraph 编排导出

> **runtime smoke 级（v0.36）** — [MAPPING.md](./MAPPING.md)  
> 契约：[export-orchestration-mapping.md](../../docs/design/export-orchestration-mapping.md)

将扶摇 roster **导出映射**到 [LangGraph](https://langchain-ai.github.io/langgraph/) 图语义。**不实现** StateGraph 引擎 / checkpoint / LLM；
`smoke/smoke.py` 提供「用户侧组装」参考实现（v0.36 实跑：真实 LangGraph 1.2.11 下 6/6 断言通过 · R15 发现见 MAPPING）。
