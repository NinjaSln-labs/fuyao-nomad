# Adopt 场景 · qingfu-envoy（产品接手）

> v0.28 · **flow_weight=全流程** · 独立接手仓 · **源仓只读**  
> Playbook：[fuyao-adopt-playbook.md](./fuyao-adopt-playbook.md)

## 1. 场景

| 项 | 值 |
|----|-----|
| **代号** | adopt-qingfu |
| **源仓** | `qingfu-envoy`（只读 · ADR 001） |
| **接手仓** | `fuyao-adopt-qingfu-envoy` · 本地 · 不上 GitHub |
| **Intent** | Agent 提议 → 主理人批准 → Mock 执行（禁止静默自付） |
| **identity** | `ic-no-silent-pay` — 映射 ADR 001 |
| **flow_weight** | **全流程** |

## 2. 源仓引用（勿复制大段）

| 主题 | 源路径 |
|------|--------|
| 禁止静默自付 | `docs/decisions/001-no-license-no-silent-pay.md` |
| 产品叙事 | `README.md` |

## 3. 本仓交付 / 不交付

| 在 scope | 不在 scope |
|----------|------------|
| propose/approve/execute Mock CLI | MCP / Web / 支付宝真实轨 |
| 三层审计 + m-release 授权门 | 源仓 monorepo 改造 |

## 4. 初始化

```powershell
$Adopt = "E:\ninjasin-labs\fuyao-adopt-qingfu-envoy"
$Fuyao = "E:\ninjasin-labs\fuyao-nomad"
# git init · pack:import · 复制全流程五模板
```

## 5. 验证

```powershell
Set-Location $Adopt
npm test
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
node "$Fuyao\scripts\check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
# 确认源仓本会话无新改动（既有 dirty 不属本会话）
```

## 6. 关仓产物

- [adopt-qingfu-close.md](./adopt-qingfu-close.md)
- [adopt-vs-source-qingfu.md](./adopt-vs-source-qingfu.md)
