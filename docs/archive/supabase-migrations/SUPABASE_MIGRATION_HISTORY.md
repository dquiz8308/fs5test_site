# Supabase Migration History

## Purpose

This file is the historical index for the completed website migration from browser-loaded Excel workbooks to approved Supabase RPCs. Detailed pre-migration behavior, mappings, and acceptance criteria remain in the page-specific audits. Current site-consumer behavior is documented in `../../DATA_STRUCTURES.md`; database implementation is authoritative in the separate `database` repository.

The statistical migrations are complete and owner-approved. Existing layouts and styles were intentionally preserved; later design, styling, visual-consistency, player-enrichment, and feature work are separate enhancements rather than unfinished migration work.

## Single Game Records

- **Permanent RPC:** `public.site_single_game_records(p_record_category text, p_scope text, p_game_code text, p_limit integer)`
- **Request model:** one top-20 request for the selected category and broad or exact postseason filter.
- **Contract:** nine PPR-era record categories; owner-perspective and one-row-per-game outputs; structured owners, scores, ranks, year, week, game code, and broad class; PostgreSQL `RANK()` ties.
- **Validation:** database contract and frontend were manually verified and owner-approved.
- **Removed dependencies:** `nextgenstats/singlegame/SingleGame.xlsx`, SheetJS, Excel fallback, and the Excel-backed footer.
- **Deferred work:** visual review only.

## H2H

- **Permanent RPC:** `public.site_h2h_page(p_primary_owner_id bigint, p_secondary_owner_id bigint)`
- **Request model:** one request per valid ordered pair of distinct current owners; placeholder and same-owner states make no request.
- **Contract:** one structured response supplies both owner summaries, league-wide ranks, combined-game extrema, and the newest-first selected-owner-perspective game log.
- **Validation:** normal and reversed perspectives, ties, ranks, notes, request states, desktop/mobile behavior, local HTTP, and Netlify were manually verified and owner-approved.
- **Removed dependencies:** `h2h/siteh2h.xlsx`, both legacy Excel data scripts, SheetJS, and the Excel-backed footer.
- **Presentation follow-up:** The later page-specific H2H redesign is complete and approved. It added the compact blank-state selector intro, light comparison summary, conditional tie row, structured combined-game cards, and responsive cached Game Log expansion without changing the migration contract or any global/database file.

Detailed audit: [H2H_SUPABASE_MIGRATION_AUDIT.md](H2H_SUPABASE_MIGRATION_AUDIT.md)

## Owners

- **Permanent RPC:** `public.site_owner_page(p_owner_name text)`
- **Request model:** the `Owner` placeholder resets the page without a request; each valid owner selection makes one request, and record-list changes reuse that response.
- **Contract:** one JSON object supplies identity, all-time totals, completed-season summaries, streaks, PPR point metrics, postseason metrics, season rows, eight record lists, and 11 H2H summaries.
- **Validation:** all 12 current owners and all visible sections were manually verified locally and on Netlify, including desktop/mobile and rapid-selection behavior.
- **Removed dependencies:** Owners workbook loaders, `fs5main.xlsx`, SheetJS, and the Excel-backed footer.
- **Presentation follow-up:** The full page-specific Owners redesign was later completed and approved: blank state, unified profile, four performance cards, newest-first expandable Season History, responsive Team Game Records, H2H grid, and image fallbacks. Its RPC contract and one-request-per-owner behavior were unchanged, and no global interface files changed.

Detailed audit: [OWNERS_SUPABASE_MIGRATION_AUDIT.md](OWNERS_SUPABASE_MIGRATION_AUDIT.md)

## All-Time Records

- **Permanent RPC:** `public.site_all_time_records(p_record_category text, p_active_only boolean, p_scope text, p_limit integer)`
- **Request model:** six panels request independently; each request carries its category, Active Members Only state, valid scope, and `p_limit = 10`.
- **Contract:** all 40 visible categories; filtering precedes ranking; tied display ranks come from PostgreSQL `RANK()`; category-specific row contracts apply. Positional regular/postseason scope uses `v_owner_position_week.phase = 'REG'` or `'POST'`; playoff byes count `PB1`, consolation byes count `CB1`, and finalized appearance streaks require length 2 or greater.
- **Validation:** every visible category and filter was reviewed locally and on Netlify on desktop and mobile, then owner-approved.
- **Removed dependencies:** All-Time workbook references, SheetJS, Excel fallback, and the Excel-backed footer.
- **Deferred work:** a frontend View More enhancement for the 10-row winning and losing streak tables, plus visual review.

