# 架构概览

> **状态：③–④ · v0.1**

## 产品边界

```
扶摇 · Nomad 做什么          不做什么
─────────────────────────────────────────
团队框架、编制协议、交付模式    harness / IDE / runtime
DDD 驱动的协作与门禁          单体 AI 员工
薄适配挂载到现有 harness      替代 Cursor / OpenHands 等
```

## 分层

```
┌─────────────────────────────────────────┐
│  Harness 薄适配  (harness/)              │
├─────────────────────────────────────────┤
│  团队实例  (roster + plan-progress)       │
├─────────────────────────────────────────┤
│  编制协议  (composition-protocol)        │
├─────────────────────────────────────────┤
│  交付模式  (delivery-model + templates/)  │
├─────────────────────────────────────────┤
│  领域语言  (domain-language.md)           │
├─────────────────────────────────────────┤
│  技能层  (skills/)                       │
├─────────────────────────────────────────┤
│  核心契约  (packages/core/ + scripts/)   │
└─────────────────────────────────────────┘
```

## 设计原则

1. **团队优先** — 多 agent 协作为一等公民
2. **DDD 必要** — 见 [domain-language.md](./domain-language.md)
3. **编制规则，非固定编制**
4. **Harness 薄适配** — 不构建 harness
5. **轻-重流程重量** — 连续谱，`flow_weight` 联动 DoD / 验证 / 审计 / DDD 门

## ④ 交付状态

- [x] Role Slot / Roster schema + `orthogonal_slots`
- [x] plan-progress schema
- [x] 模板族：dod · verification · ddd-gate · audit-record
- [x] `npm run validate` · `npm test`
- [x] Cursor 映射 POC + `--check` 漂移检测
- [x] 争用规则文档
- [x] 团队包 pack 格式 → [team-pack.md](./team-pack.md) · `packs/` · `npm run pack`
- [x] 消息协议 schema（[message-protocol.md](./message-protocol.md)）
