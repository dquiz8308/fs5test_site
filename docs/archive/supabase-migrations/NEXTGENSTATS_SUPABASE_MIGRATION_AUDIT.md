# NextGenStats Supabase Migration Audit

> Status: migration complete, manually validated on deployed Netlify, and owner-approved as permanent with no issues. Sections 1-17 retain the historical pre-migration audit and implementation specification for reference. The current Quick Summary uses `public.site_nextgenstats_summary()` as its sole data source.

## 1. Purpose and scope

This audit documents `nextgenstats/` before replacing its Excel/SheetJS Quick Summary with a dedicated Supabase website interface.

The migration should preserve:

- the 12 current owners;
- the current initial owner order;
- career Wins, Losses, and Ties;
- regular-season plus postseason scope;
- existing client-side column sorting;
- the four linked NextGenStats page images;
- current desktop and mobile layout; and
- current visible wording.

The owner confirmed that the initial order must remain:

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

Sorting remains a frontend interaction. Sorting a loaded table must not make another RPC request.

This audit changes documentation only. No NextGenStats HTML, CSS, JavaScript, workbook, shared runtime file, or database object was changed.

## 2. Files inspected

### Page and shared runtime

- `nextgenstats/index.html`
- `nextgenstats/nextgen-styles.css`
- `nextgenstats/nextgen-script.js`
- root `fs5main.xlsx`
- `nextgenstats/fs5main.xlsx`
- `common.css`
- `styles.css`
- `mobile-menu.js`
- `footer-script.js`
- `supabase-config.js`

### Linked NextGenStats sections

- `nextgenstats/currentyear/`
- `nextgenstats/seasonrecords/`
- `nextgenstats/singlegame/`
- `nextgenstats/alltime/`

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
- `docs/archive/SEASON_RECORDS_SUPABASE_MIGRATION_AUDIT.md`

## 3. Current page structure

The NextGenStats landing page contains:

1. the shared site header and navigation;
2. a NextGenStats logo area;
3. one Quick Summary table;
4. linked artwork for Current Year, Season Records, Single Game Records, and All-Time Records; and
5. the shared footer.

The Quick Summary table has four columns:

```text
Owner | Wins | Losses | Ties
```

It has 12 hard-coded owner rows. The three numeric cells in each row begin empty and are populated after the workbook request completes.

The page loads:

- SheetJS 0.17.4 from a CDN;
- `nextgen-script.js`;
- shared `mobile-menu.js`; and
- shared `footer-script.js`.

No framework, module loader, package manager, build system, or page-specific external API is used.

## 4. Current Excel data flow

`nextgen-script.js` requests:

```text
../fs5main.xlsx
```

From `nextgenstats/`, that resolves to the root workbook:

```text
fs5main.xlsx
```

It does not resolve to `nextgenstats/fs5main.xlsx`.

The script:

1. waits for `DOMContentLoaded`;
2. appends a loading spinner to `.summary`;
3. fetches and parses the complete root workbook;
4. selects the `Summary` worksheet;
5. reads current owner names from `B6:B17`;
6. reads wins, losses, and ties from `L6:N17`;
7. writes the three numeric values into the 12 existing HTML rows; and
8. removes the spinner.

The owner names read from `B6:B17` are not written to the page. They only determine that the loop runs 12 times. The visible names come from hard-coded HTML rows. The numeric rows therefore depend on the workbook and HTML maintaining exactly the same order.

The shared footer separately fetches the same root workbook and reads `Summary!X27`. The page currently makes two complete workbook requests on initial load.

## 5. Workbook ranges and formulas

### Published ranges

| Purpose | Worksheet range |
|---|---|
| Owner sequence | `Summary!B6:B17` |
| Wins | `Summary!L6:L17` |
| Losses | `Summary!M6:M17` |
| Ties | `Summary!N6:N17` |
| Shared footer Last Updated | `Summary!X27` |

The Quick Summary owner range currently contains:

| Order | Owner | Wins | Losses | Ties |
|---:|---|---:|---:|---:|
| 1 | Brycen | 125 | 102 | 0 |
| 2 | Will | 118 | 109 | 0 |
| 3 | David | 104 | 122 | 0 |
| 4 | Jordan | 120 | 101 | 1 |
| 5 | Chris | 113 | 112 | 0 |
| 6 | Bailey | 87 | 121 | 0 |
| 7 | Mike | 112 | 83 | 0 |
| 8 | Keith | 88 | 87 | 0 |
| 9 | Ethan | 66 | 76 | 0 |
| 10 | Matthew | 78 | 116 | 1 |
| 11 | Cody | 72 | 101 | 0 |
| 12 | Max | 82 | 61 | 0 |

These are cached workbook values as of its current update state and are comparison targets, not values to hard-code into the RPC or browser.

### Formula behavior

For each owner, the workbook uses `COUNTIF` over the complete result column of that owner’s worksheet:

