# Owners Supabase Migration Audit

> Status: completed. `public.site_owner_page(text)` is the active Owners website data source. The frontend was manually verified locally and on Netlify and approved as the permanent Supabase implementation. The Owners Excel loaders and SheetJS dependency were removed. This document is retained as the historical pre-migration behavior and mapping record.

> Sections 1–14 below preserve the pre-migration behavior, findings, recommendations, and acceptance criteria as a historical reference. Present-tense descriptions of Excel behavior in those sections refer to the former implementation.

## 1. Purpose and scope

This audit documents the current `owners/` page before migration and maps its Excel-driven outputs to the validated owner views and functions already present in Supabase.

The intended migration is a data-source change, not a redesign. The current owner list, labels, formatting, tables, H2H cards, desktop layout, mobile layout, and owner-specific artwork should remain stable unless a separately approved correction is required.

This is an audit only. No Owners HTML, CSS, JavaScript, workbook, shared runtime file, or database object was changed.

## 2. Files inspected

### Owners page and shared runtime

- `owners/index.html`
- `owners/ownerscript.js`
- `owners/overall-stats.js`
- `owners/all-years-table.js`
- `owners/game-records-table.js`
- `owners/owner.h2h.js`
- `owners/summary-background.js`
- `owners/ownerstyle.css`
- `fs5main.xlsx`
- `common.css`
- `styles.css`
- `mobile-menu.js`
- `footer-script.js`
- `supabase-config.js`

### Project and database documentation

- `AGENTS.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/SITE_STRUCTURE.md`
- `docs/DESIGN_RULES.md`
- `docs/DATA_STRUCTURES.md`
- `docs/DECISIONS.md`
- `docs/CURRENT_STATUS.md`
- `docs/SUPABASE_WEBSITE_INTEGRATION.md`
- `docs/DATABASE_HANDOFF.md`
- `docs/DATABASE_SCHEMA_AUDIT.md`
- `docs/QUERY_EXECUTION_GUIDE.md`
- `docs/archive/H2H_SUPABASE_MIGRATION_AUDIT.md`

## 3. Current page behavior and Excel request flow

The page has one owner dropdown. Selecting a valid owner independently triggers five scripts:

1. `ownerscript.js` downloads and parses `../fs5main.xlsx` for the summary, streak, point, playoff, and championship panels.
2. `overall-stats.js` downloads and parses the workbook again for the overall win/loss/tie totals.
3. `all-years-table.js` downloads and parses the workbook again for the season-by-season table.
4. `game-records-table.js` downloads and parses the workbook again for the selected record category.
5. `owner.h2h.js` downloads and parses the workbook again for all 11 opponent cards.

Consequently, one valid owner selection downloads and parses the complete approximately 6 MB workbook five times. Changing only the Team Game Records category causes an additional complete workbook request and parse. `footer-script.js` also requests the same workbook independently on page load for its last-updated text.

There is no shared workbook promise, shared parsed workbook, loading state, empty state, request error message, or request sequencing. A slower response from an earlier selection can overwrite a later selection. None of the five data scripts defines an XHR error handler.

`summary-background.js` is independent of Excel. It changes the summary-panel background and related presentation properties based on the selected owner. The Supabase migration should retain that responsibility as page-specific visual behavior.

## 4. Current filters

### Owner filter

The owner dropdown contains the placeholder `Owner` and these 12 current owners in this exact order:

```text
Brycen
Will
David
Jordan
Chris
Bailey
Mike
Keith
Ethan
Matthew
Cody
Max
```

The page does not expose inactive owners, a season range, a scoring-era selector, a phase selector, or an exact game-code selector.

The owner dropdown does not have an associated `<label>` or an `aria-label`.

### Team Game Records filter

The second dropdown contains these eight categories:

| UI value | Visible label |
| --- | --- |
| `high-scores` | Highest Team Score |
| `low-scores` | Lowest Team Score |
| `biggest-wins` | Biggest Wins |
| `biggest-losses` | Biggest Losses |
| `closest-wins` | Closest Wins |
| `closest-losses` | Closest Losses |
| `most-losing` | Most While Losing |
| `least-winning` | Least While Winning |

The default is `high-scores`. The game-record dropdown also lacks an associated `<label>` or `aria-label`.

## 5. Current visible outputs and formatting

### Overall Stats

