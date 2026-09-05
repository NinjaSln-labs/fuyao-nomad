# Schema 稳定性承诺（$id 语义化）

> **状态：v0.39** · 伴随 [ADR-0006](../../decisions/adr-0006-schema-id-semver.yaml)  
> 16 schema `$id` 自 v0.39 起**语义化**：核心契约 `/v1` · 模板类 `/v1-template`。

## $id 结构

```
https://github.com/NinjaSln-labs/fuyao-nomad/schemas/<name>/<stability>
                                                    │         │
                                              roster 等      v1 | v1-template
```

| 层 | 档 | schema（16） |
|----|----|--------------|
| **核心契约** | `/v1` | roster · plan-progress · message · audit-record · team-pack |
| **模板类** | `/v1-template` | template-dod · verification · ddd-gate · adr · problem-statement · prd-lite · stage · commit-policy · anti-metrics · adversarial-boundary · eval-gates |

## 承诺面 vs 演进面

| 面 | 内容 | 破坏性变更 |
|----|-------|------------|
| **承诺面（/v1 核心）** | 字段结构 · required 集 · 语义不变量（如 gate_level 枚举 · blockers evidence 规则） | **不兼容变更须升 v2**（新 `$id`），v1 至少存续到 1.0.0 stable |
| **演进面（/v1-template）** | checklist 项集 · 示例 id · description 文案 | 新增/调整**不升版**——模板是项目起点而非运行时契约（内容已被 `plan_refs` 项目化替换实践多次证明：v0.37/v0.38 修正示例 id 即此性质） |
| **演进面（/v1 内）** | `description` 文案 · 可选字段新增 | 向后兼容新增不升版 |

## 对消费者的影响

- **校验器**（`validate` · `pack` · `check:*`）：按文件路径加载本地 schema，`$id` 仅作
  标识与未来远程解析锚点——当前零运行时依赖，改 `$id` 不破坏任何脚本（v0.39 实测 24/48 全绿）
- **下游工具**：引用 `$id` 时按层断言——核心 `/v1` 可作稳定锚；模板类只应引用文件名
- **fork 团队包**：`pack_revision`（SemVer）与 schema `$id` 无关——包内容演进自管

## 变更流程

1. 核心字段破坏性变更 → 先 ADR（`docs/decisions/`）→ 升 `/v2`（保留 v1 文件）
2. 模板 checklist 变更 → 直接改（`docs/templates/` 六档同步 + pack 内拷贝同步）
3. 每次变更 `npm run validate` + `npm test` 全绿为闸
