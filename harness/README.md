# Harness 薄适配

将扶摇 · Nomad **挂载**到现有运行时（Cursor、CLI 等）。

## 边界

| 做 | 不做 |
|----|------|
| 槽位 → 运行时 agent 映射 | 构建 harness / IDE |
| 上下文注入、技能发现 | 替代 Cursor Agent / OpenHands |
| 团队包加载 | 与 harness 核心逻辑竞争 |

## 原则

- 团队 spec（roster、交接、DoD）**不依赖**某一 harness
- 换 harness 只换映射表，不换团队包
- 本层是**适配**，不是扶摇的产品目标

| 目录 | 目标 | 状态 |
|------|------|------|
| `cursor/` | Cursor IDE | 待建 |
| `cli/` | 命令行 | 待建 |
