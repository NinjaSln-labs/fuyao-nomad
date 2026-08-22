# Cursor 适配

将扶摇 · Nomad 接入 Cursor IDE。

## 挂载点

- **Rules** — 全局与项目级行为约束
- **Skills** — 可发现、可触发的技能
- **Hooks** — 会话生命周期钩子
- **MCP** — 外部工具与服务

## 待办

- [x] 角色 → Cursor subagent 映射（POC）
- [ ] 技能同步脚本（`skills/` → `.cursor/skills`）— P1
- [x] roster → `.cursor/agents/` 安装脚本（`npm run install:cursor-agents`）

详见 [MAPPING.md](./MAPPING.md)。
