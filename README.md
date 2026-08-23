<div align="center">

# 扶摇 · Nomad

> **鹏之徙于南冥也，水击三千里，抟扶摇而上者九万里** · *Rise on the Wind*
> 开源 **Agent 团队框架** — 团队优先，DDD 驱动，挂到任意 harness（**不做 harness**）。

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![CI](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml/badge.svg)](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml)
[![Release](https://img.shields.io/badge/Release-v0.7.0-blue)](https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.7.0)

**[English](README.en.md)** | 中文

</div>

---

## About

**扶摇（fú yáo）**——「扶摇」= 旋风、上举之力；出处：《庄子·逍遥游》「抟**扶摇**而上者九万里」。**Nomad** = 团队规格可迁移，不绑单一 harness。

开源 **Agent 团队框架** — 定义多角色如何协作、按轻-重流程重量交付，通过薄适配挂到 Cursor / CLI / OpenHands 等运行时（**不替代 harness**）。

- **一句话目标**：让 Builder、小团队、单人用同一套 **组队协议**（编制、交接、计划进度、DoD/验证/DDD 门）完成真实工程与产品工作，而非单体 prompt 堆砌。
- **全球定位对位**：AI 员工产品卖「强个体」；编排框架卖 runtime API；IDE 内置 agent 偏浅层 subagent — 扶摇卖 **团队层规格 + DDD 底座 + 开源可扩展**。
- **双名**：**扶摇** = 团队之魂（多角色逍遥协作）；**Nomad** = 团队之能（规格随处可栖）。
- **八能力域**：编制 · 编排与争用 · 推进 · 交付模式（`flow_weight`）· 质量验证 · 治理审计 · 研究产品 · 可移植挂载。
- **薄适配原则**：roster / pack 为 harness 无关源；`harness/` 只做槽位映射，**不做**通用 IDE runtime。

## 当前状态

| 域 | 状态 |
|----|------|
| 产品 / 设计文档 `docs/` | ✅ 定稿（问题陈述 · 北极星 · 能力模型 · 编制协议） |
| JSON Schema + 六档 `flow_weight` 模板 | ✅ roster · plan-progress · DoD · verification · DDD 门 · audit-record |
| 团队包 `packs/minimal-research-to-spec` | ✅ pack validate / install |
| Harness 薄适配 POC | ✅ Cursor（install 脚本）· CLI · OpenHands（文档 + 片段） |
| 消息协议 + 争用顾问 | ✅ message validate · `check:contention`（territory 重叠 + CI `--strict`） |
| 校验与测试 | ✅ `validate` 24 项 · `npm test` 6 项 · GitHub Actions |
| 开源发布 | ✅ **v0.7.0** — [CHANGELOG](CHANGELOG.md) · [ROADMAP](ROADMAP.md) |

维护者审计为**本地私有**（`.agents/audit/`，不入库）。公开契约见 [docs/audit/README.md](docs/audit/README.md)。

## 目录结构

| 目录/文件 | 内容 |
|-----------|------|
| `docs/product/` | 问题陈述 · 北极星 · 交付模式 · 能力模型 · Builder 指南 · 路线图 |
| `docs/design/` | 编制协议 · handoff · 计划进度 · 消息/升级/争用契约 · JSON Schema |
| `docs/templates/` | 六档 `flow_weight` 模板（轻 · 轻中 · 中 · 中重 · 重 · 全流程） |
| `agents/examples/` | minimal-roster · plan-progress · messages 示例 |
| `packs/` | 官方团队包示例（roster + 模板 + harness 映射 + skills） |
| `harness/` | Cursor / CLI / OpenHands **薄适配**（非产品核心） |
| `skills/` | 可移植技能（**不同步**到 harness 路径） |
| `scripts/` | `validate` · `pack` · `check:contention` · `install:cursor-agents` |
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

## 路线图

**当前：v0.7.0** — pack 元数据 · model_hint · 治理模板 · 实现链示例。

| 版本 | 目标 |
|------|------|
| **v0.1.0** ✅ | 开源基线 |
| **v0.2.0** ✅ | 团队包 · 消息 schema |
| **v0.3.0** ✅ | 六档模板 · CLI POC |
| **v0.4.0** ✅ | message · contention · OpenHands |
| **v0.5.0** ✅ | territory · harness 片段 |
| **v0.6.0** ✅ | harness 齐 · active 争用 |
| **v0.7.0** ✅ | pack 元数据 · model_hint · 治理模板 · dogfood 链 |
| **v0.8.x** | 追溯链 · 编排导出 POC |

详见 [后 v0.1 路线](docs/product/post-v01-roadmap.md) · [0→1 路径](docs/product/0-1-path.md)

### 明确不做

- 不做通用 harness / IDE runtime
- 不预设「官方固定编制」
- 竞品调研不自动升格产品 scope

## Git

- 分支 `main`；提交规范见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

[Apache-2.0](LICENSE) © 2026 NinjaSln Labs · [NinjaSln-labs](https://github.com/NinjaSln-labs)
