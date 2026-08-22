# 技能

可移植的技能单元，**与 harness 完全分离**。

每个技能一个子目录，遵循标准结构：

```
skills/<skill-name>/
├── SKILL.md        # 技能说明与触发条件（推荐）
├── README.md       # 或简要说明
├── references/     # 参考文档（可选）
└── scripts/        # 辅助脚本（可选）
```

## 原则

- 技能只存在于 **harness 无关** 路径（项目 `skills/` 或团队包内 `agents/packs/<id>/skills/`）。
- **不同步到 harness** — 不写 `.cursor/skills`、不写 `harness/` 下技能目录。
- roster 用路径 **引用** 技能（如 `agents/packs/<id>/skills/audit-readonly`），不由安装脚本把技能「挂进」IDE。
- 各 harness 如何发现、加载这些路径，由运行时或用户自行配置；扶摇不提供技能→harness 同步。

团队包安装（`pack:install`）只复制整包到 `agents/packs/<id>/`（含包内 `skills/`），**仅** Cursor **agents** 经薄适配写入 `.cursor/agents/`。

示例：[audit-readonly/README.md](./audit-readonly/README.md)