Detailed audit: [ALL_TIME_SUPABASE_MIGRATION_AUDIT.md](ALL_TIME_SUPABASE_MIGRATION_AUDIT.md)

## Current Year

- **Permanent RPC:** `public.site_current_year_records(p_year integer, p_record_category text, p_scope text, p_limit integer)`
- **Request model:** explicit `p_year = 2025`; four visible panels request independently, and only the affected panel reloads after a category or valid scope change.
- **Contract:** 32 visible categories; combined, regular, and postseason totals with MNF/TNF combined-only; owner totals preserve the 12-member population and nulls. Individual position highs use eligible `legacy_slot_scores` starting-slot rows, while totals use `v_owner_position_week`.
- **Validation:** all categories passed database regression through 2025 Week 15; corrected RB, WR, and all-position highs and postseason metadata were verified; the deployed frontend was owner-approved.
- **Removed dependencies:** Excel comparison renderer, workbook request, SheetJS, unused page-local Excel script, and the Excel-backed footer.
- **Deferred work:** player display, removal of dormant hidden panels, owner-directed year rollover, and visual review.

Detailed audit: [CURRENT_YEAR_SUPABASE_MIGRATION_AUDIT.md](CURRENT_YEAR_SUPABASE_MIGRATION_AUDIT.md)

## Season Records

- **Permanent RPC:** `public.site_season_records(p_year integer, p_record_category text, p_scope text, p_limit integer)`
- **Request model:** six independent panel requests for the selected explicit year; year changes refresh all panels, while category and valid scope changes refresh only the affected panel.
- **Contract:** years 2012-2024 with year-specific availability and 10- or 12-owner populations; position totals support combined/regular/postseason except MNF/TNF; individual historical starter highs come from `legacy_slot_scores`; nullable `player_name` preserves the Player column without affecting ranking.
- **Validation:** all panels and visible data were manually verified on deployed Netlify and owner-approved.
- **Removed dependencies:** `nextgenstats/seasonrecords/YearRecords.xlsx`, SheetJS, jQuery, workbook parsing/range maps, and the Excel-backed footer.
- **Deferred work:** audit all RPCs and frontend contracts affected by 2025 completion; add 2025 to `site_season_records` and related selector/contracts; revalidate 2025 final placing and affected categories before rollover; optional player enrichment and visual review remain separate.

Detailed audit: [SEASON_RECORDS_SUPABASE_MIGRATION_AUDIT.md](SEASON_RECORDS_SUPABASE_MIGRATION_AUDIT.md)

## NextGenStats landing-page Quick Summary

- **Permanent RPC:** `public.site_nextgenstats_summary()`
- **Request model:** exactly one no-parameter request on initial load; Wins, Losses, and Ties sorting is browser-only.
- **Contract:** exactly 12 unique current-owner rows with unique `display_order`, canonical names, and integer win/loss/tie counts; the RPC owns the approved initial owner order.
- **Validation:** live contract checks and deployed Netlify testing passed with no issues and received owner approval.
- **Removed dependencies:** Quick Summary workbook request, positional workbook/HTML matching, XLSX/SheetJS parsing, and the Excel-backed footer.
- **Deferred work:** optional summary additions and visual review.

Detailed audit: [NEXTGENSTATS_SUPABASE_MIGRATION_AUDIT.md](NEXTGENSTATS_SUPABASE_MIGRATION_AUDIT.md)

## Repository-wide Excel runtime removal

- The root homepage was confirmed to be a static links page; its orphaned workbook renderer had no matching table target and produced no visible statistics.
- Root `script.js`, root `footer-script.js`, obsolete root `h2hsummary.js`, all remaining workbook files, and every SheetJS/footer-loader reference were removed.
- All 16 website footers use identical static fallback HTML. The later approved presentation is `FastStrongFive` above `Founded 2012`, with root `footer-status.js` independently adding the validated Supabase Last Updated metadata.
- Current statistical pages use the approved RPCs above; static pages require no statistical data source.
- SportsBook's former Google Sheets/EmailJS member runtime was outside the Excel-page migration audited here and has since been retired. Current authority is split between the database and Admin repositories.
- Historical workbook provenance remains in the archived audits and database documentation; no workbook remains in the website runtime or repository.
