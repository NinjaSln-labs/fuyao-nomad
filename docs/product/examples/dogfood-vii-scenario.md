# Dogfood VII 场景 · grant-gate（授权门切片）

> v0.25 · **flow_weight=全流程**（七阶段 s1–s7）· **独立本地 sandbox**  
> 域灵感：提议→确认→执行控制面；**不修改、不依赖** qingfu-envoy 等源仓。

## 1. 场景

| 项 | 值 |
|----|-----|
| **代号** | grant-gate |
| **Intent** | 最小 grant-gate：Agent propose → 主理人 approve → Mock 轨 execute；禁止静默 execute |
| **flow_weight** | **全流程** |
| **identity** | `ic-no-silent-exec` — pending 不得 execute；audit 须含 approve |
| **Sandbox** | `<SANDBOX_ROOT>` · 本地 `git init` · **不上 GitHub** |
| **源仓** | **无** — 独立 dogfood 库，零污染 |

全流程特征：**七阶段**（含 s3 设计审计、s5 实现审计、s6 代码质量、s7 可选边界回顾）；DoD 含 **`m-release`**、`explicit_authorization_gates`、`optional_modules_declared`；verification 要求 **integration_and_e2e** + 三层审计。

## 2. 五模板（来源 v0.24.0）

`stage-全流程` · `commit-policy-全流程` · `dod-全流程` · `verification-全流程` · `ddd-gate-全流程`

## 3. stage 映射

| stage | plan | AC |
|-------|------|-----|
| s1 调研 | wi-research | 问题陈述 + 域边界（脱敏） |
| s2 规格 | wi-spec · m-spec（前） | 授权门 + optional_modules 声明 |
| s3 设计审计 | m-spec · audit_gate: design | design-audit.md pass · ddd-gate 全流程 |
| s4 实现 | wi-impl | gate.js + unit + integration |
| s5 实现审计 | m-impl | implementation-audit.md pass |
| s6 代码质量 | m-impl | code-quality-audit.md pass |
| s7 边界回顾（可选） | m-release | adversarial/eval **N/A** 已声明 |

## 4. 授权门（m-release）

| gate | 实现 |
|------|------|
| gate-steward-approve | `assertAuthorizationGate` + status === approved |

## 5. 三层审计（sandbox 本地 md）

| 层 | 路径 |
|----|------|
| design | `.agents/audit/design-audit.md` |
| implementation | `.agents/audit/implementation-audit.md` |
| code_quality | `.agents/audit/code-quality-audit.md` |

## 6. Sandbox 初始化

```powershell
$Sandbox = "E:\ninjasin-labs\fuyao-dogfood-grant-gate"
$Fuyao   = "E:\ninjasin-labs\fuyao-nomad"

New-Item -ItemType Directory -Force -Path $Sandbox | Out-Null
Set-Location $Sandbox; git init

Set-Location $Fuyao
npm run pack:import -- --pack packs/minimal-research-to-spec --project $Sandbox

$tpl = Join-Path $Sandbox ".agents\templates"
New-Item -ItemType Directory -Force -Path $tpl | Out-Null
@("stage-全流程","commit-policy-全流程","dod-全流程","verification-全流程","ddd-gate-全流程") | ForEach-Object {
  Copy-Item "$Fuyao\docs\templates\$_.yaml" $tpl
}
```

### 验证

```powershell
Set-Location $Sandbox
npm test
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
node "$Fuyao\scripts\check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
```

## 7. 停止条件

DoD 全流程 checklist + 三层审计 pass + `m-release` 授权门验证，或明确废除。

**脱敏：** 范例文档用 `<SANDBOX_ROOT>`；无 API Key · 无真实支付。
