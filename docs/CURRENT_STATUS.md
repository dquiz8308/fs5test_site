# Current Website Status

## Operational state

- The public static site is connected to GitHub repository `dquiz8308/fs5_site`; Netlify deploys automatically from pushes to `main`.
- Approved global navigation, responsive behavior, and Supabase-backed statistical pages are implemented.
- Browser-loaded Excel and SheetJS are retired from the active statistical runtime.
- The homepage remains in 2026 preseason presentation and shows the draft status as `Drafted`.
- Current Year requests 2026 and may correctly show no data because Week 1 has not started and no 2026 owner-game imports exist.
- Completed 2025 remains the latest completed historical season and the appropriate default for completed-season views where documented.
- Drafts defaults to 2026, loads through the existing `site_draft_page(2026)` RPC path, and renders the complete 180-pick, 15-round draft while preserving working access to historical years.

## Current 2026 dependencies

- The official canonical 2026 season, weeks, memberships, and divisions exist.
- Membership team names are temporary owner-name placeholders pending official names.
- The canonical 2026 draft import is complete; the frontend consumes the existing public RPC without source-specific logic because provider differences are handled in `database`.
- Site changes that depend on official names, games, brackets, bowls, or a champion must wait for authoritative facts.

## Open or intentionally incomplete work

- Complete staged rollover work as source data becomes ready.
- Preserve correct loading, empty, error, and no-data states before games exist.
- Continue desktop/mobile validation when a page changes.
- For future draft rollovers, advance the default year only after the canonical draft is imported and the RPC returns the complete draft; preserve historical year access.
- Do not infer database or SportsBook readiness from presentation alone.

Completed redesign, migration, validation, and prior checkpoint history is under `docs/archive/`.
