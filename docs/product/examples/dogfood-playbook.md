# Dogfood 剧本（官方 · 完整版）

> 用官方包从一句话推进到可演示交付（或明确废除），并留下可审计痕迹。  
> 机制：[identity-constraints.md](../../design/identity-constraints.md) · 包迁徙：[pack-import-export.md](../../design/pack-import-export.md)

## 谁该读 · 读完能做什么

| 读者 | 收获 |
|------|------|
| 第一次用扶摇做 side project | 知道 **0→8 顺序**、写什么文件、何时停 |
| 已有一套 Cursor agents | 知道如何 **加第二 harness（CLI）** 而不改 roster |
| 要对齐 flow_weight 模板 | 知道如何选档、复制模板、写关仓自检 |

**三条路径（选一）：**

| 路径 | 步骤 | 适用 |
|------|------|------|
| **A · 最小** | 0 → 1 → 2 → 4 → 6 → 8 | 快速验证身份链 |
| **B · 标准** | 0–8 全开 | 官方推荐；含步 7 双 harness |
| **C · 带模板矩阵** | B + 2b/6b/6c | 验证 stage/commit（见 [矩阵对照](./dogfood-matrix-comparison.md)） |

---

## 前置

- Node ≥20 · Git  
- 本机可访问 [fuyao-nomad](https://github.com/NinjaSln-labs/fuyao-nomad)（`npm install` / `pack:import`）  
- **Sandbox 仅本地**（`git init` 无 remote）；**勿推 GitHub** · 勿提交密钥  

```powershell
$Fuyao = "E:\ninjasin-labs\fuyao-nomad"   # 按本机调整
$env:Path = "E:\devtools\nodejs;E:\devtools\Git\cmd;" + $env:Path
```

---

## 步骤总览（0–8）

| 步 | 动作 | 产物 |
|----|------|------|
| 0 | 独立空仓 `git init` | 空仓 |
| 1 | `pack:import` minimal-research-to-spec | `agents/packs/…` · `.cursor/agents` |
| 2 | 写 `intent` + `identity_constraints` | `.agents/plan-progress.yaml` |
| 3 | research → spec | 研究/规格笔记 |
| 4 | 实现最小交付 | 代码/脚本 + test |
| 5 | 身份 blocker 取证 → cleared | `.agents/audit/…` |
| 6 | `check:identity --strict`（可选 `check:traceability --strict`） | 终端绿灯 |
| 7 | 确认/添加 **第二 harness**（CLI） | 包内 `harness/cli/` · validate 绿 |
| 8 | 关仓笔记 · `progress.status: closed` | close / step7-close md |

---

## 步骤详解

### 步 0 · 空仓

```powershell
$Sandbox = "E:\ninjasin-labs\fuyao-dogfood-<你的场景>"
New-Item -ItemType Directory -Force -Path $Sandbox | Out-Null
Set-Location $Sandbox
git init
```

### 步 1 · 安装团队包

```powershell
Set-Location $Fuyao
npm run pack:import -- --pack packs/minimal-research-to-spec --project $Sandbox
```

| 安装结果 | 路径 |
|----------|------|
| 团队包（roster · 模板 · skills · **cursor + cli harness**） | `$Sandbox/agents/packs/minimal-research-to-spec/` |
| Cursor subagents（**仅此 harness 自动安装**） | `$Sandbox/.cursor/agents/` |

### 步 2 · 计划与身份

创建 `$Sandbox/.agents/plan-progress.yaml`：

- `intent`：一句话目标  
- `identity_constraints`：品类/形态词硬约束（见 [identity-constraints.md](../../design/identity-constraints.md)）  
- `flow_weight`：选档（轻/中/重…）  

**2b（可选）· 模板对齐：** 复制 `docs/templates/*-<档>.yaml` 五文件到 `.agents/templates/`；plan 注明 stage id。

范例：[dogfood-ii-scenario.md](./dogfood-ii-scenario.md)（中）· [iii](./dogfood-iii-scenario.md)（轻）· [iv](./dogfood-iv-scenario.md)（重）

### 步 3–4 · 调研 · 规格 · 实现

- 步 3：research/spec 文档；`gate_level=confirm` 时对照 **intent 原文**  
- 步 4：最小可验证交付（如 Node 脚本 + `npm test`）  
- **身份未满足** → `progress.blockers` + `related_identity_constraint_ids`，**不要**标 milestone done  

### 步 5 · 取证

清除 identity blocker 时 **必须** `evidence`（路径到审计 md 或 `{ path, note }`）。

### 步 6 · 校验

```powershell
Set-Location $Sandbox
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
# 重档建议加：
node "$Fuyao\scripts\check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
```

**6b · stage 自检** · **6c · commit-policy 回顾** → 写入关仓笔记。

### 步 7 · 第二 harness（CLI · 必做于路径 B）

> 详细清单：[dogfood-step7-scenario.md](./dogfood-step7-scenario.md) · 关仓：[dogfood-step7-close.md](./dogfood-step7-close.md)

**原则：** 只改 `harness_adapters` + mapping 文件；**不改** `roster.yaml`。

### 步 7 · 多 harness（cursor + cli + openhands · v0.23+）

> [dogfood-step7-scenario.md](./dogfood-step7-scenario.md) · [close](./dogfood-step7-close.md)

官方包 **1.2.0** 内置 **triple**；仅 **cursor** 在 import 时写入 `.cursor/agents/`。

```yaml
harness_adapters:
  cursor: { mapping: harness/cursor/mapping.yaml, agents_dir: harness/cursor/agents }
  cli: { mapping: harness/cli/mapping.yaml, runners_dir: harness/cli/runners }
  openhands: { mapping: harness/openhands/mapping.yaml, agents_dir: harness/openhands/agents }
```

`npm run pack -- validate packs/minimal-research-to-spec` → 三项 mapping + fragments 均绿。

**自行 fork 第四 runtime：** `pack:export` → 增映射 → validate（roster 仍不改）。

### 步 8 · 关闭

- 短复盘 md（脱敏，`<SANDBOX_ROOT>`）  
- `progress.status: closed`（或项目约定字段）  

---

## flow_weight 与模板

| flow_weight | stage 阶段数 | 范例 | 模板复制 |
|-------------|-------------|------|----------|
| 轻 | s1–s2 | [todo-strip](./dogfood-iii-scenario.md) | `stage-轻` … |
| **轻中** | **s1–s3** | [action-list](./dogfood-v-scenario.md) | `stage-轻中` … |
| 中 | s1–s4 | [reading-card](./dogfood-ii-scenario.md) | `stage-中` … |
| 重 | s1–s6 | [audit-trail](./dogfood-iv-scenario.md) | `stage-重` … |

矩阵对照：[dogfood-matrix-comparison.md](./dogfood-matrix-comparison.md)

---

## 命令速查

| 目的 | 命令 |
|------|------|
| 安装包 | `npm run pack:import -- --pack packs/minimal-research-to-spec --project <仓>` |
| 校验包 | `npm run pack -- validate <pack-dir>` |
| 身份 | `npm run check:identity -- --project <仓> --strict` |
| 追溯 | `npm run check:traceability -- --project <仓> --strict` |
| 争用（可选） | `npm run check:contention -- --project <仓>` |

---

## 已跑通范例

| 版本 | 主题 | 文档 |
|------|------|------|
| v0.23 | **轻中** action-list | [v-scenario](./dogfood-v-scenario.md) · [close](./dogfood-v-close.md) |
| v0.22 | 步 7 triple harness | [step7-scenario](./dogfood-step7-scenario.md) · [close](./dogfood-step7-close.md) |
| v0.21 | 重档 audit-trail | [iv-scenario](./dogfood-iv-scenario.md) · [close](./dogfood-iv-close.md) |
| v0.20 | 轻档 todo-strip | [iii-scenario](./dogfood-iii-scenario.md) · [close](./dogfood-iii-close.md) |
| v0.19 | 中档 reading-card | [ii-scenario](./dogfood-ii-scenario.md) · [close](./dogfood-ii-close.md) |

Sandbox **仅本地**；脱敏范例入库 fuyao-nomad。

---

## 停止条件

- DoD：`identity_constraints_held` +（若曾阻塞）`blocker_evidence_recorded`，或  
- **明确废除**并记录原因  

## 不做

- 框架侧调 LLM / 自动抽身份词  
- `check:identity` 入 CI（本地 / dogfood 用 `--strict`）  
- 在 sandbox 推 GitHub  
