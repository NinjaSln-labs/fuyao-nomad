# North Star (English)

> **Status: final** · Chinese is the authoritative source: [north-star.md](north-star.md)

## One-liner

**An open-source, DDD-driven, composable Agent team framework — team-first, mounts onto any harness, with ceremony weight tuned per context.**

## Dual name

| | Meaning |
|---|------|
| **扶摇 (Fuyao)** | The soul of the team: multiple roles collaborating freely, unbound to one place |
| **Nomad** | The team's capability: specs are portable, the team can settle anywhere |

## Positioning

```
AI employee products     →  one strong individual, closed runtime
Multi-agent frameworks   →  orchestration APIs, lacking management/quality/delivery patterns
Harness built-in agents  →  single agent or shallow subagents
──────────────────────────────────────────────────────────
Fuyao · Nomad            →  team framework + DDD + composition rules + open builder-first
                            thin adapters mount onto harnesses; we do NOT build harnesses
```

## Eight capability domains

| Domain | Core question |
|--------|--------------|
| 1. Team composition | How to define slots, add/remove, boundaries? |
| 2. Orchestration & collaboration | How to avoid spinning wheels in parallelism, contention, escalation? |
| 3. Progress & management | Who tracks milestones, progress, blockers? |
| 4. Delivery patterns | How to tune ceremony weight on a DDD base? |
| 5. Quality & verification | What counts as "done"? How to prevent hallucinated delivery? |
| 6. Governance & audit | What needs human confirmation? What trail is kept? |
| 7. Research & product | How do competitive research, PRDs, findings enter team protocols? |
| 8. Portable mounting | How to mount a team without rewriting a harness? |

## Audience cascade

```
Agent Builder → small team → solo
 extensible      collaborative   works by default
```

## Success criteria (final · 2026-08-22)

| Level | Criterion |
|-------|-----------|
| **Builder** | Can publish a "team pack": slots + skills + gates + `flow_weight`, others can fork and adjust |
| **Small team** | Shared roster and audit chain; progress and DoD states are handoff-able |
| **Solo** | Default team completes a typical task class (e.g. research → spec → implementation) |
| **Portability** | Same team pack mounts on ≥2 harnesses, core spec unchanged |

**Portability status**: five harnesses verified at mounted level (pi / dsh / cursor / qoder / claude, v0.32–v0.35) with zero pack changes — see [harness/README](../../../harness/README.md).

## Anti-metrics (final)

| Anti-metric | Meaning |
|------------|---------|
| Default ceremony too heavy | Small tasks still demand full docs and multi-wave audits |
| Composition locked-in | Users must accept an "official role table" to use it |
| Harness penetration | Team core logic depends on a specific IDE's private API |
| Monolith regression | Operation degrades to a single agent + a long prompt |

## Differentiation

**One-liner**: open-source Agent team framework — DDD + adjustable composition rules + **light-to-heavy ceremony weight**; thin adapters mount onto harnesses, **we do not build harnesses, we do not sell monolithic AI employees**.

**We don't compete on orchestration** — CrewAI / Cursor / Devin strengthen runtimes; Fuyao defines the **team layer** spec, mappable to each runtime.

**Nearest neighbor** — BMAD (methodology + multi-role); Fuyao differs in **DDD necessity + composition protocol + cross-harness team packs**.
