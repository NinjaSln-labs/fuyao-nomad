# Get Started in 15 Minutes (English)

> Chinese is the authoritative source: [get-started.md](get-started.md) · measured at ~12 minutes by dogfood-lite (v0.38)

## What you need

- Node ≥ 20 · Git
- A clone of [fuyao-nomad](https://github.com/NinjaSln-labs/fuyao-nomad)

```bash
git clone https://github.com/NinjaSln-labs/fuyao-nomad.git
cd fuyao-nomad && npm ci
```

## Minutes 0–3 · One command to scaffold

```bash
mkdir my-project && cd my-project && git init

node <fuyao-nomad>/scripts/fuyao-init.mjs \
  --project . --pack starter-solo --intent "one-line goal"
```

This installs the pack (`agents/packs/starter-solo/`), the Cursor subagents (`.cursor/agents/`), and generates a plan skeleton (`.agents/plan-progress.yaml`) — the only file you need to edit.

## Minutes 3–6 · Make the plan yours

Edit `.agents/plan-progress.yaml`:

1. **intent** — your goal (skip if passed via `--intent`)
2. **plan.work_items** — retitle each item in your words (keep ids/structure)
3. **identity_constraints** (optional, recommended) — 1 non-negotiable identity word from the intent:

```yaml
identity_constraints:
  - id: ic-local-first
    phrase: local-first
    meaning: data stays on this machine; sync is optional add-on, never a prerequisite
    enforcement: blocker_if_unmet
```

If you plan to run `check:traceability --strict`, also declare domain concepts and link them to work items:

```yaml
traceability:
  domain_concepts:
    - { id: dc-todo, name: TodoEntry }
  links:
    - { domain_concept_id: dc-todo, work_item_id: wi-builder }
    - { domain_concept_id: dc-todo, work_item_id: wi-reviewer }
```

Validate:

```bash
node <fuyao-nomad>/scripts/validate.mjs --path .agents/plan-progress.yaml
```

> **Identity strict note**: with identity_constraints declared, `check:identity --strict` expects
> the first verification to be recorded as a **cleared blocker with evidence** — the very first
> check is your v0 violation record. Light tier doesn't mandate this.

## Minutes 6–12 · Work: builder → reviewer

**builder**: complete `wi-builder` — the smallest verifiable deliverable at a clear path; then append `wi-builder` to `completed_work_item_ids` and update `handoff_snippet`.

**reviewer** (`gate=confirm`): complete `wi-reviewer` — verify word-by-word against intent and identity constraints. Any drift → record in `progress.blockers` with `related_identity_constraint_ids`; **do not** self-pass. On pass → update the snippet.

Solo mode: you may play both slots — **but in two separate contexts** (finish builder, then switch to the reviewer's fresh perspective). Post-hoc verification, not write-and-self-review.

## Minutes 12–15 · Close with three greens

```bash
node <fuyao-nomad>/scripts/check-identity.mjs --project . --plan .agents/plan-progress.yaml --strict
node <fuyao-nomad>/scripts/check-traceability.mjs --project . --plan .agents/plan-progress.yaml --strict
node <fuyao-nomad>/scripts/check-contention.mjs --project .
```

All green → update `progress.updated_at`; milestone **m-done** reached. Commit to your project repo.

## Where next

| Want | Go |
|------|-----|
| Heavier tiers (medium/full-cycle) | [dogfood playbook](./examples/dogfood-playbook.md) (Chinese) |
| Five harness mounts | [harness/README](../../../harness/README.md) |
| Adopting a real product repo | [adopt playbook](./examples/fuyao-adopt-playbook.md) (Chinese) |
| Full protocol design | [architecture](../design/architecture.md) |

## Three pitfalls to avoid

1. **Identity words are hard constraints** — category words in the intent (e.g. "local-first") cannot be trimmed away; the reviewer checks word-by-word.
2. **Blockers need evidence** — clearing an identity blocker requires an `evidence` path to the verification record.
3. **Sandbox stays local** — pack assets (`agents/packs/`, `.cursor/agents/`) may be committed, but experimental projects default to local-only.
