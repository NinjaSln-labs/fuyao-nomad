# 能力模型

> **状态：② 定义 · 定稿**（2026-08-22）  
> 与 [north-star.md](north-star.md) 8 能力域对齐；竞品验证见 [竞品快照](../research/2026-08-22-agent-team-landscape.md)。

## 边界原则

| 层 | 扶摇 做什么 | 扶摇 不做什么 |
|----|-------------|---------------|
| **团队框架** | 编制协议、交付模式、治理契约、团队包格式 | 替代 harness / 编排 runtime |
| **团队包** | 提供 schema 与示例 | 维护「官方标准编制」 |
| **Harness 适配** | 薄映射（槽位 → 运行时 agent） | 实现 IDE、沙箱、LLM 调用 |
| **运行时** | 可**导出映射**到 CrewAI / Cursor 等 | 内置 Python 编排引擎（非目标） |

**优先级**

| 标记 | 含义 |
|------|------|
| **P0** | V1 框架必须提供契约或最小实现 |
| **P1** | V1 后紧跟；设计阶段须预留 |
| **P2** | 明确路线图，不阻塞 V1 |

---

## 能力域总览

```
┌──────────── 8. 可移植挂载 ─────────────────────────┐
│  ┌──── 1. 团队编制 ──── 2. 编排与协作 ─────────┐  │
│  │         │                    │              │  │
│  └─────────┴──── 3. 管理与推进 ─┴──────────────┘  │
│                      │                             │
│     4. 交付模式 (DDD + flow_weight)                │
│            │         │         │                   │
│     5. 质量   6. 治理   7. 研究与产品            │
└────────────────────────────────────────────────────┘
```

---

## 1. 团队编制（Composition）

**核心问题**：如何定义槽位、加减、边界？

| | 内容 |
|---|------|
| **P0 框架提供** | schema：`Role Slot`、`Team Roster`；`Handoff Rule` 为**可选槽位**（见下） |
| **P0 框架提供** | **默认 Handoff 行为** — 使用者未配置自定义规则时仍生效（见 [composition-protocol](../design/composition-protocol.md)） |
| **P0 框架提供** | 槽位加减、替换、禁用操作契约 |
| **P0 框架提供** | `flow_weight` 与 roster 绑定声明 |
| **P1** | 团队包打包/发布格式（`team pack`）、版本与 fork 元数据 ✅ v0.2+ · export/import v0.15 |
| **P2** | 团队包市场/注册发现（非 V1） |
| **用户/Builder 提供** | 具体槽位定义、技能绑定；**自定义** `handoff.rules`（可选） |
| **不做** | 强制使用者填写完整交接规则表；官方固定编制 |
| **竞品差异** | MetaGPT/BMAD 固定人格表 → 扶摇 **组队语法 + 默认 handoff 兜底** |

**Handoff 原则**

| | 说明 |
|---|------|
| **扶摇提供** | `handoff` **能力槽位** + **默认交接行为**（如：DoD 完成 → 下一槽位；阻塞 → 升级；默认交接载体） |
| **不强制** | 使用者不必写满 `handoff.rules`；未写时用默认 |
| **可覆盖** | 使用者可在 `handoff.rules` 声明规则，覆盖或细化默认 |

**V1 验收**：roster 仅声明 ≥2 槽位 + `flow_weight` 即可运行；无自定义 handoff 时默认交接仍可用；有自定义时优先用户规则。

---

## 2. 编排与协作（Orchestration）

**核心问题**：并行、争用、升级如何避免空转？

| | 内容 |
|---|------|
| **P0 框架提供** | 编排**契约**（非 runtime）：串行 / 并行 / 混合规则声明 |
| **P0 框架提供** | 与默认 Handoff 联动的触发语义（DoD 完成、阻塞、升级）— 自定义规则优先 |
| **P1** | 争用规则：同文件/同域冲突时的升级路径；`territory` + `check:contention` ✅ [contention-rules.md](../design/contention-rules.md) · `npm run check:contention` |
| **P1** | 与外部 runtime 映射说明（Cursor subagent、CrewAI Flow） ✅ [export-orchestration-mapping.md](../design/export-orchestration-mapping.md) · `harness/cursor` / `crewai` / `langgraph` |
| **P2** | 内置轻量编排器（仅当映射不足时再议） |
| **不做** | 与 CrewAI/LangGraph 竞争的编排引擎 |
| **竞品差异** | 编排层竞品强 → 扶摇 **声明编排，导出映射** |