| Visible output | Current display |
| --- | --- |
| Wins | Integer |
| Losses | Integer |
| Ties | Integer |
| Total Games | Integer |
| Win Percent | Three decimals |

### Summary and streak panels

| Visible output | Current display |
| --- | --- |
| Seasons | Integer |
| Team name | Text |
| Championships | Integer |
| Last Place | Integer |
| 10 Win Sea. | Integer |
| Best Record | `W - L` text |
| Worst Record | `W - L` text |
| Avg. Record | Two values in `W - L` text |
| Longest Win Streak | Integer plus a parenthesized year/week range |
| Longest Losing Streak | Integer plus a parenthesized year/week range |
| Current Streak | Compact text such as `W3` |

Streaks are chronological across seasons. The validated database definition excludes byes and treats ties as an explicit result.

### Points

The page shows Total Points, Average Points, Total Points Against, and Average Points Against. Values are formatted to two decimals and each has a published rank. Workbook labels explicitly identify these values as PPR data, so they use the point-record-eligible era beginning in 2018 rather than every historical season.

### Playoff and Championship Performance

The playoff panel shows appearances, byes, wins, losses, and win percentage. The championship panel shows appearances, wins, losses, and win percentage. Win percentages use three decimals. Every value also has a published rank, including tied ranks such as `T1`.

### All Years table

The table columns are:

```text
Year | Team Name | Record | Finish | Reg Sea. Place
```

The JavaScript reads 13 season rows beginning with 2012, which produces 2012 through 2024 in the current workbook. The static HTML initially contains only 12 rows, 2012 through 2023; JavaScript replaces the body after a valid selection.

### Team Game Records table

The table always displays 10 rows with:

```text
Rank | Team Score or Margin | Year | Week | Opponent
```

The second heading is `Team Score` for highest score, lowest score, most while losing, and least while winning. It is `Margin` for biggest/closest wins and losses. Values use two decimals. Weeks are already presentation text such as `Week 10`. Ranks are generated in the browser as 1 through 10; the current implementation has no tied-rank display for this table.

Loss margins are currently displayed as signed negative numbers. This is important for preserving the existing output: biggest losses are ordered from the most negative margin upward, while closest losses are ordered from the negative value nearest zero downward.

### H2H Summary

The page renders one card for every other current owner, for a total of 11 cards. Each card shows:

```text
Opponent name
Selected-owner wins - selected-owner losses
```

The card is green when wins exceed losses, red when losses exceed wins, and yellow when they are equal. Ties are not displayed as a third record value.

## 6. Workbook structure and exact website ranges

`fs5main.xlsx` currently contains 42 worksheets. The Owners website reads only:

- `Summary`;
- `SiteOwners`; and
- the selected current-owner sheet named exactly `Brycen`, `Will`, `David`, `Jordan`, `Chris`, `Bailey`, `Mike`, `Keith`, `Ethan`, `Matthew`, `Cody`, or `Max`.

The website nevertheless downloads and parses the entire workbook for every request.

### Summary-sheet owner rows

The owner-to-row mapping is:

| Owner | Row |
| --- | ---: |
| Brycen | 6 |
| Will | 7 |
| David | 8 |
| Jordan | 9 |
| Chris | 10 |
| Bailey | 11 |
| Mike | 12 |
| Keith | 13 |
| Ethan | 14 |
| Matthew | 15 |
| Cody | 16 |
| Max | 17 |

For the selected row, the page reads:

| Output | Cell column |
| --- | --- |
| Team name | `D` |
| Seasons | `I` |
| Championships | `J` |
| 10 Win Sea. | `P` |
| Playoff appearances | `AU` |
| Playoff byes | `AV` |
| Playoff wins | `AX` |
| Playoff losses | `AY` |
| Playoff win percentage | `AZ` |
| Championship appearances | `BA` |
| Championship wins | `BB` |
| Championship losses | `BC` |
| Championship win percentage | `BD` |
| Last-place finishes | `BM` |

`overall-stats.js` reads the same row from:

| Output | Cell column |
| --- | --- |
| Total games | `K` |
| Wins | `L` |
| Losses | `M` |
| Ties | `N` |
| Win percentage | `O` |

### Selected-owner sheet

The season table uses rows `2:14`:

| Output | Range |
| --- | --- |
| Regular-season place | `CD2:CD14` |
| Final finish | `CE2:CE14` |
| Team name | `CF2:CF14` |
| Record | `CH2:CH14` |

The summary script reads:

