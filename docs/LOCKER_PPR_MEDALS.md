# Owner locker PPR medals

Status: presentation prepared; all 28 QB/RB/WR/TE leaders for 2019–2025 now matched to final FS5 rosters through the public Vault archives. No medals have been awarded yet; canonical player IDs and scoring-compatible totals remain pending. The public site's key cannot read `player_week_performances` or `players`. Do not expose those tables or add privileged credentials to the website.

The requested award recognizes the full NFL regular-season PPR points leader at each position, starting in 2019, and belongs only to that player's final FS5 owner for that season. NFL playoffs are excluded. Use complete seasons only; 2025 is the latest completed season currently documented by the site. Full NFL seasons may include weeks beyond the FS5 championship.

Before populating `owners/locker-ppr-medals.js`, obtain a verified export from the database-owning project and a verified full NFL-season PPR leaderboard. Match canonical player IDs, not names alone. Confirm QB, RB, WR, TE, K and DST coverage and the scoring settings used by the leaderboard. Do not substitute FS5 starting-slot totals for full-season player totals. Preserve tied leaders. Resolve ownership at the final FS5 roster snapshot, including bench/reserve slots; an unrostered player earns no owner medal. A player's last appearance earlier in a season does not prove final-roster ownership.

Each approved record must contain `kind: 'ppr-medal'`, `owner`, `season`, `position`, `player_name`, `player_id`, numeric `points`, `leader_source`, and `ownership_source`. Retain source references sufficient to audit both the ranking and final roster. Do not put unverified example records in the live array.

The owner page adds these medals to existing shelves and opens their details in the existing keyboard-accessible dialog. Player name, position and season are rendered as text over the gold artwork so names remain accurate. The existing `OWNER_COLLECTIONS_VISIBLE = false` setting remains unchanged; the medals appear with other items when the locker is restored.

## Public leaderboard research

The following leaders were checked against FantasyPros full-season PPR total-point tables on September 24, 2026. Each player links to the corresponding season and position leaderboard. These establish the published leader identities under that provider's scoring; they do not establish final FS5 ownership or certify totals under FS5 scoring.

