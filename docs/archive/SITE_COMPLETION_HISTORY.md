# Site Completion History

> Archived provenance. This was the former active `docs/CURRENT_STATUS.md`. For current state use `docs/CURRENT_STATUS.md`; for shared 2026 facts use `docs/shared/`.

Status incorporates the original repository audit, owner clarifications beginning 2026-07-22, and subsequent implementation and validation updates. The original July 22 repository audit did not include browser deployment testing; later page migrations were manually validated locally and/or on Netlify as recorded below.

## Active or substantially implemented

- Approved global header/title geometry is deployed across all 16 standard-header primary pages. Brackets now consumes root `common.css` with scoped page-shell overrides in `brackets.css`; Hall of Champions remains the intentional different-art/no-title exception.
- The owner-approved global navigation is deployed across all 17 primary pages. All pages use the same semantic 17-destination navigation tree, including Drafts as the final Vault submenu destination, and root `mobile-menu.js`; Hall of Champions retains a separate gold-themed stylesheet while following the same navigation structure and behavior.
- The approved global footer/page shell is deployed across all 17 primary pages. It renders `FastStrongFive` above `Founded 2012 · Last Updated August 2nd, 2026`, with the date supplied by `public.site_website_data_status()`; the normal-flow flex shell has replaced the absolute footer and artificial viewport-height workarounds.
- The root homepage, NextGenStats landing page, and Drafts page use scoped overrides to remove the shared footer's `20px` top margin where it would expose a white strip between a dark main area and the footer. The shared margin remains unchanged elsewhere and must be reviewed across all global page-shell contexts during the final global design pass.
- Root homepage redesign is complete for now: dark Option C main background, Option 2 title, manual status-driven Current Season card, responsive eight-card Explore FS5 grid, lower-page native lazy loading, and welcome banner above the footer. The 2026 homepage rollover has begun: the card uses the Season XV crest and numeral with manual status `preseason`, while its record-year labels and `public.site_home_current_season` request intentionally remain on 2025. Detailed status mappings are in `DECISIONS.md`.
- Owners statistics and completed, approved page-specific redesign
- H2H statistics and completed, approved page-specific redesign
- NextGenStats landing page with completed, approved page-specific redesign
- Current-year records with completed, approved page-specific redesign
- Historical season records through 2025
- Single-game records
- All-time records
- FS5 SportsBook live integration with completed, approved page-specific visual redesign
- Archive landing redesign and external yearly replay system, complete and visually approved on desktop and mobile
- Playoff/consolation brackets for 2012-2025
- Bowl Games with completed, approved page-specific visual redesign; remaining content gaps are tracked separately below
- Pro Bowl 2025 with completed, approved page-specific redesign and authoritative owner-supplied data for the unofficial event
- Drafts with completed, approved page-specific design and permanent `public.site_draft_page(integer)` browser source for 2012-2025; desktop uses a fixed-column snake board and mobile uses a one-open-round accordion. Page creation remained scoped to `vault/drafts/` and reused shared chrome/configuration; the later global-navigation rollout added Drafts as the final Vault submenu item without changing shared styling or behavior.
- Divisions with completed responsive page-specific design and permanent `public.site_divisions_page(integer, integer, text, text)` browser source. The graphite/charcoal page uses standardized division logos, dark-navy standings/rivalry/comparison/legacy panels, independent era controls, and an intentional 2026 future state until canonical data exists; global chrome and shared configuration were preserved.
- Hall of Champions page-specific redesign is complete and owner-approved. Authoritative 2012-2025 history replaces the former placeholders; each champion includes Owner, Record, Points For, Regular Season Rank, and the approved narrative while retaining the approved artwork, alternating timeline, and responsive mobile behavior.
- The `vault/` landing page is complete and owner-approved. Its static `<main>` and page-specific `vault/vault.css` present the five established Vault destinations with a premium dark vault-door identity; no page-specific JavaScript or data work was required.
- All primary pages have completed and received owner approval for their page-by-page redesigns.

## Intentionally incomplete or planned

- Pro Bowl 2026: not implemented; deferred until authoritative annual data are supplied.
- Annual rollover: the homepage presentation has begun its 2026 rollover with Season XV artwork/numeral and `preseason` status, but completed 2025 remains the record year supported in Season Records and the homepage RPC remains on 2025. Current Year now displays and requests 2026, intentionally returning no data until the canonical 2026 season exists.
- Homepage rollover remains manual and partially complete; `SEASON_ROLLOVER_CHECKLIST.md` records completed and remaining changes. The homepage preseason Draft card targets the completed Drafts page, and no automatic season-phase status exists.
- Bracket presentation is complete through 2025: 2024–2025 matchups with usable bowl artwork have custom modal color schemes, matchups without artwork use the approved fallback, and seasons before 2024 intentionally retain the default theme.

## SportsBook Supabase migration and validation checkpoint

### Member integration complete and validated

- `/fs5book/` is fully migrated from Google Sheets, EmailJS, and Apps Script to Supabase. Login is access-code-only through custom opaque bearer sessions; the browser stores only the session token and server validation derives member identity.
- Deployed Edge Functions are `member-login`, `member-status`, `member-logout`, `member-book`, `member-submit-wager`, and `member-submit-survivor`. They use `verify_jwt = false` because authentication is the custom member session rather than a Supabase JWT.
- Service-role-only database functions remain authoritative. The private `sportsbook` schema and privileged credentials are not exposed to browser clients. Approved CORS origins may send `Authorization`, `apikey`, and `Content-Type` without wildcard CORS.
- Real login, session restore/logout, member reads, submissions, Admin-PWA receipt/management, canonical-result use, and server-side Discord delivery were validated in a realistic TEST-season workflow. Notification failure remains non-transactional and must never invalidate a successful SportsBook transaction.
- Member reads now render authoritative cash/free-bet balances, GOTW and history, Futures and history, Survivor, profile images/fallbacks, empty states, closed states, and status/timing behavior. Cash may intentionally go negative.
- Member wagers initially force `CASH`, use UUID/retry and pending-request protection, and enter `PENDING_APPROVAL`; an administrator may change funding to Free Bet before approval.

