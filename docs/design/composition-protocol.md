# 编制协议（Composition Protocol）

> **状态：③ 设计 · v0.1**  
> 替代「固定角色表」思路。产品核心是**组队语法**，不是「扶摇标准编制」。

## 原则

1. **无固定编制** — 不维护官方角色名录；无「标准八人团」。
2. **槽位加减** — 谁加入、谁减少，由使用者按项目定义。
3. **规则通用** — 框架只规定槽位如何声明、如何绑能力、如何交接。
4. **示例非本体** — 任何典故角色名（司命、掌卷等）仅为示例，可删可换。

## 核心对象（草案）

### Role Slot（角色槽）

一个可启用的 agent 职责单元。

| 字段 | 说明 |
|------|------|
| `id` | 槽位标识 |
| `purpose` | 职责一句话 |
| `boundaries` | 做什么 / 不做什么 |
| `inputs` | 期望输入类型 |
| `outputs` | 交付物类型 |
| `capabilities` | 绑定的 skills / tools |
| `gate_level` | 门禁级别（自动 / 确认 / 禁止） |

### Team Roster（团队实例）

某次任务或项目的**当前编队** — 数据，非品牌资产。

| 字段 | 说明 |
|------|------|
| `slots` | 启用的 Role Slot 列表 |
| `orchestration` | 串行 / 并行 / 混合规则 |
| `flow_weight` | 轻-重流程重量（可扩展档位） |
| `handoff` | **可选** — `use_defaults` + `rules`（见下） |
| `orchestration.orthogonal_slots` | 正交槽位 id 列表（推进、审计等，不走 serial 主线） |

### Handoff（交接）

**扶摇提供 handoff 能力 + 默认行为，不强制使用者写满 `handoff.rules`。**

| 层级 | 说明 |
|------|------|
| **默认（始终存在）** | 未写 `handoff.rules` 时仍可按 orchestration 与 DoD 完成换手 |
| **自定义（可选）** | `handoff.rules` 覆盖或细化默认 |

**默认行为（草案，实现时可调）**

| 触发 | 默认动作 |
|------|----------|
| 槽位 DoD 完成 | 按 `orchestration` 顺序或并行策略交给下一责任槽位 |
| 阻塞 | 若有「推进者」类槽位 → 升级；否则交编排主槽位 |
| 需人工确认 | `gate_level` 为确认/禁止时暂停，待确认后继续 handoff |
| 交接载体 | HANDOFF 片段 / 检查表 / 槽位 `outputs` 声明的交付物 |

### Handoff Rule（自定义规则 · 可选）

使用者定义时使用：

| 字段 | 说明 |
|------|------|
| `from` / `to` | 源槽位 → 目标槽位 |
| `when` | 触发条件（完成 DoD、阻塞、升级、自定义） |
| `artifact` | 交接载体 |
| `overrides_default` | 是否覆盖该 `(from,to)` 的默认行为 |

## 操作

| 操作 | 说明 |
|------|------|
| **加入槽位** | 声明新 Role Slot 或从团队包复制 |
| **移除槽位** | 从 roster 禁用；相关自定义 handoff 同步更新 |
| **替换槽位** | 同职责换实现（不同 skills/prompt） |
| **调节重量** | 改 `flow_weight`，联动 DoD、验证/测试与门禁 |
| **配置 handoff** | 可选：在 `handoff.rules` 添加规则；不配置则用默认 |

## 与 harness 的关系

- 槽位 **不绑定** 某一 IDE 的 subagent 实现。
- `harness/` 负责：槽位 → 运行时 agent 的**映射**。
- 换 harness 时，roster 与 handoff 语义**不变**（默认 + 自定义 rules），只换映射表。

## 待续（③ / ④）

- [x] Role Slot / Roster schema → `docs/design/schemas/roster.schema.json`
- [x] 默认 handoff → `docs/design/default-handoff.md`
- [x] 团队包打包格式 → [team-pack.md](./team-pack.md)
- [ ] 多 agent 争用与升级协议 → [escalation-protocol.md](./escalation-protocol.md)
- [x] 示例 roster → `agents/examples/minimal-roster.yaml`

## 示例（可全部删除）

以下为说明用，**不是**框架必备角色：

| 示例槽位 | 职责草案 |
|----------|----------|
| 问津 | 澄清意图、消歧 |
| 司命 | 编排、阶段、推进 |
| 掌卷 | 规格与知识沉淀 |
| 化羽 | 重构、迁移、适配 |

**槽位类型（`slot_kind`）**：`generic` · `progress` · `verifier` · `auditor`（见 [audit-by-flow-weight.md](./audit-by-flow-weight.md)）

使用者可零示例启动，自行声明槽位；**不必**先写 `handoff.rules`。
