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
        schedule: [],
        previousScores: {},
        previousStats: {},
        reactionTimers: {},
        previousProbabilities: {},
        previousPlayerPoints: {},
        eventHistory: [],
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

    function playerTrendBadge(id) {
        var points = getPlayerPoints(id), projection = getProjection(id), prev = getPreviousPlayerPoints(id);
        var td = playerTouchdownDelta(id);
        if (td > 0) return '<span class="player-trend player-trend--td">🏈🔥</span>';
        if (prev != null && points - prev >= 8) return '<span class="player-trend player-trend--hot">🔥</span>';
        if (projection >= 8 && points < projection * 0.5 && projection - points >= 5) return '<span class="player-trend player-trend--bust">💀</span>';
        return '';
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
        row.innerHTML = '<img src="' + playerImageUrl(id) + '" alt="" onerror="this.onerror=null;this.src=\'/artwork/logo.png\';"><span class="player-main"><strong>' + esc(playerName(id)) + ' ' + playerTrendBadge(id) + '</strong><small>' + esc(pos + " · " + nflTeam + injury) + '</small></span><span class="player-points"><b>' + formatScore(points) + '</b><small>Proj. ' + formatScore(projection) + '</small></span>';
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
        if (previous == null || !Number.isFinite(Number(previous))) return null;
        var delta = now - Number(previous);
        if (Math.abs(delta) < 0.001) return null;
        if (teamHasNewTouchdown(matchup)) return { type: "touchdown", delta: delta };
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
        var games = teams.map(scheduleGameForTeam).filter(Boolean);
        return games.length > 0 && games.every(function (g) { return String(g.status || '').toLowerCase() === 'complete'; });
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
        state.eventHistory.unshift({ message: message, icon: icon || "" });
        state.eventHistory = state.eventHistory.slice(0, 12);
    }

    function analyzeLiveEvents(matchups, week) {
        if (week !== state.currentWeek) return;
        var seen = new Set();
        matchups.forEach(function (m) {
            var key = String(m.roster_id);
            var now = Number(m.points || 0);
            var previous = state.previousScores[key];
            if (previous != null && Math.abs(now - Number(previous)) >= 0.001) {
                var delta = now - Number(previous);
                var label = teamLabel(m);
                appendEvent(label + " " + (delta > 0 ? "gained " : "lost ") + Math.abs(delta).toFixed(2) + " points", delta > 0 ? "▲" : "▼");
            }
            getTeamPlayerIds(m).forEach(function (id) {
                if (playerTouchdownDelta(id) > 0 && !seen.has(id)) {
                    seen.add(id);
                    appendEvent(playerName(id) + " touchdown · " + teamLabel(m), "🏈🔥");
                }
            });
        });
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

    function renderBroadcastHeader() {
        var box = $('fs5-broadcast');
        if (!box) return;
        var rows = state.matchups.map(function(m){
            var pred = matchupProbability(m, state.matchups.find(function(x){return matchupKey(x)===matchupKey(m) && String(x.roster_id)!==String(m.roster_id)}) || m);
            return {m:m,p:pred};
        });
        var leader = state.matchups.slice().sort(function(a,b){return Number(b.points||0)-Number(a.points||0);})[0];
        var text = '🎙️ FS5 LIVE: ' + (leader ? teamLabel(leader) + ' currently leads the league with ' + formatScore(leader.points) + ' points.' : 'The live scoreboard is ready.');
        var close = null;
        var groups = new Map();
        state.matchups.forEach(function(m){var k=matchupKey(m);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(m);});
        groups.forEach(function(t){if(t.length>=2){var d=Math.abs(Number(t[0].points||0)-Number(t[1].points||0));if(!close||d<close.d)close={d:d,a:t[0],b:t[1]};}});
        if(close && close.d <= 8) text = '🎙️ FS5 LIVE: ' + teamLabel(close.a) + ' and ' + teamLabel(close.b) + ' are separated by only ' + formatScore(close.d) + ' points.';
        box.hidden=false; box.innerHTML='<strong>🎙️ FS5 BROADCAST</strong><span>'+esc(text.replace('🎙️ FS5 LIVE: ',''))+'</span>';
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
        var rows=[];
        state.matchups.forEach(function(m){var info=state.rosterMap.get(String(m.roster_id));if(info)rows.push({team:info.teamName,score:Number(m.points||0)});});
        rows.sort(function(a,b){return b.score-a.score;});
        if(!rows.length){box.hidden=true;return;}
        box.hidden=false;
        box.innerHTML='<div class="leaderboard-title">🏆 LIVE LEAGUE LEADERBOARD</div>'+rows.slice(0,5).map(function(r,i){return '<div class="leaderboard-row"><b>'+(['🥇','🥈','🥉'][i]||('#'+(i+1)))+'</b><span>'+esc(r.team)+'</span><strong>'+formatScore(r.score)+'</strong></div>';}).join('');
    }

    function trashTalk(a,b) {
        var pa=Number(a.points||0), pb=Number(b.points||0), diff=Math.abs(pa-pb);
        var winner=pa>=pb?teamLabel(a):teamLabel(b), loser=pa>=pb?teamLabel(b):teamLabel(a);
        if(diff<2) return '😈 TRASH TALK: Nobody is talking yet. This one is too close.';
        if(diff<8) return '😈 TRASH TALK: '+esc(winner)+' has the bragging rights… for now.';
        if(diff<20) return '😈 TRASH TALK: '+esc(loser)+' may want to check the waiver wire.';
        return '😈 TRASH TALK: '+esc(loser)+' is currently getting sent to the shadow realm.';
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
        if(min>=45&&max<=55)return ' matchup-card--nail';
        if(max>=90)return ' matchup-card--danger';
        if(Math.abs(Number(teams[0].points||0)-Number(teams[1].points||0))<=5)return ' matchup-card--close';
        return '';
    }

    function renderLiveTicker() {
        var ticker = $("live-event-ticker");
        if (!ticker) return;
        if (!state.eventHistory.length) {
            ticker.innerHTML = '<span class="live-ticker__label">LIVE FEED</span><span class="live-ticker__empty">Waiting for scoring activity…</span>';
            return;
        }
        ticker.innerHTML = '<span class="live-ticker__label">LIVE FEED</span>' + state.eventHistory.slice(0, 5).map(function (e) {
            return '<span class="live-ticker__item"><b>' + esc(e.icon) + '</b> ' + esc(e.message) + '</span>';
        }).join('');
    }

    function matchupAlert(a, b) {
        var pred = matchupProbability(a, b);
        var key = matchupKey(a) || (String(a.roster_id) + '-' + String(b.roster_id));
        var previous = state.previousProbabilities[key];
        var labels = [teamLabel(a), teamLabel(b)];
        var alert = null;
        if (previous && Math.abs(pred.a - previous) >= 12 && ((previous < 50 && pred.a >= 50) || (previous >= 50 && pred.a < 50))) {
            alert = { type: 'lead', text: '⚡ LEAD CHANGE' };
        } else if (pred.a >= 65 && previous != null && previous < 50) {
            alert = { type: 'upset', text: '🚨 UPSET ALERT · ' + labels[0] };
        } else if (pred.b >= 65 && previous != null && previous > 50) {
            alert = { type: 'upset', text: '🚨 UPSET ALERT · ' + labels[1] };
        } else if (Math.min(pred.a, pred.b) >= 45 && Math.max(pred.a, pred.b) <= 55) {
            alert = { type: 'nail', text: '😬 NAIL BITER' };
        } else if (Math.max(pred.a, pred.b) >= 90) {
            alert = { type: 'danger', text: '🚨 DANGER ZONE' };
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
        var reaction = getScoreReaction(matchup, week);
        if (reaction) {
            var badge = document.createElement("span");
            badge.className = "score-reaction score-reaction--" + reaction.type;
            badge.setAttribute("aria-label", reaction.type === "touchdown" ? "Touchdown" : (reaction.type === "up" ? "Score increased" : "Score decreased"));
            badge.textContent = reaction.type === "touchdown" ? "🏈🔥" : (reaction.type === "up" ? "▲" : "▼");
            box.appendChild(badge);
            var timerKey = String(matchup.roster_id);
            clearTimeout(state.reactionTimers[timerKey]);
            state.reactionTimers[timerKey] = setTimeout(function () {
                if (badge && badge.parentNode) {
                    badge.classList.add("is-hiding");
                    setTimeout(function () { if (badge && badge.parentNode) badge.parentNode.removeChild(badge); }, 220);
                }
            }, reaction.type === "touchdown" ? 10000 : 2200);
        }
        return box;
    }

    function captureGameFlow(matchups, week) {
        if (week !== state.currentWeek) return;
        var key = 'fs5_gameflow_' + LEAGUE_ID + '_w' + week;
        var data={};
        try { data=JSON.parse(localStorage.getItem(key)||'{}')||{}; } catch(e) { data={}; }
        var stamp=Date.now();
        matchups.forEach(function(m){
            var k=matchupKey(m); if(!data[k]) data[k]=[];
            var pts=Number(m.points||0);
            var last=data[k][data[k].length-1];
            if(!last || Math.abs(Number(last.points)-pts)>=0.01) data[k].push({time:stamp,points:pts});
            if(data[k].length>80) data[k]=data[k].slice(-80);
        });
        try { localStorage.setItem(key,JSON.stringify(data)); } catch(e) {}
        state.gameFlow=data;
    }

    function renderGameFlow(teams) {
        var wrap=document.createElement('div'); wrap.className='game-flow';
        var key=matchupKey(teams[0]), points=(state.gameFlow&&state.gameFlow[key])||[];
        var byTeam={};
        [teams[0],teams[1]].forEach(function(m){byTeam[String(m.roster_id)]=(state.gameFlow&&state.gameFlow[matchupKey(m)])||[];});
        var all=[]; Object.keys(byTeam).forEach(function(k){byTeam[k].forEach(function(x){all.push(x.time);});});
        var minT=all.length?Math.min.apply(null,all):Date.now()-3600000, maxT=all.length?Math.max.apply(null,all):Date.now();
        if(maxT<=minT) maxT=minT+1;
        var w=560,h=170,pad=26;
        var lines=Object.keys(byTeam).map(function(rid,idx){var pts=byTeam[rid];var m=teams.find(function(t){return String(t.roster_id)===rid;}); if(!pts.length) pts=[{time:minT,points:Number(m.points||0)}]; var minP=0,maxP=Math.max.apply(null,pts.map(function(x){return Number(x.points)||0}).concat([Number(m.points||0),1])); var path=pts.map(function(x,i){var xPos=pad+(Number(x.time)-minT)/(maxT-minT)*(w-2*pad);var y=h-pad-(Number(x.points)||0)/maxP*(h-2*pad);return (i?'L':'M')+xPos.toFixed(1)+' '+y.toFixed(1);}).join(' ');return {path:path,name:teamLabel(m)};});
        wrap.innerHTML='<div class="game-flow__head"><strong>📊 GAME FLOW</strong><span>Score history since Live Scores opened</span></div><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Matchup score history"><line x1="'+pad+'" y1="'+(h-pad)+'" x2="'+(w-pad)+'" y2="'+(h-pad)+'"/><line x1="'+pad+'" y1="'+pad+'" x2="'+pad+'" y2="'+(h-pad)+'"/>'+lines.map(function(l,i){return '<path class="game-flow__line game-flow__line--'+i+'" d="'+l.path+'"/><text x="'+(w-pad)+'" y="'+(pad+14+i*18)+'" text-anchor="end">'+esc(l.name)+'</text>';}).join('')+'</svg>';
        return wrap;
    }

    function renderMatchups(matchups, week) {
        grid.replaceChildren();
        kicker.textContent = "WEEK " + week;
        heading.textContent = weekLabel(week);
        badge.textContent = "Week " + week;
        state.matchups = Array.isArray(matchups) ? matchups : [];
        captureGameFlow(state.matchups, week);
        analyzeLiveEvents(state.matchups, week);
        renderLiveTicker();
        renderWhatJustHappened();
        renderBroadcastHeader();
        renderWatching();
        renderLeagueLeaderboard();
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
                var scoreBox = renderScoreBox(matchup, week);
                team.appendChild(identity); team.appendChild(scoreBox); card.appendChild(team);
                if (index === 0) { var divider = document.createElement("div"); divider.className = "vs-divider"; divider.innerHTML = '<span>VS</span>'; card.appendChild(divider); }
            });
            appendPredictor(card, teams);
            appendMatchupSuperlatives(card, teams);
            appendProjectedFinish(card, teams);
            appendPointsBank(card, teams);
            var trash = document.createElement("div"); trash.className="trash-talk"; trash.innerHTML=trashTalk(teams[0],teams[1]); card.appendChild(trash);
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
        body.appendChild(renderGameFlow(teams));
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
            state.previousStats = state.stats || {};
            state.stats = results[1].status === "fulfilled" && results[1].value ? results[1].value : {};
            state.projections = results[2].status === "fulfilled" && results[2].value ? results[2].value : {};
            renderMatchups(state.matchups, week);
            state.matchups.forEach(function (m) { if (m && m.roster_id != null) state.previousScores[String(m.roster_id)] = Number(m.points || 0); });
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
