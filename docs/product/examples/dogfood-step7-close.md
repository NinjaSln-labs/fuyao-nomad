# Dogfood 步 7 关仓笔记 · dual-harness-cli

> v0.22 · `<SANDBOX_ROOT>` · 本地 only  
> 场景：[dogfood-step7-scenario.md](./dogfood-step7-scenario.md)

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-08-27 |
| **包** | minimal-research-to-spec @ **1.2.0** |
| **Harness** | cursor + cli + **openhands**（triple validate ✅） |
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
| cli | **仅**包内 `harness/cli/` |
| openhands | **仅**包内 `harness/openhands/`（v0.23+） |

OpenHands 第三映射：**已做 E2E lite**（v0.27 · [dogfood-viii](./dogfood-viii-scenario.md)）— mapping ↔ agents 手检（当时称 `check:openhands`，系 sandbox 本地脚本，仓内从未提供，幽灵命令 v0.33 清偿）；**不**启 OpenHands runtime。OpenHands 适配现已 ❄️ 冻结（无维护者环境）。

## OpenHands E2E lite（v0.27+）

| 检查 | 结果 |
|------|------|
| `harness/openhands/mapping.yaml` 覆盖 4 slots | ✅ |
| `ResearchAgent` / `SpecAgent` / `ProgressAgent` / `AuditorAgent` 片段存在 | ✅ |
| `pack validate` 含 openhands | ✅ |
| 启 OpenHands 进程跑任务 | **N/A**（本 dogfood 为 pack 级冒烟） |

## 结论

playbook 步 0–8 **文档闭环**；他人可按 [dogfood-playbook.md](./dogfood-playbook.md) 路径 B 跟跑。  
v0.27 补：**s7 对抗启用** + **OpenHands mapping smoke**。