| Output | Cell |
| --- | --- |
| Longest win-streak detail | `CU14` |
| Longest losing-streak detail | `CU15` |
| Longest win streak | `CU16` |
| Longest losing streak | `CU17` |
| Current streak | `CU20` |
| Total PPR points | `CU21` |
| Average PPR points | `CU22` |
| Total PPR points against | `CU23` |
| Average PPR points against | `CU24` |
| Best record | `CU33` |
| Worst record | `CU34` |
| Average record | `CU35` |

### `SiteOwners` rank ranges

Rows `2:13` follow the fixed 12-owner order. The JavaScript reads rank display values from:

| Ranked output | Column |
| --- | --- |
| Total points | `CO` |
| Average points | `CQ` |
| Total points against | `CS` |
| Average points against | `CU` |
| Playoff appearances | `CX` |
| Playoff byes | `DA` |
| Playoff wins | `DD` |
| Playoff losses | `DG` |
| Playoff win percentage | `DJ` |
| Championship appearances | `DM` |
| Championship wins | `DP` |
| Championship losses | `DS` |
| Championship win percentage | `DV` |

These cells already contain display ranks such as `T1`, not only numeric rank values.

### `SiteOwners` Team Game Records blocks

Each owner has a four-column block containing metric, year, week text, and opponent:

| Owner | Columns |
| --- | --- |
| Brycen | `C:F` |
| Will | `G:J` |
| David | `K:N` |
| Jordan | `O:R` |
| Chris | `S:V` |
| Bailey | `W:Z` |
| Mike | `AA:AD` |
| Keith | `AE:AH` |
| Ethan | `AI:AL` |
| Matthew | `AM:AP` |
| Cody | `AQ:AT` |
| Max | `AU:AX` |

Within each block, record categories use:

| Category | Rows |
| --- | --- |
| Highest Team Score | `2:11` |
| Lowest Team Score | `13:22` |
| Biggest Wins | `24:33` |
| Biggest Losses | `35:44` |
| Closest Wins | `46:55` |
| Closest Losses | `57:66` |
| Most While Losing | `68:77` |
| Least While Winning | `79:88` |

The title/separator rows are `1`, `12`, `23`, `34`, `45`, `56`, `67`, and `78`.

### `SiteOwners` H2H blocks

Every owner has an 11-row, three-column block containing opponent name, selected-owner wins, and selected-owner losses:

| Owner | Range |
| --- | --- |
| Brycen | `BA2:BC12` |
| Will | `BD2:BF12` |
| David | `BG2:BI12` |
| Jordan | `BJ2:BL12` |
| Chris | `BM2:BO12` |
| Bailey | `BP2:BR12` |
| Mike | `BS2:BU12` |
| Keith | `BV2:BX12` |
| Ethan | `BY2:CA12` |
| Matthew | `CB2:CD12` |
| Cody | `CE2:CG12` |
| Max | `CH2:CJ12` |

## 7. Validated database interfaces

The database documentation identifies these relevant, fully validated interfaces:

- `v_owner_games` for owner-perspective game rows;
- `v_current_owner_games` for current-owner rows;
- `fn_owner_games(owner_id, season_from, season_to, phase, game_code)` for parameterized owner histories;
- `fn_h2h(primary_owner_id, secondary_owner_id)` for selected-owner-first H2H histories;
- `v_owner_season_summary` for season records, points, ranks, playoff/consolation counts, and team name;
- `v_owner_all_time_summary` for all-time owner totals;
- `v_owner_streaks` for chronological streaks; and
- `v_game_records` for one row per logical played game.

Validation status recorded in `DATABASE_HANDOFF.md` is strong enough to use these as canonical sources:

- all 34 columns of `v_owner_all_time_summary` reconciled with zero mismatches;
- `v_owner_season_summary` fully reconciled, including rank validation;
- `v_owner_streaks` fully reconciled;
- `fn_owner_games` validated across all 19 owners and multiple filter combinations; and
- `fn_h2h` validated across every ordered pair of distinct owners.

Point and point-derived outputs must apply the documented `scoring_eras.point_records_eligible` rule. Non-point results use all available seasons.

### Browser-access finding

A read-only request using the repository's browser-safe publishable configuration returned `permission denied` for `v_owner_all_time_summary`, `v_owner_season_summary`, `v_owner_streaks`, and `v_current_owner_games`. This is an expected security boundary, not a data-validation failure: the validated analytical views are not currently direct browser APIs.

