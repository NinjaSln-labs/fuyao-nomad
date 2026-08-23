# 调研 → 规格 → 实现 · 任务链示例

> **状态：④ 交付 · dogfood**  
> 对齐北极星「单人跑通一类典型任务」。

## 链路

```text
research（调研）→ spec（规格）→ spec/主 agent（实现）→ auditor（实现审计）
         ↑ progress 全程 · orthogonal
```

## 文件

| 文件 | 用途 |
|------|------|
| [minimal-roster.yaml](../../agents/examples/minimal-roster.yaml) | 团队编制 |
| [plan-research-spec-impl.example.yaml](../../agents/examples/plan-research-spec-impl.example.yaml) | 三阶段 work_items + territory |
| [packs/minimal-research-to-spec](../../packs/minimal-research-to-spec/) | 可安装团队包 |

## 模型调用（harness）

扶摇 **不直接调 LLM**。Cursor 路径：

1. `pack:install` → `.cursor/agents/` subagent
2. 主 Agent 按 plan / handoff 委派槽位
3. `model_hint` / mapping `model_hints` → Cursor `model` 字段（见 [model-harness-contract.md](../design/model-harness-contract.md)）

## 验证

```bash
npm run validate
npm test
npm run pack:install -- --pack packs/minimal-research-to-spec --project .
```

## 与 flow_weight

本链默认 `flow_weight=中`：规格阶段用 [adr-中.yaml](../../templates/adr-中.yaml) · [commit-policy-中.yaml](../../templates/commit-policy-中.yaml) 作治理参考。
