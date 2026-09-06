# 架构决策记录（ADR）

本目录存放**已接受/进行中**的决策 YAML（与 [adr-中 模板](../templates/adr-中.yaml) 同 schema）。

校验：`npm run validate`（扫描本目录 `adr-*.yaml`）。

| ADR | 文件 | 标题 | 状态 |
|-----|------|------|------|
| 0001 | [adr-0001-no-harness.yaml](./adr-0001-no-harness.yaml) | 不做 harness，不实现编排 runtime | accepted |
| 0002 | [adr-0002-audit-private.yaml](./adr-0002-audit-private.yaml) | 审计报告本地私有 | accepted |
| 0003 | [adr-0003-traceability-not-in-ci.yaml](./adr-0003-traceability-not-in-ci.yaml) | check:traceability 不入 CI | accepted |
| 0004 | [adr-0004-research-deauthorize.yaml](./adr-0004-research-deauthorize.yaml) | 竞品快照去权威化 | accepted |
| 0005 | [adr-0005-contract-freeze.yaml](./adr-0005-contract-freeze.yaml) | 1.0.0-alpha.1 契约面冻结（A–E 五面） | accepted |
| 0006 | [adr-0006-schema-id-semver.yaml](./adr-0006-schema-id-semver.yaml) | Schema $id 语义化（核心 /v1 · 模板 /v1-template） | accepted |
| 0007 | [adr-0007-prerelease-versioning.yaml](./adr-0007-prerelease-versioning.yaml) | 预发布版按事件递增（ship-on-event · 官网不占版本号） | accepted |

新增：复制模板 → `adr-NNNN-slug.yaml` → 更新本表 → `npm run validate`。
