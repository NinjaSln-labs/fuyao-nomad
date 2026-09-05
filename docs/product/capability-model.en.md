# Capability Model (English)

> **Status: final** · Chinese is the authoritative source: [capability-model.md](capability-model.md)

## Boundary principles

| Layer | Fuyao does | Fuyao does NOT |
|-------|-----------|----------------|
| **Team framework** | Composition protocol, delivery patterns, governance contracts, team-pack format | Replace harnesses / orchestration runtimes |
| **Team packs** | Provide schemas and examples | Maintain an "official standard composition" |
| **Harness adapters** | Thin mappings (slot → runtime agent) | Implement IDEs, sandboxes, LLM calls |
| **Runtime** | **Export mappings** to CrewAI / LangGraph etc. | Built-in Python orchestration engines (non-goal) |

**Priorities**: **P0** = V1 must ship (contract or minimal implementation) · **P1** = follows V1, design must reserve · **P2** = explicit roadmap, does not block V1.

## Eight domains (summary)

| # | Domain | P0 highlights | Verified by |
|---|--------|---------------|-------------|
| 1 | **Team composition** | Role Slot / Team Roster schemas · default handoff behavior · add/remove/replace slot operations · `flow_weight` binding | roster.schema `/v1` · composition-protocol |
| 2 | **Orchestration & collaboration** | Orchestration *contract* (serial/parallel/mixed) — not a runtime; default-handoff trigger semantics | export-orchestration-mapping · langgraph runtime smoke (v0.36) |
| 3 | **Progress & management** | Progress carrier contract (plan + execution state in one file) · "progress-keeper" slot type (not a fixed name) | plan-progress.schema `/v1` · check:traceability |
| 4 | **Delivery patterns** | `flow_weight` six tiers (light → full-cycle) binding DoD / verification / audit depth | six-tier templates · dogfood matrix |
| 5 | **Quality & verification** | DoD checklist + verification-by-tier; identity constraints against intent; anti-hallucination via evidence | identity-constraints · verification-by-flow-weight |
| 6 | **Governance & audit** | `gate_level` (auto/confirm/forbid) · milestone audit gates (design/implementation/code-quality) · audit records local-private | audit-record.schema `/v1` · ADR-0002 |
| 7 | **Research & product** | De-authorized research snapshots; ADR-gated scope promotion; optional PRD-lite for heavy tier | ADR-0004 · research de-authorization |
| 8 | **Portable mounting** | Thin adapters per harness; one pack mounts everywhere; evidence levels: doc / install / mounted / runtime-smoke | 5 harnesses mounted-level · harness/README |

## V1 acceptance (per domain)

1. A roster with ≥2 slots + `flow_weight` runs; default handoff works with no custom rules.
2. Rosters may declare parallel slots; default behavior completes handoffs.
3. Progress lives in one `plan-progress.yaml`; milestone audit gates optional per tier.
4. `flow_weight` selects the DoD/verification/audit template family.
5. "Done" = DoD checklist + (per tier) verification items; identity words checked word-by-word.
6. confirm-gates pause for human decision; audit chain retained locally.
7. Research snapshots never auto-promote to scope.
8. Same pack mounts across harnesses by swapping mapping tables only (verified ×5 + 1 runtime smoke).

## Non-goals

- Harness / IDE / orchestration engine (ADR-0001)
- Official fixed role table (composition protocol Principle 1)
- `check:identity` / `check:traceability` in CI (ADR-0003)
- Team-pack marketplace, Jira/Linear sync, evals-on-by-default
