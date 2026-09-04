# Dogfood VIII 场景 · boundary-s7（全流程 · s7 对抗启用）

> v0.27 · **flow_weight=全流程** · **adversarial_boundary=true** · s7 **必做**  
> 独立本地 sandbox · 不上 GitHub · 不污染源仓

## 1. 场景

| 项 | 值 |
|----|-----|
| **代号** | boundary-s7 |
| **Intent** | grant-gate + 对抗/边界：畸形输入拒绝 · 金额边界 · store 故障降级 |
| **flow_weight** | **全流程** |
| **identity** | `ic-no-silent-exec` |
| **可选模块** | **adversarial_boundary: true** · eval/anti-metrics false |
| **Sandbox** | `<SANDBOX_ROOT>` · `fuyao-dogfood-boundary-s7` |

相对 [vii grant-gate](./dogfood-vii-scenario.md)：s7 从 **N/A** → **边界回顾必过**。

## 2. 模板

五模板全流程 + `adversarial-boundary-全流程.yaml`（`enabled: true`）

## 3. stage 映射

| stage | AC |
|-------|-----|
| s1–s6 | 同全流程（调研→CQ） |
| **s7** | adversarial cases 证据 + `s7-boundary-review.md` |

## 4. 对抗 cases → 测试

| case | 测试 |
|------|------|
| adversarial_input | id/`<>` · null-byte purpose |
| boundary_limits | amount 非法 · empty purpose |
| fault_degrade | corrupt store.json |

## 5. OpenHands E2E lite

```powershell
# 手检 mapping 4 slots ↔ agents/*.md（当时文档称 check:openhands，实为 sandbox 本地脚本，仓内从未提供）
npm run pack -- validate agents/packs/minimal-research-to-spec  # 含 openhands
```

不启 OpenHands runtime；验证 **pack 级挂载就绪**。

## 6. 验证

```powershell
Set-Location $Sandbox
npm test
# identity/traceability 双 strict（mapping 手检同 dogfood-step7）
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
node "$Fuyao\scripts\check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
```
