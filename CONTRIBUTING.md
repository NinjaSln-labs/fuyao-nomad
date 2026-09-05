# Contributing

Thanks for your interest in Fuyao · Nomad.

## Your first contribution (fast path)

**Goal**: prove the repo is healthy on your machine, then improve one doc or one template.

```bash
# 1. Fork + clone
git clone https://github.com/<you>/fuyao-nomad.git && cd fuyao-nomad

# 2. Install & verify (should be green)
npm ci
npm run validate          # 49 checks
npm test                  # 24 tests

# 3. Try the 15-minute onboarding in a scratch project
mkdir /tmp/my-first && cd /tmp/my-first && git init
node <repo>/scripts/fuyao-init.mjs --project . --pack starter-solo --intent "trial run"
```

**Good first issues** (no protocol expertise needed):

| Type | Where | Example |
|------|-------|---------|
| Doc fixes | `docs/product/*.md` · `docs/design/*.md` | broken links, unclear wording, English variants |
| Template checklists | `docs/templates/*-<tier>.yaml` | clearer `description` text per checklist item |
| Pack fragments | `packs/*/harness/cursor/agents/*.md` | sharper slot prompt fragments |
| Harness runbooks | `harness/<name>/` | new mapping ideas, runbook corrections |

## Principles

- **Team-first** — read [composition-protocol.md](docs/design/composition-protocol.md) before changing specs/templates
- **No harness** — runtime adapters live in `harness/<name>/`, never in core protocol
- **DDD necessary** — new capability domains or terms go through [domain-language.md](docs/design/domain-language.md)
- **Light-to-heavy weight** — verification/audit changes must sync `docs/templates/` and the matching design doc

## Local development

```bash
npm ci
npm run validate
npm test
npm run install:cursor-agents -- --project .
```

Edit Cursor agent sources under `harness/cursor/agents/` (never only `.cursor/agents/`).

## Pull requests

1. State the affected **capability domain** (see capability-model)
2. If schemas changed, attach a passing `npm run validate` log
3. Docs and code in the same PR; competitive research is **de-authorized** and never auto-promotes scope
4. Template `plan_refs` example ids must match the tier convention (`m-spec`/`m-impl`, `wi-*`) — run `grep -rn "wi-main\|m-done" docs/templates/` before submitting (should be empty)

## Schema changes

Schemas carry semantic `$id`s (v0.39): core contracts at `/v1` (breaking changes require a new `/v2`), template family at `/v1-template` (evolvable without version bump). See [schema-stability.md](docs/design/schema-stability.md) and file an ADR for any core breaking change.

## Reporting issues

Use the issue templates ([bug report](.github/ISSUE_TEMPLATE/bug-report.md) · [feature proposal](.github/ISSUE_TEMPLATE/feature-proposal.md) · [harness request](.github/ISSUE_TEMPLATE/harness-request.md)).

## License

Contributions are under [Apache-2.0](LICENSE).
