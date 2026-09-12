# Supabase Website Integration

## Scope

This guide defines current browser integration. Historical Excel-to-Supabase evidence is under `docs/archive/supabase-migrations/`.

## Security

- Use only the browser-safe project URL and public key intended for browser access.
- Never place service-role keys, database passwords, private Admin credentials, or secrets in browser code.
- Limit browser access to approved RPCs and Edge Functions.

## Request behavior

- Validate inputs before requesting.
- Distinguish idle, loading, success, empty, and error states.
- Prevent stale responses from overwriting newer selections.
- Prefer structured fields and preserve null, rank, tie, and coverage signals.
- Do not restore workbook fallbacks to migrated pages.

## Ownership

- Website request and presentation: this repository
- RPC implementation, grants, security, and calculations: `database`
- Shared invariants: `docs/shared/FS5_SHARED_DATA_CONTRACTS.md`
- Private Admin integration: `admin/ARCHITECTURE.md`

Validate through local HTTP and deployed Netlify contexts as appropriate, including empty/error and desktop/mobile states.
