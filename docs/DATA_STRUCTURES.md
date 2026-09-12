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

## 2026 behavior

- Current Year requests 2026.
- Canonical 2026 exists, but no owner-game imports or completed weeks exist; empty results are valid.
- Completed-season surfaces may default to 2025 until 2026 is complete.
- Homepage phase is manually controlled and currently preseason.
- Homepage draft status is `Drafted`.
- Drafts requests 2026 by default through `site_draft_page`, renders the complete 180-pick, 15-round response, and preserves historical year selection.
- The canonical draft import and provider-specific handling, including Sleeper, belong to `database`; the frontend requires no provider-specific transformation.
- Future annual rollovers should advance the default draft year only after the canonical import is complete and the RPC returns the full draft.

## SportsBook boundary

The public SportsBook/member surface uses approved server functions. Detailed schema and controlled functions belong in `database`; Admin implementation belongs in `admin`.

Historical workbook mappings and migration validation are under `docs/archive/supabase-migrations/` and do not define current runtime dependencies.
