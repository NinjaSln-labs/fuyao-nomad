# Adopt vs Source · qingfu-envoy

> 源仓只读对照 · 接手仓薄切片 · v0.28

| 维度 | 源仓 `qingfu-envoy` | adopt `fuyao-adopt-qingfu-envoy` |
|------|---------------------|----------------------------------|
| **范围** | S1–S5 monorepo（core/CLI/MCP/Web/rails-alipay） | 单文件 Mock CLI · propose/approve/execute |
| **阶段** | 产品 stage-spec S1–S5 | 扶摇全流程 s1–s7（s7 N/A） |
| **身份** | ADR 001 禁止静默自付 | `ic-no-silent-pay` + blocker evidence |
| **审计** | core 审计链 / export | `.agents/audit/` 三层 + JSON audit CLI |
| **Git** | 公开 GitHub | 本地 `git init` · 无 remote |
| **支付轨** | Mock + 支付宝 sandbox 适配器 | **仅** Mock |

## 对齐点

- 叙事一致：提议 → 人确认 → 再执行  
- 禁止无确认扣款（静默路径）

## 有意差异

- adopt **不**实现 MCP/Web/真实支付（防污染源仓、控范围）  
- dogfood `grant-gate` 为合成切片；本仓 **显式引用源 ADR** 并写本对比表

## 源仓纪律

本 adopt 会话 **不**修改 `qingfu-envoy` 任何文件。
