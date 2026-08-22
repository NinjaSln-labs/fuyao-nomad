# 审计

**审计记录为本地私有**，不随开源仓库发布。

## 存放位置（维护者本地）

```
.agents/audit/
  *.md              # 审计报告
  *.audit.yaml      # 结构化记录（可选）
```

首次使用可从本仓库历史 tag 复制，或按 [audit-by-flow-weight.md](../design/audit-by-flow-weight.md) 自建。

## 公开契约

框架仍提供 **审计记录 schema**（供团队自建留痕）：

- [audit-record.schema.json](../design/schemas/audit-record.schema.json)
- [audit-by-flow-weight.md](../design/audit-by-flow-weight.md)

## 本地校验

```bash
npm run validate -- --path .agents/audit/your-record.audit.yaml
```

## 与开源边界

| 公开仓库 | 本地私有 |
|----------|----------|
| schema · 模板 · 审计**规则** | 具体**审计报告**与 findings |

`.agents/audit/` 已列入 `.gitignore`。
