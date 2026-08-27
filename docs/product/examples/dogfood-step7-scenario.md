# Dogfood 步 7 · 多 harness 映射（CLI · OpenHands）

> v0.22 CLI 双 harness · **v0.23+ 官方包内置 triple**（cursor + cli + openhands）

## 1. 目标

在 **不改 roster** 的前提下，为已安装的团队包声明 **第二 harness**（本范例为 **CLI**），使同一 spec 可换 runtime 映射。

| 项 | 值 |
|----|-----|
| **代号** | dual-harness-cli |
| **Harness 1** | cursor（import 时安装 `.cursor/agents/`） |
| **Harness 2** | cli（仅包内 `harness/cli/`，**无**安装脚本） |
| **Sandbox** | `<SANDBOX_ROOT>` · 本地 · 不上 GitHub |

## 2. 前置

- 已完成 playbook **步 0–1**（空仓 + `pack:import`）
- 官方包 **v0.23+**（`pack_revision` **1.2.0**）内置 **cursor + cli + openhands**

## 3. 步 7 动作清单

| # | 动作 | 验收 |
|---|------|------|
| 1 | 确认 `pack.yaml` 含 `harness_adapters.cli` | mapping + runners_dir 路径存在 |
| 2 | 确认 `harness/cli/mapping.yaml` 覆盖 roster 全部 `slots[].id` | 与 cursor mapping 同构 |
| 3 | 确认 `harness/cli/runners/*.md` 与 mapping 值一致 | 每 runner 有片段 |
| 4 | `npm run pack -- validate agents/packs/minimal-research-to-spec`（在 fuyao 或 sandbox 内指向 pack 路径） | exit 0 |
| 5 | **不改** `roster.yaml` | id / slots 不变 |

## 4. pack.yaml 片段（范例）

```yaml
harness_adapters:
  cursor:
    mapping: harness/cursor/mapping.yaml
    agents_dir: harness/cursor/agents
  cli:
    mapping: harness/cli/mapping.yaml
    runners_dir: harness/cli/runners
```

## 5. 与步 8 的关系

步 7 完成后写关仓笔记 [dogfood-step7-close.md](./dogfood-step7-close.md)，注明：

- cursor 已安装 · cli 仅文档级
- `pack validate` 输出摘要
- **N/A**：OpenHands 第三映射（留按需 fork）

  openhands:
    mapping: harness/openhands/mapping.yaml
    agents_dir: harness/openhands/agents
```

**v0.23+ 验证 triple：**

```powershell
npm run pack -- validate packs/minimal-research-to-spec
# 期望：✓ cursor · ✓ cli · ✓ openhands（均无 install 脚本，除 cursor）
```

## 6. Sandbox 一键验证

```powershell
$Sandbox = "E:\ninjasin-labs\fuyao-dogfood-dual-harness"
$Fuyao   = "E:\ninjasin-labs\fuyao-nomad"
New-Item -ItemType Directory -Force -Path $Sandbox | Out-Null
Set-Location $Sandbox; git init
Set-Location $Fuyao
npm run pack:import -- --pack packs/minimal-research-to-spec --project $Sandbox
npm run pack -- validate (Join-Path $Sandbox "agents\packs\minimal-research-to-spec")
Test-Path (Join-Path $Sandbox "agents\packs\minimal-research-to-spec\harness\cli\mapping.yaml")
```

## 7. 常见误区

| 误区 | 正确 |
|------|------|
| 把 skills 拷进 harness | skills 留在包内 `skills/`，harness 无关 |
| 期望 `pack:import` 安装 CLI runner | 仅 Cursor 有 install；CLI 由用户编排器读片段 |
| 改 roster 换 harness | 只改 `harness_adapters` + mapping |
