# Dogfood · solo-lite 关仓（新人视角 · 单人开箱）

> v0.38 · [get-started.md](../get-started.md) · Sandbox：`fuyao-dogfood-solo-lite`（git `13865af` · 本地 only）

## 元信息

| 项 | 值 |
|----|-----|
| **包** | starter-solo @ 1.0.0（首个官方第二包） |
| **链** | `fuyao:init` 骨架 → 计划修订 → builder（todo CLI）→ reviewer（gate=confirm 逐词核验）→ 三绿 |
| **identity** | `ic-local-first`（本地优先 · 数据不出本机）——evidence 落 .agents/audit/review-notes.md |
| **结论** | **三绿 strict 全通**（identity · traceability · test 2/2） |

## 计时（维护者实跑 · 新人视角零协议文档依赖）

| 步 | 实测 |
|----|------|
| fuyao:init 骨架 | < 1 分钟（一条命令 · pack 安装 + plan 生成） |
| 计划修订（intent + identity + traceability） | 2 分钟 |
| builder：todo CLI + 测试 | 5 分钟 |
| reviewer：逐词核验 + evidence | 3 分钟 |
| 收口三绿 | 1 分钟 |
| **合计** | **约 12 分钟**（新手首次 25–40 分钟属正常） |

## 新人视角发现（U4 产出 · 两个文档级缺口当场修）

1. **dod-轻模板同款孤例**（与 v0.37 清偿的 dod-轻中 同 bug）：`wi-main` 示例 id
   未换——traceability strict 必挂。已修（`docs/templates/dod-轻.yaml` + starter-solo
   pack 内拷贝同步）：builder/reviewer 分挂。**教训**：模板示例 id 应在每次新档启用
   前全档 grep `m-done/wi-main`（v0.37 只修了轻中，轻档漏网——本次补上）
2. **get-started 初版没教 traceability/identity-evidence**：strict 模式两道坎
   （domain_concepts 必填 · identity 须 cleared blocker evidence）教程未覆盖——
   已补「分钟 3–6」两节示例 + strict 提示框

## 教程修正回路

新人实跑 → 撞坑 → 当场修 get-started → 三绿 → 文档与实跑同构。
**get-started 的时间声称（12 分钟）以本次实跑为据**——非拍脑袋。

## 收口

- starter-solo pack：轻档 3+2 槽（builder→reviewer + progress/auditor 正交）validate ✅
- `fuyao:init`：骨架过 schema · 拒覆盖守卫 · 裸名/路径双解析——测试 3 项入链（21→24）
- dogfood-lite 关仓样本：后续 get-started 读者的第一个可对照实例
