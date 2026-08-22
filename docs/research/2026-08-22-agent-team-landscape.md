# Agent 团队框架 · 竞品快照

> **范围声明（去权威化）**  
> 本文是 **① 发现阶段** 的竞品与能力景观快照，**不是** V1 产品范围权威。  
> 产品边界以 [problem-statement.md](../product/problem-statement.md)、[north-star.md](../product/north-star.md)、[delivery-model.md](../product/delivery-model.md) 为准。  
> **标签**：`Fact` = 可追溯公开源；`Inference` = 由事实推导；`Assumption` = 待验证假设。

**决策支持**：扶摇 · Nomad 差异化定位与 8 能力域缺口。  
**分析对象**：CrewAI、MetaGPT、Cursor Subagents、Devin（深研）；ChatDev 2.0、BMAD Method（对照）。

---

## 1. Scope

| 项 | 内容 |
|----|------|
| **Company/product** | 扶摇 · Nomad — 开源 Agent 团队框架 |
| **Category** | 多 agent 协作 / AI 软件员工 / 编排框架 / IDE harness 生态 |
| **Decision supported** | 谁在做「团队优先 + DDD 交付 + 编制规则 + harness 薄挂载」？缺口在哪？ |
| **Competitors analyzed** | **深研**：CrewAI、MetaGPT、Cursor Subagents、Devin · **对照**：ChatDev 2.0、BMAD · **全景见 §9** |

---

## 2. 调研策略说明

本次快照采用 **分层覆盖**，不是「只有 6 个竞品」：

| 层级 | 对象 | 目的 |
|------|------|------|
| **深研** | CrewAI、MetaGPT、Cursor、Devin | 8 能力域矩阵 + 差异化 |
| **对照** | ChatDev 2.0、BMAD | 最近邻（编排 / 方法论） |
| **全景地图** | §9 扩展列表 | 行业分桶，防遗漏；按需二次深研 |

**未深研 ≠ 不存在** — LangGraph、OpenHands 等是重要 **运行时/ harness 邻域**，与扶摇「团队框架层」重叠但不同层。

---

## 3. Competitor Snapshots

### Competitor: CrewAI

