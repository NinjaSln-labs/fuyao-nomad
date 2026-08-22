# 扶摇 · Nomad

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![CI](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml/badge.svg)](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml)

开源 **Agent 团队框架** — 团队优先，DDD 驱动，挂到任意 harness（**不做 harness**）。

- **扶摇** — 团队之魂：多角色协作，逍遥于任意天地  
- **Nomad** — 团队之能：规格可迁移，随处可栖  

> English: [README.en.md](README.en.md)

## 这是什么

扶摇 · Nomad 定义 **团队层** 的可移植规格：编制（roster）、交接（handoff）、计划进度、DoD/验证/DDD 门模板，以及随 `flow_weight`（轻-重流程重量）伸缩的质量与审计。  
编排引擎（LangGraph、CrewAI 等）与 IDE harness（Cursor 等）通过 **薄适配** 挂载，框架本身不替代它们。

**适合谁**：Agent Builder → 小团队 → 单人 — 需要可复用「组队协议」而非单体 prompt 堆砌。

## 快速开始

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
cd fuyao-nomad
npm install
npm run validate
npm test
npm run install:cursor-agents -- --project .
```

- [Builder 指南](docs/product/builder-guide.md)  
- [贡献指南](CONTRIBUTING.md)  
- [变更日志](CHANGELOG.md)  

## 核心概念

| 概念 | 说明 |
|------|------|
| **Roster** | 槽位编制：加减角色、串行/并行、正交槽位（推进/审计） |
| **flow_weight** | 轻-重连续谱：联动 DoD、验证、DDD 门、分层审计深度 |
| **handoff** | 默认行为 + 可选 `handoff.rules` |
| **Plan / Progress** | `.agents/plan-progress.yaml` — 意图、里程碑、`audit_gate` |
| **Harness 薄适配** | 如 `harness/cursor/` — 映射到 subagent，不改 roster 本体 |

## 文档导航

| # | 文档 |
|---|------|
| 1 | [产品索引](docs/product/README.md) |
| 2 | [问题陈述](docs/product/problem-statement.md) |
| 3 | [北极星](docs/product/north-star.md) |
| 4 | [交付模式](docs/product/delivery-model.md) |
| 5 | [能力模型](docs/product/capability-model.md) |
| 6 | [编制协议](docs/design/composition-protocol.md) |
| 7 | [领域语言](docs/design/domain-language.md) |
| 8 | [竞品快照](docs/research/2026-08-22-agent-team-landscape.md)（去权威化参考） |

## 路线图

**当前：v0.2.0** — 团队包 · 消息协议 schema · `pack:install`。

| 版本 | 目标 |
|------|------|
| **v0.1.0** ✅ | 开源基线 |
| **v0.2.0** ✅ | 团队包 pack · 消息协议 schema |
| **v0.3.0** ✅ | 六档模板 · CLI 映射 POC · 升级协议 |
| **v0.4.x** | 争用自动检测 · 更多 harness |

详见 [ROADMAP.md](ROADMAP.md) · [后 v0.1 路线](docs/product/post-v01-roadmap.md) · [0→1 路径](docs/product/0-1-path.md)

### 明确不做

- 不做通用 harness / IDE runtime  
- 不预设「官方固定编制」  
- 竞品调研不自动升格产品 scope  

## 仓库结构

```
fuyao-nomad/
├── docs/            # 产品、设计、调研、审计
├── skills/          # 可移植技能
├── harness/         # harness 薄适配（非产品核心）
├── packages/core/   # schema 索引
├── scripts/         # validate · install-cursor-agents
└── agents/          # 团队包示例（可删改）
```

## 状态

**v0.3.0** — [CHANGELOG](CHANGELOG.md) · [ROADMAP](ROADMAP.md)

## 许可

[Apache-2.0](LICENSE) — Copyright © 2026 NinjaSln Labs

## 组织

由 [NinjaSln-labs](https://github.com/NinjaSln-labs) 维护。

---

## English (summary)

**Fuyao · Nomad** is an open-source **agent team framework**: team-first, DDD-oriented specs (roster, handoff, plan/progress, DoD/verification/DDD gates) with adjustable **flow_weight**. It mounts onto existing harnesses via thin adapters — **not** a harness itself.

Full English readme: [README.en.md](README.en.md)
