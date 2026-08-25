# 技能引用与绑定（Skills Binding）

> **状态：v0.13** · 能力模型 §7 P1  
> 聚合：[skills/README.md](../../skills/README.md) · [team-pack.md](./team-pack.md) · [composition-protocol.md](./composition-protocol.md)

## 目标

说明 agent-skills 类技能包如何**引用进**扶摇团队协议，以及边界：**技能不进 harness**。

## 路径约定

| 位置 | 用途 |
|------|------|
| 仓库根 `skills/<name>/` | 框架自带可移植技能（示例：`audit-readonly`） |
| `agents/packs/<id>/skills/<name>/` | 团队包内技能（随 `pack:install` 落盘） |
| 外部仓路径 | 可复制进上述二者之一；扶摇**不**拉取远程技能市场 |

推荐技能目录形态（与常见 agent-skills 对齐）：

```
skills/<skill-name>/
├── SKILL.md      # 或 README.md：触发条件与用法
├── references/   # 可选
└── scripts/      # 可选
```

## 绑定方式（roster）

在 Role Slot 的 `capabilities` 中写**相对项目根的路径字符串**（不做运行时解析校验以外的魔法）：

```yaml
slots:
  - id: auditor
    purpose: 只读审计
    capabilities:
      - skills/audit-readonly
      # 或包内：
      - agents/packs/minimal-research-to-spec/skills/audit-readonly
```

规则：

1. **引用 ≠ 安装到 IDE** — `capabilities` 只声明「该槽位应具备的技能路径」。
2. **不写** `.cursor/skills`、不写 `harness/**/skills` 作为权威源。
3. 换 harness 时路径字符串不变；由运行时/用户自行决定如何加载这些目录。
4. 同一职责可换不同技能路径（编制协议「替换槽位」）。

## 团队包清单

`pack.yaml` 的 `skills` 列出包内技能子目录（供 validate / 分发）：

```yaml
skills:
  - skills/audit-readonly
```

`pack:install` 复制整包（含 `skills/`）到 `agents/packs/<id>/`；**仅** Cursor agents 经薄适配写入 `.cursor/agents/`。

## 与 agent-skills 生态

| 做法 | 是否推荐 |
|------|----------|
| 把上游 skill 目录拷入 `skills/` 或 pack 内 `skills/` | ✅ |
| roster `capabilities` 指向该路径 | ✅ |
| 用扶摇脚本同步到 `.cursor/skills` | ❌（明确不做） |
| 把技能内容嵌进 harness mapping 正文 | ❌（会 harness 渗透） |
| 把技能升格为全局强制 DoD | ❌（按项目启用） |

## Builder 检查清单

- [ ] 技能只在 harness 无关路径
- [ ] roster `capabilities` 路径在目标项目存在（安装后）
- [ ] `pack.yaml` `skills` 与包内目录一致（若有包）
- [ ] 未出现「安装即写入 IDE skills 目录」的步骤

## 不做

- 技能市场 / 自动拉取上游
- 技能 → harness 同步 CLI
- 框架侧解析 `SKILL.md` 并注入 LLM（扶摇不调 LLM）
