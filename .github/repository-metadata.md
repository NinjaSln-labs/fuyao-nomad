# GitHub 仓库元数据

创建/更新仓库时使用。勿提交密钥或内部路径。

## Repository

| 字段 | 值 |
|------|-----|
| **Org** | `NinjaSln-labs` |
| **Name** | `fuyao-nomad` |
| **Visibility** | Public |
| **Default branch** | `main` |
| **Homepage** | https://github.com/NinjaSln-labs/fuyao-nomad#readme |

## About / Description

**勿写版本号** — About 会长期滞后；当前版本见 README badge / Releases / CHANGELOG，不要写进 description。

**GitHub About（推荐 · 中英双语 · 无版本号）：**

> 扶摇 · Nomad — 开源 Agent 团队框架：团队优先、DDD 驱动、轻-重流程重量可调；薄适配 harness（不做 harness）。Open-source agent team framework.

**中文（README 用）：**

> 开源 Agent 团队框架：团队优先、DDD 驱动、轻-重流程重量可调；薄适配挂 Cursor 等 harness，不做 harness。

**English（补充说明，About 已含短英文尾句）：**

> Open-source agent team framework: team-first, DDD-driven, adjustable flow_weight; thin adapters for Cursor & other harnesses — not a harness.

## Topics（建议全选）

```
agent-framework
multi-agent
ai-agents
agent-team
domain-driven-design
ddd
llm
cursor
workflow
json-schema
open-source
specification
handoff
roster
```

## `gh` 命令参考

```bash
gh repo create NinjaSln-labs/fuyao-nomad --public \
  --description "扶摇 · Nomad — 开源 Agent 团队框架：团队优先、DDD 驱动、轻-重流程重量可调；薄适配 harness（不做 harness）。Open-source agent team framework." \
  --source=. --remote=origin --push

gh repo edit NinjaSln-labs/fuyao-nomad \
  --description "扶摇 · Nomad — 开源 Agent 团队框架：团队优先、DDD 驱动、轻-重流程重量可调；薄适配 harness（不做 harness）。Open-source agent team framework." \
  --add-topic agent-framework --add-topic multi-agent --add-topic ai-agents \
  --add-topic agent-team --add-topic domain-driven-design --add-topic ddd \
  --add-topic llm --add-topic cursor --add-topic workflow --add-topic json-schema \
  --add-topic open-source --add-topic specification --add-topic handoff --add-topic roster
```

## 脱敏检查清单

- [x] 无本地绝对路径（示例形式如 `/Users/<user>/...` 亦勿出现）
- [x] 无 API key / token / `.env`
- [x] 无 `private: true`（package.json）
- [x] CHANGELOG release URL 指向 NinjaSln-labs
- [x] Schema `$id` 使用 GitHub 命名空间
