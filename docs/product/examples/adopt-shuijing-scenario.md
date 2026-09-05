# Adopt 场景 · shuijing（产品接手）

> v0.37 · **flow_weight=轻中** · 独立接手仓 · **源仓只读** · **全程 pi harness 驱动**（首个非 cursor adopt）  
> Playbook：[fuyao-adopt-playbook.md](./fuyao-adopt-playbook.md) · 前例：[voyage](./adopt-voyage-scenario.md)

## 1. 场景

| 项 | 值 |
|----|-----|
| **代号** | adopt-shuijing |
| **源仓** | `shuijing-v2`（只读 · AI 产品可行性评审系统 · tickets 01–16） |
| **接手仓** | `fuyao-adopt-shuijing` · 本地 · 不上 GitHub · git `e7488ea` |
| **Intent** | 承诺出口域薄切片——Mock 评审链上验证唯一承诺出口 + 硬锚定防评分-裁决悖论 |
| **identity** | `ic-sole-commitment-exit` — 映射源仓「主席是唯一承诺出口」+ `apply_hard_anchor` |
| **flow_weight** | **轻中**（补矩阵轻端空白） |
| **harness** | **pi**（SDK AgentSession 三槽位独立实例 · v0.32.1 同款机制） |

## 2. 源仓引用（勿复制大段）

| 主题 | 源路径 |
|------|--------|
| 产品叙事 / 四档裁决 / 唯一承诺出口 | `docs/00-水镜是什么.md` |
| PRD / Non-Goals | `docs/05-prd.md` |
| Grill 决策 D1–D17 | `docs/07-grill-decisions.md` |
| Verdict / ThreeSentences / DimensionResult 类型 | `src/shuijing/types.py` |
| 硬锚定 apply_hard_anchor | `src/shuijing/commitment.py` |
| 门禁 run_gate | `src/shuijing/engine/gate.py` |

## 3. 本仓交付 / 不交付

| 在 scope | 不在 scope |
|----------|------------|
| Mock 六维评审（blocked 组合）+ 主席委员会裁决 + 硬锚定修正 + 门禁短路 | LLM 评审 · 领域 profile 全集 · 六维权重计算 |
| `ic-sole-commitment-exit` 机器验证（闭包唯一出口 + 锚定全分支） | 报告渲染 · MCP/API · 企业 ICP/部署 · 多租户 · 评后追踪 |

## 4. pi harness 槽位委派（三槽位独立实例）

| 槽位 | 形态 | 产物 |
|------|------|------|
| research | SDK AgentSession ×5 段（1 输入文件/段） | 15 Fact 快照（全标来源路径） |
| spec | 独立实例 + **confirm 门**（操作者三项裁决） | 五概念规格 + 6 AC（全对齐 Fact 编号） |
| auditor | 独立只读实例 | 5/5 AC 审计（行号级证据）· verdict: pass |
| progress | 操作者代行（协调/裁决/关仓） | gate-confirm + audit message + blocker evidence |

**分段委派纪律（R16 沉淀）**：headless 长任务拆「1 输入文件/段 + 填空模板产物」——
多文件并读 + 长结构化要求触发模型读后停滞（详见 close 笔记）。

## 5. 验证

```bash
cd "$Adopt" && npm test        # 10/10
node "$Fuyao/scripts/check-identity.mjs" --project . --plan .agents/plan-progress.yaml --strict
node "$Fuyao/scripts/check-traceability.mjs" --project . --plan .agents/plan-progress.yaml --strict
# 源仓零写入：会话首尾 git status 快照 diff 为空 + HEAD 未变
```

## 6. 关仓产物

- [adopt-shuijing-close.md](./adopt-shuijing-close.md)
- [adopt-vs-source-shuijing.md](./adopt-vs-source-shuijing.md)
