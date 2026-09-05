# Composition Protocol (English)

> Chinese is the authoritative source: [composition-protocol.md](../design/composition-protocol.md)

## Principles

1. **No fixed composition** — there is no official role roster, no "standard eight-person team".
2. **Slots add/remove freely** — who joins or leaves is defined per project by the user.
3. **Generic rules** — the framework only specifies how slots are declared, bound to capabilities, and handed off.
4. **Examples are not the essence** — any thematic role names are examples, deletable and replaceable.

## Core objects

### Role Slot

The activatable unit of agent responsibility (roster `slots[]`):

| Field | Meaning |
|-------|---------|
| `id` | slot identifier |
| `purpose` | one-line responsibility |
| `boundaries` | do / don't |
| `inputs` / `outputs` | expected artifact types |
| `capabilities` | bound skills / tools |
| `gate_level` | `auto` / `confirm` / `forbid` |
| `slot_kind` | `generic` / `progress` / `verifier` / `auditor` |
| `model_hint` | model tier hint, translated by harness |

### Team Roster

The **current formation** for a task or project — data, not brand asset:

- `slots[]` — active role slots
- `orchestration` — serial (`serial_order`) / parallel (`parallel_groups`) / mixed; `orthogonal_slots` (progress/auditor) run beside the main chain
- `flow_weight` — ceremony weight (light → full-cycle, extensible)
- `handoff` — **optional**; `use_defaults: true` + optional `rules[]`

### Handoff

Fuyao ships **default handoff behavior + the capability to override it** — users never *must* write rules.

| Trigger | Default action |
|---------|----------------|
| Slot DoD complete | Pass to next responsible slot per `orchestration` |
| Blocked | Escalate to a progress-type slot if present; else to the orchestrating slot |
| Human confirmation needed | Pause at `gate_level` confirm/forbid; spec-confirmed changes must be checked against intent / identity constraints |
| Carrier | HANDOFF snippet / checklist / declared slot `outputs` |

Custom rules (`from`/`to`/`when`/`artifact`/`overrides_default`) override or refine defaults per edge.

## Operations

| Operation | Meaning |
|-----------|---------|
| Add slot | Declare a new Role Slot or copy from a team pack |
| Remove slot | Disable in roster; sync custom handoff rules |
| Replace slot | Same responsibility, different implementation (skills/prompt) |
| Tune weight | Change `flow_weight`; DoD / verification / gates follow |
| Configure handoff | Optional `handoff.rules`; unset → defaults |

## Relation to harnesses

Rosters are harness-agnostic. A roster mounts onto a harness by a **mapping table** (slot id → runtime agent name) plus prompt fragments — see [harness/README](../../../harness/README.md) (five harnesses at mounted level, one runtime smoke).
