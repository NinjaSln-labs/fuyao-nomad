# Dogfood III 场景 · todo-strip（备忘整理）

> v0.20 · 本地 sandbox 验证 **flow_weight=轻** 五模板绑定。  
> 中档范例：[dogfood-ii-scenario.md](./dogfood-ii-scenario.md) · 剧本：[dogfood-playbook.md](./dogfood-playbook.md)

## 1. 场景摘要

| 项 | 值 |
|----|-----|
| **代号** | todo-strip |
| **Intent** | 从用户粘贴的杂乱备忘提取最多 3 条可执行 todo（Markdown 列表） |
| **flow_weight** | **轻** |
| **最小交付** | Node 脚本：`stdin`/文件 → `todos.md`；`npm test` |
| **Sandbox** | `<SANDBOX_ROOT>`（**本地 git，不上 GitHub**） |

轻档与中档差异：**两阶段** stage（探索 → 交付）、DoD 中 `identity_constraints_held` 为 **required: false**（若声明约束仍须满足）。

## 2. identity_constraints

| id | phrase | meaning | enforcement |
|----|--------|---------|-------------|
| `ic-subset` | 不臆造任务 | 每条 todo 须来自输入原文（子串或行拆分）；禁止添加输入中不存在的任务 | `blocker_if_unmet` |

轻档 DoD 不强制 identity checklist，但 dogfood 仍写入 plan 并跑 `check:identity --strict` 验证证据链。

## 3. flow_weight=轻 · 五模板对照

来源 tag：**v0.19.0**。

| 族 | 主仓路径 | Sandbox |
|----|----------|---------|
| stage | [`stage-轻.yaml`](../../templates/stage-轻.yaml) | `.agents/templates/stage-轻.yaml` |
| commit-policy | [`commit-policy-轻.yaml`](../../templates/commit-policy-轻.yaml) | `.agents/templates/commit-policy-轻.yaml` |
| DoD | [`dod-轻.yaml`](../../templates/dod-轻.yaml) | `.agents/templates/dod-轻.yaml` |
| verification | [`verification-轻.yaml`](../../templates/verification-轻.yaml) | `.agents/templates/verification-轻.yaml` |
| ddd-gate | [`ddd-gate-轻.yaml`](../../templates/ddd-gate-轻.yaml) | `.agents/templates/ddd-gate-轻.yaml` |

## 4. stage 两阶段 ↔ plan 映射

| stage（stage-轻） | 建议 plan 对齐 | 本场景 AC |
|-------------------|----------------|-----------|
| **s1 探索** | `wi-main` 前半 · 问题陈述 | 备忘→todo 需求一句；范围边界 |
| **s2 交付** | `wi-main` 完成 · 关仓 | `todo.js` + test；ic-subset 绿 |

中档四阶段（s3/s4）在轻档 **合并进 s2**；关仓笔记注明即可。

## 5. 停止条件

- 最小交付 + DoD 轻档 checklist，或  
- 明确废除并记录原因  

## 6. Sandbox 初始化

```powershell
$Sandbox = "E:\ninjasin-labs\fuyao-dogfood-todo-strip"
$Fuyao   = "E:\ninjasin-labs\fuyao-nomad"

New-Item -ItemType Directory -Force -Path $Sandbox | Out-Null
Set-Location $Sandbox; git init   # 无 remote · 不上 GitHub

Set-Location $Fuyao
npm run pack:import -- --pack packs/minimal-research-to-spec --project $Sandbox

$tpl = Join-Path $Sandbox ".agents\templates"
New-Item -ItemType Directory -Force -Path $tpl | Out-Null
Copy-Item "$Fuyao\docs\templates\stage-轻.yaml",
          "$Fuyao\docs\templates\commit-policy-轻.yaml",
          "$Fuyao\docs\templates\dod-轻.yaml",
          "$Fuyao\docs\templates\verification-轻.yaml",
          "$Fuyao\docs\templates\ddd-gate-轻.yaml" $tpl
```

### 验证

```powershell
Set-Location $Sandbox
npm test
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
```

**脱敏：** 公开文档用 `<SANDBOX_ROOT>`；勿写 API Key。
