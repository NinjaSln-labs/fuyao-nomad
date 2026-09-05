# 路线图 · Roadmap

> 与 [post-v01-roadmap.md](docs/product/post-v01-roadmap.md) 同步。

## 已完成

### v0.39.0（2026-09-06）

- 外部信任面四单元：**英文核心 5 份** · **schema `$id` 语义化**（五核心 /v1 · 11 模板 /v1-template · ADR-0006 · schema-stability.md · 零破坏切换实测）· **CONTRIBUTING 首贡献路径 + 3 issue 模板** · 导航全链同步

### v0.38.0（2026-09-06）

- 单人开箱四单元：**starter-solo 包**（轻档 3+2 槽）· **`fuyao:init`**（选包→安装→骨架 · 测试 21→24）· **get-started 15 分钟教程**（实测 12 分钟）· **dogfood-lite 新人实跑**（三绿 strict · 两个文档缺口当场修）
- dod-轻模板 wi-main 孤例清偿（v0.37 轻中档同 bug 漏网——全档 grep 零残留）
- [关仓](docs/product/examples/dogfood-solo-lite-close.md) · [get-started](docs/product/get-started.md)

### v0.37.0（2026-09-06）

- adopt shuijing 第 4 行（轻中档补矩阵轻端）：**pi harness 全程驱动**（首个非 cursor adopt · research/spec/auditor 三槽位独立 SDK AgentSession）· ic-sole-commitment-exit（唯一承诺出口 + 硬锚定双不变量机器验证 · TDD v0 首跑红为违规证据）
- **R16 分段纪律收窄**：headless 委派「1 输入文件/段 + 填空模板」（多文件并读触发读后停滞 · 七轮对照探针定位）
- dod-轻中模板示例 id 修正（m-done/wi-main → m-spec/m-impl 惯例对齐，顺手清偿）
- [场景](docs/product/examples/adopt-shuijing-scenario.md) · [关仓](docs/product/examples/adopt-shuijing-close.md) · [vs-source](docs/product/examples/adopt-vs-source-shuijing.md)

### v0.36.0（2026-09-05）

- langgraph runtime smoke（首个 runtime 级证据）：真实 LangGraph 1.2.11 下组图消费 mapping，6/6 断言 PASS · **R15 发现与契约修订**（`interrupt_before` 在 1.2.x 失效 → confirm 门改动态 `interrupt()` + `Command(resume=)`）· crewai 文档级对照标注
- [场景](docs/product/examples/dogfood-langgraph-harness-scenario.md) · [关仓](docs/product/examples/dogfood-langgraph-harness-close.md)

### v0.35.0（2026-09-05）

- qoder + claude 挂载级实跑（第四/五家 · Mac 远程直测）：候选 harness 全数挂载级（五家零改动通吃）· R11 远程形态/R12 能力面梯度/R13 claude 第三方模型接入/R14 confirm 门互动力
- [qoder 场景](docs/product/examples/dogfood-qoder-harness-scenario.md) · [关仓](docs/product/examples/dogfood-qoder-harness-close.md) · [claude 场景](docs/product/examples/dogfood-claude-harness-scenario.md) · [关仓](docs/product/examples/dogfood-claude-harness-close.md)

### v0.34.0（2026-09-05）

- cursor 挂载级实跑（第三家 · 回归实证）：CLI print 委派全链 + R8 readonly 维度/R9 WSL 认证/R10 print 委派三发现入 MAPPING
- [场景](docs/product/examples/dogfood-cursor-harness-scenario.md) · [关仓](docs/product/examples/dogfood-cursor-harness-close.md)

### v0.33.0（2026-09-05）

- dsh 挂载级实跑（移植验证第二家 · **北极星移植 2/2 达标**）：ctx.subagents 委派驱动全链 + headless 无头分段形态 + R5/R6/R7 三发现反哺 MAPPING
- OpenHands 冻结标注 + 幽灵命令 `check:openhands` 5 处清偿
- [场景](docs/product/examples/dogfood-dsh-harness-scenario.md) · [关仓](docs/product/examples/dogfood-dsh-harness-close.md)

### v0.32.1（2026-09-04）

- pi 薄适配 + **挂载级实跑·真多实例**（移植验证第一家）：3 独立 SDK AgentSession 仅经 `.agents/` 落点通信；round 1 单会话证据诚实降级归档；R3 写冲突活例 → MAPPING 增补共享落点写序

### v0.32.0（2026-09-04）

- pi 薄适配四件套 · [pi-harness-contract](docs/design/pi-harness-contract.md) · dogfood 场景/关仓 · harness/README 证据级标注体系
- harness/README 证据级标注体系（文档级/安装级/挂载级/runtime smoke 级）+ 五家实跑排期 + openhands 冻结标注
- message 文件实跑仓内首次（handoff + request 双类型落盘）

### v0.31.0（2026-08-30）

- 发版纪律机械化：`release:preflight` 四项防呆（cwd 断言 · 私有未 tracked · 脱敏扫描 · filter-repo 标记）· 测试 18→21
- `architecture.md` 完整形态（arc42 裁剪九节 · 运行时视图 A/B/C · 编排协同总图）· capability-model 域 2「待扩」兑现
- roles.md 裁决归档（官方固定角色表方向早已否决）

### v0.30.0（2026-08-30）

- Adopt C3：Voyage 接手仓 + vs-source（ic-zero-trust-approval）· adopt 矩阵第 3 行

### v0.29.0（2026-08-28）

- Adopt C2：shisui 接手仓 + vs-source；adopt 矩阵 ≥2

### v0.28.0（2026-08-28）