```text
WIN
Loss
TIE
```

The workbook labels the scope `Regular Season + Playoffs`. It counts career results across all scoring eras.

The result is not a regular-season-only record and is not restricted to point-record-eligible PPR seasons.

## 6. Current sorting behavior

Wins, Losses, and Ties headers are clickable.

When a numeric header is selected:

1. the browser reads the already rendered integer values;
2. sorts the 12 `<tr>` elements in memory;
3. appends the rows back into the new order; and
4. toggles `asc` and `desc` CSS classes.

The first click sorts ascending and the second click sorts descending. Selecting another numeric header clears the previous direction classes.

Owner is not sortable.

No workbook request is made when sorting. The Supabase migration should retain this client-side-only behavior.

The current header controls are mouse-clickable but are not keyboard-operable buttons and do not expose `aria-sort`. Accessible sorting behavior is a migration-relevant improvement because the existing interaction must remain usable.

## 7. Loading and error behavior

### Loading

A large animated spinner is appended to the summary panel while the workbook is loading. The hard-coded owner names remain visible with blank numeric cells.

### Success

The numeric cells are filled and the spinner is removed.

### Failure

The error is written to the browser console and the spinner is removed. No visible error message is shown, leaving all numeric cells blank.

### Empty or malformed data

There is no explicit empty state or contract validation. Missing workbook cells become empty strings. A missing row, worksheet, or unexpected range shape can result in a JavaScript error or misaligned values.

The Supabase frontend should provide distinct loading, empty, and error states without destroying the page links.

## 8. Current markup, accessibility, and path findings

The following issues were observed:

1. The main NextGenStats image line begins with `src="NextGenFS5.png"` but is missing the opening `<img` token. It is malformed HTML rather than a valid image element.
2. The navigation incorrectly marks Owners as active; NextGenStats is not marked active.
3. The Quick Summary contains a second opening `<tbody>` tag instead of a closing tag.
4. Numeric table headers function as sorting controls but have no buttons, keyboard handlers, or `aria-sort`.
5. The table has no caption or programmatic description identifying it as current-owner career records.
6. The script trusts positional correspondence between hard-coded owner rows and workbook results instead of rendering structured owner rows.
7. The page contains no visible data error or empty message.

The malformed logo and incorrect active navigation are existing HTML defects, not Supabase data requirements. They should be recorded for the implementation review and fixed only if approved as migration-relevant page correctness.

## 9. Desktop and mobile behavior

Desktop uses a horizontal row:

- the Quick Summary takes the left side; and
- the four linked record-page images are stacked in a column on the right.

At widths up to 768 pixels:

- the row becomes a vertical column;
- the summary width becomes 90%;
- the linked-image container becomes 90%;
- the main logo width becomes 95%; and
- the standard shared mobile navigation is used.

The migration should not change panel sizing, image links, responsive stacking, table colors, typography, or the hover design. The table’s loading/error content must fit without causing horizontal overflow.

## 10. Database mapping

The strongest validated source is:

```text
public.v_owner_all_time_summary
```

Database documentation states that it:

- covers owner all-time totals;
- was validated across all 34 columns with zero mismatches;
- includes games, wins, losses, ties, and win percentage; and
- preserves non-point totals across all scoring eras.

`public.v_current_owner_games` could independently reproduce the counts, but rebuilding an already validated all-time summary is unnecessary unless deployed columns require it.

The existing `public.site_owner_page(text)` RPC exposes the needed totals for one owner, but the NextGenStats browser must not issue 12 owner-specific RPC calls. The landing page should use one narrow page-specific RPC that returns all 12 current owners.

Browser roles should not receive direct access to the analytical view.

## 11. Required backend behavior

The backend must:

- return exactly the 12 owners whose canonical owner record is current;
- include all completed, played regular-season and postseason games;
- include playoff and consolation postseason games;
- exclude byes;
- exclude incomplete or unplayed matchups;
- retain ties as their own count;
- include STD and PPR eras;
- use canonical owner display names;
- return the owner-approved initial display order;
- return integer counts without formatting strings;
- return owners with zero counts if a future current owner has no played games; and
- avoid relying on workbook owner-sheet names or HTML row position.

The initial display order is presentation data, not statistical rank. It must not be recalculated from wins, losses, ties, win percentage, owner ID, or alphabetical name.

If the database has no durable owner display-order field, the page RPC should define and return the approved order explicitly. Longer term, a canonical site display-order column would be preferable if multiple pages need the same ordering.

## 12. Recommended website RPC

The page requires one no-parameter request:

```text
public.site_nextgenstats_summary()
```

Recommended characteristics:

- `STABLE`;
- `SECURITY DEFINER`;
- controlled `search_path = public, pg_temp`;
- execute access granted only to `anon` and `authenticated`; and
- no direct analytical-view grant to browser roles.

No browser filter parameter is needed. Sorting stays in JavaScript.

