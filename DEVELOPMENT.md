# Development · 开发指南

> 面向仓库贡献者。产品使用见 [README](README.md) · 15 分钟上手见 [get-started](docs/product/get-started.md)。

## 环境要求

- Node ≥ 20 · Git
- 测试依赖：npm ci 后即齐（ajv / yaml 随包安装）

## 验证链（本地一条龙）

```bash
npm ci
npm test                     # 34 项（脚本 · pack · 契约回归）
npm run validate             # 50 项（schema · 模板 · pack · message · ADR）
npm run check:contention -- --project . --strict
```

**发版前**：`npm run release:preflight -- --strict-gh`（tag 存在性 · 私有文件 · 脱敏扫描 · GH_TOKEN）

三绿才可 commit——CI（`.github/workflows/validate.yml`）跑同套检查。

## 目录导览（改哪里）

| 改什么 | 去哪里 | 须知 |
|--------|--------|------|
| 校验器 | `scripts/*.mjs` | 退出码是 ADR-0005 C 面契约：0 过 / 1 strict 发现——改行为须先过 ADR |
| Schema | `docs/design/schemas/` | 五核心 `/v1` 是承诺面（schema-stability.md）；模板类 `/v1-template` |
| 模板 | `docs/templates/*-<档>.yaml` | 示例 id 惯例 m-spec/m-impl/wi-*；grep `wi-main\|m-done` 须零残留 |
| 团队包 | `packs/*/` | 改后 `npm run pack -- validate <pack>` |
| Harness 适配 | `harness/<name>/` | 薄适配边界：只做映射，不实现 runtime（ADR-0001） |
| Cursor 片段 | `harness/cursor/agents/` | 源在这里；`.cursor/agents/` 是安装产物勿直改 |
| 官网 | `docs/index.html` + `docs/website/` | docsify；改后须 headless 渲染级验证（R17：curl 200 不算验证） |

## 提交规范

Conventional Commits：`feat|fix|docs|chore|refactor|test|release(scope): 描述`

- 一单元一 commit；版本五处同步（package.json · badge ×2 · CHANGELOG · ROADMAP）grep 回验
- 里程碑发版顺序：双审计 → preflight → commit → tag → push → `gh release create`（详见 `docs/product/examples/release-checklist.md`）

## pre-commit

本仓用原生 git hooks（`.githooks/`），无 husky/lefthook 依赖：

```bash
git config core.hooksPath .githooks    # 一次性启用
```

钩子内容：跑 `npm test` + `npm run validate`，失败阻断 commit。

## 技术债与裁定

- ADR 索引：`docs/decisions/README.md`（新增裁定须更新索引表）
- N 系列技术债与 R 系列教训：HANDOFF.md（本地私有）
