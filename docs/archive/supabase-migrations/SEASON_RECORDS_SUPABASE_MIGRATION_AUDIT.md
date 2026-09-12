# Season Records Supabase Migration Audit

> Status: migration complete, manually validated on deployed Netlify, and owner-approved as permanent. Sections 1-19 retain the historical pre-migration audit, workbook behavior, and implementation specification for reference. The current frontend uses `public.site_season_records` as its sole data source.

## 1. Purpose and scope

This audit documents `nextgenstats/seasonrecords/` before replacing its Excel/SheetJS data path with a dedicated Supabase website interface.

The migration should preserve:

- the historical year selector;
- the two season-summary panels;
- the four record panels;
- year-specific category availability;
- regular, postseason, and combined position-total filters;
- current columns, wording, Player-column contract, rank display, and value formatting;
- desktop and mobile behavior; and
- all historical seasons and owners.

The current selector covers 2012 through 2024. Project documentation says 2025 will be added only after it leaves Current Year through the owner-directed annual rollover.

The owner chose a separate Season Records RPC rather than sharing the Current Year RPC. This keeps the two pages independently changeable as future improvements are approved.

This audit changes documentation only. No Season Records HTML, CSS, JavaScript, workbook, shared runtime file, or database object was changed.

## 2. Files inspected

### Page and shared runtime

- `nextgenstats/seasonrecords/index.html`
- `nextgenstats/seasonrecords/season.css`
- `nextgenstats/seasonrecords/responsive-tables.css`
- `nextgenstats/seasonrecords/season-data.js`
- `nextgenstats/seasonrecords/season-details.js`
- `nextgenstats/seasonrecords/YearRecords.xlsx`
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
- `docs/archive/CURRENT_YEAR_SUPABASE_MIGRATION_AUDIT.md`

## 3. Current page structure

The page has six visible data sections:

1. Final Placing
2. Points For / Points Against
3. Single Game Records
4. Totals by Position
5. Highest Scores by Position
6. Non-Point Records

The year selector defaults to 2024 and lists every season from 2024 down through 2012.

The four category dropdowns are rebuilt whenever the selected year changes. This hides metrics that were not tracked in earlier seasons.

The page loads:

- jQuery 3.6.0, although the inspected scripts do not use it;
- SheetJS from a CDN;
- `season-data.js`;
- `season-details.js`;
- shared `mobile-menu.js`; and
- shared `footer-script.js`.

`responsive-tables.css` exists but is not loaded by the page. The active `season.css` contains its own mobile rules, including stacked panels, horizontal overflow for the lower rows, and sticky first columns for the two wider record tables.

## 4. Current Excel request flow

`season-data.js` requests:

```text
YearRecords.xlsx
```

From the page directory this resolves to:

```text
nextgenstats/seasonrecords/YearRecords.xlsx
```

The workbook contains 13 worksheets named `2024` through `2012`. The 2014–2024 sheets use 12-owner layouts; the 2012 and 2013 sheets use 10-owner layouts.

For every table request, the script:

1. fetches the complete workbook;
2. converts it to an array buffer;
3. parses it with SheetJS;
4. selects the worksheet matching the selected year;
5. reads one configured range;
6. rewrites the table header;
7. renders rows with `innerHTML`; and
8. reapplies category-specific column widths.

Initial load makes six complete workbook fetch-and-parse requests, one per visible section. The shared footer makes a seventh, independent request for root `/fs5main.xlsx` to read `Summary!X27`.

Changing the year makes six new Season Records workbook requests. Changing one category or one position scope makes one new request for that panel. There is no shared workbook promise, cache, request sequencing, abort handling, or stale-response protection.

## 5. Year-dependent category availability

### 2019–2024

All 32 dropdown categories are available:

- 10 Single Game categories;
- 10 Totals by Position categories;
- 7 Highest Scores by Position categories; and
- 5 Non-Point categories.

### 2018

The page exposes 26 dropdown categories:

- 9 Single Game categories; Most TDs is absent.
- 7 Totals by Position categories; TDs, MNF, and TNF are absent.
- all 7 Highest Scores by Position categories;
- 3 Non-Point categories: Top Scoring Weeks, Lowest Scoring Weeks, and Close Games.

### 2012–2017

The page exposes 25 dropdown categories:

- 9 Single Game categories; Most TDs is absent.
- 7 Totals by Position categories; TDs, MNF, and TNF are absent.
- all 7 Highest Scores by Position categories;
- 2 Non-Point categories: Top Scoring Weeks and Lowest Scoring Weeks.

This availability is intentional historical coverage:

- touchdowns, MNF, TNF, coaching calls, and end-of-week rank are exposed from 2019;
- close games are exposed from 2018; and
- weekly highest/lowest scoring markers and the core score/position records are exposed for every season.

The RPC must reject unavailable year/category combinations rather than manufacture zeros or silently substitute another category.

## 6. Season-summary panels

### Final Placing

Visible columns:

```text
Rank | Owner | Team Name | Record
```

The table publishes final season placement, the historical owner name, that season’s team name, and a combined record string such as `11 - 5`.

The owner population is season-specific. Historical owners must not be replaced by the 12 current owners.

### Points For / Points Against

Visible columns:

```text
Rank | Owner | Points For | Avg PPG | Points Against | Avg PPA
```

The list is ranked by Points For. Workbook staging identifies these as regular-season points and averages. The number of regular-season games varies by season, so averages must use the actual eligible played-game count rather than a hard-coded divisor.

Point values and averages display to two decimals.

## 7. Record category and output contracts

### Single Game Records

| UI value | Visible label | Columns | Rows | Availability |
|---|---|---|---:|---|
| `high-score` | Highest Score | Rank, Score, Owner, Week | 10 | 2012–2024 |
| `low-score` | Lowest Score | Rank, Score, Owner, Week | 10 | 2012–2024 |
| `high-margin` | Biggest Blowout | Rank, Margin, Owner, Week, Detail | 10 | 2012–2024 |
| `low-margin` | Closest Win | Rank, Margin, Owner, Week, Detail | 10 | 2012–2024 |
| `least-win` | Least Winning | Rank, Score, Owner, Week, Detail | 10 | 2012–2024 |
| `most-lose` | Most Losing | Rank, Score, Owner, Week, Detail | 10 | 2012–2024 |
| `high-comb` | Highest Scoring Game | Rank, Combined, Week, Detail | 10 | 2012–2024 |
| `low-comb` | Lowest Scoring Game | Rank, Combined, Week, Detail | 10 | 2012–2024 |
| `high-bench` | Highest Bench | Rank, Bench, Owner, Week | 10 | 2012–2024 |
| `high-tds` | Most TDs | Rank, Owner, TDs, Week | 12 | 2019–2024 |

The detail text currently comes from workbook-composed strings such as `Winner over Loser (score - score)`. Supabase should return structured owners, scores, opponent, result, and margin fields so browser JavaScript does not parse display text.

The page is season-specific. It must preserve the scoring system applicable to the requested year instead of filtering historical STD seasons out through a cross-season point-record eligibility rule.

### Totals by Position

| UI value | Columns | Scopes | Availability |
|---|---|---|---|
| `total-qb` | Rank, Total QB, Owner | combined, regular, postseason | 2012–2024 |
| `total-rb` | Rank, Total RB, Owner | combined, regular, postseason | 2012–2024 |
| `total-wr` | Rank, Total WR, Owner | combined, regular, postseason | 2012–2024 |
| `total-te` | Rank, Total TE, Owner | combined, regular, postseason | 2012–2024 |
| `total-k` | Rank, Total K, Owner | combined, regular, postseason | 2012–2024 |
| `total-def` | Rank, Total DEF, Owner | combined, regular, postseason | 2012–2024 |
| `bench` | Rank, Total Bench, Owner | combined, regular, postseason | 2012–2024 |
| `tds` | Rank, Owner, Total TDs | combined, regular, postseason | 2019–2024 |
| `mnf` | Rank, Total MNF, Owner | combined only | 2019–2024 |
| `tnf` | Rank, Total TNF, Owner | combined only | 2019–2024 |

The scope controls are mutually exclusive and default to Reg + Post.

The workbook maps all MNF and TNF scope states to the same combined range, and the visible explanatory text says they are not separated by regular and postseason. Consistent with the approved Current Year rule, the Season Records backend should accept combined scope only for MNF and TNF. The later frontend should not imply that unsupported scope filtering is occurring.

Postseason totals include both playoff and consolation postseason participation.

