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

**推荐（v0.38+）：`fuyao:init` 按 roster 生成骨架**（schema 校验后落盘——机械化杜绝复制旧场景副本的残留噪音）：

```powershell
Set-Location $Fuyao
npm run fuyao:init -- --project $Sandbox --pack minimal-research-to-spec --intent "<本场景一句话目标>"
```

生成后手工补 `identity_constraints`（人的判断，见 [identity-constraints.md](../../design/identity-constraints.md)）。

**红线：勿复制上一 dogfood 场景的 plan-progress 改造**——副本携带旧场景 work_items/handoff 残留，
审计必携（v0.34 cursor · v0.35 qoder 两轮 gate-confirm 实踩，N2 清偿入模板）。

手工编写（init 前时代路径，仍可用）：

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
| **中重** | **s1–s5** | [changelog-slice](./dogfood-vi-scenario.md) | `stage-中重` … |
| 中 | s1–s4 | [reading-card](./dogfood-ii-scenario.md) | `stage-中` … |
| 重 | s1–s6 | [audit-trail](./dogfood-iv-scenario.md) | `stage-重` … |
| **全流程** | **s1–s7** | [grant-gate](./dogfood-vii-scenario.md) | `stage-全流程` … |

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

## harness 挂载场景模板（N2/N7 清偿 · 2026-09-06）

五家挂载 dogfood 的**场景文档骨架**——新场景从此模板起步，勿从上一场景文档/plan-progress
复制改造（cursor/qoder 两轮副本残留教训；plan-progress 一律 `fuyao:init` 生成，见步 2）。

### 场景文档六节骨架（占位符以 `{}` 标注）

```markdown
# Dogfood · {harness} harness 挂载实跑场景

> {版本} · [关仓笔记](./dogfood-{场景名}-close.md)  
> Sandbox：`fuyao-dogfood-{场景名}`（本地 only · 不上 GitHub）

## 1. 目的

在 {harness} 下挂载并实跑 {pack_id}——**验证什么机制**（与已挂载家差异轴一句话）。

## 2. 挂载操作

pack 拷入（与已挂载家同源，pack 零改动）· 槽位片段落位 `{harness 目录}` ·
plan-progress `fuyao:init` 生成（intent 本场景）。

## 3. 链执行

| 步 | 槽位 | 委派形态 | 产物 |
|----|------|---------|------|
| s1 | research | … | … |
| 门 | —（操作者） | confirm 门人核 | … |

## 4. 五维翻译实测（{harness} MAPPING）

逐维 ✅/◐/❌ 结果；降级裁决引用（S 编号）。

## 5. 校验

validate / identity strict / traceability strict 三绿 · message schema 过验 · auditor 独立 verdict。

## 6. 偏差与关仓

沙盒偏差如实记录（模型不替你圆场）；关仓产物清单。
```

### R16 分段委派模板（1 输入/段 + 骨架填空 + **纪律尾注**）

- 每段：**1 个输入文件**（落点或片段，勿 ≥2 并读）+ **填空骨架产物**（占位符清单，模型只填不构）。
- **纪律节放任务尾注，不进骨架**（N7）：骨架里只放产物章节；委派纪律（1 输入/段、
  写落点、不动源仓等）以「尾注」附在委派指令末尾——骨架含纪律节时段产物会照抄混入
  （v0.37 adopt-shuijing research 快照/audit 两轮实踩，均需操作者手工清）。

```text
# 委派指令形态（示意）
读 <1 个输入文件>，产出 <落点路径>，骨架如下：
{产物章节骨架——仅产物节}
—— 尾注（不进产物）：仅写落点 · 勿改源仓 · 未覆盖的占位符如实标 TODO
```

---

## 已跑通范例

| 版本 | 主题 | 文档 |
|------|------|------|
| v0.36 | **langgraph runtime smoke** | [场景](./dogfood-langgraph-harness-scenario.md) · [close](./dogfood-langgraph-harness-close.md) |
| v0.35 | qoder + claude 挂载级（五家全数） | [qoder](./dogfood-qoder-harness-scenario.md) · [claude](./dogfood-claude-harness-scenario.md) |
| v0.27 | **全流程 s7** boundary-s7 | [viii-scenario](./dogfood-viii-scenario.md) · [close](./dogfood-viii-close.md) |
| v0.25 | **全流程** grant-gate | [vii-scenario](./dogfood-vii-scenario.md) · [close](./dogfood-vii-close.md) |
| v0.24 | **中重** changelog-slice | [vi-scenario](./dogfood-vi-scenario.md) · [close](./dogfood-vi-close.md) |
| v0.23 | **轻中** action-list | [v-scenario](./dogfood-v-scenario.md) · [close](./dogfood-v-close.md) |
| v0.22 | 步 7 triple harness | [step7-scenario](./dogfood-step7-scenario.md) · [close](./dogfood-step7-close.md) |
| v0.21 | 重档 audit-trail | [iv-scenario](./dogfood-iv-scenario.md) · [close](./dogfood-iv-close.md) |
| v0.20 | 轻档 todo-strip | [iii-scenario](./dogfood-iii-scenario.md) · [close](./dogfood-iii-close.md) |
| v0.19 | 中档 reading-card | [ii-scenario](./dogfood-ii-scenario.md) · [close](./dogfood-ii-close.md) |

Sandbox **仅本地**；脱敏范例入库 fuyao-nomad。

**产品接手（adopt）：** [fuyao-adopt-playbook.md](./fuyao-adopt-playbook.md) · [adopt-matrix](./adopt-matrix-comparison.md) · [发版清单](./release-checklist.md)

---

## 停止条件

- DoD：`identity_constraints_held` +（若曾阻塞）`blocker_evidence_recorded`，或  
- **明确废除**并记录原因  

## 不做

- 框架侧调 LLM / 自动抽身份词  
- `check:identity` 入 CI（本地 / dogfood 用 `--strict`）  
- 在 sandbox 推 GitHub  
