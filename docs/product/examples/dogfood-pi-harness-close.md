# Dogfood · pi harness 挂载关仓笔记

> v0.32 · 场景：[dogfood-pi-harness-scenario.md](./dogfood-pi-harness-scenario.md)  
> Sandbox：`fuyao-dogfood-pi-harness`（本地 only · 不上 GitHub）

## 元信息

| 项 | 值 |
|----|-----|
| **日期** | 2026-09-04 |
| **包** | minimal-research-to-spec @ 1.2.0 |
| **Harness** | **pi**（挂载级实跑 — 移植验证第一家） |
| **flow_weight** | 中 · identity `ic-pi-mount` 满足 |
| **结论** | **挂载成立** · audit pass_with_notes |

## 落点证据（sandbox 内）

| 落点 | 文件 |
|------|------|
| plan-progress | `.agents/plan-progress.yaml`（validate ✅ · identity/traceability strict ✅） |
| handoff message | `.agents/messages/.../2026-09-04T1945-handoff.yaml`（research→spec） |
| request message | `.agents/messages/.../2026-09-04T2005-request.yaml`（progress→auditor 审计门） |
| 工作产物 | `docs/research/pi-harness-snapshot.md` · `docs/spec/pi-mount-spec.md` · `docs/verify/landing-comparison.md` |
| 审计 | `.agents/audit/m-impl-code-quality.md`（pass_with_notes） |

## 落点同构结论（移植核心验证）

| 维度 | cursor 挂载 | pi 挂载 | 同构 |
|------|------------|---------|------|
| spec 层（.agents/ 结构 · schema · id 集） | ✅ | ✅ | **✅ 完全一致** |
| harness 载体 | `.cursor/agents/` | pack 内 `harness/pi-agents/` | 允许差异（spec §3 规则） |

## 记录（不阻塞，归档建议）

- **R1（存量偏差）**：cursor 样本 reading-card（v0.19）plan-progress 含 `progress.status: closed` 字段，schema 无此字段——v0.19 关仓引入的历史偏差，与本链无关。**建议**：fuyao-nomad 债务表归档（schema 增可选 `status` 或沙盒文档标注），不修历史沙盒
- **R2（正面发现）**：cursor dogfood 系样本均无 `.agents/messages/` 实文件（`messages_dir` 有声明无落盘）——**pi 链是仓内首次 message 文件实跑验证**（handoff + request 双类型，message schema 通过）

## 移植验证进度

```
pi ✅ 挂载级（v0.32 · 本笔记）
dsh ⏳ v0.33 · cursor ⏳ 挂载级补测 v0.34 · qoder ⏳ v0.35（Mac runbook）· claude ⏳ v0.35
openhands ❄️ 冻结 · langgraph/crewai ⏳ runtime smoke v0.36
```

北极星「移植」标准（同一团队包 ≥2 harness 挂载）**还差 1 家**——最快 v0.33（dsh）达成。
