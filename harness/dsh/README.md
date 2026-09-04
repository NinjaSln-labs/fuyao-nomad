# dsh 薄适配

> **状态：v0.33 · 挂载级实跑**（移植验证第二家 · 北极星「移植」达标版）  
> dsh = [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)，构建在 **pi 之上**的 profile/plugin 层 harness。  
> 设计契约：[pi-harness-contract.md](../../docs/design/pi-harness-contract.md)

与 pi 适配（单人直接驱动）的差异：dsh 有 **subagent 委派通道**（`ctx.subagents`：
`subagent` / `subagent_fork` 工具 · one-shot 与 continuable 两种子代理形态 · 多提供方共存）——
扶摇的**槽位委派可自动化驱动**，无需人肉切终端。

| 项 | 值 |
|----|-----|
| **适配形态** | mapping + 槽位片段 + 委派任务模板（父会话按片段委派子代理） |
| **主链槽位** | one-shot 子代理（串行：research 完 → spec 续） |
| **正交槽位** | continuable 子代理（progress / auditor 持续会话，可追加跟进） |
| **无头实跑** | `dsh --profile headless "<任务>"` 一次性模式（退出码 0/1） |
| **模型路由** | 委派时可指定 provider/model（dsh-subagent-router `auto` 策略与 model_hint 同构翻译） |
| **安装** | 无脚本 — 片段与任务模板由父会话读取 |

## 与 pi / cursor 对比

| 项 | pi | **dsh** | cursor |
|----|-----|---------|--------|
| 委派机制 | 无（人肉多实例） | **subagent 通道（自动）** | subagents（自动） |
| 正交槽位 | 常驻终端实例 | **continuable 子代理** | 旁路 subagent |
| 落点 | `.agents/` 同构 | **`.agents/` 同构** | `.agents/` 同构 |
| 实跑证据 | 挂载级（v0.32.1） | 挂载级（v0.33） | 安装级 |

换 harness 只换映射表，不换 roster / pack。
