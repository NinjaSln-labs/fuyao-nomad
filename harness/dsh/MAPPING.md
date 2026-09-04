# dsh · 扶摇五维翻译表

> 前提：读 [pi MAPPING](../pi/MAPPING.md)（基础五维）。本表只列 **dsh 与 pi 的差异维**——dsh 构建在 pi 之上，
> 机制层（落点/文件锁/gate 流程）完全继承；差异集中在**委派机制**与**无头模式**两维。

## 五维翻译（dsh 差异维）

| 扶摇维度 | dsh 形态 | 实跑操作 |
|----------|----------|---------|
| 槽位驱动 | **subagent 委派**：父会话持 MAPPING 上下文，按槽位片段委派子代理 | 父会话 prompt：「按 agents/packs/<pack>/harness/dsh-agents/<slot>.md 片段委派 research 子代理执行 wi-research」 |
| 正交槽位 | **continuable 子代理**：progress / auditor 生成持续会话（可追加跟进，非一次性） | 委派时用 continuable 形态；主链每步走完后向正交槽位发跟进消息 |
| model 路由 | 委派参数 `provider/model`（`model: auto` 走内置分层策略：task 长度/标记分类 → trivial/standard/complex 三档） | 翻译 `model_hint`：无路由 → 省略继承父级；有路由 → 委派参数（与 dsh-subagent-router `auto` 同构） |
| serial 顺序 | one-shot 子代理串行：前序产物 + handoff message 落点 → 后续子代理输入 | 与 cursor 一致（落点驱动），无需特译 |
| **无头自动实跑** | `dsh --profile headless "<链任务>"`：CI/脚本一次性跑全链 | 退出码 0/1 判定；sandbox 验证即用此形态 |

## 不变维（继承 pi / 全 harness 通用）

- 落点：`.agents/plan-progress.yaml` + `.agents/messages/<roster_id>/` + `docs/`（与 cursor 同构）
- 并发写：plan-progress 为共享可变落点 → [file-lock-contract](../../docs/design/file-lock-contract.md) territory 声明（R3 教训条款）
- gate：confirm 级 = 落点文件「待人确认」节 + 操作者人核（dsh 的 approval 机制可为辅助）
- identity/traceability：`--strict` 双绿后工作项方可 completed

## 委派任务模板（父会话 → 子代理）

```text
按 agents/packs/<pack>/harness/dsh-agents/<slot>.md 的角色定义执行：

任务：<work_item id 与描述>
输入：.agents/plan-progress.yaml + <前序产物路径 或 handoff message 路径>
产出：<该槽位产物落点>
约束：完成后写 handoff message 到 .agents/messages/<roster_id>/（type: handoff, from_slot_id: <slot>）
      更新 plan-progress（active_slot_id → 下一槽位 · completed_work_item_ids += <id>）
```

（模板内容 = 槽位片段 + 任务指令；dsh 父会话原样转发，扶摇不造额外协议。）

## 验收（v0.33）

- [x] README · MAPPING（差异维翻译）· 委派任务模板
- [x] sandbox 实跑：minimal-research-to-spec 全链经 `ctx.subagents` 委派驱动（headless 一次性模式）
- [x] roster / pack 零改动
