# 发版清单（维护者）

> v0.26+ · 与 [release-preflight.mjs](../../../scripts/release-preflight.mjs) 配套。  
> **不**自动打 tag / 创建 GitHub Release。

## 顺序（硬约束）

```
双审计 → 包装 commit → tag → push → gh release create
```

禁止：先 Release 后补审计。

## 清单

### 0. 内容齐

- [ ] 本版 U 单元已 commit（一单元一 commit）
- [ ] CHANGELOG · README · ROADMAP · HANDOFF 已对齐版本号
- [ ] 源产品仓 / dogfood / adopt **未**误提交进本仓

### 1. Preflight

```powershell
$env:Path = 'E:\devtools\nodejs;E:\devtools\Git\cmd;E:\devtools\gh\bin;' + $env:Path
Set-Location E:\ninjasin-labs\fuyao-nomad
npm run release:preflight
# 发 Release 前建议：
npm run release:preflight -- --strict-gh
```

- [ ] `validate` 绿
- [ ] `npm test` 绿
- [ ] `GH_TOKEN` 可读（或 User 环境变量可加载）

加载 User token（Cursor agent 常需）：

```powershell
if (-not $env:GH_TOKEN) {
  $env:GH_TOKEN = [Environment]::GetEnvironmentVariable('GH_TOKEN', 'User')
}
```

`hosts.yml` 若仍报 `default invalid`：**不影响** `gh release`（走 `GH_TOKEN` 通道即可）。凭据对齐见 `E:\setup-gh-token.ps1`。

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
git tag vX.Y.Z
# SSH push（本机惯例）
$env:GIT_SSH_COMMAND = 'ssh -F E:/ninjasin-labs/fuyao-nomad/.scratch/ssh-empty.config -i C:/Users/52115/.ssh/id_ed25519 -o IdentitiesOnly=yes -o BatchMode=yes'
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
