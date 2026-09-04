# 架构概览

> **状态：③ 设计 · 完整形态（v0.31）**
> 结构参照 arc42 裁剪：§1+§2 合并为本文件 §1；§4+§5 合并为 §3；§7 部署视图不适用（本框架为文档 + 校验脚本，无部署拓扑）；§10 质量场景并入 §1（反指标见 [north-star](../product/north-star.md)）；§9+§11 合并为 §8。
> **防双源**：本文是地图不是百科——每个专题只有权威文档一处，本文仅引用不复制。

---

## §1 质量目标与约束

### 质量目标（top 3）

| 目标 | 含义 | 反面（反指标节选，见 [north-star](../product/north-star.md)） |
|------|------|------|
| **可迁移** | 同一 roster / pack，换 harness 只换映射 | 把团队 spec 锁进单一 IDE 格式 |
| **可治理** | 交付可对照意图与身份约束审计 | 「演示能跑」但身份词被静默裁掉 |
| **轻重可调** | 同一协议上按情境调节流程重量 | 满配 ceremony 成为默认负担 |

### 硬约束（不可协商，均有 ADR 裁决）

| 约束 | 裁决 |
|------|------|
| 不做 harness / 不实现编排 runtime | [ADR-0001](../decisions/adr-0001-no-harness.yaml) |
| 不维护官方固定角色编制 | [composition-protocol](composition-protocol.md) 原则 1 |
| 不在框架侧调 LLM / 不自动抽身份词 | [model-harness-contract](model-harness-contract.md) · [identity-constraints](identity-constraints.md) |
| 竞品调研不自动升格 scope | [ADR-0004](../decisions/adr-0004-research-deauthorize.yaml) |

---

## §2 系统上下文

扶摇是 **spec 层框架**：定义多角色「如何协作、如何交付」，自身无 runtime。执行者是外部 harness 中的 agents。

```
                         ┌──────────────────┐
                         │      人          │
                         │  gate 确认 · 审计阅读 · 授权
                         └────────▲─────────┘
                                  │ gate_level=confirm / forbid
┌─────────────────────┐    ┌──────┴───────────┐    ┌─────────────────┐
│   Harness（5 适配）  │◄───┤   扶摇 · Nomad   ├───►│  git / CI        │
│  Cursor · CLI ·     │映射 │  spec 层框架     │    │ validate · test │
│  OpenHands ·        │    │                  │    │ check:contention│
│  LangGraph · CrewAI │    │                  │    │（校验均顾问默认） │
└─────────┬───────────┘    └──────▲───────────┘    └─────────────────┘
          │ 槽位执行               │ roster · plan-progress ·
          ▼                       │ templates · pack · messages
   ┌─────────────┐          ┌─────┴──────────┐
   │  LLM / 工具  │          │  用户项目仓库    │
   │（harness 侧）│          │ .agents/ 落点  │
   └─────────────┘          └────────────────┘
```

**跨界规则**：进扶摇的 = schema、模板、协议、映射表；不进的 = runtime、工具调用、沙箱、LLM（→ harness 厂商）。竞品普遍把「团队 spec」与「runtime」绑定（Cursor 锁 IDE、CrewAI/MetaGPT 绑 Python）——扶摇只做上层的可迁移契约，这是 [ADR-0001](../decisions/adr-0001-no-harness.yaml) 的核心赌注。

---

## §3 分层与构建块

```
┌─────────────────────────────────────────┐
│  Harness 薄适配  harness/                │  ← 属 harness 协作面
├─────────────────────────────────────────┤
│  团队实例  roster + plan-progress        │  ← 属用户项目
├─────────────────────────────────────────┤
│  编制协议  composition-protocol         │  ┐
│  交付模式  delivery-model + templates/   │  ├ 属扶摇
│  领域语言  domain-language.md            │  │ spec 核心
│  技能层    skills/（不进 harness）       │  ┘
├─────────────────────────────────────────┤
│  核心契约  packages/core + schemas + scripts/  ← 共享契约
└─────────────────────────────────────────┘
```

