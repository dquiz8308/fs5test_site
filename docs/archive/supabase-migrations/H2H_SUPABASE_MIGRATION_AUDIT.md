# H2H Supabase Migration Audit

> Status: completed. `public.site_h2h_page` is the active H2H website source and was manually verified locally and on Netlify. The Excel comparison scripts and `h2h/siteh2h.xlsx` were removed after owner approval. This document is retained as the pre-migration behavior and mapping record.

> Sections 1–12 below are a historical pre-migration snapshot retained for reference. The current implementation is documented in `../DATABASE_HANDOFF.md`, `../DATA_STRUCTURES.md`, and `../CURRENT_STATUS.md`.

> Current-state clarification: the later page-specific H2H visual redesign is complete and approved. It did not occur during the migration and does not change the historical audit below, the `public.site_h2h_page` contract, Supabase configuration, or database objects.

## 1. Purpose and scope

This audit documents the current `h2h/` page before any implementation change and maps its Excel-driven behavior to the already validated database function:

```text
fn_h2h(primary_owner_id, secondary_owner_id)
```

The migration objective is to make Supabase the H2H page's primary data source without changing its current design, filter choices, summary labels, game-log columns, or selected-owner-first perspective.

This is an audit only. No H2H HTML, CSS, JavaScript, workbook, or database object was changed as part of this work.

## 2. Files inspected

### Page and shared runtime files

- `h2h/index.html`
- `h2h/h2hstyle.css`
- `h2h/h2hsummary.js`
- `h2h/h2hsummarystyle.js`
- `h2h/game-log.js`
- `h2h/siteh2h.xlsx`
- `common.css`
- `styles.css`
- `mobile-menu.js`
- `footer-script.js`
- `supabase-config.js`

### Project and database documentation

- `AGENTS.md`
- `PROJECT_CONTEXT.md`
- `SITE_STRUCTURE.md`
- `DESIGN_RULES.md`
- `DATA_STRUCTURES.md`
- `DECISIONS.md`
- `CURRENT_STATUS.md`
- `SUPABASE_WEBSITE_INTEGRATION.md`
- `DATABASE_HANDOFF.md`
- `DATABASE_SCHEMA_AUDIT.md`
- `QUERY_EXECUTION_GUIDE.md`

## 3. Current page behavior

The page has two owner dropdowns. A change to either dropdown independently triggers:

1. `h2hsummary.js`, which downloads and parses `siteh2h.xlsx`, then reads fixed cells for the summary cards.
2. `game-log.js`, which separately downloads and parses the same workbook, then reads a six-column matchup range for the game log.

The current implementation therefore downloads and parses the workbook twice for a valid selection change.

Both scripts use a hard-coded ordered-pair map. The first dropdown determines the perspective sheet and the first displayed score; reversing the dropdowns selects the reciprocal sheet and reverses the score and signed-margin presentation.

The game log is reversed in JavaScript before rendering, so the newest matchup appears first. Score cells are colored green for the higher score, red for the lower score, and yellow for a tie. The table headers are changed to the selected owner names.

After the summary cells are populated, `h2hsummary.js` dispatches `DataLoaded`. `h2hsummarystyle.js` then:

- formats total and average points to two decimal places;
- compares the two owners' values and applies green/red gradients;
- applies the inverse comparison for closest-win margin, where the lower positive value is better; and
- uses a yellow gradient when compared values are equal.

The page has no loading state, empty-result message, request error display, request sequencing, or stale-request protection. The XHR requests do not define an error handler.

Selecting the placeholder or selecting the same owner in both dropdowns does not have a matchup mapping. The scripts log an error, but existing results are not explicitly cleared, so a previous matchup can remain visible.

## 4. Current filters

The only filters are the two ordered owner selections.

Each dropdown contains:

