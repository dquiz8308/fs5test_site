(function () {
    "use strict";

    var LEAGUE_ID = "1387297022695993344";
    var SEASON = 2026;
    var TEAM_NAMES = ["Brycen", "Will", "David", "Jordan", "Chris", "Bailey", "Mike", "Keith", "Ethan", "Matthew", "Cody", "Max"];
    var REFRESH_MS = 45000;
    var state = {
        currentWeek: null, selectedWeek: null, rosters: [], users: [],
        rosterMap: new Map(), players: new Map()
    };

    var weekSelect = document.getElementById("week-select");
    var weekContext = document.getElementById("week-context");
    var refreshButton = document.getElementById("refresh-button");
    var grid = document.getElementById("matchup-grid");
    var empty = document.getElementById("empty-state");
    var status = document.getElementById("live-status");
    var heading = document.getElementById("scoreboard-heading");
    var kicker = document.getElementById("scoreboard-kicker");
    var badge = document.getElementById("week-badge");

    function api(path) {
        return fetch("https://api.sleeper.app/v1" + path, { cache: "no-store" }).then(function (response) {
            if (!response.ok) throw new Error("Sleeper API returned " + response.status);
            return response.json();
        });
    }

    function normalize(value) {
        return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    function resolveFS5TeamName(user) {
        var candidates = [
            user && user.metadata && user.metadata.team_name,
            user && user.display_name,
            user && user.username
        ].filter(Boolean);
        for (var i = 0; i < candidates.length; i++) {
            var exact = TEAM_NAMES.find(function (name) { return normalize(name) === normalize(candidates[i]); });
            if (exact) return exact;
        }
        for (var j = 0; j < candidates.length; j++) {
            var candidate = normalize(candidates[j]);
            var partial = TEAM_NAMES.filter(function (name) {
                var n = normalize(name);
                return candidate.indexOf(n) === 0 || n.indexOf(candidate) === 0;
            });
            if (partial.length === 1) return partial[0];
        }
        return (user && (user.display_name || user.username)) || "FS5 Team";
    }

    function buildRosterMap() {
        var usersById = new Map();
        state.users.forEach(function (user) { usersById.set(String(user.user_id), user); });
        state.rosterMap = new Map();
        state.rosters.forEach(function (roster) {
            var user = usersById.get(String(roster.owner_id)) || null;
            var displayName = user ? (user.display_name || user.username || "Sleeper Account") : "Sleeper Account";
            var username = user ? (user.username || "") : "";
            var avatar = user && user.avatar ? "https://sleepercdn.com/avatars/" + user.avatar : "";
            state.rosterMap.set(String(roster.roster_id), {
                roster: roster, user: user,
                teamName: resolveFS5TeamName(user),
                sleeperName: displayName,
                sleeperUsername: username,
                avatar: avatar
            });
        });
    }

    function buildPlayerMap(players) {
        state.players = new Map();
        Object.keys(players || {}).forEach(function (id) {
            state.players.set(String(id), players[id]);
        });
    }

    function formatScore(value) {
        var n = Number(value);
        return Number.isFinite(n) ? n.toFixed(2) : "0.00";
    }

    function initials(text) {
        return String(text || "FS5").trim().split(/\s+/).slice(0, 2).map(function (x) { return x.charAt(0); }).join("").toUpperCase();
    }

    function setStatus(text, kind) {
        status.textContent = text;
        status.className = "live-status" + (kind ? " is-" + kind : "");
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

    function weekLabel(week) {
        return week <= 14 ? "Regular Season" : "Postseason";
    }

    function playerLabel(id) {
        var p = state.players.get(String(id));
        if (!p) return { name: "Player " + id, pos: "" };
        return {
            name: p.full_name || p.first_name && p.last_name ? (p.first_name + " " + p.last_name) : (p.first_name || p.last_name || "Unknown Player"),
            pos: p.position || p.fantasy_positions && p.fantasy_positions[0] || ""
        };
    }

    function appendTeamAvatar(parent, info) {
        var wrap = document.createElement("div");
        wrap.className = "team-avatar";
        if (info && info.avatar) {
            var img = document.createElement("img");
            img.src = info.avatar;
            img.alt = "";
            img.loading = "lazy";
            img.onerror = function () {
                wrap.replaceChildren();
                var fallback = document.createElement("span");
                fallback.textContent = initials(info.teamName);
                wrap.appendChild(fallback);
            };
            wrap.appendChild(img);
        } else {
            var fallback = document.createElement("span");
            fallback.textContent = initials(info ? info.teamName : "FS5");
            wrap.appendChild(fallback);
        }
        parent.appendChild(wrap);
    }

    // Transparent, intentionally simple predictor: it estimates win probability from
    // the current fantasy-point margin. It does not pretend to know remaining NFL time
    // or player projections that the public Sleeper matchup endpoint does not provide.
    function predictor(scoreA, scoreB) {
        var margin = scoreA - scoreB;
        var probability = 1 / (1 + Math.exp(-margin / 15));
        probability = Math.max(0.51, Math.min(0.95, probability));
        if (margin < 0) probability = 1 - probability;
        return { probability: probability, margin: margin };
    }

    function makeLineup(info, matchup) {
        var box = document.createElement("details");
        box.className = "lineup";
        var summary = document.createElement("summary");
        summary.textContent = "Starting Lineup";
        box.appendChild(summary);

        var list = document.createElement("div");
        list.className = "lineup-list";
        var starters = Array.isArray(matchup.starters) ? matchup.starters : [];
        if (!starters.length) {
            var none = document.createElement("div");
            none.className = "lineup-empty";
            none.textContent = "Starting lineup unavailable.";
            list.appendChild(none);
        } else {
            starters.forEach(function (id) {
                var p = playerLabel(id);
                var row = document.createElement("div");
                row.className = "lineup-row";
                var pos = document.createElement("span");
                pos.className = "lineup-pos";
                pos.textContent = p.pos || "—";
                var name = document.createElement("span");
                name.className = "lineup-name";
                name.textContent = p.name;
                row.appendChild(pos); row.appendChild(name); list.appendChild(row);
            });
        }
        box.appendChild(list);

        var rosterPlayers = Array.isArray(matchup.players) ? matchup.players.map(String) : [];
        var starterSet = new Set(starters.map(String));
        var bench = rosterPlayers.filter(function (id) { return !starterSet.has(id); });
        if (bench.length) {
            var benchDetails = document.createElement("details");
            benchDetails.className = "lineup lineup--bench";
            var benchSummary = document.createElement("summary");
            benchSummary.textContent = "Bench (" + bench.length + ")";
            benchDetails.appendChild(benchSummary);
            var benchList = document.createElement("div");
            benchList.className = "lineup-list";
            bench.forEach(function (id) {
                var p = playerLabel(id);
                var row = document.createElement("div");
                row.className = "lineup-row";
                var pos = document.createElement("span");
                pos.className = "lineup-pos"; pos.textContent = p.pos || "—";
                var name = document.createElement("span");
                name.className = "lineup-name"; name.textContent = p.name;
                row.appendChild(pos); row.appendChild(name); benchList.appendChild(row);
            });
            benchDetails.appendChild(benchList);
            box.appendChild(benchDetails);
        }
        return box;
    }

    function renderMatchups(matchups, week) {
        grid.replaceChildren();
        empty.hidden = matchups.length !== 0;
        grid.hidden = matchups.length === 0;
        grid.setAttribute("aria-busy", "false");
        kicker.textContent = "WEEK " + week;
        heading.textContent = weekLabel(week);
        badge.textContent = "Week " + week;

        var groups = new Map();
        matchups.forEach(function (item) {
            if (item.matchup_id === null || item.matchup_id === undefined) return;
            var key = String(item.matchup_id);
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(item);
        });

        Array.from(groups.entries()).sort(function (a, b) { return Number(a[0]) - Number(b[0]); }).forEach(function (entry) {
            var teams = entry[1].slice(0, 2);
            if (teams.length < 2) return;
            var card = document.createElement("article");
            card.className = "matchup-card";

            var head = document.createElement("div");
            head.className = "matchup-card__head";
            var label = document.createElement("span");
            label.className = "matchup-card__label";
            label.textContent = "Matchup " + entry[0];
            var stateText = document.createElement("span");
            stateText.className = "matchup-card__state" + (week === state.currentWeek ? " is-current" : "");
            stateText.textContent = week === state.currentWeek ? "LIVE" : (week < state.currentWeek ? "FINAL" : "UPCOMING");
            head.appendChild(label); head.appendChild(stateText); card.appendChild(head);

            var score1 = Number(teams[0].points || 0);
            var score2 = Number(teams[1].points || 0);
            var info1 = state.rosterMap.get(String(teams[0].roster_id));
            var info2 = state.rosterMap.get(String(teams[1].roster_id));
            var pred = predictor(score1, score2);
            var leaderIndex = score1 >= score2 ? 0 : 1;
            var leaderInfo = leaderIndex === 0 ? info1 : info2;
            var leaderScore = leaderIndex === 0 ? score1 : score2;
            var leaderProbability = pred.probability;

            // Keep the higher-scoring team first.
            teams.sort(function (a, b) { return Number(b.points || 0) - Number(a.points || 0); });

            teams.forEach(function (matchup, index) {
                var info = state.rosterMap.get(String(matchup.roster_id));
                var score = Number(matchup.points || 0);
                var team = document.createElement("div");
                team.className = "matchup-team" + (score1 !== score2 && index === 0 ? " is-winning" : "");

                var identity = document.createElement("div");
                identity.className = "matchup-team__identity";
                var top = document.createElement("div");
                top.className = "team-topline";
                appendTeamAvatar(top, info);

                var names = document.createElement("div");
                names.className = "team-names";
                var name = document.createElement("p");
                name.className = "matchup-team__name";
                name.textContent = info ? info.teamName : "Roster " + matchup.roster_id;
                names.appendChild(name);

                var sleeper = document.createElement("div");
                sleeper.className = "matchup-team__owner";
                sleeper.textContent = info ? "Sleeper: " + info.sleeperName + (info.sleeperUsername ? " (@" + info.sleeperUsername + ")" : "") : "Sleeper account unavailable";
                names.appendChild(sleeper);
                top.appendChild(names);
                identity.appendChild(top);

                identity.appendChild(makeLineup(info, matchup));

                var scoreWrap = document.createElement("div");
                var scoreEl = document.createElement("div");
                scoreEl.className = "matchup-team__score";
                scoreEl.textContent = formatScore(score);
                scoreWrap.appendChild(scoreEl);
                if (score1 !== score2 && ((index === 0 && teams[0].points >= teams[1].points) || (index === 1 && teams[1].points > teams[0].points))) {
                    var winning = document.createElement("div");
                    winning.className = "matchup-team__record";
                    winning.textContent = "LEADING";
                    scoreWrap.appendChild(winning);
                }
                team.appendChild(identity); team.appendChild(scoreWrap); card.appendChild(team);
                if (index === 0) {
                    var divider = document.createElement("div");
                    divider.className = "vs-divider";
                    var vs = document.createElement("span"); vs.textContent = "VS";
                    divider.appendChild(vs); card.appendChild(divider);
                }
            });

            var predictorBox = document.createElement("div");
            predictorBox.className = "predictor";
            var predictorTitle = document.createElement("div");
            predictorTitle.className = "predictor-title";
            predictorTitle.textContent = week === state.currentWeek ? "FS5 Live Predictor" : "FS5 Predictor";
            var predictorMain = document.createElement("div");
            predictorMain.className = "predictor-main";
            var pName = document.createElement("strong");
            pName.textContent = leaderInfo ? leaderInfo.teamName : "Current leader";
            var pText = document.createElement("span");
            pText.textContent = leaderScore === 0 && score1 === score2 ? "Even matchup" : "projected to win";
            predictorMain.appendChild(pName); predictorMain.appendChild(pText);
            var pPct = document.createElement("strong");
            pPct.className = "predictor-pct";
            pPct.textContent = Math.round(leaderProbability * 100) + "%";
            predictorMain.appendChild(pPct);
            predictorBox.appendChild(predictorTitle);
            predictorBox.appendChild(predictorMain);
            var meter = document.createElement("div");
            meter.className = "predictor-meter";
            var fill = document.createElement("div");
            fill.className = "predictor-meter__fill";
            fill.style.width = Math.round(leaderProbability * 100) + "%";
            meter.appendChild(fill); predictorBox.appendChild(meter);
            var note = document.createElement("div");
            note.className = "predictor-note";
            note.textContent = "Based on current score margin only; remaining-game/player projections are not available from Sleeper's public matchup feed.";
            predictorBox.appendChild(note);
            card.appendChild(predictorBox);
            grid.appendChild(card);
        });
    }

    async function loadWeek(week) {
        grid.setAttribute("aria-busy", "true");
        weekContext.textContent = "Loading Week " + week + "...";
        try {
            var matchups = await api("/league/" + LEAGUE_ID + "/matchups/" + week);
            state.selectedWeek = week;
            weekSelect.value = String(week);
            renderMatchups(Array.isArray(matchups) ? matchups : [], week);
            weekContext.textContent = (week === state.currentWeek ? "Current week · " : "2026 season · ") + weekLabel(week);
            setStatus(week === state.currentWeek ? "Live · auto-refreshing" : "Historical week", week === state.currentWeek ? "live" : "");
        } catch (error) {
            grid.replaceChildren(); grid.hidden = true; empty.hidden = false;
            empty.textContent = "Sleeper matchup data could not be loaded. Please try again.";
            grid.setAttribute("aria-busy", "false");
            weekContext.textContent = "Unable to load Week " + week;
            setStatus("Sleeper connection error", "error");
            console.error("FS5 Sleeper matchup request failed", error);
        }
    }

    async function initialize() {
        setStatus("Connecting to Sleeper...");
        try {
            var results = await Promise.all([
                api("/state/nfl"),
                api("/league/" + LEAGUE_ID + "/rosters"),
                api("/league/" + LEAGUE_ID + "/users"),
                api("/players/nfl")
            ]);
            var nflState = results[0];
            state.currentWeek = Number(nflState.display_week || nflState.week || 1);
            state.selectedWeek = Math.min(Math.max(state.currentWeek, 1), 17);
            state.rosters = Array.isArray(results[1]) ? results[1] : [];
            state.users = Array.isArray(results[2]) ? results[2] : [];
            buildPlayerMap(results[3] || {});
            buildRosterMap();
            populateWeeks();
            await loadWeek(state.selectedWeek);
        } catch (error) {
            setStatus("Sleeper connection error", "error");
            weekContext.textContent = "Unable to connect to Sleeper.";
            empty.hidden = false;
            grid.hidden = true;
            empty.textContent = "The live scoreboard could not connect to Sleeper. Please refresh the page.";
            console.error("FS5 Sleeper initialization failed", error);
        }
    }

    weekSelect.addEventListener("change", function () { loadWeek(Number(weekSelect.value)); });
    refreshButton.addEventListener("click", function () {
        if (state.selectedWeek) loadWeek(state.selectedWeek); else initialize();
    });

    initialize();
    window.setInterval(function () {
        if (state.selectedWeek === state.currentWeek) loadWeek(state.currentWeek);
    }, REFRESH_MS);
})();