### Validated feature behavior

- GOTW cards stay visible when closed or unavailable; Supabase status/timing controls wagering. History uses real wager, result, and canonical matchup data.
- Closed Futures stay visible under the closed treatment; status/timing controls wagering, positive American odds include `+`, and concise visible history labels do not replace authoritative backend status.
- Survivor updates the pre-created current-week OPEN row, permits self-selection, supports Admin Reveal/Hide, and redacts hidden shared picks server-side while retaining the member's own pick. Current selections exclude eliminated entries, standings retain them, and closed/completed contests retain the pick card under an overlay. The full elimination/champion/completion lifecycle passed validation.
- The approved member design uses a navy page background, warm-white/cream cards, navy/gold accents, dark readable status-row text, and preserved Pending/Confirmed/Win/Loss/Push and Survivor champion/active/eliminated treatments. Global chrome remains out of scope.

### Historical TEST cleanup and official 2026 rollout

- Temporary canonical 2026 validation season `season_id = 15`, its 17 weeks, memberships/divisions, copied Weeks 1-3 matchup data, and validation import batches 23-25 (`FS5_VALIDATION`) were fully removed after testing. That TEST activity is historical only; `sportsbook.seasons` season 1 is the intended official 2026 SportsBook season, and no canonical `public.seasons` row for 2026 exists yet.
- Futures may open for SportsBook season 1 before the canonical 2026 row exists. Before opening GOTW or Survivor, create the official canonical season/weeks/memberships, update and validate the real import/staging procedure and applicable year constraints, link SportsBook season 1 through `public_season_id`, and revalidate the official relationship. Do not reuse temporary season ID 15 or its copied validation records.

The member migration/validation phase is functionally complete unless a regression is found. Detailed admin-project status remains authoritative in the separate private admin-PWA repository.

The architectural boundary is authoritative here: the public member website and private admin PWA remain separate projects. Admin work does not change this website repository unless explicitly coordinated, and current admin milestones must be read from the admin repository's own documentation.

## Known path and navigation work

### Approved global navigation

- Desktop navigation uses a 48px bar, Arial/Helvetica sans-serif typography, active-link underlines close to the label, meaningful decorative inline SVG icons in dropdown destinations, and separate transparent disclosure-button targets for NextGenStats and Vault.
- Desktop dropdowns are contained by their category wrappers with no trigger-to-panel gap. Hover, click, keyboard focus, outside-click dismissal, and Escape are supported.
- At 768px and below, navigation becomes a full-viewport overlay with scroll locking, contained vertical scrolling, focus entry/return, a focus loop, `aria-hidden`/`inert` closed state, and 44px-or-larger controls.
- Mobile rows and submenus use the full available width. Submenu content has only a small additional indent, and opening one category closes the other.
- The mobile logo is centered over a CSS-drawn red/white stripe. A matching red/white list-ending accent sits immediately after the final navigation row rather than at the viewport bottom. Hall of Champions uses gold/white equivalents.
- The navigation was browser-validated at 320, 375, 390, 768, 820, 1024, 1280, and 1440px, including short-height scrolling, dropdown pointer access, keyboard dismissal, decorative icon semantics, and overflow checks.

### Confirmed owner context

- The site was reorganized before being brought into Codex.

## Content and data work

### Archive landing redesign complete

- The page-specific `vault/archive/` redesign is complete and approved. Its centered, logo-free `FASTSTRONGFIVE VAULT` / `League Archive` intro sits on a clean light foundation with an extremely subtle geometric motif; the former field artwork and oversized year buttons are removed.
- PPR 2018–2025 appears before Standard Scoring 2012–2017, with newest seasons first. Season links use compact centered icon-above-year tiles: four columns on desktop, two on mobile, with incomplete desktop rows centered.
- All 14 links still target the existing `2012.html`–`2025.html` wrappers and preserve ReplayWebPage/WACZ behavior. Work remained page-specific; global chrome, shared files, Supabase configuration, database contracts, and yearly wrappers were unchanged.
- The custom champion-inspired season icon set is complete. All 14 transparent, optically normalized PNGs named `archive-icon-2012.png` through `archive-icon-2025.png` are installed under `vault/archive/artwork/` and linked to their matching season tiles.

### Vault-family intro consistency complete

- Archive, Brackets, and Bowls now use the exact logo-free `FASTSTRONGFIVE VAULT` eyebrow with matching muted-gold treatment and related title/subtitle hierarchy. Their backgrounds and layouts intentionally remain different: clean/light Archive, dark postseason Brackets, and graphite/bracket-motif Bowls.

### Vault landing page complete

