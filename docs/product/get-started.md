# 15 分钟上手（单人开箱）

> 你将用一个团队包、一条主链、两个正交职责，把一个想法推进到可验证交付。
> 零协议文档依赖——本页就是全部；细节链接按需深入。

## 你需要

- Node ≥ 20 · Git
- 本机可访问 [fuyao-nomad](https://github.com/NinjaSln-labs/fuyao-nomad)（clone 或 fork）

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
cd fuyao-nomad && npm ci
```

## 分钟 0–3 · 建项目 + 一条命令开箱

```bash
# 你的项目（任何空目录；Sandbox 仅本地，勿推 GitHub）
mkdir my-project && cd my-project && git init

# 一条命令：选包 → 安装 → 生成计划骨架
node <fuyao-nomad 路径>/scripts/fuyao-init.mjs \
  --project . --pack starter-solo --intent "一句话目标"
```

产物：

| 产物 | 位置 | 作用 |
|------|------|------|
| 团队包 | `agents/packs/starter-solo/` | 编队契约（槽位/编排/模板） |
| Cursor subagents | `.cursor/agents/` | harness 挂载（4 个角色文件） |
| 计划骨架 | `.agents/plan-progress.yaml` | 你要编辑的唯一文件 |

## 分钟 3–6 · 把骨架改成你的计划

打开 `.agents/plan-progress.yaml`，只改三处：

1. **intent**：你的目标（若 `--intent` 已传则跳过）
2. **plan.work_items**：每项 `title` 换成你的语言（id/结构勿动）
3. **identity_constraints**（可选但推荐）：从 intent 抽 1 条不可裁剪的身份约束

```yaml
identity_constraints:
  - id: ic-local-first
    phrase: 本地优先
    meaning: 数据不出本机；同步是可选附加而非前提
    enforcement: blocker_if_unmet
```

若后续跑 `check:traceability --strict`，还需把交付物声明为领域概念并链到工作项：

```yaml
traceability:
  domain_concepts:
    - { id: dc-todo, name: TodoEntry }
  links:
    - { domain_concept_id: dc-todo, work_item_id: wi-builder }
    - { domain_concept_id: dc-todo, work_item_id: wi-reviewer }
```

校验（应绿；identity strict 需把验证记录为已清 blocker 的 evidence，见下）：

```bash
node <fuyao-nomad>/scripts/validate.mjs --path .agents/plan-progress.yaml
```

> **identity strict 提示**：加了 identity_constraints 又要跑 `check:identity --strict` 的，
> 需把核验记录落盘为 evidence 并声明 cleared blocker（哪怕核验即通过——首次核验
> 就是 v0→v1 的违规发现记录）。轻档不强制，见 [identity-constraints.md](../design/identity-constraints.md)。

## 分钟 6–12 · 干活：builder → reviewer

**builder（你，或你的 AI 编码工具）**：完成 `wi-builder`——写代码/脚本/文档切片，
落盘到明确路径，完成后：

- `progress.completed_work_item_ids` 加 `wi-builder`
- `handoff_snippet` 写一行交接摘要

**reviewer（gate=confirm）**：完成 `wi-reviewer`——逐项对照 intent 与身份词核验：

- 偏差 → 记入 `progress.blockers`（挂 `related_identity_constraint_ids`），**不要**放行
- 通过 → 更新 handoff_snippet，主链完成

> 单人模式下你可以自己扮演两个槽位——**但要分两次会话/两个上下文**（builder 写完再切
> reviewer 视角），这是「编排」的最低要求：身份词核验必须是后置视角而非边写边自评。

## 分钟 12–15 · 收口三绿

```bash
# 在你的项目根：
node <fuyao-nomad>/scripts/check-identity.mjs \
  --project . --plan .agents/plan-progress.yaml --strict   # 若加了 identity
node <fuyao-nomad>/scripts/check-traceability.mjs \
  --project . --plan .agents/plan-progress.yaml --strict
node <fuyao-nomad>/scripts/check-contention.mjs --project .
```

全绿 → `progress.updated_at` 更新，主链 **m-done** 达成。提交 git（你的项目仓）。

## 然后呢

| 想要 | 去处 |
|------|------|
| 更多档位（中/重/全流程） | [dogfood 剧本](./examples/dogfood-playbook.md) |
| 五家 harness 挂载（pi/dsh/cursor/qoder/claude） | [harness/README](../../../harness/README.md) |
| 真实产品接手 | [adopt 剧本](./examples/fuyao-adopt-playbook.md) |
| 全部协议设计 | [docs/design/architecture.md](../design/architecture.md) |

## 三个不踩坑提醒

1. **身份词是硬约束**：intent 里的品类词（如「本地优先」）裁剪不得删除——reviewer 逐词核对
2. **blocker 要证据**：清除身份类 blocker 时必须 `evidence`（路径指向审计/验证文件）
3. **Sandbox 勿推 GitHub**：`.cursor/agents/` 与 `agents/packs/` 是团队资产可提交，
   但实验性项目本身默认本地 only

---

*时间统计基于维护者实跑（dogfood-lite v0.38）：骨架生成 <1 分钟 · 计划修订 2 分钟 ·
主链 6 分钟 · 收口 2 分钟。新手首次 25–40 分钟属正常——卡住先看 [架构总览](../design/architecture.md)。*
