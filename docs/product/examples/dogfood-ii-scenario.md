# Dogfood II 场景 · reading-card（读书笔记卡片）

> v0.19 · 在独立 sandbox 端到端验证 v0.18 **flow_weight=中** 五模板绑定。  
> 剧本：[dogfood-playbook.md](./dogfood-playbook.md) · 关仓笔记（实跑后）：[dogfood-ii-close.md](./dogfood-ii-close.md)

## 1. 场景摘要

| 项 | 值 |
|----|-----|
| **代号** | reading-card |
| **Intent** | 从用户粘贴的书摘生成结构化读书笔记卡片（Markdown） |
| **flow_weight** | **中** |
| **最小交付** | Node 脚本：`stdin`/文件 → 结构化 `card.md`；含 `npm test` |
| **Sandbox** | `<SANDBOX_ROOT>`（独立 git 仓，**勿**并入 fuyao-nomad） |

本场景与天气 dogfood 不同域：验证 **stage / commit-policy 矩阵** 的可操作性，而非复刻天气业务。

## 2. identity_constraints

| id | phrase | meaning | enforcement |
|----|--------|---------|-------------|
| `ic-source` | 可追溯书摘 | 每条要点必须可追溯到用户输入摘录；禁止编造未给出的事实 | `blocker_if_unmet` |

写入 `.agents/plan-progress.yaml` 的 `identity_constraints`；实现未满足时须 `progress.blockers`（含 `related_identity_constraint_ids: [ic-source]`），**不得**标 `m-impl` done。

## 3. flow_weight=中 · 五模板对照

来源 tag：**v0.18.0**（扶摇主仓 `docs/templates/`）。

| 族 | 主仓路径 | Sandbox 建议 |
|----|----------|--------------|
| stage | [`stage-中.yaml`](../../templates/stage-中.yaml) | `.agents/templates/stage-中.yaml` |
| commit-policy | [`commit-policy-中.yaml`](../../templates/commit-policy-中.yaml) | `.agents/templates/commit-policy-中.yaml` |
| DoD | [`dod-中.yaml`](../../templates/dod-中.yaml) | `.agents/templates/dod-中.yaml` |
| verification | [`verification-中.yaml`](../../templates/verification-中.yaml) | `.agents/templates/verification-中.yaml` |
| ddd-gate | [`ddd-gate-中.yaml`](../../templates/ddd-gate-中.yaml) | `.agents/templates/ddd-gate-中.yaml` |

矩阵索引：[templates README](../../templates/README.md)。

## 4. stage 四阶段 ↔ plan milestone 映射

| stage（stage-中） | 建议 plan 对齐 | 本场景 AC |
|-------------------|----------------|-----------|
| **s1 调研** | `wi-research` · 问题陈述 | 书摘→卡片需求摘要；快照不升格 scope |
| **s2 规格** | `wi-spec` · `m-spec` | card 字段、ic-source 验收方式写入 spec |
| **s3 实现** | `wi-impl` · `m-impl`（未完成前） | `card.js` + test；未满足 ic-source → blocker |
| **s4 审计门** | `m-impl` · `audit_gate: implementation` | `check:identity --strict` + 证据路径 |

在 plan 的 `handoff_snippet` 或 milestone 备注中注明当前 stage id（`s1`–`s4`），便于关仓自检。

## 5. 停止条件

沿用 [dogfood-playbook](./dogfood-playbook.md)：

- DoD：`identity_constraints_held` +（若曾阻塞）`blocker_evidence_recorded`，或  
- **明确废除**并写入 plan / 关仓笔记原因  

## 6. Sandbox 初始化

```powershell
# 变量：替换为你的独立仓路径（示例 E 盘）
$Sandbox = "E:\ninjasin-labs\fuyao-dogfood-reading-card"
$Fuyao   = "E:\ninjasin-labs\fuyao-nomad"

New-Item -ItemType Directory -Force -Path $Sandbox | Out-Null
Set-Location $Sandbox
git init

# 1 · pack:import
Set-Location $Fuyao
npm run pack:import -- --pack packs/minimal-research-to-spec --project $Sandbox

# 2 · 复制中档五模板 + README
$tpl = Join-Path $Sandbox ".agents\templates"
New-Item -ItemType Directory -Force -Path $tpl | Out-Null
Copy-Item "$Fuyao\docs\templates\stage-中.yaml"        $tpl
Copy-Item "$Fuyao\docs\templates\commit-policy-中.yaml" $tpl
Copy-Item "$Fuyao\docs\templates\dod-中.yaml"          $tpl
Copy-Item "$Fuyao\docs\templates\verification-中.yaml" $tpl
Copy-Item "$Fuyao\docs\templates\ddd-gate-中.yaml"     $tpl
@"
# 模板副本 · 来源 fuyao-nomad @ v0.18.0
flow_weight: 中
copied_from: docs/templates/
"@ | Set-Content (Join-Path $tpl "README.md") -Encoding utf8

# 3 · 回到 sandbox 写 plan-progress、research、spec、实现（见 playbook 步 2–6）
Set-Location $Sandbox
```

### 验证命令（关仓笔记须记录输出摘要）

```powershell
Set-Location $Sandbox
npm test
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
```

**脱敏：** 公开文档用 `<SANDBOX_ROOT>` 占位；勿提交 API Key、私仓 URL、proxy 配置。