- Adopt C1：qingfu-envoy 接手仓 + vs-source（源仓零写入）

### v0.27.0（2026-08-28）

- Dogfood VIII：boundary-s7 · s7 对抗模块启用
- OpenHands E2E lite（mapping smoke）

### v0.26.0（2026-08-28）

- 发版纪律：release-checklist · `release:preflight`
- Adopt 模型：playbook + 矩阵壳（源仓并行接手仓）
- 主计划 v0.26–v0.29 启动

### v0.25.0（2026-08-27）

- Dogfood VII 全流程 grant-gate · 独立 sandbox · m-release 授权门
- dogfood 矩阵满（六档 + 桥接 + 全流程）

### v0.24.0（2026-08-27）

- Dogfood VI 中重 changelog-slice

### v0.23.0（2026-08-27）

- Dogfood V 轻中 · pack triple harness 1.2.0

### v0.22.0（2026-08-27）

- Dogfood playbook 完整 0–8 步 · 步 7 CLI 双 harness
- minimal-research-to-spec pack_revision 1.1.0

### v0.21.0（2026-08-27）

- Dogfood IV：audit-trail · flow_weight=重 · 六阶段 · 三层审计
- dogfood 轻/中/重矩阵对照表

### v0.20.0（2026-08-27）

- Dogfood III：todo-strip · flow_weight=轻 五模板实跑
- playbook：轻档两阶段 · sandbox 本地 only

### v0.19.0（2026-08-27）

- Dogfood II：reading-card sandbox · flow_weight=中 五模板实跑
- dogfood-playbook 六档模板绑定节 · dogfood-ii 场景/关仓范例

### v0.18.0（2026-08-27）

- stage / commit-policy 六档模板矩阵
- audit-record 可选评分字段 · identity skip/advisory 测试
- capability-model 已交付 P1 勾选对齐

### v0.17.0（2026-08-26）

- 协议硬化：blocker evidence · `check:identity` · dogfood 剧本 · 复盘
- Eval 三门禁可选模块（默认关闭）

### v0.16.0（2026-08-25）

- 身份约束（`identity_constraints` · DoD · 审计/confirm）
- dogfood 教训沉淀（一句话品类词不可裁剪）

### v0.15.0（2026-08-25）

- 团队包 `export` / `import` + fork 元数据
- 同 spec 换映射指南 [pack-import-export.md](docs/design/pack-import-export.md)
- `harness_adapters` 支持可选 cli / openhands

### 更早

见 [CHANGELOG.md](CHANGELOG.md)

## 后续

| 版本 | 主题 | 状态 |
|------|------|------|
| **v0.26** | 发版纪律 + adopt 模型 | ✅ |
| **v0.27** | B s7 可选模块 + OpenHands E2E | ✅ |
| **v0.28** | C1 qingfu-envoy 接手仓 + 源仓对比 | ✅ |
| **v0.29** | C2 shisui 接手仓 + adopt 矩阵 | ✅ |
| **v0.30** | C3 voyage 接手仓 · adopt 矩阵 ≥3 | ✅ |
| **v0.31** | 发版防呆机械化 + 架构概览完整形态 | ✅ |
| **v0.32** | pi 薄适配 · 挂载级实跑·真多实例（移植验证第一家） | ✅ |
| **v0.33** | dsh 薄适配 · 委派驱动挂载级（第二家 · 北极星移植 2/2）· OpenHands 冻结 | ✅ |
| **v0.34** | cursor 挂载级回归实证（第三家 · CLI 委派） | ✅ |
| **v0.35** | qoder + claude 挂载级（第四/五家 · Mac 远程直测）· 候选五家全数收敛 | ✅ |
| **v0.36** | langgraph runtime smoke（首个 runtime 级证据 · R15 契约修订）· crewai 文档级对照 | ✅ |
| **v0.37** | adopt shuijing 第 4 行（轻中 · pi harness 首个非 cursor）· R16 分段纪律 · dod-轻中模板修正 | ✅ |
| **v0.38** | 单人开箱：starter-solo + fuyao:init + get-started + dogfood-lite | ✅ |
| **v0.39** | 外部信任面：英文核心 ×5 · schema $id /v1 与 /v1-template（ADR-0006）· 首贡献路径 + issue 模板 | ✅ |
| P2 | 包市场等 | 非默认 |

详版主计划（本地 `docs/plans/`，**不入库**）· 公开摘要见上表与 [CHANGELOG](CHANGELOG.md)

## 里程碑

```
v0.28.0 ✅ qingfu adopt → v0.29.0 ✅ shisui adopt → v0.30.0 ✅ voyage adopt
→ v0.32–v0.35 ✅ 五家 harness 挂载级（pi · dsh · cursor · qoder · claude）· 移植主线收敛
→ v0.36.0 ✅ langgraph runtime smoke（导出层首个 runtime 级证据 · R15 契约修订）
→ v0.37.0 ✅ adopt shuijing 第 4 行（pi harness 全程驱动 · 轻中档 · R16）
→ v0.38.0 ✅ 单人开箱（starter-solo · fuyao:init · get-started · dod-轻孤例全档清偿）
→ v0.39.0 ✅ 外部信任面（英文核心 ×5 · $id 语义化 · 首贡献路径）
```

## 不做

- 编排引擎 / 新 harness runtime
- `check:traceability` / `check:identity` 入 CI
- 团队包市场 · Jira/Linear · Eval 默认开启
- 框架侧自动 NLP 抽身份词 / 强制调 LLM

## 原则

不做 harness · 技能不进 harness · 审计本地私有 · **不做** 编排 runtime

---

*Last updated: 2026-08-30*
