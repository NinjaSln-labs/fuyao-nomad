# CLI / OpenHands 薄适配深化

> **状态：v0.14** · 能力模型 §8 P1  
> 适配目录：[harness/cli/](../../harness/cli/) · [harness/openhands/](../../harness/openhands/)  
> 模型契约：[model-harness-contract.md](./model-harness-contract.md)

## 目标

把 CLI 与 OpenHands 的映射说明补齐到与 Cursor **同构的语义深度**（编排 · handoff · 模型 · 争用），仍 **不实现** runtime、**不提供** 安装脚本。

## 公共布局

```
harness/<cli|openhands>/
  README.md
  MAPPING.md              # 语义与加载流程（权威）
  mapping.example.yaml    # 槽位 id → 运行时名 + 可选 model_hints
  runners/ | agents/      # 角色 prompt 片段
```

| 扶摇 | CLI | OpenHands |
|------|-----|-----------|
| `slots[].id` | runner 名 | agent / delegate 名 |
| `orchestration.serial_order` | 子命令/进程顺序 | 委派链顺序 |
| `orchestration.mode=parallel` | 进程池 / 任务队列 | 并行 delegate（runtime） |
| `orthogonal_slots` | 旁路 runner（progress · auditor） | 旁路 agent / 独立委派 |
| `handoff` / messages | 文件或 stdout 约定 | 委派 payload / 状态文件 |
| `plan-progress` | 外挂 YAML 路径 | 同左 |
| `gate_level: confirm` | 人工确认后继续 | HITL / pause |
| `model_policy` / hints | env 或 runner 配置 | agent LLM 配置 |
| `check:contention` | **扶摇侧**顾问 | 同左 |

## 模型提示翻译

优先级与 Cursor 相同（见 model-harness-contract）。CLI / OpenHands **无** `install:cursor-agents`，由用户侧读取：

| 来源 | 建议翻译 |
|------|----------|
| `mapping.model_hints[slot]` | 写入 runner/agent 配置或 `FUYAO_MODEL_<SLOT>` |
| `slots[].model_hint` | 同上（低于 mapping） |
| `model_policy.*` | 团队默认；映射到 runtime 默认模型别名 |

示例环境变量约定（非强制）：

```
FUYAO_MODEL_DEFAULT=inherit
FUYAO_MODEL_RESEARCH=fast
FUYAO_MODEL_AUDITOR=inherit
```

## OpenHands 委派（delegation）

与 [OpenHands Agent Delegation](https://docs.openhands.dev/sdk/guides/agent-delegation) 对齐的**语义映射**（示意，非 SDK 绑定）：

| 扶摇 | OpenHands 侧（示意） |
|------|----------------------|
| 主槽位（serial 当前） | 当前执行 agent |
| `handoff` 到下一槽 | delegate / 移交目标 agent |
| `orthogonal_slots` | 可并行或事件触发的旁路 agent |
| `gate_level: confirm` | 暂停委派，待用户确认 |
| message 文件 | 委派输入/输出载体之一 |

换 OpenHands 版本或 API 时只改映射与片段，**不改** roster。

## CLI 编排（示意）

1. 读 roster → 得 `serial_order` / `parallel_groups`
2. 查 `mapping.yaml` → runner 可执行入口名
3. 按顺序或并行调用；handoff 写入 `.agents/plan-progress.yaml` 或 `.agents/messages/`
4. progress / auditor 不插入主链时按 `orthogonal_slots` 旁路调度
5. 争用：变更文件前可跑 `npm run check:contention`

## Builder 检查清单

- [ ] `mapping.example.yaml`（或项目 mapping）覆盖 roster 全部 `slots[].id`
- [ ] 可选 `model_hints` 与 roster `model_policy` 无冲突说明
- [ ] handoff / plan-progress 路径在 runner|agent 片段中有引用
- [ ] **未**把技能同步进 harness 目录
- [ ] **未**引入扶摇侧 CLI/OpenHands 安装或 runtime 代码

## 不做

- `install:cli-agents` / `install:openhands` 类脚本
- OpenHands / 任意 CLI 的进程编排实现
- 框架内调 LLM