Row count follows that season’s membership: 12 rows for 2014–2024 and 10 rows for 2012–2013.

### Highest Scores by Position

| UI value | Visible columns | Rows | Availability |
|---|---|---:|---|
| `high-all` | Rank, Score, Owner, Week, Player | 10 | 2012–2024 |
| `high-qb` | Rank, Score, Owner, Week, Player | 10 | 2012–2024 |
| `high-rb` | Rank, Score, Owner, Week, Player | 10 | 2012–2024 |
| `high-wr` | Rank, Score, Owner, Week, Player | 10 | 2012–2024 |
| `high-te` | Rank, Score, Owner, Week, Player | 10 | 2012–2024 |
| `high-k` | Rank, Score, Owner, Week, Player | 10 | 2012–2024 |
| `high-def` | Rank, Score, Owner, Week, Player | 10 | 2012–2024 |

Unlike Current Year, the historical workbook contains player names and the live renderer publishes the fifth Player column. For example, the 2024 all-position list identifies Ja’Marr Chase, Josh Allen, Jauan Jennings, Saquon Barkley, and other individual players.

Before implementation, incomplete player identity across parts of the imported history raised a concern about whether the database could return historical names for every 2012–2024 top-ten row. This was a historical pre-implementation concern, not a requirement for correct score ranking.

The implemented contract resolved the concern by keeping `player_name` nullable in `public.site_season_records`, preserving the Player column, and rendering missing names as an em dash. Optional future player enrichment is separate from the completed migration.

### Non-Point Records

| UI value | Visible columns | Availability |
|---|---|---|
| `1rank` | Rank, Owner, # of Weeks | 2019–2024 |
| `top-team` | Rank, Owner, # of Weeks | 2012–2024 |
| `bottom-team` | Rank, Owner, # of Weeks | 2012–2024 |
| `close-games` | Rank, Owner, # of Games | 2018–2024 |
| `coaching-calls` | Rank, Owner, # of Games | 2019–2024 |

Row count follows season membership: 12 for 2014–2024 and 10 for 2012–2013.

Coaching Calls are stored as commissioner-assigned legacy metrics. They should not be re-derived in browser JavaScript.

## 8. Exact workbook ranges

Every range is read from the worksheet named for the selected year.

### Summary and single-game ranges

| Output | 2014–2024 | 2012–2013 |
|---|---|---|
| Final Placing | `E4:H15` | `E4:H13` |
| Points For / Against | `J4:O15` | `J4:O13` |
| Highest Score | `A87:D96` | same |
| Lowest Score | `F87:I96` | same |
| Biggest Blowout | `K87:O96` | same |
| Closest Win | `R87:V96` | same |
| Least Winning | `Y87:AC96` | same |
| Most Losing | `A99:E108` | same |
| Highest Scoring Game | `I99:L108` | same |
| Lowest Scoring Game | `N99:Q108` | same |
| Highest Bench | `S99:V108` | same |
| Most TDs | `I61:L72` | unavailable |

Most TDs uses `I61:L72` only for 2019–2024.

### Position-total ranges

| Category | Combined | Regular | Postseason |
|---|---|---|---|
| QB | `A19:C{end}` | `E19:G{end}` | `I19:K{end}` |
| RB | `M19:O{end}` | `Q19:S{end}` | `U19:W{end}` |
| WR | `Y19:AA{end}` | `AC19:AE{end}` | `AG19:AI{end}` |
| TE | `A33:C{end2}` | `E33:G{end2}` | `I33:K{end2}` |
| K | `M33:O{end2}` | `Q33:S{end2}` | `U33:W{end2}` |
| DEF | `Y33:AA{end2}` | `AC33:AE{end2}` | `AG33:AI{end2}` |
| Bench | `A47:C{end3}` | `A61:C{end4}` | `E61:G{end4}` |
| TDs | `Q47:S58` | `Q61:S72` | `U61:W72` |
| MNF | `E47:G58` | same combined range | same combined range |
| TNF | `I47:K58` | same combined range | same combined range |

For 2014–2024:

```text
end = 30
end2 = 44
end3 = 58
end4 = 72
```

For 2012–2013:

```text
end = 28
end2 = 42
end3 = 56
end4 = 70
```

TD, MNF, and TNF ranges exist in older workbook sheets but are intentionally not exposed before 2019.

### Highest-position ranges

