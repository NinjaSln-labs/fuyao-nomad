# 团队包（Packs）

可发布、可安装的完整团队规格。见 [team-pack.md](../docs/design/team-pack.md) · [pack-import-export.md](../docs/design/pack-import-export.md)。

## 官方包

| 包 | flow_weight | 说明 |
|----|-------------|------|
| [minimal-research-to-spec](./minimal-research-to-spec/) | 中 | 调研 → 规格 + 推进/审计 |

## 命令

```bash
npm run pack -- validate packs/minimal-research-to-spec
npm run pack:export -- --pack packs/minimal-research-to-spec --out .scratch/exported-pack --id my-team-pack
npm run pack:import -- --pack .scratch/exported-pack --project /path/to/project
npm run pack:install -- --pack packs/minimal-research-to-spec --project /path/to/project
```

安装后：`agents/packs/<id>/`（含包内 `skills/`）· `.cursor/agents/` **仅 agents**（若有 Cursor 适配）。技能 **不同步** 到 harness。

换 harness：保留 roster/templates/skills，只改 `harness_adapters` 映射表。