## 13. Recommended response contract

The RPC should return 12 structured rows:

```text
owner_id bigint
owner_name text
display_order integer
wins integer
losses integer
ties integer
```

Optional future-compatible fields may include:

```text
games_played integer
win_percentage numeric
```

They should not be displayed during this migration unless separately approved.

The response should be ordered by `display_order`, and `display_order` should be unique across the returned current owners.

## 14. Frontend migration requirements

The frontend implementation should:

1. load the official Supabase browser client and root `supabase-config.js` from the correct one-level relative path;
2. make exactly one `site_nextgenstats_summary` call on initial page load;
3. validate that the response contains 12 unique current owners and unique display-order values;
4. render owner names and counts from the same structured rows;
5. avoid positional joins against hard-coded HTML owner names;
6. preserve the approved initial owner order;
7. preserve sorting locally without further RPC calls;
8. sort integer values numerically;
9. provide keyboard-operable sort controls and update `aria-sort`;
10. show visible loading, empty, and error states;
11. safely render all text;
12. preserve the four page links when summary loading fails;
13. remove the NextGenStats statistics request for `fs5main.xlsx` after validation; and
14. remove the page’s SheetJS dependency only when no remaining loaded script on this page requires it.

The shared footer currently uses SheetJS and root `fs5main.xlsx`. If the footer remains loaded during the first integration phase, the page still needs SheetJS for the footer even though Quick Summary no longer uses Excel. Footer migration or removal must be handled deliberately rather than silently breaking Last Updated.

## 15. Backend validation checklist

Before frontend integration, verify:

- exactly 12 rows;
- exactly 12 unique owner IDs;
- exactly 12 unique canonical owner names;
- exactly 12 unique display-order values;
- the approved order from Brycen through Max;
- Brycen returns 125 wins, 102 losses, and 0 ties against the current validated dataset;
- Jordan and Matthew retain one tie each;
- all other currently displayed owners retain zero ties;
- wins, losses, and ties match `v_owner_all_time_summary`;
- totals include regular and postseason games;
- totals include all scoring eras;
- byes and incomplete games are excluded;
- counts are integers and never null;
- browser roles can execute the RPC;
- browser roles cannot directly query protected analytical views; and
- no service-role key is required.

The full 12-row workbook output should be compared during validation, while recognizing that the database may contain newer approved data by implementation time.

## 16. Frontend validation checklist

Before approving Excel removal:

- confirm exactly one Quick Summary RPC request on load;
- confirm 12 owners appear in the approved initial order;
- compare all 36 numeric values;
- click Wins twice and confirm ascending then descending order;
- repeat for Losses and Ties;
- confirm sorting makes no additional network request;
- confirm selecting another header resets the previous sort direction state;
- confirm keyboard sorting and `aria-sort`;
- confirm loading, empty, and error states;
- confirm an RPC failure does not disable the four linked pages;
- confirm no NextGenStats Quick Summary request for `fs5main.xlsx`;
- review desktop layout;
- review the 768-pixel mobile breakpoint and narrower screens;
- verify all four linked images and destinations;
- verify the shared mobile menu; and
- repeat the tests on Netlify before approving permanent removal.

## 17. Approved decision and deferred work

The owner confirmed that the initial current-owner sequence must remain unchanged and that sorting continues in the frontend.

The NextGenStats page uses its own small RPC rather than making 12 calls to the Owners RPC or granting browser access to an analytical view.

The migration’s purpose is data-source correctness and stability. Existing layout and styling should be preserved. Broader design, styling, visual consistency, and optional new summary statistics remain a separate later phase and must not be described as unfinished migration work.

## 18. Final implemented state

The completed frontend:

- makes exactly one no-parameter `public.site_nextgenstats_summary()` request on initial load;
- validates exactly 12 unique owners and 12 unique `display_order` values;
- renders owner names, wins, losses, and ties from the same structured rows;
- preserves the RPC-owned approved initial order from Brycen through Max;
- sorts Wins, Losses, and Ties entirely in the browser without another request;
- provides native keyboard-operable sorting controls and correct `aria-sort`;
- safely renders returned values and provides loading, empty, malformed-response, and error states;
- preserves all four linked page images and the existing desktop/mobile layout;
- corrects the malformed main image, active navigation, duplicate `<tbody>`, inaccessible sort headers, and missing table description; and
- has no Quick Summary `.xlsx` request, XLSX/SheetJS parsing, workbook range mapping, Excel fallback, or shared Excel-footer dependency.

Live validation confirmed 12 rows, 12 unique owners, 12 unique display-order values, integer counts, the approved initial order, and one tie each for Jordan and Matthew. The owner manually verified the deployed Netlify page and confirmed that it works as intended with no issues.

The migration is complete, permanent, and owner-approved. Future design, styling, visual-consistency work, and optional new summary statistics remain separate enhancements rather than unfinished data-source work.