| Category | Range |
|---|---|
| All positions | `A75:E84` |
| QB | `F75:J84` |
| RB | `K75:O84` |
| WR | `P75:T84` |
| TE | `U75:Y84` |
| K | `Z75:AD84` |
| DEF | `AE75:AI84` |

### Non-point ranges

| Category | 2014–2024 | 2012–2013 |
|---|---|---|
| Weeks Ranked #1 | `M47:O58` | `M47:O56` |
| Top Scoring Weeks | `U47:W58` | `U47:W56` |
| Bottom Scoring Weeks | `Y47:AA58` | `Y47:AA56` |
| Close Games | `AC47:AE58` | `AC47:AE56` |
| Coaching Calls | `AG47:AI58` | `AG47:AI56` |

The year-availability rules, not mere presence of worksheet cells, determine whether a non-point category is valid.

## 9. Workbook staging and statistical behavior

Each year sheet stages one owner-week row with:

- owner and week;
- QB, RB, WR, TE, K, and DEF scores;
- MNF and TNF points;
- touchdowns;
- coaching call;
- bench points;
- owner and opponent scores;
- outcome, signed margin, and combined score;
- opponent;
- year;
- phase and game code;
- most-losing and least-winning values; and
- a composed matchup-detail string.

Season-level staging includes:

- points for and against;
- per-game averages;
- regular wins and losses;
- postseason qualification and results;
- regular and final finish;
- historical team name;
- total record;
- end-of-week #1 count;
- weekly scoring extremes;
- close-game count;
- touchdowns; and
- position, bench, MNF, TNF, and coaching-call totals.

Regular position totals use workbook phase `REG`. Postseason totals combine the workbook’s playoff and consolation postseason classes. The deployed database uses normalized phase values documented as `REG` and `POST` in `v_owner_position_week`; SQL must use the actual deployed contract.

## 10. Observed workbook quality

The workbook’s published ranges generally contain complete historical results and real player names. The sampled 2024, 2023, 2019, and 2018 published areas contained no cached formula errors.

One cached `#DIV/0!` exists in 2012 postseason-average staging for an owner with no postseason points. It is outside the browser’s published ranges but demonstrates why the RPC must return null for an undefined average instead of propagating an error or converting it to zero.

Workbook output should be treated as a comparison source, not copied as SQL logic. Inspection also found legacy formula oddities such as duplicate owner rows or ordering artifacts in some ranked blocks. The RPC must rank the complete filtered population with correct tie semantics and deterministic ordering.

## 11. Current runtime and markup defects

The following issues are directly relevant to a reliable migration:

1. Returned workbook text is interpolated into `innerHTML`; Supabase text should use `textContent` or safe DOM construction.
2. `roundIfNecessary()` formats fractional values to two decimals but can render a database null as literal `null`.
3. Loading `<div>` elements are inserted directly inside `<table>` elements, which is invalid table markup.
4. There is no response-status check, user-facing error state, or empty state.
5. There is no request sequencing, so a slower old year/category request can overwrite a newer selection.
6. Several tables contain a second opening `<tbody>` tag instead of a closing tag.
7. The year selector and all four category selectors lack accessible labels.
8. `responsive-tables.css` is unused because the HTML does not load it.

Only migration-relevant fixes should be included with the frontend data-source change. Page redesign and broader styling cleanup remain separate.

## 12. Validated database-source mapping

| Page domain | Validated source | Recommended use |
|---|---|---|
| Final season placement and record | `v_owner_season_summary` plus canonical season membership/team-name source | Final finish, historical owner, team name, and record |
| Regular-season PF/PA | `v_owner_season_summary` or validated aggregation of `v_owner_games` | Points for, points against, actual eligible-game count, and averages |
| Owner-perspective single games | `v_owner_games` | Score, result, signed margin, opponent, bench, phase, game code, year, and week |
| One row per logical game | `v_game_records` | Combined-score records without double-counting participants |
| Position totals | `v_owner_position_week` | Aggregated owner-week QB/RB/WR/TE/K/DST totals |
| Historical individual starting-slot highs | `legacy_slot_scores` | Independent eligible starter performances; RB1, RB2, and eligible RB/WR FLEX rows remain separate and bench is excluded |
| Player identity and player-level analysis | `player_week_performances`, where populated | Player name and true player-level performance data; the website contract permits nullable `player_name` |
| Tracked manual metrics | `participant_legacy_metrics` through the RPC | Touchdowns, MNF, TNF, coaching calls, end-of-week rank, weekly score extreme, and bench metrics when needed |

