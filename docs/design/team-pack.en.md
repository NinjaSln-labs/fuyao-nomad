# Team Pack (English)

> Chinese is the authoritative source: [team-pack.md](../design/team-pack.md)

## What it is

A **team pack** = a publishable, installable, complete team spec: harness-agnostic core + optional thin adapters.

```
pack.yaml          # manifest (this contract)
roster.yaml        # team instance
templates/         # flow_weight-bound dod · verification · ddd_gate
harness/<runtime>/ # optional: mapping + agents/runners
skills/            # optional: portable skills (stay in the pack)
```

Swapping harnesses: **roster + templates + in-pack skills keep their paths**; only `harness_adapters` (mapping tables and agent definitions) change.

**Skills never enter harness paths**: pack `skills/` land under `agents/packs/<id>/skills/` at install time and are **not** copied to `.cursor/skills` or any harness directory.

## Manifest fields (pack.yaml)

| Field | Meaning |
|-------|---------|
| `version` | `0.1` |
| `id` | pack id (`a-z0-9-`) |
| `name` | human-readable name |
| `flow_weight` | matches the template family |
| `roster` | roster path (relative) |
| `templates` | `dod` · `verification` · `ddd_gate` paths |
| `pack_revision` | pack content version (SemVer), independent of schema `$id` |
| `published_at` | publish/revision time |
| `fork` | optional fork metadata (`upstream_id` · `upstream_revision`) |
| `harness_adapters.*` | per-runtime `mapping` + `agents_dir` / `runners_dir` |
| `skills` | in-pack skill directories (validated + distributed with the pack) |

## Lifecycle

```bash
npm run pack -- validate <pack-dir>          # schema + fragments + skills
npm run pack:install -- --pack <dir> --project <root>   # = import
npm run pack:export -- --pack <dir> --out <dir> [--id <new-id>]  # portable copy + optional fork metadata
```

- **Import** copies the pack to `agents/packs/<id>/` and (cursor adapter) installs agent files to `.cursor/agents/`.
- **Export + `--id`** rewrites id and records `fork` upstream metadata — fork etiquette without a registry.
- **Swap harness**: keep roster/templates/skills; swap `harness_adapters` mappings only.

## Official packs

| Pack | Tier | Slots | Purpose |
|------|------|-------|---------|
| `starter-solo` | 轻 (light) | builder→reviewer + progress/auditor | 15-min solo onboarding ([get-started.en](../product/get-started.en.md)) |
| `minimal-research-to-spec` | 中 (medium) | research→spec + progress/auditor | research-to-spec chain; the five-harness verification vehicle |

Pack ecosystem is deliberately **non-goal**: no marketplace, no official composition — packs are forkable data, not canon.