- The page-specific `vault/` landing-page design is complete and owner-approved. A prominent gold `FASTSTRONGFIVE VAULT` treatment, centered `The Vault` hero, and short legacy/history description sit on a charcoal/deep-navy foundation with subtle CSS-created vault-door rings and radial/mechanical schematic geometry.
- Five full-card links lead to Archive, Playoff Brackets, Bowl Games, Pro Bowl, and Drafts. Desktop uses three centered-content cards followed by two centered cards; mobile uses compact stacked icon → text → arrow rows. Inline decorative SVGs inherit the restrained Vault-gold treatment, and the layout has no page-level horizontal overflow.
- The landing page intentionally has no facts strip, Latest Season section, large artwork dependency, redundant FS5 logo inside `<main>`, dynamic statistics, or page-specific JavaScript. Work remained scoped to `vault/index.html` and new `vault/vault.css`; approved global chrome, shared CSS/JavaScript, Supabase configuration, Vault subpages, database/RPC contracts, and rollover behavior were unchanged.

### Brackets redesign and polish complete

- The `vault/brackets/` redesign and final presentation-polish pass are complete and approved. The page now has approved desktop/mobile intro rhythm, compact controls, clearer bracket heading hierarchy, tightened mobile bracket spacing, and light matchup modals visually connected to the navy/gold page through restrained outer framing.
- The final presentation is complete through 2025. It preserves the 2012–2025 data, desktop bracket structure, full-width mobile round tabs, matchup-card design, winner styling, modal accessibility and scrolling, long-name wrapping, custom `accent`/`dark`/`soft` themes for usable 2024–2025 bowl artwork, and the approved default fallback for no-art matchups and seasons before 2024.

### Bowl Games redesign complete

- The `vault/bowls/` presentation-only redesign is complete and approved. It uses a graphite/charcoal foundation with a subtle bracket-line motif and a logo-free Vault-family intro built from the `FASTSTRONGFIVE VAULT` eyebrow, `Bowl Archive` title, and compact description.
- Desktop uses a left Bowl Categories rail and natural-height right history area. Mobile keeps the full-width category selector above contained yearly cards. Playoffs, Consolation, and Special categories retain the approved order, active gold highlight, accessible one-open-at-a-time behavior, and a restrained `Select a Bowl Game` initial state with no bowl open by default.
- Existing bowl-specific internal card colors, historical data, artwork paths, desktop artwork composition, compact mobile card layout, and the `Owned by / Valued at` hierarchy were preserved; only minor supporting-text spacing was refined.
- Work remained in `vault/bowls/index.html`, `vault/bowls/bowls.css`, and `vault/bowls/bowls.js`. No global header/navigation/footer, shared CSS/JavaScript, Supabase configuration, database/RPC contract, or unrelated page changed.
- Bowl Games content and artwork are complete through 2025: all placeholders are gone, and verified 2024–2025 `11th Place Game` cards and artwork are implemented. No artwork follow-up is needed for this page.

- Supplemental owner-game import batch `21` is `COMPLETED` for 2025 Weeks 16-17 using `google_sheets` / `manual_owner_game_import` / `2025 Google Sheets - Weeks 16-17`.
  - 24 staging rows produced 14 canonical matchup events, 24 participants, 20 legacy metric rows, and 180 legacy slot rows.
  - Week 16 contains four played games and four bye events; Week 17 contains six played games.
  - David's Week 17 FLEX was confirmed as WR3 with `0.00` points.
  - Reciprocal, source-row, score, slot-total, bye, and final-count validations all passed.
  - Weeks 15-17 are complete. The 2025 season is complete with `source_cutoff_week = 17`.
  - Batch 21's supplemental source-row hash convention is documented separately from the historical `fs5main` convention.
- Excel removal is complete across the website runtime. No page loads `.xlsx`, XLSX/SheetJS, `fs5main`, or the deleted Excel-backed footer loader.
- All 17 primary footers keep identical permanent HTML and use shared Supabase metadata for the optional Last Updated date. The validated current rendering is two lines: `FastStrongFive`, then `Founded 2012 · Last Updated August 2nd, 2026`; failures remove the separator/date and retain `FastStrongFive` plus `Founded 2012`.
- Brackets and Hall of Champions no longer retain redundant page-level `100vh` minimums above their footers. Hall's invalid nested `main` was corrected and its `100vw`/viewport-margin full-bleed calculation was replaced with page-width geometry, eliminating the bottom horizontal scrollbar while preserving the approved dark/gold layout.
- Approved global-interface cleanup is complete: seven unreferenced shared CSS/JavaScript copies were removed, obsolete legacy shared CSS blocks were retired, and all 17 primary pages now have one nonempty meaningful H1 without changing their approved visual systems.
- Hall of Champions' desktop header now scales from 120px through the native artwork ratio to a 237px maximum, eliminating wide-desktop vertical cropping of the baked-in crest while preserving `cover`, centered top alignment, and the approved 240px mobile treatment.
- The root homepage uses `homepage.js` plus `public.site_home_current_season(2025)` for latest completed week and first-place team/owner in regular/postseason modes. All four manual statuses, RPC values, fallbacks, and responsive layouts were locally validated; the orphaned workbook renderer and workbook remain removed.
- The member SportsBook now runs through the completed Supabase Edge Function integration. Its former Google Sheets, EmailJS, and Apps Script runtime is retired; Retool development is discontinued, and detailed status for the separate admin PWA belongs in its own repository.
- Single Game Records, H2H, Owners, All-Time Records, Current Year, Season Records, and the NextGenStats landing-page Quick Summary have complete and approved Supabase data-source migrations. The full page-specific Owners, H2H, NextGenStats landing-page, Current Year, Single Game, All-Time, and Season Records redesigns are complete and approved without changing their data-source contracts.
- Website RPC definitions should be captured in a version-controlled database migration or database repository when that workflow is established.
- Player-week annotation checkpoint:
  - `player_week_annotations` is implemented as an informational child of canonical `player_week_performances`, with one unique row per performance and annotation type while permitting different future types on the same player-week.
  - The completed backfill inserted 90 verified `STARTED_ON_BYE` annotations for documented 2012-2016 cases; every source entry resolved to exactly one player-week performance.
  - Reviewed 2017-2025 validation packages currently contain no documented cases.
  - Annotations do not alter scores, lineups, standings, matchup results, player data, or records.
  - No frontend or website RPC behavior currently depends on the table. Future interfaces should query it only for explicit annotation display or analysis and require separate contract and browser validation.
