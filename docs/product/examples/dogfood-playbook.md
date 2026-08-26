# Dogfood 剧本（官方）

> 用官方包从一句话推进到可演示交付（或明确废除），并留下可审计痕迹。  
> 机制权威：[identity-constraints.md](../../design/identity-constraints.md) · 复盘：[v0.1-v0.16-retrospective.md](./v0.1-v0.16-retrospective.md)

## 前置

- Node ≥20 · Git  
- 本机可访问 [fuyao-nomad](https://github.com/NinjaSln-labs/fuyao-nomad)（`npm install` / `pack:import`）  
- **独立**空仓（推荐）；勿把业务密钥写入仓库  

## 步骤

| 步 | 动作 | 产物 |
|----|------|------|
| 0 | 独立空仓 `git init`；Node≥20 | 空仓 |
| 1 | 从 fuyao：`npm run pack:import -- --pack packs/minimal-research-to-spec --project <仓>` | `agents/packs/…` · `.cursor/agents` |
| 2 | 写 `intent`，抽出 `identity_constraints`（品类/形态词） | `.agents/plan-progress.yaml` |
| 3 | research → spec；`gate_level=confirm` 时对照 **intent 原文** | 研究笔记 · 规格 |
| 4 | 实现；身份未满足 → `blockers`（含 `related_identity_constraint_ids`），**不要**标 m-impl done | open blockers |
| 5 | 取证（真实主路径）→ `evidence` → `status: cleared` | 审计 md / 实测笔记 |
| 6 | `npm run check:identity -- --project <仓> --strict`；auditor 对照 intent + identity | 终端绿灯 · audit |
| 7 | 移植：在 `pack.yaml` `harness_adapters` 声明第二映射（如 cli），**不改** roster | mapping 文件 |
| 8 | 关闭：短复盘 · `progress.status: closed`（或项目约定字段） | close 笔记 |

## 停止条件

- DoD：`identity_constraints_held` +（若曾阻塞）`blocker_evidence_recorded`，或  
- **明确废除**并写入 plan / 复盘原因  

## 已跑通范例（外部）

天气 · 出行 · 穿搭助手 dogfood（独立仓）：关闭笔记 `docs/research/2026-08-26-dogfood-close.md`。  
仅作参考；勿把该仓密钥或业务逻辑拷进扶摇。

## 不做

- 框架侧调 LLM / 自动抽身份词  
- 把 `check:identity` 当 CI 默认门（本地 / dogfood `--strict`）
