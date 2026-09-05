<div align="center">

# Fuyao · Nomad · 扶摇

> *Rise on the Wind* · **鹏之徙于南冥也，水击三千里，抟扶摇而上者九万里**
> Open-source **agent team framework** — team-first, DDD-driven, mounts on any harness (**not a harness**).

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![CI](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml/badge.svg)](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml)
[![Release](https://img.shields.io/badge/Release-v0.36.0-blue)](https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v0.36.0)

**[中文](README.md)** | English

</div>

---

## About

**Fuyao (fú yáo, "soaring wind")** — from Zhuangzi’s *Free and Easy Wandering*: *"Rising ninety thousand li on the whirlwind."* **Nomad** = portable team specs that do not lock you to one harness.

Open-source **agent team framework** — defines how multi-role teams collaborate and deliver with adjustable process weight (`flow_weight`), mounted via thin adapters onto pi / dsh / Cursor / Qoder / Claude Code / CLI / LangGraph / CrewAI (**does not replace harnesses or orchestration engines**).

- **One-line goal**: give builders, small teams, and solo developers reusable **team protocols** (roster, handoff, plan/progress, DoD/verification/DDD gates) instead of one-off prompt stacks.
- **Positioning**: AI-employee products sell a strong individual; orchestration frameworks sell runtime APIs; IDE agents stay shallow — Fuyao sells **team-layer specs + DDD foundation + open extensibility**.
- **Dual name**: **Fuyao (扶摇)** = soul of the team (multi-role collaboration); **Nomad** = portable specs (works anywhere).
- **Eight capability domains**: composition · orchestration & contention · progress · delivery (`flow_weight`) · quality · governance · research/product · harness mount.
- **Thin adapter rule**: roster / pack are harness-agnostic; `harness/` only maps slots — **no** generic IDE runtime.

> **Primary documentation is Chinese.** See [README.md](README.md) for full product/design navigation and roadmap.

## Status

| Area | Status |
|------|--------|
| Product / design docs `docs/` | ✅ Finalized (problem statement · north star · capability model · composition protocol) |
| JSON Schema + six `flow_weight` tiers | ✅ roster · plan-progress · DoD · verification · DDD gate · **stage · commit-policy** · audit-record |
| Team pack `packs/minimal-research-to-spec` | ✅ pack validate / install |
| Harness thin adapters | ✅ **five harnesses mounted-level verified** (pi · dsh · cursor · qoder · claude · one pack unchanged) · CLI · **LangGraph / CrewAI export** · OpenHands frozen |
| Message protocol + contention advisory | ✅ message validate · `check:contention` (territory overlap + CI `--strict`) |
| Validation & tests | ✅ `validate` 47 checks · `npm test` 21 tests · GitHub Actions |
| Open release | ✅ **v0.36.0** — [CHANGELOG](CHANGELOG.md) · [ROADMAP](ROADMAP.md) |

Maintainer releases require **two local audits** (`.agents/audit/`: **release audit** 100/100 + **code quality audit** pass/pass_with_notes; not in repo; order: both audits → release commit → tag → Release). Checklist: [release-checklist.md](docs/product/examples/release-checklist.md) · `npm run release:preflight`. Public contract: [docs/audit/README.md](docs/audit/README.md).

## Layout

| Path | Content |
|------|---------|
| `docs/product/` | Problem statement · north star · delivery model · capability model · builder guide · roadmap (Chinese) |
| `docs/design/` | Composition protocol · handoff · plan-progress · message/escalation/contention contracts · JSON Schema |
| `docs/templates/` | Six `flow_weight` tiers (DoD · verification · ddd-gate · **stage · commit-policy**, etc.) |
| `agents/examples/` | minimal-roster · plan-progress · message examples |
| `packs/` | Official team pack example (roster + templates + harness mapping + skills) |
| `harness/` | **pi · dsh · Cursor · Qoder · Claude** (five mounted-level verified) · CLI · LangGraph / CrewAI export · OpenHands frozen — **thin adapters** (not core product) |
| `skills/` | Portable skills (**not** synced to harness paths) |
| `scripts/` | `validate` · `pack` · `check:*` · `install:cursor-agents` · `release:preflight` |
| `docs/product/examples/` | Dogfood / adopt playbooks · matrices · release checklist |
| `ROADMAP.md` | Version milestones and backlog |

## Development

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
cd fuyao-nomad
npm install

npm run validate
npm test
npm run install:cursor-agents -- --project .
npm run check:contention -- --project .
npm run pack:install -- --pack packs/minimal-research-to-spec --project .
```

- [Builder guide](docs/product/builder-guide.md) (Chinese)
- [Contributing](CONTRIBUTING.md)

## Roadmap

**Current: v0.36.0** — langgraph runtime smoke (first runtime-level evidence, 6/6 assertions · R15 contract fix: dynamic interrupt() gate).
**Next:** v0.37 shuijing adopt → v0.38 solo starter → v0.39 English core docs → **1.0.0-alpha.1 contract freeze**. Full version table: [README.md](README.md) (Chinese, authoritative) · [ROADMAP.md](ROADMAP.md).

### Non-goals

- No generic harness / IDE runtime
- No LangGraph / CrewAI engines (export mapping only)
- No mandatory “official roster”
- Research snapshots do not auto-expand product scope

## License

[Apache-2.0](LICENSE) © 2026 NinjaSln Labs · [NinjaSln-labs](https://github.com/NinjaSln-labs)
