# 0→1 路径

## 阶段分层

| 层 | 内容 | 状态 |
|----|------|------|
| **① 发现** | 问题陈述、北极星、交付模式、竞品调研 | ✅ 定稿 |
| **② 定义** | 能力模型、成功标准、定位 | ✅ 定稿 |
| **③ 设计** | schema、handoff、审计、Cursor 映射 | ✅ v0.1 |
| **④ 交付** | 校验、模板、测试、CI、审计修复 | ✅ v0.1 |
| **⑤ 开源发布** | LICENSE、README、CHANGELOG | ✅ **v0.1.0** |
| **⑥ 后 v0.1** | pack · 消息 · 六档 · territory · harness · 争用 · 追溯 · 导出 · model_policy · DoD plan_refs | ✅ **v0.11.0** |
| **⑦ P1 深化** | 治理可检索（ADR）· 研究/产品产物模板 | ✅ **v0.12.0** |
| **⑧ 质量/技能 P1** | 反指标模板 · skills 绑定指南 | ✅ **v0.13.0** |
| **⑨ 验证/挂载 P1** | 对抗/边界模块 · CLI/OpenHands 深化 | ✅ **v0.14.0** |
| **⑩ 团队包迁徙** | 导入/导出 · 同 spec 换映射 | ✅ **v0.15.0** |
| **⑪ 身份约束** | intent 品类词硬约束 · DoD/审计对齐 | ✅ **v0.16.0** |
| **⑫ 质量门加深** | blocker 证据 · check:identity · Eval 可选 · 复盘 | ✅ **v0.17.0** |
| **⑬ 模板族补齐** | stage / commit-policy 六档 · schema 收紧 · 能力勾选 | ✅ **v0.18.0** |
| **⑭ Dogfood II** | 中档五模板实跑 · playbook 绑定 · 关仓范例 | ✅ **v0.19.0** |
| **⑮ Dogfood III** | 轻档五模板实跑 · 两阶段 stage · 本地 sandbox | ✅ **v0.20.0** |
| **⑯ Dogfood IV** | 重档六阶段 · 三层审计 · 矩阵对照 | ✅ **v0.21.0** |
| **⑰ Harness 移植验证** | 同一 pack 五家挂载级实跑（pi · dsh · cursor · qoder · claude） | ✅ **v0.32–v0.35** |

## 当前落点

| 阶段 | 状态 |
|------|------|
| ①–⑯ | ✅ 至 **v0.21.0** |
| ⑰ 五家移植验证 | ✅ 至 **v0.35.0** |
| ⑱+ | ▶ 1.0.0-alpha.1 契约冻结线（v0.36–v0.39） |

## 纪律

- **不做 harness** — 薄适配 only
- **无固定编制** — [composition-protocol.md](../design/composition-protocol.md)
- **轻-重流程重量** — [delivery-model.md](delivery-model.md)
