# 贡献指南

感谢关注扶摇 · Nomad。

## 原则

- **团队优先** — 改 spec/模板前先读 [composition-protocol.md](docs/design/composition-protocol.md)
- **不做 harness** — 运行时适配放 `harness/<name>/`，不进入核心协议
- **DDD 必要** — 新能力域或术语进 [domain-language.md](docs/design/domain-language.md)
- **轻-重流程重量** — 验证/审计变更须同步 `docs/templates/` 与对应设计文档

## 本地开发

```bash
npm install
npm run validate
npm test
npm run install:cursor-agents -- --project .
```

改 Cursor agent 源文件：`harness/cursor/agents/`（勿只改 `.cursor/agents/`）。

## Pull Request

1. 说明影响的 **能力域**（见 capability-model）
2. 若改 schema，附 `npm run validate` 通过截图或日志
3. 文档与代码同一 PR；竞品调研**去权威化**，不自动升格 scope

## 许可

贡献以 [Apache-2.0](LICENSE) 为准。
