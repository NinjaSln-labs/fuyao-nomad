# 身份约束（Identity Constraints）

> **状态：v0.16** · dogfood 教训沉淀（天气助手漏掉「AI」）  
> 关联：plan-progress · DoD · 审计 · confirm 门

## 问题

一句话意图里的 **品类/形态词**（如「AI」「实时」「多用户」）若未进入硬约束，推进过程中会被「可演示 / 无依赖」优化掉，规格与审计仍可能假阳性通过。

## 规则

1. 从 `intent`（或问题陈述标题）抽出 **身份约束** 列表 `identity_constraints`。  
2. 约束写入计划载体（推荐）与规格；**裁剪不得删除**身份约束——只能：  
   - 满足约束后标完成，或  
   - 记入 `progress.blockers` / 明确废除项目。  
3. DoD 含 `identity_constraints_held`：交付物仍满足全部身份约束。  
4. `gate_level=confirm` 的规格门：对照 **intent 原文逐词**，确认身份词仍在。  
5. **审计须对照原始 intent + identity_constraints**，不得只对照已可能漂移的规格正文。

## 计划字段（plan-progress）

```yaml
intent: 天气 + 出行 + 穿搭 AI 随身助手 — …
identity_constraints:
  - id: ic-ai
    phrase: AI
    meaning: 主路径须由模型/智能体生成建议，不得以纯规则表冒充完成
    enforcement: blocker_if_unmet   # 或 abolish
```

Schema：`plan-progress.schema.json` → 可选数组 `identity_constraints`（有则校验结构）。

## 清除规则（v0.17）

1. 未满足 → `progress.blockers` 含 `related_identity_constraint_ids`（对齐约束 `id`），`status` 缺省或 `open`。  
2. 满足后清除 → 同一 blocker 记 `status: cleared`，**必须**带 `evidence`（审计 md / 实测笔记路径，或 `{ path, note }`）。  
3. **禁止**：空清、只改 milestone/`work_item` status 不写证据。  
4. DoD：`identity_constraints_held` 与 `blocker_evidence_recorded` 联读（见 DoD 模板）。

## DoD

checklist id：`identity_constraints_held`（中档及以上 required；轻档建议 required:false 但仍列出）。  
checklist id：`blocker_evidence_recorded`（v0.17；中档及以上 required；轻档 false）。

## 与反指标

若交付退化为「有壳无身份」（有页面无 AI），视为触碰「单体/空心交付」类风险；项目自定义反指标可引用本机制。

## 不做

- 不自动 NLP 抽词（人工或槽位显式填写）  
- 不因身份约束而强制框架调 LLM（用户产品自备推理；扶摇仍不调 LLM）
