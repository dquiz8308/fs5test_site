# FS5 Website Context

## Purpose

This repository owns the public FastStrongFive website: static HTML, CSS, and JavaScript deployed through Netlify. It owns browser-side presentation and approved public Supabase consumption; it does not own canonical schema/import implementation or the private Admin PWA.

## Architecture

- Pages are organized in separate folders with shared root assets where appropriate.
- Shared changes must be checked across primary pages and desktop/mobile layouts.
- Browser access uses shared browser-safe configuration and approved RPC or Edge Function boundaries.
- Privileged credentials and private Admin data must never enter browser code.

## Current season context

The homepage remains in 2026 preseason presentation and shows the draft status as `Drafted`. Current Year points to 2026 and may legitimately show no data before completed games exist. Drafts defaults to 2026 through the existing `site_draft_page(2026)` RPC path and preserves historical year access. Completed-season surfaces may continue to default to 2025 where they require a completed season.

The official canonical 2026 season now exists. Shared facts and the rollover sequence are in `docs/shared/FS5_SHARED_DATA_CONTRACTS.md` and `docs/shared/FS5_SEASON_ROLLOVER.md`.

## Documentation map

- `AGENTS.md`: working rules
- `docs/CURRENT_STATUS.md`: current state and open work
- `docs/SITE_STRUCTURE.md`: page and documentation structure
- `docs/DESIGN_RULES.md`: durable presentation and maintenance rules
- `docs/DATA_STRUCTURES.md`: website data consumers and response behavior
- `docs/DECISIONS.md`: durable site decisions
- `docs/SUPABASE_WEBSITE_INTEGRATION.md`: browser integration rules
- `docs/shared/`: synchronized cross-repository boundaries, contracts, and rollover
- `docs/archive/`: completed implementation and migration provenance

Database implementation is authoritative in `database`; Admin implementation is authoritative in `admin`.
