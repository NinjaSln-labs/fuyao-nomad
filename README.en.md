# Fuyao · Nomad

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![CI](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml/badge.svg)](https://github.com/NinjaSln-labs/fuyao-nomad/actions/workflows/validate.yml)

Open-source **agent team framework** — team-first, DDD-driven, mounts on any harness (**not a harness**).

- **Fuyao (扶摇)** — the soul of the team: multi-role collaboration  
- **Nomad** — portable specs that travel with your team  

> 中文主文档：[README.md](README.md)

## What it is

Fuyao · Nomad defines a **portable team layer**: roster composition, handoff rules, plan/progress contracts, DoD / verification / DDD-gate templates, and quality audits scaled by **flow_weight** (light-to-heavy process weight). Orchestrators (LangGraph, CrewAI, …) and IDE harnesses (Cursor, …) integrate via **thin adapters** — the framework does not replace them.

**Audience**: agent builders, small teams, and solo developers who want reusable **team protocols** instead of one-off prompt stacks.

## Quick start

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
cd fuyao-nomad
npm install
npm run validate
npm test
npm run install:cursor-agents -- --project .
```

- [Builder guide](docs/product/builder-guide.md) (Chinese)  
- [Contributing](CONTRIBUTING.md)  
- [Changelog](CHANGELOG.md)  

## Core concepts

| Concept | Description |
|---------|-------------|
| **Roster** | Slot composition: add/remove roles, serial/parallel, orthogonal slots (progress/audit) |
| **flow_weight** | Light-to-heavy spectrum: binds DoD, verification, DDD gate, audit depth |
| **handoff** | Defaults + optional `handoff.rules` |
| **Plan / Progress** | `.agents/plan-progress.yaml` — intent, milestones, `audit_gate` |
| **Thin harness adapter** | e.g. `harness/cursor/` — maps slots to subagents without changing roster |

## Documentation

| # | Doc |
|---|-----|
| 1 | [Product index](docs/product/README.md) |
| 2 | [Problem statement](docs/product/problem-statement.md) |
| 3 | [North star](docs/product/north-star.md) |
| 4 | [Delivery model](docs/product/delivery-model.md) |
| 5 | [Capability model](docs/product/capability-model.md) |
| 6 | [Composition protocol](docs/design/composition-protocol.md) |
| 7 | [Domain language](docs/design/domain-language.md) |
| 8 | [Landscape snapshot](docs/research/2026-08-22-agent-team-landscape.md) (non-authoritative) |

## Roadmap

**Current: v0.3.0** — six `flow_weight` tiers · CLI mapping POC · escalation protocol.

| Version | Goal |
|---------|------|
| **v0.1.0** ✅ | Open baseline |
| **v0.2.0** ✅ | Team pack · message protocol schema |
| **v0.3.0** ✅ | Extended templates · CLI POC · escalation |
| **v0.4.x** | Contention detection · more harness docs |

See [ROADMAP.md](ROADMAP.md) · [Post-v0.1 plan](docs/product/post-v01-roadmap.md)

### Non-goals

- No generic harness / IDE runtime  
- No mandatory “official roster”  
- Research snapshots do not auto-expand product scope  

## Repository layout

```
fuyao-nomad/
├── docs/            # product, design, research, audits
├── skills/          # portable skills
├── harness/         # thin harness adapters (not core product)
├── packages/core/   # schema index
├── scripts/         # validate · install-cursor-agents
└── agents/          # example team packs (optional)
```

## Status

**v0.3.0** — see [CHANGELOG](CHANGELOG.md). Maintainer audits are **local only** (`.agents/audit/`). See [docs/audit/README.md](docs/audit/README.md).

## License

[Apache-2.0](LICENSE) — Copyright © 2026 NinjaSln Labs

Maintained by [NinjaSln-labs](https://github.com/NinjaSln-labs).
