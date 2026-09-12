<!--
SYNCHRONIZED SHARED DOCUMENT — DO NOT EDIT A REPOSITORY COPY.
Authoritative source: FS5-shared-docs/FS5_SHARED_DATA_CONTRACTS.md
Run FS5-shared-docs/scripts/sync-shared-docs.ps1 to update copies.
-->

# FS5 Shared Data Contracts

## Purpose

This document records only the data relationships and invariants that require coordination among the site, database, and Admin repositories. Detailed schemas, SQL, payloads, and UI behavior stay in their owning repositories.

## Canonical 2026 season

The official canonical 2026 season exists in `public.seasons` as `season_id = 15`:

- `year = 2026`
- `league_size = 12`
- `regular_week_count = 14`
- `postseason_week_count = 3`
- `total_week_count = 17`
- `scoring_era_id = 2`
- `is_complete = false`
- `source_cutoff_week = null`

All 17 weeks exist. Weeks 1–14 are `REG`, Weeks 15–17 are `POST`, and all are incomplete because Week 1 has not started.

Twelve memberships exist as IDs 177–188 for owner IDs 1–12. Their current team names are intentional temporary placeholders equal to owner display names and must later be replaced with official 2026 team names.

Validated 2026 divisions are:

- Smokey Road: Brycen, David, Jordan, Bailey
- Evans: Will, Matthew, Cody, Max
- Madras: Chris, Mike, Keith, Ethan

## Current 2026 coverage

- No 2026 owner-game imports or completed weeks exist yet.
- Current Year records may correctly return an empty/no-data state.
- The canonical 2026 Sleeper draft is complete with 12 teams, 15 rounds, and 180 picks.
- 2026 is the first FS5 season on Sleeper. Sleeper is the normal annual draft/current-season source going forward where appropriate.
- Historical 2012–2025 draft/player provenance remains the approved NFL Fantasy/archive extraction.
- Completed 2025 remains the latest completed historical season and may remain the default where a surface requires a completed season.

## SportsBook relationship

SportsBook season ID `1` is the official 2026 `LIVE`/`ACTIVE` season and is
linked through `public_season_id = 15` to the official canonical 2026 season.
That canonical season remains incomplete as expected before play begins and has
12 teams, 14 regular-season weeks, and 3 postseason weeks. The Admin PWA is
operationally authoritative for Admin state and workflow; the database
repository is authoritative for SportsBook schema and database state.

Official team names remain pending and current membership names are intentional
temporary placeholders. Before GOTW or Survivor relies on canonical matchups,
verify owner/team resolution, real matchup data, and authenticated Admin/member
reads end to end. Historical temporary-validation or TEST/DRAFT descriptions
are provenance only.

## Public website boundary

- The database owns website RPC implementation, grants, security mode, and canonical calculations.
- The site owns browser requests, response handling, presentation, and empty/error/fallback behavior.
- Browser clients must not infer canonical database state from presentation labels alone.
- RPC contract changes require coordinated validation in both database and site repositories.

## Shared statistical invariants

- Canonical results and season completeness come from the database, not copied frontend data.
- Bye rows are not played games.
- Owner-perspective and game-level grains must not be mixed.
- Ranking and tie behavior must remain explicit; PostgreSQL `RANK()` semantics are used where documented by the owning RPC.
- Coverage gaps and approved-null dispositions are distinct. An approved null is a reviewed fact, not automatically missing data.
- Historical scoring-era, postseason, eligibility, and source-coverage rules remain defined by the database query/contracts documentation.

## Security invariants

- Public browser access is limited to approved RPCs or Edge Functions and browser-safe credentials.
- Privileged SportsBook operations require authenticated controlled server functions.
- Acting identity is derived server-side rather than trusted from browser input.
- Responses containing private administrative data use `no-store` behavior.

## Detailed authorities

- Website consumption: `codex_site/docs/DATA_STRUCTURES.md`
- Browser integration: `codex_site/docs/SUPABASE_WEBSITE_INTEGRATION.md`
- Schema and provider contracts: `database/docs/SCHEMA_AND_DATA_CONTRACTS.md`
- Query interpretation: `database/docs/QUERY_EXECUTION_GUIDE.md`
- Admin implementation: `admin/ARCHITECTURE.md`
