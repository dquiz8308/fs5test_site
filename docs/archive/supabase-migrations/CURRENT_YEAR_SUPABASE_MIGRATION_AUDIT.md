# Current Year Supabase Migration Audit

> Status: migration complete and owner-approved. The backend and Supabase-only frontend were manually validated on the deployed Netlify site, and `public.site_current_year_records` is the permanent Current Year browser data source. Sections 1–19 retain the historical pre-implementation audit and approved planning record for reference.

## 1. Purpose and scope

This audit documents `nextgenstats/currentyear/` before replacing its Excel/SheetJS data path with a dedicated Supabase website interface.

The migration should preserve:

- the four visible record panels;
- all 32 visible category choices;
- the existing scope concepts and published wording;
- current table columns and value formatting;
- desktop and mobile behavior; and
- the current four-column Highest Scores by Position output.

The migration should not reproduce broken workbook formulas, cached `#N/A` output, redundant workbook requests, or hidden sections that are intentionally no longer part of the page.

This audit changes documentation only. No Current Year HTML, CSS, JavaScript, workbook, shared runtime file, or database object was changed.

## 2. Files inspected

### Page and shared runtime

- `nextgenstats/currentyear/index.html`
- `nextgenstats/currentyear/currentyear-styles.css`
- `nextgenstats/currentyear/currentyear-data.js`
- `nextgenstats/currentyear/season-data.js`
- `nextgenstats/currentyear/responsive-tables.css`
- `nextgenstats/seasonrecords/season-details.js`
- `nextgenstats/fs5main.xlsx`
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
- `docs/archive/ALL_TIME_SUPABASE_MIGRATION_AUDIT.md`

## 3. Current page structure

The page is the active-season records page. The workbook selector cell is currently `YearRecords!B2 = 2025`.

The HTML still contains the stale literal heading `2023 Season Records`, while the current artwork and data represent 2025. The heading is not a data-source contract and should be corrected only as an approved migration-relevant text fix or later content update.

Four record panels are visible:

1. Single Game Records
2. Totals by Position
3. Highest Scores by Position
4. Non-Point Records

A fifth row containing Final Placing and Points For / Points Against is wrapped in `style="display:none"`. The owner confirmed that these panels are intentionally hidden, should be documented as dormant, should not be included in the website RPC, and will be removed during final cleanup.

The page loads:

- jQuery 3.6.0, although the inspected Current Year scripts do not use it;
- SheetJS from a CDN;
- `currentyear-data.js`;
- shared `nextgenstats/seasonrecords/season-details.js`;
- `mobile-menu.js`; and
- shared `footer-script.js`.

`responsive-tables.css` and `season-data.js` exist in the Current Year directory but are not loaded by `index.html`. The unused `season-data.js` expects a page-local `YearRecords.xlsx` that does not exist. Neither file is part of the active data flow.

## 4. Current Excel data flow

The active page script requests:

```text
../fs5main.xlsx
```

From `nextgenstats/currentyear/`, this resolves to:

```text
nextgenstats/fs5main.xlsx
```

For every request, `currentyear-data.js`:

1. fetches the complete workbook;
2. converts it to an array buffer;
3. parses it with SheetJS;
4. selects the `YearRecords` worksheet;
5. reads one configured cell range;
6. rewrites the table header; and
7. renders the range rows with `innerHTML`.

Initial page load calls the same fetch-and-parse path once for each of:

- dormant Final Placing;
- dormant Points For / Points Against;
- Single Game Records;
- Totals by Position;
- Highest Scores by Position; and
- Non-Point Records.

The shared footer independently requests root `/fs5main.xlsx` to read `Summary!X27`. The page therefore performs six full statistics-workbook reads plus a separate footer workbook read on initial load. The two intentionally hidden tables still trigger requests.

Each visible dropdown or scope change refetches and reparses the complete workbook for that panel. There is no shared workbook promise, cache, request sequencing, abort handling, or stale-response protection.

