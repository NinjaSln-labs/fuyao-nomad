# Adopt vs Source · Voyage

> 源仓只读对照 · 接手仓薄切片 · v0.30 候选

| 维度 | 源仓 `Voyage` | adopt `fuyao-adopt-voyage` |
|------|---------------|----------------------------|
| **范围** | AIOps 全链：意图→分类→审批→Grant→执行→审计（六类适配器 · 内测部署） | 单文件 Mock · intent/approve/grant/execute 门禁语义 |
| **阶段** | v0.9.0-alpha · 数据积累期（影子运行） | 扶摇 **中** 档 s1–s3 |
| **身份** | 零信任审批（双人批准 · 属主绑定 · 审批审计 · 影子门禁 fail-closed） | `ic-zero-trust-approval`（双人批准 + Grant 在案 + 过期即拒） |
| **审计** | JSONL append-only + 从盘重建 verify · 双轴审计链 | `.agents/audit/` design+impl+CQ · 审计重放断言 |
| **Git** | 公开 `github.com/NinjaSln-labs/voyage` | 本地 `git init` · 无 remote · 零提交（沙盒惯例） |
| **硬门** | DoD 门禁 + 评测门禁（三集制）+ 红队周更 | **仅**审批门禁（签发口 + 执行口双重 fail-closed） |

## 对齐点

- 高危动作先双人批准后执行，批准人 ≠ 提交人（属主绑定）
- 执行判定以 Grant 记录为准，不以口头/内存态为准
- 一切不满足 fail-closed 并留审计；审计可从持久层重放校验

## 有意差异

- adopt **不**实现真实执行链（SSH）、模型分类适配器、认证（mTLS/WebAuthn/JWT）、评测三集制
- 源仓意图分类为 LLM + 隐藏高危集评测；切片简化为 `kind: query|exec` 二值
- Grant TTL 过期为切片新增的保守语义（源仓以审计链 + 影子模式承载等价安全，未明示 TTL）

## 源仓纪律

本 adopt 会话 **不**修改 `Voyage` 任何文件（工作区 clean 断言通过）。
