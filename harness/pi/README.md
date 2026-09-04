# pi 薄适配

> **状态：v0.32 · 挂载级实跑**（移植验证第一家）  
> [pi](https://www.npmjs.com/package/@earendil-works/pi-coding-agent) 是 AI coding assistant CLI（read/bash/edit/write 工具 + extensions + skills）。  
> 设计契约：[pi-harness-contract.md](../../docs/design/pi-harness-contract.md)

pi 无内置 subagent（官方哲学：No sub-agents — 以 tmux 多实例 / extensions / SDK spawn 替代）。
本适配把扶摇槽位翻译为 **pi 会话实例 + skill 载体** 的编排约定，**不实现** runtime。

| 项 | 值 |
|----|-----|
| **适配形态** | mapping + 槽位 skill 片段 + 编排约定（tmux/多终端） |
| **正交槽位** | 独立 pi 实例常驻（progress / auditor） |
| **安装** | 无脚本 — skill 片段复制或 symlink 到项目 skill 目录 |
| **模型** | `--provider/--model` 启动参数；翻译见 [MAPPING.md](./MAPPING.md) |

## 与其他适配对比

| 项 | cursor | **pi** |
|----|--------|--------|
| 运行时 | `.cursor/agents/*.md` subagents | pi 会话实例（人/脚本驱动） |
| 并行 | `/multitask` | tmux panes / 多终端实例 |
| 正交槽位 | 旁路 subagent | 常驻独立实例 |
| 安装脚本 | `install:cursor-agents` | **无**（复制 skill 片段） |

换 harness 只换映射表，不换 roster / pack。
