# 团队包（Team Pack）

> **状态：③ 设计 · v0.2 草案**  
> 聚合：[domain-language.md](./domain-language.md) · **TeamPack**

## 是什么

**团队包** = 可发布、可安装的一整套团队规格，.harness 无关核心 + 可选薄适配：

```
pack.yaml          # 清单（本契约）
roster.yaml        # 团队实例
templates/         # 与 flow_weight 绑定的 dod · verification · ddd_gate
harness/cursor/    # 可选：mapping + agents
skills/            # 可选：可移植技能目录
```

换 harness 时：**roster + templates + skills 不变**，只换 `harness_adapters` 块或映射表。

## 清单字段（pack.yaml）

| 字段 | 说明 |
|------|------|
| `version` | `0.1` |
| `id` | 包 id（`a-z0-9-`） |
| `name` | 人类可读名 |
| `flow_weight` | 与模板族一致 |
| `roster` | roster 文件相对路径 |
| `templates` | `dod` · `verification` · `ddd_gate` 路径 |
| `harness_adapters.cursor` | `mapping` + `agents_dir` |
| `skills` | 技能目录列表 |

Schema：`docs/design/schemas/team-pack.schema.json`

## 安装布局（目标项目）

```
agents/packs/<pack-id>/
  pack.yaml
  roster.yaml
  templates/
  harness/cursor/    # 随包携带的适配副本
skills/<skill-name>/ # 从包合并到项目 skills/
.cursor/agents/      # 由 install 根据 mapping 写入
```

Roster 内 `harness_mapping_ref` 建议指向包内路径，例如 `harness/cursor/mapping.yaml`。

## 命令

```bash
npm run pack -- validate packs/minimal-research-to-spec
npm run pack:install -- --pack packs/minimal-research-to-spec --project .
```

校验：`npm run validate` 会扫描 `packs/*/pack.yaml`。

## 与消息协议

槽位间结构化 payload 见 [message-protocol.md](./message-protocol.md)（handoff 载体之上的可选层）。

## V0.2 验收

- [x] team-pack schema
- [x] 官方示例 pack
- [x] validate + install 脚本
- [ ] 消息协议与 pack 内示例 payload（P1）
