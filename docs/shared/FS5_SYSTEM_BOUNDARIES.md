<!--
SYNCHRONIZED SHARED DOCUMENT — DO NOT EDIT A REPOSITORY COPY.
Authoritative source: FS5-shared-docs/FS5_SYSTEM_BOUNDARIES.md
Run FS5-shared-docs/scripts/sync-shared-docs.ps1 to update copies.
-->

# FS5 System Boundaries

## Purpose

FS5 is maintained in three operationally and logically separate repositories. This document defines ownership and integration boundaries; it does not replace any repository's implementation documentation.

## Repository ownership

| Repository | Owns | Does not own |
|---|---|---|
| `codex_site` | Public static website, browser-side presentation, website RPC consumption, Netlify site behavior, site design and navigation | Canonical schema/import implementation, privileged SportsBook operations, Admin PWA implementation |
| `database` | Canonical Supabase schemas, migrations, imports, validation, corrections, statistical query rules, database functions/RPC implementation, historical evidence | Public-site presentation, Admin PWA components/routes, Admin deployment |
| `admin` | Private React/TypeScript Admin PWA, Admin-owned Edge Function source, authenticated Admin workflows, Admin deployment | Public-site implementation, general canonical schema/import ownership |

The repositories, deployments, and Git histories must remain separate.

## Integration directions

- The public site consumes browser-approved Supabase RPCs and public Edge Function boundaries implemented against database-owned contracts.
- The Admin PWA sends authenticated requests through controlled Edge Functions. Privileged database credentials never enter browser code.
- General schema and database-function changes belong in `database`. Admin-owned Edge Function and client changes belong in `admin`.
- Cross-repository contract changes must be documented in the owning repository and reflected here only when another repository must coordinate with them.

## Security boundary

- Never place service-role keys, database passwords, Discord secrets, access codes, or other secrets in source control or shared documentation.
- Browser code may use only browser-safe credentials and allowlisted public responses.
- Protected endpoints validate the session and derive the acting member or administrator server-side.
- Private API responses and sensitive administrative data must not be cached by the PWA.

## Documentation ownership

- Edit the three shared documents only in `FS5-shared-docs`.
- Repository copies under `docs/shared/` are generated, tracked copies.
- Repo-specific implementation, status, deployment, schema, query, and historical evidence must remain in its owning repository.
- The synchronization check must pass before coordinated documentation changes are considered complete.

## Detailed authorities

- Site architecture and consumption: `codex_site/docs/`
- Canonical database implementation and operations: `database/docs/`
- Admin architecture and deployment: `admin/ARCHITECTURE.md` and `admin/DEPLOYMENT.md`