- Division backend checkpoint:
  - `divisions` and `season_division_memberships` are implemented with fixed groups: Smokey Road — David, Bailey, Brycen, Jordan; Evans — Max, Will, Cody, Matthew; Madras — Chris, Ethan, Keith, Mike.
  - Assignments use `season_membership_id`, enforce one division per season membership, and are protected by a trigger against wrong-season assignment.
  - The 2019-2025 backfill contains 84 validated assignments: 12 owners per season and 4 owners per division.
  - Divisions are informational only and do not affect standings, seeding, placement, matchups, playoff logic, or results.
  - The same assignments must be created for 2026 after its season and 12 season memberships exist.
  - The permanent read-only website RPC is `public.site_divisions_page(p_year integer, p_through_week integer, p_era text, p_scope text)`. It returns structured standings, rivalries, comparison, legacy totals, and echoed parameters; rejects invalid era/scope values; uses `SECURITY DEFINER` with `search_path=pg_catalog, public`; and is executable by `anon` and `authenticated`.
  - The frontend is complete in `divisions/index.html`, `divisions/divisions.css`, and `divisions/divisions.js`, with standardized logos in `divisions/artwork/`. Desktop/mobile validation covered controls, live historical filters, the official future state, card/table containment, and page-level overflow.
  - All Time covers 2019+, 2025 is unofficial, and 2026+ is official. The UI exposes those three eras; the backend-supported internal `retroactive` value is no longer presented. Rivalries and Comparison have independent controls and default to 2026+ Official.
  - Official standings begin in 2026 only, rank by regular-season wins and then each tied pair's most-recent H2H result, retain unresolved ties without a Points For fallback, update weekly, freeze after the regular season, and award the division championship to final rank #1. Current standings remain empty until canonical 2026 season, membership, division-assignment, and game data exist.
  - Validated 2012+ legacy totals are Smokey Road 6 championships / 30 playoff appearances / 55 owner-seasons; Evans 2 / 19 / 46; Madras 3 / 21 / 46.
- Historical NFL Fantasy player and draft backfill checkpoint:
  - The canonical backfill is complete for every season from 2012 through 2025.
  - Every approved season package completed controlled staging, pre-import validation, canonical import, post-import validation, and final batch completion.
  - Coverage includes player identities and names, weekly owner assignments, exact starter/bench slots and ordinals, points including zero and negative values, draft history, position eligibility, roster periods, coverage evidence, preserved sources, and rollback-capable batch provenance.
  - Known completed batches are 2024 `4`, 2023 `5`, 2014 `18`, 2013 `19`, 2012 `20`, and 2025 player import `22`. The separate 2025 owner-game supplement remains batch `21`.
  - Approved short benches and grouped empty-starter evidence are complete historical coverage rather than partial imports.
  - NFL-team enrichment is complete and validated for every season from 2012 through 2025.
  - The completed 2012-2015 batch contains 10,817 player-week rows, 10,799 populated `nfl_team_id` values, 18 approved nulls, 0 unresolved rows, 4 validated midseason transitions, and 37 reviewed conflicts.
  - Per-season results are 2015: 2,923 total / 2,923 populated / 0 approved nulls; 2014: 2,928 / 2,924 / 4; 2013: 2,481 / 2,478 / 3; and 2012: 2,485 / 2,474 / 11. Each season has 0 assignment mismatches and 0 orphaned team IDs, and exact team code/ID, approved-null, and DST validation passed; historical franchise-code normalization also passed for 2012-2013.
  - All 2012-2015 post-update validation checks passed. The previously documented 2016-2025 results remain complete and validated.
  - The completed 2016-2018 batch contains 8,796 player-week rows, 8,772 populated `nfl_team_id` values, 24 approved nulls, 0 unresolved rows, 12 validated midseason transitions, and 123 reviewed conflicts.
  - Per-season results are 2018: 2,929 total / 2,907 populated / 22 approved nulls; 2017: 2,930 / 2,929 / 1; and 2016: 2,937 / 2,936 / 1. Each season has 0 assignment mismatches and 0 orphaned team IDs, and exact team code/ID, approved-null, and DST validation passed.
  - All 2016-2018 post-update validation checks passed. The previously documented 2019-2025 results remain complete and validated.
  - The completed 2019-2021 batch contains 8,444 player-week rows, 8,421 populated `nfl_team_id` values, 23 approved nulls, 0 unresolved rows, and 9 validated midseason transitions.
  - Per-season results are 2021: 2,934 total / 2,930 populated / 4 approved nulls; 2020: 2,752 / 2,750 / 2; and 2019: 2,758 / 2,741 / 17. Each season has 0 assignment mismatches and 0 orphaned team IDs, and exact team code/ID, approved-null, and DST validation passed.
  - All 2019-2021 post-update validation checks passed. The previously documented 2022-2025 results remain complete and validated.
  - nflverse `weekly_rosters` remains the primary week-specific source; official NFL and club roster, transaction, signing, release, suspension, reserve-list, practice-squad, and historical records resolve disputed cases and transition timing; archived NFL Fantasy labels are supporting or conflict evidence only.
  - NFL Fantasy provider IDs are validated against canonical player identity but are not represented as a direct nflverse identifier crosswalk. Weekly assignments preserve trades, signings, releases, holdouts, suspensions, reserve affiliations, and temporary no-team periods at the correct week; approved no-team periods remain `nfl_team_id = NULL` and are not missing or defective data. DST rows map to the represented canonical franchise.
  - Original nflverse franchise codes remain preserved in source and reconciliation evidence. Only canonical codes are stored through existing `nfl_teams` rows: `OAK` maps to `LV`, `SD` maps to `LAC`, and `STL` maps to `LAR`. Older alternate codes such as `SL`, `ARZ`, `BLT`, `CLV`, `HST`, `WAS`, and `JAC` are not stored as noncanonical team codes; no canonical `nfl_teams` rows were added or changed.
  - The 2012 and 2013 exports use the earlier 10-team FS5 format. Their fantasy-team identifiers, week ranges, source records, and slot counts were validated from the actual exports rather than inferred from the later 12-team format; the player-week reconciliation model did not change.
  - `player_week_performances.nfl_team_id` is the canonical and sufficient week-specific NFL-team affiliation source for current site statistics and displays.
  - `player_team_stints` is a separate optional backend table for summarized consecutive NFL-team affiliation ranges. It remains empty, is very low priority, and is not planned as part of current site work; its empty state is not an incomplete migration, validation failure, or launch blocker.
  - The site primarily serves fantasy-owner, fantasy-team, matchup, lineup, and player-week analysis rather than NFL transaction histories or career timelines. Stint derivation is therefore not the next required database phase and should occur only if a future backend or site requirement justifies it. Detailed player stat values and player-level touchdowns remain unavailable where extraction did not reliably establish them.
