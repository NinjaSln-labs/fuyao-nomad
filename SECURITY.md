# Security Policy · 安全策略

## 支持版本

| 版本 | 支持 |
|------|------|
| 1.0.0-alpha.x | ✅ 安全修复 |
| < 1.0.0-alpha | ❌ |

## 漏洞报告

**请勿开公开 issue 报告安全漏洞。**

私信报告：[GitHub Security Advisories](https://github.com/NinjaSln-labs/fuyao-nomad/security/advisories/new)（首选 · 仓库内私密通道）

或加密联系：通过 GitHub 私密 advisory 附联系方式，维护者（@NinjaSln）将在 **72 小时内**响应。

## 报告内容

- 漏洞描述与影响面（哪个脚本/schema/pack）
- 复现步骤（命令 + 输入）
- 影响版本（`fuyao-nomad --version`）
- 修复建议（可选）

## 处理流程

1. 确认收悉（72h 内）
2. 评估与定级（CVSS 可选）
3. 修复 + 发布 patch（alpha 通道：`npm publish --tag alpha`）
4. 公开致谢（经报告者同意）

## 披露政策

修复发布前不公开细节；涉及第三方依赖的按上游政策同步。
