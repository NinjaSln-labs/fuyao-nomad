# 模型与 Harness 契约

> **状态：③ 设计 · v0.10**  
> 扶摇 **不实现** LLM 调用；本契约描述团队 spec 如何 **声明** 模型策略，由 harness **翻译**。

## 边界

| 扶摇 | Harness（Cursor / CLI / OpenHands / LangGraph / CrewAI…） |
|------|----------------------------------------------------------|
| `model_policy`（roster 级） | 团队默认 / 按 kind / 按槽位提示 |
| `slots[].model_hint` | 槽位覆盖 |
| mapping `model_hints` | **harness 侧覆盖**（安装或导出时优先） |
| 默认 | 主 agent / 项目 / runtime 设置决定模型 |

## 解析优先级（高 → 低）

```
1. mapping.model_hints[slot_id]     # harness 覆盖
2. slots[].model_hint               # 槽位显式
3. model_policy.by_slot[slot_id]    # 团队按槽位
4. model_policy.by_slot_kind[kind]  # 团队按 slot_kind
5. model_policy.default             # 团队默认
6. （省略）→ runtime / 主 agent 默认
```

提示值为 **字符串，不锁枚举**；常见约定：

| 提示值（示例） | 含义（示意） |
|----------------|--------------|
| `inherit` | 继承主 agent / 父图默认模型 |
| `fast` | 轻任务 / 低成本 |
| `quality` | 重推理 / 高质量 |

## roster · model_policy

可选对象，声明团队级策略（多 harness **共用同一份**）：

```yaml
model_policy:
  default: inherit
  by_slot_kind:
    auditor: inherit
    progress: fast
  by_slot:
    research: fast
  notes: "调研用 fast；审计跟主模型"
```

## roster · model_hint

槽位可选覆盖（高于 `model_policy.by_*`，低于 mapping）：

```yaml
slots:
  - id: auditor
    model_hint: inherit
```

## Cursor mapping · model_hints

`harness/cursor/mapping.yaml` 可覆盖 roster：

```yaml
mappings:
  research: research-analyst
  auditor: quality-auditor

model_hints:
  auditor: inherit
```

`npm run install:cursor-agents`：

1. 若提供 `--roster`，按上表优先级解析每槽有效 hint  
2. 未提供 roster 时，行为与 v0.7 相同：仅用 mapping `model_hints`  
3. 写入 `.cursor/agents/*.md` 的 `model:` 行

## 其他 harness

| 适配 | 翻译方式 |
|------|----------|
| CLI / OpenHands | runner / agent 片段读有效 hint 或环境配置；深化见 [cli-openhands-adapter.md](./cli-openhands-adapter.md) |
| LangGraph | node 可配置 model（见导出映射） |
| CrewAI | Agent LLM 配置（见导出映射） |

**同一份 `model_policy` + 槽位 hint**；各 harness 只换「如何写入 runtime」。

## 不做

- API Key · provider 路由 · fallback 链 · 计费 — **runtime 或用户配置**
- 扶摇内置 `openai.chat()` 等
- 强制枚举厂商模型 id（提示保持 portable）

## 验收

- [x] roster schema `model_hint`（v0.7）
- [x] Cursor install 应用 `model_hints`（v0.7）
- [x] roster schema `model_policy` + 优先级文档（v0.10）
- [x] `install:cursor-agents --roster` 合并解析
- [x] 示例 roster / pack 含 `model_policy`
- [x] LangGraph / CrewAI / CLI / OpenHands 映射文档引用本契约
