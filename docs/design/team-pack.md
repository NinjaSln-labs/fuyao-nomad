# 团队包（Team Pack）

> **状态：③ 设计 · v0.15**  
> 聚合：[domain-language.md](./domain-language.md) · **TeamPack**  
> 导入/导出：[pack-import-export.md](./pack-import-export.md)

## 是什么

**团队包** = 可发布、可安装的一整套团队规格，harness 无关核心 + 可选薄适配：

```
pack.yaml          # 清单（本契约）
roster.yaml        # 团队实例
templates/         # 与 flow_weight 绑定的 dod · verification · ddd_gate
harness/<runtime>/ # 可选：mapping + agents/runners
skills/            # 可选：可移植技能目录
```

换 harness 时：**roster + templates + 包内 skills** 路径不变，只换 `harness_adapters`（映射表与 agent 定义）。

**技能不进 harness**：包内 `skills/` 随包落在 `agents/packs/<id>/skills/`，安装时 **不** 复制到 `.cursor/skills` 或任何 harness 目录。

## 清单字段（pack.yaml）

| 字段 | 说明 |
|------|------|
| `version` | `0.1` |
| `id` | 包 id（`a-z0-9-`） |
| `name` | 人类可读名 |
| `flow_weight` | 与模板族一致 |
| `roster` | roster 文件相对路径 |
| `templates` | `dod` · `verification` · `ddd_gate` 路径 |
| `pack_revision` | 团队包内容版本（SemVer） |
| `published_at` | 发布/修订时间 |
| `fork` | 可选 fork 元数据（`upstream_id` · `upstream_revision`） |
| `harness_adapters.cursor` | `mapping` + `agents_dir`（可 install） |
| `harness_adapters.cli` | 可选 `mapping` + `runners_dir`（文档级） |
| `harness_adapters.openhands` | 可选 `mapping` + `agents_dir`（文档级） |
| `skills` | 包内技能目录列表（校验 + 随包分发；**不**同步到 harness） |

Schema：`docs/design/schemas/team-pack.schema.json`

## 安装布局（目标项目）

```
agents/packs/<pack-id>/
  pack.yaml
  roster.yaml
  templates/
  skills/            # harness 无关，留在包内
  harness/cursor/    # 仅此块为薄适配副本（若有）
.cursor/agents/      # 仅 subagent 定义（Cursor mapping 安装）
```

Roster 内 `harness_mapping_ref` 建议指向包内路径，例如 `harness/cursor/mapping.yaml`。  
`capabilities` 引用包内技能，例如 `agents/packs/<id>/skills/audit-readonly`。  
绑定细则：[skills-binding.md](./skills-binding.md)。

## 命令

```bash
npm run pack -- validate packs/minimal-research-to-spec
npm run pack:export -- --pack packs/minimal-research-to-spec --out .scratch/exported --id my-pack
npm run pack:import -- --pack .scratch/exported --project .
npm run pack:install -- --pack packs/minimal-research-to-spec --project .
```

`import` ≡ `install`。详见 [pack-import-export.md](./pack-import-export.md)。

校验：`npm run validate` 会扫描 `packs/*/pack.yaml`。

## 与消息协议

槽位间结构化 payload 见 [message-protocol.md](./message-protocol.md)（handoff 载体之上的可选层）。

## 验收

- [x] team-pack schema
- [x] 官方示例 pack
- [x] validate + install 脚本
- [x] 消息协议运行时目录约定（`.agents/messages/`）— v0.3
- [x] export / import + fork 元数据 + 多适配字段（v0.15）
