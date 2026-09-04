# pi 薄适配 · 映射

> **状态：v0.32**  
> roster 为 harness 无关源；本目录仅 **映射表 + 槽位片段 + 编排约定**，不实现 runtime。

## 文件布局

| 扶摇 | pi |
|------|-----|
| roster（`packs/*/roster.yaml`） | 编排输入（本仓不读，人/脚本按约定展开） |
| [mapping.yaml](./mapping.example.yaml) | 槽位 id → skill 片段名 |
| `agents/` | 各槽位 prompt 片段（skill 形态，可复制到项目） |

## 五维翻译表

| 扶摇语义 | pi 翻译 |
|----------|---------|
| `slots[].id` | 会话实例角色（人开终端或脚本 spawn；命名 `fuyao-<slot>`） |
| `orchestration.mode=serial` + `serial_order` | 按序切换/交接活动实例（tmux 顺序窗格或串行会话） |
| `orchestration.mode=parallel` + `parallel_groups` | tmux 并行 panes / 多终端实例（实际并行度由用户管理） |
| `orthogonal_slots`（progress · auditor） | **常驻独立实例**（与主链并行，随时可介入） |
| `handoff` / messages | `plan-progress.progress.handoff_snippet` + `.agents/messages/<roster_id>/`（落点同 cursor） | 
| **共享落点写序** | plan-progress 为共享可变落点：多实例并发写须按 [file-lock-contract](../../docs/design/file-lock-contract.md) 声明 territory 归属；写冲突活例见 [dogfood-pi-harness-close](../../docs/product/examples/dogfood-pi-harness-close.md) R3 |
| `gate_level: confirm` | 暂停待人确认（人在主控终端执行确认后继续） |
| `model_policy` / `model_hint` | 实例启动参数 `--provider` / `--model`（优先级同 [model-harness-contract](../../docs/design/model-harness-contract.md)） |
| `check:contention` | 扶摇侧跑（`npm run check:contention`），不进 pi |

## 映射表示例

见 [mapping.example.yaml](./mapping.example.yaml) — 与 minimal-research-to-spec 四槽对齐。

## 加载流程（约定）

1. 读 roster `slots[].id` 与 `orchestration`
2. 查 mapping 得槽位片段名；把 `agents/<name>.md` 复制/symlink 到项目（或作为会话开场 prompt 粘贴）
3. 按 `serial_order` / `parallel_groups` 开实例（tmux 建议：主链一窗格一槽，正交槽常驻底窗格）
4. handoff 载体与落点与 cursor 适配**完全一致**（`.agents/` 结构不变 — 这是「spec 不变」的验证点）
5. 模型：按上表翻译启动参数

## 与 dsh 的关系

dsh 是 pi 之上的 DeepSeek Harness（subagent 通道），适配见 [harness/dsh/](../dsh/)。
pi 适配是 **单人直接驱动**形态；dsh 是 **委派自动驱动**形态 — 同一 roster 两种挂载。

## 验收（v0.32）

- [x] README · MAPPING · mapping.example · 槽位片段 ×4
- [x] sandbox 实跑：minimal-research-to-spec「调研→规格」链在 pi 下全通（落点与 cursor 同构）
- [x] roster / pack 零改动
- [x] **round 2 多实例补测（v0.32.1）**：3 个独立 SDK AgentSession（research/spec/auditor）fresh context、片段开场、仅经 `.agents/` 落点通信——挂载级实证成立；round 1 单会话证据降级为「单会话链级」归档
