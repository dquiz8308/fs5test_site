(function () {
    "use strict";

    var LEAGUE_ID = "1387297022695993344";
    var SEASON = 2026;
    var TEAM_NAMES = ["Brycen", "Will", "David", "Jordan", "Chris", "Bailey", "Mike", "Keith", "Ethan", "Matthew", "Cody", "Max"];
    var REFRESH_MS = 45000;
    var state = { currentWeek: null, selectedWeek: null, rosters: [], users: [], rosterMap: new Map() };

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

    function resolveTeamName(user) {
        var candidates = [user && user.display_name, user && user.username, user && user.metadata && user.metadata.team_name].filter(Boolean);
        for (var i = 0; i < candidates.length; i++) {
            var exact = TEAM_NAMES.find(function (name) { return normalize(name) === normalize(candidates[i]); });
            if (exact) return exact;
        }
        // Helpful fallback for display names such as "Will M" or "Matthew Smith".
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
            var user = usersById.get(String(roster.owner_id));
            state.rosterMap.set(String(roster.roster_id), {
                roster: roster,
                user: user || null,
                teamName: resolveTeamName(user),
                ownerName: user ? (user.display_name || user.username || "") : ""
            });
        });
    }

    function formatScore(value) {
        var n = Number(value);
        return Number.isFinite(n) ? n.toFixed(2) : "0.00";
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

        Array.from(groups.entries()).sort(function (a,b) { return Number(a[0]) - Number(b[0]); }).forEach(function (entry) {
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

            teams.sort(function (a,b) { return Number(b.points || 0) - Number(a.points || 0); });
            var scoreA = Number(teams[0].points || 0);
            var scoreB = Number(teams[1].points || 0);

            teams.forEach(function (matchup, index) {
                var info = state.rosterMap.get(String(matchup.roster_id));
                var team = document.createElement("div");
                team.className = "matchup-team" + (scoreA !== scoreB && index === 0 ? " is-winning" : "");

                var identity = document.createElement("div");
                identity.className = "matchup-team__identity";
                var name = document.createElement("p");
                name.className = "matchup-team__name";
                name.textContent = info ? info.teamName : "Roster " + matchup.roster_id;
                identity.appendChild(name);
                if (info && info.ownerName && info.teamName !== info.ownerName) {
                    var owner = document.createElement("div");
                    owner.className = "matchup-team__owner";
                    owner.textContent = "Owner: " + info.ownerName;
                    identity.appendChild(owner);
                }

                var scoreWrap = document.createElement("div");
                var score = document.createElement("div");
                score.className = "matchup-team__score";
                score.textContent = formatScore(matchup.points);
                scoreWrap.appendChild(score);
                if (scoreA !== scoreB && index === 0) {
                    var winning = document.createElement("div");
                    winning.className = "matchup-team__record";
                    winning.textContent = "LEADING";
                    scoreWrap.appendChild(winning);
                }
                team.appendChild(identity); team.appendChild(scoreWrap); card.appendChild(team);
                if (index === 0) {
                    var divider = document.createElement("div"); divider.className = "vs-divider";
                    var vs = document.createElement("span"); vs.textContent = "VS"; divider.appendChild(vs); card.appendChild(divider);
                }
            });
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
            grid.replaceChildren(); grid.hidden = true; empty.hidden = false; empty.textContent = "Sleeper matchup data could not be loaded. Please try again."; grid.setAttribute("aria-busy", "false");
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
                api("/league/" + LEAGUE_ID + "/users")
            ]);
            var nflState = results[0];
            state.currentWeek = Number(nflState.display_week || nflState.week || 1);
            state.selectedWeek = state.currentWeek;
            state.rosters = Array.isArray(results[1]) ? results[1] : [];
            state.users = Array.isArray(results[2]) ? results[2] : [];
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
