<!--
SYNCHRONIZED SHARED DOCUMENT — DO NOT EDIT A REPOSITORY COPY.
Authoritative source: FS5-shared-docs/FS5_SEASON_ROLLOVER.md
Run FS5-shared-docs/scripts/sync-shared-docs.ps1 to update copies.
-->

# FS5 Season Rollover

## Current 2026 checkpoint

The official canonical 2026 season, 17 weeks, 12 memberships, division
assignments, and annual draft exist and are validated. Week 1 has not started.
Team names are temporary owner-name placeholders; no owner-game import has
occurred. The official active SportsBook season is linked to canonical 2026.

## Responsibility order

### 1. Confirm owner inputs — owner decision

- Confirm official team names, schedule/source readiness, draft source, and intended public presentation.
- Record any rule changes before changing data or code.

### 2. Prepare canonical season — `database`

- Verify the official season row, week phases/counts, memberships, divisions, and scoring era.
- Replace temporary team-name placeholders only from owner-confirmed official names.
- Update year constraints and import staging without reusing temporary validation data.
- Keep the season incomplete until completion criteria are actually met.

### 3. Import and validate annual data — `database`

- Use Sleeper as the normal 2026+ draft/current-season source where appropriate.
- [x] Stage, validate, and import the 2026 draft; canonical draft coverage is complete.
- Import owner-game/current-season data as weeks occur.
- Validate counts, owner mapping, weeks, byes, scores, provenance, and rollback boundaries after each import.

### 4. Verify SportsBook linkage — `database` and `admin`

- [x] The official active SportsBook season is linked to canonical public season `15` (2026).
- Continue validating controlled-function compatibility and authenticated Admin/member reads against the intended season.
- Do not use historical TEST/DRAFT or temporary-validation rows as current state.
- Before GOTW or Survivor depends on canonical matchups, verify owner/team resolution and real matchup data end to end.

### 5. Update the public site — `codex_site`

- Keep the homepage phase manual until the approved transition point.
- Point Current Year to the active year; an empty state is valid before completed data exists.
- Keep completed-season selectors/defaults on 2025 where the surface requires a completed season.
- Update official team names, draft presentation, divisions, brackets, bowl games, champion, and archived yearly wrappers only when their source facts are ready.
- Validate desktop/mobile, loading, empty, error, and no-data states.

### 6. Verify Admin operation — `admin`

- Validate Dashboard, Markets, Wagers, Survivor, Members, Treasury, and Audit against the official season.
- Confirm protected responses, session behavior, actor derivation, and `no-store` boundaries.
- Confirm no stale TEST/DRAFT labels appear in active UI or operational documentation.

### 7. Cross-repository acceptance

- Database validations pass and rollback boundaries are recorded.
- Site consumers use approved contracts and show accurate phase/year state.
- Admin consumers use the official SportsBook season and intended canonical link.
- Shared-doc drift check passes.
- Active documentation contains no stale claim that canonical 2026 does not exist.

## Rollback and correction rules

- Correct data through database-owned controlled procedures; do not patch browser presentation to conceal canonical errors.
- Unlink SportsBook from a canonical season before destructive canonical cleanup if a controlled rollback ever requires it.
- Preserve import provenance, audit history, and reviewed exceptions.
- Do not mark a season or week complete merely to satisfy a consumer.

## Completion record

Record rollover completion in each owning repository's concise current-status document. Keep detailed execution evidence in database evidence/history, not in this shared checklist.
