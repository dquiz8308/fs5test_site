(function () {
    "use strict";

    var LEAGUE_ID = "1387297022695993344";
    var REFRESH_MS = 45000;
    var PLAYER_CACHE_MS = 24 * 60 * 60 * 1000;
    var state = {
        currentWeek: 1,
        selectedWeek: 1,
        rosters: [],
        users: [],
        league: {},
        rosterMap: new Map(),
        players: {},
        stats: {},
        projections: {},
        matchups: [],
        schedule: []
    };

    var $ = function (id) { return document.getElementById(id); };
    var weekSelect = $("week-select");
    var weekContext = $("week-context");
    var refreshButton = $("refresh-button");
    var grid = $("matchup-grid");
    var empty = $("empty-state");
    var status = $("live-status");
    var heading = $("scoreboard-heading");
    var kicker = $("scoreboard-kicker");
    var badge = $("week-badge");

    function api(path) {
        var url = "/.netlify/functions/sleeper?source=app&path=" + encodeURIComponent(path);
        return fetch(url, { cache: "no-store", headers: { "Accept": "application/json" } }).then(function (response) {
            return response.text().then(function (text) {
                var data = null;
                try { data = text ? JSON.parse(text) : null; } catch (e) {}
                if (!response.ok) throw new Error((data && data.error) || ("Sleeper API returned " + response.status));
                return data;
            });
        });
    }

    function optionalApi(paths) {
        var i = 0;
        function next() {
            if (i >= paths.length) return Promise.reject(new Error("Supplemental Sleeper feed unavailable"));
            return api(paths[i++]).catch(next);
        }
        return next();
    }

    function setStatus(text, kind) {
        status.textContent = text;
        status.className = "live-status" + (kind ? " is-" + kind : "");
    }

    // Use Sleeper's custom team image when one is set. Sleeper stores custom
    // team images in user.metadata.avatar. If none is set, fall back to the
    // user's normal Sleeper avatar, then the site logo as a final fallback.
    function sleeperTeamImageUrl(user) {
        var metadataAvatar = user && user.metadata && user.metadata.avatar;
        if (metadataAvatar) {
            var custom = String(metadataAvatar).trim();
            if (custom) {
                if (/^https?:\/\//i.test(custom)) return custom;
                if (/^\/\//.test(custom)) return 'https:' + custom;
                if (custom.charAt(0) === '/') return 'https://sleepercdn.com' + custom;
                return 'https://sleepercdn.com/' + custom.replace(/^\/+/, '');
            }
        }
        if (user && user.avatar) {
            return 'https://sleepercdn.com/avatars/' + encodeURIComponent(String(user.avatar));
        }
        return '/artwork/logo.png';
    }

    function avatarUrl(user) {
        return sleeperTeamImageUrl(user);
    }

    function teamImage(info, className) {
        var img = document.createElement("img");
        img.className = className || "team-avatar";
        img.src = info && info.avatar ? info.avatar : "/artwork/logo.png";
        img.alt = ""; img.width = 48; img.height = 48;
        var fallback = info && info.user && info.user.avatar ?
            "https://sleepercdn.com/avatars/" + encodeURIComponent(String(info.user.avatar)) :
            "/artwork/logo.png";
        img.onerror = function () {
            if (this.src !== fallback) {
                this.onerror = null;
                this.src = fallback;
            } else {
                this.onerror = null;
                this.src = "/artwork/logo.png";
            }
        };
        return img;
    }

    function playerImageUrl(playerId) {
        return "https://sleepercdn.com/content/nfl/players/thumb/" + encodeURIComponent(playerId) + ".jpg";
    }

    function teamName(user) {
        if (!user) return "FS5 Team";
        var metadataName = user.metadata && user.metadata.team_name;
        return String(metadataName || user.display_name || user.username || "FS5 Team").trim();
    }

    function buildRosterMap() {
        var usersById = new Map();
        state.users.forEach(function (user) {
            if (user && user.user_id != null) usersById.set(String(user.user_id), user);
        });
        state.rosterMap = new Map();
        state.rosters.forEach(function (roster) {
            if (!roster || roster.roster_id == null) return;
            var user = usersById.get(String(roster.owner_id));
            var settings = roster.settings || {};
            state.rosterMap.set(String(roster.roster_id), {
                roster: roster,
                user: user,
                teamName: teamName(user),
                account: user && user.username ? "@" + user.username : "",
                avatar: avatarUrl(user),
                ownerLogo: avatarUrl(user),
                wins: Number(settings.wins || 0),
                losses: Number(settings.losses || 0),
                ties: Number(settings.ties || 0),
                pf: Number(settings.fpts || 0),
                pa: Number(settings.fpts_against || 0)
            });
        });
    }

    function populateWeeks() {
        weekSelect.replaceChildren();
        for (var week = 1; week <= 17; week++) {
            var option = document.createElement("option");
            option.value = String(week);
            option.textContent = "Week " + week;
            weekSelect.appendChild(option);
        }
        weekSelect.disabled = false;
        weekSelect.value = String(state.selectedWeek);
    }

    function formatScore(value) {
        var number = Number(value);
        return Number.isFinite(number) ? number.toFixed(2) : "0.00";
    }

    function weekLabel(week) { return week <= 14 ? "Regular Season" : "Postseason"; }

    function playerName(id) {
        var p = state.players[String(id)];
        if (!p) return "Player " + id;
        return p.full_name || ((p.first_name || "") + " " + (p.last_name || "")).trim() || id;
    }

    function playerMeta(id) { return state.players[String(id)] || {}; }

    function directFantasyPoints(stats, scoring) {
        if (!stats || !scoring) return null;
        var total = 0;
        var used = false;
        Object.keys(scoring).forEach(function (key) {
            var rate = Number(scoring[key]);
            var value = Number(stats[key]);
            if (Number.isFinite(rate) && Number.isFinite(value)) {
                total += value * rate;
                if (rate !== 0 && value !== 0) used = true;
            }
        });
        return used || Object.keys(stats).length ? total : null;
    }

    function getPlayerPoints(id) {
        var s = state.stats && state.stats[String(id)];
        if (!s) return 0;
        var direct = s.pts_ppr;
        if (state.league && state.league.scoring_settings) direct = directFantasyPoints(s, state.league.scoring_settings);
        return Number.isFinite(Number(direct)) ? Number(direct) : 0;
    }

    function getProjection(id) {
        var p = state.projections && state.projections[String(id)];
        if (!p) return 0;
        var scoring = state.league && state.league.scoring_settings;
        var value = scoring ? directFantasyPoints(p, scoring) : null;
        if (value == null || !Number.isFinite(value)) {
            value = p.pts_ppr != null ? Number(p.pts_ppr) : (p.fantasy_points != null ? Number(p.fantasy_points) : 0);
        }
        return Number.isFinite(value) ? value : 0;
    }

    function renderPlayer(id, started) {
        var p = playerMeta(id);
        var pos = p.position || "--";
        var nflTeam = p.team || "FA";
        var injury = p.injury_status ? " · " + p.injury_status : "";
        var points = getPlayerPoints(id);
        var projection = getProjection(id);
        var row = document.createElement("button");
        row.type = "button";
        row.className = "player-row";
        row.innerHTML = '<img src="' + playerImageUrl(id) + '" alt="" onerror="this.onerror=null;this.src=\'/artwork/logo.png\';"><span class="player-main"><strong>' + esc(playerName(id)) + '</strong><small>' + esc(pos + " · " + nflTeam + injury) + '</small></span><span class="player-points"><b>' + formatScore(points) + '</b><small>Proj. ' + formatScore(projection) + '</small></span>';
        row.addEventListener("click", function () { openPlayerModal(id); });
        row.setAttribute("aria-label", "View " + playerName(id));
        return row;
    }

    function renderLineups(roster) {
        var wrap = document.createElement("div");
        wrap.className = "lineup-area";
        var starters = Array.isArray(roster.starters) ? roster.starters.filter(Boolean) : [];
        var allPlayers = Array.isArray(roster.players) ? roster.players.filter(Boolean) : [];
        var starterSet = new Set(starters.map(String));
        var bench = allPlayers.filter(function (id) { return !starterSet.has(String(id)); });

        var starterBox = document.createElement("div");
        starterBox.className = "lineup-box";
        starterBox.innerHTML = '<div class="lineup-title"><strong>Starting Lineup</strong><span>' + starters.length + ' players</span></div>';
        starters.forEach(function (id) { starterBox.appendChild(renderPlayer(id, true)); });
        if (!starters.length) starterBox.insertAdjacentHTML("beforeend", '<p class="muted">No starters returned by Sleeper.</p>');
        wrap.appendChild(starterBox);

        var benchDetails = document.createElement("details");
        benchDetails.className = "bench-details";
        var summary = document.createElement("summary");
        summary.textContent = "Bench · " + bench.length + " players";
        benchDetails.appendChild(summary);
        var benchBox = document.createElement("div");
        benchBox.className = "bench-list";
        bench.forEach(function (id) { benchBox.appendChild(renderPlayer(id, false)); });
        if (!bench.length) benchBox.innerHTML = '<p class="muted">No bench players returned.</p>';
        benchDetails.appendChild(benchBox);
        wrap.appendChild(benchDetails);
        return wrap;
    }

    function matchupProbability(a, b) {
        var rosterA = state.rosterMap.get(String(a.roster_id));
        var rosterB = state.rosterMap.get(String(b.roster_id));
        var scoreA = Number(a.points || 0);
        var scoreB = Number(b.points || 0);
        var remainingA = projectedRemaining(rosterA && rosterA.roster);
        var remainingB = projectedRemaining(rosterB && rosterB.roster);
        var meanA = scoreA + remainingA;
        var meanB = scoreB + remainingB;
        var sdA = Math.max(3, remainingA * 0.28);
        var sdB = Math.max(3, remainingB * 0.28);
        var z = (meanA - meanB) / Math.sqrt(sdA * sdA + sdB * sdB);
        var prob = 0.5 * (1 + erf(z / Math.sqrt(2)));
        if (!Number.isFinite(prob)) prob = 0.5;
        prob = Math.max(0.005, Math.min(0.995, prob));
        return { a: prob * 100, b: (1 - prob) * 100, meanA: meanA, meanB: meanB, remainingA: remainingA, remainingB: remainingB };
    }

    function projectedRemaining(roster) {
        if (!roster) return 0;
        var starters = Array.isArray(roster.starters) ? roster.starters.filter(Boolean) : [];
        return starters.reduce(function (sum, id) {
            var projection = getProjection(id);
            var current = getPlayerPoints(id);
            return sum + Math.max(0, projection - current);
        }, 0);
    }

    function erf(x) {
        var sign = x < 0 ? -1 : 1;
        x = Math.abs(x);
        var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
        var t = 1 / (1 + p * x);
        var y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
        return sign * y;
    }

    function appendPredictor(card, teams) {
        var pred = matchupProbability(teams[0], teams[1]);
        var aInfo = state.rosterMap.get(String(teams[0].roster_id));
        var bInfo = state.rosterMap.get(String(teams[1].roster_id));
        var section = document.createElement("div");
        section.className = "predictor";
        section.innerHTML = '<div class="predictor-head"><div><strong>Live Predictor</strong><span class="model-tag">FS5 model · current score + projected remaining production</span></div><span class="predictor-note">Projected: ' + formatScore(pred.meanA) + ' – ' + formatScore(pred.meanB) + '</span></div>' +
            '<div class="prob-wrap"><div class="prob-labels"><b>' + esc(aInfo ? aInfo.teamName : "Team A") + ' ' + pred.a.toFixed(0) + '%</b><span>WIN PROBABILITY</span><b>' + pred.b.toFixed(0) + '% ' + esc(bInfo ? bInfo.teamName : "Team B") + '</b></div><div class="prob-track"><div class="prob-fill" style="width:' + pred.a.toFixed(2) + '%"></div><div class="prob-thumb" style="left:' + pred.a.toFixed(2) + '%"></div></div><div class="prob-sub">Remaining projection: ' + formatScore(pred.remainingA) + ' vs ' + formatScore(pred.remainingB) + '</div></div>';
        card.appendChild(section);
    }

    function scheduleGameForTeam(team) {
        if (!team || !state.schedule || !state.schedule.length) return null;
        var t = String(team).toUpperCase();
        return state.schedule.find(function (game) {
            return String(game.home || "").toUpperCase() === t || String(game.away || "").toUpperCase() === t;
        }) || null;
    }

    function playerAvailableTimePct(playerIds) {
        var values = [];
        (playerIds || []).filter(Boolean).forEach(function (id) {
            var meta = playerMeta(id);
            var team = meta && meta.team;
            var game = scheduleGameForTeam(team);
            if (!game) return;

            var status = String(game.status || "").toLowerCase();
            if (status === "complete") {
                values.push(0);
                return;
            }
            if (status === "pre_game" || status === "scheduled" || status === "pregame") {
                values.push(100);
                return;
            }

            if (status === "in_game" || status === "in progress" || status === "in_progress") {
                var start = Date.parse(game.start_time || "");
                if (Number.isFinite(start)) {
                    // NFL games average roughly 3h 15m from kickoff to completion.
                    var total = 195 * 60 * 1000;
                    values.push(Math.max(0, Math.min(100, ((start + total) - Date.now()) / total * 100)));
                } else {
                    values.push(50);
                }
                return;
            }

            values.push(50);
        });

        if (!values.length) return null;
        return Math.round(values.reduce(function (a,b) { return a + b; }, 0) / values.length);
    }

    function appendPlayingTimeBar(text, starters) {
        var pct = playerAvailableTimePct(starters);
        if (pct == null) return;

        var wrap = document.createElement("div");
        wrap.className = "playing-time-wrap";
        wrap.title = "Estimated available playing time remaining for active players";

        var label = document.createElement("div");
        label.className = "playing-time-label";
        label.innerHTML = "<span>Available Playing Time</span><strong>" + pct + "%</strong>";

        var track = document.createElement("div");
        track.className = "playing-time-track";

        var fill = document.createElement("div");
        fill.className = "playing-time-fill";
        fill.style.width = pct + "%";

        track.appendChild(fill);
        wrap.appendChild(label);
        wrap.appendChild(track);
        text.appendChild(wrap);
    }

    function renderMatchups(matchups, week) {
        grid.replaceChildren();
        kicker.textContent = "WEEK " + week;
        heading.textContent = weekLabel(week);
        badge.textContent = "Week " + week;
        state.matchups = Array.isArray(matchups) ? matchups : [];
        var groups = new Map();
        state.matchups.forEach(function (item) {
            if (!item || item.matchup_id == null) return;
            var key = String(item.matchup_id);
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(item);
        });
        if (!groups.size) {
            grid.hidden = true; empty.hidden = false; empty.textContent = "No matchup data is available for this week."; return;
        }
        grid.hidden = false; empty.hidden = true;
        Array.from(groups.entries()).sort(function (a, b) { return Number(a[0]) - Number(b[0]); }).forEach(function (entry) {
            var teams = entry[1].slice(0, 2);
            if (teams.length < 2) return;
            var card = document.createElement("article");
            card.className = "matchup-card matchup-card--clickable";
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", "Open matchup " + entry[0]);
            var head = document.createElement("div");
            head.className = "matchup-card__head";
            head.innerHTML = '<span>Matchup ' + esc(entry[0]) + '</span><span class="matchup-card__state' + (week === state.currentWeek ? ' is-current' : '') + '">' + (week === state.currentWeek ? 'LIVE' : (week < state.currentWeek ? 'FINAL' : 'UPCOMING')) + '</span>';
            card.appendChild(head);
            teams.forEach(function (matchup, index) {
                var info = state.rosterMap.get(String(matchup.roster_id));
                var team = document.createElement("div"); team.className = "matchup-team";
                var identity = document.createElement("div"); identity.className = "team-identity";
                var img = teamImage(info, "team-avatar");
                var text = document.createElement("div");
                var name = document.createElement("h3"); name.textContent = info ? info.teamName : "Roster " + matchup.roster_id; text.appendChild(name);
                var account = document.createElement("span"); account.textContent = info && info.account ? info.account : ""; text.appendChild(account);
                var record = document.createElement("small"); record.textContent = info ? "Record: " + info.wins + "-" + info.losses + "-" + info.ties : ""; text.appendChild(record);
                appendPlayingTimeBar(text, matchup.starters || (info && info.roster && info.roster.starters) || []);
                identity.appendChild(img); identity.appendChild(text);
                var scoreBox = document.createElement("div"); scoreBox.className = "score-box"; scoreBox.innerHTML = '<strong>' + formatScore(matchup.points) + '</strong><span>points</span>';
                team.appendChild(identity); team.appendChild(scoreBox); card.appendChild(team);
                if (index === 0) { var divider = document.createElement("div"); divider.className = "vs-divider"; divider.innerHTML = '<span>VS</span>'; card.appendChild(divider); }
            });
            appendPredictor(card, teams);
            var hint = document.createElement("div"); hint.className = "matchup-hint"; hint.textContent = "Click matchup to view lineups · bench · player details"; card.appendChild(hint);
            function open() { openMatchupModal(teams, entry[0], week); }
            card.addEventListener("click", open);
            card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
            grid.appendChild(card);
        });
    }

    function modalShell() {
        var modal = $("matchup-modal");
        if (!modal) return null;
        return modal;
    }

    function openMatchupModal(teams, matchupId, week) {
        var modal = modalShell(); if (!modal) return;
        var body = $("matchup-modal-body");
        body.replaceChildren();
        var title = document.createElement("div"); title.className = "modal-matchup-title";
        var aInfo = state.rosterMap.get(String(teams[0].roster_id)); var bInfo = state.rosterMap.get(String(teams[1].roster_id));
        title.innerHTML = '<span>Matchup ' + esc(matchupId) + ' · Week ' + week + '</span><strong>' + formatScore(teams[0].points) + ' — ' + formatScore(teams[1].points) + '</strong>';
        body.appendChild(title);
        var matchupPred = matchupProbability(teams[0], teams[1]);
        var pred = document.createElement("div"); pred.className = "modal-predictor";
        pred.innerHTML = '<div class="modal-predictor__head"><strong>Enhanced Live Predictor</strong><span>FS5 model</span></div><div class="modal-prob-labels"><b>' + esc(aInfo ? aInfo.teamName : "Team A") + ' ' + matchupPred.a.toFixed(1) + '%</b><b>' + matchupPred.b.toFixed(1) + '% ' + esc(bInfo ? bInfo.teamName : "Team B") + '</b></div><div class="modal-prob-track"><div class="modal-prob-fill" style="width:' + matchupPred.a.toFixed(2) + '%"></div><div class="modal-prob-thumb" style="left:' + matchupPred.a.toFixed(2) + '%"></div></div><div class="modal-prob-meta">Projected final: <strong>' + formatScore(matchupPred.meanA) + ' – ' + formatScore(matchupPred.meanB) + '</strong> · Remaining: ' + formatScore(matchupPred.remainingA) + ' – ' + formatScore(matchupPred.remainingB) + '</div>';
        body.appendChild(pred);
        var columns = document.createElement("div"); columns.className = "modal-lineups";
        [teams[0], teams[1]].forEach(function (team) {
            var info = state.rosterMap.get(String(team.roster_id));
            var col = document.createElement("section"); col.className = "modal-team-column";
            var roster = info && info.roster;
            col.innerHTML = '<div class="modal-team-header"><img src="' + esc(info && info.avatar ? info.avatar : '/artwork/logo.png') + '" alt=""><div><h3>' + esc(info ? info.teamName : 'Roster ' + team.roster_id) + '</h3><span>' + esc(info && info.account ? info.account : '') + '</span></div><strong>' + formatScore(team.points) + '</strong></div>';
            var starters = Array.isArray(roster && roster.starters) ? roster.starters.filter(Boolean) : [];
            var all = Array.isArray(roster && roster.players) ? roster.players.filter(Boolean) : [];
            var set = new Set(starters.map(String));
            var bench = all.filter(function (id) { return !set.has(String(id)); });
            var startHeading = document.createElement("h4"); startHeading.textContent = "STARTERS"; col.appendChild(startHeading);
            starters.forEach(function (id) { col.appendChild(renderPlayer(id, true)); });
            var benchDetails = document.createElement("details"); benchDetails.className = "modal-bench"; var summary = document.createElement("summary"); summary.textContent = "BENCH · " + bench.length; benchDetails.appendChild(summary); var bl = document.createElement("div"); bench.forEach(function (id) { bl.appendChild(renderPlayer(id, false)); }); benchDetails.appendChild(bl); col.appendChild(benchDetails);
            columns.appendChild(col);
        });
        body.appendChild(columns);
        modal.hidden = false; document.body.classList.add("modal-open"); $("matchup-modal-close").focus();
    }

    function loadPlayerNews(id) {
        var p = playerMeta(id) || {};
        var name = playerName(id);
        var team = p.team || '';
        var section = document.createElement('section');
        section.className = 'player-news';
        section.innerHTML = '<div class="player-news__head"><h4>Latest News</h4><span>Recent web coverage</span></div><div class="player-news__body"><p class="muted">Loading news…</p></div>';
        var body = section.querySelector('.player-news__body');
        fetch('/.netlify/functions/sleeper?source=news&player=' + encodeURIComponent(name) + '&team=' + encodeURIComponent(team), { cache: 'no-store', headers: { 'Accept': 'application/json' } })
            .then(function (response) {
                return response.text().then(function (text) {
                    var data = {};
                    try { data = text ? JSON.parse(text) : {}; } catch (e) {}
                    if (!response.ok) throw new Error(data.error || 'Unable to load player news.');
                    return data;
                });
            })
            .then(function (data) {
                var items = Array.isArray(data.items) ? data.items : [];
                body.replaceChildren();
                if (!items.length) {
                    body.innerHTML = '<p class="muted">No recent news found for this player.</p>';
                    return;
                }
                items.forEach(function (item) {
                    var article = document.createElement('article');
                    article.className = 'player-news__item';
                    var link = document.createElement('a');
                    link.href = item.link || '#'; link.target = '_blank'; link.rel = 'noopener noreferrer';
                    link.textContent = item.title || 'Latest player news';
                    var meta = document.createElement('div');
                    meta.className = 'player-news__meta';
                    var source = item.source || 'News';
                    var date = item.pubDate ? new Date(item.pubDate) : null;
                    var dateText = date && !isNaN(date.getTime()) ? date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '';
                    meta.textContent = source + (dateText ? ' · ' + dateText : '');
                    article.appendChild(link); article.appendChild(meta); body.appendChild(article);
                });
            })
            .catch(function (error) {
                body.innerHTML = '<p class="muted">News is temporarily unavailable. ' + esc(error.message || '') + '</p>';
            });
        return section;
    }

    function openPlayerModal(id) {
        var modal = $("player-modal"); if (!modal) return;
        var p = playerMeta(id); var body = $("player-modal-body");
        var stats = state.stats && state.stats[String(id)] || {};
        body.replaceChildren();
        var detail = document.createElement('div'); detail.className = 'player-detail';
        detail.innerHTML = '<img class="player-detail__image" src="' + playerImageUrl(id) + '" alt="" onerror="this.onerror=null;this.src=\'/artwork/logo.png\';"><div><h2>' + esc(playerName(id)) + '</h2><p class="player-detail__team">' + esc((p.position || '--') + ' · ' + (p.team || 'FA') + (p.injury_status ? ' · ' + p.injury_status : '')) + '</p><div class="player-detail__chips"><span>Current ' + formatScore(getPlayerPoints(id)) + '</span><span>Projection ' + formatScore(getProjection(id)) + '</span></div></div>';
        body.appendChild(detail);
        var meta = document.createElement('dl'); meta.className = 'player-meta';
        meta.innerHTML = '<div><dt>Age</dt><dd>' + esc(p.age || '--') + '</dd></div><div><dt>Experience</dt><dd>' + esc(p.years_exp != null ? p.years_exp + ' yrs' : '--') + '</dd></div><div><dt>College</dt><dd>' + esc(p.college || '--') + '</dd></div><div><dt>Jersey</dt><dd>' + esc(p.number || '--') + '</dd></div><div><dt>Status</dt><dd>' + esc(p.status || '--') + '</dd></div><div><dt>Depth Chart</dt><dd>' + esc(p.depth_chart_position || '--') + '</dd></div>';
        body.appendChild(meta);
        body.appendChild(loadPlayerNews(id));
        var statEntries = Object.entries(stats || {}).filter(function (entry) {
            return entry[1] != null && entry[1] !== '' && Number(entry[1]) !== 0 && entry[0] !== 'pts_ppr' && entry[0] !== 'pts_half_ppr' && entry[0] !== 'pts_std';
        });
        if (statEntries.length) {
            var statsHeading = document.createElement('h4'); statsHeading.textContent = 'Weekly Stats'; body.appendChild(statsHeading);
            var statsGrid = document.createElement('div'); statsGrid.className = 'player-stats-grid';
            var labels = { pass_att:'Pass Attempts', pass_cmp:'Completions', pass_yd:'Pass Yards', pass_td:'Pass TDs', pass_int:'Interceptions', rush_att:'Rush Attempts', rush_yd:'Rush Yards', rush_td:'Rush TDs', rec:'Receptions', rec_yd:'Receiving Yards', rec_td:'Receiving TDs', rec_tgt:'Targets', fum:'Fumbles', fum_lost:'Fumbles Lost', two_pt:'2-Point Conversions', bonus_100_rush_yd:'100+ Rush Bonus', bonus_100_rec_yd:'100+ Rec Bonus', bonus_300_pass_yd:'300+ Pass Bonus' };
            statEntries.sort(function(a,b){ return (labels[a[0]] || a[0]).localeCompare(labels[b[0]] || b[0]); }).forEach(function(entry) {
                var cell = document.createElement('div'); cell.className = 'player-stat-cell';
                var label = document.createElement('span'); label.textContent = labels[entry[0]] || entry[0].replace(/_/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
                var value = document.createElement('strong'); value.textContent = Number.isFinite(Number(entry[1])) ? String(Number(entry[1])) : String(entry[1]);
                cell.appendChild(label); cell.appendChild(value); statsGrid.appendChild(cell);
            });
            body.appendChild(statsGrid);
        }
        modal.hidden = false; document.body.classList.add("modal-open"); $("player-modal-close").focus();
    }

    function closeModals() { document.querySelectorAll(".fs5-modal").forEach(function (m) { m.hidden = true; }); document.body.classList.remove("modal-open"); }

    function esc(value) { return String(value == null ? "" : value).replace(/[&<>'"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]; }); }

    function loadPlayerCache() {
        var ids = new Set();
        state.matchups.forEach(function (m) {
            (Array.isArray(m && m.players) ? m.players : []).forEach(function (id) { if (id != null) ids.add(String(id)); });
            (Array.isArray(m && m.starters) ? m.starters : []).forEach(function (id) { if (id != null) ids.add(String(id)); });
        });
        var list = Array.from(ids);
        if (!list.length) { state.players = {}; return Promise.resolve(true); }

        // Cache only the players needed for this week's matchups. This avoids
        // downloading Sleeper's very large full NFL player catalog to the browser.
        var cacheKey = "fs5_sleeper_players_" + list.slice().sort().join(",");
        try {
            var cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
            if (cached && cached.saved && Date.now() - cached.saved < PLAYER_CACHE_MS && cached.players) {
                state.players = cached.players;
                return Promise.resolve(true);
            }
        } catch (e) {}

        return fetch("/.netlify/functions/sleeper?source=players&ids=" + encodeURIComponent(list.join(",")), {
            cache: "no-store",
            headers: { "Accept": "application/json" }
        }).then(function (response) {
            return response.text().then(function (text) {
                var data = {};
                try { data = text ? JSON.parse(text) : {}; } catch (e) {}
                if (!response.ok) throw new Error((data && data.error) || "Unable to load player names");
                state.players = data || {};
                try { localStorage.setItem(cacheKey, JSON.stringify({ saved: Date.now(), players: state.players })); } catch (e) {}
                return true;
            });
        }).catch(function (e) {
            console.warn("FS5 player-name feed unavailable", e);
            state.players = {};
            return false;
        });
    }

    function loadSupplemental(week) {
        var season = 2026;
        var statsPaths = ["/stats/nfl/regular/" + season + "/" + week, "/stats/nfl/" + season + "/" + week + "?season_type=regular"];
        var projectionPaths = ["/projections/nfl/regular/" + season + "/" + week, "/projections/nfl/" + season + "/" + week + "?season_type=regular"];
        return Promise.allSettled([loadPlayerCache(), optionalApi(statsPaths).catch(function () { return {}; }), optionalApi(projectionPaths).catch(function () { return {}; })]).then(function (results) {
            state.stats = results[1].status === "fulfilled" && results[1].value ? results[1].value : {};
            state.projections = results[2].status === "fulfilled" && results[2].value ? results[2].value : {};
            renderMatchups(state.matchups, week);
        });
    }

    async function loadWeek(week) {
        grid.setAttribute("aria-busy", "true");
        weekContext.textContent = "Loading Week " + week + "...";
        try {
            var matchups = await api("/league/" + LEAGUE_ID + "/matchups/" + week);
            state.selectedWeek = week; weekSelect.value = String(week);
            renderMatchups(matchups, week);
            weekContext.textContent = week === state.currentWeek ? "Current week · live scoring · auto-refresh every 45 seconds" : "2026 season · " + weekLabel(week);
            setStatus(week === state.currentWeek ? "Live · Sleeper connected" : "Historical week", week === state.currentWeek ? "live" : "");
            loadSupplemental(week).catch(function (e) { console.warn("FS5 supplemental Sleeper feeds unavailable", e); });
        } catch (error) {
            console.error("FS5 Sleeper matchup request failed", error);
            grid.replaceChildren(); grid.hidden = true; empty.hidden = false; empty.textContent = "Sleeper matchup data could not be loaded. Please try again.";
            weekContext.textContent = "Unable to load Week " + week + ". " + (error.message || "Unknown Sleeper error"); setStatus("Sleeper connection error", "error");
        } finally { grid.setAttribute("aria-busy", "false"); }
    }

    async function initialize() {
        setStatus("Connecting to Sleeper...");
        try {
            var results = await Promise.all([api("/state/nfl"), api("/league/" + LEAGUE_ID + "/rosters"), api("/league/" + LEAGUE_ID + "/users"), api("/schedule/nfl/regular/2026").catch(function () { return []; })]);
            var nflState = results[0] || {};
            state.currentWeek = Number(nflState.display_week || nflState.week || 1);
            state.selectedWeek = state.currentWeek;
            state.rosters = Array.isArray(results[1]) ? results[1] : [];
            state.users = Array.isArray(results[2]) ? results[2] : [];
            state.schedule = Array.isArray(results[3]) ? results[3] : [];
            buildRosterMap(); populateWeeks();
            api("/league/" + LEAGUE_ID).then(function (league) { state.league = league || {}; }).catch(function () { state.league = {}; });
            await loadWeek(state.currentWeek);
        } catch (error) {
            console.error("FS5 Sleeper initialization failed", error);
            weekContext.textContent = "Unable to load league data. " + (error.message || "Unknown Sleeper error"); setStatus("Sleeper connection error", "error");
        }
    }

    weekSelect.addEventListener("change", function () { loadWeek(Number(this.value)); });
    refreshButton.addEventListener("click", function () { loadWeek(state.selectedWeek); });
    document.addEventListener("click", function (e) {
        if (e.target.matches("[data-close-modal]")) closeModals();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModals(); });
    setInterval(function () { if (document.visibilityState === "visible" && state.selectedWeek === state.currentWeek) loadWeek(state.currentWeek); }, REFRESH_MS);
    initialize();
})();