## 5. Current controls and interaction behavior

### Single Game Records

The category dropdown contains 10 choices and has no scope filter. A category change triggers a complete workbook request and rerender.

### Totals by Position

The category dropdown contains 10 choices. Three checkboxes implement a mutually exclusive scope:

```text
Reg + Post
Reg Only
Post Only
```

`Reg + Post` is selected initially. The event code ensures that one checkbox remains selected.

QB, RB, WR, TE, K, DEF, Bench Points, and Touchdowns have distinct workbook ranges for the three scopes. Monday Night Football and Thursday Night Football map all three checkbox states to the same combined range. Their published detail text also says those metrics are not separated by regular and postseason.

The owner confirmed that the Supabase backend should support combined scope only for MNF and TNF. A later frontend migration should prevent the scope controls from implying unsupported filtering for those two categories.

### Highest Scores by Position

The category dropdown contains seven choices and has no scope control. Despite the panel title saying “Highest Players” and stale static HTML mentioning a Player column, the active JavaScript replaces the header and renders only:

```text
Rank | Score | Owner | Week
```

Player names are not maintained reliably in the current-year workbook. The owner approved preserving this four-column output for the migration. Player identity is deferred until a later additions/design phase and should not block the data-source migration.

### Non-Point Records

The category dropdown contains five choices and has no scope control.

### Accessibility

The checkbox text is associated with its inputs through wrapping labels. The four visible category dropdowns do not have associated labels or `aria-label` attributes. Accessible select labels are a migration-relevant defect because the controls must remain usable by assistive technology.

## 6. Visible categories and output contracts

### Single Game Records

| UI value | Visible label | Columns | Rows | Metric |
|---|---|---|---:|---|
| `high-score` | Highest Score | Rank, Score, Owner, Week | 10 | Owner score, descending |
| `low-score` | Lowest Score | Rank, Score, Owner, Week | 10 | Owner score, ascending |
| `high-margin` | Biggest Blowout | Rank, Margin, Winner, Week, Detail | 10 | Winning margin, descending |
| `low-margin` | Closest Game | Rank, Margin, Winner, Week, Detail | 10 | Winning margin, ascending |
| `least-win` | Least Winning | Rank, Score, Winner, Week, Detail | 10 | Winner score, ascending |
| `most-lose` | Most Losing | Rank, Score, Loser, Week, Detail | 10 | Loser score, descending |
| `high-comb` | Highest Scoring Game | Rank, Score, Owners, Week | 10 | Combined score, descending |
| `low-comb` | Lowest Scoring Game | Rank, Score, Owners, Week | 10 | Combined score, ascending |
| `high-bench` | Highest Bench | Rank, Score, Owner, Week | 10 | Bench points, descending |
| `high-tds` | Most Touchdowns | Rank, Touchdowns, Owner, Week | 12 | Touchdowns, descending |

The current detail column is a workbook-composed display value for winner/loser categories. Supabase should return structured owner, opponent, owner score, opponent score, and margin fields so browser JavaScript does not parse a display string.

### Totals by Position

| UI value | Visible label | Columns | Supported scopes | Rows |
|---|---|---|---|---:|
| `total-qb` | Total QB Points | Rank, Total QB Points, Owner | combined, regular, postseason | 12 |
| `total-rb` | Total RB Points | Rank, Total RB Points, Owner | combined, regular, postseason | 12 |
| `total-wr` | Total WR Points | Rank, Total WR Points, Owner | combined, regular, postseason | 12 |
| `total-te` | Total TE Points | Rank, Total TE Points, Owner | combined, regular, postseason | 12 |
| `total-k` | Total K Points | Rank, Total K Points, Owner | combined, regular, postseason | 12 |
| `total-def` | Total DEF Points | Rank, Total DEF Points, Owner | combined, regular, postseason | 12 |
| `total-bench` | Total Bench Points | Rank, Total Bench Points, Owner | combined, regular, postseason | 12 |
| `total-tds` | Total Touchdowns | Rank, Owner, Total TDs | combined, regular, postseason | 12 |
| `total-mnf` | Total Monday Night Points | Rank, Total MNF Points, Owner | combined only | 12 |
| `total-tnf` | Total Thursday Night Points | Rank, Total TNF Points, Owner | combined only | 12 |

