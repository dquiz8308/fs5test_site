# Current Website Status

## Operational state

- The public static site is connected to GitHub repository `dquiz8308/fs5_site`; Netlify deploys automatically from pushes to `main`.
- Approved global navigation, responsive behavior, and Supabase-backed statistical pages are implemented.
- The intended public presentation is implemented, with focused validation and maintenance continuing where documented.
- Browser-loaded Excel and SheetJS are retired from the active statistical runtime.
- The homepage is in 2026 regular-season presentation and loads the latest completed week and current leader from the existing 2026 homepage RPC.
- Power Lines is implemented on the homepage through the latest completed 2026 regular-season week and on Season Records for historical seasons 2012–2025.
- Current Year requests 2026 data.
- Completed 2025 remains the latest completed historical season and the appropriate default for completed-season views where documented.
- Drafts defaults to 2026, loads through the existing `site_draft_page(2026)` RPC path, and renders the complete 180-pick, 15-round draft while preserving working access to historical years.
- Live Scores is implemented at `/livescores/`, appears as `Live` immediately after Home in maintained navigation, and is linked from the homepage Current Season card during regular-season and postseason phases. Its production-tested Discord pipeline and remaining live validation are documented in `livescores/LIVESCORES_CONTEXT.md`.

## PWA installation

- The public site supports browser installation through the root `site.webmanifest`, launches at `/`, and uses standalone display mode.
- App icons are provided at 180×180, 192×192, and 512×512. Primary maintained pages reference the manifest and the 180×180 Apple touch icon.
- There is no application service worker, offline fallback, caching layer, custom install button, or custom install/update interface.
- Replay/archive service workers are separate and unchanged.

## Current 2026 dependencies

- The official canonical 2026 season, weeks, memberships, and divisions exist.
- Official 2026 team names are authoritative and canonical in Supabase.
- The canonical 2026 draft import is complete; the frontend consumes the existing public RPC without source-specific logic because provider differences are handled in `database`.
- Later games, brackets, bowls, and a champion must continue to wait for authoritative facts.

## Open or intentionally incomplete work

- Complete staged rollover work as source data becomes ready.
- For future draft rollovers, advance the default year only after the canonical draft is imported and the RPC returns the complete draft; preserve historical year access.
- When the homepage phase moves to postseason, completed, or another presentation, review whether homepage Power Lines should remain, change behavior, or be removed; no rollover decision has been made.
- Do not infer database or SportsBook readiness from presentation alone.
- Continue the focused production validation, DST schedule maintenance, performance review, automated coverage, rollover work, and final regression listed in `livescores/LIVESCORES_CONTEXT.md`.

Completed redesign, migration, validation, and prior checkpoint history is under `docs/archive/`.
