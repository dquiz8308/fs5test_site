# Site Structure

Primary pages remain in their established folders with shared root assets where appropriate. Shared navigation, menu, footer/status, configuration, and common styling should remain centralized only where already designed to be shared. Older season wrappers and experimental material remain historical unless explicitly retired.

## Documentation

```text
AGENTS.md
docs/
  PROJECT_CONTEXT.md
  CURRENT_STATUS.md
  SITE_STRUCTURE.md
  DESIGN_RULES.md
  DATA_STRUCTURES.md
  DECISIONS.md
  SUPABASE_WEBSITE_INTEGRATION.md
  shared/
  archive/
    README.md
    SITE_COMPLETION_HISTORY.md
    design/
    supabase-migrations/
```

Shared copies come from `FS5-shared-docs` and must not be edited here. Archive documents are provenance, not current plans. Database and Admin detail stays in the owning repositories.