**V1 验收**：roster 可声明并行槽位；未配 handoff 时默认行为可完成槽位间换手；文档说明 Cursor 并行映射。

---

## 3. 管理与推进（Progress）

**核心问题**：谁盯进度、里程碑、阻塞？**计划与执行如何对齐？**

| | 内容 |
|---|------|
| **P0 框架提供** | **进度载体契约**（计划 + 执行状态，可对接 HANDOFF） |
| **P0 框架提供** | 「推进者」槽位类型建议（非固定角色名）— 负责节奏、计划刷新与阻塞升级 |
| **P1** | 计划 ↔ 里程碑 ↔ DoD 联动；**里程碑审计门**（设计/实现/代码质量） ✅ [plan-progress-contract.md](../design/plan-progress-contract.md) · [traceability-contract.md](../design/traceability-contract.md) · DoD `plan_refs` |
| **P1** | 阻塞 → 升级 handoff（默认或自定义）；审计 `blocked` 写入 blockers ✅ [default-handoff.md](../design/default-handoff.md) · [escalation-protocol.md](../design/escalation-protocol.md) |
| **P1** | 小团队共享进度视图（文件型：统一为 `plan-progress.yaml`，非拆成 plan.yaml+progress.yaml） ✅ [plan-progress-contract.md](../design/plan-progress-contract.md) |
| **P2** | 与 Jira/Linear 同步（通过 harness 适配，非核心） |
| **不做** | 全功能 PM 工具 |
| **竞品差异** | 行业普遍弱；Devin 协调者 ◐ → 扶摇 **计划+进度显式契约** |

**进度载体应包含（契约字段）**

| 块 | 字段意图 |
|----|----------|
| **计划（Plan）** | 目标、范围、阶段/波次、依赖关系、关键路径 |
| **分解** | 任务或工作项（可链到槽位） |
| **里程碑** | 阶段完成标准；可含 **审计门**（设计 / 实现 / 代码质量） |
| **执行态** | 当前进行项、完成项、负责槽位 |
| **阻塞** | 阻塞项、等待谁、升级路径 |
| **下一动** | 下一步动作、谁执行 |

计划不是可选装饰 — **推进的基础**；轻端可短（意图 + 3 步），重端可含阶段门与追溯引用。

**V1 验收**：HANDOFF 或等价结构含 **计划摘要** + 里程碑（可含审计门）+ 阻塞 + 下一动作 + 负责槽位。

---

## 4. 交付模式（Delivery + DDD）

**核心问题**：DDD 底座上如何调节轻-重流程重量？

| | 内容 |
|---|------|
| **P0 框架提供** | DDD 设计门 + **设计审计**检查项（实现前，见 [audit-by-flow-weight.md](../design/audit-by-flow-weight.md)） |
| **P0 框架提供** | `flow_weight` 调节机制（轻-重连续谱，档位可扩展） |
| **P0 框架提供** | DoD / 验证 / 交付物 / 边界 **模板族**（与 flow_weight 绑定） |
| **P0 框架提供** | 青蚨使/Voyage **机制继承表**（见 [delivery-model.md](delivery-model.md)） |
| **P1** | stage 模板（可配置阶段，非固定 S0–S5） ✅ v0.18 六档 · [templates README](../templates/README.md) |
| **P1** | dogfood 六档模板实跑（中档范例） ✅ v0.19 · [dogfood-ii-scenario.md](examples/dogfood-ii-scenario.md) |
| **P1** | dogfood 轻档实跑（两阶段） ✅ v0.20 · [dogfood-iii-scenario.md](examples/dogfood-iii-scenario.md) |
| **P1** | 追溯链：意图 → 领域 → 任务（轻端可缩） ✅ [traceability-contract.md](../design/traceability-contract.md) · `npm run check:traceability` |
| **不做** | 固定「全工程 vs 敏捷」标签；满配 ceremony 为默认 |
| **竞品差异** | BMAD 敏捷+PRD 主轴 → 扶摇 **DDD 必要 + flow_weight** |

**V1 验收**：六档 `flow_weight` 模板可用（轻·轻中·中·中重·重·全流程）；DDD 门检查表与重量联动。

---

## 5. 质量与验证（Quality）

**核心问题**：什么叫「做完」？如何防幻觉交付？

