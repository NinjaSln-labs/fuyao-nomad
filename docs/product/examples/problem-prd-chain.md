# 问题陈述 · PRD-lite 产物链

> **状态：④ 交付 · v0.12**  
> 能力域：[capability-model.md](../capability-model.md) §7

## 一句话

调研 → **问题陈述** →（重端可选）**PRD-lite** → 规格 / plan；PRD **不**自动成为最高权威。

## 权威文件

| 文件 | 用途 |
|------|------|
| [problem-statement.md](../problem-statement.md) | 扶摇产品自身问题陈述（叙述权威） |
| [problem-statement-中.yaml](../../templates/problem-statement-中.yaml) | 项目可实例化模板 |
| [prd-lite-重.yaml](../../templates/prd-lite-重.yaml) | 重端可选 PRD-lite |
| [research-spec-impl-chain.md](./research-spec-impl-chain.md) | 槽位换手 dogfood |
| [ADR-0004](../../decisions/adr-0004-research-deauthorize.yaml) | 调研去权威化 |

## 推荐顺序

```text
research snapshot（去权威）
    → problem_statement 模板实例
        →（重/全流程）prd-lite 模板实例
            → plan-progress / spec 槽位产出
```

## 校验

```bash
npm run validate
```

模板由 `validate` 按文件名前缀识别：`problem-statement-` · `prd-lite-`。
