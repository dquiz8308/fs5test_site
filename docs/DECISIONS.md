# Durable Website Decisions

## Repository and deployment

- The site remains static HTML, CSS, and JavaScript in GitHub repository `dquiz8308/fs5_site`; Netlify deploys automatically from pushes to `main`.
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

## Security and maintenance

- Browser-safe credentials only; privileged operations remain server-side.
- Preserve owner/game grain, ranks, ties, byes, postseason, scoring-era, and coverage rules.
- Shared changes require cross-page validation; localized changes should remain localized.
- Completion narratives belong in `docs/archive/`.