| | 内容 |
|---|------|
| **P0 框架提供** | 「完成前验证」+ **分层审计**（设计 / 实现 / 代码质量）随 `flow_weight` 调节 |
| **P0 框架提供** | `verifier` / `auditor` 槽位类型建议（验证跑通 vs 评审审计） |
| **P0 框架提供** | DoD 勾选与 `flow_weight` 联动 |
| **P1** | 反指标机制（指标自定义，非 Voyage R1/R2/R3）✅ v0.13 `anti-metrics-重` |
| **P1** | 对抗/边界测试 — 重端/全流程**可选模块**（可并入代码质量审计扩展项）✅ v0.14 `adversarial-boundary-全流程` |
| **P2** | Eval 三门禁类（仅高风险 AI 产品可选模块） ✅ v0.17 [eval-gates.md](../design/eval-gates.md) · 模板 `eval-gates-重`（默认关闭） |
| **不做** | 157 波审计为默认；轻端强制全量测试 |
| **竞品差异** | Cursor verifier ◐ → 扶摇 **验证 + 三类审计写入 flow_weight** |

**分层审计（设计 / 实现 / 代码质量）**

| 类型 | 归属 | 说明 |
|------|------|------|
| 设计审计 | 交付→实现门 | 规格/DDD/架构是否可开工 |
| 实现审计 | 质量 | 实现是否对齐设计与 DoD |
| 代码质量审计 | 质量 | 代码坏味、安全、可维护性、测试充分性 |

详表：[audit-by-flow-weight.md](../design/audit-by-flow-weight.md)。测试/构建见下表。

**验证与测试 · 随 flow_weight 伸缩（草案）**

| 流程重量 | 编码任务 | 非编码任务 |
|----------|----------|------------|
| **轻端** | 自检 / lint（若有）；变更可运行；无强制全量测试 | 证据或来源可追溯；结论可核对 |
| **中间** | 变更范围单元测试；`build`/`test` 通过；DoD 清单 | 关键论断有出处；轻量交叉核对 |
| **重端** | + 集成/关键路径测试；评审或第二槽位验证 | 多源对照；规格与实现追溯 |
| **全流程** | + 更广测试类别（对抗/边界等可选模块） | 文档审计级核对（按需） |

测试不是「一律要测」— **测多少跟 flow_weight 走**；框架提供验证模板族，与 DoD 模板并列绑定。

**V1 验收**：每个 `flow_weight` 的 DoD 含完成定义 + **验证要求** + **适用的审计类型与深度**。

---

## 6. 治理与审计（Governance）

**核心问题**：哪些须人确认？留什么痕？

| | 内容 |
|---|------|
| **P0 框架提供** | 槽位 `gate_level`：自动 / 确认后 / 禁止 |
| **P0 框架提供** | 分级门禁（非一律「授权 S1」）：破坏性、远程、重端须确认 |
| **P0 框架提供** | 审计产物 schema：治理留痕 + **质量审计结论**（设计/实现/代码质量） |
| **P1** | ADR 模板与触发条件（硬约束写 ADR） ✅ [`adr-中.yaml`](../templates/adr-中.yaml) · [docs/decisions](../decisions/) |
| **P1** | commit 策略分级（自动 / 确认后 / 禁止） ✅ v0.18 六档 · [templates README](../templates/README.md) |
| **P2** | 分层审计旋转维度（继承 Voyage 结构，非百波体量）→ 见 audit-by-flow-weight |
| **不做** | 100/100 文档审计为轻端默认 |
| **竞品差异** | CrewAI HITL ◐ · 青蚨使全阶段授权 → 扶摇 **按风险分级** |

**V1 验收**：roster 槽位可设 gate_level；破坏性操作清单 + 默认须确认。

---

## 7. 研究与产品（Research & Product）

**核心问题**：竞品、PRD、发现如何进团队协议？

| | 内容 |
|---|------|
| **P0 框架提供** | 非编码任务链契约：调研 → 定义 → 设计 → 交付（与编码链同级） |
| **P0 框架提供** | 调研**去权威化**规则（快照不自动升格 scope） |
| **P1** | 竞品/问题陈述/PRD 产物模板（PRD 为重端产物之一，非全局权威） ✅ [`problem-statement-中.yaml`](../templates/problem-statement-中.yaml) · [`prd-lite-重.yaml`](../templates/prd-lite-重.yaml) · 竞品仍以 [research 快照](../research/2026-08-22-agent-team-landscape.md) 为准 |
| **P1** | 与 agent-skills 类技能包的引用/绑定方式 ✅ v0.13 [skills-binding.md](../design/skills-binding.md) |
| **P2** | 发现访谈、JTBD 工作流模板 |
| **不做** | 内置市场研究 API |
| **竞品差异** | BMAD 前期 workflow 强 ◐ → 扶摇 **与 DDD/DoD 同一团队协议** |