The frontend therefore needs a dedicated browser-safe website RPC with explicit `anon`/publishable-key execution permission, following the existing `site_single_game_records` and `site_h2h_page` pattern. The browser must not be granted broad direct access to the analytical views.

## 8. Current output to Supabase mapping

| Page section | Canonical source | Mapping notes |
| --- | --- | --- |
| Owner identity/current-owner list | Owners/current-owner data behind the website RPC | Return a stable owner ID and display name; preserve current UI order separately if it is a presentation decision |
| Overall Stats | `v_owner_all_time_summary` | Direct wins, losses, ties, games, and win percentage |
| Seasons, championships, last places, 10-win seasons | `v_owner_all_time_summary` and/or aggregation of `v_owner_season_summary` | Prefer already validated all-time fields when present |
| Best, worst, and average record | `v_owner_season_summary` or validated all-time fields | Preserve `W - L` display; do not parse workbook display strings |
| Streak values/details | `v_owner_streaks` | Derive current/maximum streak and format the start/end season/week range |
| PPR point totals/averages and ranks | `v_owner_all_time_summary` | Preserve two decimals, nulls, and tied rank display |
| Playoff/championship metrics and ranks | `v_owner_all_time_summary` | Preserve three-decimal percentages and tied rank display |
| All Years table | `v_owner_season_summary` | Year, team name, record, final finish, regular-season place; order ascending to match the page |
| Team Game Records | `v_owner_games` through the website RPC | Filter selected owner, apply PPR eligibility, sort per category, limit 10 |
| H2H cards | `fn_h2h` or aggregation of `v_owner_games` through the website RPC | Return all 11 current opponents in one response rather than making 11 browser RPC calls |

The exact deployed analytical-view column names are not recorded in the repository documentation and are not exposed to the browser role. The website RPC must use the inspected database schema and publish an explicit return contract; frontend code must not guess column names.

## 9. Team Game Records query rules

All eight current categories are point-derived and should use only point-record-eligible games. Byes and incomplete games must be excluded. Always return at most 10 rows for the selected owner.

| UI value | Eligibility and metric | Sort |
| --- | --- | --- |
| `high-scores` | Owner score | Score descending |
| `low-scores` | Owner score | Score ascending |
| `biggest-wins` | Result `WIN`; signed margin | Margin descending |
| `biggest-losses` | Result `LOSS`; signed margin | Margin ascending |
| `closest-wins` | Result `WIN`; signed margin | Margin ascending |
| `closest-losses` | Result `LOSS`; signed margin | Margin descending |
| `most-losing` | Result `LOSS`; owner score | Score descending |
| `least-winning` | Result `WIN`; owner score | Score ascending |

Deterministic tie-breakers should be defined in the RPC, and the RPC should return both numeric and display rank if tied records are to be represented accurately. The current browser-generated 1–10 ranks conceal ties; changing that display should be treated as an explicit correctness decision during implementation.

Structured return fields should include at least display rank, numeric rank, metric value, year, week number, opponent name, selected score, opponent score, result, and signed margin. The browser should format these fields rather than parse composite display strings.

## 10. Recommended browser RPC boundary

The smallest maintainable browser boundary is one Owners-page RPC, provisionally:

```text
public.site_owner_page(p_owner_name text)
```

It should resolve only a valid current owner and return the page's canonical sections in a documented structured contract:

- selected-owner identity;
- all-time summary;
- streak summary and start/end detail;
- season rows;
- all eight 10-row record lists; and
- all current-opponent H2H summaries.

A single response avoids recreating the current five-request duplication and gives one request sequence to protect against rapid owner changes. If the database implementation prefers a separate record-category RPC, it must still avoid re-fetching the other four page sections and should accept only a validated category value with a fixed server-side limit of 10.

The RPC should read only from validated views/functions, use explicit column selection, reject invalid owners/categories, preserve nulls, and grant only `EXECUTE` to the browser role. No service-role key or raw SQL belongs in browser JavaScript.

The exact RPC name and return shape are database implementation decisions; no existing approved Owners website RPC is documented yet.

## 11. Migration-relevant defects found

These findings should be resolved deliberately during migration rather than copied into the Supabase implementation:

