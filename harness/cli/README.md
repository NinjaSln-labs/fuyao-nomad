# CLI 适配

> **状态：v0.14 文档深化** — [MAPPING.md](./MAPPING.md) · [cli-openhands-adapter.md](../../docs/design/cli-openhands-adapter.md)

命令行 harness **薄适配**：映射表、编排/模型/争用语义与加载流程说明，**不实现** CLI runtime。

- Cursor 仍是主要可安装 POC：`npm run install:cursor-agents`
- CLI：用户自备编排器，按 `mapping.yaml` 解释 roster
