(function () {
    "use strict";

    var LEAGUE_ID = "1387297022695993344";
    var REFRESH_MS = 45000;
    var state = {
        currentWeek: 1,
        selectedWeek: 1,
        rosters: [],
        users: [],
        rosterMap: new Map()
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

    function esc(value) {
        return String(value == null ? "" : value).replace(/[&<>'"]/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c];
        });
    }

    function api(path) {
        var url = "/.netlify/functions/sleeper?source=app&path=" + encodeURIComponent(path);
        return fetch(url, { cache: "no-store", headers: { "Accept": "application/json" } }).then(function (response) {
            return response.text().then(function (text) {
                var data = null;
                try { data = text ? JSON.parse(text) : null; } catch (e) {}
                if (!response.ok) {
                    throw new Error((data && data.error) || ("Sleeper API returned " + response.status));
                }
                return data;
            });
        });
    }

    function setStatus(text, kind) {
        status.textContent = text;
        status.className = "live-status" + (kind ? " is-" + kind : "");
    }

    function avatarUrl(user) {
        if (user && user.avatar) {
            return "https://sleepercdn.com/avatars/thumbs/" + encodeURIComponent(user.avatar);
        }
        return "/artwork/logo.png";
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
                user: user,
                teamName: teamName(user),
                account: user && user.username ? "@" + user.username : "",
                avatar: avatarUrl(user),
                wins: Number(settings.wins || 0),
                losses: Number(settings.losses || 0),
                ties: Number(settings.ties || 0)
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

    function weekLabel(week) {
        return week <= 14 ? "Regular Season" : "Postseason";
    }

    function renderMatchups(matchups, week) {
        grid.replaceChildren();
        kicker.textContent = "WEEK " + week;
        heading.textContent = weekLabel(week);
        badge.textContent = "Week " + week;

        var groups = new Map();
        (Array.isArray(matchups) ? matchups : []).forEach(function (item) {
            if (!item || item.matchup_id == null) return;
            var key = String(item.matchup_id);
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(item);
        });

        if (!groups.size) {
            grid.hidden = true;
            empty.hidden = false;
            empty.textContent = "No matchup data is available for this week.";
            return;
        }

        grid.hidden = false;
        empty.hidden = true;

        Array.from(groups.entries()).sort(function (a, b) {
            return Number(a[0]) - Number(b[0]);
        }).forEach(function (entry) {
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
            head.appendChild(label);
            head.appendChild(stateText);
            card.appendChild(head);

            teams.forEach(function (matchup, index) {
                var info = state.rosterMap.get(String(matchup.roster_id));
                var team = document.createElement("div");
                team.className = "matchup-team";

                var identity = document.createElement("div");
                identity.className = "matchup-team__identity";

                var img = document.createElement("img");
                img.className = "team-avatar";
                img.src = info && info.avatar ? info.avatar : "/artwork/logo.png";
                img.alt = "";
                img.width = 48;
                img.height = 48;
                img.onerror = function () { this.onerror = null; this.src = "/artwork/logo.png"; };
                identity.appendChild(img);

                var text = document.createElement("div");
                var name = document.createElement("p");
                name.className = "matchup-team__name";
                name.textContent = info ? info.teamName : "Roster " + matchup.roster_id;
                text.appendChild(name);

                if (info && info.account) {
                    var account = document.createElement("div");
                    account.className = "matchup-team__owner";
                    account.textContent = info.account;
                    text.appendChild(account);
                }
                if (info) {
                    var record = document.createElement("div");
                    record.className = "matchup-team__owner";
                    record.textContent = "Record: " + info.wins + "-" + info.losses + "-" + info.ties;
                    text.appendChild(record);
                }
                identity.appendChild(text);

                var scoreWrap = document.createElement("div");
                var score = document.createElement("div");
                score.className = "matchup-team__score";
                score.textContent = formatScore(matchup.points);
                scoreWrap.appendChild(score);

                team.appendChild(identity);
                team.appendChild(scoreWrap);
                card.appendChild(team);

                if (index === 0) {
                    var divider = document.createElement("div");
                    divider.className = "vs-divider";
                    var vs = document.createElement("span");
                    vs.textContent = "VS";
                    divider.appendChild(vs);
                    card.appendChild(divider);
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
            renderMatchups(matchups, week);
            weekContext.textContent = week === state.currentWeek
                ? "Current week · live scoring · auto-refresh every 45 seconds"
                : "2026 season · " + weekLabel(week);
            setStatus(week === state.currentWeek ? "Live · Sleeper connected" : "Historical week", week === state.currentWeek ? "live" : "");
        } catch (error) {
            console.error("FS5 Sleeper matchup request failed", error);
            grid.replaceChildren();
            grid.hidden = true;
            empty.hidden = false;
            empty.textContent = "Sleeper matchup data could not be loaded. Please try again.";
            weekContext.textContent = "Unable to load Week " + week + ". " + (error.message || "Unknown Sleeper error");
            setStatus("Sleeper connection error", "error");
        } finally {
            grid.setAttribute("aria-busy", "false");
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

            var nflState = results[0] || {};
            state.currentWeek = Number(nflState.display_week || nflState.week || 1);
            state.selectedWeek = state.currentWeek;
            state.rosters = Array.isArray(results[1]) ? results[1] : [];
            state.users = Array.isArray(results[2]) ? results[2] : [];
            buildRosterMap();
            populateWeeks();
            await loadWeek(state.selectedWeek);
        } catch (error) {
            console.error("FS5 Sleeper initialization failed", error);
            setStatus("Sleeper connection error", "error");
            weekContext.textContent = "Unable to connect to Sleeper. " + (error.message || "Unknown error");
            empty.hidden = false;
            grid.hidden = true;
            empty.textContent = "The live scoreboard could not connect to Sleeper. Please refresh the page.";
        }
    }

    weekSelect.addEventListener("change", function () {
        loadWeek(Number(weekSelect.value));
    });

    refreshButton.addEventListener("click", function () {
        loadWeek(state.selectedWeek || state.currentWeek);
    });

    initialize();
    window.setInterval(function () {
        if (state.selectedWeek === state.currentWeek) loadWeek(state.currentWeek);
    }, REFRESH_MS);
})();
