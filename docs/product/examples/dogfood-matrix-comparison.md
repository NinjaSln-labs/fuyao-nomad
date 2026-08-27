# Dogfood 矩阵对照（轻 · 中 · 重）

> v0.21 · 实跑范例 ii / iii / iv · 机制见 [dogfood-playbook.md](./dogfood-playbook.md)

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

**Playbook 步 7（双 harness）：** v0.22 专档 [dogfood-step7-scenario.md](./dogfood-step7-scenario.md) · [close](./dogfood-step7-close.md)

| 范例 | 场景 | 关仓 |
|------|------|------|
| 轻 | [iii-scenario](./dogfood-iii-scenario.md) | [iii-close](./dogfood-iii-close.md) |
| 中 | [ii-scenario](./dogfood-ii-scenario.md) | [ii-close](./dogfood-ii-close.md) |
| 重 | [iv-scenario](./dogfood-iv-scenario.md) | [iv-close](./dogfood-iv-close.md) |

未实跑档位（轻中 · 中重 · 全流程）：见 [templates README](../../templates/README.md) 矩阵索引。
