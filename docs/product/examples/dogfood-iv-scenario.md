# Dogfood IV 场景 · audit-trail（审计轨迹导出）

> v0.21 · 本地 sandbox 验证 **flow_weight=重** 五模板 + **六阶段** stage + **三层审计**。  
> 轻/中对照：[dogfood-iii-scenario.md](./dogfood-iii-scenario.md) · [dogfood-ii-scenario.md](./dogfood-ii-scenario.md)

## 1. 场景摘要

| 项 | 值 |
|----|-----|
| **代号** | audit-trail |
| **Intent** | 从用户提供的 JSON 事件数组生成 Markdown 审计轨迹报告（表格） |
| **flow_weight** | **重** |
| **最小交付** | Node：`stdin`/文件 → `report.md`；research/spec/design 笔记；三层本地审计 md；`npm test` |
| **Sandbox** | `<SANDBOX_ROOT>`（本地 git，**不上 GitHub**） |

重档特征：**六阶段** stage（含设计审计 s3、实现审计 s5、代码质量 s6）；DoD 要求 **trace_matrix** + **design/implementation/code_quality audit pass**；commit-policy **默认 confirm**。

## 2. identity_constraints

| id | phrase | meaning | enforcement |
|----|--------|---------|-------------|
| `ic-trace` | 可追溯事件 | 报告每行须对应输入 JSON 中已有 `id`；禁止编造未出现的事件 | `blocker_if_unmet` |

## 3. flow_weight=重 · 五模板

来源 tag：**v0.20.0**

| 族 | 主仓路径 | Sandbox |
|----|----------|---------|
| stage | [`stage-重.yaml`](../../templates/stage-重.yaml) | `.agents/templates/stage-重.yaml` |
| commit-policy | [`commit-policy-重.yaml`](../../templates/commit-policy-重.yaml) | `.agents/templates/commit-policy-重.yaml` |
| DoD | [`dod-重.yaml`](../../templates/dod-重.yaml) | `.agents/templates/dod-重.yaml` |
| verification | [`verification-重.yaml`](../../templates/verification-重.yaml) | `.agents/templates/verification-重.yaml` |
| ddd-gate | [`ddd-gate-重.yaml`](../../templates/ddd-gate-重.yaml) | `.agents/templates/ddd-gate-重.yaml` |

## 4. stage 六阶段 ↔ plan 映射

| stage | plan 对齐 | AC |
|-------|-----------|-----|
| **s1 调研** | wi-research | 问题陈述 + 约束 |
| **s2 规格** | wi-spec · m-spec | 追溯链 + ic-trace AC |
| **s3 设计审计** | m-spec · audit_gate: design | 设计审计 md pass · ddd-gate 重 |
| **s4 实现** | wi-impl | 脚本 + test |
| **s5 实现审计** | m-impl · audit_gate: implementation | 实现审计 pass |
| **s6 代码质量** | m-impl · code_quality | 代码质量审计 pass |

## 5. 三层本地审计（sandbox）

| 层 | 路径（sandbox 内） |
|----|-------------------|
| design | `.agents/audit/design-audit.md` |
| implementation | `.agents/audit/implementation-audit.md` |
| code_quality | `.agents/audit/code-quality-audit.md` |

## 6. Sandbox 初始化

```powershell
$Sandbox = "E:\ninjasin-labs\fuyao-dogfood-audit-trail"
$Fuyao   = "E:\ninjasin-labs\fuyao-nomad"

New-Item -ItemType Directory -Force -Path $Sandbox | Out-Null
Set-Location $Sandbox; git init

Set-Location $Fuyao
npm run pack:import -- --pack packs/minimal-research-to-spec --project $Sandbox

$tpl = Join-Path $Sandbox ".agents\templates"
New-Item -ItemType Directory -Force -Path $tpl | Out-Null
@("stage-重","commit-policy-重","dod-重","verification-重","ddd-gate-重") | ForEach-Object {
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

DoD 重档 checklist + 三层审计 pass，或明确废除。

**脱敏：** `<SANDBOX_ROOT>` · 无 API Key
