<div align="center">

# 扶摇 · Nomad

> **鹏之徙于南冥也，水击三千里，抟扶摇而上者九万里** · *Rise on the Wind*
> 开源 **Agent 团队框架** — 团队优先，DDD 驱动，挂到任意 harness（**不做 harness**）。

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![CI](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml/badge.svg)](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml)
[![Release](https://img.shields.io/badge/Release-v0.32.1-blue)](https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.32.1)

**[English](README.en.md)** | 中文

</div>

---

## About

**扶摇（fú yáo）**——「扶摇」= 旋风、上举之力；出处：《庄子·逍遥游》「抟**扶摇**而上者九万里」。**Nomad** = 团队规格可迁移，不绑单一 harness。

开源 **Agent 团队框架** — 定义多角色如何协作、按轻-重流程重量交付，通过薄适配挂到 Cursor / CLI / OpenHands / LangGraph / CrewAI 等（**不替代 harness / 编排引擎**）。

- **一句话目标**：让 Builder、小团队、单人用同一套 **组队协议**（编制、交接、计划进度、DoD/验证/DDD 门）完成真实工程与产品工作，而非单体 prompt 堆砌。
- **全球定位对位**：AI 员工产品卖「强个体」；编排框架卖 runtime API；IDE 内置 agent 偏浅层 subagent — 扶摇卖 **团队层规格 + DDD 底座 + 开源可扩展**。
- **双名**：**扶摇** = 团队之魂（多角色逍遥协作）；**Nomad** = 团队之能（规格随处可栖）。
- **八能力域**：编制 · 编排与争用 · 推进 · 交付模式（`flow_weight`）· 质量验证 · 治理审计 · 研究产品 · 可移植挂载。
- **薄适配原则**：roster / pack 为 harness 无关源；`harness/` 只做槽位映射，**不做**通用 IDE runtime。

## 当前状态

| 域 | 状态 |
|----|------|
| 产品 / 设计文档 `docs/` | ✅ 定稿（问题陈述 · 北极星 · 能力模型 · 编制协议） |
| JSON Schema + 六档 `flow_weight` 模板 | ✅ roster · plan-progress · DoD · verification · DDD 门 · **stage · commit-policy** · audit-record |
| 团队包 `packs/minimal-research-to-spec` | ✅ pack validate / install |
| Harness 薄适配 | ✅ **pi 挂载级实跑** · Cursor（安装级）· CLI · Qoder/Claude 排期 · **LangGraph / CrewAI 导出** · OpenHands 冻结 |
| 消息协议 + 争用顾问 | ✅ message validate · `check:contention`（territory 重叠 + CI `--strict`） |
| 校验与测试 | ✅ `validate` 47 项 · `npm test` 21 项 · GitHub Actions |
| 开源发布 | ✅ **v0.31.0** — [CHANGELOG](CHANGELOG.md) · [ROADMAP](ROADMAP.md) |

维护者发版须 **双审计必做**（`.agents/audit/`：**发版审计** 100/100 + **代码质量审计** pass/pass_with_notes，不入库；顺序：双审计 → 包装 commit → tag → Release）。清单：[release-checklist.md](docs/product/examples/release-checklist.md) · `npm run release:preflight`。公开契约见 [docs/audit/README.md](docs/audit/README.md)。

## 目录结构

| 目录/文件 | 内容 |
|-----------|------|
| `docs/product/` | 问题陈述 · 北极星 · 交付模式 · 能力模型 · Builder 指南 · 路线图 |
| `docs/design/` | 编制协议 · handoff · 计划进度 · 消息/升级/争用契约 · JSON Schema |
| `docs/templates/` | 六档 `flow_weight` 模板（DoD · verification · ddd-gate · **stage · commit-policy** 等） |
| `agents/examples/` | minimal-roster · plan-progress · messages 示例 |
| `packs/` | 官方团队包示例（roster + 模板 + harness 映射 + skills） |
| `harness/` | Cursor / CLI / OpenHands / LangGraph / CrewAI **薄适配**（非产品核心） |
| `skills/` | 可移植技能（**不同步**到 harness 路径） |
| `scripts/` | `validate` · `pack` · `check:*` · `install:cursor-agents` · `release:preflight` |
| `docs/product/examples/` | dogfood / adopt 剧本 · 矩阵 · 发版清单 |
| `packages/core/` | Schema 索引 |
| `ROADMAP.md` | 版本里程碑与后续候选 |

## 开发

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
cd fuyao-nomad
npm install

npm run validate          # schema 校验（示例 · 模板 · pack · message）
npm test                  # 脚本与 pack install 测试
npm run install:cursor-agents -- --project .   # 同步 Cursor subagent 映射
npm run check:contention -- --project .        # 争用顾问（默认 advisory）
npm run pack:install -- --pack packs/minimal-research-to-spec --project .
```

- [Builder 指南](docs/product/builder-guide.md)
- [贡献指南](CONTRIBUTING.md)

## 核心概念

| 概念 | 说明 |
|------|------|
| **Roster** | 槽位编制：加减角色、串行/并行、`contention_policy`、正交槽位 |
| **flow_weight** | 轻-重连续谱：联动 DoD、验证、DDD 门、分层审计 |
| **territory** | 并行时 `work_items[].territory.paths` 路径归属 |
| **handoff** | 默认行为 + 可选 `handoff.rules` |
| **Plan / Progress** | `.agents/plan-progress.yaml` — 意图、里程碑、`audit_gate` |
| **Team Pack** | 可发布的 roster + 模板 + 映射 + skills 单元 |

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
| 9 | [Dogfood 剧本](docs/product/examples/dogfood-playbook.md) · [矩阵](docs/product/examples/dogfood-matrix-comparison.md) |
| 10 | [Adopt 剧本](docs/product/examples/fuyao-adopt-playbook.md) · [矩阵](docs/product/examples/adopt-matrix-comparison.md) |
| 11 | [发版清单](docs/product/examples/release-checklist.md)（维护者） |

## 路线图

**当前：v0.32.1** — pi 挂载级实跑（真多实例 · 移植验证第一家）。

| 版本 | 目标 |
|------|------|
| **v0.1.0** ✅ | 开源基线 |
| **v0.2.0** ✅ | 团队包 · 消息 schema |
| **v0.3.0** ✅ | 六档模板 · CLI POC |
| **v0.4.0** ✅ | message · contention · OpenHands |
| **v0.5.0** ✅ | territory · harness 片段 |
| **v0.6.0** ✅ | harness 齐 · active 争用 |
| **v0.7.0** ✅ | pack 元数据 · model_hint · 治理模板 · dogfood 链 |
| **v0.8.0** ✅ | 追溯链 · plan↔DoD · check:traceability |
| **v0.9.0** ✅ | 编排导出 POC（LangGraph · CrewAI） |
| **v0.10.0** ✅ | model_policy · install `--roster` |
| **v0.11.0** ✅ | 六档 DoD plan_refs · validate basename |
| **v0.12.0** ✅ | ADR 索引 · 问题陈述 / PRD-lite 模板 |
| **v0.13.0** ✅ | 反指标模板 · skills 绑定 · strict 文案 |
| **v0.14.0** ✅ | 对抗/边界模块 · CLI/OpenHands 深化 |
| **v0.15.0** ✅ | 团队包 export/import · 换映射指南 |
| **v0.16.0** ✅ | 身份约束 · DoD/审计对照 intent |
| **v0.17.0** ✅ | 协议硬化 · Eval 三门可选 · 复盘 |
| **v0.18.0** ✅ | stage/commit-policy 六档 · audit-record · identity 测试 |
| **v0.19.0** ✅ | Dogfood II · 中档五模板 · reading-card |
| **v0.20.0** ✅ | Dogfood III · 轻档 todo-strip |
| **v0.21.0** ✅ | Dogfood IV · 重档 audit-trail |
| **v0.22.0** ✅ | Playbook 0–8 完整 · 步 7 CLI |
| **v0.23.0** ✅ | 轻中 action-list · triple harness |
| **v0.24.0** ✅ | 中重 changelog-slice · 桥接档补全 |
| **v0.25.0** ✅ | 全流程 grant-gate · 矩阵满 |
| **v0.26.0** ✅ | 发版 checklist · release:preflight · adopt playbook |
| **v0.27.0** ✅ | s7 对抗启用 · OpenHands E2E lite |
| **v0.28.0** ✅ | Adopt qingfu-envoy · vs-source |
| **v0.29.0** ✅ | Adopt shisui · adopt 矩阵满 |
| **v0.30.0** ✅ | Adopt voyage（ic-zero-trust-approval）· adopt 矩阵第 3 行 |
| **v0.31.0** ✅ | 发版防呆机械化（preflight 四防）· architecture.md 完整形态 · roles.md 裁决归档 |

详见 [后 v0.1 路线](docs/product/post-v01-roadmap.md) · [0→1 路径](docs/product/0-1-path.md)

### 明确不做

- 不做通用 harness / IDE runtime
- 不做 LangGraph / CrewAI 等编排引擎（仅导出映射）
- 不预设「官方固定编制」
- 竞品调研不自动升格产品 scope

## Git

- 分支 `main`；提交规范见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

[Apache-2.0](LICENSE) © 2026 NinjaSln Labs · [NinjaSln-labs](https://github.com/NinjaSln-labs)
