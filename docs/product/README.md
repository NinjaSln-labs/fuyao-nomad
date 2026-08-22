# 产品文档

## 愿景

扶摇 · Nomad 是开源 **Agent 团队框架**：团队优先、DDD 必要、编制可加减、**轻-重流程重量**，通过薄适配挂到任意 harness（**不做 harness**）。

## 阅读顺序

| # | 文档 | 状态 |
|---|------|------|
| 1 | [问题陈述](problem-statement.md) | ✅ 草案 |
| 2 | [北极星](north-star.md) | ✅ 定稿 |
| 3 | [交付模式](delivery-model.md) | ✅ 定稿 |
| 4 | [能力模型](capability-model.md) | ✅ 定稿 |
| 5 | [0→1 路径](0-1-path.md) | ✅ |
| 6 | [Builder 指南](builder-guide.md) | v0.1 |
| 7 | [后 v0.1 路线](post-v01-roadmap.md) | v0.5 ✅ |
| 8 | [竞品快照](../research/2026-08-22-agent-team-landscape.md) | ✅ |

## 设计（③ 阶段）

| 文档 | 状态 |
|------|------|
| [编制协议](../design/composition-protocol.md) | v0.1 |
| [默认 handoff](../design/default-handoff.md) | v0.1 |
| [计划进度契约](../design/plan-progress-contract.md) | v0.1 |
| [验证随 flow_weight](../design/verification-by-flow-weight.md) | v0.1 |
| [分层审计随 flow_weight](../design/audit-by-flow-weight.md) | v0.1 |
| [领域语言](../design/domain-language.md) | v0.1 |
| [团队包](../design/team-pack.md) | v0.2 |
| [消息协议](../design/message-protocol.md) | v0.2 |
| [升级协议](../design/escalation-protocol.md) | v0.3 |
| [文件锁契约](../design/file-lock-contract.md) | v0.4 |
| [Schema](../design/schemas/) | v0.1 |
| [架构概览](../design/architecture.md) | 草案 |

## 权威层级

```
problem-statement / north-star
    → capability-model（8 域 P0/P1）
    → delivery-model（flow_weight + 继承表）
    → composition-protocol（编制规则）
    → 团队包与任务实例
```

竞品调研**去权威化** — 快照不自动升格为 scope。