The touchdown table uses the same underlying `[rank, owner, value]` order as its visible header. Other position-total tables use `[rank, value, owner]`.

“Postseason” in the workbook aggregation includes both winner’s-bracket and consolation postseason rows. The Supabase contract should preserve this broad phase behavior unless separately changed.

### Highest Scores by Position

| UI value | Visible label | Columns | Rows | Metric |
|---|---|---|---:|---|
| `all-high` | Highest Player Score | Rank, Score, Owner, Week | 10 | Highest true-position weekly score across all positions |
| `qb-high` | Highest QB Score | Rank, Score, Owner, Week | 10 | QB weekly score |
| `rb-high` | Highest RB Score | Rank, Score, Owner, Week | 10 | RB weekly score |
| `wr-high` | Highest WR Score | Rank, Score, Owner, Week | 10 | WR weekly score |
| `te-high` | Highest TE Score | Rank, Score, Owner, Week | 10 | TE weekly score |
| `k-high` | Highest K Score | Rank, Score, Owner, Week | 10 | K weekly score |
| `def-high` | Highest DEF Score | Rank, Score, Owner, Week | 10 | DST weekly score |

The current output identifies the fantasy owner and week, not the NFL player. Supabase should initially return the same visible contract. A nullable future player field may be added later without making player population a prerequisite for this migration.

### Non-Point Records

| UI value | Visible label | Columns | Rows | Metric |
|---|---|---|---:|---|
| `rank1` | Most Weeks Ranked #1 | Rank, Owner, # Weeks | 12 | Count of tracked weeks ending at rank 1 |
| `top-team` | Most Top Scoring Weeks | Rank, Owner, # Weeks | 12 | Count of weekly highest-score markers |
| `bottom-team` | Most Bottom Scoring Weeks | Rank, Owner, # Weeks | 12 | Count of weekly lowest-score markers |
| `close-games` | Most Close Games | Rank, Owner, # Games | 12 | Count of close-game participation |
| `coaching-call` | Most Coaching Calls | Rank, Owner, # Calls | 12 | Sum of commissioner-assigned coaching-call markers |

## 7. Exact workbook ranges

All active mappings read `YearRecords` from `nextgenstats/fs5main.xlsx`.

### Dormant ranges

| Table | Range |
|---|---|
| Final Placing | `E4:H15` |
| Points For / Points Against | `J4:O15` |

These are historical reference only and are excluded from the recommended RPC.

### Single Game Records ranges

| Category | Range |
|---|---|
| Highest Score | `A87:D96` |
| Lowest Score | `F87:I96` |
| Biggest Blowout | `K87:O96` |
| Closest Game | `R87:V96` |
| Least Winning | `Y87:AC96` |
| Most Losing | `A99:E108` |
| Highest Scoring Game | `I99:L108` |
| Lowest Scoring Game | `N99:Q108` |
| Highest Bench | `S99:V108` |
| Most Touchdowns | `I61:L72` |

### Totals by Position ranges

| Category | Combined | Regular | Postseason |
|---|---|---|---|
| QB | `A19:C30` | `E19:G30` | `I19:K30` |
| RB | `M19:O30` | `Q19:S30` | `U19:W30` |
| WR | `Y19:AA30` | `AC19:AE30` | `AG19:AI30` |
| TE | `A33:C44` | `E33:G44` | `I33:K44` |
| K | `M33:O44` | `Q33:S44` | `U33:W44` |
| DEF | `Y33:AA44` | `AC33:AE44` | `AG33:AI44` |
| Bench | `A47:C58` | `A61:C72` | `E61:G72` |
| Touchdowns | `Q47:S58` | `Q61:S72` | `U61:W72` |
| MNF | `E47:G58` | same combined range | same combined range |
| TNF | `I47:K58` | same combined range | same combined range |