1. `ownerscript.js` maps Jordan's playoff appearances to `Summary!AU8`, David's row, instead of Jordan's `Summary!AU9`.
2. Jordan's mapping omits Average Points Against entirely, although `Jordan!CU24` contains the value. The existing page can therefore leave that field at its initial or previous-owner value.
3. The All Years placeholder reset inserts fabricated-looking values (`Name`, `12-12`, `3`, and `5`) instead of a neutral empty state.
4. Invalid/placeholder selections do not have one coordinated reset across all scripts.
5. `owner.h2h.js` clears only `backgroundColor` during reset, not a previously assigned gradient `backgroundImage`.
6. `summary-background.js` does not clear every owner-specific inline style before applying the next owner, so properties can carry across selections.
7. `ownerscript.js` writes the footer date from `Summary!X22`, while the shared `footer-script.js` writes it from `Summary!X27`; the inspected workbook has the visible date in `X27`.
8. The H2H heading link points to `../h2hpage/h2hmain.html`, which does not match the repository's current `h2h/index.html` location.
9. Both dropdowns lack accessible labels.
10. Several renderers use `innerHTML` for workbook-derived text. Supabase-returned text should be rendered with `textContent` or equivalent safe DOM construction.

These are audit findings only. None was changed.

## 12. Desktop and mobile preservation

The desktop page uses three major flex rows:

- owner summary and overall stats;
- points, playoff, and championship panels; and
- All Years and Team Game Records side by side.

At `max-width: 765px`, those rows change to vertical columns, the main panels become approximately 95% width, and H2H cards stack vertically. The game-record table has horizontal-overflow rules, while the All Years table uses a fixed table layout.

The data migration should not require CSS changes. Implementation review should verify:

- no loading or empty message changes panel dimensions unexpectedly;
- long team names and opponent names do not overflow;
- both tables remain readable at the existing breakpoint;
- H2H color states remain visible and understandable;
- keyboard focus and accessible names exist for both dropdowns; and
- rapid filter changes do not show data for the wrong owner on either desktop or mobile.

The stylesheet contains missing semicolons after two mobile `margin-left` declarations. They are pre-existing and unrelated to the data-source audit.

## 13. Implementation acceptance checklist

Before removing Excel from the Owners page, validate:

- all 12 current owner selections;
- all summary, streak, point, playoff, and championship outputs;
- all 13 currently published season rows per owner;
- all eight game-record categories and the 10-row limit;
- PPR-only eligibility for every point-derived result;
- all-era eligibility for wins, losses, ties, championships, and streaks;
- all 11 H2H opponent cards, including reciprocal records;
- two-decimal points and three-decimal percentages;
- tied ranks and null handling;
- loading, empty, error, and invalid-selection states;
- request sequencing under rapid owner/category changes;
- one coordinated data request strategy rather than five duplicate workbook requests;
- safe text rendering;
- desktop and mobile presentation;
- local HTTP-server behavior;
- Netlify behavior with the browser publishable key;
- no direct analytical-view grants to the browser;
- no service-role key;
- comparison against the current workbook before its removal; and
- explicit owner approval before deleting `fs5main.xlsx`, SheetJS, or Excel fallback code used by other pages.

## 14. Audit conclusion

No clarification was required for this audit. The UI, workbook contract, point-era rules, and validated database sources were discoverable from the repository.

The audit's prerequisite was satisfied by the dedicated browser-executable `public.site_owner_page(text)` RPC. The implementation was subsequently completed and manually verified locally and on Netlify; Supabase is now the permanent Owners-page data source.

## 15. Post-migration presentation status

This archived audit records the pre-migration presentation and migration-preservation requirement. It is not the current visual specification for the Owners page.

After migration approval, a separate page-specific presentation project redesigned the Owners page through all five phases. The implementation keeps all migration contracts described above: the placeholder makes no request, each valid owner selection makes one `public.site_owner_page(text)` request, stale responses cannot overwrite a newer selection, and all loading, empty, error, formatting, ranking, tie, null, list, category, Supabase, and footer behaviors remain intact.

The completed presentation is approved. It includes the no-request centered blank selector state; unified current-team profile; redesigned Career Streaks, Scoring, Playoff, and Championship cards; newest-first Season History with 6-desktop/4-mobile recent expansion; responsive Team Game Records; H2H 6/5 desktop and two-column mobile grids; and consistent profile/yearly-image fallbacks.

Final cleanup removed 725 obsolete CSS lines and dead JavaScript without changing behavior. Validation passed for all 12 owners and the approved responsive states. No global header, navigation, footer, shared styling, database object, or RPC contract changed.
