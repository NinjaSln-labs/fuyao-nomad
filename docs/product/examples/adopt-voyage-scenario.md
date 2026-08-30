# Adopt 场景 · Voyage（产品接手）

> v0.30 候选 · **flow_weight=中** · 独立接手仓 · **源仓只读**  
> Playbook：[fuyao-adopt-playbook.md](./fuyao-adopt-playbook.md) · 前例：[adopt-shisui-scenario.md](./adopt-shisui-scenario.md)

## 1. 场景

| 项 | 值 |
|----|-----|
| **代号** | adopt-voyage |
| **源仓** | `Voyage`（只读 · `docs/DoD 门禁.md`） |
| **接手仓** | `fuyao-adopt-voyage` · 本地 · 不上 GitHub |
| **Intent** | 运维执行薄切片 — 高危意图必须经双人批准（Grant）后方可执行；无批准一律 fail-closed |
| **identity** | `ic-zero-trust-approval` — 映射源仓零信任审批（审批审计 + fail-closed 影子门禁） |
| **flow_weight** | **中** |

## 2. 源仓引用（勿复制大段）

| 主题 | 源路径 |
|------|--------|
| 产品域 / 能力矩阵 / 规则 | `docs/产品说明书-终版.md` |
| DoD 门禁 | `docs/DoD 门禁.md` |
| 指标口径 / 反指标 | `docs/指标口径.md` |
| 评测门禁 / 三集制 | `docs/AI评测策略.md` |
| 对抗边界 | `AI红蓝对抗报告.md` |
| 适配器契约 | `impl/m6/ADAPTER-CONTRACTS.md` |
| 产品叙事 | `README.md` |

## 3. 本仓交付 / 不交付

| 在 scope | 不在 scope |
|----------|------------|
| Mock 审批门 + Grant 记录 + fail-closed 执行判定 | 真实执行链（SSH / exec-adapter）· 模型适配器 · 认证（mTLS/WebAuthn/JWT） |
| 设计/实现审计 + identity evidence | 评测三集制 · CRL 镜像 · 源仓改造 |

## 4. 初始化

```bash
Adopt="$HOME/ninjasin-labs/fuyao-adopt-voyage"
Fuyao="$HOME/ninjasin-labs/fuyao-nomad"
# git init · pack:import · 复制 中 档五模板
```

## 5. 验证

```bash
cd "$Adopt"
npm test
node "$Fuyao/scripts/check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
node "$Fuyao/scripts/check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
# 源仓零写入（工作区 clean 断言）
```

## 6. 关仓产物（关仓后回填）

- `adopt-voyage-close.md`（复盘 · 脱敏）
- `adopt-vs-source-voyage.md`（源仓 vs adopt 对比）