| 层 | 职责 | 归属 | 关键载体 |
|----|------|------|---------|
| Harness 薄适配 | 槽位 → 运行时 agent 的映射 | 扶摇提供映射表，harness 执行 | [harness/](../../harness/README.md) |
| 团队实例 | 一次任务/项目的编队与进度 | 用户项目 | `.agents/plan-progress.yaml` · roster |
| 编制协议 | 槽位声明、加减、handoff | 扶摇 | [composition-protocol](composition-protocol.md) |
| 交付模式 | flow_weight 六档联动 | 扶摇 | [delivery-model](../product/delivery-model.md) · [templates](../templates/README.md) |
| 技能层 | harness 无关能力引用 | 扶摇（不同步进 harness） | [skills-binding](skills-binding.md) |
| 核心契约 | 16 份 JSON Schema + 校验脚本 | 共享（validate 顾问默认） | [schemas/](schemas/) · [scripts/](../../scripts/) |

设计原则 5 条：团队优先 · DDD 必要 · 编制规则非固定编制 · 薄适配 · 轻重可调（详见各权威文档）。

---

## §4 能力域 × 层对齐

8 域（[capability-model](../product/capability-model.md)）到层与权威文档的映射——三张既有图（8 域表 · BC 图 · 目录结构）在此统一：

| 域 | 核心问题 | 权威文档 | 承载 schema |
|----|---------|---------|------------|
| 1 团队编制 | 槽位定义、加减、边界 | [composition-protocol](composition-protocol.md) | roster |
| 2 编排协作 | 并行、争用、升级 | [escalation-protocol](escalation-protocol.md) · [contention-rules](contention-rules.md) | roster（orchestration）· message |
| 3 管理推进 | 进度、里程碑、阻塞 | [plan-progress-contract](plan-progress-contract.md) | plan-progress |
| 4 交付模式 | 轻重流程重量调节 | [delivery-model](../product/delivery-model.md) · [team-pack](team-pack.md) | 全模板族 |
| 5 质量验证 | 什么叫「做完」 | [verification-by-flow-weight](verification-by-flow-weight.md) · [audit-by-flow-weight](audit-by-flow-weight.md) | dod · verification · audit-record |
| 6 治理审计 | 何事须人确认、留痕 | [default-handoff](default-handoff.md)（gate 行为）· [eval-gates](eval-gates.md)（可选） | roster（gate_level）· audit-record |
| 7 研究产品 | 调研/PRD 如何进协议 | [skills-binding](skills-binding.md) · [ADR-0004](../decisions/adr-0004-research-deauthorize.yaml) | problem-statement · prd-lite 模板 |
| 8 可移植挂载 | 不重写 harness 而挂载 | [export-orchestration-mapping](export-orchestration-mapping.md) · [model-harness-contract](model-harness-contract.md) | team-pack · mapping yaml |

边界上下文（Team Composition / Delivery / Progress / Governance / Harness Mount）见 [domain-language](domain-language.md) §边界上下文。

---

## §5 运行时视图（协议流转）

> **扶摇无 runtime**。本节是协议流转视图——展示触发规则与载体落点如何衔接；实际执行者是 harness 中的 agents，并行调度与 LLM 调用均在 harness 侧。

### 场景 A · 全流程档七阶段主线（flow_weight=全流程）

以 dogfood VII/VIII 实跑形态为准（非纸面虚构）：

```
[progress] 初始化 plan-progress：intent + identity_constraints + territory + milestones
s1 调研    wi-research → DoD intent_clear ✓
   ↓ dod_complete（default-handoff）→ serial 下一槽位
s2 规格    wi-spec · m-spec：授权门声明 + optional_modules 声明（N/A 或启用）
   ↓ 槽位 gate_level=confirm → 暂停 → 人对照 intent 原文 + 身份约束逐词确认
s3 设计审计  audit_gate: design — gate: before_implementation ★不过不许写码
   ↓ verdict=pass → 里程碑推进（blocked 则阶段冻结）
s4 实现    wi-impl · verification：full_test_suite · build · integration_and_e2e
s5 实现审计  audit_gate: implementation → audit-record
s6 代码质量  code_quality 审计（depth: full_with_rotation）→ audit-record
s7 边界回顾  可选：adversarial/eval 启用时必过（N/A 须声明）
   ↓
m-release  授权门：Agent propose → 主理人 approve → 禁止静默 execute
   ↓ DoD：explicit_authorization_gates · trace_end_to_end · identity_constraints_held
[progress] 全追溯矩阵 · handoff_snippet 更新 → 链完成
```

