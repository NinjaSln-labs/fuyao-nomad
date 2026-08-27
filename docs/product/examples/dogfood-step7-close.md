# Dogfood 步 7 关仓笔记 · dual-harness-cli

> v0.22 · `<SANDBOX_ROOT>` · 本地 only  
> 场景：[dogfood-step7-scenario.md](./dogfood-step7-scenario.md)

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-08-27 |
| **包** | minimal-research-to-spec @ pack_revision **1.1.0** |
| **结论** | 步 7 **完成**（路径 B 可跟跑） |

## 步 7 验收

| # | 项 | ✅ |
|---|-----|---|
| 1 | `pack.yaml` 含 `harness_adapters.cli` | ✅ |
| 2 | `harness/cli/mapping.yaml` 覆盖 4 slots | ✅ |
| 3 | `harness/cli/runners/*.md` ×4 | ✅ |
| 4 | `npm run pack -- validate …` | ✅ cursor + cli |
| 5 | roster 未改 | ✅ |

## pack validate 摘要

```text
✓ cursor mapping · cursor fragments
✓ cli mapping · cli fragments
✓ pack manifest
```

## import 行为确认

| harness | import 行为 |
|---------|-------------|
| cursor | 写入 `.cursor/agents/`（4 agents） |
| cli | **仅**保留在 `agents/packs/.../harness/cli/` |

OpenHands 第三映射：**N/A**（留 fork 按需）。

## 结论

playbook 步 0–8 **文档闭环**；他人可按 [dogfood-playbook.md](./dogfood-playbook.md) 路径 B 跟跑。
