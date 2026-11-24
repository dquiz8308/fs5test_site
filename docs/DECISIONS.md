# Durable Website Decisions

## Repository and deployment

- The site remains static HTML, CSS, and JavaScript in GitHub repository `dquiz8308/fs5_site`; Netlify deploys automatically from pushes to `main`.
- Browser-installable PWA support remains manifest- and icon-based and requires no Netlify build or runtime changes.
- Do not add a framework or dependency without owner approval.
- Site, database, and Admin repositories remain separate.

## Data authority

- Supabase is canonical for migrated pages; retired Excel workbooks are not runtime fallbacks.
- `database` owns calculations/provider contracts; the site owns browser consumption and presentation.
- Use structured fields rather than parsing compatibility strings when structured fields exist.
- Empty and approved-null states must not be converted into invented data.

## Season behavior

- Rollover is explicit and coordinated through `shared/FS5_SEASON_ROLLOVER.md`.
- Current Year may show the active incomplete year; completed-season surfaces may retain the latest completed year.
- Homepage phase remains manual unless an approved contract replaces it.
- Preserve historical seasons and archived yearly content.

## Power Lines

- Power Lines consumes authoritative weekly rank from `site_power_lines_standings`; browser code must not duplicate standings or tiebreak calculations.
- Homepage weekly standings requests use bounded concurrency rather than an all-weeks fan-out to avoid PostgreSQL statement timeout `57014`; Season Records keeps sequential weekly loading.
- A Power Lines request may retry `57014` once after a short delay. Unrelated errors are not broadly retried.

## Security and maintenance

- Browser-safe credentials only; privileged operations remain server-side.
- Preserve owner/game grain, ranks, ties, byes, postseason, scoring-era, and coverage rules.
- Shared changes require cross-page validation; localized changes should remain localized.
- Completion narratives belong in `docs/archive/`.

## Live Scores

- `/livescores/` is a maintained public route and uses the site-wide navigation label `Live` immediately after Home.
- Supabase supplies only approved browser-safe GOTW identity and spread metadata; Sleeper remains authoritative for fantasy presentation.
- Discord live alerts run only in configured game windows. Sleeper owns game state and bye authority, Yahoo supplies only a strictly matched period for Ice Watch, and missing data fails closed.
- Netlify cron expressions are UTC and require deliberate one-hour maintenance when Central Time changes between CDT and CST.
