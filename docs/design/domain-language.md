# 领域语言 · 扶摇 · Nomad

> **状态：③ 设计 · v0.5**  
> 框架自身 dogfood DDD：术语与边界上下文，供文档、schema、审计对齐。

## 愿景

开源 **Agent 团队框架** — 定义多角色如何协作、按轻-重流程重量交付，通过薄适配挂到 harness（**不做 harness**）。

## 统一语言

| 术语 | 定义 |
|------|------|
| **Role Slot（角色槽）** | 可启用的职责单元；非固定「员工」 |
| **Team Roster（团队实例）** | 某任务启用的槽位集合 + 编排 + `flow_weight` |
| **flow_weight** | 轻-重流程重量；联动 DoD、验证、审计深度 |
| **Handoff（交接）** | 槽位间换手；默认行为 + 可选 `handoff.rules` |
| **正交槽位** | 不参与 `serial_order` 并行主线，随时可介入（推进、审计） |
| **Plan** | 计划：目标、范围、阶段、工作项、里程碑 |
| **Progress** | 执行态：当前项、阻塞、下一动 |
| **Harness** | 外部运行时（Cursor、CLI…）；扶摇 **不实现** |
| **Harness 映射** | 槽位 id → 运行时 agent 文件 |
| **团队包（Team Pack）** | roster + 模板 + 映射 + skills 的可发布单元 |
| **Skill** | harness 无关能力单元，绑到槽位（路径引用，不同步 harness） |
| **Slot Message** | 结构化槽位 payload；见 message-protocol |
| **contention_policy** | 并行争用策略；见 escalation-protocol |
| **messages_dir** | 运行时 Slot Message 目录；plan-progress 可选字段 |
| **Territory（领地）** | work_item 可选路径归属；并行争用见 file-lock-contract |
| **争用顾问（contention check）** | `npm run check:contention` — territory 重叠 + git 脏文件 + 并行 roster |
| **文件锁契约** | 并行槽位对路径的争用约定；见 file-lock-contract |

## 边界上下文

```
┌─────────────────────────────────────────────────────────┐
│  Team Composition（团队编制）                            │
│  Role Slot · Roster · handoff.rules · orthogonal_slots  │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────┐
│  Delivery（交付）                                        │
│  flow_weight · DDD 门 · DoD · 验证 · 分层审计            │
└──────────────────────────┬──────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│ Progress      │  │ Governance    │  │ Harness Mount │
│ Plan/Progress │  │ gate_level    │  │ 映射表        │
│ 里程碑/阻塞   │  │ 治理留痕      │  │ 非 runtime    │
└───────────────┘  └───────────────┘  └───────────────┘
```

## 聚合（草案）

| 聚合 | 身份 | 不变式 |
|------|------|--------|
| **Roster** | `roster.id` | 槽位 id 唯一；`serial_order` 引用须存在 |
| **PlanProgress** | `roster_id` + 会话/任务 | `intent` 必填；里程碑可含 `audit_gate` |
| **TeamPack** | `pack.id` | roster · templates · 引用路径须存在 |
| **AuditRecord** | `type` + `recorded_at` | `blocked` 须对应 open finding |

## 非本框架领域

- LLM 调用、沙箱、IDE UI — **Harness 厂商**
- Python/ LangGraph 编排 runtime — **可映射输出，非核心**

## 追溯

| 意图 | 文档/产物 |
|------|-----------|
| 产品边界 | problem-statement |
| 能力 | capability-model |
| 结构 | composition-protocol · schemas |
| 交付 | delivery-model · templates/ |
