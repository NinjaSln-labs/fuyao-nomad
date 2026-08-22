# 验证与测试 · 随 flow_weight

> **状态：③ 设计 · v0.1**  
> 能力域：[capability-model.md](../product/capability-model.md) §5  
> **分层审计**（设计 / 实现 / 代码质量）见 [audit-by-flow-weight.md](./audit-by-flow-weight.md) — 与本文件并列，勿混为一谈。

## 原则

- **测试深度随 `flow_weight` 伸缩**，与 DoD、DDD 门同级联动。
- 轻端不强制全量测试；全流程端可选对抗/边界模块（非默认）。

## 模板族（草案）

实现时可为每个 `flow_weight` 提供 `dod` + `verification` 配对文件。

### 编码任务

| flow_weight（示例） | 完成前验证 |
|---------------------|------------|
| **轻** | 自检；变更可运行；lint（若项目已有）；无强制全量 `test` |
| **轻中** | + 变更路径相关测试或 smoke |
| **中** | 变更范围单元测试；`build` + `test`（项目默认命令）通过 |
| **中重** | + 关键路径/集成测试（按模块风险） |
| **重** | + 第二槽位 verifier；**代码质量审计**（见 audit 文档） |
| **全流程** | + 更广类别（对抗/边界/容错等**可选模块**） |

### 非编码任务（调研、规格、竞品）

| flow_weight（示例） | 完成前验证 |
|---------------------|------------|
| **轻** | 关键结论有来源；可快速核对 |
| **中** | 多源对照；快照/文档去权威化声明 |
| **重** | 与意图/领域追溯一致；规格缺口列出 |
| **全流程** | 文档层审计核对（按需） |

## DoD 勾选结构（建议）

每个验证模板包含：

```yaml
verification:
  coding:
    - id: unit_tests_changed_scope
      required: true
    - id: build_passes
      required: true
  non_coding:
    - id: sources_cited
      required: true
```

`required` 与 `flow_weight` 绑定；未列项视为不适用或 optional。

## 与槽位

- `slot_kind: verifier` 槽位负责执行或复核本表对应项。
- 验证失败 → `blocked` 进度态 → 默认 handoff 升级。

## V1 验收

- [x] 至少 **6 个** flow_weight 档位各有 verification 清单（轻 · 轻中 · 中 · 中重 · 重 · 全流程）
- [x] 与 `agents/examples/` 中 roster 的 `flow_weight` 可配对
