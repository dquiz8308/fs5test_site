# All-Time Records Supabase Migration Audit

> Status: migration complete, manually validated locally and on Netlify, and approved as permanent. The All-Time Records page uses `public.site_all_time_records` as its authoritative browser source, with no Excel/SheetJS dependency or fallback. Sections 1–15 retain the historical pre-migration audit and approved backend rules for reference. Current implementation state is documented below and in `../CURRENT_STATUS.md`, `../SITE_STRUCTURE.md`, `../DATA_STRUCTURES.md`, and `../DATABASE_HANDOFF.md`.

## 1. Purpose and scope

This audit documents `nextgenstats/alltime/` in preparation for replacing its Excel-backed browser data with a dedicated Supabase website interface.

The future migration is a data-source change, not a redesign. It should preserve the six visible record panels, all current dropdown choices, filter concepts, wording, table layouts, rank display, explanatory notes, desktop behavior, and mobile behavior unless a separately approved correction is required.

This is an audit only. No All-Time HTML, CSS, JavaScript, workbook, shared runtime file, or database object was changed.

## 2. Files inspected

### Page and shared runtime

- `nextgenstats/alltime/index.html`
- `nextgenstats/alltime/alltimestyles.css`
- `nextgenstats/alltime/nongame-other.js`
- `nextgenstats/alltime/nonpoint-data.js`
- `nextgenstats/alltime/nongame-details.js`
- `nextgenstats/alltime/checkbox-css.js`
- `nextgenstats/alltime/fs5main.xlsx`
- `nextgenstats/fs5main.xlsx`
- root `fs5main.xlsx`
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

## 3. Current page structure

The page heading is `All-Time Non-Point Records`, although the Season Totals panel publishes points-for, points-against, positional scoring, and other point-derived records.

Six record panels are displayed:

1. Season Totals
2. Owner Totals
3. Playoff Records
4. Consolation Records
5. Championship Records
6. Last Place Game

Every panel has:

- one category dropdown;
- one or more checkbox filters;
- one dynamically rewritten table;
- one explanatory detail line; and
- five empty static HTML rows that are replaced by JavaScript.

The browser fetch path in `nonpoint-data.js` is:

```text
../fs5main.xlsx
```

From `nextgenstats/alltime/`, that path resolves to:

```text
nextgenstats/fs5main.xlsx
```

It does not resolve to the page-local copy at `nextgenstats/alltime/fs5main.xlsx`. The page-local workbook is not referenced by the loaded scripts.

The shared `footer-script.js` separately requests:

```text
/fs5main.xlsx
```

for `Summary!X27`.

The three workbook copies have slightly different file sizes and SHA-256 hashes. That can result from workbook-package metadata as well as content changes, so binary inequality alone does not prove published-cell differences. The future comparison must use the actual runtime source, `nextgenstats/fs5main.xlsx`.

## 4. Current request and event flow

On initial page load:

1. `nongame-other.js` initializes the Season Totals filter and calls `handleEvent()` once.
2. `nonpoint-data.js` initializes its listeners and calls `handleEvent()` once for each of the six panels.
3. `footer-script.js` independently requests the root workbook.

The page therefore initiates seven statistics workbook reads on load—two for Season Totals and one for each other panel—plus the footer workbook read. Every read downloads or retrieves the complete approximately 6 MB workbook, converts it to an array buffer, and parses the complete workbook with SheetJS before reading one small range.

Each later category or checkbox change causes another complete workbook fetch and parse for the affected panel. There is no shared fetch promise or parsed-workbook cache.

The page has:

- no request sequencing;
- no stale-response protection;
- no XHR/fetch error handling;
- no user-facing error state;
- no empty-result state; and
- no protection against an older request overwriting a newer filter selection.

The intended spinner is inserted as a `<div>` directly inside each `<table>`, which is invalid table markup. Browsers may relocate the element, after which `table.querySelector('.spinner')` may not find it. Loading feedback is therefore not reliable.

## 5. Filter behavior

### Season Totals

Nine categories:

```text
top-points-for
top-points-against
season-tds
season-qb
season-rb
season-wr
season-te
season-k
season-def
```

For `top-points-for` and `top-points-against`, only `Active Members Only` is shown. It defaults unchecked.

For the other seven categories, the active-owner checkbox is hidden and these mutually managed checkboxes are shown:

```text
Reg + Post
Reg Only
Post Only
```

`Reg + Post` is selected when the category changes. The code allows the selected checkbox to be unchecked, in which case no scope box is selected and the default range is used; the default is the same as combined.

