# 团队包导入 / 导出

> **状态：v0.15** · 能力模型 §8 P1  
> 契约：[team-pack.md](./team-pack.md) · 命令：`scripts/pack.mjs`

## 目标

把一支团队的 **roster + 模板 + skills** 在项目间迁徙；换 harness 时 **只换映射表**，不改团队核心。

```
源 pack（roster / templates / skills）
        │
   pack export ──► 可携目录（可选新 id + fork 元数据）
        │
   pack import ──► agents/packs/<id>/（+ 可选 Cursor agents）
        │
   换 harness_adapters.* mapping ──► 同 spec，不同 runtime
```

## 命令

```bash
# 校验
npm run pack -- validate packs/minimal-research-to-spec

# 导出（目录拷贝；非 zip 市场）
npm run pack:export -- --pack packs/minimal-research-to-spec --out .scratch/my-pack

# 导出并 fork（改 id + 写入 fork 元数据）
npm run pack:export -- --pack packs/minimal-research-to-spec \
  --out .scratch/my-team-pack --id my-team-pack

# 导入（= install）
npm run pack:import -- --pack .scratch/my-team-pack --project /path/to/project
# 或
npm run pack:install -- --pack .scratch/my-team-pack --project /path/to/project
```

| 标志 | 说明 |
|------|------|
| `--pack` | 源/目标包目录（含 `pack.yaml`） |
| `--out` | 导出落点目录（已有 `pack.yaml` 则拒绝覆盖） |
| `--id` | 导出时改写 `pack.yaml` 的 `id` |
| `--no-fork` | 与 `--id` 联用时不写 `fork` 块 |
| `--project` | 导入目标项目根 |

## 同 spec 换映射表

1. 导出或复制包到 `agents/packs/<id>/`
2. **保留** `roster.yaml` · `templates/` · `skills/`
3. 在 `pack.yaml` 的 `harness_adapters` 增减适配：

```yaml
harness_adapters:
  cursor:
    mapping: harness/cursor/mapping.yaml
    agents_dir: harness/cursor/agents
  # 可选：仅文档/片段级（无安装脚本）
  cli:
    mapping: harness/cli/mapping.yaml
    runners_dir: harness/cli/runners
  openhands:
    mapping: harness/openhands/mapping.yaml
    agents_dir: harness/openhands/agents
```

4. 映射语义见 [cli-openhands-adapter.md](./cli-openhands-adapter.md) · [cursor/MAPPING.md](../../harness/cursor/MAPPING.md)
5. 仅 Cursor 在 `import`/`install` 时写入 `.cursor/agents/`；CLI / OpenHands **无**安装脚本

## fork 元数据

`--id` 导出时默认写入：

```yaml
fork:
  upstream_id: minimal-research-to-spec
  upstream_revision: "1.0.0"
  forked_at: "…"
  note: exported fork; swap harness mapping as needed
```

用于追溯上游，**不**自动拉取远程包。

## Builder 检查清单

- [ ] `pack validate` 通过后再 export / import
- [ ] 换映射后 roster `slots[].id` 仍被 mapping 覆盖
- [ ] 技能仍在包内路径；未同步到 `.cursor/skills`
- [ ] fork 包的 `id` 与 `agents/packs/<id>/` 目录名一致（import 按 manifest.id）

## 不做

- 团队包市场 / 远程 registry
- zip/tar 作为唯一分发格式（目录即可）
- 导入时自动改写 roster 内容
- CLI / OpenHands 安装脚本
