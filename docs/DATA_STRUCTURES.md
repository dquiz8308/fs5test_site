# Website Data Structures and Sources

## Ownership

`database` owns canonical schema, imports, calculations, grants, and RPC implementation. This document owns the website-consumer view: approved sources and browser response behavior. Cross-repository invariants are in `shared/FS5_SHARED_DATA_CONTRACTS.md`.

## Browser configuration

- Keep browser-safe Supabase configuration centralized.
- Browser code may call only approved public RPCs or Edge Functions.
- Privileged credentials, private-schema access, and Admin-only payloads are prohibited.

## Statistical surfaces

Statistical pages consume approved `public.site_*` contracts for Single Game, H2H, Owners, All-Time, Current Year, Season Records, Divisions, and NextGenStats/Quick Summary surfaces.

Each page preserves its documented request grain, structured fields, ranking/tie behavior, historical availability, and loading/empty/error handling. Provider details are authoritative in `database/docs/SCHEMA_AND_DATA_CONTRACTS.md` and `database/docs/QUERY_EXECUTION_GUIDE.md`.

## Power Lines

- Homepage Power Lines covers preseason draft order through the latest completed regular-season week. Season Records supports 2012–2025 with `PRE`, each regular-season week, and `FINAL` frames.
- `PRE` uses first-round draft order from `site_draft_page`. Weekly standings use the authoritative stored `end_of_week_rank` exposed by `site_power_lines_standings`; the frontend does not recalculate ranks or tiebreakers. Historical `FINAL` uses the existing Season Records final-placement contract.
- Homepage portraits use `owners/artwork/profile-current/`; historical portraits use `owners/artwork/profile-history/<owner>_<year>.png`.
- Historical team count, regular-season week count, and playoff cutoff are maintained in one season configuration in the Season Records Power Lines consumer.
- Both surfaces support continuous interpolated playback, slider scrubbing, team highlighting, and mobile compressed/expanded modes. Mobile defaults to compressed; expanded mode changes only the chart to horizontal scrolling.

## 2026 behavior

- Current Year requests 2026.
- Canonical 2026 exists, and active-season consumers request 2026 where documented.
- Completed-season surfaces may default to 2025 until 2026 is complete.
- Homepage phase is manually controlled and currently regular season; its current-season RPC requests 2026.
- Homepage draft status is `Drafted`.
- Drafts requests 2026 by default through `site_draft_page`, renders the complete 180-pick, 15-round response, and preserves historical year selection.
- The canonical draft import and provider-specific handling, including Sleeper, belong to `database`; the frontend requires no provider-specific transformation.
- Future annual rollovers should advance the default draft year only after the canonical import is complete and the RPC returns the full draft.

## SportsBook boundary

The public SportsBook/member surface uses approved server functions. Detailed schema and controlled functions belong in `database`; Admin implementation belongs in `admin`.

Live Scores consumes browser-safe `public.site_sportsbook_gotw_markets` with SportsBook season ID `1` for GOTW identity, status, stable owner IDs, optional matchup identity, and spreads only. Sleeper remains authoritative for team names, fantasy scores, rosters, players, and matchup presentation; browser-local data is not GOTW authority.

For Discord alerts, Sleeper is authoritative for NFL game identity/state and validated byes. Yahoo contributes only a validated current period for Ice Watch; missing or unmatched supplemental data fails closed. Detailed alert and merge behavior belongs in `livescores/LIVESCORES_CONTEXT.md`.

Historical workbook mappings and migration validation are under `docs/archive/supabase-migrations/` and do not define current runtime dependencies.
