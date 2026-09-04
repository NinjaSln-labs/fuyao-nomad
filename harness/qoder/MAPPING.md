# qoder · 扶摇五维翻译表

> 前提：读 [pi MAPPING](../pi/MAPPING.md)（基础五维）与 [dsh MAPPING](../dsh/MAPPING.md)（委派差异维）。
> 本表只列 **qoder 与 dsh 的差异维**——同为 subagent 委派族，差异集中在**片段 frontmatter 能力面**与 **headless 权限语义**。

## 五维翻译（qoder 差异维）

| 扶摇维度 | qoder 形态 | 实跑操作 |
|----------|-----------|---------|
| 槽位驱动 | `.qoder/agents/<slot>.md` 项目级 subagent；主会话显式点名委派（`Use the research-analyst subagent ...`） | 片段放 pack 的 `harness/qoder-agents/` → 挂载复制到项目 `.qoder/agents/`；headless 用 `-p` 传委派指令 |
| 正交槽位 | subagent 按需委派 + 状态落盘（与 dsh S-03 同构降级）；`background: true` 可后台运行 | progress/auditor 按需委派，产物落 `.agents/` 落点 |
| model 路由 | 片段 `model` 字段承载（inherit/auto/lite/efficient/performance）——**有 frontmatter 承载面**（dsh 无，cursor 有） | `model_hints` 翻译为片段 model 字段；headless `-m` 覆盖 |
| gate 门 | headless 无交互 → confirm 级降级为「产物内待确认节 + 操作者人核落盘」（R7 同构） | gate-confirm message 落盘 |
| 无头实跑 | `qodercn -p "<委派指令>"`；`--permission-mode accept_edits`（产物落盘必需）或 `--yolo`（可信环境）；`--max-turns` 限深 | 分段委派（每槽位一进程，R6 同形态） |

## 不变维（继承通用）

- 落点：`.agents/plan-progress.yaml` + `.agents/messages/<roster_id>/` + `docs/`
- 并发写：file-lock-contract territory 声明（R3 教训）
- identity/traceability：`--strict` 双绿

## 片段 frontmatter 对照（qoder vs cursor vs dsh）

| 能力面 | cursor | dsh | **qoder** |
|--------|--------|-----|-----------|
| model 承载 | ✅ `model: inherit` | ❌（委派参数） | ✅ `model:` 字段 |
| readonly | ✅ `readonly: true` | ❌ | ❌ → **tools 白名单替代** |
| tools 白名单 | ❌ | ❌ | ✅ `tools: [Read, Grep]` |
| 权限模式 | ❌ | ❌（approval 辅助） | ✅ `permissionMode` |
| 再委派控制 | ❌ | ❌ | ✅ `Agent(name)` / `disallowedTools: [Agent]` |

## 验收（v0.35）

- [x] README · MAPPING（差异维 + frontmatter 对照表）
- [x] 槽位片段 ×4（qoder frontmatter · tools 白名单区分写手/审计）
- [x] sandbox 实跑：minimal-research-to-spec 全链经 `.qoder/agents` 委派（headless · Mac 远程）
- [x] roster / pack 零改动
