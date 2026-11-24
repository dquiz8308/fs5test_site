# FS5 Live Scores Project Context

Last updated: 2026-09-30

## Purpose and release state

This is the durable feature context for the public FS5 Live Scores page. The implementation remains compatible with the site's static HTML/CSS/JavaScript architecture and Netlify deployment.

- Active branch: `finalize/livescores`.
- Public route: `/livescores/`.
- The visible navigation label is `Live`, placed immediately after Home throughout the maintained site navigation; it is active on the Live Scores page.
- The homepage Current Season card shows `Live Scores` during `regular` and `postseason` phases only. It remains hidden during `preseason` and `completed` phases.
- The temporary Hall of Champions `here` link has been removed.
- The current desktop/mobile design pass is approved for the main layout, GOTW presentation, stats and leaderboard, predictors, matchup cards, and matchup modals.
- The page and Discord alerts are at the production live-testing stage. Release still requires explicit owner approval; pushes to `main` deploy automatically through Netlify.

## Runtime architecture

### Browser and presentation data

- `livescores/livescores.js` loads the 2026 Sleeper league, rosters, users, weekly matchups, player data, statistics, and projections through `netlify/functions/live-scores.js` and approved direct fallbacks.
- Sleeper remains authoritative for fantasy owner/team names, scores, rosters, starters, players, and matchup presentation. Valid `custom_points` overrides normal matchup `points`.
- ESPN remains a browser/backend presentation source where applicable for game clocks, scores, quarters, and statuses. The browser retains its direct ESPN fallback when the Live Scores function route fails.
- ESPN is not used by the server-side Discord alert function because production Netlify requests receive HTTP 403.
- Historical rivalry data uses the browser-safe `site_h2h_page` Supabase RPC. Matchup-modal H2H links pass the two canonical owner IDs to `/h2h/`, where the existing selectors and load path auto-populate valid pairs.
- Browser `localStorage` is used only for non-authoritative preferences and caches such as notifications, theme, metadata, and presentation snapshots.

### GOTW / SportsBook boundary

- Supabase is authoritative for GOTW identity and spread metadata through browser-safe RPC `public.site_sportsbook_gotw_markets`, called with SportsBook season ID `1`.
- The contract supplies GOTW1/GOTW2 identity, market/status metadata, stable owner IDs, optional matchup identity, and spreads. The current 2026 setup has exactly two GOTWs per week.
- Stable canonical owner IDs are the primary match key; owner or team names are not used as authority.
- Sleeper remains the presentation source for names, scores, rosters, players, and the rest of each matchup card.
- A GOTW RPC failure leaves matchups unfeatured rather than applying stale or guessed GOTW state.
- Root `gotw.json`, the former GOTW localStorage authority, `fs5_public_gotw_markets`, and `fs5_live_gotw_archive` are retired from runtime authority. Existing GOTW visual treatment and behavior are preserved.

### Refresh and failure behavior

- Current live weeks refresh more frequently than non-live weeks; manually selected historical weeks are not forced back to the current week.
- Request guards prevent older or overlapping responses from replacing a newer selection.
- The Live Feed ticker completes its current scroll before applying the next queued update.
- Missing supplemental data remains unknown and fails closed where it affects alerts or final-state decisions. It is not converted to zero, bye, or final state.

## Discord live alerts

`netlify/functions/discord-live.js` retains exactly four alert types and their existing message wording:

1. Touchdown
2. Ice Watch
3. Ice Ice Baby
4. Matchup Final

### Data authority and reliability

- Sleeper is authoritative for NFL game identity and `pre_game`, `in_game`, and `complete` states, as well as validated bye handling.
- Touchdown requires the starter's Sleeper NFL game state to be `in_game`.
- Ice Watch requires an explicit numeric fantasy score of exactly zero, Sleeper state `in_game`, and a validated Yahoo `current_period_id >= 4`.
- Yahoo Sports supplies only the current period for Ice Watch. A period is accepted only when current week, home abbreviation, and away abbreviation match the same Sleeper game and the value is valid; otherwise the period remains unknown and Ice Watch fails closed.
- Ice Ice Baby requires an explicit numeric zero and Sleeper state `complete`.
- Matchup Final requires valid matchup totals and a known complete or validated-bye state for every applicable starter on both teams.
- Valid Sleeper `custom_points` overrides normal `points`, matching the browser.
- First-run and new-week priming suppresses pre-existing touchdown, Ice, and final events. Netlify Blobs preserves snapshots, event claims, deduplication, and retention cleanup.
- The legacy Lambda handler calls `connectLambda(event)` before `getStore()`, which supplies the production Netlify Blobs compatibility context without source-controlled site IDs or tokens.
- Yahoo failure or malformed/unmatched data disables only Ice Watch for that invocation; the other three alert decisions continue independently.
- Yahoo period data comes from a public, unauthenticated editorial scoreboard endpoint and is not treated as a guaranteed long-term developer contract. It remains supplemental only for Ice Watch; endpoint or schema failure must continue to fail Ice Watch closed without affecting the other alerts.

### Production status and configuration

