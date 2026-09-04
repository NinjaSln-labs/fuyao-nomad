# 发版清单（维护者）

> v0.26+ · 与 [release-preflight.mjs](../../../scripts/release-preflight.mjs) 配套。  
> **不**自动打 tag / 创建 GitHub Release。  
> 下文路径均为**占位**；本机绝对路径、SSH 私钥路径、工具链 Path **勿**写进本文件。

## 顺序（硬约束）

```
双审计 → preflight（含四项机械化防呆） → 包装 commit → tag → push → gh release create
```

禁止：先 Release 后补审计。

## cwd 防呆（已机械化）

`release:preflight` 第 0 步断言仓根 `package.json` name == `fuyao-nomad`（按脚本自身 ROOT 解析，从任意 Shell cwd 运行均安全）；Shell 停在源仓 / dogfood / adopt 时会直接 FAIL。手工命令（tag/push/gh）前仍建议：

```powershell
Set-Location <FUYAO_NOMAD_ROOT>
$name = (Get-Content package.json -Raw | ConvertFrom-Json).name
if ($name -ne 'fuyao-nomad') { throw "wrong cwd (package.name=$name) — refuse release" }
```

## 清单

### 0. 内容齐（含文档同步）

- [ ] 本版 U 单元已 commit（一单元一 commit）
- [ ] **版本号对齐**：`package.json` · CHANGELOG · README · README.en · ROADMAP · badge（本地 `HANDOFF.md` 可选同步，**不入库**）
- [ ] **导航同步**：若本版新增 examples / 脚本 / 测试数，更新 README「文档导航·目录·状态表」· [docs/product/README.md](../README.md) · 相关 playbook/matrix 链
- [ ] **测试计数**：README / README.en 的 `npm test` 项数与 `node --test` 实际 pass 数一致
- [ ] 清单与公开文档**已脱敏** —— `release:preflight` 第 2.5 步已机械化扫描（home/Users/mnt 绝对路径 · Windows 用户路径 · 私钥块 · `.ssh` 路径 · ghp_/sk- token 前缀）；扫出即 FAIL
- [ ] 源产品仓 / dogfood / adopt **未**误提交进本仓
- [ ] `.cursor/` 整树本地私有（plans / rules / agents 安装产物），**勿提交** —— 第 2.5 步断言未 tracked，漏提交即 FAIL
- [ ] 勿提交 `HANDOFF.md` / `.agents/audit/` / `.githooks/` / `.cursor/`（均本地私有；tracked 即 FAIL）
- [ ] `.git/filter-repo` 残留标记已清（`rm -rf .git/filter-repo`；存在即 FAIL —— 防新历史改写任务被误判为延续）

### 1. Preflight

```powershell
# 先做上方 cwd 防呆
# 确保 node / git / gh 在 PATH（本机工具链自备，勿把绝对 Path 写进仓库文档）
npm run release:preflight
# 发 Release 前建议：
npm run release:preflight -- --strict-gh
```

- [ ] `validate` 绿
- [ ] `npm test` 绿
- [ ] 第 0 / 2.5 步防呆绿（cwd 断言 · 私有未 tracked · 脱敏扫描 · filter-repo 标记）
- [ ] `GH_TOKEN` 可读（或 User 环境变量可加载）

加载 User token（Cursor agent 常需；User 级已配置时可省略）：

```powershell
if (-not $env:GH_TOKEN) {
  $env:GH_TOKEN = [Environment]::GetEnvironmentVariable('GH_TOKEN', 'User')
}
```

`hosts.yml` 若仍报 `default invalid`：**不影响** `gh release`（走 `GH_TOKEN` 通道即可）。本机凭据对齐脚本自备，**勿**把脚本绝对路径写进本清单。

### 2. 双审计（本地 · 不入库）

- [ ] `.agents/audit/YYYY-MM-DD-v0XX-release-audit.md` · **100/100** · `pass`
- [ ] `.agents/audit/YYYY-MM-DD-v0XX-code-quality-audit.md` · `pass` / `pass_with_notes`
- [ ] 可选：`npm run validate -- --path .agents/audit/*.audit.yaml`

公开契约：[docs/audit/README.md](../../audit/README.md)

### 3. 包装 commit

- [ ] `package.json` version bump
- [ ] CHANGELOG 节已写
- [ ] commit message：`release: vX.Y.Z — …`

### 4. Tag · Push · Release

```powershell
# 先做上方 cwd 防呆
git tag vX.Y.Z
# push：SSH 或 HTTPS 按本机 git remote 配置；私钥 / ssh -i 路径勿写入仓库文档
git push origin main
git push origin vX.Y.Z

if (-not $env:GH_TOKEN) {
  $env:GH_TOKEN = [Environment]::GetEnvironmentVariable('GH_TOKEN', 'User')
}
gh release create vX.Y.Z --repo NinjaSln-labs/fuyao-nomad --title "vX.Y.Z — …" --notes "…"
```

- [ ] Release 页可打开
- [ ] README badge 版本一致

## 不做

- `check:identity` / `check:traceability` 入 CI
- 自动 force-push / `--no-verify`
- 把 `.agents/audit/` 提交进 git
- 把本机绝对路径、SSH 私钥路径、个人凭据脚本路径写入本文件
