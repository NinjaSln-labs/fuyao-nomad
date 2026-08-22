# 团队包（Packs）

可发布、可安装的完整团队规格。见 [docs/design/team-pack.md](../docs/design/team-pack.md)。

## 官方包

| 包 | flow_weight | 说明 |
|----|-------------|------|
| [minimal-research-to-spec](./minimal-research-to-spec/) | 中 | 调研 → 规格 + 推进/审计 |

## 命令

```bash
npm run pack -- validate packs/minimal-research-to-spec
npm run pack:install -- --pack packs/minimal-research-to-spec --project /path/to/project
```

安装后：`agents/packs/<id>/`（含包内 `skills/`）· `.cursor/agents/` **仅 agents**（若有 Cursor 适配）。技能 **不同步** 到 harness。
