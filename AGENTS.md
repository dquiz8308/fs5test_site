# FS5 Website Instructions



## Working method



- Inspect all relevant HTML, CSS, and JavaScript before editing.

- Do not modify unrelated files.

- Do not redesign existing components unless explicitly requested.

- Preserve existing data and historical seasons.

- Explain the cause of a bug before changing it.

- Review the final diff for accidental changes.

- State exactly which files were changed.



## Website conventions



- This is a static HTML, CSS, and JavaScript website.

- The site is deployed through Netlify.

- Pages are organized into separate folders.

- Shared styles may exist in common.css and styles.css.

- Confirm whether a rule is global or page-specific before modifying it.

- Prefer page-specific fixes when a global change could affect other pages.



## Responsive requirements



- Every feature must work on desktop and mobile.

- Do not fix mobile by breaking desktop.

- Check common breakpoints and text overflow.

- Preserve accessible buttons, labels, and modal behavior.



## User preferences



- Keep code readable and maintainable.

- Do not add frameworks or dependencies without permission.

- Do not replace existing architecture merely because another approach is cleaner.

- Ask before deleting substantial code or historical data.

- Use existing naming conventions.

## Shared documentation

- Files under `docs/shared/` are synchronized from the sibling `FS5-shared-docs` repository.
- **NEVER edit `docs/shared/*` directly.**
- If a shared-document change is needed, edit the authoritative file in `FS5-shared-docs`, run Sync, and then run Check.
- If cross-repository access is unavailable, stop and report that the authoritative shared document needs updating; do not edit the local copy.
- Keep database implementation and private Admin implementation details in their owning repositories.

## Repository boundaries

- `codex_site` is authoritative for production and must remain read-only from `test_site` work.
- Use `test_site` for collaborative development and testing. Promote changes to canonical only with explicit approval.
- Synchronize canonical changes selectively; never overwrite intentional test-only experiments, especially Owners locker, achievement, medal, theme, and personal-item features.
- Keep live Supabase reads enabled unless explicitly instructed otherwise.
- Preserve the test-site SportsBook frontend submission guards. They are not a server-side security boundary.
- Preserve Discord functionality while keeping test-site alerts disabled through Netlify environment configuration.