| 步 | 协议权威 | 载体落点 |
|----|---------|---------|
| s1–s2 换手 | [default-handoff](default-handoff.md) 触发表 | handoff_snippet + 可选 [message](message-protocol.md) 文件 |
| s2 规格门 | [identity-constraints](identity-constraints.md) 规则 4 | 暂停态（无落点），确认后继续 |
| s3/s5/s6 审计门 | [plan-progress-contract](plan-progress-contract.md)（audit_gate）· [verification-全流程](../templates/verification-全流程.yaml) | `.agents/audit/`（本地私有，[ADR-0002](../decisions/adr-0002-audit-private.yaml)） |
| m-release 授权门 | [dod-全流程](../templates/dod-全流程.yaml) `explicit_authorization_gates` | plan-progress milestones |
| 全程身份防漂移 | [identity-constraints](identity-constraints.md) | blocker 须 evidence 才可 cleared |

### 轻-重伸缩（同一链，重量可调）

| flow_weight | 阶段折叠 | 典型模板 |
|-------------|---------|---------|
| 轻 | 两阶段（意图+DoD 精简 → 完成） | todo-strip（dogfood III） |
| 中 | 四段（调研→规格→实现→审计，见 minimal roster） | reading-card（dogfood II） |
| 全流程 | 七阶段 + m-release 授权门 + 三层审计 + 追溯矩阵 | grant-gate（dogfood VII/VIII） |

**同一协议，折叠不同**——重量不是另一套流程，而是同一链上的伸缩（[delivery-model](../product/delivery-model.md)）。

### 场景 B · 并行争用：冲突→升级→恢复

```
[roster]   mode=parallel · parallel_groups [[fe, be]] · orthogonal: progress/auditor
[plan]     wi-fe territory=src/ui/ · wi-api territory=src/api/（领地声明）
[fe | be]  并行执行（实际并行度 = harness runtime）
   ✗ 冲突：fe 越界改 src/api/handlers/
[check:contention] 顾问报告（默认 exit 0；CI --strict → exit 1）
   ↓ 争用即阻塞
[progress] blockers 写入 或 message type=request · reason=contention
   → requested_slot_id=progress（触发链）
[progress] 按 policy 协调：escalate_to_progress / serial_fallback / human
   ↓ blocker 清除（涉身份约束须 evidence 核对）
[fe | be]  恢复并行 → 中重+ 合并单点（verifier/auditor 合并 + 代码质量审计）
```

| 步 | 协议权威 | 载体落点 |
|----|---------|---------|
| 领地声明 | [file-lock-contract](file-lock-contract.md) | `work_items[].territory.paths` |
| 冲突检测 | 同上 + `check:contention` | 顾问报告（strict 时 exit 1） |
| 争用升级 | [contention-rules](contention-rules.md) 原则 3 · [escalation-protocol](escalation-protocol.md) | `progress.blockers` 或 `.agents/messages/` request |
| policy 分派 | escalation-protocol 三档表 | 串行化 / 暂停 / 协调 |
| 合并单点 | escalation-protocol §合并单点（中重+） | audit-record: code_quality |

### 场景 C · 换 harness（可移植性）

roster / pack / templates / plan-progress **零改动** → 只换 `harness_adapters` 映射表 → `install:cursor-agents`（或读导出映射）→ 新 harness 的 agents 接同一 `.agents/` 落点继续跑。协议语义（§2 图右侧三列）不变。

---

## §6 横切概念

四条机制横穿全层（定义只此一处，其余文档引用）：