```text
Owner (placeholder)
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

There are 12 selectable current owners and 132 valid ordered pairs of distinct owners. The page does not currently expose inactive historical owners, season filters, scoring-era filters, regular/postseason filters, or exact game-code filters.

The `<select>` elements do not currently have associated `<label>` elements or `aria-label` attributes.

## 5. Current visible outputs

### Two-owner summary

| Visible label | Owner 1 | Owner 2 | Current workbook meaning |
| --- | ---: | ---: | --- |
| Wins | Yes | Yes | H2H wins across all played eras |
| Post-Season Wins | Yes | Yes | H2H wins in playoff or consolation games |
| Current Win Streak | Yes | Yes | Active H2H win streak; the other owner displays zero |
| Longest Win Streak | Yes | Yes | Longest chronological H2H win streak |
| Total Points | Yes | Yes | Sum of eligible H2H scores |
| Average Points | Yes | Yes | Average of eligible H2H scores |
| Highest Score | Yes | Yes | Highest eligible owner score, plus league-wide published rank |
| Lowest Score | Yes | Yes | Lowest eligible owner score, plus league-wide published rank |
| Biggest Blowout Margin | Yes | Yes | Largest eligible positive winning margin, plus league-wide published rank |
| Closest Win Margin | Yes | Yes | Smallest eligible positive winning margin, plus league-wide published rank |
| Highest Scoring Game (Combined Score) | One shared result | — | Combined total plus year, week, winner, loser, and scores; includes league-wide rank |
| Lowest Scoring Game (Combined Score) | One shared result | — | Combined total plus year, week, winner, loser, and scores; includes league-wide rank |

Point-derived workbook results use the PPR-era population beginning in 2018. Non-point results such as wins and streaks span all available eras. This matches the project's documented statistical interpretation rule and must be explicit in the Supabase implementation.

The published rank strings are already composed in the workbook, including a `Rank:` prefix and a `T` prefix for duplicate values. The workbook also contains malformed ordinal suffixes in some cases, for example `12nd`; the migration should preserve the visible rank concept and tie behavior, but generate correct ordinal suffixes rather than reproduce that workbook defect.

### Game log

The table has exactly six columns:

| Column | Current content |
| --- | --- |
| Year | Numeric season year |
| Week | Display text such as `Week 8` |
| Owner 1 | Primary owner's score |
| Owner 2 | Secondary owner's score |
| Margin | Signed `Owner 1 score - Owner 2 score` |
| Notes | Participant/matchup note, with `-` commonly used when no note is present |

The log includes all available played H2H games, not only PPR-era games. It is displayed newest-first.

## 6. Workbook structure and exact ranges

`siteh2h.xlsx` contains 27 worksheets:

- one source sheet: `Data1`, used range `A1:FX1362`;
- 12 owner calculation sheets: `Brycen` through `Max`, each using `A1:DU271`;
- one placeholder sheet: `DUMMY`, used range `A1:L71`;
- one additional support sheet: `Sheet1`, used range `A1:V35`; and
- 12 presentation sheets: `BrycenH2H` through `MaxH2H`, each using `A1:EC101`.

The website reads only `DUMMY` and the 12 `*H2H` presentation sheets.

### Repeating matchup-block layout

Each primary-owner H2H sheet contains 11 opponent blocks. Every block is 12 columns wide.

| Opponent position on that sheet | Summary columns | Game-log range |
| ---: | --- | --- |
| 1 | `B:C` | `D2:I50` |
| 2 | `N:O` | `P2:U50` |
| 3 | `Z:AA` | `AB2:AG50` |
| 4 | `AL:AM` | `AN2:AS50` |
| 5 | `AX:AY` | `AZ2:BE50` |
| 6 | `BJ:BK` | `BL2:BQ50` |
| 7 | `BV:BW` | `BX2:CC50` |
| 8 | `CH:CI` | `CJ2:CO50` |
| 9 | `CT:CU` | `CV2:DA50` |
| 10 | `DF:DG` | `DH2:DM50` |
| 11 | `DR:DS` | `DT2:DY50` |

The opponent position follows the fixed dropdown order with the primary owner omitted. For example:

- `BrycenH2H!B:C` and `D2:I50` represent Brycen vs Will.
- `BrycenH2H!N:O` and `P2:U50` represent Brycen vs David.
- `WillH2H!B:C` and `D2:I50` represent Will vs Brycen.

### Summary rows within each two-column summary block

For any summary-column pair, the website reads:

| Rows | Values |
| --- | --- |
| `2` | Wins |
| `3` | Current win streak |
| `4` | Longest win streak |
| `5` | Total points |
| `6` | Average points |
| `7` | Highest score |
| `8` | Lowest score |
| `9` | Highest margin of victory |
| `10` | Lowest margin of victory |
| `11` | Postseason wins |
| `32` | Published highest-score rank |
| `33` | Published lowest-score rank |
| `34` | Published highest-margin rank |
| `35` | Published lowest-margin rank |
| `36` | Published highest-combined rank in the first summary column |
| `37` | Published lowest-combined rank in the first summary column |
| `60` | Formatted highest-combined display in the first summary column |
| `71` | Formatted lowest-combined display in the first summary column |

Rows `52:60` hold the underlying highest-combined detail and formatted output. Rows `63:71` do the same for lowest combined. The browser reads only the final formatted cells at rows 60 and 71.

### Game-log columns within each six-column range

The six columns are:

```text
Year | Week | Primary score | Secondary score | Signed margin | Notes
```

The fixed range allows 49 rows (`2:50`), although blank rows are skipped by the renderer.

### Placeholder behavior

Mappings involving the `Owner` placeholder point summary fields to `DUMMY!B:C`. The placeholder contains display stand-ins such as `00`, `000.00`, `Rank: 000th`, and `*** (***)`. The game log has no equivalent placeholder range.

## 7. Validated `fn_h2h` contract

The database documentation defines:

```text
fn_h2h(primary_owner_id, secondary_owner_id)
```

It returns selected-owner-first rows from the validated owner-game perspective. The underlying contract exposes the fields needed by this page, including:

- selected and opponent owner IDs and names;
- selected score and opponent score;
- `WIN`, `LOSS`, or `TIE`;
- signed margin and combined score;
- season and week number;
- schedule phase;
- canonical game code, source game code, broad class, bracket, round, and placement;
- participant notes; and
- bye/incomplete indicators and source metadata.

`fn_h2h` has been validated across every ordered pair of distinct owners with zero mismatches. Reciprocal validation also returned zero mismatches for selected score/opponent score reversal, signed-margin reversal, and result reversal.

The repository documentation does not record the function's exact deployed column names or browser `GRANT EXECUTE` status. Those must be inspected in Supabase before frontend implementation; names must not be guessed from the conceptual contract.

## 8. Page-to-RPC mapping

### Owner selection and perspective

| Current UI concept | Supabase mapping |
| --- | --- |
| First dropdown | Resolve selected owner to `primary_owner_id` |
| Second dropdown | Resolve selected owner to `secondary_owner_id` |
| Ordered-pair reversal | Call `fn_h2h` with reversed IDs |
| Same owner or placeholder | Do not call the function; show a neutral selection state and clear stale content |

Owner IDs must come from validated owner records or a single maintained browser-safe mapping. Names must not be sent where the function requires IDs.

### Direct game-log mapping

| Current output | `fn_h2h` source |
| --- | --- |
| Year | Season year |
| Week | Week number, formatted as `Week N` |
| Owner 1 score | Selected-owner score |
| Owner 2 score | Opponent score |
| Margin | Signed margin |
| Notes | Participant notes, with an agreed empty display value |
| Row order | Sort season and week descending for display |

Only played, complete matchup rows should render. Bye or incomplete rows must not be converted into zero scores.

### Derived summary mapping

| Current summary value | Required derivation from `fn_h2h` rows |
| --- | --- |
| Wins | Count `WIN` results across all complete played rows |
| Opponent wins | Count `LOSS` results across the same rows |
| Post-Season Wins | Count wins where canonical broad class is playoff or consolation |
| Current Win Streak | Sort chronologically; count the trailing run for the currently winning owner; ties break the streak |
| Longest Win Streak | Longest chronological consecutive `WIN` run for each perspective; ties break the streak |
| Total Points | Sum each owner's non-null scores for PPR-era rows only |
| Average Points | Average each owner's non-null scores for the same PPR-era rows |
| Highest Score | Maximum owner score in the H2H PPR-era rows |
| Lowest Score | Minimum owner score in the H2H PPR-era rows |
| Biggest Blowout Margin | Maximum positive margin for each owner in H2H PPR-era wins |
| Closest Win Margin | Minimum positive margin for each owner in H2H PPR-era wins |
| Highest combined game | PPR-era H2H row with maximum combined score |
| Lowest combined game | PPR-era H2H row with minimum combined score |

For the opponent's owner-perspective calculations, use the structured opponent score and the negated selected-owner margin/result perspective. Do not parse display strings.

Combined-game output should be constructed from structured fields in the selected row:

```text
{combined score} ({year} Week {week}, {winner} over {loser}, {winner score} - {loser score})
```

Ties require deterministic owner ordering and tie-appropriate wording; the implementation must not falsely label a winner.

### League-wide rank mapping

The six displayed ranks are not ranks within the selected H2H series. They are published league-wide PPR-era ranks:

- each owner's highest score;
- each owner's lowest score;
- each owner's biggest winning margin;
- each owner's closest winning margin;
- the selected pair's highest combined game; and
- the selected pair's lowest combined game.

`fn_h2h` supplies the selected pair's raw metric values but does not, based on the documented contract, supply their league-wide ranks. The migration therefore needs one approved database-side rank source. The preferred maintainable approach is a browser-safe page RPC that returns the H2H rows plus the six correctly ranked summary values, or a companion RPC dedicated to H2H summary/rank output.

The implementation must not fetch every league game into the browser merely to calculate global ranks. Rank direction, population, scoring-era cutoff, null exclusion, and tie detection must match the validated database rules. Tied values must display a `T` prefix, and ordinal suffixes must be generated correctly.

## 9. Migration gaps and decisions required before code changes

The validated `fn_h2h` is sufficient for:

- the complete ordered H2H game log;
- wins and postseason wins;
- both score totals and averages;
- H2H score, margin, and combined-game extrema; and
- streak calculations, provided chronological ordering and tie rules are preserved.

The following must be confirmed or added before implementation:

1. The exact deployed `fn_h2h` argument names and returned column names.
2. Browser execution permission for the publishable/anonymous role under the existing RLS model.
3. The canonical browser-safe method for resolving the 12 dropdown names to owner IDs.
4. A database-side source for the six league-wide rank outputs.
5. Whether empty notes should remain visibly `-` or render as blank when the database value is null.

Items 1 through 4 are correctness requirements. They should be resolved from the deployed schema and existing approved database conventions rather than guessed in page JavaScript.

## 10. Recommended implementation architecture

The smallest maintainable static-site approach is:

1. Reuse root `supabase-config.js` for the browser-safe URL, publishable key, and shared client.
2. Load the existing official Supabase browser client from the H2H page using the established project pattern.
3. Keep the existing two dropdowns and selected-owner-first semantics.
4. Replace the two hard-coded ordered-pair maps with one page-specific request flow.
5. Call the validated H2H interface once per valid selection and derive local H2H summary values from that single response.
6. Obtain league-wide ranks from an approved database-side RPC/view rather than from a second workbook or a full client-side league scan.
7. Render the existing summary DOM and six-column table without redesigning them.
8. Add a visible neutral, loading, empty, and error state plus simple request sequencing so an earlier response cannot overwrite a later selection.
9. During comparison testing, retain `siteh2h.xlsx`, SheetJS, and the current Excel logic as an explicit fallback until the Supabase output has been manually validated.

No framework, package manager, bundler, or build step is needed.

## 11. Required comparison tests

Before removing the workbook path, compare Supabase and Excel for:

- all 132 ordered pairs of distinct current owners;
- reciprocal owner order for scores, margins, results, and combined games;
- every visible summary value;
- every game-log row, including year, week, both scores, signed margin, and notes;
- all postseason games;
- the 2018 PPR cutoff for point-derived summaries;
- current and longest streaks, including any tie cases;
- league-wide rank value, direction, tie prefix, and ordinal formatting;
- null and empty-note behavior;
- newest-first row ordering;
- same-owner and placeholder selections;
- rapid selection changes;
- request failures and deliberate Excel fallback; and
- desktop and mobile presentation.

After parity is approved, workbook, SheetJS, hard-coded cell maps, and fallback code can be removed in a separate explicitly approved cleanup.

## 12. Audit conclusion

The H2H game log has a direct, validated migration path to `fn_h2h`. Most summary cards can also be derived deterministically from the same returned rows when the all-era versus PPR-era boundary is preserved.

The only material data-contract gap is the six league-wide rank displays. They require a database-side rank source in addition to the documented row-level `fn_h2h` contract. The exact deployed function signature, returned column names, browser permission, owner-ID resolution, and rank source should be confirmed before any page code is changed.