- End-of-week rank checkpoint:
  - `participant_legacy_metrics.end_of_week_rank` is fully populated for 2012-2018 regular-season owner-weeks.
  - 1,140 rows were calculated using cumulative wins, tied-group head-to-head percentage, then cumulative Points For as the fallback.
  - The write replaced 29 isolated legacy Max-only values and left all 2019-2025 source-derived ranks untouched.
  - Coverage and weekly no-duplicate/no-gap rank validation passed.
  - All-Time `owner-1rank` detail wording now reflects 2012-2025 historical EOW-rank coverage; this presentation-only correction did not change its RPC contract. Season Records `1rank` still requires separate RPC/result revalidation against the expanded coverage.
  - Historical Current Year `rank1` validation for 2025 remains unchanged; the 2026 request intentionally returns no rows until the canonical season exists.
- NextGenStats landing-page database checkpoint:
  - `public.site_nextgenstats_summary()` is the permanent Quick Summary browser source through root `supabase-config.js`.
  - The page makes exactly one initial request and validates 12 unique owners plus 12 unique display-order values before rendering.
  - The RPC owns the approved initial order from Brycen through Max; owner names and all 36 count values render from the same structured rows.
  - Wins, Losses, and Ties sorting remains entirely client-side, makes no additional request, supports keyboard activation, and maintains `aria-sort`.
  - Visible loading, empty, malformed-response, and RPC-error states leave the four linked record-page images usable.
  - The page no longer requests `fs5main.xlsx` or loads SheetJS or the shared Excel-backed footer script.
  - The later approved page-specific redesign introduced the dark geometric-tech NextGen presentation, compact Quick Summary and two-value client-side Snapshot while preserving the existing data contract and all 12 visible owners.
  - Live RPC validation confirmed 12 rows, unique owners/order values, the approved initial order, integer counts, and the Jordan/Matthew ties.
  - The owner manually verified the deployed Netlify page and confirmed it works as intended with no issues.
  - `public.site_nextgenstats_summary()` remains the approved permanent Quick Summary browser source after the completed visual redesign.
  - Four full-card destination links retain the original artwork with native-ratio, uncropped sizing and high-contrast circular chevrons; reviewed caption descriptions were intentionally removed.
  - Responsive validation passed on desktop, around 768px, and approximately 390px without page-level horizontal overflow. The scoped footer-margin override removes the white strip below the dark main area without changing shared files.
