# Dogfood III 关仓笔记 · todo-strip（轻档）

> **脱敏** · `<SANDBOX_ROOT>` · **不上 GitHub**  
> 场景：[dogfood-iii-scenario.md](./dogfood-iii-scenario.md) · 中档对照：[dogfood-ii-close.md](./dogfood-ii-close.md)

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-08-27 |
| **fuyao 起跑** | v0.19.0 |
| **文档入库** | v0.20 |
| **flow_weight** | **轻** |
| **结论** | **closed** |

## 模板绑定（轻档五文件）

副本于 sandbox `.agents/templates/`，来源 tag v0.19.0。

## stage 自检（两阶段 · stage-轻）

| stage | exit_criteria | ✅ | 证据 |
|-------|---------------|---|------|
| **s1 探索** | 问题陈述自洽 | ✅ | `docs/brief.md` |
| | 范围边界列出 | ✅ | 非目标：无 LLM/Web |
| **s2 交付** | DoD checklist 完成 | ✅ | intent_clear（wi-main） |
| | npm test 或等价 | ✅ | 3/3 |

中档 s3/s4 在轻档合并入 s2；无独立审计门 milestone。

## commit-policy 回顾（轻档 · auto 面宽）

| gate_level | 本仓例 |
|------------|--------|
| **auto** | README + test 脚本小改后直接 commit |
| **confirm** | （本仓未触发）改公开 schema 级变更才需 |
| **forbid** | 未提交密钥 |

## identity · ic-subset

cleared blocker `blk-ic-subset-v0` · 证据 `.agents/audit/ic-subset-evidence.md`

```text
npm test → pass 3
check:identity --strict → passed
```

## 与中档差异（Dogfood II vs III）

| 项 | 中（reading-card） | 轻（todo-strip） |
|----|-------------------|------------------|
| stage 数 | 4（s1–s4） | 2（s1–s2） |
| DoD identity required | true | false（仍声明约束并 strict 验证） |
| ddd_gate | required | false |
| audit_gate | implementation | N/A 自评 |

## 摩擦点 → U5

无模板 schema/文案 blocker → **U5 skip**。

## 结论

todo-strip **closed**；轻档五模板可跑通；sandbox 仅本地。
