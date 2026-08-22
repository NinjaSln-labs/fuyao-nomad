# 技能

可移植的技能单元，与 harness 无关。

每个技能一个子目录，遵循标准结构：

```
skills/<skill-name>/
├── SKILL.md        # 技能说明与触发条件
├── references/     # 参考文档（可选）
└── scripts/        # 辅助脚本（可选）
```

Harness 适配层负责将技能挂载到具体运行时（如 Cursor Skills、MCP、CLI）。

**不提供** `skills/` → `.cursor/skills` 同步脚本：扶摇只维护 harness 无关的 `skills/`；`pack:install` 会把包内技能合并到项目 `skills/`。IDE 如何发现技能，由 harness/用户配置。

示例：[audit-readonly/README.md](./audit-readonly/README.md)
