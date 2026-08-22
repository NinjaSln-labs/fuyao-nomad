# 竞品调研 · 搜索计划

> **状态**：✅ 已执行 → [快照](./2026-08-22-agent-team-landscape.md)  
> **决策支持**：扶摇 · Nomad 差异化定位与能力边界  
> **标签**：`Fact` = 可追溯公开源；`Inference` = 推导；`Assumption` = 待验证

## Scope

| 项 | 内容 |
|----|------|
| **产品** | 扶摇 · Nomad — 开源 Agent 团队框架 |
| **类别** | 多 agent 协作 / AI 员工 / agent 编排 / harness 生态 |
| **决策** | 谁在做「团队优先 + DDD 交付 + 编制规则 + harness 薄挂载」？缺口在哪？ |
| **非目标** | 市场份额报告；harness 功能对比排行榜 |

## 假设（待验证）

- `Assumption` 尚无开源方案同时覆盖上述四点。
- `Assumption` 「AI 员工」体验是参照系，但团队化与开源可定制是缺口。
- `Assumption` CrewAI/AutoGen 等强于编排 API，弱于管理/质量/交付模式。

## 搜索计划

### 1. 搜什么

| 桶 | 搜索方向 | 源类型 |
|----|----------|--------|
| **多 agent 开发团队** | MetaGPT, ChatDev, GPT Pilot, Aider multi-agent | GitHub, 论文, README |
| **编排框架** | CrewAI, AutoGen, LangGraph multi-agent | 官方文档, 对比文章 |
| **Harness 内置** | Cursor subagents, Copilot agent mode, Windsurf | 产品文档, changelog |
| **AI 员工产品** | Devin, Factory, Cursor background agents | 官网, 评测, 用户反馈 |
| **方法论工作流** | BMAD, spec-driven agent repos | GitHub, 社区 |
| **技能生态** | Anthropic Skills, MCP, agent-skills 类仓库 | 规范文档, 仓库结构 |

### 2. 怎么比

按 [north-star.md](../product/north-star.md) **8 能力域** 打矩阵：

1. 团队编制（槽位/角色模型）
2. 编排与协作
3. 管理与推进
4. 交付模式（DDD / 重量可调）
5. 质量与验证
6. 治理与审计
7. 研究与产品
8. 可移植挂载（非 harness 构建）

每竞品 3–5 行：定位 · 强项 · 弱项 · 与扶摇重叠度 · 源 URL。

### 3. 深研对象（初选 4，执行时可增减）

| 优先级 | 对象 | 为何 |
|--------|------|------|
| P0 | **CrewAI** | 多 agent 编排代表，开源 |
| P0 | **MetaGPT / ChatDev** | 「软件公司」团队隐喻 |
| P0 | **Cursor subagents** | 目标 harness 之一，内置团队深度 |
| P1 | **Devin（或同类 AI 员工）** | 体验参照，团队化缺口 |
| 备选 | LangGraph | 编排 vs 团队框架边界 |
| 备选 | BMAD | 方法论 + agent 工作流 |

### 4. 事实与推断分离

- 功能声称 → 须附 URL 或 repo 路径，标 `Fact`
- 「适合/不适合 builder」→ 标 `Inference`
- 未读源码的能力判断 → 标 `Assumption`，置信度低

### 5. 产出

确认本计划后，生成同级目录：

`2026-08-22-agent-team-landscape.md` — Competitive Research Snapshot（稳定 schema，可 diff 后续版本）

结尾须含：

- **So what**：扶摇 差异化一句话（候选）
- **能力缺口表**：8 域 × 覆盖/部分/无
- **Next**：是否调整 north-star 或 delivery-model

## 确认项

执行前默认假设（可改）：

- [ ] 深研 4 个：CrewAI、MetaGPT、Cursor subagents、Devin
- [ ] 中文输出，URL 保留英文源
- [ ] 调研**去权威化** — 快照不自动改变产品 scope

---

**说「按计划调研」即开始执行快照。**