Browser roles should not query analytical views or legacy tables directly. Follow the established narrow `SECURITY DEFINER` RPC pattern with controlled `search_path`, execute access for `anon` and `authenticated`, and root `supabase-config.js` using only the browser-safe publishable key.

## 13. Required backend behavior

### Explicit year

Every request must pass `p_year`. Valid initial website years are 2012–2024. The frontend must not add 2025 until the owner directs the annual rollover.

### Season population

- Use canonical membership for `p_year`.
- Preserve historical owners and the correct 10- or 12-team season size.
- Do not apply current-owner-only filtering.
- Return zero-valued season members where the published category is a complete season-member ranking and zero is meaningful.

### Ranking and ties

- Apply all year, phase, game-state, metric-availability, and eligibility filters before ranking.
- Use PostgreSQL `RANK()`.
- Equal metric values share a rank and later ranks retain gaps.
- Prefix tied published ranks with `T`.
- Use deterministic secondary ordering without changing metric rank.
- Apply the row limit only after ranking.

### Scope

- `combined` includes regular and postseason.
- `regular` includes regular season only.
- `postseason` includes both playoff and consolation postseason.
- MNF and TNF accept combined only.
- Summary, Single Game, Highest Position, and Non-Point categories use their fixed page-defined scope and should reject unsupported scope values.

### Scoring era

This is a year-selected historical page. Score and position categories should use the scoring rules and imported values for the requested season, including STD-era seasons. Cross-season `point_records_eligible` filtering must not remove valid 2012–2017 results from their own season pages.

### Nulls and averages

- Do not convert unavailable historical metrics into zeros.
- Return null when an average has no valid denominator.
- Calculate PF/PA averages from the actual eligible regular-season played-game count.

### Position identity

- Use canonical `DST` internally while preserving visible `DEF` wording.
- Preserve the Player column.
- Do not infer a player name from an owner, position total, or display string.

## 14. Recommended independent RPC

The approved separate page boundary is:

```text
public.site_season_records(
    p_year integer,
    p_record_category text,
    p_scope text default 'combined',
    p_limit integer default null
)
```

Recommended additional categories for the two summary panels:

```text
final-placing
points-for-against
```

The remaining category values should preserve the current Season Records UI values:

```text
high-score
low-score
high-margin
low-margin
least-win
most-lose
high-comb
low-comb
high-bench
high-tds

total-qb
total-rb
total-wr
total-te
total-k
total-def
bench
tds
mnf
tnf

high-all
high-qb
high-rb
high-wr
high-te
high-k
high-def

1rank
top-team
bottom-team
close-games
coaching-calls
```

The function should reject unsupported years, categories, scopes, and year/category combinations with a diagnosable error. It should enforce category-valid maximum row counts rather than accepting an unlimited browser value.

## 15. Recommended structured response

A nullable common row contract can support every panel:

```text
display_rank text
numeric_rank integer
metric_value numeric
owner_name text
team_name text
record_display text
points_for numeric
points_against numeric
average_points_for numeric
average_points_against numeric
eligible_game_count integer
opponent_name text
owner_score numeric
opponent_score numeric
first_owner_name text
first_score numeric
second_owner_name text
second_score numeric
week_number integer
year integer
game_code text
canonical_broad_class text
position_code text
player_name text
```

The RPC may return a category-specific JSON `details` object instead of many nullable top-level columns, but structured values must remain directly accessible. Browser code should not parse `record_display`, matchup-detail strings, owner strings, or score strings to recover underlying values.

## 16. Backend validation checklist

Before frontend work, validate:

- every year from 2012 through 2024;
- 10 season members in 2012–2013 and 12 in 2014–2024;
- Final Placing order, historical owner, team name, and record;
- regular-season PF/PA totals and averages with year-correct divisors;
- all 32 possible category values;
- year-specific category availability;
- combined, regular, and postseason position scopes;
- rejection of regular/postseason for MNF and TNF;
- STD-era records remain available for 2012–2017;
- Most TDs and total TDs begin in 2019;
- MNF and TNF totals begin in 2019;
- Weeks Ranked #1 and Coaching Calls begin in 2019;
- Close Games begins in 2018;
- Top/Bottom Scoring Weeks remain available for all years;
- true-position scoring and DST normalization;
- nullable `player_name` does not affect highest-position score ranking, returned row order, or migration completeness;
- one-row-per-logical-game combined records;
- byes and incomplete games excluded where applicable;
- winner-only and loser-only categories;
- postseason includes playoff and consolation games;
- category-valid row limits;
- tied display ranks and deterministic order;
- null and zero-denominator handling;
- no direct analytical-view grants to browser roles; and
- no service-role key requirement.

## 17. Frontend migration checklist

Before approving Excel removal:

- load the existing shared Supabase client from the correct two-level relative path;
- preserve the 2012–2024 year selector;
- make exactly six initial statistics requests, one per visible panel;
- make six replacement requests after a year change;
- make one request only for the panel whose category or scope changes;
- protect each panel from stale responses;
- rebuild year-specific category lists without duplicate handlers;
- prevent MNF/TNF from implying unsupported scopes;
- preserve all table columns, including Player;
- preserve two-decimal fantasy-point and average formatting;
- preserve integer count formatting;
- preserve returned tied ranks;
- render nulls as the approved empty marker, never zero or literal `null`;
- safely render owner, team, opponent, and player names;
- add loading, empty, and error states;
- add accessible labels to all selects;
- preserve desktop and mobile table usability;
- confirm no Season Records request for `YearRecords.xlsx`;
- remove the page’s SheetJS dependency only after comparison approval; and
- repeat every year/category/scope comparison on Netlify before permanent approval.

The shared footer remains a separate Excel consumer unless separately migrated. Removing Season Records statistics from Excel does not authorize deleting root or remaining workbook files used by other pages.

## 18. Approved decisions and deferred work

The owner confirmed:

1. Season Records will use a separate RPC from Current Year so future changes can be made independently.
2. The historical selector remains 2012–2024 until the owner explicitly directs addition of 2025.
3. The existing historical page and records must remain intact during migration.

Consistent with the approved Current Year contract:

- MNF and TNF are combined-only metrics.
- The Player column remains part of the Season Records output; `player_name` may be null and future enrichment is optional.

Design, styling, additions, and visual-consistency improvements remain a later phase. Deferred visual work must not be described as an incomplete data-source migration.

## 19. Superseded pre-implementation player-name concern

Before implementation, historical player-name coverage for every top-ten position performance from 2012 through 2024 was identified as a possible backend dependency.

That concern is superseded. `public.site_season_records` keeps `player_name` nullable, the frontend preserves the Player column, and missing names render as an em dash. Individual starting-slot scores from `legacy_slot_scores` rank correctly without requiring populated player identity.

Nullable player names do not affect score ranking, row order, Netlify validation, owner approval, or migration completeness. Populating historical player identity later is an optional enrichment project and does not require changes to the completed data-source migration contract.

## 20. Final implemented frontend state

The historical Sections 1-19 remain above as the pre-migration audit and implementation record. The implemented page now:

- calls only `public.site_season_records(integer, text, text, integer)` through root `supabase-config.js`;
- preserves the 2012-2024 selector, all six panels, existing category wording, year-dependent availability, and existing layout;
- makes six independent initial and year-change calls, one affected-panel call after a category change, and one Totals call after a valid scope change;
- protects each panel with an independent request token and renders valid loading, empty, and error table rows;
- supports combined, regular, and postseason position totals while forcing MNF and TNF to combined;
- renders Highest Scores by Position as independent eligible starting-slot results from `legacy_slot_scores` without frontend aggregation or deduplication;
- preserves the Player column and displays an em dash when `player_name` is null;
- safely renders returned text, preserves returned tied ranks, formats fantasy points to two decimals, and formats counts as integers; and
- has no `YearRecords.xlsx`, SheetJS, jQuery, workbook fallback, workbook range map, or shared Excel-footer dependency.

The owner manually validated the deployed Netlify page and confirmed that every panel populates and the visible data appears accurate. `public.site_season_records` is approved as the permanent Supabase-only browser source. Player names remain intentionally nullable until historical player identity is populated in the database.

Future player-data enrichment, design, styling, and visual-consistency improvements are separate enhancements, not incomplete data-source work.
