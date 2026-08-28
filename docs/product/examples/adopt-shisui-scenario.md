# Adopt 场景 · shisui（产品接手）

> v0.29 · **flow_weight=中** · 独立接手仓 · **源仓只读**  
> Playbook：[fuyao-adopt-playbook.md](./fuyao-adopt-playbook.md)

## 1. 场景

| 项 | 值 |
|----|-----|
| **代号** | adopt-shisui |
| **源仓** | `shisui`（只读 · `docs/spec/entry-gates.md`） |
| **接手仓** | `fuyao-adopt-shisui` · 本地 · 不上 GitHub |
| **Intent** | 机会卡草稿 → 挂证据信号 → 硬门评估；无证据不得推荐「可行动」 |
| **identity** | `ic-evidence-gate` — 映射源仓 G1 证据可检 |
| **flow_weight** | **中** |

## 2. 源仓引用（勿复制大段）

| 主题 | 源路径 |
|------|--------|
| 通用硬门 G1–G5 | `docs/spec/entry-gates.md` |
| 机会卡 Schema | `docs/spec/opportunity-card.md` |
| 产品叙事 | `README.md` |

## 3. 本仓交付 / 不交付

| 在 scope | 不在 scope |
|----------|------------|
| Mock 机会卡 + G1 证据门 + 推荐态 | 完整 G2–G5 · 档案软对照 · Python CLI |
| 设计/实现审计 + identity evidence | 探针/HN 猎场 · LLM 填卡 · 源仓改造 |

## 4. 初始化

```powershell
$Adopt = "E:\ninjasin-labs\fuyao-adopt-shisui"
$Fuyao = "E:\ninjasin-labs\fuyao-nomad"
# git init · pack:import · 复制 中 档五模板
```

## 5. 验证

```powershell
Set-Location $Adopt
npm test
node "$Fuyao\scripts\check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
node "$Fuyao\scripts\check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
# 源仓无 git 或本会话零写入
```

## 6. 关仓产物

- [adopt-shisui-close.md](./adopt-shisui-close.md)
- [adopt-vs-source-shisui.md](./adopt-vs-source-shisui.md)
