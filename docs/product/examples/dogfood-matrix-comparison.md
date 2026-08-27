# Dogfood 矩阵对照

> 主档（轻 · 中 · 重）+ 桥接档（轻中）· [playbook](./dogfood-playbook.md)

## 主档（已实跑）

| 维度 | 轻 · todo-strip | 中 · reading-card | 重 · audit-trail |
|------|-----------------|-------------------|------------------|
| **版本** | v0.20 | v0.19 | v0.21 |
| **flow_weight** | 轻 | 中 | 重 |
| **stage 数** | 2（s1–s2） | 4（s1–s4） | **6（s1–s6）** |
| **ddd_gate** | optional | required（中） | required（重） |
| **DoD identity required** | false | true | true |
| **三层审计** | N/A | 设计+实现（文档级） | **design + impl + CQ 本地 md** |
| **check:traceability strict** | 可选 | 建议 | **必跑（重档追溯）** |
| **commit 默认** | auto 面宽 | 中档混合 | **confirm 为主** |
| **Sandbox** | 本地 only | 本地 only | 本地 only |

| 范例 | 场景 | 关仓 |
|------|------|------|
| 轻 | [iii](./dogfood-iii-scenario.md) | [iii-close](./dogfood-iii-close.md) |
| 中 | [ii](./dogfood-ii-scenario.md) | [ii-close](./dogfood-ii-close.md) |
| 重 | [iv](./dogfood-iv-scenario.md) | [iv-close](./dogfood-iv-close.md) |

## 桥接档（已实跑）

| 档 | 场景 | stage | 文档 |
|----|------|-------|------|
| **轻中** | action-list | 3 | [v-scenario](./dogfood-v-scenario.md) · [v-close](./dogfood-v-close.md) |
| **中重** | changelog-slice | **5** | [vi-scenario](./dogfood-vi-scenario.md) · [vi-close](./dogfood-vi-close.md) |

**未实跑：** 全流程 → [templates README](../../templates/README.md)

## Harness（步 7）

**Triple（v0.23+）：** cursor + cli + openhands · [step7](./dogfood-step7-scenario.md)
