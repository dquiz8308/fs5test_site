# Design and Maintenance Rules

## Scope and ownership

- Inspect existing page and shared assets before editing.
- Determine whether a rule is global or page-specific before changing it.
- Prefer localized fixes when a global change could affect unrelated pages.
- Do not redesign approved components unless requested.

## Responsive and accessible behavior

- Every feature must work on desktop and mobile without page-level overflow.
- Preserve accessible labels, buttons, focus, keyboard use, and modal behavior.
- Check common breakpoints, long text, tables, cards, menus, images, and request states.
- Do not solve one viewport by breaking another.

## Data presentation

- Do not fabricate values to fill an empty state.
- Preserve ranking, tie, null, season, week, and owner semantics supplied by approved contracts.
- Treat loading, no-data, and error states as distinct.
- Correct canonical errors in `database`, not with presentation workarounds.

## Safe workflow

1. Inspect relevant HTML, CSS, JavaScript, and contracts.
2. Make the smallest maintainable change.
3. Test normal, empty, error, desktop, and mobile states as applicable.
4. Review the diff for unrelated changes.
5. Update concise active documentation only when current behavior changes.

Completed design history is under `docs/archive/design/` and `docs/archive/SITE_COMPLETION_HISTORY.md`.
