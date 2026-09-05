<div style="text-align:center">

# 扶摇 · Nomad

**开源 · DDD 驱动 · 可组合的 Agent 团队框架**

团队优先 · 薄适配器挂载任意 harness · 仪式感随场景调节

[![npm](https://img.shields.io/badge/npm-fuyao--nomad-cb3837)](https://www.npmjs.com/package/fuyao-nomad)
[![Release](https://img.shields.io/badge/Release-v1.0.0--alpha.1-blue)](https://github.com/NinjaSln-labs/fuyao-nomad/releases)
[![License](https://img.shields.io/badge/License-Apache--2.0-green)](LICENSE)

[15 分钟上手](product/get-started.md) · [组合协议](design/composition-protocol.md) · [五家挂载](harness-README.md) · [GitHub](https://github.com/NinjaSln-labs/fuyao-nomad)

</div>

---

## 为什么是「团队」框架

单 Agent 再强，也只是一个超人。真实交付需要**分工**：谁主张、谁验证、谁记录、谁喊停。
扶摇把这套团队层协议做成**数据**——角色槽位、交接规则、进度契约、审计门——不绑定任何
IDE 或运行时，挂上就能用。

```
AI 员工产品       → 一个强个体，封闭运行时
多 Agent 编排框架  → 编排 API，缺管理/质量/交付模式
Harness 内置 Agent → 单 Agent 或浅子代理
─────────────────────────────────────────────
扶摇 · Nomad     → 团队协议 + DDD + 可组合规则 + 薄适配器挂载
                    （不造 harness，不卖单体 AI 员工）
```

## 三种使用方式

### 1 · npm（推荐）

```bash
npm i fuyao-nomad
npx fuyao-nomad init --project . --pack starter-solo --intent "一句话目标"
```

一条命令：选团队包 → 安装（pack + Cursor 子代理）→ 生成 `.agents/plan-progress.yaml` 计划骨架。

### 2 · npx（免安装试用）

```bash
npx -y fuyao-nomad@alpha init --project . --pack starter-solo --intent "试用"
```

### 3 · 源码

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
node fuyao-nomad/scripts/fuyao-init.mjs --project . --pack starter-solo --intent "一句话目标"
```

## 核心对象（30 秒版）

| 对象 | 是什么 |
|------|--------|
| **Role Slot（角色槽）** | 可激活的职责单元：purpose/boundaries/gate_level——是「岗位」不是「人」 |
| **Team Roster（花名册）** | 当前阵容：槽位 + 编排（串行/并行/混合）+ flow_weight 仪式档位 |
| **plan-progress.yaml** | 唯一进度载体：计划 + 执行状态 + 阻塞 + 身份约束，一文件交接 |
| **Team Pack（团队包）** | 可发布可安装的完整团队规格：roster + 模板 + 薄适配器 |

## 能力域八问

| # | 域 | 核心问题 |
|---|----|---------|
| 1 | 团队组合 | 槽位如何定义、增删、定界？ |
| 2 | 编排协作 | 并行下如何不空转、不争抢、能升级？ |
| 3 | 进度管理 | 谁记里程碑、进度、阻塞？ |
| 4 | 交付模式 | DDD 基座上如何调仪式轻重？ |
| 5 | 质量验证 | 什么算「完成」？如何防幻觉交付？ |
| 6 | 治理审计 | 哪些要人确认？留什么痕？ |
| 7 | 研究产品 | 竞研/PRD/发现如何进团队协议？ |
| 8 | 可移植挂载 | 不重写 harness 如何挂载团队？ |

→ 每域展开见[能力模型](product/capability-model.md)

## 五家挂载 · 一条导出链

| 证据级 | harness |
|--------|---------|
| mounted（挂载级） | pi · dsh · cursor · qoder · claude |
| runtime-smoke | langgraph（StateGraph 消费 roster+mapping · 6/6 断言） |
| 文档级 | crewai · openhands（冻结 · 认领须维护者环境） |

同一份团队包，换 harness 只换 mapping 表——[五家证据](harness-README.md)。

## 什么时候用哪档

| flow_weight | 适合 | 仪式 |
|-------------|------|------|
| 轻 | 单人 · 小改动 | DoD 清单 + 自验证 |
| 中 | 多槽协作 · 需审计 | + 里程碑审计门 |
| 全流程 | 交付级 · 外部依赖 | + 三重审计 + 身份约束 strict |

六档详见[模板](templates/README.md) · 档位调轻调重改 roster 一个字段。

## 下一步

| 想要 | 去 |
|------|-----|
| 15 分钟跑通 | [get-started](product/get-started.md) |
| 理解协议 | [组合协议](design/composition-protocol.md) |
| 做自己的团队包 | [Builder 指南](product/builder-guide.md) |
| 换 harness | [五家挂载](harness-README.md) |
| 提问/贡献 | [GitHub Issues](https://github.com/NinjaSln-labs/fuyao-nomad/issues) · [CONTRIBUTING](CONTRIBUTING.md) |

---

---

Apache-2.0 · npm 包 `fuyao-nomad` · 主路线 v0.32 → v1.0.0-alpha.1 已闭环
