# Adopt 矩阵对照（产品接手）

> 源仓只读 · 独立 `fuyao-adopt-*` 接手仓 · [adopt playbook](./fuyao-adopt-playbook.md)  
> Dogfood 档位矩阵见 [dogfood-matrix-comparison.md](./dogfood-matrix-comparison.md)

## 仓类型

| 类型 | 作用 | GitHub |
|------|------|--------|
| 源仓 | 真实产品 | 照常 |
| dogfood | 档位验证（合成切片） | 不上 |
| **adopt** | 产品域 + 扶摇 ceremony + **vs-source** | 不上 |

## 已实跑 / 计划

| 维度 | qingfu-envoy（**v0.28**） | shisui（计划 v0.29） |
|------|---------------------------|----------------------|
| **状态** | ✅ 已实跑 | ⬜ 未实跑 |
| **源仓** | `qingfu-envoy`（只读） | `shisui`（只读） |
| **接手仓** | `fuyao-adopt-qingfu-envoy` | `fuyao-adopt-shisui` |
| **flow_weight** | 全流程 | 中 / 轻中 |
| **identity** | `ic-no-silent-pay`（ADR 001） | `ic-evidence-gate` |
| **scenario** | [adopt-qingfu-scenario](./adopt-qingfu-scenario.md) | — |
| **close** | [adopt-qingfu-close](./adopt-qingfu-close.md) | — |
| **vs-source** | [adopt-vs-source-qingfu](./adopt-vs-source-qingfu.md) | — |

## 对比维度（每行关仓须覆盖）

| 维度 | 说明 |
|------|------|
| 范围 | 源仓垂直切片 vs adopt 薄交付 |
| 阶段 | 产品 stage-spec vs 扶摇 stage |
| 身份 | 源 ADR / 品类 vs `identity_constraints` |
| 审计 | 产品审计链 vs `.agents/audit/` |
| Git | 公开策略 vs 本地 only |

## 验收（v0.29 目标）

- [x] adopt 矩阵 ≥ **1** 行已实跑（qingfu）  
- [ ] ≥ **2** 行（+ shisui）  
- [x] 每行含 scenario · close · vs-source（qingfu）  
- [x] 对应源仓本会话 **零写入**