**V1 验收**：一条「调研→规格」任务链可在 roster + DoD 模板中跑通（不强制 PRD）。

---

## 8. 可移植挂载（Harness Mount）

**核心问题**：如何不重写 harness 而挂载团队？

| | 内容 |
|---|------|
| **P0 框架提供** | Harness **薄适配**契约：槽位 → 运行时 agent 映射表 |
| **P0 框架提供** | 团队 spec（roster + handoff + flow_weight）**与 harness 解耦** |
| **P0 框架提供** | Cursor 适配 POC 路径（`.cursor/agents/` 映射） |
| **P1** | CLI 适配；OpenHands delegation 映射说明 ✅ v0.14 [cli-openhands-adapter.md](../design/cli-openhands-adapter.md) |
| **P1** | 团队包导入/导出（同 spec 换映射表） ✅ v0.15 [pack-import-export.md](../design/pack-import-export.md) |
| **P2** | LangGraph / CrewAI Flow **导出映射**（非内置引擎）✅ v0.9 文档 POC |
| **不做** | 构建 harness、IDE、沙箱 runtime |
| **竞品差异** | 全行业 harness 绑定 → 扶摇 **spec 不变，只换映射** |

**V1 验收**：同一份 roster 文档 + 两份 harness 映射说明（Cursor 必达，第二 harness 文档级即可）。

---

## V1 能力切片（MVP 边界）

| 包含（P0） | 不含（V1 外） |
|------------|---------------|
| composition schema + 团队包示例 | 内置编排 runtime |
| flow_weight + 2+ DoD 模板族 | 满配全流程为默认 |
| DDD 门检查表（可调深度） | 157 波审计 |
| 分级门禁 + 审计 schema | Jira/Linear 集成 |
| HANDOFF / 计划+进度契约 | 团队包市场 |
| 默认 Handoff + 可选自定义 rules | 全 harness 实现 |
| Cursor 薄适配 POC | 全 harness 实现 |

---

## 受众与能力映射

| 能力 | Builder | 小团队 | 单人 |
|------|:-------:|:------:|:----:|
| 自定义槽位/团队包 | ● | ◐ fork | ○ 用默认 |
| 共享 roster + 进度 | ◐ 发布 | ● | ◐ |
| flow_weight 调节 | ● | ● | ◐ 默认档 |
| Harness 映射 | ● 编写 | ○ | ○ |
| 默认团队开箱 | ○ | ◐ | ● |

---

## 依赖关系（实现顺序建议）

```
1 团队编制 schema
    → 4 交付模式（flow_weight + DoD 模板）
    → 2 编排契约 + 6 治理 gate_level
    → 3 进度载体 + 5 验证 + 7 研究链
    → 8 Harness 映射（Cursor POC）
```

---

## 与文档索引

| 能力域 | 设计文档 | 实现目录（③ 后） |
|--------|----------|------------------|
| 1 编制 | composition-protocol | `packages/core/` · `agents/` |
| 2 编排 | architecture（待扩） | `packages/core/` |
| 3 推进 | plan-progress-contract · identity-constraints | `.agents/` |
| 4 交付 | delivery-model | `docs/product/` 模板 |
| 5 质量 | verification + audit-by-flow-weight · identity-constraints | `skills/` |
| 6 治理 | delivery-model 继承表 | rules 模板 |
| 7 研究 | research 去权威化 | `skills/` |
| 8 挂载 | harness/README | `harness/cursor/` |

---

## 变更记录

| 日期 | 变更 |
|------|------|
| 2026-08-22 | 初稿：8 域 P0/P1/P2 + V1 切片 |
| 2026-08-22 | 分层审计：设计 / 实现 / 代码质量 + flow_weight |
| 2026-08-27 | v0.18 U1：已交付 P1 补 ✅；stage/commit-policy 标 ◐ 待六档 |
| 2026-08-27 | v0.19 U9：dogfood 六档实跑 ✅ v0.19 · stage/commit 中档 dogfood 验证 |
| 2026-08-27 | v0.18 U10：stage / commit-policy → ✅ v0.18 |
