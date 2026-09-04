# pi / dsh 薄适配契约

> **状态：v0.32 设计** · 能力模型 §8  
> 适配目录：[harness/pi/](../../harness/pi/) · [harness/dsh/](../../harness/dsh/)

## 边界

| 做 | 不做 |
|----|------|
| 槽位 → pi 会话实例/skill 片段映射 | 实现 pi runtime / IDE |
| orchestration → tmux/多终端编排**约定** | 自动化实例编排器 |
| 正交槽位 → 常驻独立实例语义 | dsh subagent 通道的插件实现（dsh 生态自备） |
| model_hint → `--provider/--model` 翻译表 | 框架侧调 LLM |

## pi 形态要点（2026-09 核）

- pi **无内置 subagent**（官方哲学：No sub-agents）；多实例靠 tmux / extensions / SDK `createAgentSession`
- pi 有 skills + AGENTS.md 惯例 → 扶摇槽位片段以 **skill 形态** 落项目
- 落点契约：`.agents/plan-progress.yaml` + `.agents/messages/<roster_id>/` 与 cursor 适配**完全一致**（spec 不变的验证点）

## 五维翻译（权威表在 harness/pi/MAPPING.md）

slots → 会话角色 · serial/parallel → 实例顺序/并行 · orthogonal → 常驻实例 ·
gate_level → 人控确认流 · model → 启动参数。

## dsh 形态（v0.33 交付）

dsh = pi 之上的 DeepSeek Harness（subagent 通道：`ctx.subagents.start()` / continuable）。
扶摇翻译：**正交槽位 → continuable subagent**（推进/审计后台常驻）；model 路由对接
dsh-subagent-router 的 `model: auto` 策略（其分级 trivial/standard/complex 与
model_hint fast/quality 同构可翻译）。详细映射表随 v0.33 落 `harness/dsh/MAPPING.md`。

## 与既有适配关系（五家全数挂载级 · v0.32–v0.35 实跑收敛）

| 适配 | 形态 | 实跑状态 |
|------|------|---------|
| cursor | install 脚本 + subagents + CLI print | **挂载级（v0.34 · CLI 委派）** |
| **pi** | skill 片段 + 编排约定 | **挂载级（v0.32.1 · 真多实例首家）** |
| **dsh** | pi + subagent 通道 | **挂载级（v0.33 · 委派驱动）** |
| **qoder** | `.qoder/agents/` 项目级 + headless | **挂载级（v0.35 · Mac 远程）** |
| **claude code** | `.claude/agents/` + 第三方模型接入 | **挂载级（v0.35 · tokenrouter 无订阅形态）** |
| openhands | 文档级 | ❄️ 冻结（无维护者环境） |
| langgraph / crewai | 导出映射 | runtime smoke v0.36（导出形态，非挂载目标） |

> 同一 pack（minimal-research-to-spec）零改动五家通吃——「换 harness 只换映射表」五家实证。
> 五家 frontmatter 能力面梯度与实跑发现（R1–R14）见各家 MAPPING 与 dogfood 关仓文档。

## 验收

- [x] 本契约 + harness/pi/ 四件套（v0.32）
- [x] harness/dsh/ 四件套 + subagent 通道翻译（v0.33）
- [x] cursor/qoder/claude 挂载级实跑（v0.34–v0.35 · 五家收敛）
