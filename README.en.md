<div align="center">

# Fuyao · Nomad · 扶摇

> *Rise on the Wind* · **鹏之徙于南冥也，水击三千里，抟扶摇而上者九万里**
> Open-source **agent team framework** — team-first, DDD-driven, mounts on any harness (**not a harness**).

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![CI](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml/badge.svg)](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml)
[![Release](https://img.shields.io/badge/Release-v1.0.0--alpha.2-blue)](https://github.com/NinjaSln-labs/fuyao-nomad/releases/tag/v1.0.0-alpha.2)

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
| Validation & tests | ✅ `validate` 50 checks · `npm test` 34 tests · GitHub Actions |
| Open release | ✅ **v1.0.0-alpha.2** — [CHANGELOG](CHANGELOG.md) · [ROADMAP](ROADMAP.md) · [Docs site](https://ninjasln-labs.github.io/fuyao-nomad/) |

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

## Usage (three channels)

### 1 · npm (recommended)

```bash
mkdir my-project && cd my-project && git init
npm i fuyao-nomad
npx fuyao-nomad init --project . --pack starter-solo --intent "one-line goal"
```

One command: pick a team pack → install (pack → `agents/packs/` + Cursor subagents → `.cursor/agents/`) → generate the `.agents/plan-progress.yaml` plan skeleton. Then verify:

```bash
npx fuyao-nomad validate --path .agents/plan-progress.yaml
npx fuyao-nomad check identity --project . --plan .agents/plan-progress.yaml --strict
```

Full CLI: `fuyao-nomad init` · `fuyao-nomad pack validate|import|export` · `fuyao-nomad validate` · `fuyao-nomad check identity|traceability|contention` · `fuyao-nomad install:cursor` (see `fuyao-nomad --help`).

### 2 · npx (no install)

```bash
npx -y fuyao-nomad@alpha init --project . --pack starter-solo --intent "trial"
```

### 3 · From source

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
node fuyao-nomad/scripts/fuyao-init.mjs --project . --pack starter-solo --intent "one-line goal"
```

> Full tutorial (minute-by-minute, three pitfalls): [get-started.en.md](docs/product/get-started.en.md) (15 min · measured 12 min) · [中文](docs/product/get-started.md) · Docs site: [GitHub Pages](https://ninjasln-labs.github.io/fuyao-nomad/)

## Development (repo contributors)

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
cd fuyao-nomad
npm ci

npm run validate          # 50 checks
npm test                  # 34 tests
npm run install:cursor-agents -- --project .
npm run check:contention -- --project .
npm run pack:install -- --pack packs/minimal-research-to-spec --project .
```

- [Get started (15-min)](docs/product/get-started.en.md)
- [North star](docs/product/north-star.en.md) · [Capability model](docs/product/capability-model.en.md)
- [Composition protocol](docs/design/composition-protocol.en.md) · [Team pack](docs/design/team-pack.en.md)
- [Schema stability ($id)](docs/design/schema-stability.md) · [CONTRIBUTING](CONTRIBUTING.md)
- [Builder guide](docs/product/builder-guide.md) (Chinese)
- [Contributing](CONTRIBUTING.md)

## Roadmap

**Current: v1.0.0-alpha.1** — contract freeze (ADR-0005, five surfaces A–E) + regression expansion 24→34 tests + `validate --path` refuses unknown-type silent pass.
**Next:** community feedback → 1.0.0 stable. Full version table: [README.md](README.md) (Chinese, authoritative) · [ROADMAP.md](ROADMAP.md).

### Non-goals

- No generic harness / IDE runtime
- No LangGraph / CrewAI engines (export mapping only)
- No mandatory “official roster”
- Research snapshots do not auto-expand product scope

## License

[Apache-2.0](LICENSE) © 2026 NinjaSln Labs · [NinjaSln-labs](https://github.com/NinjaSln-labs)