| Season | QB | RB | WR | TE |
| --- | --- | --- | --- | --- |
| 2019 | [Lamar Jackson](https://www.fantasypros.com/nfl/stats/qb.php?scoring=PPR&year=2019) | [Christian McCaffrey](https://www.fantasypros.com/nfl/stats/rb.php?scoring=PPR&year=2019) | [Michael Thomas](https://www.fantasypros.com/nfl/stats/wr.php?scoring=PPR&year=2019) | [Travis Kelce](https://www.fantasypros.com/nfl/stats/te.php?scoring=PPR&year=2019) |
| 2020 | [Josh Allen](https://www.fantasypros.com/nfl/stats/qb.php?scoring=PPR&year=2020) | [Alvin Kamara](https://www.fantasypros.com/nfl/stats/rb.php?scoring=PPR&year=2020) | [Davante Adams](https://www.fantasypros.com/nfl/stats/wr.php?scoring=PPR&year=2020) | [Travis Kelce](https://www.fantasypros.com/nfl/stats/te.php?scoring=PPR&year=2020) |
| 2021 | [Josh Allen](https://www.fantasypros.com/nfl/stats/qb.php?scoring=PPR&year=2021) | [Jonathan Taylor](https://www.fantasypros.com/nfl/stats/rb.php?scoring=PPR&year=2021) | [Cooper Kupp](https://www.fantasypros.com/nfl/stats/wr.php?scoring=PPR&year=2021) | [Mark Andrews](https://www.fantasypros.com/nfl/stats/te.php?scoring=PPR&year=2021) |
| 2022 | [Patrick Mahomes](https://www.fantasypros.com/nfl/stats/qb.php?scoring=PPR&year=2022) | [Austin Ekeler](https://www.fantasypros.com/nfl/stats/rb.php?scoring=PPR&year=2022) | [Justin Jefferson](https://www.fantasypros.com/nfl/stats/wr.php?scoring=PPR&year=2022) | [Travis Kelce](https://www.fantasypros.com/nfl/stats/te.php?scoring=PPR&year=2022) |
| 2023 | [Josh Allen](https://www.fantasypros.com/nfl/stats/qb.php?scoring=PPR&year=2023) | [Christian McCaffrey](https://www.fantasypros.com/nfl/stats/rb.php?scoring=PPR&year=2023) | [CeeDee Lamb](https://www.fantasypros.com/nfl/stats/wr.php?scoring=PPR&year=2023) | [Sam LaPorta](https://www.fantasypros.com/nfl/stats/te.php?scoring=PPR&year=2023) |
| 2024 | [Lamar Jackson](https://www.fantasypros.com/nfl/stats/qb.php?scoring=PPR&year=2024) | [Jahmyr Gibbs](https://www.fantasypros.com/nfl/stats/rb.php?scoring=PPR&year=2024) | [Ja'Marr Chase](https://www.fantasypros.com/nfl/stats/wr.php?scoring=PPR&year=2024) | [Brock Bowers](https://www.fantasypros.com/nfl/stats/te.php?scoring=PPR&year=2024) |
| 2025 | [Josh Allen](https://www.fantasypros.com/nfl/stats/qb.php?scoring=PPR&year=2025) | [Christian McCaffrey](https://www.fantasypros.com/nfl/stats/rb.php?scoring=PPR&year=2025) | [Puka Nacua](https://www.fantasypros.com/nfl/stats/wr.php?scoring=PPR&year=2025) | [Trey McBride](https://www.fantasypros.com/nfl/stats/te.php?scoring=PPR&year=2025) |

NFL.com provides [official historical season statistics](https://www.nfl.com/stats/player-stats/category/receiving/2024/reg/all/receivingreceptions/desc) for checking the underlying performance data. The legacy NFL Fantasy leaderboard URL tested during this research redirected to NFL fantasy news, so it was not used to certify the leader list.

Before engraving point totals or assigning medals, reconcile the provider's [scoring settings](https://www.fantasypros.com/scoring-settings/) with the intended award rules. PPR alone does not define passing, kicking or defense scoring. The linked scoring-settings page describes the provider's default half-PPR settings; the leader tables above explicitly select PPR. Kicker and DST winners still need a scoring-compatible validation decision. Full-season totals include the final NFL regular-season week even when FS5 competition ends earlier.

Remaining work: reconcile the archived roster matches below with canonical player IDs, resolve scoring and exact totals, and populate approved medal records. Keep the live awards list empty and the locker hidden until those requirements are met.


## Final FS5 owner cross-reference

The site-linked NFL Fantasy archives contain all 12 final-week team rosters in each season. Both `week` and `statWeek` were checked: week 16 for 2019–2020 and week 17 for 2021–2025. Players were matched in full roster text, including bench entries, rather than draft lists or their last earlier-season appearance. Each of the 28 leaders matched exactly one team. These establish ownership at the final FS5 competition-week snapshot; they do not claim later offseason transaction coverage.

Archive alias `CPA` is Max (team 9), supported by the site owner history for Double Dawgs, Mikes Brakes, Pompano Mokes and Certified Pipers Association. Archive alias `Michael` is Mike (team 4), supported by Maximum Brutality in the site owner history. Lowercase `matthew` is normalized to Matthew. The 2020 archive calls Max’s team Congrats David while the owner endpoint calls it Reigning Champion; the archive manager and persistent team ID identify the owner without relying on that differing team name.

| Season | QB | RB | WR | TE |
| --- | --- | --- | --- | --- |
| 2019 | Lamar Jackson → Max | Christian McCaffrey → Mike | Michael Thomas → Brycen | Travis Kelce → Keith |
| 2020 | Josh Allen → David | Alvin Kamara → Max | Davante Adams → Keith | Travis Kelce → Mike |
| 2021 | Josh Allen → Keith | Jonathan Taylor → Matthew | Cooper Kupp → Keith | Mark Andrews → Ethan |
| 2022 | Patrick Mahomes → Ethan | Austin Ekeler → Bailey | Justin Jefferson → Jordan | Travis Kelce → Keith |
| 2023 | Josh Allen → Keith | Christian McCaffrey → Max | CeeDee Lamb → Chris | Sam LaPorta → Max |
| 2024 | Lamar Jackson → Jordan | Jahmyr Gibbs → Bailey | Ja'Marr Chase → David | Brock Bowers → Jordan |
| 2025 | Josh Allen → Ethan | Christian McCaffrey → Jordan | Puka Nacua → Max | Trey McBride → Brycen |

[Machine-readable evidence](LOCKER_PPR_OWNER_MATCHES.json) preserves each archive URL, original roster URL, capture timestamp, owner alias, provider team ID, final roster week and leaderboard source. This research does not change the live medal list or locker visibility.
