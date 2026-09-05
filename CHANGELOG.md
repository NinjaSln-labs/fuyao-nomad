# 变更日志

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本遵循 [SemVer](https://semver.org/lang/zh-CN/)。

## [1.0.0-alpha.1] - 2026-09-06

### Added

- **ADR-0005 契约冻结**：A–E 五面（四核心 schema 字段结构 /v1 · pack 目录布局 · check:* 与 validate 退出码 · 模板六档绑定 · install/fuyao:init 行为）—— alpha.1 起 patch 修 bug · minor 增可选面 · 破坏性变更须 ADR + 升版；validate 49→50 入链
- **契约回归扩容 24→34**：契约字段每项一测——五 schema 枚举与 required（gate_level/slot_kind/orchestration.mode · identity_constraints 三字段 + blockers.evidence · message 四 type · audit 三 verdict · pack skills 不进 harness 路径）· 退出码 strict/advisory · 六档模板绑定 + dod 零孤例残留锁 · init 拒覆盖与骨架结构

### Fixed

- **validate `--path` 未知类型静默通过漏洞**（ADR-0005 C 面真漏洞）：显式单文件校验时未识别契约类型报 `skip (unknown type)` 且计为 passed 退 0——非契约文件名（如 `bad.plan.yaml`）逃过校验；现改为拒绝静默通过（`unknown contract type (refusing to pass)` 退 1）；目录扫描内杂项 skip 行为不变（示例目录允许非契约文件）

## [0.39.0] - 2026-09-06

### Added

- **英文核心 5 份**（U1）：north-star · capability-model · composition-protocol · team-pack · get-started 英文版入库（忠实浓缩 · 中文为权威源 · 双向链接）——外部信任面首层
- **schema `$id` 语义化**（U2）：16 schema 全量切换——五核心（roster · plan-progress · message · audit-record · team-pack）→ **`/v1`**（承诺面：破坏性变更须升 v2）；11 模板类 → **`/v1-template`**（演进面：checklist/description 可不升版调整）；零运行时依赖实测切换零破坏（24 test / 48→49 validate 全绿）
- **schema-stability.md**：承诺面 vs 演进面划分 · 变更流程 · 消费者影响
- **ADR-0006**：$id 语义化裁决入库（validate 48→49）
- **CONTRIBUTING 首贡献路径 + 3 issue 模板**（U3）：15 分钟环境验证 → 良好首议题表（文档/模板/片段/runbook 四型）· bug-report · feature-proposal（含 non-goals 检查清单）· harness-request（证据级四选一 · 冻结认领须维护者环境）

### Changed

- packages/core/README：Schema 节升级为 $id 语义化说明 · ADR 索引补 0006 行
- 导航同步：product/README（北极星/能力模型/get-started 英文链接）· README 双语（英文核心五链接 + 文档导航）

## [0.38.0] - 2026-09-06

### Added

- **`packs/starter-solo/`**（首个官方第二包 · 单人开箱）：轻档 3+2 槽（builder→reviewer 主链 + progress/auditor 正交）· 轻档三模板 · cursor adapter 四片段——pack validate 全绿
- **`npm run fuyao:init`**（U2）：选包 → pack:import → 从 roster 自动生成 `.agents/plan-progress.yaml` 骨架（serial_order→work_items · 正交槽→p2 · m-done 里程碑）——骨架过 schema · 拒覆盖守卫（--force）· 裸名/路径双解析 · `--list` 列包；测试 21→24（骨架/拒覆盖/pack validate 三测）
- **`docs/product/get-started.md`**（U3）：15 分钟单人开箱教程——新人视角零协议文档依赖；实测 12 分钟（骨架 <1 · 修订 2 · 主链 5 · 核验 3 · 收口 1）
- **dogfood-lite 关仓**（U4）：新人视角实跑撞坑两个文档缺口当场修（dod-轻模板 wi-main 同款孤例 · strict 模式 traceability/identity-evidence 教学缺节）——实跑 13865af 三绿 strict

### Changed

- **dod-轻模板孤例清偿**（v0.37 修轻中时轻档漏网）：`wi-main` → wi-builder/wi-reviewer 分挂 + starter-solo pack 内拷贝同步——**全档 grep 验证零残留**（本次全档扫描：轻/轻中/中/中重/重/全流程六档示例 id 全对齐惯例）
- validate 47→48（starter-solo pack 入链）· 测试计数同步 README/README.en 21→24

## [0.37.0] - 2026-09-06

### Added

- **adopt shuijing 第 4 行**（产品接手 · 轻中档补矩阵轻端空白）：承诺出口域薄切片——Mock 评审链上验证 `ic-sole-commitment-exit`（唯一承诺出口：闭包 token 强制非主席不得裁决 · 硬锚定防评分-裁决悖论：blocked≥2 不得 go / 全 blocked 强制 no_go）
- **首个非 cursor adopt**：全程 **pi harness** 驱动——research/spec/auditor 三槽位独立 SDK AgentSession（v0.32.1 同款机制），gate=confirm 门操作者三项裁决（闭包封装 / 最小集 5 组 / 纯库无 CLI）
- adopt 三文档入库（scenario / close / vs-source）· 矩阵第 4 行（含 harness 维度列）· 接手仓 10/10 测试 + auditor verdict: pass + 三绿 strict

### Changed

- **R16 分段委派纪律收窄**（pi SDK headless + kimi-k2.6）：「槽位片段前缀 + ≥2 文件并读 + 长结构化产出」触发读后停滞（读完零 write · 末轮纯 thinking）——七轮对照探针定位后固化对策：**1 输入文件/段 + 骨架填空模板**（v0.33「限定输入」纪律再收窄：输入也须限 1）
- **dod-轻中模板修正**（顺手清偿）：`docs/templates/dod-轻中.yaml` 前 3 项 plan_refs 孤例 `m-done/wi-main` 改为 m-spec/m-impl 惯例（其余档早已如此）——轻中档 traceability strict 必挂的模板 bug 清偿

## [0.36.0] - 2026-09-05

### Added

- **langgraph runtime smoke 级实跑**（导出层首个 runtime 级证据）：`harness/langgraph/smoke/smoke.py` 参考实现——真实 LangGraph 1.2.11（Python 3.12）下读取 roster + mapping 组装 StateGraph，确定性 stub（不调 LLM）验证映射语义，6/6 断言 PASS（confirm 门 · serial 序 · 拓扑执行序 · outputs 键名 · 裁决续跑 · node 名集）
- dogfood-langgraph 场景 + 关仓（沙盒 git f81919a · 证据 run.json）

### Changed

- **R15 契约修订（本版核心发现）**：LangGraph 1.2.x 实测 `compile(interrupt_before=...)` + `invoke` 首跑不再中断（三形态探针）——confirm 门映射从「interrupt_before 该 node」修订为「node 内动态 `interrupt()` + `Command(resume=)` 续跑」；export-orchestration-mapping 公共映射表 + langgraph MAPPING 同步
- **证据级分层诚实化**：harness/README 状态表 langgraph 升「runtime smoke 级（v0.36 · 6/6 PASS · R15）」；crewai 维持文档级（未实跑 · smoke 待社区认领）——「二选一」实跑另一家不冒领

## [0.35.0] - 2026-09-05

### Added

- **qoder 挂载级实跑**（移植验证第四家）：Qoder CLI CN（`@qodercn-ai/qoderclicn`）headless + `.qoder/agents` 项目级 subagents——R11 远程跨机实跑形态（SSH + scp 落点同步 + WSL 三绿）、R12 frontmatter 能力面梯度（qoder model+tools+permissionMode 最强，五家对照表入 MAPPING）
- **claude 挂载级实跑**（移植验证第五家）：Claude Code print + `.claude/agents` subagents——**R13 第三方模型接入**（`ANTHROPIC_BASE_URL` → tokenrouter Anthropic 兼容端点 + 免费 glm-5.3-free，无 Anthropic 订阅跑通全链）、R14 confirm 门互动力（spec 子代理六项自曝式待确认 + 操作者逐项裁决）
- `harness/qoder/` + `harness/claude/` 四件套各一（README · MAPPING · example · 片段 ×4）
- dogfood-qoder / dogfood-claude 场景 + 关仓（Mac 远程 sandbox · git 存档）

### Changed

- **候选 harness 全数挂载级**：pi · dsh · cursor · qoder · claude 五家，同一 pack 零改动五家通吃——「换 harness 只换映射表」主张五家闭环

## [0.34.0] - 2026-09-05

### Added

- **cursor 挂载级实跑**（移植验证第三家 · 首家适配目录回归实证）：Cursor CLI（`agent` v2026.09.02）print 模式 + `.cursor/agents` subagents 委派全链——research/spec/auditor 产物均由子代理落盘，父会话只协调不代写
- dogfood-cursor 场景 + 关仓：v0.31 诚实降级（安装级）的欠账清偿；四类型 message（handoff / request-gate-confirm / audit）全实测过验
- MAPPING 增补（R8–R10）：readonly 维度挂载声明 · 挂载步骤由 install:cursor-agents 承担 · WSL 认证迁移路径 · print 委派形态

### Changed

- harness/README 证据级表：cursor 升「挂载级·CLI 委派（v0.34）」——三家（pi/dsh/cursor）全部挂载级

## [0.33.0] - 2026-09-05

### Added

- **dsh 薄适配 + 挂载级实跑**（移植验证第二家 · **北极星「移植」2/2 达标**）：`harness/dsh/` 四件套（README · MAPPING 差异维翻译 · mapping 示例 · 槽位片段 ×4）——dsh（DeepSeek Harness · pi 之上）的 `ctx.subagents` 委派通道承载扶摇槽位链
- dogfood-dsh 场景 + 关仓：headless 无头模式分段委派全链（research/spec/auditor 均为 spawn 子代理产出，父会话只协调不代写——`.dsh/sessions/` 会话日志实证 `subagent/descriptor`）；gate-confirm 人核 message（confirm 门降级形态 R7 实证）
- MAPPING 无头实跑任务设计约定（R5 反哺：结构化模板 + 限定输入）

### Fixed

- 幽灵命令 `check:openhands` 5 处文档引用清偿（step7/viii 场景与关仓、CHANGELOG——如实标注为 sandbox 本地脚本，仓内从未提供）
- OpenHands 适配 README 冻结标注（❄️ 无维护者环境，欢迎社区认领）
- harness/dsh/agents 片段「pi 常驻」主语残留修复（审计 N-1 回流：dsh continuable 正交槽位 + MAPPING 引用改 dsh）

### Changed

- harness/README 证据级表：pi 升「挂载级·真多实例」· dsh 升「挂载级·委派驱动 ✅ 移植 2/2」

## [0.32.1] - 2026-09-04

### Fixed

- **pi 挂载证据升级为真多实例**（round 2 补测）：3 个独立 SDK AgentSession（research/spec/auditor）fresh context、槽位片段开场、仅经 `.agents/` 落点通信——挂载级实证成立；round 1 单会话证据诚实降级为「单会话链级」并归档
- MAPPING 增补**共享落点写序**条款（plan-progress 多实例并发写须按 file-lock 声明 territory——来自 R3 写冲突活例）
- 关仓文档重写：证据等级演进表（round 1 vs round 2）+ R3 争用活例记录

## [0.32.0] - 2026-09-04

### Added

- **pi 薄适配 + 挂载级实跑**（移植验证第一家）：[harness/pi/](harness/pi/) 四件套（README · MAPPING 五维翻译 · mapping 示例 · 4 槽位 skill 片段）· [pi-harness-contract.md](docs/design/pi-harness-contract.md) · [dogfood-pi-harness 场景](docs/product/examples/dogfood-pi-harness-scenario.md) · [关仓](docs/product/examples/dogfood-pi-harness-close.md)——同一 pack 在 pi 下实跑完整链，`.agents/` 落点与 cursor 同构；message 文件实跑仓内首次（handoff + request 双类型）
- harness/README **证据级标注体系**（文档级/安装级/挂载级/runtime smoke 级）+ 五家实跑排期（pi ✅ · dsh · cursor 补测 · qoder · claude）+ openhands 冻结标注

## [0.31.0] - 2026-08-30

### Added

- `release:preflight` 四项机械化防呆（坑修复入机制）：第 0 步 cwd 断言（仓根 `package.json` name 校验）· 第 2.5 步发布守卫（私有文件未 tracked 断言 · 脱敏模式扫描 home/Users/mnt/Windows 用户路径/私钥/`.ssh`/token 前缀 · `.git/filter-repo` 残留标记检测）；新增 3 项回归测试（18 → 21）
- `architecture.md` 完整形态（v0.31）：arc42 裁剪九节 —— 系统上下文 · 能力域×层对齐 · 运行时视图（A 全流程七阶段 + 轻重伸缩 + B 并行争用 + C 换 harness）· 横切概念 · 编排协同总图（域 2 五份专题文档互链）· 决策与风险（roles.md 裁决归档）；capability-model 域 2「待扩」标注兑现

### Fixed

- `.github/repository-metadata.md` 脱敏清单自指用户目录字面量（被新扫描器抓出后改为占位描述）

## [0.30.0] - 2026-08-30

### Added

- Adopt C3 voyage：[adopt-voyage-scenario.md](docs/product/examples/adopt-voyage-scenario.md) · [close](docs/product/examples/adopt-voyage-close.md) · [vs-source](docs/product/examples/adopt-vs-source-voyage.md)
- identity `ic-zero-trust-approval`（双人批准 + Grant 在案 + fail-closed）· adopt 矩阵第 3 行（源仓零写入）

## [0.29.0] - 2026-08-28

### Added

- Adopt C2 shisui：[adopt-shisui-scenario.md](docs/product/examples/adopt-shisui-scenario.md) · [close](docs/product/examples/adopt-shisui-close.md) · [vs-source](docs/product/examples/adopt-vs-source-shisui.md)
- adopt-matrix 满 2 行（qingfu + shisui · 源仓零写入）

## [0.28.0] - 2026-08-28

### Added

- Adopt C1 qingfu-envoy：[adopt-qingfu-scenario.md](docs/product/examples/adopt-qingfu-scenario.md) · [close](docs/product/examples/adopt-qingfu-close.md) · [vs-source](docs/product/examples/adopt-vs-source-qingfu.md)
- adopt-matrix 填 qingfu 行（独立接手仓 · 源仓零写入）

## [0.27.0] - 2026-08-28

### Added

- Dogfood VIII：[dogfood-viii-scenario.md](docs/product/examples/dogfood-viii-scenario.md) · [close](docs/product/examples/dogfood-viii-close.md)（boundary-s7 · **s7 对抗启用**）
- OpenHands E2E lite：step7 关仓补 mapping smoke；sandbox 本地脚本（当时称 `check:openhands`，仓内从未提供，v0.33 清偿）

### Changed

- dogfood-matrix / playbook：全流程 s7 启用行
- step7 scenario/close：OpenHands 不再记 N/A

## [0.26.0] - 2026-08-28

### Added

- 发版纪律：[release-checklist.md](docs/product/examples/release-checklist.md) · `npm run release:preflight`
- Adopt 模型：[fuyao-adopt-playbook.md](docs/product/examples/fuyao-adopt-playbook.md) · [adopt-matrix-comparison.md](docs/product/examples/adopt-matrix-comparison.md)（源仓并行接手仓 · 占位行）
- 路线图 v0.26–v0.29（A 发版 · B s7/OH · C 产品 adopt）

## [0.25.0] - 2026-08-27

### Added

- Dogfood VII 全流程：[dogfood-vii-scenario.md](docs/product/examples/dogfood-vii-scenario.md) · [close](docs/product/examples/dogfood-vii-close.md)（grant-gate · 独立 sandbox · m-release 授权门）
- 矩阵对照补 **全流程** 档 · dogfood 矩阵满

## [0.24.0] - 2026-08-27

### Added

- Dogfood VI 中重：[dogfood-vi-scenario.md](docs/product/examples/dogfood-vi-scenario.md) · [close](docs/product/examples/dogfood-vi-close.md)（changelog-slice）
- 矩阵对照补 **中重** 桥接档

## [0.23.0] - 2026-08-27

### Added

- Dogfood V 轻中：[dogfood-v-scenario.md](docs/product/examples/dogfood-v-scenario.md) · [close](docs/product/examples/dogfood-v-close.md)（action-list）
- 官方 pack **triple harness**：cursor + cli + **openhands**（`pack_revision` 1.2.0）
- 矩阵对照增桥接档轻中节

### Changed

- dogfood-playbook · step7：triple harness 说明
- builder-guide：triple 安装路径

## [0.22.0] - 2026-08-27

### Added

- Dogfood playbook **完整 0–8 步**使用指南（路径 A/B/C · 命令速查）
- 步 7 专档：[dogfood-step7-scenario.md](docs/product/examples/dogfood-step7-scenario.md) · [close](docs/product/examples/dogfood-step7-close.md)
- `minimal-research-to-spec` 包内置 **CLI 第二 harness**（`pack_revision` 1.1.0）

### Changed

- builder-guide：双 harness 安装说明 · 链到完整 playbook

## [0.21.0] - 2026-08-27

### Added

- Dogfood IV 重档：[dogfood-iv-scenario.md](docs/product/examples/dogfood-iv-scenario.md) · [close](docs/product/examples/dogfood-iv-close.md)（audit-trail · 六阶段 · 三层审计）
- [dogfood-matrix-comparison.md](docs/product/examples/dogfood-matrix-comparison.md)（轻/中/重对照表）

### Changed

- dogfood-playbook · plan-research-spec-impl 示例：重档链与矩阵入口

## [0.20.0] - 2026-08-27

### Added

- Dogfood III 轻档范例：[dogfood-iii-scenario.md](docs/product/examples/dogfood-iii-scenario.md) · [close](docs/product/examples/dogfood-iii-close.md)（todo-strip）
- dogfood-playbook：轻档两阶段说明 · **sandbox 本地 only** 约定

### Changed

- `plan-progress.example.yaml`：轻/中 dogfood 模板交叉引用

## [0.19.0] - 2026-08-27

### Added

- Dogfood II 范例：[dogfood-ii-scenario.md](docs/product/examples/dogfood-ii-scenario.md) · [dogfood-ii-close.md](docs/product/examples/dogfood-ii-close.md)（reading-card · flow_weight=中）
- dogfood-playbook **六档模板绑定**节（v0.19+）；builder-guide 链入

### Changed

- `plan-progress.example.yaml` 注释：dogfood 时配对中档五模板

## [0.18.0] - 2026-08-27

### Added

- stage / commit-policy **六档**模板矩阵（与 DoD 同构）
- `audit-record` 可选 `score` / `score_max` / `scope` / `summary` / `evidence`；公开 fixture `tests/fixtures/audit-record-scored.audit.yaml`
- `check:identity` skip（无约束）与 advisory（非 fatal）测试

### Changed

- stage / commit-policy schema：嵌套 `additionalProperties: false`
- capability-model：已交付 P1 勾选；stage / commit-policy → ✅ v0.18
- templates README + builder-guide：档位矩阵入口

## [0.17.0] - 2026-08-26

### Added

#### 协议硬化

- plan-progress blockers：`evidence` · `status` · `related_identity_constraint_ids` 等（清身份 blocker 须留证）
- DoD `blocker_evidence_recorded`（六档 + pack）
- `npm run check:identity`（advisory / `--strict`；**不入 CI**）
- 官方 dogfood 剧本 [dogfood-playbook.md](docs/product/examples/dogfood-playbook.md)
- 阶段复盘 [v0.1-v0.16-retrospective.md](docs/product/examples/v0.1-v0.16-retrospective.md)

#### Eval 可选模块

- [eval-gates.md](docs/design/eval-gates.md) · 模板 `eval-gates-重.yaml`（默认 `enabled: false`）
- 重/全流程 DoD `eval_gates_reviewed`；auditor 提示对齐三门

### Changed

- identity-constraints / plan-progress-contract / audit / default-handoff：清除规则与证据核对
- capability-model §5 P2 Eval → ✅ v0.17 可选模块

## [0.16.0] - 2026-08-25

### Added

- 身份约束契约 [identity-constraints.md](docs/design/identity-constraints.md)（intent 品类/形态词不可裁剪）
- plan-progress / 问题陈述 / PRD-lite schema 可选 `identity_constraints`
- DoD checklist `identity_constraints_held`（六档 + pack）
- dogfood 教训 [identity-constraints-lesson.md](docs/product/examples/identity-constraints-lesson.md)

### Changed

- 审计 / confirm 门 / builder 指南：对照 intent + 身份约束，不得只看漂移规格
- Cursor 槽位 prompt（auditor · spec · progress）对齐身份约束

## [0.15.0] - 2026-08-25

### Added

- `pack export` / `pack import`（import ≡ install）· fork 元数据（`--id`）
- 导入/导出指南 [pack-import-export.md](docs/design/pack-import-export.md)
- `harness_adapters.cli` / `openhands` 可选字段（同 spec 换映射）

### Changed

- team-pack 契约与 packs README / Builder 指南对齐 v0.15
- ROADMAP / post-v01 / 0-1-path：v0.15 落地

## [0.14.0] - 2026-08-25

### Added

- 对抗/边界可选模块 `adversarial-boundary-全流程.yaml` + schema（默认关闭；可并入代码质量审计）
- CLI / OpenHands 适配深化 [cli-openhands-adapter.md](docs/design/cli-openhands-adapter.md)（编排 · delegation · 模型 · 争用）

### Changed

- `harness/cli` · `harness/openhands` MAPPING / mapping.example 对齐深化指南
- ROADMAP / post-v01 / 0-1-path：v0.14 落地

## [0.13.0] - 2026-08-25

### Added

- 反指标模板 `anti-metrics-重.yaml` + `template-anti-metrics.schema.json`
- skills 引用/绑定指南 [skills-binding.md](docs/design/skills-binding.md)
- 全流程 DoD 可选项 `anti_metrics_reviewed`

### Fixed

- `check:traceability --strict` 成功时输出 `(strict)` 而非误标 `(advisory)`

### Changed

- ROADMAP / post-v01 / 0-1-path：v0.13 落地；后续候选更新

## [0.12.0] - 2026-08-25

### Added

- ADR 回填：`docs/decisions/adr-0001`–`0004` + 索引 README
- `validate` 扫描 `docs/decisions/adr-*.yaml`
- 问题陈述模板 `problem-statement-中.yaml` + schema
- PRD-lite 模板 `prd-lite-重.yaml` + schema（重端可选 · 非全局权威）
- 示例链 [problem-prd-chain.md](docs/product/examples/problem-prd-chain.md)

### Changed

- ROADMAP / post-v01：v0.12 主题落地；v0.13 候选（反指标 · skills）

## [0.11.0] - 2026-08-25

### Added

- 六档 DoD 模板均含 `checklist[].plan_refs`（轻 · 轻中 · 中 · 中重 · 重 · 全流程）
- 追溯契约轻/重端表补齐六档联动说明

### Fixed

- Windows 下 `validate` 用 `basename` 识别模板（此前路径含 `\` 导致模板被 skip）

### Changed

- `docs/templates/README` · pack `dod.yaml` 注释对齐

## [0.10.0] - 2026-08-25

### Added

- roster 级 `model_policy`（`default` · `by_slot_kind` · `by_slot`）· [model-harness-contract.md](docs/design/model-harness-contract.md)
- `install:cursor-agents --roster`：按优先级合并 mapping / slot / policy
- 示例与 pack roster 含 `model_policy`
- 多 harness 映射文档引用统一解析优先级（CLI · OpenHands · LangGraph · CrewAI）

### Changed

- `npm test` 增至 10 项（含 `--roster` model_policy 解析）

## [0.9.0] - 2026-08-25

### Added

- 编排导出映射契约 [export-orchestration-mapping.md](docs/design/export-orchestration-mapping.md)
- LangGraph 薄适配 POC：`harness/langgraph/`（MAPPING · mapping.example · nodes 片段）
- CrewAI Flow/Crew 薄适配 POC：`harness/crewai/`（MAPPING · mapping.example · agents 片段）
- 示例 [orchestration-export-mapping.md](docs/product/examples/orchestration-export-mapping.md)

### Changed

- `harness/README` · ROADMAP · 产品后 v0.1 路线：P2 导出映射勾选完成

## [0.8.0] - 2026-08-23

### Added

- 追溯链契约 [traceability-contract.md](docs/design/traceability-contract.md)（意图→领域→任务）
- plan-progress `traceability` · `domain_concept_ids` · `dod_checklist_ids`
- DoD 模板 `checklist[].plan_refs`（里程碑/工作项双向联动）
- `npm run check:traceability`（本地 advisory · `--strict` 用于 dogfood）
- [plan-dod-traceability-chain.md](docs/product/examples/plan-dod-traceability-chain.md) 示例

### Changed

- dogfood 计划与 `dod-中` / pack `dod.yaml` 补全联动引用
- `npm test` 增至 9 项（含 traceability 校验）

## [0.7.0] - 2026-08-23

### Added

- team-pack `pack_revision` · `published_at` · `fork` 元数据
- roster `model_hint` · Cursor mapping `model_hints`（install 时写入 agent `model`）
- [model-harness-contract.md](docs/design/model-harness-contract.md)
- 治理模板：`adr-中` · `stage-轻` · `commit-policy-中`
- 调研→规格→实现示例链 · [research-spec-impl-chain.md](docs/product/examples/research-spec-impl-chain.md)

## [0.6.0] - 2026-08-22

### Added

- progress · auditor harness 片段：`harness/cli/runners/` · `harness/openhands/agents/`
- `check:contention` 与 `progress.active_work_item_ids` 联动（active territory 重叠 · 脏文件跨领地）

### Changed

- 设计文档验收项收口（composition · escalation · plan-progress · capability-model 索引）
- `0-1-path` 阶段 ⑥ 标记完成

## [0.5.0] - 2026-08-22

### Added

- plan-progress `work_items[].territory` schema 字段 + 示例
- `check:contention` territory 重叠检测
- CLI runner 片段：`harness/cli/runners/`
- OpenHands agent 片段：`harness/openhands/agents/`
- CI：`check:contention --strict` 门禁步骤

### Changed

- v0.4 审计文档对齐（README · product 索引 · domain-language）

## [0.4.0] - 2026-08-22

### Added

- Message 校验：`agents/examples/messages/` · 可选 `.agents/messages/`
- `npm run check:contention` — git 脏文件 + 并行 roster 顾问报告
- [file-lock-contract.md](docs/design/file-lock-contract.md)
- OpenHands 薄适配 POC：`harness/openhands/`

## [0.3.1] - 2026-08-22

### Changed

- **审计记录改为本地私有**：自 `docs/audit/` 移除具体报告；维护者使用 `.agents/audit/`（已 `.gitignore`）
- 公开保留：`docs/audit/README.md` · `audit-record.schema.json` · 审计设计文档

## [0.3.0] - 2026-08-22

### Added

- `flow_weight` 扩展模板：轻中 · 中重 · 重 · 全流程（dod / verification / ddd-gate）
- CLI harness 薄适配 POC：`harness/cli/MAPPING.md` · `mapping.example.yaml`
- [escalation-protocol.md](docs/design/escalation-protocol.md)
- roster `orchestration.contention_policy`
- plan-progress `progress.messages_dir`

## [0.2.0] - 2026-08-22

### Added

- 团队包：`team-pack.schema.json` · `packs/minimal-research-to-spec` · `npm run pack` / `pack:install`
- 槽位消息协议：`message.schema.json` · [message-protocol.md](docs/design/message-protocol.md)
- `validate` 扫描 pack 清单与 `packs/*/examples/` 消息示例
- `install-cursor-agents --agents-dir`（pack 内 agents 安装）

### Changed

- 技能 **不同步到 harness** — 留在 `agents/packs/<id>/skills/`；仅 agents 写入 `.cursor/agents/`
- Builder 指南更新至 v0.2

### Fixed

- CI：`pack install` 测试先创建 `.scratch/` 再 `mkdtemp`

## [0.1.0] - 2026-08-22

### Added

- 产品文档：问题陈述、北极星、交付模式、能力模型、0→1 路径
- 设计契约：编制协议、默认 handoff、计划进度、验证/审计随 flow_weight、领域语言
- JSON Schema：roster、plan-progress、dod、verification、ddd-gate、audit-record
- 模板族：`dod` · `verification` · `ddd-gate`（轻/中）
- 校验与测试：`npm run validate`、`npm test`
- Cursor 薄适配 POC：`harness/cursor/` + `install:cursor-agents`
- 示例：minimal-roster、plan-progress
- CI：`.github/workflows/validate.yml`
- 审计：交付审计、修复复验、100/100 发布审计

### Notes

- **不做 harness** — `harness/` 仅为薄适配
- **无固定官方编制** — `agents/examples/` 可删改

[0.8.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.8.0
[0.7.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.7.0
[0.6.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.6.0
[0.5.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.5.0
[0.4.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.4.0
[0.3.1]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.3.1
[0.3.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.3.0
[0.2.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.2.0
[0.1.0]: https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.1.0
