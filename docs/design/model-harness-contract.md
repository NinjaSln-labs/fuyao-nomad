# 模型与 Harness 契约

> **状态：③ 设计 · v0.7**  
> 扶摇 **不实现** LLM 调用；本契约描述团队 spec 如何 **声明** 模型策略，由 harness **翻译**。

## 边界

| 扶摇 | Harness（Cursor / CLI / OpenHands…） |
|------|--------------------------------------|
| `slots[].model_hint` | 翻译为运行时 `model` / provider 配置 |
| mapping `model_hints` | 安装时写入 `.cursor/agents/*.md` frontmatter |
| 默认 | 主 agent / 项目设置决定模型 |

## roster · model_hint

槽位可选字段（字符串，**不锁枚举**）：

| 提示值（示例） | 含义（Cursor 侧示意） |
|----------------|----------------------|
| `inherit` | 继承主 agent 模型 |
| `fast` | 轻任务 / 低成本模型（由 harness 映射） |
| `quality` | 重推理 / 高质量模型 |

```yaml
slots:
  - id: auditor
    model_hint: inherit
```

## Cursor mapping · model_hints

`harness/cursor/mapping.yaml` 或包内映射可覆盖 roster：

```yaml
mappings:
  research: research-analyst
  auditor: quality-auditor

model_hints:
  auditor: inherit
```

`npm run install:cursor-agents` 安装时把 `model_hints` 写入 agent 文件的 `model:` 行。

## 其他 harness

CLI / OpenHands：**文档 + runner 片段**；runner 实现自行读 `model_hint` 或环境配置。

## 不做

- API Key · provider 路由 · fallback 链 · 计费 — **runtime 或用户配置**
- 扶摇内置 `openai.chat()` 等

## V0.7 验收

- [x] roster schema `model_hint`
- [x] Cursor install 应用 `model_hints`
- [x] 文档与示例 pack
