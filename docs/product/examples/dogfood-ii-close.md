# Dogfood II 关仓笔记 · reading-card

> **脱敏公开版** · Sandbox 路径以 `<SANDBOX_ROOT>` 占位  
> 场景：[dogfood-ii-scenario.md](./dogfood-ii-scenario.md) · 剧本：[dogfood-playbook.md](./dogfood-playbook.md)

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-08-27 |
| **fuyao 起跑** | v0.18.0（模板矩阵 · pack:import） |
| **文档入库** | v0.19（本笔记 + playbook 扩展） |
| **flow_weight** | 中 |
| **Sandbox** | `<SANDBOX_ROOT>`（独立仓，未并入 fuyao-nomad） |
| **结论** | **closed** · `progress.status: closed` |

## 模板绑定

| 文件 | 主仓来源 | Sandbox |
|------|----------|---------|
| stage-中 | `docs/templates/stage-中.yaml` | `.agents/templates/stage-中.yaml`（副本） |
| commit-policy-中 | `docs/templates/commit-policy-中.yaml` | `.agents/templates/commit-policy-中.yaml` |
| dod-中 | `docs/templates/dod-中.yaml` | `.agents/templates/dod-中.yaml` |
| verification-中 | `docs/templates/verification-中.yaml` | `.agents/templates/verification-中.yaml` |
| ddd-gate-中 | `docs/templates/ddd-gate-中.yaml` | `.agents/templates/ddd-gate-中.yaml` |

副本 README 注明来源 tag **v0.18.0**。

## stage 自检（stage-中 · s1–s4）

| stage | exit_criteria | 勾选 | 证据 |
|-------|---------------|------|------|
| **s1 调研** | 问题陈述或调研摘要可核对 | ✅ | `docs/research/2026-08-27-reading-card-brief.md` |
| | 快照未自动升格为 scope | ✅ | 非目标明确「不做 LLM / Web UI」 |
| **s2 规格** | 规格与 plan work_items 对齐 | ✅ | `docs/spec/card-spec.md` ↔ wi-spec |
| | 设计审计门 pass 或 N/A | ✅ | m-spec · audit_gate: design（文档级 N/A 自评 pass） |
| **s3 实现** | DoD checklist 完成 | ✅ | npm test 3/3 · ic-source 测试 |
| | plan-progress 已同步 | ✅ | wi-impl completed · blockers cleared |
| **s4 审计门** | 适用 audit_gate 已 pass 或 N/A | ✅ | m-impl · implementation 自评 pass |
| | 身份约束仍满足 | ✅ | ic-source + strict identity 绿 |

## commit-policy 回顾（commit-policy-中）

| gate_level | 本仓真实例 |
|------------|------------|
| **auto** | 修正 `package.json` 中 `npm test` 为 `tests/*.test.mjs`（测试绿后直接 commit） |
| **confirm** | 编写 `docs/spec/card-spec.md` 变更 ic-source 验收方式后再动 `src/` |
| **forbid** | 未提交任何 `.env` / API Key；`.gitignore` 仅忽略 `node_modules` |

## identity · ic-source

| 时点 | 状态 | 说明 |
|------|------|------|
| 实现 v0 | open | 输出无 `> source:` 行 |
| 实现 v1 | cleared | 每点附 source + `assertSourcesTraceable` |

**证据：** `.agents/audit/ic-source-evidence.md`（plan blocker `blk-ic-source-v0`）

## 命令输出（摘要）

```text
> npm test
✔ reading-card · ic-source (3 tests)
ℹ pass 3 · fail 0

> node …/check-identity.mjs --project . --plan .agents/plan-progress.yaml --strict
扶摇 · Nomad identity check (strict)
identity check passed (strict)
```

## playbook 步 7（第二 mapping）

**N/A** — 本版未声明第二 harness 映射；roster 未改。

## 摩擦点（→ U5）

| # | 摩擦 | 处置 |
|---|------|------|
| F1 | Windows 下 `node --test tests/` 目录形式失败 | sandbox 改用 `tests/*.test.mjs`；**不**改主仓模板（环境差异） |
| F2 | stage 与 plan milestone 映射需人工在 handoff 注明 | U4 playbook 已补「模板对齐检查」 |

**U5 结论：** 无模板 schema/文案级 blocker → **skip** 模板 commit。

## 结论

reading-card dogfood **closed**。中档五模板绑定可跑通；ic-source strict 绿。范例可供 v0.19 文档与 playbook 引用。