### Highest Scores by Position ranges

| Category | Range |
|---|---|
| All positions | `A75:D84` |
| QB | `F75:I84` |
| RB | `K75:N84` |
| WR | `P75:S84` |
| TE | `U75:X84` |
| K | `Z75:AC84` |
| DEF | `AE75:AH84` |

### Non-Point Records ranges

| Category | Range |
|---|---|
| Weeks Ranked #1 | `M47:O58` |
| Top Scoring Weeks | `U47:W58` |
| Bottom Scoring Weeks | `Y47:AA58` |
| Close Games | `AC47:AE58` |
| Coaching Calls | `AG47:AI58` |

## 8. Workbook formula and staging behavior

`YearRecords!B2` selects the published year. The current value is 2025.

The worksheet stages one owner-week row with fields that include:

- owner and week;
- QB, RB, WR, TE, K, and DEF slot scores;
- MNF and TNF points;
- touchdowns;
- coaching call;
- bench points;
- opponent score and owner score;
- outcome and signed margin;
- combined game score;
- opponent;
- year;
- broad phase and game code; and
- derived most-losing, least-winning, and display-detail fields.

The workbook’s regular position totals filter rows whose phase is `REG`. Its postseason totals include phase values `POST` and `POSTC`. The deployed database documentation records `v_owner_position_week.phase` as the validated positional source; exact deployed values must be inspected during SQL implementation rather than inferred solely from the workbook.

## 9. Observed workbook defects and unreliable outputs

The current Excel-to-site output is not a trustworthy acceptance oracle for every category. Inspection found cached `#N/A` values in multiple published ranges, including:

- dormant Final Placing;
- many combined position totals;
- MNF and TNF totals;
- the Highest Scores by Position ranges;
- most Single Game Records ranges; and
- Coaching Calls.

Other ranges in the same workbook contain plausible 2025 values, including regular/postseason position totals and several non-point summaries. This mixed state indicates broken or unrecalculated workbook formulas rather than an intended blank-page contract.

Supabase implementation should therefore validate each category against the documented statistical meaning and source rows. It must not encode `#N/A`, empty cached results, or a broken combined formula as expected behavior.

## 10. Current rendering and runtime defects

The following defects are relevant to migration reliability:

1. The script uses returned text directly in `innerHTML`; Supabase text should instead be assigned through `textContent` or equivalent safe DOM construction.
2. `roundIfNecessary()` formats fractional numbers to two decimals but can render a database `null` as the literal text `null`. The new renderer must preserve null as blank or the page’s approved empty marker, never zero.
3. Loading markup is inserted as a `<div>` directly inside a `<table>`, which is invalid table structure and may be moved by the browser.
4. There is no user-facing empty or error state.
5. There is no stale-request protection for rapid filter changes.
6. Multiple `<tbody>` elements use a second opening tag where a closing tag is required.
7. The category dropdowns lack accessible names.
8. The navigation marks Owners as active rather than Current Year.
9. The literal `2023 Season Records` heading is stale.

Only defects required for a reliable and accessible Supabase migration should be corrected during implementation. Broader layout and styling work remains separate.

## 11. Validated database sources

The database documentation identifies these as the strongest existing analytical sources:

