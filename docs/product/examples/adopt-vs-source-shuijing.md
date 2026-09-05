# Adopt vs Source · shuijing

> [scenario](./adopt-shuijing-scenario.md) · [close](./adopt-shuijing-close.md)

## 对比

| 维度 | 源仓 shuijing-v2 | adopt 接手仓 |
|------|------------------|--------------|
| **范围** | 完整评审系统：CLI/MCP/API · 门禁+六维评审+主席裁决+报告 · 企业部署（tickets 01–16 · 54 tests） | 承诺出口域薄切片：门禁短路 + Mock 评审 + 硬锚定 + 唯一出口（10 tests · 纯库） |
| **阶段** | 产品 stage：P0 done → 企业 ICP 文档化（验证门带豁免） | 扶摇 s1–s3（轻中档：research → spec(confirm) → impl+audit） |
| **身份** | 「主席是唯一承诺出口」叙事原则 + `apply_hard_anchor` 代码规则 | `ic-sole-commitment-exit` identity constraint（闭包 token 强制 + 锚定全分支机器验证） |
| **评审引擎** | 启发式 + 可选 LLM（openai 兼容）+ goldens | Mock 维度组合（无 LLM——identity 验证不需模型） |
| **裁决锚定** | `apply_hard_anchor`（blocked≥2 不得 go · 全 blocked 强制 no_go） | 同语义复刻（AC3/AC4/AC5 逐一断言 + 修正原因） |
| **审计** | 产品验证门/假门（D13 暂缓）+ PRODUCT-DOC-AUDIT | `.agents/audit/`（auditor 独立实例 verdict: pass · 行号证据） |
| **Git** | GitHub private（`NinjaSln-labs/shuijing-v2`） | 本地 only（零远程） |

## 对齐判读

- **承诺出口语义 1:1**：源仓四档裁决（go/go_focus/revise/no_go）· 维度三态（pass/needs_work/
  blocked）· 三句话（do_or_not/first_step/watch_metric）· 门禁短路字段——adopt 全部同名同义移植
- **薄化边界诚实**：LLM 评审 / 领域 profile / 六维权重 / 企业部署全部不交付（对齐源仓
  Non-Goals 的 adopt 侧投影）；adopt 不冒领「评审系统」只领「承诺出口域」
- **harness 差异是唯一新增维度**：源仓产品自身无 harness 绑定；adopt 用 pi 槽位委派完成
  research/spec/auditor 三角色——证明扶摇接手不依赖 cursor 生态
