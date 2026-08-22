# v0.3.0 发布审计

> **类型**：设计 + 实现 + 代码质量 + 发布门禁（flow_weight=**中**）  
> **范围**：v0.2.0–v0.3.0 增量（含 v0.2 未单独留痕的发布）  
> **前置**：[v0.1 发布审计 100/100](./2026-08-22-v01-release-audit.md)

```yaml
audit:
  type: implementation
  flow_weight: 中
  verdict: pass
  score: 100
  score_max: 100
  recorded_at: "2026-08-22T13:00:00Z"
```

## 评分总览

| 维度 | 得分 | 满分 |
|------|------|------|
| 设计对齐 | 25 | 25 |
| 实现完整 | 25 | 25 |
| 代码质量 | 25 | 25 |
| 发布门禁 | 25 | 25 |
| **合计** | **100** | **100** |

**Major / Critical open**：0  
**判定**：`pass` — v0.3.0 发布审计收口；v0.2.0 由本报告一并覆盖。

---

## 1. 设计对齐（25/25）

| # | 检查项 | 分 | 证据 |
|---|--------|-----|------|
| D1 | 定位不变（团队框架 · 不做 harness · DDD · flow_weight） | 5 | north-star · problem-statement |
| D2 | v0.3 产物对齐路线图 | 5 | ROADMAP · post-v01-roadmap |
| D3 | team-pack + message + escalation 并列不混 handoff | 5 | team-pack · message-protocol · escalation-protocol |
| D4 | 技能 harness 无关、不同步 | 5 | skills/README · pack:install 行为 |
| D5 | 六档 flow_weight 模板与 delivery-model 一致 | 5 | docs/templates/ × 6 · templates/README |

---

## 2. 实现完整（25/25）

| # | 检查项 | 分 | 证据 |
|---|--------|-----|------|
| I1 | team-pack schema + 官方 pack + install | 5 | packs/minimal-research-to-spec · pack.mjs |
| I2 | message.schema + pack 示例 | 5 | message-handoff.example.yaml |
| I3 | roster `contention_policy` · plan `messages_dir` | 5 | roster.schema · plan-progress.schema · 示例 |
| I4 | CLI harness 文档 POC | 5 | harness/cli/MAPPING.md · mapping.example.yaml |
| I5 | validate 25 项（模板六档 + pack + message） | 5 | npm run validate |

---

## 3. 代码质量（25/25）

| # | 检查项 | 分 | 证据 |
|---|--------|-----|------|
| C1 | `npm test` 4/4 | 5 | tests/scripts.test.mjs |
| C2 | CI workflow | 5 | .github/workflows/validate.yml |
| C3 | 无本地路径 / 密钥泄漏 | 5 | 全仓 grep |
| C4 | Apache-2.0 · engines · repo 元数据 | 5 | LICENSE · package.json |
| C5 | 技能不进 `.cursor/skills` 测试断言 | 5 | pack install test |

---

## 4. 发布门禁（25/25）

| # | 检查项 | 分 | 证据 |
|---|--------|-----|------|
| R1 | CHANGELOG 0.2 + 0.3 | 5 | CHANGELOG.md |
| R2 | GitHub Release v0.2.0 · v0.3.0 | 5 | NinjaSln-labs/fuyao-nomad |
| R3 | README 中英 + Builder 指南 | 5 | README.md · README.en.md · builder-guide |
| R4 | 审计索引更新 | 5 | docs/audit/README.md |
| R5 | domain-language / capability-model 与 v0.3 一致 | 5 | 本轮审计修复 |

---

## 5. 发现项（已全部 closure）

| ID | 严重度 | 问题 | 状态 |
|----|--------|------|------|
| A-01 | note | v0.2.0 tag 无独立审计记录 | **fixed** — 本报告覆盖 v0.2–v0.3 |
| A-02 | minor | README「当前 v0.2.0」漂移 | fixed |
| A-03 | minor | README.en 未更新至 v0.3 | fixed |
| A-04 | minor | capability-model 仍写「2 档位」 | fixed |
| A-05 | minor | domain-language 缺 Message / contention | fixed |

---

## 6. 记录项（不阻断）

| ID | 说明 |
|----|------|
| R-01 | 运行时 `.agents/messages/` 未纳入 validate — v0.4 P2 |
| R-02 | 争用自动检测未实现 — escalation-protocol 已文档化 |
| R-03 | CLI harness 仅文档 POC，无 install 脚本 — 符合「不做 harness」 |

---

## 7. 验证命令

```bash
npm run validate   # 25 passed
npm test           # 4 passed
npm run install:cursor-agents -- --check --project .
```

**结论**：**100/100 · pass** — v0.3.0 发布审计完成。