### Other five panels

Owner Totals, Playoff, Consolation, Championship, and Last Place each show an `Active Members Only` checkbox. It defaults unchecked and is not mutually exclusive with another filter because it is the only checkbox in its panel.

The checkbox is visually available for every category, but several category mappings do not have a distinct active-owner range. For those selections, checking the box currently has no effect.

### Accessibility

The checkboxes have associated labels. None of the six category `<select>` elements has an associated `<label>` or `aria-label`.

## 6. Visible categories, table contracts, and explanatory scope

### Season Totals

| UI value | Visible label | Columns | Published scope note |
|---|---|---|---|
| `top-points-for` | Most Points For in a Season | Rank, Owner, Points For, Year, Avg/Game | Regular season; PPR era |
| `top-points-against` | Most Points Against in a Season | Rank, Owner, Points Against, Year, Avg/Game | Regular season; PPR era |
| `season-tds` | Most TDs in a Season | Rank, Owner, Touchdowns, Year | Tracked since 2019; combined, regular, or postseason |
| `season-qb` | Most QB Points in a Season | Rank, Owner, Total QB Points, Year | PPR era; combined, regular, or postseason |
| `season-rb` | Most RB Points in a Season | Rank, Owner, Total RB Points, Year | PPR era; combined, regular, or postseason |
| `season-wr` | Most WR Points in a Season | Rank, Owner, Total WR Points, Year | PPR era; combined, regular, or postseason |
| `season-te` | Most TE Points in a Season | Rank, Owner, Total TE Points, Year | PPR era; combined, regular, or postseason |
| `season-k` | Most K Points in a Season | Rank, Owner, Total K Points, Year | Visible note says all years, STD + PPR |
| `season-def` | Most DEF Points in a Season | Rank, Owner, Total DEF Points, Year | Visible note says all years, STD + PPR |

The page returns 10 rows for every Season Totals selection. Point totals and averages are formatted to two decimals. TD, K, and DEF totals retain their workbook numeric display.

The current lists include incomplete 2025 production where it qualifies. For example, the inspected regular-season points-for list includes Jordan 2025. The backend must not silently apply the Owners page's completed-season summary exclusion to these live season-record lists.

### Owner Totals

| UI value | Visible label | Columns | Published scope note |
|---|---|---|---|
| `owner-tds` | Total TDs | Rank, Owner, TDs | Career REG + POST; tracked since 2019 |
| `owner-close` | Total Close Games | Rank, Owner, Games | Games decided by 10 points or less; PPR era |
| `owner-top` | Total Top Scoring Weeks | Rank, Owner, Weeks | Weekly highest score; all years |
| `owner-bottom` | Total Lowest Scoring Weeks | Rank, Owner, Weeks | Weekly lowest score; all years |
| `owner-1rank` | Total Weeks Ranked at #1 | Rank, Owner, Weeks | Tracked since 2019 |
| `win-streaks` | Longest Winning Streaks | Rank, Streak, Owner, Start, End | All years |
| `lose-streaks` | Longest Losing Streaks | Rank, Streak, Owner, Start, End | All years |

Owner totals normally publish 12 or 13 rows depending on the workbook range. Winning streaks use a 27-row range but currently contain 10 populated rows; losing streaks use a 27-row range with 12 populated rows. Blank rows are currently rendered because the browser does not filter them.

### Playoff Records