| Page domain | Validated source | Recommended use |
|---|---|---|
| Owner-perspective games | `v_owner_games` | Single-game score, signed result/margin, opponent, bench points, phase, game code, year, and week |
| One row per logical game | `v_game_records` | Combined-score records without double-counting both participants |
| Aggregated owner-week position scoring | `v_owner_position_week` | Aggregated QB/RB/WR/TE/K/DST owner-week values used for position totals |
| Historical individual starting-slot scoring | `legacy_slot_scores` | Individual eligible starter rows used for historical high scores; RB1, RB2, and eligible RB/WR FLEX rank independently, and bench rows are excluded |
| Player-level identity and performances | `player_week_performances` | True player-name and player-performance analysis only where player-level rows are populated |
| Legacy participant metrics | `participant_legacy_metrics` through the website RPC | Touchdowns, MNF, TNF, coaching calls, end-of-week rank, weekly score extreme, and bench values when no validated view exposes the field |
| Owner-season summaries | `v_owner_season_summary` | Possible validation support for current-season aggregates |

The browser should not query these analytical relations directly. The established security pattern is a narrow page-specific `SECURITY DEFINER` RPC with a controlled `search_path`, execute access for `anon` and `authenticated`, and no service-role credential in browser code.

The SQL implementation must inspect the actual deployed column names and values before creating the function.

## 12. Required backend rules

### Explicit year

The owner confirmed that the RPC must require an explicit year. The frontend will continue sending 2025 until the owner separately approves rollover to 2026. The RPC must not silently substitute the latest database season.

### Eligibility

- Include only played, complete, eligible records for the requested year.
- Exclude byes from game-record categories.
- Rank the complete eligible population before applying the requested row limit.
- Use PostgreSQL `RANK()` semantics so tied values share their published ordinal.
- Return a display rank prefixed with `T` when the published rank is tied.
- Apply deterministic secondary ordering without changing tied rank.
- Do not convert null values to zero.

### Scope

- `combined` includes regular and postseason records.
- `regular` includes regular-season records only.
- `postseason` includes both playoff and consolation postseason records.
- MNF and TNF accept `combined` only.
- Categories without a scope control should accept only their defined fixed scope rather than silently ignoring an invalid scope.

### Current owner population

Totals by Position and Non-Point Records publish a 12-owner current-season ranking. The backend should derive the season’s eligible owner population from canonical season membership, not from a hard-coded JavaScript owner list.

### Position naming

The visible page uses `DEF`; the database’s normalized true-position name is `DST`. The RPC may use canonical `DST` internally, while the frontend preserves the existing visible DEF wording.

### Row limits

- Single Game Records: 10 rows, except Most Touchdowns uses 12.
- Totals by Position: 12 rows.
- Highest Scores by Position: 10 rows.
- Non-Point Records: 12 rows.

The backend should enforce category-valid maximums and not trust an arbitrary browser limit.

## 13. Recommended website RPC

A category-based interface fits the existing independent panels:

```text
public.site_current_year_records(
    p_year integer,
    p_record_category text,
    p_scope text default 'combined',
    p_limit integer default null
)
```

`p_year` should be required and explicit. `p_limit` may default to the category’s approved contract. If the SQL signature requires a numeric default, the frontend should still send the exact category limit and the function should clamp it to the category maximum.

Recommended browser category values:

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
total-bench
total-tds
total-mnf
total-tnf

all-high
qb-high
rb-high
wr-high
te-high
k-high
def-high