- **Positioning:** 开源 Python 多 agent 编排框架；**Crews**（角色协作）+ **Flows**（事件驱动、状态、人机门）双层架构。 — **Fact** ([docs.crewai.com](https://docs.crewai.com/en/introduction), [GitHub](https://github.com/crewaiinc/crewai/))
- **Relevant capability:** Role-playing agents、任务委派、Flow 条件分支、checkpoint 恢复、human-in-the-loop（`@human_feedback`）。 — **Fact**
- **Likely strength:** 生产向编排 API 成熟；Crew+Flow 组合清晰；LiteLLM 独立栈（v1.0 去 LangChain）。 — **Inference**
- **Likely weakness:** 偏**运行时编排**，非「交付方法论」；无 DDD 门、无编制协议、无 harness 无关团队包；管理/推进/竞品调研非一等公民。 — **Inference**
- **Key source URL:** https://docs.crewai.com/en/introduction · https://github.com/crewaiinc/crewai/

### Competitor: MetaGPT

- **Positioning:** 「First AI Software Company」— 一行需求输入，多角色 SOP 协作输出 PRD/设计/代码/文档；`Code = SOP(Team)`。 — **Fact** ([GitHub FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT), [IBM overview](https://www.ibm.com/think/topics/metagpt))
- **Relevant capability:** PM/Architect/Engineer 等固定角色、结构化 Message 交接、SOP 流水线、可自定义 Role+Team（`team.hire()`）。 — **Fact**
- **Likely strength:** **团队隐喻**清晰；结构化交接减 hallucination；研究向（论文+高 star）。 — **Inference**
- **Likely weakness:** **固定「软件公司」SOP**，非通用编制规则；Python 运行时绑定；DDD 非显式；harness 移植弱；非编码任务链偏生成而非治理。 — **Inference**
- **Key source URL:** https://github.com/FoundationAgents/MetaGPT

### Competitor: Cursor Subagents

- **Positioning:** IDE harness 内置 — 主 agent 委派子 agent，独立 context、并行执行、结果摘要回传。 — **Fact** ([Cursor Docs](https://cursor.com/docs/subagents))
- **Relevant capability:** 内置 explore/bash/browser；自定义 `.cursor/agents/*.md`（YAML frontmatter）；foreground/background；嵌套 subagent；Cloud Agents + worktree 并行。 — **Fact**
- **Likely strength:** **实际上最好用的「团队感」**之一；并行与 context 隔离成熟；项目/用户级可复用 subagent 文件。 — **Inference**
- **Likely weakness:** **Harness 锁定**；无跨 IDE 团队 spec；无 DDD/交付重量档；无统一 roster/handoff 协议；偏任务委派而非管理/推进/质量门禁体系。 — **Inference**
- **Key source URL:** https://cursor.com/docs/subagents · https://cursor.com/help/ai-features/multi-agent

### Competitor: Devin（Cognition）

- **Positioning:** 「The AI Software Engineer」— 自主规划、执行、PR；MultiDevin 协调并行子 session。 — **Fact** ([devin.ai](https://devin.ai/), [Manage Devins blog](https://cognition.ai/blog/devin-can-now-manage-devins))
- **Relevant capability:** Interactive Planning、Devin Search/Wiki、fleet 并行迁移、Slack/Linear/Jira 集成、协调者分配子 Devin。 — **Fact**
- **Likely strength:** **AI 员工体验**参照系；大型 codebase 理解；MultiDevin 是真·并行团队协调。 — **Inference**
- **Likely weakness:** **闭源产品**；单体 Devin 叙事仍强；非 builder 可定义团队框架；无开源编制协议；无 DDD 交付模式；不可挂到其他 harness。 — **Inference**
- **Key source URL:** https://devin.ai/ · https://cognition.com/blog/devin-can-now-manage-devins

### 对照: ChatDev 2.0（DevAll）

- **Positioning:** 零代码多 agent 编排平台；YAML DAG + Web Console；从「虚拟软件公司」泛化为「Develop Everything」。 — **Fact** ([OpenBMB/ChatDev](https://github.com/OpenBMB/ChatDev))
- **与扶摇关系:** 编排/topology 强；**无 DDD、无交付重量档、无 harness 薄挂载叙事**。 — **Inference**
- **Key source URL:** https://github.com/OpenBMB/ChatDev

### 对照: BMAD Method

- **Positioning:** 开源 spec-driven **敏捷** AI 开发方法；多 agent 人格（PM/Architect/SM/Dev）+ 工作流；流程随工作重量自调节。 — **Fact** ([BMAD-METHOD GitHub](https://github.com/bmad-code-org/BMAD-METHOD/))
- **与扶摇关系:** **方法论 + 多角色**最接近扶摇 的「交付模式」竞品；但是 **敏捷/PRD 主轴**，非 DDD 必要；agent 定义偏固定人格文件，非通用 composition protocol；IDE 安装（`npx bmad-method install`）非 harness 无关团队包。 — **Inference**
- **Key source URL:** https://github.com/bmad-code-org/BMAD-METHOD/

---

## 4. Capability Matrix（8 能力域）

图例：**●** 覆盖 · **◐** 部分 · **○** 无/极弱

| 能力域 | CrewAI | MetaGPT | Cursor | Devin | BMAD | 扶摇目标 |
|--------|:------:|:-------:|:------:|:-----:|:----:|:--------:|
| 1. 团队编制 | ◐ | ◐ | ◐ | ◐ | ◐ | **●** |
| 2. 编排与协作 | ● | ● | ● | ● | ◐ | **●** |
| 3. 管理与推进 | ○ | ◐ | ○ | ◐ | ◐ | **●** |
| 4. 交付模式（DDD/流程重量） | ○ | ◐ | ○ | ○ | ◐ | **●** |
| 5. 质量与验证 | ◐ | ◐ | ◐ | ◐ | ● | **●** |
| 6. 治理与审计 | ◐ | ○ | ◐ | ◐ | ◐ | **●** |
| 7. 研究与产品 | ○ | ◐ | ○ | ◐ | ● | **●** |
| 8. 可移植挂载（非 harness） | ○ | ○ | ○ | ○ | ◐ | **●** |

### 矩阵说明

| 域 | 观察 |
|----|------|
| **1 团队编制** | 多方有 Role，但多为**固定模板**（MetaGPT 软件公司、BMAD 人格）或 **harness 文件**（Cursor）；缺「槽位加减协议、无官方编制」。 |
| **2 编排** | 竞品最强项；CrewAI Flow、ChatDev DAG、Devin MultiDevin 均成熟。扶摇 **不与之竞争运行时**，需提供**团队层编排契约**。 |
| **3 管理推进** | 普遍弱：少里程碑、阻塞升级、进度视图。Devin 协调者 ◐；BMAD sprint/story ◐。 |
| **4 交付模式** | BMAD「流程随工作重量调节」最接近，但是 **敏捷+PRD** 非 DDD 必要。MetaGPT SOP ◐ 但绑定软件公司。 |
| **5 质量** | BMAD 有 code-review workflow；Cursor 可建 verifier subagent ◐；缺统一「完成前验证」协议。 |
| **6 治理** | CrewAI human-in-the-loop ◐；扶摇 要分级门禁（继承青蚨使修正版）。 |
| **7 研究产品** | BMAD 前期 workflow 强；MetaGPT 输出竞品分析 ◐；缺与编码 DoD 统一的团队链。 |
| **8 可移植** | **全行业缺口**：Cursor 文件不等于跨 harness spec；CrewAI/MetaGPT 绑 Python runtime。 |

---

## 5. Landscape Synthesis

### 三类竞品，三个缺口

```
编排框架 (CrewAI, ChatDev)     →  强运行时，弱交付/治理/移植
软件公司模拟 (MetaGPT)         →  强 SOP，固定角色，弱 DDD/移植
Harness 内置 (Cursor, Devin)   →  强体验，锁定平台，弱开源团队 spec
方法论包 (BMAD)                →  强流程/角色，敏捷主轴，弱 DDD/编制协议/移植
─────────────────────────────────────────────────────────────
扶摇 · Nomad 假设缺口          →  DDD + 编制规则 + 轻-重流程重量 + 团队优先
                                   + harness 薄挂载 + 开源 builder
```

### 假设验证

| 假设 | 结论 |
|------|------|
| 尚无开源方案同时覆盖四点（团队优先 + DDD + 编制规则 + 薄挂载） | **Assumption → 高置信 Inference**（本矩阵未见全 ● 竞品） |
| AI 员工体验是参照，团队化+开源可定制是缺口 | **Inference**（Devin MultiDevin 验证「协调者+并行」需求；闭源限制 builder） |
| CrewAI 等强于编排 API，弱于管理/质量/交付模式 | **Inference**（与文档/定位一致） |

---

## 6. So What — 扶摇差异化（候选）

> **Draft positioning statement**  
> 扶摇 · Nomad 是开源的 **Agent 团队框架**：用 **DDD + 可加减编制规则** 定义多角色如何协作与交付，用 **轻-重流程重量**（可扩展档位）保证进度与质量；通过 **薄适配** 挂到 Cursor 等 harness，**不构建 harness，不卖单体 AI 员工**。

### 与最近邻竞品的一句话区隔

| 竞品 | 扶摇 不做什么 | 扶摇 多做什么 |
|------|-------------|-------------|
| **CrewAI** | 不做 Python 编排 runtime | 交付模式、编制协议、治理、跨 harness 团队包 |
| **MetaGPT** | 不做固定「软件公司」SOP | 通用 composition protocol + DDD 门 + flow_weight |
| **Cursor** | 不做 IDE | 导出/导入团队 spec，harness 无关的 roster 与 handoff |
| **Devin** | 不做闭源 AI 员工 | 开源 builder 定义团队；协调协议可移植 |
| **BMAD** | 不以敏捷+PRD 为唯一主轴 | **DDD 必要** + 青蚨使/Voyage 择优 + 非固定 agent 人格表 |

---

## 7. 能力缺口表（扶摇 必须自建）

| 优先级 | 缺口 | 竞品最好参考 |
|--------|------|-------------|
| P0 | **Composition protocol**（槽位加减，无官方编制） | MetaGPT Message 结构 ◐ · BMAD agent YAML ◐ |
| P0 | **轻-重流程重量**（`flow_weight` + DDD 门） | BMAD quick-spec vs full ◐ · 青蚨使 stage-spec（内部） |
| P0 | **Harness 薄适配契约** | Cursor `.cursor/agents/` 映射 |
| P1 | **管理与推进**（里程碑、阻塞、升级） | Devin 协调者 ◐ · BMAD sprint-status ◐ |
| P1 | **多 agent 争用/并行规则** | CrewAI Flow ◐ · Devin MultiDevin ◐ |
| P1 | **研究与产品 → 交付链** | BMAD PRD workflow ◐ |
| P2 | **分级治理**（非一律「授权 S1」） | CrewAI human_feedback ◐ · 青蚨使 ADR（内部） |

---

## 8. Next Steps

| # | 动作 | 影响文档 |
|---|------|----------|
| 1 | ② 定义：定稿差异化一句话 + 成功标准 | `north-star.md` |
| 2 | ② 定义：8 域 P0/P1 能力边界 | 新建 `capability-model.md` |
| 3 | ③ 设计：Composition protocol schema | `composition-protocol.md` |
| 4 | ③ 设计：Cursor 映射 POC（`.cursor/agents/` ↔ roster） | `harness/cursor/` |
| 5 | 持续监控 | ChatDev 2.0、BMAD v6、Cursor /multitask 演进 |

### 对 north-star 的微调建议

- 保留 8 能力域框架 — **矩阵验证有效**
- 明确 **「编排不竞争」**：扶摇 定义团队层，可**输出** CrewAI Flow / Cursor subagent 等映射，不替代运行时
- 将 BMAD 标为 **交付模式最近邻**，差异化落在 **DDD 必要 + 编制协议 + harness 移植**

---

## 9. 扩展竞品全景（未深研 · 分桶地图）

> 供后续 diff 与按需深研。与扶摇关系标注：**编排** / **Harness** / **AI 员工** / **方法论** / **团队框架邻域**。

### A. 编排 / 多 agent 运行时（扶摇 不竞争，可映射输出）

| 对象 | 一句话 | 与扶摇 |
|------|--------|--------|
| **LangGraph** | 图状态机、checkpoint、HITL — 企业级编排事实标准 | 编排层；可 export flow 映射 |
| **Microsoft AutoGen / Agent Framework** | 对话式多 agent、Azure 生态；0.4 重写 | 编排层 ◐ |
| **OpenAI Agents SDK / Swarm** | 轻量 handoff 模式 | 窄编排，非团队框架 |
| **Google ADK** | GCP 模块化 agent | 云原生编排 |
| **AWS Bedrock Multi-Agent Orchestrator** | Bedrock 路由编排 | 云原生编排 |
| **Agency Swarm / Agent Squad** | 社区多 agent 模式 | 编排实验 |

### B. Harness / 开源 agent 平台（薄适配目标，非竞品）

| 对象 | 一句话 | 与扶摇 |
|------|--------|--------|
| **OpenHands** | 开源 Devin 系；多 agent delegation、沙箱 runtime | **Harness**；团队 spec 可挂载其上 |
| **Aider / Cline / Continue / Roo** | IDE 侧 coding agent | Harness 候选 |
| **Windsurf Cascade** | IDE agent 流 | Harness |
| **GitHub Copilot / Copilot Workspace** | 微软编码 agent 生态 | Harness + 浅 subagent |

### C. AI 员工 / 异步编码 agent（体验参照，闭源为主）

| 对象 | 一句话 | 与扶摇 |
|------|--------|--------|
| **Factory / Droid** | 多 agent Coordinator-Droid、SDLC 自动化叙事 | AI 员工 ◐ 团队化 |
| **Google Jules** | 异步 GitHub VM agent；planner+worker ◐ | 单体异步为主，任务不互协调 — **Fact** ([MorphLLM 对比](https://www.morphllm.com/comparisons/jules-google-coding-agent)) |
| **Google Antigravity** | Agent-first IDE + Manager 多 agent | Harness，非开源框架 |
| **Replit Agent** | 云端全栈 agent | AI 员工 |
| **Claude Code Agent Teams** | teammates + shared tasks 文件 | Harness 内置团队 ◐；文件层协调 |
| **Codex / OpenAI Codex agent** | 异步沙箱编码 | AI 员工 |

### D. 软件公司 / 零代码编排（MetaGPT、ChatDev 邻域）

| 对象 | 一句话 | 与扶摇 |
|------|--------|--------|
| **GPT Pilot / GPT Engineer 演进** | 多步软件生成 | 固定流水线 ○ |
| **Magentic-One (AutoGen)** | 参考多 agent 系统 | 研究向编排 |
| **Dify** | 低代码 agent 工作流、高 star | 可视化编排，弱 DDD/治理 |

### E. 方法论 / Spec 驱动（BMAD 邻域）

| 对象 | 一句话 | 与扶摇 |
|------|--------|--------|
| **GitHub Spec Kit / spec-driven 工具** | 规格驱动开发 CLI | 方法论 ◐，非多 agent 团队 |
| **Amazon Kiro** | spec + agent IDE | Harness + 方法论 |

### 建议二次深研（若 ② 定义需更细）

| 优先级 | 对象 | 理由 |
|--------|------|------|
| P1 | **LangGraph** | 编排事实标准；映射关系要厘清 |
| P1 | **OpenHands** | 开源 harness + delegation；薄适配 POC 候选 |
| P1 | **Claude Code Agent Teams** | 「团队」文件协调 vs 扶摇 composition protocol |
| P2 | **Factory** | 多 Droid 协调叙事 |
| P2 | **Google Antigravity** | IDE 多 agent 管理 UX 参照 |

---

## 10. Sources

| 来源 | URL |
|------|-----|
| CrewAI Introduction | https://docs.crewai.com/en/introduction |
| CrewAI GitHub | https://github.com/crewaiinc/crewai/ |
| MetaGPT GitHub | https://github.com/FoundationAgents/MetaGPT |
| IBM MetaGPT | https://www.ibm.com/think/topics/metagpt |
| Cursor Subagents | https://cursor.com/docs/subagents |
| Cursor Multi-agent | https://cursor.com/help/ai-features/multi-agent |
| Devin | https://devin.ai/ |
| Devin Manage Devins | https://cognition.ai/blog/devin-can-now-manage-devins |
| Devin 2025 Review | https://cognition.com/blog/devin-annual-performance-review-2025 |
| ChatDev GitHub | https://github.com/OpenBMB/ChatDev |
| BMAD Method GitHub | https://github.com/bmad-code-org/BMAD-METHOD/ |
| LangGraph | https://langchain-ai.github.io/langgraph/ |
| OpenHands Docs | https://docs.openhands.dev/ |
| OpenHands Delegation | https://docs.openhands.dev/sdk/guides/agent-delegation |
| Jules (Google) | https://blog.google/innovation-and-ai/models-and-research/google-labs/jules/ |
| Jules vs Devin 对比 | https://www.morphllm.com/comparisons/jules-google-coding-agent |

---

*快照日期：2026-08-22 · 下次 diff 建议：Cursor 3.x、BMAD 大版本、ChatDev 2.0 社区模板成熟后*
