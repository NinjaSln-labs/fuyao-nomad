# 扶摇 Adopt 剧本（产品接手仓）

> 用官方包在**独立接手仓**对齐源产品域，跑通扶摇 ceremony；**不修改源仓**。  
> 对照 dogfood：[dogfood-playbook.md](./dogfood-playbook.md) · 矩阵：[adopt-matrix-comparison.md](./adopt-matrix-comparison.md)

## 谁该读

| 读者 | 收获 |
|------|------|
| 要把真实产品接进扶摇 | 知道三种仓怎么分、怎么对比 |
| 已跑过 dogfood | 知道 adopt 多了什么（源仓只读 · vs-source） |

## 三种仓（锁定）

| 类型 | 路径示例 | 改代码？ | GitHub |
|------|----------|----------|--------|
| **源仓** | `qingfu-envoy` | **否**（只读 PRD/ADR） | 照常 |
| **dogfood 仓** | `fuyao-dogfood-*` | 合成切片 | **不上** |
| **adopt 接手仓** | `fuyao-adopt-<产品>` | 在接手仓重写薄切片 | **不上** |

| | dogfood | adopt |
|--|---------|-------|
| 域 | 合成最小切片 | **对齐源 PRD / ADR 叙事** |
| 对比 | flow_weight 档位矩阵 | **源仓 vs adopt**（范围 · 阶段 · 身份 · 审计） |
| 公开入库 | scenario/close 脱敏 | + **adopt-vs-source-*.md** |

---

## 前置

- Node ≥20 · Git · 本机 [fuyao-nomad](https://github.com/NinjaSln-labs/fuyao-nomad)
- 源仓已 clone（只读打开即可）
- 接手仓路径：**勿**放在源仓子目录内

```powershell
$Fuyao  = "E:\ninjasin-labs\fuyao-nomad"
$Source = "E:\ninjasin-labs\<源产品>"          # 只读
$Adopt  = "E:\ninjasin-labs\fuyao-adopt-<产品>" # 新建
```

---

## 步骤总览（0–9）

| 步 | 动作 | 产物 |
|----|------|------|
| 0 | 接手仓 `git init`（无 remote） | 空仓 |
| 1 | `pack:import` minimal-research-to-spec | agents/packs · `.cursor/agents` |
| 2 | intent + identity（对齐源 ADR/品类词） | `.agents/plan-progress.yaml` |
| 2b | 复制 flow_weight 五模板 | `.agents/templates/` |
| 3 | research：源仓边界摘要（脱敏 · 引用路径） | `docs/research/` |
| 4 | spec：可执行薄切片 + identity AC | `docs/spec/` |
| 5 | 实现 + test（**仅**在 adopt 仓） | `src/` · `tests/` |
| 6 | 身份/追溯 strict · 三层审计（按档） | `.agents/audit/` |
| 7 | harness（沿用 pack triple） | validate 绿 |
| 8 | 关仓 + **vs-source 对比** | close · adopt-vs-source |
| 9 | 脱敏笔记入库 fuyao-nomad | examples/ |

---

## 步骤详解

### 步 0 · 接手仓

```powershell
New-Item -ItemType Directory -Force -Path $Adopt | Out-Null
Set-Location $Adopt
git init
# 确认无 origin
```

### 步 1–2 · 包与计划

```powershell
Set-Location $Fuyao
npm run pack:import -- --pack packs/minimal-research-to-spec --project $Adopt
```

`plan-progress.yaml` 要点：

- `intent`：与源仓一句话目标对齐（可裁到薄切片）
- `identity_constraints`：映射源 ADR / 硬约束（如 No Silent Pay → `ic-no-silent-pay`）
- `flow_weight`：按产品体量选档（全流程 / 中 / 轻中…）
- 注明：`source_repo: <只读路径或公开 URL>`（文档字段，勿嵌密钥）

### 步 3 · 调研（只读源仓）

- 引用源仓 `README` / `docs/product/` / ADR **路径**，**勿复制**大段规格进 adopt（防双源）
- 写清：**在 adopt 内交付什么 / 明确不交付什么**（相对源仓 S1–Sn）

### 步 4–6 · 规格 · 实现 · 门禁

同 [dogfood-playbook](./dogfood-playbook.md) 步 3–6；重档/全流程须：

```powershell
Set-Location $Adopt
npm test
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
node "$Fuyao\scripts\check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
```

### 步 8 · vs-source 对比（adopt 必做）

在关仓笔记旁写 `adopt-vs-source-<产品>.md`（脱敏后入 fuyao-nomad）：

| 维度 | 源仓 | adopt 接手仓 |
|------|------|--------------|
| 范围 | … | 薄切片边界 |
| 阶段 | 产品 stage-spec | 扶摇 s1–sN |
| 身份 | ADR / 品类词 | `identity_constraints` |
| 审计 | 产品审计链 | `.agents/audit/` |
| Git | 公开/私有 | 本地 only |

### 步 9 · 入库 fuyao-nomad

| 文件 | 说明 |
|------|------|
| `docs/product/examples/adopt-<产品>-scenario.md` | 场景 |
| `docs/product/examples/adopt-<产品>-close.md` | 关仓 |
| `docs/product/examples/adopt-vs-source-<产品>.md` | 对比 |
| `adopt-matrix-comparison.md` | 填一行 |

---

## 已规划范例（路线图）

| 版本 | 源仓 | 接手仓 | 状态 |
|------|------|--------|------|
| v0.28 | qingfu-envoy | `fuyao-adopt-qingfu-envoy` | 计划 |
| v0.29 | shisui | `fuyao-adopt-shisui` | 计划 |

详版：[v0.26–v0.29 计划](../../../.cursor/plans/v0.26-v0.29_steady_adopt_roadmap.plan.md)

---

## 停止条件

- DoD + identity（及档位要求的审计）pass，或明确废除  
- **vs-source 已写**  
- 源仓 `git status` 仍干净（无本会话改动）

## 不做

- 在源仓写 `.agents/` / 业务 dogfood  
- 把 adopt 仓 push 到 GitHub（默认）  
- fork 源仓再「边改边接扶摇」