rank1
top-team
bottom-team
close-games
coaching-call
```

The RPC should reject unsupported years, categories, scopes, and category/scope combinations with a diagnosable error.

## 14. Recommended structured response

A shared nullable row contract can support all visible tables without display-string parsing:

```text
display_rank text
numeric_rank integer
metric_value numeric
owner_name text
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
player_name text nullable
```

Category use:

- Owner-perspective game categories use owner, opponent, both scores, metric, rank, week, year, and game classification.
- Combined-score categories use one logical game row with structured first/second owners and scores.
- Season totals and non-point categories use owner, metric, rank, and year.
- Highest-position categories use owner, metric, rank, position, week, and year.
- `player_name` is intentionally nullable and not required or displayed during this migration.

The backend may return additional structured fields if needed, but the frontend should not parse preformatted owner, score, or detail strings when structured fields exist.

## 15. Frontend migration requirements

The later frontend implementation should:

1. use root `supabase-config.js` and the existing official browser client pattern;
2. send explicit `p_year = 2025` until the owner approves rollover;
3. request each visible panel independently;
4. issue no requests for dormant Final Placing or Points For / Points Against;
5. use only combined scope for MNF and TNF;
6. safely construct table cells from structured response fields;
7. preserve two-decimal formatting for fantasy-point values;
8. preserve integer display for count metrics where appropriate;
9. use returned `display_rank` so tied `T` ranks remain visible;
10. show clear loading, empty, and error states;
11. protect each panel from stale responses after rapid changes;
12. avoid duplicate initial requests and handlers;
13. add accessible names to all category selects;
14. preserve the current four-column highest-position output; and
15. remove SheetJS and Current Year workbook fetching only after Supabase comparison is approved.

The shared footer currently remains an independent Excel consumer. Removing the Current Year page’s statistical Excel path does not by itself authorize changing the footer or deleting root and remaining workbook files used by other pages.

## 16. Backend validation checklist

Before frontend integration, validate:

- explicit 2025 filtering on every category;
- all 32 category values;
- all valid combined, regular, and postseason mappings;
- rejection of regular/postseason for MNF and TNF;
- 10-row, 12-row, and category-specific maximums;
- one-row-per-game behavior for combined-score records;
- winner-only behavior for blowout, closest-game, and least-winning results;
- loser-only behavior for most-losing results;
- true-position attribution for QB/RB/WR/TE/K/DST;
- postseason inclusion of both playoff and consolation games;
- touchdowns, MNF, TNF, coaching calls, weekly extremes, and end-of-week rank against legacy metrics;
- close-game threshold against the existing published definition;
- tied `RANK()` display, including `T` prefixes;
- deterministic ordering within ties;
- null handling;
- exclusion of byes and incomplete games;
- current-season owner population;
- browser-role execute access to only the narrow RPC; and
- no service-role credential requirement.

Because several workbook ranges are broken, validation should compare source rows and independently expected values, not require erroneous workbook output to match.

## 17. Frontend comparison checklist

Before approving Excel removal:

- verify all four visible panels locally through HTTP;
- verify every category and every supported scope;
- confirm exactly four initial statistics RPC calls, one per visible panel;
- confirm one additional RPC call only for the panel whose category or scope changes;
- confirm no RPC call for hidden/dormant panels;
- confirm MNF/TNF do not imply regular/postseason filtering;
- confirm loading, empty, and error messages;
- confirm rapid changes cannot render stale results;
- confirm two-decimal point formatting and integer count formatting;
- confirm tied ranks render with `T`;
- confirm nulls do not render as zero or `null`;
- confirm desktop and mobile tables remain usable;
- confirm dropdowns have accessible names;
- confirm no Current Year request for `nextgenstats/fs5main.xlsx`;
- confirm the Current Year page no longer requires SheetJS after migration cleanup; and
- repeat the same checks on Netlify before permanent approval.

## 18. Approved clarifications and deferred work

The owner confirmed:

1. The RPC uses an explicit year. The frontend remains on 2025 until the owner directs the rollover to 2026.
2. Final Placing and Points For / Points Against are dormant, excluded from the RPC, and planned for later HTML cleanup.
3. MNF and TNF support combined scope only.
4. Highest Scores by Position preserves the current Rank, Score, Owner, and Week output. Player identity is deferred.

Future player-name automation, additions, page design, styling, and visual-consistency work are separate from migration correctness. Their deferral must not be described as an unfinished data-source migration.

## 19. Remaining implementation dependencies

Before SQL is finalized, the database-side implementation must inspect:

- the exact deployed columns and phase values in `v_owner_games`, `v_game_records`, and `v_owner_position_week`, plus starting-slot and populated player-level fields in `legacy_slot_scores` and `player_week_performances`;
- the exact season-membership field used to define the 12 owners for `p_year`;
- whether every required legacy metric is available directly through a validated interface or needs a narrow supporting view;
- the canonical close-game threshold already used by database records; and
- representative expected 2025 values for each category, especially categories whose workbook output is currently `#N/A`.

