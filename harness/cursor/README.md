# Cursor 适配

将扶摇 · Nomad 接入 Cursor IDE。

## 挂载点

- **Rules** — 全局与项目级行为约束
- **Skills** — 可发现、可触发的技能
- **Hooks** — 会话生命周期钩子
- **MCP** — 外部工具与服务

## 待办

- [x] 角色 → Cursor subagent 映射（POC）
- ~~技能同步脚本~~ — **不做**：技能 harness 无关，**不同步**到 `.cursor/skills` 或任何 harness 路径；仅 agents 经 mapping 安装
- [x] roster → `.cursor/agents/` 安装脚本（`npm run install:cursor-agents` / `pack:install`）

详见 [MAPPING.md](./MAPPING.md)。
