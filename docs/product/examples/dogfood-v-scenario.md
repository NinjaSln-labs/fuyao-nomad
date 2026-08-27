# Dogfood V 场景 · action-list（会议行动清单）

> v0.23 · **flow_weight=轻中**（三阶段 s1–s3）· 本地 sandbox  
> 轻/中对照：[iii](./dogfood-iii-scenario.md) · [ii](./dogfood-ii-scenario.md)

## 1. 场景

| 项 | 值 |
|----|-----|
| **代号** | action-list |
| **Intent** | 从会议备忘 bullet 生成 Markdown 行动清单（≤5 条） |
| **flow_weight** | **轻中** |
| **identity** | `ic-from-note` — 每条行动须对应输入中的一行/bullet |
| **Sandbox** | `<SANDBOX_ROOT>` · 本地 · 不上 GitHub |

轻中特征：**三阶段**（探索 → 规格草稿 → 交付）；DoD 含 `smoke_verified`；identity **required**。

## 2. 五模板（来源 v0.22.0）

`stage-轻中` · `commit-policy-轻中` · `dod-轻中` · `verification-轻中` · `ddd-gate-轻中`

## 3. stage 映射

| stage | plan | AC |
|-------|------|-----|
| s1 探索 | wi-research | `docs/brief.md` |
| s2 规格草稿 | wi-spec · m-spec | `docs/spec.md` + 术语草图 |
| s3 交付 | wi-impl · m-impl · m-done | `npm test` smoke |

## 4. 验证

```powershell
npm test
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
node "$Fuyao\scripts\check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
```

## 5. 与步 7（triple harness）

本版同时发布官方 pack **1.2.0**（cursor + cli + **openhands**）。步 7 验证见 [dogfood-step7-scenario.md](./dogfood-step7-scenario.md) 增 **triple** 一节。