| UI value | Visible label | Columns |
|---|---|---|
| `playoff-app` | Total Playoff Appearances | Rank, Owner, App |
| `playoff-percent` | Playoff Percentage | Rank, Owner, App %, Apps, # of Seasons |
| `playoff-byes` | Total Playoff Byes | Rank, Owner, Playoff Byes |
| `long-po-streaks` | Longest Playoff Appearance Streaks | Rank, Owner, Streak, Years |
| `current-po-streaks` | Current Playoff Appearance Streaks | Rank, Owner, Streak, Years |
| `po-wins-winner` | Most Playoff Wins (Winner's Bracket) | Rank, Owner, PO Wins |
| `po-wins-all` | Most Playoff Wins (All PO Games) | Rank, Owner, PO Wins |
| `lstreak-make` | Losing Streaks to Start | Rank, Owner, Streak, Year |
| `wstreak-miss` | Winning Streaks to Start | Rank, Owner, Streak, Year |

Playoff percentage publishes 15 all-owner rows or 12 active-owner rows. Most other playoff lists publish 12 rows. Current playoff streaks publish six rows. The two season-opening conditional lists publish 14 rows.

Winner's-bracket playoff wins mean Quarterfinal, Semifinal, and Championship wins. All-playoff wins additionally include Third Place and Fifth Place.

### Consolation Records

| UI value | Visible label | Columns |
|---|---|---|
| `consolation-app` | Total Consolation Appearances | Rank, Owner, App |
| `consolation-percent` | Consolation Percentage | Rank, Owner, App %, App, # of Seasons |
| `consolation-byes` | Total Consolation Byes | Rank, Owner, Consol Byes |
| `long-con-streaks` | Longest Consolation Appearance Streaks | Rank, Owner, Streak, Years |
| `current-con-streaks` | Current Consolation Appearance Streaks | Rank, Owner, Streak, Years |

The first four categories publish 12 rows. Current consolation streaks publish six rows.

### Championship Records

| UI value | Visible label | Columns |
|---|---|---|
| `championship-app` | Total Championship Appearances | Rank, Owner, App |
| `championship-wins` | Total Championship Wins | Rank, Owner, Wins |
| `championship-losses` | Total Championship Losses | Rank, Owner, Losses |
| `long-championship-streaks` | Longest Championship Appearance Streaks | Rank, Owner, Streak, Years |
| `championship-percent` | Championship Win % | Rank, Owner, Win %, Wins, App |

Each category publishes 12 rows. Championship percentage is displayed with two percentage decimals.

### Last Place Game

| UI value | Visible label | Columns |
|---|---|---|
| `lastplace-app` | Total Last Place Game Appearances | Rank, Owner, App |
| `lastplace-losses` | Total Last Place Game Losses | Rank, Owner, Losses |
| `lastplace-wins` | Total Last Place Game Wins | Rank, Owner, Wins |
| `long-lastplace-streaks` | Longest Last Place Appearance Streaks | Rank, Owner, Streak, Years |
| `lastplace-percent` | Last Place Game Lose % | Rank, Owner, Lose %, Losses, App |

Each range publishes 11 rows. The percentage is displayed with two percentage decimals.

## 7. Exact workbook ranges

All statistics ranges are on `Data2Publish` except the two result-streak lists on `StreakPublish`.

### Season Totals ranges

| Category | Default/combined | Active or regular | Postseason |
|---|---|---|---|
| `top-points-for` | `C111:G120` | Active: `I111:M120` | — |
| `top-points-against` | `O111:S120` | Active: `U111:Y120` | — |
| `season-tds` | `AE92:AH101` | Regular: `AE111:AH120` | `AJ111:AM120` |
| `season-qb` | `C126:F135` | Regular: `I126:L135` | `O126:R135` |
| `season-rb` | `U126:X135` | Regular: `AA126:AD135` | `AG126:AJ135` |
| `season-wr` | `AM126:AP135` | Regular: `AS126:AV135` | `AY126:BB135` |
| `season-te` | `C141:F150` | Regular: `I141:L150` | `O141:R150` |
| `season-k` | `U141:X150` | Regular: `AA141:AD150` | `AG141:AJ150` |
| `season-def` | `AM141:AP150` | Regular: `AS141:AV150` | `AY141:BB150` |

For `season-tds`, the source map also declares an active-owner path equal to the default range, but the active checkbox is hidden for this category.

### Owner Totals ranges

| Category | All owners | Active owners |
|---|---|---|
| `owner-tds` | `Data2Publish!AA92:AC103` | Same range |
| `owner-close` | `Data2Publish!W92:Y103` | Same range |
| `owner-top` | `Data2Publish!AJ92:AL104` | `Data2Publish!AN92:AP103` |
| `owner-bottom` | `Data2Publish!AR92:AT104` | `Data2Publish!AV92:AX103` |
| `owner-1rank` | `Data2Publish!AZ92:BB104` | Same range |
| `win-streaks` | `StreakPublish!G22:K48` | No active mapping |
| `lose-streaks` | `StreakPublish!AA22:AE48` | No active mapping |

### Playoff ranges

| Category | All owners | Active owners |
|---|---|---|
| `playoff-app` | `C28:E39` | `G28:I39` |
| `playoff-percent` | `K28:O42` | `Q28:U39` |
| `playoff-byes` | `W28:Y39` | `AA28:AC39` |
| `long-po-streaks` | `AE28:AH39` | `AL28:AO39` |
| `current-po-streaks` | `AS28:AV33` | Same range |
| `po-wins-winner` | `AY28:BA39` | `BC28:BE39` |
| `po-wins-all` | `BG28:BI39` | `BK28:BM39` |
| `lstreak-make` | `C92:F105` | `H92:K105` |
| `wstreak-miss` | `M92:P105` | `R92:U105` |

### Consolation ranges

| Category | All owners | Active owners |
|---|---|---|
| `consolation-app` | `C46:E57` | `G46:I57` |
| `consolation-percent` | `K46:O57` | `Q46:U57` |
| `consolation-byes` | `W46:Y57` | `AA46:AC57` |
| `long-con-streaks` | `AE46:AH57` | `AL46:AO57` |
| `current-con-streaks` | `AS46:AV51` | Same range |

### Championship ranges

| Category | All owners | Active owners |
|---|---|---|
| `championship-app` | `C61:E72` | `G61:I72` |
| `championship-wins` | `K61:M72` | `O61:Q72` |
| `championship-losses` | `S61:U72` | `W61:Y72` |
| `long-championship-streaks` | `AA61:AD72` | Same range |
| `championship-percent` | `AF61:AJ72` | `AL61:AP72` |

### Last Place ranges

| Category | All owners | Active owners |
|---|---|---|
| `lastplace-app` | `C77:E87` | `G77:I87` |
| `lastplace-losses` | `K77:M87` | `O77:Q87` |
| `lastplace-wins` | `S77:U87` | `W77:Y87` |
| `long-lastplace-streaks` | `AA77:AD87` | Same range |
| `lastplace-percent` | `AF77:AJ87` | `AL77:AP87` |

## 8. Rank, formatting, and null behavior

The workbook supplies the first rank column as a display value. Ties already use values such as `T1`, `T3`, and `T7`, and later ranks retain PostgreSQL-style gaps. The future backend should expose both numeric and display rank and should generate ties with PostgreSQL `RANK()`, not `DENSE_RANK()` or `ROW_NUMBER()`.

Current formatting rules:

- points-for, points-against, average/game, and QB/RB/WR/TE totals: two decimals;
- the four percentage categories: value multiplied by 100 and displayed with two decimals plus `%`;
- other numeric values: workbook/browser default string conversion;
- streak boundaries: workbook display strings such as `2020 Week 16` and `2021 Week 6`;
- appearance-streak year ranges: workbook display strings such as `2013 - 2019` or `2021 - Current`.

The renderer treats only `undefined` as empty. A null numeric value passed through a rounding helper can become the visible string `NaN`. Blank rows are not filtered and are rendered as empty table rows.

All returned workbook content is inserted through `innerHTML`, including owner names and other text.

## 9. Validated Supabase interfaces and mapping

The existing validated database layer covers most required facts but does not yet expose a browser-safe All-Time website RPC.

| Page domain | Validated source | Mapping |
|---|---|---|
| Season points for/against | `v_owner_season_summary` and/or aggregation of `v_owner_games` | Regular-season owner totals and averages; retain point eligibility and current incomplete-season rows |
| QB/RB/WR/TE/K/DST season points | `v_owner_position_week` | Aggregate by owner, season, true position, and requested phase; K and DST are approved cross-era exceptions, while QB/RB/WR/TE use point-record eligibility |
| Touchdowns | `participant_legacy_metrics` through a validated website query/view | Aggregate historical manually tracked touchdowns; apply confirmed 2019 coverage |
| Close games | `v_owner_games` | Played PPR-eligible games with absolute margin at most 10 |
| Weekly top/bottom scoring | `participant_legacy_metrics.weekly_score_extreme` or a validated derivation | `1` means weekly high and `-1` means weekly low |
| Weeks ranked #1 | `participant_legacy_metrics.end_of_week_rank` | Count eligible tracked weeks where rank is 1 |
| Win/loss streaks | `v_owner_streaks` | Existing chronological result streaks; exclude byes and preserve ties as streak breakers |
| Playoff/consolation appearances and byes | `v_owner_season_summary`, `v_owner_all_time_summary`, and canonical game codes | Aggregate season qualification and bye codes |
| Playoff wins | `v_owner_games` | Winner's bracket uses `PQF`, `PSF`, and `PO1`; all playoff wins additionally use `PO3` and `PO5` |
| Appearance streaks | Consecutive-season derivation over `v_owner_season_summary` | Separate playoff, consolation, championship, and last-place participation islands |
| Opening streaks conditioned on qualification | `v_owner_games` joined to `v_owner_season_summary` | Count chronological opening wins/losses before the first break, then filter on playoff qualification |
| Championship records | `v_owner_season_summary` / `v_owner_all_time_summary` and `PO1` games | Appearances, wins, losses, percentage, and consecutive appearances |
| Last Place records | `v_owner_season_summary` and `CO11` games | Appearance, win/avoidance, loss/last-place finish, percentage, and consecutive appearances |

`fn_owner_games` is validated for parameterized histories and can support backend derivations, but browser JavaScript should not make multiple owner-by-owner function calls.

The relevant analytical views are not directly available to the publishable-key browser role. That security boundary should remain in place. A dedicated `SECURITY DEFINER` website RPC with a controlled `search_path` should read the validated views and grant only narrow execute access to `anon` and `authenticated`.

Before writing SQL, inspect the actual deployed view/function column names. Repository documentation records domains and validation status but not every exact deployed column name.

## 10. Backend gaps requiring explicit implementation

These published calculations are not satisfied by simply returning an existing summary view:

1. Scope-sensitive season position totals for combined, regular-only, and postseason-only output.
2. Historical coverage rules for touchdowns and end-of-week rank.
3. Weekly high/low counts using the manually retained weekly extreme field or a newly validated canonical derivation.
4. Consecutive-season playoff, consolation, championship, and last-place appearance streaks.
5. Current appearance streaks that display `Current`.
6. Opening win/loss streaks conditioned on eventual playoff qualification.
7. Winner's-bracket playoff wins versus all playoff-game wins.
8. Active/current-owner filtering across every applicable category, correcting the legacy workbook ranges where the checkbox currently has no effect.
9. True tied-rank display after the complete eligible population is filtered.
10. Null/empty handling and deterministic ordering after tied metrics.

These rules should be implemented once in the website RPC or in validated supporting analytical objects, not reconstructed in browser JavaScript.

## 11. Recommended website RPC boundary

A maintainable page-specific interface would be:

```text
public.site_all_time_records(
    p_record_category text,
    p_active_only boolean default false,
    p_scope text default 'combined',
    p_limit integer default 10
)
```

The exact name and signature require database approval, but a category-based RPC fits the current page:

- six independent panels need different categories simultaneously;
- changing one panel should request only that panel's new list;
- category values already exist in the HTML;
- active-owner filtering is common across panels;
- phase scope applies only to the appropriate season categories; and
- server-side limits can match the current published row counts without returning all 40 lists on every interaction.

The RPC should reject unsupported category/scope combinations rather than silently substitute another population. When `p_active_only` is true, it must restrict the complete eligible population to the 12 current owners before ranking for every applicable category.

A structured nullable return contract can support the varied tables without parsing display strings:

```text
display_rank
numeric_rank
owner_id
owner_name
metric_value
year
average_per_game
appearances
seasons_played
wins
losses
streak_length
start_year
start_week
end_year
end_week
is_current
```

Only fields relevant to the requested category should be populated. The frontend should choose columns from the category contract and safely render text.

The database must apply all eligibility, current-owner, phase, completion, bye, result, and coverage filters before calculating `RANK()`. Deterministic tie-breakers should affect row ordering but not the published rank. K and DST season-point categories are explicit cross-era exceptions to the normal point-record-eligibility rule because their scoring did not change when the league moved to PPR.

## 12. Migration-relevant defects and inconsistencies

These findings should not be copied blindly into the backend:

1. Initial page load triggers a duplicate Season Totals request.
2. The Season Totals dropdown has two change listeners. The listener in `nonpoint-data.js` calls `updateCheckboxes()`, but that function is scoped inside the `nongame-other.js` DOM-ready callback and is not globally available; changing the season category can therefore produce a `ReferenceError` after the other listener has already run.
3. `nongame-other.js` and `nongame-details.js` duplicate the explanatory-text mapping and dropdown listeners.
4. Active-only checkboxes are no-ops for multiple categories because their active mapping is absent or identical to the default range.
5. The loading spinner uses invalid table child markup and may not display.
6. There is no request error, empty, or race-protection behavior.
7. Workbook text is rendered with `innerHTML`.
8. Null numeric values can display as `NaN`.
9. Blank rows in the 27-row streak ranges are rendered rather than omitted.
10. The HTML contains repeated opening `<tbody>` tags where closing tags were intended.
11. The six category dropdowns lack accessible names.
12. The main navigation marks `Owners` active on the All-Time page while also marking All-Time active in the submenu.
13. `checkbox-css.js` is present but not loaded by the page.
14. Visible/detail wording includes existing typos such as `PAAAA`, `STD +PPR`, and `Last Place Game Lose %`.
15. The inspected K/DEF publication area contains suspicious source years of `2030` in multiple rows even though historical coverage currently ends in 2025.

The 2030 values require source investigation before using the workbook outputs as backend validation expectations.

## 13. Desktop and mobile preservation

Desktop layout uses three two-column flex rows:

- Season Totals beside Owner Totals;
- Playoff beside Consolation; and
- Championship beside Last Place.

At `max-width: 960px`, every row becomes a vertical column and all six panels become full width. The tables in five panels are explicitly widened to 100%; Season Totals is already full width in its container.

The future migration should verify:

- every dropdown and checkbox remains visible and keyboard accessible;
- category-specific column counts do not overflow or collapse;
- five-column percentage and points tables remain readable;
- loading, empty, and error messages fit both layouts;
- long explanatory text wraps without clipping;
- active-only and phase filters remain understandable;
- rank and percentage formatting remain stable; and
- rapid changes in different panels cannot cross-render results.

The data migration should not otherwise require a visual redesign.

## 14. Validation plan for the future backend

Before frontend integration:

- validate every category against the actual runtime workbook ranges;
- validate all-owner and active-owner populations separately;
- validate combined, regular-only, and postseason-only scopes;
- validate PPR eligibility and incomplete 2025 handling;
- validate touchdown and rank coverage start dates;
- validate K/DST across both STD and PPR eras as approved cross-era exceptions;
- investigate and resolve the `2030` source years;
- validate winner's-bracket versus all-playoff game codes;
- validate playoff, consolation, championship, and last-place streak islands;
- validate current streak display;
- validate opening streaks conditioned on playoff qualification;
- validate true tied ranks and deterministic order;
- validate nulls and zero-denominator percentages;
- validate expected row limits for categories whose current ranges exceed 10 rows; and
- verify that browser roles can execute only the narrow website RPC.

Before removing Excel:

- compare every visible panel and filter combination locally;
- verify one request per changed panel and no duplicate initial requests;
- verify loading, empty, error, and stale-response behavior;
- verify desktop and mobile layout;
- test the deployed Netlify page;
- confirm no All-Time statistics request for either workbook copy;
- determine the separate footer migration behavior;
- obtain explicit owner approval; and
- retain root/NextGenStats workbooks while other pages still depend on them.

## 15. Approved backend clarifications

The owner approved these rules:

1. K and DEF season-point records span both the STD and PPR eras. Their scoring did not change when the league moved to PPR, so they are explicit cross-era exceptions to the normal `point_records_eligible = true` rule.
2. `Active Members Only` must work consistently for every applicable category. When selected, the backend must restrict the eligible population to the 12 current owners before calculating rank. Current workbook mappings where the checkbox has no effect are legacy defects and must not be preserved.

No presentation clarification remains open for backend implementation. Exact deployed database column names and the suspicious 2030 workbook years remain inspection and validation tasks.

## 16. Current approved implementation

The Supabase data-source migration is complete. Local and deployed Netlify browser validation reviewed desktop and mobile behavior, every visible category, and every filter. `public.site_all_time_records` is approved as the permanent All-Time Records browser data source.

Validated backend behavior includes:

- QB, RB, WR, TE, K, and DST season records work for combined, regular, and postseason scopes after positional scope filtering was corrected to use `v_owner_position_week.phase`, with `REG` for regular-season rows and `POST` for postseason rows.
- Total Playoff Byes counts only `PB1`; `PB2` remains valid when determining playoff appearance eligibility.
- Total Consolation Byes counts only `CB1`; `CB2` remains valid when determining consolation appearance eligibility.
- Finalized Longest Playoff Appearance Streaks and Longest Consolation Appearance Streaks exclude streaks shorter than two seasons.
- Total TDs, Total Close Games, Total Top Scoring Weeks, Total Lowest Scoring Weeks, and Total Weeks Ranked #1 each return 12 rows.
- Active Members Only filters the eligible population before ranking.
- Published ranks and tied `T` display ranks come from the RPC.

The page remains Supabase-only and has no Excel or SheetJS fallback. Winning and losing streak tables retain the current 10-row contract; a future frontend “View More” enhancement remains planned.

This migration phase intentionally preserved the existing layout and styles. Future design, styling, and visual-consistency work is deferred to a later project phase and must not be described as an unfinished data migration or data-source defect.
