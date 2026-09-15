(function () {
    "use strict";

    var LEAGUE_ID = "1387297022695993344";
    var REFRESH_MS = 10000;
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
        schedule: [],
        nflGames: [],
        previousScores: {},
        previousStats: {},
        reactionTimers: {},
        previousProbabilities: {},
        previousPlayerPoints: {},
        eventHistory: [],
        broadcastCycle: 0,
        lowerThirdTimer: null,
        snapshot: null,
        gameFlow: {}
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

    function scoreboardApi(week) {
        var url = "/.netlify/functions/sleeper?source=scoreboard&week=" + encodeURIComponent(week) + "&season=2026";
        return fetch(url, { cache: "no-store", headers: { "Accept": "application/json" } }).then(function (response) {
            return response.text().then(function (text) {
                var data = [];
                try { data = text ? JSON.parse(text) : []; } catch (e) {}
                if (!response.ok) throw new Error((data && data.error) || "NFL scoreboard unavailable");
                return Array.isArray(data) ? data : [];
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

    function getPreviousPlayerPoints(id) {
        var s = state.previousStats && state.previousStats[String(id)];
        if (!s) return null;
        var scoring = state.league && state.league.scoring_settings;
        var direct = scoring ? directFantasyPoints(s, scoring) : (s.pts_ppr != null ? Number(s.pts_ppr) : null);
        return direct == null || !Number.isFinite(Number(direct)) ? null : Number(direct);
    }

    function playerIsMatchupMvp(id) {
        var target = String(id);
        var best = null;
        var found = false;
        state.matchups.forEach(function (m) {
            if (getTeamPlayerIds(m).some(function (pid) { return String(pid) === target; })) found = true;
        });
        if (!found) return false;
        state.matchups.forEach(function (m) {
            var k = matchupKey(m);
            if (!k) return;
            var containing = getTeamPlayerIds(m);
            if (!containing.some(function (pid) { return String(pid) === target; })) return;
            var opponent = state.matchups.find(function (x) { return matchupKey(x) === k && String(x.roster_id) !== String(m.roster_id); });
            if (!opponent) return;
            [m, opponent].forEach(function (tm) {
                getTeamPlayerIds(tm).forEach(function (pid) {
                    var pts = getPlayerPoints(pid);
                    if (!best || pts > best.points) best = { id: String(pid), points: pts };
                });
            });
        });
        return !!best && best.id === target && best.points > 0;
    }

    function playerGameIsFinal(id) {
        var p = playerMeta(id) || {};
        var game = scheduleGameForTeam(p.team, state.selectedWeek);
        return gameStatus(game) === "complete";
    }

    function playerTrendBadge(id) {
        var points = getPlayerPoints(id), projection = getProjection(id), prev = getPreviousPlayerPoints(id);
        var badges = [];
        if (points === 0 && playerGameIsFinal(id)) badges.push('<span class="player-trend player-trend--snow" title="Final game · 0 fantasy points">❄️</span>');
        if (playerIsMatchupMvp(id)) badges.push('<span class="player-trend player-trend--mvp">👑</span>');
        var td = playerTouchdownDelta(id);
        if (td > 0) badges.push('<span class="player-trend player-trend--td">🏈🔥</span>');
        else if (prev != null && points - prev >= 8) badges.push('<span class="player-trend player-trend--hot">🔥</span>');
        if (projection > 0 && points > projection) badges.push('<span class="player-trend player-trend--over">🔥</span>');
        else if (projection >= 8 && points < projection * 0.5 && projection - points >= 5) badges.push('<span class="player-trend player-trend--bust">💀</span>');
        return badges.join('');
    }

    function playerGameStartMs(game) {
        if (!game) return NaN;
        var candidates = [game.start_time, game.startTime, game.start, game.scheduled, game.kickoff, game.datetime, game.date];
        for (var i = 0; i < candidates.length; i++) {
            var value = candidates[i];
            if (value == null || value === "") continue;
            if (typeof value === "number") {
                var n = value < 100000000000 ? value * 1000 : value;
                if (Number.isFinite(n)) return n;
            }
            var parsed = Date.parse(String(value));
            if (Number.isFinite(parsed)) return parsed;
        }
        return NaN;
    }

    function playerGameInfo(id) {
        var p = playerMeta(id) || {};
        var game = scheduleGameForTeam(p.team, state.selectedWeek);
        if (!game) return null;
        var status = gameStatus(game);
        var start = playerGameStartMs(game);
        var dateText = Number.isFinite(start) ? new Date(start).toLocaleDateString("en-US", { timeZone: "America/New_York", weekday: "short", month: "short", day: "numeric" }) : "Date TBD";
        var timeText = Number.isFinite(start) && /(?:T|\s)\d{2}:\d{2}/.test(String(game.start_time || game.startTime || game.start || game.scheduled || game.kickoff || game.datetime || game.date || ""))
            ? new Date(start).toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit" }) + " ET"
            : "Time TBD";
        var home = String(game.home || game.home_team || game.homeTeam || "").toUpperCase();
        var away = String(game.away || game.away_team || game.awayTeam || "").toUpperCase();
        var team = String(p.team || "").toUpperCase();
        var opponent = team === home ? away : (team === away ? home : "");
        var venueText = opponent ? (team === home ? "vs " : "@ ") + opponent : "";
        var stateText = status === "complete" ? "FINAL" : status === "in_game" ? "LIVE" : "UPCOMING";
        var stateClass = status === "complete" ? "final" : status === "in_game" ? "live" : "upcoming";
        var scoreText = "";
        if (status === "in_game") scoreText = [game.period ? "Q" + game.period : "", game.clock || ""].filter(Boolean).join(" · ");
        if ((status === "in_game" || status === "complete") && game.home_score != null && game.away_score != null) scoreText += (scoreText ? " · " : "") + away + " " + game.away_score + " – " + home + " " + game.home_score;
        return { game: game, status: status, stateText: stateText, stateClass: stateClass, dateText: dateText, timeText: timeText, venueText: venueText, scoreText: scoreText };
    }

    function renderPlayer(id, started, showGameData) {
        var p = playerMeta(id);
        var pos = p.position || "--";
        var nflTeam = p.team || "FA";
        var injury = p.injury_status ? " · " + p.injury_status : "";
        var points = getPlayerPoints(id);
        var projection = getProjection(id);
        var row = document.createElement("button");
        row.type = "button";
        row.className = "player-row" + (showGameData ? " player-row--game-data" : "");
        var gameInfo = showGameData ? playerGameInfo(id) : null;
        var gameMarkup = gameInfo ? '<span class="player-game-info player-game-info--' + gameInfo.stateClass + '"><b>' + esc(gameInfo.stateText) + '</b><span>' + esc(gameInfo.dateText + " · " + gameInfo.timeText + (gameInfo.venueText ? " · " + gameInfo.venueText : "") + (gameInfo.scoreText ? " · " + gameInfo.scoreText : "")) + '</span></span>' : '';
        row.innerHTML = '<img src="' + playerImageUrl(id) + '" alt="" onerror="this.onerror=null;this.src=\'/artwork/logo.png\';"><span class="player-main"><strong>' + esc(playerName(id)) + ' ' + playerTrendBadge(id) + '</strong><small>' + esc(pos + " · " + nflTeam + injury) + '</small>' + gameMarkup + '</span><span class="player-points"><b>' + formatScore(points) + '</b><small>Proj. ' + formatScore(projection) + '</small></span>';
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

    function gameStatus(game) {
        if (!game) return '';
        var raw = game.status;
        if (raw && typeof raw === 'object') raw = raw.type || raw.name || raw.state || raw.detail || '';
        var status = String(raw || '').toLowerCase().replace(/[\s-]+/g, '_');
        if (status === 'final' || status === 'post' || status === 'post_game' || status === 'complete' || status === 'completed') return 'complete';
        if (status === 'in_game' || status === 'in_progress' || status === 'inprogress' || status === 'live' || status === 'playing') return 'in_game';
        if (status === 'pre_game' || status === 'pregame' || status === 'scheduled' || status === 'upcoming' || status === 'pre') return 'pre_game';

        var start = gameStartMs(game);
        if (Number.isFinite(start)) {
            if (Date.now() < start) return 'pre_game';
            // If a game has been underway for more than four hours, treat it as complete
            // even if the schedule feed did not update its status yet.
            if (Date.now() >= start + (4 * 60 * 60 * 1000)) return 'complete';
            return 'in_game';
        }
        return '';
    }

    function gameStartMs(game) {
        if (!game) return NaN;
        var candidates = [game.start_time, game.startTime, game.start, game.scheduled, game.kickoff, game.datetime, game.date];
        for (var i = 0; i < candidates.length; i++) {
            var value = candidates[i];
            if (value == null || value === '') continue;
            if (typeof value === 'number') {
                var n = value < 100000000000 ? value * 1000 : value;
                if (Number.isFinite(n)) return n;
            }
            var parsed = Date.parse(String(value));
            if (Number.isFinite(parsed)) return parsed;
        }
        // Sleeper's regular-season schedule normally provides a calendar date,
        // not a kickoff clock. Use a conservative NFL slot estimate so a date-only
        // schedule never gets interpreted as midnight and marked complete too early.
        if (game.date) {
            var parts = String(game.date).slice(0,10).split('-').map(Number);
            if (parts.length === 3 && parts.every(Number.isFinite)) {
                var y=parts[0], mo=parts[1]-1, d=parts[2];
                var day=new Date(y,mo,d).getDay();
                var hour=13, minute=0;
                if (day===1) { hour=20; minute=15; }
                else if (day===4) { hour=20; minute=15; }
                else if (day===6) { hour=16; minute=30; }
                else if (day===5) { hour=20; minute=0; }
                else if (day===0) { hour=13; minute=0; }
                return new Date(y,mo,d,hour,minute,0,0).getTime();
            }
        }
        return NaN;
    }

    function projectedRemaining(roster) {
        if (!roster) return 0;
        var starters = Array.isArray(roster.starters) ? roster.starters.filter(Boolean) : [];
        return starters.reduce(function (sum, id) {
            var meta = playerMeta(id);
            var game = scheduleGameForTeam(meta && meta.team);
            var status = gameStatus(game);
            var projection = getProjection(id);
            var current = getPlayerPoints(id);

            // A finished NFL game has zero fantasy production remaining.
            if (status === 'complete') return sum;

            // Unknown schedule data: preserve the projection rather than inventing a game state.
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
        section.innerHTML = '<div class="predictor-head"><div><strong>Live Predictor</strong><span class="model-tag">FS5 model · current score + projected remaining production</span></div><span class="predictor-note">Live projection: ' + formatScore(pred.meanA) + ' – ' + formatScore(pred.meanB) + '</span></div>' +
            '<div class="prob-wrap"><div class="prob-labels"><b>' + esc(aInfo ? aInfo.teamName : "Team A") + ' ' + pred.a.toFixed(0) + '%</b><span>WIN PROBABILITY</span><b>' + pred.b.toFixed(0) + '% ' + esc(bInfo ? bInfo.teamName : "Team B") + '</b></div><div class="prob-track"><div class="prob-fill" style="width:' + pred.a.toFixed(2) + '%"></div><div class="prob-thumb" style="left:' + pred.a.toFixed(2) + '%"></div></div><div class="prob-sub">Remaining projection: ' + formatScore(pred.remainingA) + ' vs ' + formatScore(pred.remainingB) + '</div></div>';
        card.appendChild(section);
    }

    function scheduleGameForTeam(team, week) {
        if (!team) return null;
        var t = String(team).toUpperCase();
        var targetWeek = Number(week != null ? week : state.selectedWeek);
        var pools = [state.nflGames || [], state.schedule || []];
        for (var pi=0; pi<pools.length; pi++) {
            var games = pools[pi].filter(function (game) {
                var home = String(game.home || game.home_team || game.homeTeam || '').toUpperCase();
                var away = String(game.away || game.away_team || game.awayTeam || '').toUpperCase();
                var gameWeek = Number(game.week);
                return (home === t || away === t) && (!Number.isFinite(targetWeek) || !Number.isFinite(gameWeek) || gameWeek === targetWeek);
            });
            games.sort(function(a,b){ return gameStartMs(a)-gameStartMs(b); });
            if (games.length) return games[0];
        }
        return null;
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

    function statNumber(stats, keys) {
        for (var i = 0; i < keys.length; i++) {
            var value = stats && stats[keys[i]];
            if (Number.isFinite(Number(value))) return Number(value);
        }
        return 0;
    }

    function teamHasNewTouchdown(matchup) {
        var roster = state.rosterMap.get(String(matchup.roster_id));
        var ids = new Set();
        var players = (roster && roster.roster && Array.isArray(roster.roster.players)) ? roster.roster.players : [];
        var starters = Array.isArray(matchup.starters) ? matchup.starters : [];
        players.concat(starters).forEach(function (id) { if (id != null) ids.add(String(id)); });
        var tdKeys = ["rec_td", "rush_td", "pass_td", "def_td", "fum_td", "st_td", "kr_td", "pr_td"];
        for (var id of ids) {
            var now = state.stats && state.stats[id];
            var before = state.previousStats && state.previousStats[id];
            if (!now || !before) continue;
            var nowTd = tdKeys.reduce(function (sum, key) { return sum + statNumber(now, [key]); }, 0);
            var beforeTd = tdKeys.reduce(function (sum, key) { return sum + statNumber(before, [key]); }, 0);
            if (nowTd > beforeTd) return true;
        }
        return false;
    }

    function getScoreReaction(matchup, week) {
        if (week !== state.currentWeek) return null;
        var key = String(matchup.roster_id);
        var now = Number(matchup.points || 0);
        var previous = state.previousScores[key];
        var delta = previous == null ? 0 : now - Number(previous);

        // Check for a new TD independently of the score delta. Sleeper can update
        // the matchup score before the player stat feed reports the touchdown.
        // This lets the animation fire on the next refresh instead of being missed.
        if (teamHasNewTouchdown(matchup)) return { type: "touchdown", delta: delta };

        if (previous == null || !Number.isFinite(Number(previous))) return null;
        if (Math.abs(delta) < 0.001) return null;
        return { type: delta > 0 ? "up" : "down", delta: delta };
    }

    function matchupKey(matchup) { return String(matchup && matchup.matchup_id != null ? matchup.matchup_id : ""); }

    function teamLabel(matchup) {
        var info = state.rosterMap.get(String(matchup.roster_id));
        return info ? info.teamName : "Roster " + matchup.roster_id;
    }

    function getTeamPlayerIds(matchup) {
        var info = state.rosterMap.get(String(matchup.roster_id));
        var roster = info && info.roster;
        var ids = Array.isArray(matchup.starters) ? matchup.starters.filter(Boolean) : (roster && Array.isArray(roster.starters) ? roster.starters.filter(Boolean) : []);
        return ids.map(String);
    }

    function teamIsFinished(matchup) {
        var ids = getTeamPlayerIds(matchup);
        if (!ids.length) return false;
        var teams = ids.map(function (id) { return (playerMeta(id) || {}).team; }).filter(Boolean);
        if (!teams.length) return false;
        var games = teams.map(function(t){ return scheduleGameForTeam(t, state.selectedWeek); }).filter(Boolean);
        return games.length === teams.length && games.every(function (g) { return gameStatus(g) === 'complete'; });
    }

    function playerTouchdownDelta(id) {
        var now = state.stats && state.stats[String(id)];
        var before = state.previousStats && state.previousStats[String(id)];
        if (!now || !before) return 0;
        var keys = ["rec_td", "rush_td", "pass_td", "def_td", "fum_td", "st_td", "kr_td", "pr_td"];
        var n = keys.reduce(function (sum, key) { return sum + statNumber(now, [key]); }, 0);
        var b = keys.reduce(function (sum, key) { return sum + statNumber(before, [key]); }, 0);
        return Math.max(0, n - b);
    }

    function appendEvent(message, icon) {
        if (!message) return;
        state.eventHistory.unshift({ message: message, icon: icon || "", at: Date.now() });
        state.eventHistory = state.eventHistory.slice(0, 12);
    }

    function analyzeLiveEvents(matchups, week) {
        if (week !== state.currentWeek) return;
        var seen = new Set();
        matchups.forEach(function (m) {
            var liveStarters = getTeamPlayerIds(m).filter(function(id){ var meta=playerMeta(id)||{}; return gameStatus(scheduleGameForTeam(meta.team, week)) === 'in_game'; });
            var key = String(m.roster_id), now = Number(m.points || 0), previous = state.previousScores[key];
            if (liveStarters.length && previous != null && Math.abs(now - Number(previous)) >= 0.001) {
                var delta = now - Number(previous);
                appendEvent(teamLabel(m) + " " + (delta > 0 ? "gained " : "lost ") + Math.abs(delta).toFixed(2) + " points", delta > 0 ? "▲" : "▼");
            }
            liveStarters.forEach(function (id) {
                if (playerTouchdownDelta(id) > 0 && !seen.has(id)) { seen.add(id); appendEvent(playerName(id) + " touchdown · " + teamLabel(m), "🏈🔥"); }
            });
        });
        state.eventHistory = state.eventHistory.filter(function(e){ return !e.at || Date.now()-e.at < 5*60*1000; });
    }

    function teamProjectedFinish(matchup) {
        var info = state.rosterMap.get(String(matchup.roster_id));
        var current = Number(matchup.points || 0);
        return current + projectedRemaining(info && info.roster);
    }

    function currentPlayingCount() {
        var count = 0, total = 0;
        state.matchups.forEach(function (m) {
            getTeamPlayerIds(m).forEach(function (id) {
                total++;
                var meta = playerMeta(id), game = scheduleGameForTeam(meta.team);
                if (game && String(game.status || '').toLowerCase() === 'in_game') count++;
            });
        });
        return { active: count, total: total };
    }

    function mondayStarterIds(m) {
        var roster = state.rosterMap.get(String(m.roster_id));
        if (!roster || !roster.roster) return [];
        var starters = Array.isArray(roster.roster.starters) ? roster.roster.starters.filter(Boolean) : [];
        return starters.filter(function(id){
            var meta = playerMeta(id), game = scheduleGameForTeam(meta && meta.team, state.selectedWeek);
            if (!game) return false;
            var start = gameStartMs(game);
            return Number.isFinite(start) && new Date(start).getDay() === 1 && gameStatus(game) !== 'complete';
        });
    }

    function sundayPlayersFinished(teams) {
        var sawSunday = false;
        for (var i = 0; i < teams.length; i++) {
            var roster = state.rosterMap.get(String(teams[i].roster_id));
            var starters = roster && roster.roster && Array.isArray(roster.roster.starters) ? roster.roster.starters.filter(Boolean) : [];
            for (var j = 0; j < starters.length; j++) {
                var meta = playerMeta(starters[j]), game = scheduleGameForTeam(meta && meta.team, state.selectedWeek);
                if (!game) continue;
                var start = gameStartMs(game);
                if (!Number.isFinite(start)) continue;
                var day = new Date(start).getDay();
                if (day !== 0) continue;
                sawSunday = true;
                if (gameStatus(game) !== 'complete') return false;
            }
        }
        return sawSunday;
    }

    function mondayProjectedForTeam(m) {
        var total = 0;
        mondayStarterIds(m).forEach(function(id){
            total += Math.max(0, getProjection(id) - getPlayerPoints(id));
        });
        return total;
    }

    function matchupHasMondayTakeover(teams) {
        if (!teams || teams.length < 2 || !sundayPlayersFinished(teams)) return false;
        var mondayA = mondayStarterIds(teams[0]);
        var mondayB = mondayStarterIds(teams[1]);
        if (!mondayA.length && !mondayB.length) return false;

        var aPoints = Number(teams[0].points || 0), bPoints = Number(teams[1].points || 0);
        var gap = Math.abs(aPoints - bPoints);
        var mondayAProj = mondayProjectedForTeam(teams[0]);
        var mondayBProj = mondayProjectedForTeam(teams[1]);
        var totalMondayProj = mondayAProj + mondayBProj;

        // Monday only takes over when the remaining Monday production can realistically affect the outcome.
        // If the current leader's margin exceeds all projected Monday production, the matchup is effectively decided.
        if (gap > totalMondayProj) return false;
        // Otherwise, require at least one side's Monday projection to be large enough to overcome the current deficit.
        return mondayAProj >= Math.max(0, bPoints - aPoints) || mondayBProj >= Math.max(0, aPoints - bPoints);
    }

    function formatEventTime(ts) {
        if (!ts) return '';
        try { return new Date(ts).toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}); } catch(e) { return ''; }
    }

    function oddsChangeReason(a, b) {
        var key = matchupKey(a) || (String(a.roster_id) + '-' + String(b.roster_id));
        var previous = state.previousProbabilities[key];
        if (!Number.isFinite(previous)) return null;
        var pred = matchupProbability(a,b);
        var change = pred.a - previous;
        if (Math.abs(change) < 3) return null;
        var pa = Number(a.points||0), pb = Number(b.points||0);
        var leader = pa >= pb ? teamLabel(a) : teamLabel(b);
        var trailing = pa >= pb ? teamLabel(b) : teamLabel(a);
        var deltaA = Number(a.points||0) - Number(state.previousScores[String(a.roster_id)] || 0);
        var deltaB = Number(b.points||0) - Number(state.previousScores[String(b.roster_id)] || 0);
        var scoreDelta = Math.abs(deltaA) + Math.abs(deltaB);
        if (scoreDelta >= 0.5) {
            var scoringTeam = deltaA > deltaB ? teamLabel(a) : teamLabel(b);
            var scoringPts = Math.max(deltaA, deltaB);
            return '🧠 ' + scoringTeam + ' scoring swing moved the model ' + Math.abs(change).toFixed(0) + ' points of win probability toward ' + (change > 0 ? teamLabel(a) : teamLabel(b)) + '.';
        }
        return '🧠 The FS5 model shifted ' + Math.abs(change).toFixed(0) + '% toward ' + (change > 0 ? teamLabel(a) : teamLabel(b)) + ' as the remaining-player outlook changed.';
    }

    function renderLeagueChaos() {
        var box = $('league-chaos');
        if (!box) return;
        var groups = new Map();
        state.matchups.forEach(function(m){ var k=matchupKey(m); if(!groups.has(k)) groups.set(k,[]); groups.get(k).push(m); });
        var close = 0, undecided = 0, monday = 0;
        groups.forEach(function(t){
            if(t.length<2) return;
            var p=matchupProbability(t[0],t[1]);
            if(Math.min(p.a,p.b)>=25 && Math.max(p.a,p.b)<=75) close++;
            if(Math.max(p.a,p.b)<90 && !teamIsFinished(t[0]) && !teamIsFinished(t[1])) undecided++;
            if(matchupHasMondayTakeover(t)) monday++;
        });
        var chaos = close >= 4 ? 'CHAOS' : (close >= 2 ? 'HIGH' : (close >= 1 ? 'HEATING UP' : 'CALM'));
        box.hidden=false;
        box.innerHTML='<div class="league-chaos__title">🌪️ FS5 CHAOS METER</div><div class="league-chaos__body"><strong>'+chaos+'</strong><span>'+close+' matchup'+(close===1?'':'s')+' in the danger zone · '+undecided+' still undecided'+(monday?' · '+monday+' going to Monday':'')+'</span></div><div class="league-chaos__track"><i style="width:'+Math.min(100,Math.max(10,close/Math.max(1,groups.size)*100))+'%"></i></div>';
    }

    function renderBroadcastHeader() {
        var box = $('fs5-broadcast');
        if (!box) return;

        var groups = new Map();
        state.matchups.forEach(function(m){
            var k=matchupKey(m);
            if(!groups.has(k)) groups.set(k,[]);
            groups.get(k).push(m);
        });

        var rows = [];
        groups.forEach(function(t){
            if(t.length >= 2){
                var a=t[0], b=t[1], p=matchupProbability(a,b);
                rows.push({a:a,b:b,p:p,diff:Math.abs(Number(a.points||0)-Number(b.points||0))});
            }
        });

        var leader = state.matchups.slice().sort(function(a,b){return Number(b.points||0)-Number(a.points||0);})[0];
        var leagueLeader = leader ? teamLabel(leader) + ' leads the league at ' + formatScore(leader.points) + ' points.' : 'The live scoreboard is ready.';
        var messages = [];

        if (leader) messages.push('🎙️ ' + leagueLeader);

        rows.forEach(function(r){
            var a=teamLabel(r.a), b=teamLabel(r.b), pa=Number(r.a.points||0), pb=Number(r.b.points||0);
            var leaderTeam=pa>=pb?a:b, trailer=pa>=pb?b:a;
            var lp=pa>=pb?r.p.a:r.p.b, tp=pa>=pb?r.p.b:r.p.a;
            if(r.diff < 1) messages.push('⚖️ ' + a + ' and ' + b + ' are dead even. This one is coming down to the wire.');
            else if(r.diff < 3) messages.push('🔥 ' + leaderTeam + ' leads ' + trailer + ' by less than three points. One play can flip this matchup.');
            else if(r.diff < 8) messages.push('📣 ' + leaderTeam + ' has the scoreboard lead, but ' + trailer + ' is still firmly within striking distance.');
            else if(r.diff >= 20) messages.push('🚨 ' + leaderTeam + ' has opened a ' + formatScore(r.diff) + '-point gap on ' + trailer + '. That is a serious hill to climb.');
            if(lp >= 90) messages.push('🏆 ' + leaderTeam + ' has crossed 90% win probability. The FS5 broadcast is calling this one Victory Imminent.');
            else if(tp >= 65 && pa !== pb) messages.push('📈 The model still likes ' + trailer + ' at ' + tp.toFixed(0) + '%. The scoreboard lead may not be as comfortable as it looks.');
            if(r.p.a < 30 && r.p.b > 70) messages.push('🎯 The model has a strong opinion here: ' + b + ' owns ' + r.p.b.toFixed(0) + '% win probability.');
            if(r.p.b < 30 && r.p.a > 70) messages.push('🎯 The model has a strong opinion here: ' + a + ' owns ' + r.p.a.toFixed(0) + '% win probability.');

            var timePct=matchupPlayingTimePct(r.a,r.b);
            if(timePct != null && timePct < 10 && (r.p.a < 70 || r.p.b < 70)) messages.push('🕯️ The Witching Hour is here in ' + a + ' vs ' + b + '. Less than 10% of the matchup remains.');
            if(timePct != null && timePct < 25 && r.diff < 10) messages.push('⏳ ' + a + ' vs ' + b + ' is entering the late-game sweat. Less than a quarter of the matchup remains.');

            var remA=projectedRemaining((state.rosterMap.get(String(r.a.roster_id))||{}).roster);
            var remB=projectedRemaining((state.rosterMap.get(String(r.b.roster_id))||{}).roster);
            if(remA === 0 && remB === 0 && r.diff > 0) messages.push('🏁 ' + leaderTeam + ' has the lead and both teams are out of players. The scoreboard can finally exhale.');
            else if(remA === 0 && remB > 0) messages.push('👀 ' + a + ' is done scoring. ' + b + ' still has ' + formatScore(remB) + ' projected points available.');
            else if(remB === 0 && remA > 0) messages.push('👀 ' + b + ' is done scoring. ' + a + ' still has ' + formatScore(remA) + ' projected points available.');
            if(remA + remB > 0 && remA + remB < 10) messages.push('🧨 There are fewer than 10 projected points left in ' + a + ' vs ' + b + '. Every possession matters now.');
        });

        var active=currentPlayingCount();
        if(active.total) messages.push('👀 FS5 has ' + active.active + ' of ' + active.total + ' starters currently playing across the league.');
        if(state.eventHistory && state.eventHistory.length) {
            var latest=state.eventHistory[0];
            messages.push(latest.icon + ' Fresh off the live feed: ' + latest.message + '.');
        }

        if(!messages.length) messages.push('🎙️ FS5 LIVE: The broadcast booth is watching for the next big swing.');

        /* Cycle through the current relevant broadcast messages one at a time.
           Keep a small persistent queue so changing event data does not make the
           booth appear to skip every other message. A message is not repeated
           until the currently relevant pool has been exhausted. */
        var storageKey='fs5_broadcast_queue_' + LEAGUE_ID + '_w' + state.selectedWeek;
        var queue=[];
        try { queue=JSON.parse(localStorage.getItem(storageKey)||'[]')||[]; } catch(e) { queue=[]; }
        if(!Array.isArray(queue)) queue=[];
        var available=messages.filter(function(msg){ return queue.indexOf(msg)===-1; });
        if(!available.length){ queue=[]; available=messages.slice(); }
        var text=available[0] || messages[0];
        queue.push(text);
        /* Keep only messages that still exist so stale events do not block the cycle. */
        queue=queue.filter(function(msg,idx){ return messages.indexOf(msg)!==-1 && queue.indexOf(msg)===idx; });
        try { localStorage.setItem(storageKey, JSON.stringify(queue.slice(-Math.max(messages.length-1,1)))); } catch(e) {}

        box.hidden=false;
        box.innerHTML='<strong>🎙️ FS5 BROADCAST</strong><span>'+esc(text.replace(/^🎙️ FS5 LIVE:\s*/,'')).replace(/&amp;/g,'&amp;')+'</span>';
    }

    function renderWatching() {
        var box=$('fs5-watching'); if(!box)return;
        var c=currentPlayingCount();
        box.hidden=false; box.innerHTML='<span>👀 FS5 WATCHING</span><strong>'+c.active+' active player'+(c.active===1?'':'s')+'</strong><small>of '+c.total+' starters currently in NFL games</small>';
    }

    function renderWhatJustHappened() {
        var box=$('what-just-happened'); if(!box)return;
        var items=state.eventHistory.slice(0,3);
        if(!items.length){box.hidden=true;return;}
        box.hidden=false;
        box.innerHTML='<strong>WHAT JUST HAPPENED</strong>'+items.map(function(e){return '<span>'+esc(e.icon)+' '+esc(e.message)+'</span>';}).join('');
    }

    function renderLeagueLeaderboard() {
        var box=$('league-leaderboard'); if(!box)return;
        var teamRows=[];
        var playerRows=[];
        var seenPlayers={};
        state.matchups.forEach(function(m){
            var info=state.rosterMap.get(String(m.roster_id));
            if(info) teamRows.push({team:info.teamName,score:Number(m.points||0)});
            var rosterPlayers=(info && info.roster && Array.isArray(info.roster.players)) ? info.roster.players : (Array.isArray(m.players) ? m.players : []);
            var starters=(info && info.roster && Array.isArray(info.roster.starters)) ? info.roster.starters.filter(Boolean) : [];
            var ids=starters.length ? starters : rosterPlayers;
            ids.forEach(function(id){
                var key=String(id);
                if(seenPlayers[key]) return;
                seenPlayers[key]=true;
                var pts=getPlayerPoints(id);
                playerRows.push({name:playerName(id),score:Number(pts||0),team:info ? info.teamName : ''});
            });
        });
        teamRows.sort(function(a,b){return b.score-a.score;});
        playerRows.sort(function(a,b){return b.score-a.score;});
        if(!teamRows.length && !playerRows.length){box.hidden=true;return;}
        box.hidden=false;
        var medals=['🥇','🥈','🥉'];
        var teamHtml=teamRows.slice(0,3).map(function(r,i){return '<div class="leaderboard-row"><b>'+medals[i]+'</b><span>'+esc(r.team)+'</span><strong>'+formatScore(r.score)+'</strong></div>';}).join('');
        var playerHtml=playerRows.slice(0,3).map(function(r,i){return '<div class="leaderboard-row"><b>'+medals[i]+'</b><span><strong class="leaderboard-player-name">'+esc(r.name)+'</strong><small>'+esc(r.team)+'</small></span><strong>'+formatScore(r.score)+'</strong></div>';}).join('');
        box.innerHTML='<div class="leaderboard-title">🏆 LIVE LEAGUE LEADERBOARD</div><div class="leaderboard-columns"><div class="leaderboard-column"><div class="leaderboard-column-title">🏆 TOP 3 TEAMS</div>'+teamHtml+'</div><div class="leaderboard-column leaderboard-column--players"><div class="leaderboard-column-title">🔥 TOP 3 SCORING PLAYERS</div>'+playerHtml+'</div></div>';
    }

    function trashTalk(a,b) {
        var pa=Number(a.points||0), pb=Number(b.points||0), diff=Math.abs(pa-pb);
        var pred=matchupProbability(a,b), max=Math.max(pred.a,pred.b), min=Math.min(pred.a,pred.b);
        var winner=pa>=pb?teamLabel(a):teamLabel(b), loser=pa>=pb?teamLabel(b):teamLabel(a);
        var winnerProb=pa>=pb?pred.a:pred.b, loserProb=pa>=pb?pred.b:pred.a;
        var remA=projectedRemaining((state.rosterMap.get(String(a.roster_id))||{}).roster);
        var remB=projectedRemaining((state.rosterMap.get(String(b.roster_id))||{}).roster);
        var totalRem=remA+remB;
        var options=[];
        if (max>90) options.push('🏆 '+esc(winner)+' is already picking out the victory speech. '+winnerProb.toFixed(0)+'% says this one is basically theirs.');
        if (min<20 && diff<15) options.push('😈 '+esc(loser)+' has the score deficit, the bad odds, and absolutely no excuse left.');
        if (diff<2) options.push('😈 '+esc(winner)+' leads by less than two points. Talk big now, regret it later.');
        if (diff>=2 && diff<5) options.push('😈 '+esc(winner)+' has a lead so small it barely qualifies as bragging rights.');
        if (diff>=5 && diff<10) options.push('😈 '+esc(loser)+', this is your official warning to stop refreshing and start praying.');
        if (diff>=10 && diff<20) options.push('😈 '+esc(loser)+' may want to check the waiver wire for a miracle.');
        if (diff>=20) options.push('😈 '+esc(loser)+' is currently being escorted to the shadow realm.');
        if (winnerProb>=75 && diff<8) options.push('📈 '+esc(winner)+' has the lead AND the model. That is a particularly rude combination.');
        if (loserProb>=45 && loserProb<=55 && diff>=8) options.push('😈 The scoreboard says '+esc(winner)+', but the model says '+esc(loser)+' still has a pulse.');
        if (totalRem>0 && totalRem<15) options.push('⏳ The fantasy clock is almost empty. '+esc(loser)+' needs a miracle, not a strategy.');
        if (totalRem>0 && totalRem<30 && diff<10) options.push('🔥 Less than 30 projected points remain between them. Every catch is now personal.');
        if (remA===0 && remB===0 && diff>0) options.push('🏁 No players left. '+esc(winner)+' just closed the casket on '+esc(loser)+'. Somebody check on their group chat.');
        if (remA===0 && remB>0 && pa>pb) options.push('😈 '+esc(a===winner?teamLabel(a):teamLabel(b))+' has already run out of players. Bold move to keep this interesting.');
        if (remB===0 && remA>0 && pb>pa) options.push('😈 '+esc(b===winner?teamLabel(b):teamLabel(a))+' has already run out of players. Bold move to keep this interesting.');
        if (pred.a>pred.b+20 && pa<pb) options.push('🚨 '+esc(teamLabel(a))+' is losing on the scoreboard but winning the model. Somebody tell '+esc(teamLabel(b))+' to look up.');
        if (pred.b>pred.a+20 && pb<pa) options.push('🚨 '+esc(teamLabel(b))+' is losing on the scoreboard but winning the model. Somebody tell '+esc(teamLabel(a))+' to look up.');
        if (pred.a>=60 && pa<pb) options.push('😈 '+esc(teamLabel(a))+' is behind right now, but the model has already started the comeback parade.');
        if (pred.b>=60 && pb<pa) options.push('😈 '+esc(teamLabel(b))+' is behind right now, but the model has already started the comeback parade.');
        if (!options.length) options.push('😈 TRASH TALK: Nobody has earned the bragging rights yet.');
        var hash=Math.abs((String(a.roster_id)+'|'+String(b.roster_id)+'|'+Math.floor((pa+pb)*10)).split('').reduce(function(h,c){return ((h<<5)-h)+c.charCodeAt(0)|0;},7));
        return options[hash % options.length];
    }

    function applyTrashTalkExpiry(el) {
        if (!el) return;
        setTimeout(function(){
            if (!el.parentNode) return;
            el.classList.add('is-expiring');
            setTimeout(function(){ if (el.parentNode) el.parentNode.removeChild(el); }, 300);
        }, 10000);
    }

    function appendProjectedFinish(card, teams) {
        var vals=teams.map(function(m){return {team:teamLabel(m),finish:teamProjectedFinish(m),current:Number(m.points||0),remaining:projectedRemaining((state.rosterMap.get(String(m.roster_id))||{}).roster)}});
        var el=document.createElement('div'); el.className='projected-finish';
        el.innerHTML=vals.map(function(v){return '<div><span>🎯 '+esc(v.team)+'</span><strong>'+formatScore(v.finish)+'</strong><small>Projected final · '+formatScore(v.remaining)+' left</small></div>';}).join('');
        card.appendChild(el);
    }

    function appendPointsBank(card, teams) {
        var el=document.createElement('div'); el.className='points-bank';
        el.innerHTML=teams.map(function(m){var cur=Number(m.points||0), rem=projectedRemaining((state.rosterMap.get(String(m.roster_id))||{}).roster), total=Math.max(0,cur+rem), pct=total?Math.max(0,Math.min(100,cur/total*100)):0;return '<div class="points-bank__team"><div><span>💰 '+esc(teamLabel(m))+'</span><strong>'+formatScore(cur)+' banked</strong></div><div class="points-bank__track"><i style="width:'+pct.toFixed(1)+'%"></i></div><small>'+formatScore(rem)+' projected remaining</small></div>';}).join('');
        card.appendChild(el);
    }

    function cardVibe(teams) {
        var p=matchupProbability(teams[0],teams[1]), max=Math.max(p.a,p.b), min=Math.min(p.a,p.b);
        if(teamIsFinished(teams[0]) && teamIsFinished(teams[1])) return ' matchup-card--final';
        var timeLeft=matchupPlayingTimePct(teams[0],teams[1]);
        if(timeLeft!=null && timeLeft<10 && (p.a<70 || p.b<70))return ' matchup-card--witching';
        if(min>=45&&max<=55)return ' matchup-card--nail';
        if(Math.abs(Number(teams[0].points||0)-Number(teams[1].points||0))<=5)return ' matchup-card--close';
        return '';
    }

    function renderLiveTicker() {
        var ticker = $("live-event-ticker"); if (!ticker) return;
        var events = state.eventHistory.filter(function(e){ return !e.at || Date.now()-e.at < 5*60*1000; }).slice(0,5);
        if (!events.length) { ticker.innerHTML = '<span class="live-ticker__label">LIVE FEED</span><div class="live-ticker__viewport"><div class="live-ticker__track"><span class="live-ticker__empty">Waiting for current-game scoring activity…</span></div></div>'; return; }
        ticker.innerHTML = '<span class="live-ticker__label">LIVE FEED</span><div class="live-ticker__viewport"><div class="live-ticker__track">' + events.map(function (e) { return '<span class="live-ticker__item"><b>' + esc(e.icon) + '</b> ' + esc(e.message) + '</span>'; }).join('') + '</div></div>';
    }

    function matchupPlayingTimePct(a, b) {
        var ids = getTeamPlayerIds(a).concat(getTeamPlayerIds(b)).filter(Boolean);
        if (!ids.length) return null;
        var values = [];
        ids.forEach(function (id) {
            var meta = playerMeta(id);
            var game = scheduleGameForTeam(meta && meta.team, state.selectedWeek);
            if (!game) return;
            var status = gameStatus(game);
            if (status === 'complete') values.push(0);
            else if (status === 'pre_game') values.push(100);
            else if (status === 'in_game') {
                var start = gameStartMs(game);
                if (Number.isFinite(start)) {
                    var total = 195 * 60 * 1000;
                    values.push(Math.max(0, Math.min(100, ((start + total) - Date.now()) / total * 100)));
                } else values.push(50);
            } else values.push(50);
        });
        if (!values.length) return null;
        return values.reduce(function (a, b) { return a + b; }, 0) / values.length;
    }

    function matchupAlert(a, b) {
        if (teamIsFinished(a) && teamIsFinished(b)) return null;
        var pred = matchupProbability(a, b);
        var key = matchupKey(a) || (String(a.roster_id) + '-' + String(b.roster_id));
        var previous = state.previousProbabilities[key];
        var labels = [teamLabel(a), teamLabel(b)];
        var alert = null;
        var timeLeft = matchupPlayingTimePct(a, b);
        if (Math.max(pred.a, pred.b) > 90) {
            alert = { type: 'victory', text: '🏆 VICTORY IMMINENT' };
        } else if (timeLeft != null && timeLeft < 10 && (pred.a < 70 || pred.b < 70)) {
            alert = { type: 'witching', text: '🕯️ THE WITCHING HOUR' };
        } else if (previous && Math.abs(pred.a - previous) >= 12 && ((previous < 50 && pred.a >= 50) || (previous >= 50 && pred.a < 50))) {
            alert = { type: 'lead', text: '⚡ LEAD CHANGE' };
        } else if (pred.a >= 65 && previous != null && previous < 50) {
            alert = { type: 'upset', text: '🚨 UPSET ALERT · ' + labels[0] };
        } else if (pred.b >= 65 && previous != null && previous > 50) {
            alert = { type: 'upset', text: '🚨 UPSET ALERT · ' + labels[1] };
        } else if (Math.min(pred.a, pred.b) >= 45 && Math.max(pred.a, pred.b) <= 55) {
            alert = { type: 'nail', text: '😬 NAIL BITER' };
        }
        state.previousProbabilities[key] = pred.a;
        return alert;
    }

    function mondayNightSweat(a, b) {
        if (teamIsFinished(a) || teamIsFinished(b)) return null;
        var pa = matchupProbability(a,b);
        var max = Math.max(pa.a, pa.b), min = Math.min(pa.a, pa.b);
        if (min >= 25 && max <= 75 && (projectedRemaining((state.rosterMap.get(String(a.roster_id)) || {}).roster) > 0 || projectedRemaining((state.rosterMap.get(String(b.roster_id)) || {}).roster) > 0)) return '🌙 MONDAY NIGHT SWEAT';
        return null;
    }

    function appendMatchupAlert(card, alert, finished) {
        if (finished) {
            var final = document.createElement('div'); final.className = 'matchup-alert matchup-alert--final'; final.textContent = '🏁 FINAL'; card.appendChild(final); return;
        }
        if (!alert) return;
        var el = document.createElement('div'); el.className = 'matchup-alert matchup-alert--' + alert.type; el.textContent = alert.text; card.appendChild(el);
        setTimeout(function () { if (el.parentNode) { el.classList.add('is-fading'); setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350); } }, 10000);
    }

    function appendMatchupSuperlatives(card, teams) {
        var best = null;
        teams.forEach(function (m) {
            getTeamPlayerIds(m).forEach(function (id) {
                var pts = getPlayerPoints(id);
                if (!best || pts > best.points) best = { id: id, points: pts, team: teamLabel(m) };
            });
        });
        if (!best || best.points <= 0) return;
        var strip = document.createElement('div'); strip.className = 'matchup-mvp';
        strip.innerHTML = '<span>👑 MATCHUP MVP</span><strong>' + esc(playerName(best.id)) + '</strong><b>' + formatScore(best.points) + ' pts</b>';
        card.appendChild(strip);
    }

    function renderScoreBox(matchup, week) {
        var box = document.createElement("div");
        box.className = "score-box";
        box.innerHTML = '<strong>' + formatScore(matchup.points) + '</strong><span>points</span>';
        var previous = state.previousScores[String(matchup.roster_id)];
        var delta = Number(matchup.points || 0) - Number(previous == null ? matchup.points || 0 : previous);
        if (Math.abs(delta) >= 0.5) {
            var deltaBadge = document.createElement("span"); deltaBadge.className="score-change"; deltaBadge.textContent=(delta>0?"+":"")+formatScore(delta); box.appendChild(deltaBadge);
            setTimeout(function(){ if(deltaBadge && deltaBadge.parentNode){deltaBadge.classList.add("is-hiding"); setTimeout(function(){if(deltaBadge.parentNode)deltaBadge.parentNode.removeChild(deltaBadge);},250);} },10000);
        }
        var reaction = getScoreReaction(matchup, week);
        if (reaction) {
            var badge = document.createElement("span");
            badge.className = "score-reaction score-reaction--" + reaction.type;
            badge.setAttribute("aria-label", reaction.type === "touchdown" ? "Touchdown" : (reaction.type === "up" ? "Score increased" : "Score decreased"));
            badge.textContent = reaction.type === "touchdown" ? "🏈🔥" : (reaction.type === "up" ? "▲" : "▼");
            box.appendChild(badge);

            if (reaction.type === "touchdown") {
                box.classList.add("score-box--touchdown");
                var burst = document.createElement("div");
                burst.className = "td-animation";
                burst.setAttribute("aria-label", "Touchdown scored");
                burst.innerHTML = '<span class="td-animation__label">TOUCHDOWN!</span><span class="td-animation__ball td-animation__ball--1">🏈</span><span class="td-animation__ball td-animation__ball--2">🏈</span><span class="td-animation__ball td-animation__ball--3">🏈</span><span class="td-animation__spark td-animation__spark--1">✦</span><span class="td-animation__spark td-animation__spark--2">✦</span>';
                box.appendChild(burst);
            }

            var timerKey = String(matchup.roster_id);
            clearTimeout(state.reactionTimers[timerKey]);
            state.reactionTimers[timerKey] = setTimeout(function () {
                if (badge && badge.parentNode) {
                    badge.classList.add("is-hiding");
                    setTimeout(function () { if (badge && badge.parentNode) badge.parentNode.removeChild(badge); }, 220);
                }
                if (box) box.classList.remove("score-box--touchdown");
                var animation = box && box.querySelector ? box.querySelector(".td-animation") : null;
                if (animation) { animation.classList.add("is-hiding"); setTimeout(function () { if (animation && animation.parentNode) animation.parentNode.removeChild(animation); }, 350); }
            }, reaction.type === "touchdown" ? 10000 : 2200);
        }
        return box;
    }

    function matchupGameWindow(teams) {
        var starts = [], ends = [];
        var week = state.selectedWeek;
        teams.forEach(function (m) {
            getTeamPlayerIds(m).forEach(function (id) {
                var meta = playerMeta(id);
                var game = scheduleGameForTeam(meta && meta.team, week);
                var start = gameStartMs(game);
                if (Number.isFinite(start)) {
                    starts.push(start);
                    ends.push(start + (195 * 60 * 1000));
                }
            });
        });
        if (!starts.length) return null;
        return { start: Math.min.apply(null, starts), end: Math.max.apply(null, ends) };
    }

    function renderLiveGuide() {
        var box=$('live-guide');
        if(!box || box.dataset.ready==='1') return;
        box.dataset.ready='1';
        box.innerHTML='<details><summary>📖 FS5 LIVE SCORES GUIDE</summary><div class="live-guide__grid">'+
            '<div><strong>🏆 Victory Imminent</strong><p>One team has a win probability above 90%. The matchup is heavily tilted toward a likely winner.</p></div>'+
            '<div><strong>🕯️ The Witching Hour</strong><p>Less than 10% of the matchup\'s total playing time remains <em>and</em> at least one team has a win probability below 70%. The game is entering its late, dangerous stretch.</p></div>'+
            '<div><strong>😬 Nail Biter</strong><p>Both teams are between 45% and 55% win probability. The matchup is essentially a coin flip.</p></div>'+
            '<div><strong>⚡ Lead Change</strong><p>The win probability has swung sharply enough to indicate that control of the matchup changed hands.</p></div>'+
            '<div><strong>🚨 Upset Alert</strong><p>A team that was previously behind in probability has moved into a strong position.</p></div>'+
            '<div><strong>🌙 Monday Night Sweat</strong><p>A matchup still has meaningful production tied to a Monday Night Football player, keeping the outcome alive late.</p></div>'+
            '<div><strong>👑 🔥 💀 ❄️ Player badges</strong><p>👑 matchup MVP · 🔥 above projection/hot · 💀 major projection miss · ❄️ final game with 0 points · 🏈🔥 touchdown activity.</p></div>'+
            '</div></details>';
    }

    function renderIceWatch() {
        var box=$("ice-watch"); if(!box) return;
        var watch=[], frozen=[], seen={};
        state.matchups.forEach(function(m){ getTeamPlayerIds(m).forEach(function(id){
            if(seen[id] || getPlayerPoints(id)!==0) return; seen[id]=1;
            var meta=playerMeta(id)||{}, game=scheduleGameForTeam(meta.team,state.selectedWeek), st=gameStatus(game);
            var item={id:id,name:playerName(id),team:teamLabel(m),game:game};
            if(st==='complete') frozen.push(item);
            else if(st==='in_game' && Number(game && game.period)>=4) watch.push(item);
        }); });
        if(!watch.length && !frozen.length){ box.hidden=true; box.innerHTML=''; return; }
        box.hidden=false;
        function chips(items){return items.map(function(x){return '<span class="ice-player">❄️ <strong>'+esc(x.name)+'</strong><small>'+esc(x.team)+'</small></span>';}).join('');}
        box.innerHTML=(watch.length?'<section class="ice-panel ice-panel--watch"><div><b>🧊 ICE WATCH</b><span>Zero points entering the 4th quarter</span></div><div class="ice-players">'+chips(watch)+'</div></section>':'')+(frozen.length?'<section class="ice-panel ice-panel--baby"><div class="ice-snow">❄︎ ✦ ❄︎ ✧ ❄︎ ✦ ❄︎</div><div><b>❄️ ICE ICE BABY</b><span>Final · starting lineup goose eggs</span></div><div class="ice-players">'+chips(frozen)+'</div></section>':'');
    }

    function renderMatchups(matchups, week) {
        grid.replaceChildren();
        renderLiveGuide();
        kicker.textContent = "WEEK " + week;
        heading.textContent = weekLabel(week);
        badge.textContent = "Week " + week;
        state.matchups = Array.isArray(matchups) ? matchups : [];
        renderIceWatch();
        analyzeLiveEvents(state.matchups, week);
        renderLiveTicker();
        renderWhatJustHappened();
        renderBroadcastHeader();
        renderWatching();
        renderLeagueLeaderboard();
        renderLeagueChaos();
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
            card.className = "matchup-card matchup-card--clickable" + cardVibe(teams);
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", "Open matchup " + entry[0]);
            var head = document.createElement("div");
            head.className = "matchup-card__head";
            var matchupFinished = teamIsFinished(teams[0]) && teamIsFinished(teams[1]);
            head.innerHTML = '<span>Matchup ' + esc(entry[0]) + '</span><span class="matchup-card__state' + (week === state.currentWeek && !matchupFinished ? ' is-current' : '') + '">' + (matchupFinished || week < state.currentWeek ? 'FINAL' : (week === state.currentWeek ? 'LIVE' : 'UPCOMING')) + '</span>';
            card.appendChild(head);
            teams.forEach(function (matchup, index) {
                var info = state.rosterMap.get(String(matchup.roster_id));
                var team = document.createElement("div"); team.className = "matchup-team";
                var bothFinal = teamIsFinished(teams[0]) && teamIsFinished(teams[1]);
                if (bothFinal && Number(matchup.points||0) > Number(teams[index===0?1:0].points||0)) team.classList.add("matchup-team--winner");
                var vp = matchupProbability(teams[0],teams[1]);
                if (!bothFinal && Math.max(vp.a,vp.b)>90 && ((index===0 && vp.a>vp.b)||(index===1 && vp.b>vp.a))) team.classList.add("matchup-team--victory");
                var identity = document.createElement("div"); identity.className = "team-identity";
                var img = teamImage(info, "team-avatar");
                var text = document.createElement("div");
                var name = document.createElement("h3"); name.textContent = info ? info.teamName : "Roster " + matchup.roster_id; text.appendChild(name);
                var account = document.createElement("span"); account.textContent = info && info.account ? info.account : ""; text.appendChild(account);
                var record = document.createElement("small"); record.textContent = info ? "Record: " + info.wins + "-" + info.losses + "-" + info.ties : ""; text.appendChild(record);
                appendPlayingTimeBar(text, matchup.starters || (info && info.roster && info.roster.starters) || []);
                identity.appendChild(img); identity.appendChild(text);
                var scoreBox = renderScoreBox(matchup, week);
                team.appendChild(identity); team.appendChild(scoreBox); card.appendChild(team);
                if (index === 0) { var divider = document.createElement("div"); divider.className = "vs-divider"; divider.innerHTML = '<span>VS</span>'; card.appendChild(divider); }
            });
            appendPredictor(card, teams);
            var oddsReason = oddsChangeReason(teams[0], teams[1]);
            if (oddsReason) { var reason = document.createElement("div"); reason.className = "odds-change-reason"; reason.textContent = oddsReason; card.appendChild(reason); }
            if (matchupHasMondayTakeover(teams)) { var monday = document.createElement("div"); monday.className = "monday-takeover"; monday.innerHTML = "<span>🌙</span><div><strong>MONDAY NIGHT TAKEOVER</strong><small>The final chapter of this matchup is waiting for Monday Night Football.</small></div></div>"; card.appendChild(monday); }
            appendMatchupSuperlatives(card, teams);
            appendProjectedFinish(card, teams);
            appendPointsBank(card, teams);
            var trash = document.createElement("div"); trash.className="trash-talk"; trash.innerHTML=trashTalk(teams[0],teams[1]); card.appendChild(trash); applyTrashTalkExpiry(trash);
            var alert = matchupAlert(teams[0], teams[1]);
            if (!alert) { var sweat = mondayNightSweat(teams[0], teams[1]); if (sweat) alert = { type: 'sweat', text: sweat }; }
            appendMatchupAlert(card, alert, teamIsFinished(teams[0]) && teamIsFinished(teams[1]));
            var hint = document.createElement("div"); hint.className = "matchup-hint"; hint.textContent = "Click matchup to view lineups · bench · player details"; card.appendChild(hint);
            function open() { openMatchupModal(teams, entry[0], week); }
            card.addEventListener("click", open);
            card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
            grid.appendChild(card);
        });
        renderLeagueSuperlatives();
    }

    function renderLeagueSuperlatives() {
        var box = $("league-superlatives"); if (!box) return;
        var rows = [];
        state.matchups.forEach(function (m) {
            var info = state.rosterMap.get(String(m.roster_id));
            if (!info) return;
            rows.push({ team: info.teamName, score: Number(m.points || 0), remaining: projectedRemaining(info.roster) });
        });
        rows.sort(function(a,b){return b.score-a.score;});
        if (!rows.length) { box.hidden = true; return; }
        var high = rows[0], low = rows[rows.length - 1];
        var closest = null;
        state.matchups.forEach(function(m){ if (!closest || Math.abs(Number(m.points||0) - Number(closest.diffSource.points||0)) < closest.diff) closest = {diff: Math.abs(Number(m.points||0) - Number((closest && closest.diffSource ? closest.diffSource.points : 0))), diffSource:m}; });
        var mostLeft = rows.slice().sort(function(a,b){return b.remaining-a.remaining;})[0];
        box.hidden = false;
        box.innerHTML = '<div class="superlative-card"><span>🏆 HIGHEST SCORE</span><strong>' + esc(high.team) + '</strong><b>' + formatScore(high.score) + '</b></div>' +
            '<div class="superlative-card"><span>💀 LOWEST SCORE</span><strong>' + esc(low.team) + '</strong><b>' + formatScore(low.score) + '</b></div>' +
            '<div class="superlative-card"><span>⚡ MOST LEFT</span><strong>' + esc(mostLeft.team) + '</strong><b>' + formatScore(mostLeft.remaining) + ' proj.</b></div>';
        var closeGames = [];
        var groups = new Map(); state.matchups.forEach(function(m){ var k=matchupKey(m); if(!groups.has(k)) groups.set(k,[]); groups.get(k).push(m); });
        groups.forEach(function(t){ if(t.length>=2) closeGames.push({a:t[0],b:t[1],diff:Math.abs(Number(t[0].points||0)-Number(t[1].points||0))}); });
        if(closeGames.length){ closeGames.sort(function(a,b){return a.diff-b.diff;}); var cg=closeGames[0]; box.insertAdjacentHTML('beforeend','<div class="superlative-card"><span>😬 CLOSEST MATCHUP</span><strong>' + esc(teamLabel(cg.a)) + ' vs ' + esc(teamLabel(cg.b)) + '</strong><b>' + formatScore(cg.diff) + ' pts</b></div>'); }
        var hot = null; state.matchups.forEach(function(m){ getTeamPlayerIds(m).forEach(function(id){ var prev=getPreviousPlayerPoints(id), cur=getPlayerPoints(id); if(prev!=null){var d=cur-prev; if(!hot || d>hot.delta) hot={id:id,delta:d,team:teamLabel(m)};}}); });
        if(hot && hot.delta>0){ box.insertAdjacentHTML('beforeend','<div class="superlative-card"><span>🔥 HOTTEST PLAYER</span><strong>' + esc(playerName(hot.id)) + '</strong><b>+' + formatScore(hot.delta) + '</b></div>'); }

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
            starters.forEach(function (id) { col.appendChild(renderPlayer(id, true, true)); });
            var benchDetails = document.createElement("details"); benchDetails.className = "modal-bench"; var summary = document.createElement("summary"); summary.textContent = "BENCH · " + bench.length; benchDetails.appendChild(summary); var bl = document.createElement("div"); bench.forEach(function (id) { bl.appendChild(renderPlayer(id, false, true)); }); benchDetails.appendChild(bl); col.appendChild(benchDetails);
            columns.appendChild(col);
        });
        body.appendChild(columns);
        modal.hidden = false; document.body.classList.add("modal-open");
        var panel=modal.querySelector(".fs5-modal__panel"); if(panel) panel.scrollTop=0;
        $("matchup-modal-close").focus({preventScroll:true});
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
        detail.innerHTML = '<img class="player-detail__image" src="' + playerImageUrl(id) + '" alt="" onerror="this.onerror=null;this.src=\'/artwork/logo.png\';"><div><h2>' + esc(playerName(id)) + '</h2><p class="player-detail__team">' + esc((p.position || '--') + ' · ' + (p.team || 'FA') + (p.injury_status ? ' · ' + p.injury_status : '')) + '</p><div class="player-detail__chips"><span>Current ' + formatScore(getPlayerPoints(id)) + '</span><span>Weekly projection ' + formatScore(getProjection(id)) + '</span></div></div>';
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

    function loadReactionSnapshot() {
        try {
            var saved = JSON.parse(localStorage.getItem("fs5_live_reaction_snapshot") || "null");
            if (!saved || !saved.saved || Date.now() - Number(saved.saved) > 30 * 60 * 1000) return null;
            return saved;
        } catch (e) { return null; }
    }

    function saveReactionSnapshot() {
        var tdKeys = ["rec_td", "rush_td", "pass_td", "def_td", "fum_td", "st_td", "kr_td", "pr_td"];
        var td = {};
        Object.keys(state.stats || {}).forEach(function (id) {
            var stats = state.stats[id] || {};
            td[String(id)] = tdKeys.reduce(function (sum, key) { return sum + statNumber(stats, [key]); }, 0);
        });
        var scores = {};
        state.matchups.forEach(function (m) { if (m && m.roster_id != null) scores[String(m.roster_id)] = Number(m.points || 0); });
        try { localStorage.setItem("fs5_live_reaction_snapshot", JSON.stringify({ saved: Date.now(), td: td, scores: scores })); } catch (e) {}
    }

    function loadSupplemental(week) {
        var season = 2026;
        var persisted = loadReactionSnapshot();
        var statsPaths = ["/stats/nfl/regular/" + season + "/" + week, "/stats/nfl/" + season + "/" + week + "?season_type=regular"];
        var projectionPaths = ["/projections/nfl/regular/" + season + "/" + week, "/projections/nfl/" + season + "/" + week + "?season_type=regular"];
        return Promise.allSettled([loadPlayerCache(), optionalApi(statsPaths).catch(function () { return {}; }), optionalApi(projectionPaths).catch(function () { return {}; })]).then(function (results) {
            if (state.stats && Object.keys(state.stats).length) {
                state.previousStats = state.stats;
            } else if (persisted && persisted.td) {
                state.previousStats = {};
                Object.keys(persisted.td).forEach(function (id) { state.previousStats[id] = { rec_td: Number(persisted.td[id] || 0) }; });
            } else {
                state.previousStats = {};
            }
            if (!Object.keys(state.previousScores || {}).length && persisted && persisted.scores) state.previousScores = persisted.scores;
            state.stats = results[1].status === "fulfilled" && results[1].value ? results[1].value : {};
            state.projections = results[2].status === "fulfilled" && results[2].value ? results[2].value : {};
            renderMatchups(state.matchups, week);
            state.matchups.forEach(function (m) { if (m && m.roster_id != null) state.previousScores[String(m.roster_id)] = Number(m.points || 0); });
            saveReactionSnapshot();
        });
    }

    async function loadWeek(week) {
        grid.setAttribute("aria-busy", "true");
        weekContext.textContent = "Loading Week " + week + "...";
        try {
            state.nflGames = await scoreboardApi(week).catch(function(){ return state.nflGames || []; });
            var matchups = await api("/league/" + LEAGUE_ID + "/matchups/" + week);
            state.selectedWeek = week; weekSelect.value = String(week);
            renderMatchups(matchups, week);
            weekContext.textContent = week === state.currentWeek ? "Current week · live scoring · auto-refresh every 10 seconds" : "2026 season · " + weekLabel(week);
            setStatus(week === state.currentWeek ? "Live · Sleeper connected" : "Historical week", week === state.currentWeek ? "live" : "");
            loadSupplemental(week).catch(function (e) { console.warn("FS5 supplemental Sleeper feeds unavailable", e); });
        } catch (error) {
            console.error("FS5 Sleeper matchup request failed", error);
            grid.replaceChildren(); grid.hidden = true; empty.hidden = false; empty.textContent = "Sleeper matchup data could not be loaded. Please try again.";
            weekContext.textContent = "Unable to load Week " + week + ". " + (error.message || "Unknown Sleeper error"); setStatus("Sleeper connection error", "error");
        } finally { grid.setAttribute("aria-busy", "false"); }
    }

    function setLiveTheme(theme) {
        var dark = theme === 'dark';
        document.body.classList.toggle('fs5-live-dark', dark);
        try { localStorage.setItem('fs5_live_theme', dark ? 'dark' : 'light'); } catch (e) {}
        document.querySelectorAll('[data-live-theme]').forEach(function(btn){
            var active = btn.getAttribute('data-live-theme') === (dark ? 'dark' : 'light');
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }

    function initializeLiveTheme() {
        var saved = 'light';
        try { saved = localStorage.getItem('fs5_live_theme') || 'light'; } catch (e) {}
        setLiveTheme(saved === 'dark' ? 'dark' : 'light');
        document.querySelectorAll('[data-live-theme]').forEach(function(btn){
            btn.addEventListener('click', function(){ setLiveTheme(btn.getAttribute('data-live-theme')); });
        });
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
    initializeLiveTheme();
    initialize();
})();
