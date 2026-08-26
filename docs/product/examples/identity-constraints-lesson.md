# 教训：身份词被裁掉（dogfood）

> v0.16 · 机制权威见 [identity-constraints.md](../../design/identity-constraints.md)

## 场景

独立 dogfood 项目一句话意图含 **「AI」**。推进中规格写了「MVP 不依赖大模型」，规则引擎 demo 仍过 DoD/审计（只对照漂移后的规格），产品无真 AI 路径。

## 根因（摘要）

| 缺口 | 说明 |
|------|------|
| 身份词未入硬约束 | 「AI」停在 intent 自然语言，可被优化掉 |
| 规格可改身份 | 裁剪范围时删掉了品类词 |
| 审计只看规格 | 对照漂移正文 → 假阳性 pass |
| 可演示 ≠ 身份满足 | DoD 只验「有建议可演示」 |

## 协议补丁（本仓）

1. `identity_constraints`（plan-progress / 问题陈述 / PRD-lite）  
2. DoD `identity_constraints_held`  
3. confirm 门对照 intent 原文  
4. 审计对照 intent + 身份约束，不得只看规格  

## 不在本仓

具体 dogfood 产品仓库与问题日志留在各自项目；本页只沉淀可复用的协议教训。

## 闭环验证（2026-08-26）

天气助手 dogfood 在写入 `identity_constraints` 后：假完成被 blocker → 配置真实网关后 A1 通过 → 清 blocker → 关闭。  
移植：同 pack 声明 cursor/cli/openhands 映射，roster 未改。  
证明：机制可拦截假完成，且不清空「可演示 AI」证据不放行。
