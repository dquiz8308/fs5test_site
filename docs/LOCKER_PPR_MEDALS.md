# Owner locker PPR medals

Status: presentation prepared; recipient verification blocked by unavailable historical data access. No medals have been awarded yet. The public site's key cannot read `player_week_performances` or `players`. Do not expose those tables or add privileged credentials to the website.

The requested award recognizes the full NFL regular-season PPR points leader at each position, starting in 2019, and belongs only to that player's final FS5 owner for that season. NFL playoffs are excluded. Use complete seasons only; 2025 is the latest completed season currently documented by the site. Full NFL seasons may include weeks beyond the FS5 championship.

Before populating `owners/locker-ppr-medals.js`, obtain a verified export from the database-owning project and a verified full NFL-season PPR leaderboard. Match canonical player IDs, not names alone. Confirm QB, RB, WR, TE, K and DST coverage and the scoring settings used by the leaderboard. Do not substitute FS5 starting-slot totals for full-season player totals. Preserve tied leaders. Resolve ownership at the final FS5 roster snapshot, including bench/reserve slots; an unrostered player earns no owner medal. A player's last appearance earlier in a season does not prove final-roster ownership.

Each approved record must contain `kind: 'ppr-medal'`, `owner`, `season`, `position`, `player_name`, `player_id`, numeric `points`, `leader_source`, and `ownership_source`. Retain source references sufficient to audit both the ranking and final roster. Do not put unverified example records in the live array.

The owner page adds these medals to existing shelves and opens their details in the existing keyboard-accessible dialog. Player name, position and season are rendered as text over the gold artwork so names remain accurate. The existing `OWNER_COLLECTIONS_VISIBLE = false` setting remains unchanged; the medals appear with other items when the locker is restored.