- Owners database checkpoint:
  - Supabase RPC `public.site_owner_page(text)` is the active, permanent Owners website data source.
  - Frontend integration was manually verified locally and on Netlify, on desktop and mobile, for all 12 current owners and every visible page section.
  - The Owner placeholder makes no request and resets the page; each valid owner selection makes one structured RPC request that supplies every page section.
  - Owner switching and stale-response protection passed manual validation.
  - Owners-page Excel loaders, SheetJS, and the shared Excel-backed footer dependency were removed from `owners/index.html`; the page makes no request for `fs5main.xlsx`.
  - The completed 2025 season is included in completed-season summary metrics because `public.seasons.is_complete = true`; this lifecycle behavior was confirmed during the cross-RPC completion audit.
  - Point metrics begin with the point-record-eligible PPR era, ranks compare the 12 current owners, and returned `RANK()` ties use display values such as `T1`.
  - Owners Playoff Performance `playoff_byes` was corrected from `v_owner_all_time_summary.bye_count` to count only `PB1` rows in `public.v_owner_games` where `is_bye = true`; `PB2` is excluded under the existing FS5 first-round/top-seed bye rule. Existing playoff-bye ranking/tie behavior now ranks the corrected total, and playoff wins/losses were not changed.
  - No workbook or Excel-backed shared-footer dependency remains in the repository runtime.
  - The full presentation-only Owners redesign is complete and approved. The placeholder state now hides the dashboard and shows a centered selector welcome state; selecting a valid owner restores the detached selector and unified current-team profile summary.
  - Career Streaks, Scoring Profile, Playoff Performance, and Championship Performance now share a compact light-card hierarchy with aligned values and secondary rank/date details.
  - Season History is a compact newest-first list with same-size image fallbacks. It initially shows six recent desktop seasons or four recent mobile seasons, expands from the cached response without another RPC, preserves scroll position, and resets to collapsed when owners change.
  - Team Game Records remains top 10 for all existing categories and uses a compact responsive table with its dynamic Team Score/Margin heading and table-local horizontal scrolling on narrow screens.
  - H2H preserves all 11 records and ordering in a six-card/centered-five-card desktop layout and two-column mobile layout, with light semantic win/loss/tie treatments.
  - The redesign preserved every data ID and the one-RPC flow, placeholder no-request reset, stale-response protection, loading/empty/error behavior, formatting, ranks/ties/null handling, category switching, Supabase integration, and footer metadata.
  - Final cleanup removed 725 obsolete CSS lines and dead background-handling JavaScript without changing the approved appearance or behavior.
  - Validation passed for all 12 owners, blank → owner → blank and rapid switching, real/missing images, long names, interrupted histories, expansion, every records category, H2H states, keyboard/focus behavior, and desktop plus 320, 375, 390, and 768px widths. No global header, navigation, footer, shared CSS, or shared JavaScript changed.
- H2H database checkpoint:
  - Supabase RPC `public.site_h2h_page` is the active, manually verified website data source.
  - The page uses one RPC request per valid ordered owner pair and renders the summary and newest-first game log from the same response.
  - Local and deployed Netlify validation covered normal and reversed owner perspective, the historical tie, ranks, null notes, request-state behavior, and desktop/mobile presentation.
  - The H2H Excel comparison scripts and `h2h/siteh2h.xlsx` were removed after owner approval.
  - The H2H page no longer loads SheetJS or the deleted Excel-backed footer; H2H statistics remain Supabase-only.
  - The later page-specific redesign is complete and approved. The blank state shows a compact `Head 2 Head` / `Choose Your Matchup` intro, two labeled owner selectors, and an accessible swap control while hiding the summary and Game Log until two valid distinct owners are selected.
  - Populated states repeat both owner names, make Wins the hero statistic, show the historical tie only as a restrained conditional row, preserve league ranks as secondary metadata, and present the two combined-score records as compact natural-language cards built from the existing structured response.
  - Desktop retains a compact Game Log table. Mobile uses stacked matchup cards. Both initially show the 10 newest games, expand and collapse from the loaded response without another request, and reset to collapsed when owners change.
  - The redesign preserved all values, ranking/order/null rules, selected-owner margin perspective, stale-response protection, and loading/empty/error behavior. Final review covered long-history and tie matchups, reversed owners, swap and expansion/reset behavior, desktop, 768px, and approximately 390px mobile without horizontal overflow.
  - Work remained in H2H page-specific files. It removed the obsolete presentation script, heavy gradients, fixed computed-width sizing, and related H2H-only presentation hacks without changing global header/navigation/footer files, shared CSS/JavaScript, Supabase configuration, or database objects.
  - A subsequent focused cleanup audit removed inert placeholder Game Log rows, iterative markup comments, duplicate stat-grid classes and responsive selectors, numbered rank-container hooks, and unnecessary hidden-state placeholder-value resets. Reusable semantic rank hooks now replace the old wrapper-name detection; all remaining selectors have active or conditional consumers.
  - Cleanup validation reconfirmed blank/same-owner no-request states, tie and no-tie matchups, the 30-meeting David-Brycen history, reversed/swap behavior, cached expansion, owner-change collapse reset, forced loading/error recovery, desktop/768px/390px layout, zero horizontal overflow, one request per valid ordered-pair change, and a clean console on a fresh run.
- Single Game Records database checkpoint:
  - Supabase RPC `public.site_single_game_records` is the active, manually verified website data source.
  - Root `supabase-config.js` provides the centralized browser-safe configuration shared by the completed Supabase pages.
  - The Single Game Excel fallback, page-level SheetJS dependency, and `nextgenstats/singlegame/SingleGame.xlsx` have been removed after owner approval.
  - The page-specific redesign is complete and approved. It applies the Current Year record-subpage language with a dark navy/charcoal geometric foundation, centered existing artwork hero, restrained lighter-blue accents, one natural-height dark results card, compact progressive controls, and a compact neutral table.
  - Mobile retains contained horizontal table scrolling where needed with no page-level overflow. All nine categories, progressive filter hierarchy, top-20/PPR/bye/rank/tie/owner-game contracts, request states, stale protection, and `public.site_single_game_records` behavior remain unchanged; no global or database files changed.