No further page-presentation clarification is required for the initial backend build.

## 20. Final implemented state

The permanent Supabase-only frontend uses:

```text
public.site_current_year_records(
  p_year integer,
  p_record_category text,
  p_scope text default 'combined',
  p_limit integer default null
)
```

The function is `SECURITY DEFINER`, uses the controlled search path `pg_catalog, public`, and grants execute access to `anon` and `authenticated`. Its structured 17-column response is:

```text
display_rank
numeric_rank
metric_value
owner_name
opponent_name
owner_score
opponent_score
first_owner_name
first_score
second_owner_name
second_score
week_number
year
game_code
canonical_broad_class
position_code
player_name
```

Database regression validation passed for all 32 categories. The RPC requires an explicit year, filters the current frontend to 2025 through Week 15, gates records to completed weeks, excludes byes where applicable, includes playoff and consolation games in postseason scope, preserves null postseason totals, and returns PostgreSQL `RANK()` values with tied display ranks such as `T1`. It returns the canonical 12-member 2025 population for owner-total panels, uses true position codes including database `DST` while the page retains visible `DEF` wording, and defines close games as an absolute margin of 10 points or fewer. Postseason metadata corrections for `game_code` and `canonical_broad_class` were included in backend validation.

The browser reuses root `supabase-config.js`, sends explicit `p_year = 2025`, and makes one independent request for each of the four visible panels on initial load. Category or valid scope changes reload only the affected panel. Per-panel request sequencing prevents stale responses from overwriting later selections. Single Game, Highest Scores by Position, and Non-Point Records always use `combined`; Totals by Position maps Reg + Post, Reg Only, and Post Only to `combined`, `regular`, and `postseason`. MNF and TNF force combined scope and disable the unavailable scope controls accessibly.

The browser passes 10 rows for Single Game except 12 for `high-tds`, 12 for Totals by Position, 10 for Highest Scores by Position, and 12 for Non-Point Records. It safely creates table cells from structured fields, preserves returned display ranks, formats point-derived values to two decimals, formats counts as integers, preserves legitimate zeroes, and renders missing values as an em dash. Highest Scores by Position remains the four-column Rank, Score, Owner, and Week presentation; player display remains deferred.

Supabase is the sole statistics source. Loading, empty, and error states remain independent per panel. The Current Year comparison renderer, SheetJS dependency, unused `season-data.js`, workbook request, and shared Excel-backed footer loader were removed after owner approval. Root and remaining workbook files stay in the repository while other pages still depend on them. Dormant Final Placing and Points For / Points Against HTML remains present but makes no request.

The stale page heading was corrected from 2023 to 2025, and the four category selects received accessible names. Existing layout and styling were otherwise intentionally preserved. Static validation was completed by Codex, and the owner manually validated the Supabase implementation on Netlify and approved it as permanent.

## 21. Highest Scores by Position backend correction

The initial Highest Scores by Position branch incorrectly used `v_owner_position_week`. That view aggregates all same-position scoring for an owner-week, which inflated RB, WR, and `all-high` results.

The branch now ranks individual starting-slot rows from `legacy_slot_scores` by `points`. RB1, RB2, and eligible RB/WR FLEX scores are independent candidates. Bench rows remain excluded. Completed-week gating, explicit-year filtering, bye and eligibility rules, PostgreSQL tie ranking, category limits, and postseason metadata behavior are unchanged.

`v_owner_position_week` remains the correct source for Totals by Position. Validation confirmed corrected individual results for `rb-high`, `wr-high`, and `all-high`, including preserved `PQF`/`POST` and `CQF`/`POSTC` metadata.
