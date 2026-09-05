# AGENTS.md · Agent 桥接

> 一句话：本仓库的 Agent 协作契约在 README 与 docs/ 中——本文件只做指路，**不复制内容**（单一权威源原则）。

## 权威源

| 想知道 | 去 |
|--------|-----|
| 项目是什么 · 边界（不造 harness · 不调 LLM） | [README.md](README.md) · [北极星](docs/product/north-star.md) |
| 怎么改代码 · 验证链 · 提交规范 | [DEVELOPMENT.md](DEVELOPMENT.md) |
| 契约冻结（什么能改什么不能） | [ADR-0005](docs/decisions/adr-0005-contract-freeze.yaml) · [schema-stability.md](docs/design/schema-stability.md) |
| 模板示例 id 惯例（m-spec/m-impl/wi-*） | CONTRIBUTING.md 的 PR 检查单 |
| 上手（15 分钟） | [docs/product/get-started.md](docs/product/get-started.md) |

## Agent 硬规则（违反即返工）

1. **三绿才 commit**：`npm test`（34）· `npm run validate`（50）· 涉争用跑 `check:contention --strict`
2. **中文为权威源**：`.en.md` 是浓缩译文，改中文必须同步评估英文
3. **契约面零碰**：五核心 schema `/v1` 字段、check:* 退出码、模板六档绑定——变更须先过 ADR
4. **脱敏**：任何 home 路径/令牌不得入 tracked 文件（preflight 会扫）
5. **一单元一 commit**：Conventional Commits 格式

## 快速命令

```bash
npm test && npm run validate          # 三绿（之二）
git config core.hooksPath .githooks   # 启用 pre-commit 钩子
```