- All-Time Records database checkpoint:
  - Supabase RPC `public.site_all_time_records` is the approved permanent browser data source for all 40 visible record categories.
  - The six panels request their selected category independently through root `supabase-config.js`, with valid scope, Active Members Only state, stale-response protection, and RPC-owned ranking and row limits.
  - The page no longer loads SheetJS, `nextgenstats/fs5main.xlsx`, or the shared Excel-backed footer script, and no Excel fallback remains.
  - Local and deployed Netlify validation reviewed every visible category and filter on desktop and mobile.
  - QB, RB, WR, TE, K, and DST were validated for combined, regular, and postseason scopes after positional filtering was corrected to use `v_owner_position_week.phase` values `REG` and `POST`.
  - Playoff-bye totals count only `PB1`, consolation-bye totals count only `CB1`, and the corresponding `PB2`/`CB2` codes remain valid for appearance eligibility.
  - Finalized longest playoff and consolation appearance streaks exclude streaks below two seasons; Total TDs, Total Close Games, Total Top Scoring Weeks, Total Lowest Scoring Weeks, and Total Weeks Ranked #1 each return 12 rows.
  - A future View More enhancement is planned for the winning and losing streak tables.
  - The page-specific redesign is complete and approved. It uses the shared dark navy/charcoal geometric record-page foundation, centered existing All-Time artwork, six natural-height dark cards, compact controls, and neutral compact tables, with deep navy and restrained white/silver accents; red remains mainly in the artwork. Active Members Only toggles now have clearer default/hover affordance, and the standalone Season Totals toggle is right-aligned on desktop and mobile.
  - The six-panel structure remains Season Totals, Owner Totals, Playoff Records, Consolation Records, Championship Records, and Last Place Game. The retained postseason artwork is a compact divider with a centered “Post Season Records” heading.
  - Mobile tables fit within their cards when their columns reasonably allow it and retain contained horizontal scrolling only where genuinely needed. The RPC, all categories, six independent requests, 10-row request limits, Active Members Only and Season scope behavior, ranks/ties/order, loading/empty/error states, and stale-response protection remain unchanged.
  - Work remained in `<main>` and All-Time page-specific files. No global header/navigation/footer, shared CSS/JavaScript, Supabase configuration, database object, or RPC contract changed.
- Current Year database checkpoint:
  - Supabase RPC `public.site_current_year_records(integer, text, text, integer)` is the permanent, owner-approved browser source after successful Netlify validation.
  - The page sends explicit year 2026 and displays 2026 in its season heading/page title. It makes one independent initial request for each of its four visible panels; per-panel request sequencing protects rapid changes.
  - No official canonical `public.seasons` row or related 2026 data exists yet. Current Year therefore intentionally renders its existing empty/no-data states until the real season is created and completed-week data begins arriving; request failures continue to use the separate error state.
  - The four helper functions behind `public.site_current_year_records(...)` now return zero rows rather than raising `Unsupported season year` when the requested season does not exist. Validation confirmed `site_current_year_records(2026, 'high-score', 'combined', null)` succeeds with no rows.
  - Totals scopes map to combined, regular, and postseason; MNF and TNF are combined-only. Dormant Final Placing and Points For / Points Against make no statistics request.
  - Highest Scores by Position ranks individual starting-slot rows from `legacy_slot_scores`; RB1, RB2, and eligible RB/WR FLEX scores are independent, bench is excluded, and `v_owner_position_week` remains the Totals by Position source.
  - Corrected `rb-high`, `wr-high`, and `all-high` results were validated with preserved `PQF`/`POST` and `CQF`/`POSTC` metadata.
  - The page is Supabase-only. Its comparison renderer, SheetJS dependency, obsolete unreferenced `nextgenstats/currentyear/season-data.js`, workbook request, and shared Excel-backed footer loader were removed.
  - The page-specific redesign is complete and approved. It remained scoped to `<main>`, `nextgenstats/currentyear/index.html`, and `currentyear-styles.css`; shared header/navigation/footer, Supabase configuration, database objects, RPC contracts, and footer metadata behavior were unchanged.
  - The approved presentation uses the NextGenStats dark navy/charcoal geometric foundation with restrained navy/red accents, the existing opaque `currentyear-logo.png` centered in a compact framed hero, four natural-height dark cards, compact neutral tables, subtle separators/red header rules, compact dark dropdowns, and a segmented Reg + Post / Reg Only / Post Only control that preserves existing scope behavior.
  - Desktop and mobile retain the same four independent panels and data behavior. Mobile stacks them with contained controls/tables and no page-level overflow. Current Year is the visual reference for the completed Single Game, All-Time, and Season Records redesigns; each page preserves its own data contracts and functional differences.
  - Highest Scores by Position on Current Year and Season Records now returns and displays canonical `player_name`; the enhancement is complete and validated.