| 概念 | 一句话 | 权威 | 横穿 |
|------|--------|------|------|
| **flow_weight** | 轻-重流程重量，联动 DoD/验证/审计/DDD 门深度 | [delivery-model](../product/delivery-model.md) | 全部层（§5 伸缩表演示） |
| **identity_constraints** | intent 身份词入硬约束，裁剪不得删除 | [identity-constraints](identity-constraints.md) | plan-progress · DoD · 审计 · confirm 门 |
| **gate_level** | 槽位门禁：auto / confirm / forbid | [composition-protocol](composition-protocol.md) §Role Slot | 编排 · handoff · 治理 |
| **traceability** | 意图→领域→任务三层可校验链 | [traceability-contract](traceability-contract.md) | plan · DoD · 审计（不入 CI，[ADR-0003](../decisions/adr-0003-traceability-not-in-ci.yaml)） |

---

## §7 编排协同总图（域 2）

编排域的 5 份专题文档此前零互链，协同关系如下：

```
composition-protocol（串/并行/正交声明）
        │ orchestration.*
        ▼
contention-rules + file-lock-contract（领地 · 检测）──check:contention──┐
        │ 争用即阻塞                                                  │
        ▼                                                             ▼
escalation-protocol（触发链 · policy 三档） ◄──────── 顾问报告 / exit 1
        │ blockers · request
        ▼
message-protocol（结构化载体：handoff/status/audit/request）
        │ .agents/messages/
        ▼
default-handoff（dod_complete / blocked / gate 三类默认换手）
```

一次争用事件的完整链条：**声明领地（file-lock）→ 冲突检测（check:contention）→ 阻塞升级（escalation → progress）→ policy 分派 → 恢复并行 → 合并单点审计**。语义定义见各权威文档；导出到 LangGraph / CrewAI 时按 [export-orchestration-mapping](export-orchestration-mapping.md) 翻译，`check:contention` 始终留在扶摇侧。

---

## §8 决策与风险

### ADR 索引（正文见 [decisions/](../decisions/README.md)）

| # | 裁决 | 状态 |
|---|------|------|
| [ADR-0001](../decisions/adr-0001-no-harness.yaml) | 不做 harness / 编排引擎 | accepted |
| [ADR-0002](../decisions/adr-0002-audit-private.yaml) | 审计报告本地私有 | accepted |
| [ADR-0003](../decisions/adr-0003-traceability-not-in-ci.yaml) | traceability 不入 CI | accepted |
| [ADR-0004](../decisions/adr-0004-research-deauthorize.yaml) | 调研快照去权威化 | accepted |

### roles.md 裁决（2026-08-30）

「官方固定角色表」方向在发现阶段否决（编制规则而非固定编制）。[roles.md](roles.md) 为早期占位文档，其内容已被 [composition-protocol](composition-protocol.md) §示例吸收；全仓零引用。**裁决：保留文件作历史化石（git 历史不删），不参与导航，读者由本节指针引导至 composition-protocol。**

### 技术债

| 债 | 状态 | 说明 |
|----|------|------|
| roles.md 占位文档 | 已裁决关闭（见上） | 无行动项 |
| `spec-to-ship` 第二 pack stub | 计划内 skip | 复活与否属新决策（[ROADMAP](../../ROADMAP.md) P2） |
| traceability 本地自觉 | ADR-0003 既定 | 改 plan↔DoD 联动时维护者须自跑检查 |

---

## §9 阅读路径与术语

| 受众 | 路径（3 份起步） |
|------|----------------|
| Builder | [builder-guide](../product/builder-guide.md) → [composition-protocol](composition-protocol.md) → [team-pack](team-pack.md) |
| 小团队 | [delivery-model](../product/delivery-model.md) → [plan-progress-contract](plan-progress-contract.md) → [escalation-protocol](escalation-protocol.md) |
| 单人 | [builder-guide](../product/builder-guide.md) §快速开始 → [dogfood-playbook](../product/examples/dogfood-playbook.md) 轻档 |

术语统一见 [domain-language](domain-language.md)（本文不建第二张术语表）。

---

## 交付状态（④）

- [x] 本文档 · 系统上下文 · 能力域对齐 · 运行时视图（A/B/C）· 横切概念 · 编排协同 · 决策风险
- [x] 运行时视图与 default-handoff / escalation-protocol / verification-全流程 逐字对齐
- [x] capability-model「待扩」标注兑现 → [capability-model](../product/capability-model.md) §文档索引

*完整形态 · 2026-08-30*