- Scheduled execution, Sleeper game-state handling, Netlify Blobs, event delivery, and Discord webhook posting have been exercised successfully in production.
- Touchdown, Ice Ice Baby, and Matchup Final alerts have posted successfully in production.
- Yahoo period retrieval was validated against a live game. No qualifying production Ice Watch event has occurred yet, so its full alert path still needs observation during a qualifying game.
- Netlify has `FS5_DISCORD_LIVE_ENABLED=true` and `FS5_DISCORD_WEBHOOK_URL` configured. Never record the webhook secret in source or documentation.
- No Discord runtime path is required by the browser page.

## Scheduled execution

The scheduled wrappers reuse the same Discord handler and do not duplicate alert logic. During Central Daylight Time, Netlify runs once per minute in these windows:

- Thursday: 7:00 PM through 10:59 PM Central
- Sunday: 11:30 AM through 10:59 PM Central
- Monday: 7:00 PM through 10:59 PM Central

The UTC cron entries in `netlify.toml` are intentionally fixed for CDT. They must be shifted by one UTC hour when Central Time changes to CST, and shifted back for the next CDT period. Do not replace them with a 24/7 every-minute schedule merely to avoid DST maintenance.

These normal windows cover only standard Thursday, Sunday, and Monday games. Saturday games, Friday or holiday games, unusually early Sunday or international games, and other nonstandard kickoffs require a deliberate temporary schedule adjustment when Discord coverage is desired; no such extra windows are configured automatically.

## Feature-owned files

- `livescores/index.html` — page markup, controls, navigation, regions, and modals.
- `livescores/livescores.css` — page-specific responsive, card, theme, and modal presentation.
- `livescores/livescores.js` — browser state, loading, rendering, polling, notifications, GOTW matching, predictions, rivalry data, and modals.
- `netlify/functions/live-scores.js` — server boundary for Sleeper and presentation-oriented ESPN/player requests.
- `netlify/functions/discord-live.js` — shared Discord scheduled handler and alert logic.
- `netlify/functions/discord-live-sunday-start.js` and `discord-live-sunday-day.js` — minimal Sunday schedule wrappers.
- `netlify.toml` — game-window schedules.
- `package.json` and lockfile — include the existing `@netlify/blobs` dependency.

## PWA and security boundaries

- Live Scores uses the existing site manifest and app icons. There is no application service worker, offline cache, custom install control, or custom update flow.
- The page requires network access for live behavior.
- Browser code may use only browser-safe Supabase configuration and approved public contracts. Privileged credentials and private Admin or SportsBook data must never enter the browser.
- Database/RPC implementation remains owned by `database`; private Admin implementation remains owned by `admin`.

## Remaining work

- Continue production observation of scheduled execution, Netlify Blobs retention/concurrency, live-data behavior, and event delivery, including the first qualifying Ice Watch case.
- Measure and harden request volume, aggregation, and caching only where evidence justifies it.
- Add focused automated coverage for matchup scoring, final-state decisions, GOTW matching, refresh ordering, and Discord event transitions.
- Complete final desktop/mobile/accessibility and cross-page navigation regression checks.
- Document and execute future league/season rollover; current constants and owner bridges remain 2026-specific.
- Maintain the CDT/CST UTC schedule conversion at daylight-saving transitions.
- Review the complete branch diff and obtain explicit authorization before commit, push, merge, or deployment.

## Durable guardrails

- Preserve the four existing Discord alert types, wording, fail-closed rules, priming, claims, and deduplication unless explicitly changed.
- Preserve stable owner IDs for GOTW and H2H identity; do not fall back to normalized names as authority.
- Preserve historical week selection and existing non-GOTW matchup behavior.
- Do not invent missing scores, periods, byes, or final states.
- Keep Live Scores changes localized unless a shared change is explicitly approved.
- Do not add dependencies, privileged credentials, a framework, or a service worker without approval.
- Successful testing does not authorize commit, push, merge, or deployment.

## Checklist

### Completed

- [x] Integrate the lowercase `/livescores/` route and dedicated Netlify function.
- [x] Complete the current desktop/mobile design and modal/H2H integration.
- [x] Replace temporary GOTW JSON/localStorage authority with the approved public Supabase RPC and stable owner IDs.
- [x] Preserve and harden the four Discord alerts with fail-closed missing-data behavior.
- [x] Replace Discord's server-side ESPN dependency with Sleeper game state and Yahoo period data for Ice Watch only.
- [x] Validate production scheduled execution, Netlify Blobs, webhook delivery, Touchdown, Ice Ice Baby, and Matchup Final.
- [x] Configure game-window-only Netlify schedules for the current CDT period.
- [x] Add `Live` to maintained site navigation and the phase-aware homepage Current Season actions.
- [x] Remove the temporary Hall of Champions access link.

### Pending

- [ ] Observe and validate a qualifying production Ice Watch alert.
- [ ] Continue production reliability/concurrency/retention monitoring.
- [ ] Complete performance/caching review and focused automated coverage.
- [ ] Complete final responsive, accessibility, navigation, and regression validation.
- [ ] Maintain schedule UTC offsets for CST/CDT changes.
- [ ] Define and execute future season rollover.
- [ ] Obtain explicit approval for commit, push, merge, and deployment.
