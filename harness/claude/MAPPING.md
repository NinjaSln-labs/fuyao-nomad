# claude · 扶摇五维翻译表

> 前提：[pi MAPPING](../pi/MAPPING.md)（基础五维）· [dsh MAPPING](../dsh/MAPPING.md)（委派差异维）·
> [qoder MAPPING](../qoder/MAPPING.md)（frontmatter 能力面梯度）。本表只列 **claude 差异维**。

## 五维翻译（claude 差异维）

| 扶摇维度 | claude 形态 | 实跑操作 |
|----------|-------------|---------|
| 槽位驱动 | `.claude/agents/<slot>.md` subagent；主会话 Task 工具委派（独立 context + transcript） | 片段放 `.claude/agents/`；headless `claude -p "..."` 内委派 |
| 正交槽位 | 按需委派 + 状态落盘（与 dsh/qoder 同构降级） | progress/auditor 按需 |
| model 路由 | 片段 `model: inherit`（frontmatter 有承载面，同 cursor） | `model_hints` 翻译为片段 model 字段 |
| 无头实跑 | `claude -p "<任务>"` + `--dangerously-skip-permissions`（可信沙盒）或 settings 权限预配 | 分段委派（每槽位一进程） |
| **第三方模型**（R13） | `ANTHROPIC_BASE_URL` + `ANTHROPIC_API_KEY` + `ANTHROPIC_MODEL` 环境变量重定向至任何 Anthropic 兼容端点 | TokenRouter 免费档实测（glm-5.3-free）——无订阅形态 |

## 片段 frontmatter 对照

五家权威终表已上提 [harness/README](../README.md)（单一权威源，各 MAPPING 不再复制全表）；
claude 列要点：model 承载 ✅（`model: inherit`）· readonly/tools/权限模式均无 frontmatter
承载面（prompt 约束 / CLI flag / settings 承担）。

## 验收（v0.35）

- [x] README · MAPPING（差异维 + 五家 frontmatter 终表）（五家/对照终表后经 N1 清偿上提 harness/README，本表存指针）
- [x] 槽位片段 ×4（claude frontmatter）
- [x] sandbox 实跑：minimal-research-to-spec 全链经 `.claude/agents` Task 委派（headless · Mac 远程 · tokenrouter 免费模型）
- [x] roster / pack 零改动