- Season Records database checkpoint:
  - The frontend now uses `public.site_season_records(integer, text, text, integer)` through root `supabase-config.js` as its sole statistics source.
  - The selector covers 2012-2025 and defaults to 2025. Initial load and year changes request all six visible panels; category and valid scope changes request only the affected panel.
  - Position totals support combined, regular, and postseason. MNF and TNF force combined scope and disable unsupported scope choices.
  - Highest Scores by Position renders individual starting-slot rows without aggregation and preserves the nullable Player column with an em dash for missing names.
  - Per-panel request sequencing, valid loading/empty/error rows, safe text rendering, tied display ranks, two-decimal points, integer counts, and year-specific category availability are implemented.
  - `nextgenstats/seasonrecords/YearRecords.xlsx`, SheetJS, jQuery, workbook parsing, and the shared Excel-backed footer loader were removed from this page.
  - The deployed Netlify page was manually verified by the owner; all panels populate and the visible data appears accurate.
  - Database player-name and draft coverage is complete for 2012-2025. Representative 2012-2025 season/position checks passed; legitimate nulls remain for confirmed byes and genuine empty starter slots.
  - `public.site_season_records` is approved as the permanent Season Records browser source.
  - The migration originally preserved the existing layout and styles. The later Season Records page-specific redesign is complete and approved without changing the migration or data contract.
  - The five Season Records helpers now validate that the requested season exists and is complete instead of enforcing a fixed 2024 ceiling. The public RPC supports completed 2025; final-place validation returned exactly 12 unique places from 1 through 12.
  - Season Records testing passed for 2025 categories and supported scopes, older-year switching, and desktop/mobile behavior. Current Year now requests 2026 independently; Season Records remains a completed-season consumer and still defaults to 2025.
  - The page-specific redesign is complete and approved. It uses the shared dark navy/charcoal geometric foundation, centered existing Season Records artwork with a compact integrated year selector, six natural-height dark cards, compact controls, neutral tables, and the stronger red artwork-derived accent.
  - The six panels remain Final Placing, Points For / Points Against, Single Game Records, Totals by Position, Highest Scores by Position, and Non-Point Records. Desktop uses a two-column natural-height grid; mobile stacks one column and fits tables within cards where practical, with contained scrolling only for genuinely wide results.
  - `public.site_season_records`, the 2012-2025 selector/default 2025, year-based category rebuilding, all categories, six independent requests, Totals scope and combined-only MNF/TNF behavior, row limits, ranks/ties/null handling/order, dynamic headers/details, request states, and stale protection remain unchanged.
  - Work remained in `<main>` and Season Records page-specific presentation files. No global header/navigation/footer, shared CSS/JavaScript, Supabase configuration, database object, or RPC contract changed. Pre-2019 `1rank` availability remains a separate functional/data-contract review.
- Current Year and Season Records contain example or placeholder explanatory content that will require owner-directed replacement.
- Bowl Games has no remaining placeholder descriptions, unknown entries, missing verified year cards, or artwork follow-up work through 2025.
- Pro Bowl 2026 remains deferred until authoritative annual data are available.

### Pro Bowl redesign complete

- The `vault/probowl/` page-specific redesign is complete and owner-approved. It uses a premium warm off-white/pale-gold and navy Vault event system with the exact `FASTSTRONGFIVE VAULT` eyebrow, integrated champion/results/MVP hero, desktop three-division lineup comparison, accessible one-division mobile tabs, and compact cumulative history table.
- The 2025 Pro Bowl event was unofficial, while its authoritative owner-supplied winner, results, MVP, and lineups are embedded in `vault/probowl/probowl.js`; they are not placeholders. All three divisions use the standardized Smokey Road, Evans, and Madras artwork under `divisions/artwork/`; the featured champion artwork is enlarged within the original-size circle without changing lineup or standings logos.
- Work remained scoped to `vault/probowl/index.html`, `vault/probowl/probowl.css`, and `vault/probowl/probowl.js`. Global header/navigation/footer files, shared CSS/JavaScript, Supabase configuration, backend architecture, and unrelated pages were unchanged.
- Desktop and mobile validation covered wrapping, alignment, page/hero overflow, long fantasy-team text, accessible tab behavior and keyboard navigation, and console output. Pro Bowl 2026 remains unimplemented and should be appended only when authoritative annual data are available.

## Retained historical and compatibility material

- Historical workbook provenance remains documented in `DATABASE_SCHEMA_AUDIT.md`, `DATABASE_HANDOFF.md`, and the archived page audits; no workbook remains in the website repository.
- `vault/brackets/help/` is retained historical working material.
- Bracket artwork/theme status is final through 2025: no-art matchups use the approved fallback, and seasons before 2024 intentionally remain on the default theme.
- Older archive experiments remain unlinked:
  - `vault/archive/OLD2013.html`
  - `vault/archive/2012/2012.html`
- Confirmed unreferenced shared copies were removed after owner approval. Remaining page-owned CSS, images, scripts, historical material, and predeclared artwork paths stay in place unless a specific future maintenance change is owner-approved.

## Uncertain or unverified

- Exact runtime impact of every questionable relative path has not been verified against the deployed Netlify site.
- External WACZ availability is owner-confirmed but was not network-tested during the repository audit.
- Broader page-content normalization and hidden legacy logo/header decisions remain separate future maintenance work, not unfinished page redesigns.
- Archive experiments and other historical material will be scrubbed individually; no global removal inference should be made from age or inactive navigation alone.
- Historical workbook authoring and update procedures remain unavailable, but they are no longer website runtime requirements.

## Documentation state

- Root `AGENTS.md`: repository working instructions
- `PROJECT_CONTEXT.md`: project purpose, deployment model, and lifecycle
- `SITE_STRUCTURE.md`: page/dependency map and older pages
- `DESIGN_RULES.md`: maintenance and visual constraints
- `DATA_STRUCTURES.md`: Supabase, embedded, and external data sources
- `DECISIONS.md`: owner-confirmed decisions
- `CURRENT_STATUS.md`: active work, placeholders, and known issues
- `SEASON_ROLLOVER_CHECKLIST.md`: concise annual page/feature rollover checklist with incomplete requirements marked explicitly
- `DATABASE_HANDOFF.md`: implemented database state and website RPC contracts
- `DATABASE_SCHEMA_AUDIT.md`: historical source audit and relational design
- `QUERY_EXECUTION_GUIDE.md`: database-query interpretation and safety rules
- `SUPABASE_WEBSITE_INTEGRATION.md`: current browser integration architecture and historical staged migration method
- `archive/SUPABASE_MIGRATION_HISTORY.md`: concise history and index of completed migrations and archived audits
