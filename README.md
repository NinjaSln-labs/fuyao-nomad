<div align="center">

# 扶摇 · Nomad

> **鹏之徙于南冥也，水击三千里，抟扶摇而上者九万里** · *Rise on the Wind*
> 开源 **Agent 团队框架** — 团队优先，DDD 驱动，挂到任意 harness（**不做 harness**）。

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![CI](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml/badge.svg)](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml)
[![Release](https://img.shields.io/badge/Release-v1.0.0--alpha.2-blue)](https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v1.0.0-alpha.2)

**[English](README.en.md)** | 中文

*English core docs: [north-star](docs/product/north-star.en.md) · [capability-model](docs/product/capability-model.en.md) · [composition-protocol](docs/design/composition-protocol.en.md) · [team-pack](docs/design/team-pack.en.md) · [get-started](docs/product/get-started.en.md)*

</div>

---

## About

**扶摇（fú yáo）**——「扶摇」= 旋风、上举之力；出处：《庄子·逍遥游》「抟**扶摇**而上者九万里」。**Nomad** = 团队规格可迁移，不绑单一 harness。

开源 **Agent 团队框架** — 定义多角色如何协作、按轻-重流程重量交付，通过薄适配挂到 pi · dsh · Cursor · Qoder · Claude Code 等（**不替代 harness / 编排引擎**）——同一团队包五家实跑验证。

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
| Harness 薄适配 | ✅ **五家挂载级实证**（pi · dsh · cursor · qoder · claude · 同一 pack 零改动）· CLI · **LangGraph / CrewAI 导出** · OpenHands 冻结 |
| 消息协议 + 争用顾问 | ✅ message validate · `check:contention`（territory 重叠 + CI `--strict`） |
| 校验与测试 | ✅ `validate` 50 项 · `npm test` 34 项 · GitHub Actions |
| 开源发布 | ✅ **v1.0.0-alpha.2** — [CHANGELOG](CHANGELOG.md) · [ROADMAP](ROADMAP.md) · [官网](https://NinjaSln-labs.github.io/fuyao-nomad/) |

维护者发版须 **双审计必做**（`.agents/audit/`：**发版审计** 100/100 + **代码质量审计** pass/pass_with_notes，不入库；顺序：双审计 → 包装 commit → tag → Release）。清单：[release-checklist.md](docs/product/examples/release-checklist.md) · `npm run release:preflight`。公开契约见 [docs/audit/README.md](docs/audit/README.md)。

## 目录结构

| 目录/文件 | 内容 |
|-----------|------|
| `docs/product/` | 问题陈述 · 北极星 · 交付模式 · 能力模型 · **[get-started（15 分钟）](docs/product/get-started.md)** · Builder 指南 · 路线图 |
| `docs/design/` | 编制协议 · handoff · 计划进度 · 消息/升级/争用契约 · JSON Schema |
| `docs/templates/` | 六档 `flow_weight` 模板（DoD · verification · ddd-gate · **stage · commit-policy** 等） |
| `agents/examples/` | minimal-roster · plan-progress · messages 示例 |
| `packs/` | 官方团队包（[starter-solo](packs/starter-solo/) 单人开箱 · [minimal-research-to-spec](packs/minimal-research-to-spec/) 调研→规格；roster + 模板 + harness 映射 + skills） |
| `harness/` | **pi · dsh · Cursor · Qoder · Claude**（五家挂载级实证）· CLI · LangGraph / CrewAI 导出 · OpenHands 冻结 — **薄适配**（非产品核心） |
| `skills/` | 可移植技能（**不同步**到 harness 路径） |
| `scripts/` | `validate` · `pack` · `check:*` · `install:cursor-agents` · **`fuyao:init`** · `release:preflight` |
| `docs/product/examples/` | dogfood / adopt 剧本 · 矩阵 · 发版清单 |
| `packages/core/` | Schema 索引 |
| `ROADMAP.md` | 版本里程碑与后续候选 |

## 使用（三通道）

### 1 · npm（推荐）

```bash
mkdir my-project && cd my-project && git init
npm i fuyao-nomad
npx fuyao-nomad init --project . --pack starter-solo --intent "一句话目标"
```

一条命令完成：选团队包 → 安装（pack → `agents/packs/` + Cursor 子代理 → `.cursor/agents/`）→ 生成 `.agents/plan-progress.yaml` 计划骨架。`--pack` 接受裸包名（解析到自带 `packs/`）、相对路径（按当前目录）或绝对路径——显式路径优先；仓内仅一个包时可省略。后续验证：

```bash
npx fuyao-nomad validate --path .agents/plan-progress.yaml
npx fuyao-nomad check identity --project . --plan .agents/plan-progress.yaml --strict
```

CLI 全命令：`fuyao-nomad init` · `fuyao-nomad pack validate|import|export` · `fuyao-nomad validate` · `fuyao-nomad check identity|traceability|contention` · `fuyao-nomad install:cursor`（`fuyao-nomad --help` 全览）。

### 2 · npx（免安装试用）

```bash
npx -y fuyao-nomad@alpha init --project . --pack starter-solo --intent "试用"
```

### 3 · 源码

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
node fuyao-nomad/scripts/fuyao-init.mjs --project . --pack starter-solo --intent "一句话目标"
```

> 完整教程（含分钟分段与三坑提醒）：[docs/product/get-started.md](docs/product/get-started.md)（15 分钟 · 实测 12 分钟）· [English](docs/product/get-started.en.md)

## 开发（仓库贡献者）

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
cd fuyao-nomad
npm ci

npm run validate          # 50 项（schema · 模板 · pack · message · ADR）
npm test                  # 34 项（脚本 · pack · 契约回归）
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

**当前：v1.0.0-alpha.2** — 分发层：npm CLI（`npm i fuyao-nomad` · `npx fuyao-nomad init` 三通道）+ GitHub Pages 官网 + README 使用区扩容。契约面不变（ADR-0005 冻结）。

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
| **v0.32/0.32.1** ✅ | pi 适配 + 挂载级证据升级**真多实例**（3 独立 SDK 实例 · 证据等级纪律确立） |
| **v0.33.0** ✅ | dsh 适配 · **北极星「移植」2/2 达标** · OpenHands 冻结 + 幽灵命令清偿 |
| **v0.34.0** ✅ | cursor 挂载级回归实证（CLI 委派 · 三家全挂载级） |
| **v0.35.0** ✅ | qoder + claude 挂载级（Mac 远程直测 · claude 无订阅第三方模型）· **候选五家全数挂载级** |
| **v0.36.0** ✅ | langgraph runtime smoke（真实 runtime 6/6 断言 · R15 interrupt() 契约修订 · crewai 文档级对照） |
| **v0.37.0** ✅ | adopt shuijing 第 4 行（轻中档补矩阵轻端 · **pi harness 全程驱动** · ic-sole-commitment-exit · R16 分段纪律 + dod-轻中模板修正） |
| **v0.38.0** ✅ | 单人开箱：**starter-solo 包**（轻档 3+2 槽）· **`fuyao:init`**（选包→安装→骨架）· get-started 教程（实测 12 分钟）· dod-轻模板同款孤例清偿 |
| **v0.39.0** ✅ | 外部信任面：**英文核心 5 份**（north-star · capability-model · composition-protocol · team-pack · get-started）· **schema `$id` 语义化**（五核心 /v1 · 11 模板 /v1-template · ADR-0006 · schema-stability.md）· CONTRIBUTING 首贡献路径 + 3 issue 模板 |
| **v1.0.0-alpha.1** ✅ | **契约冻结**（ADR-0005 A–E 五面）· 回归扩容 24→34（契约字段每项一测）· validate `--path` 未知类型拒绝静默通过（C 面真漏洞修复）· 三重审计 |
| **v1.0.0-alpha.2** ✅ | **分发层**：npm CLI（bin 全名 `fuyao-nomad` · 依赖 runtime 化 · tarball 实测）· GitHub Pages 官网（docsify · 全仓文档）· README 使用区三通道扩容 |

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
