(function () {
    "use strict";

    var LEAGUE_ID = "1387297022695993344";
    // Matchup totals arrive from Sleeper separately from the player-stat feed.
    // Poll more closely during a live NFL game so the card score catches up
    // promptly, while inactive weeks retain the lighter idle cadence below.
    var REFRESH_MS = 5000;
    var IDLE_REFRESH_MS = 30000;
    var PLAYER_CACHE_MS = 24 * 60 * 60 * 1000;
    var LIVE_PLAYER_STATUS_CACHE_MS = 5 * 60 * 1000;
    var PROJECTION_CACHE_MS = 5 * 60 * 1000;
    var NOTIFICATION_PREFERENCE_KEY = "fs5_live_notifications_enabled";
    var HISTORICAL_OWNER_IDS = { bailey: 6, brycen: 1, chris: 5, cody: 11, david: 3, ethan: 9, jordan: 4, keith: 8, matthew: 10, max: 12, mike: 7, will: 2 };
    // The Head-to-Head archive uses FS5 owner IDs, while Live Scores receives
    // persistent Sleeper user IDs. Prefer this exact bridge over display names,
    // which are often unrelated to the manager's historical profile.
    var SLEEPER_TO_HISTORICAL_OWNER_IDS = { "873396844556914688": 5, "994287491060473856": 8, "995754366676115456": 1, "995758683596402688": 11, "995760405496623104": 12, "995774054126727168": 2, "995776035922739200": 4, "996081602834870272": 10, "997351128473841664": 6, "1386037394611929088": 3, "1387603074578681856": 9, "1397338882659340288": 7 };
    var state = {
        currentWeek: 1,
        selectedWeek: 1,
        openPlayerId: null,
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
        notificationsEnabled: false,
        notificationEventTimes: {},
        notificationMatchupStates: {},
        notificationsPrimed: false,
        iceNotificationStates: {},
        iceNotificationsPrimed: false,
        statsWeek: null,
        statsReadyForNotifications: false,
        broadcastCycle: 0,
        lowerThirdTimer: null,
        snapshot: null,
        gameFlow: {},
        gotwMarkets: [],
        gameCache: new Map(),
        projectionCache: new Map(),
        playerSeasonStatsCache: new Map(),
        rivalryHistoryCache: new Map(),
        lastAutoRefreshAt: 0,
        isLoading: false
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
    var notificationsToggle = $("live-notifications-toggle");
    var notificationsLabel = $("live-notifications-label");

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
                if (!response.ok) {
                    console.warn("FS5 NFL scoreboard failed", { status: response.status, data: data });
                    throw new Error((data && data.error) || "NFL scoreboard unavailable");
                }
                var source = response.headers.get("X-FS5-Scoreboard-Source") || "unknown";
                console.info("FS5 NFL scoreboard connected", { source: source, games: Array.isArray(data) ? data.length : 0 });
                return Array.isArray(data) ? data : [];
            });
        });
    }

    function mapEspnScoreboard(data, week) {
        return (data && Array.isArray(data.events) ? data.events : []).map(function (event) {
            var competition = event.competitions && event.competitions[0] || {};
            var competitors = competition.competitors || [];
            var home = competitors.find(function (team) { return team.homeAway === "home"; }) || {};
            var away = competitors.find(function (team) { return team.homeAway === "away"; }) || {};
            var status = competition.status || event.status || {};
            var type = status.type || {};
            var teamCode = function (entry) {
                return entry.team && (entry.team.abbreviation || entry.team.shortDisplayName || entry.team.displayName) || "";
            };
            return {
                id: event.id,
                week: Number(week),
                start_time: event.date,
                home: teamCode(home),
                away: teamCode(away),
                home_score: home.score != null ? Number(home.score) : null,
                away_score: away.score != null ? Number(away.score) : null,
                status: type.completed ? "complete" : (type.state === "in" ? "in_game" : "pre_game"),
                period: Number(status.period || 0),
                clock: status.displayClock || ""
            };
        }).filter(function (game) { return game.home && game.away; });
    }

    function directScoreboardApi(week) {
        // ESPN permits this cross-origin request. It is only a fallback for a
        // temporary Netlify-function failure, so the normal server-side path
        // remains the primary source.
        var url = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=" +
            encodeURIComponent(week) + "&seasontype=2&season=2026&limit=1000";
        return fetch(url, { cache: "no-store", headers: { "Accept": "application/json" } }).then(function (response) {
            if (!response.ok) throw new Error("ESPN scoreboard returned " + response.status);
            return response.json();
        }).then(function (data) {
            var games = mapEspnScoreboard(data, week);
            if (!games.length) throw new Error("ESPN scoreboard returned no games");
            console.info("FS5 NFL scoreboard connected directly to ESPN", { games: games.length });
            return games;
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

    function notificationsSupported() {
        return "Notification" in window;
    }

    function updateNotificationsToggle() {
        if (!notificationsToggle || !notificationsLabel) return;
        var permission = notificationsSupported() ? Notification.permission : "unsupported";
        var enabled = state.notificationsEnabled && permission === "granted";
        notificationsToggle.classList.toggle("is-enabled", enabled);
        notificationsToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
        notificationsToggle.disabled = permission === "unsupported" || permission === "denied";
        if (permission === "unsupported") notificationsLabel.textContent = "Notifications unavailable";
        else if (permission === "denied") notificationsLabel.textContent = "Notifications blocked";
        else notificationsLabel.textContent = enabled ? "Notifications on" : "Notifications off";
    }

    function saveNotificationsPreference(enabled) {
        state.notificationsEnabled = Boolean(enabled);
        try { localStorage.setItem(NOTIFICATION_PREFERENCE_KEY, state.notificationsEnabled ? "true" : "false"); } catch (e) {}
        updateNotificationsToggle();
    }

    function sendLiveNotification(title, message, eventKey) {
        if (!state.notificationsEnabled || !notificationsSupported() || Notification.permission !== "granted") return;
        var key = String(eventKey || title);
        var now = Date.now();
        if (state.notificationEventTimes[key] && now - state.notificationEventTimes[key] < 2 * 60 * 1000) return;
        state.notificationEventTimes[key] = now;
        try {
            new Notification(title, { body: message, icon: "/artwork/fs5-ios-icon.png", tag: "fs5-live-" + key, renotify: true });
        } catch (error) {
            console.warn("FS5 live notification could not be displayed", error);
        }
    }

    function initializeLiveNotifications() {
        var saved = false;
        try { saved = localStorage.getItem(NOTIFICATION_PREFERENCE_KEY) === "true"; } catch (e) {}
        state.notificationsEnabled = saved && notificationsSupported() && Notification.permission === "granted";
        updateNotificationsToggle();
        if (!notificationsToggle) return;
        notificationsToggle.addEventListener("click", function () {
            if (!notificationsSupported() || Notification.permission === "denied") {
                updateNotificationsToggle();
                return;
            }
            if (state.notificationsEnabled) {
                saveNotificationsPreference(false);
                return;
            }
            Notification.requestPermission().then(function (permission) {
                saveNotificationsPreference(permission === "granted");
            }).catch(function () { saveNotificationsPreference(false); });
        });
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

    function defenseTeamLogoCode(team) {
        var code = String(team || "").trim().toLowerCase();
        var aliases = { jac: "jax", was: "wsh", lvr: "lv", oak: "lv", sd: "lac", stl: "lar" };
        return aliases[code] || code;
    }

    function playerImageUrl(playerId) {
        var player = playerMeta(playerId);
        // Sleeper represents D/STs as team entries. They have no player
        // headshot, so show the NFL club mark instead of the generic fallback.
        if (String(player.position || "").toUpperCase() === "DEF" && player.team) {
            return "https://a.espncdn.com/i/teamlogos/nfl/500/" + encodeURIComponent(defenseTeamLogoCode(player.team)) + ".png";
        }
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

    function playerPracticeStatus(player) {
        var value = player && (player.practice_participation || player.practiceParticipation || player.practice_status || player.practiceStatus);
        return String(value || '').trim();
    }

    function weekHasPublishedGames() {
        var selectedWeek = Number(state.selectedWeek);
        var games = (Array.isArray(state.nflGames) && state.nflGames.length) ? state.nflGames : state.schedule;
        return Array.isArray(games) && games.some(function (game) {
            var gameWeek = Number(game && game.week);
            return !Number.isFinite(gameWeek) || gameWeek === selectedWeek;
        });
    }

    function playerAvailability(id) {
        var player = playerMeta(id) || {};
        // Sleeper's player availability is current data. Never project it back
        // onto a completed historical week, where it would be misleading.
        if (Number(state.selectedWeek) < Number(state.currentWeek)) return null;
        var rosterStatus = String(player.status || '').toLowerCase();
        var injuryStatus = String(player.injury_status || player.injuryStatus || '').toLowerCase();
        var practice = playerPracticeStatus(player);
        var team = String(player.team || '').toUpperCase();
        var unavailableTitle = [player.status, player.injury_status || player.injuryStatus, player.injury_body_part || player.injuryBodyPart].filter(Boolean).join(' · ');

        if (player.active === false || /(?:^|\s)inactive(?:\s|$)/.test(rosterStatus)) {
            return { label: 'INACTIVE', kind: 'inactive', title: unavailableTitle || 'Not active for this NFL game' };
        }
        if (/suspend/.test(rosterStatus)) return { label: 'SUSP.', kind: 'out', title: unavailableTitle || 'Suspended' };
        if (/(injured reserve|\bir\b|physically unable|\bpup\b|non-football injury|\bnfi\b)/.test(rosterStatus) || injuryStatus === 'out') {
            return { label: 'OUT', kind: 'out', title: unavailableTitle || 'Unavailable' };
        }
        if (injuryStatus === 'doubtful') return { label: 'DOUBTFUL', kind: 'doubtful', title: unavailableTitle || 'Doubtful' };
        if (injuryStatus === 'questionable') return { label: 'GTD', kind: 'gtd', title: unavailableTitle || 'Game-time decision' };

        if (team && team !== 'FA' && weekHasPublishedGames() && !scheduleGameForTeam(team, state.selectedWeek)) {
            return { label: 'BYE', kind: 'bye', title: 'No NFL game this week' };
        }

        var practiceCode = practice.toUpperCase();
        if (/^(DNP|DID NOT PRACTICE)$/.test(practiceCode)) return { label: 'DNP', kind: 'practice', title: 'Did not practice' };
        if (/^(LP|LIMITED|LIMITED PARTICIPATION)$/.test(practiceCode)) return { label: 'LIMITED', kind: 'practice', title: 'Limited practice participation' };
        return null;
    }

    function playerAvailabilityBadge(id, detail) {
        var availability = playerAvailability(id);
        if (!availability) return '';
        return '<span class="player-status-badge player-status-badge--' + availability.kind + (detail ? ' player-status-badge--detail' : '') + '" title="' + esc(availability.title) + '">' + esc(availability.label) + '</span>';
    }

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

    function playerGameHasStarted(id) {
        var p = playerMeta(id) || {};
        var status = gameStatus(scheduleGameForTeam(p.team, state.selectedWeek));
        return status === "in_game" || status === "complete";
    }

    function playerTrendBadge(id) {
        // These badges describe fresh scoring activity. Historical week loads
        // compare against the live snapshot, which can otherwise create false
        // touchdown, score-swing, and projection-reaction emotes.
        if (Number(state.selectedWeek) < Number(state.currentWeek)) return "";
        var points = getPlayerPoints(id), projection = getProjection(id), prev = getPreviousPlayerPoints(id);
        var badges = [];
        // Player performance badges describe actual football activity. A future
        // starter has not had a chance to meet or miss a projection yet.
        if (!playerGameHasStarted(id)) return "";
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
        // Prefer an actual kickoff timestamp. Do NOT parse a date-only Sleeper
        // value as UTC midnight: e.g. `2026-09-13` becomes Sep 12 at 8 PM ET,
        // which was the source of the incorrect dates/times in the matchup popup.
        var candidates = [game.start_time, game.startTime, game.start, game.scheduled, game.kickoff, game.datetime];
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

    function playerGameCalendarDate(game) {
        if (!game) return "";
        if (game.eastern_date) return String(game.eastern_date);
        var raw = String(game.date || "");
        var match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) return "";
        var y = Number(match[1]), m = Number(match[2]), d = Number(match[3]);
        if (!y || !m || !d) return "";
        var dt = new Date(y, m - 1, d, 12, 0, 0, 0);
        return new Intl.DateTimeFormat("en-US", { weekday:"short", month:"short", day:"numeric", year:"numeric" }).format(dt);
    }

    function viewerKickoffText(start) {
        if (!Number.isFinite(start)) return "";
        // Let the browser choose both the viewer's locale and time zone. ESPN
        // supplies an absolute kickoff timestamp, so this remains accurate for
        // every viewer without treating a date-only schedule value as midnight.
        return new Intl.DateTimeFormat(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short"
        }).format(new Date(start));
    }

    function playerGameInfo(id) {
        var p = playerMeta(id) || {};
        var game = scheduleGameForTeam(p.team, state.selectedWeek);
        if (!game) return null;

        var status = gameStatus(game);
        var start = playerGameStartMs(game);
        var home = String(game.home || game.home_team || game.homeTeam || "").toUpperCase();
        var away = String(game.away || game.away_team || game.awayTeam || "").toUpperCase();
        var team = String(p.team || "").toUpperCase();
        var opponent = team === home ? away : (team === away ? home : "");
        var location = opponent ? (team === home ? "vs " : "@ ") + opponent : "";

        // The player line intentionally mirrors Sleeper's useful game context:
        // LIVE  -> current quarter/clock + live score
        // FINAL -> final score only
        // UPCOMING -> real kickoff in the viewer's local time zone + opponent
        // Never parse Sleeper's date-only field as a timestamp.
        var stateText = status === "complete" ? "FINAL" : status === "in_game" ? "LIVE" : "UPCOMING";
        var stateClass = status === "complete" ? "final" : status === "in_game" ? "live" : "upcoming";
        var detailText = "";

        var hasScore = game.home_score != null && game.away_score != null &&
            Number.isFinite(Number(game.home_score)) && Number.isFinite(Number(game.away_score));

        if ((status === "in_game" || status === "complete") && hasScore) {
            var score = away + " " + game.away_score + " – " + home + " " + game.home_score;
            if (status === "in_game") {
                var clock = [game.period ? "Q" + game.period : "", game.clock || ""].filter(Boolean).join(" ");
                detailText = [clock, score].filter(Boolean).join(" · ");
            } else {
                detailText = score;
            }
        } else if (status === "in_game") {
            // Status can arrive a few seconds before the scoreboard has a score.
            // Keep the line useful instead of falling back to an incorrect kickoff.
            var liveClock = [game.period ? "Q" + game.period : "", game.clock || ""].filter(Boolean).join(" ");
            detailText = liveClock || "Game in progress";
        } else {
            // A missing/unknown status is still treated as upcoming: the ESPN
            // kickoff is more useful than an empty player line while schedules
            // are being published.
            var kickoffText = viewerKickoffText(start);
            detailText = [kickoffText || "Kickoff time TBD", location].filter(Boolean).join(" · ");
        }

        return {
            game: game,
            status: status,
            stateText: stateText,
            stateClass: stateClass,
            dateText: "",
            timeText: "",
            venueText: "",
            scoreText: detailText
        };
    }

    function renderPlayer(id, started, showGameData) {
        var p = playerMeta(id);
        var pos = p.position || "--";
        var nflTeam = p.team || "FA";
        var injury = p.injury_status ? " · " + p.injury_status : "";
        var points = getPlayerPoints(id);
        var projection = getProjection(id);
        var availabilityMarkup = playerAvailabilityBadge(id, false);
        var row = document.createElement("button");
        row.type = "button";
        row.className = "player-row" + (showGameData ? " player-row--game-data" : "");
        var gameInfo = showGameData ? playerGameInfo(id) : null;
        var gameMarkup = gameInfo ? '<span class="player-game-info player-game-info--' + gameInfo.stateClass + '"><b>' + esc(gameInfo.stateText) + '</b><span>' + esc(gameInfo.scoreText || '') + '</span></span>' : '';
        row.innerHTML = '<img src="' + playerImageUrl(id) + '" alt="" onerror="this.onerror=null;this.src=\'/artwork/logo.png\';"><span class="player-main"><strong>' + esc(playerName(id)) + ' ' + playerTrendBadge(id) + '</strong><small>' + esc(pos + " · " + nflTeam) + availabilityMarkup + esc(injury) + '</small>' + gameMarkup + '</span><span class="player-points"><b>' + formatScore(points) + '</b><small>Proj. ' + formatScore(projection) + '</small></span>';
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

        // Once every active starter on both sides has finished, there is no
        // remaining production to model. The completed scoreboard is definitive:
        // winner = 100%, loser = 0% (50/50 only for an actual tie). Bench players
        // are deliberately ignored because projectedRemaining() only uses starters.
        var finishedA = teamIsFinished(a);
        var finishedB = teamIsFinished(b);
        if (finishedA && finishedB) {
            if (scoreA > scoreB) return { a: 100, b: 0, meanA: scoreA, meanB: scoreB, remainingA: 0, remainingB: 0 };
            if (scoreB > scoreA) return { a: 0, b: 100, meanA: scoreA, meanB: scoreB, remainingA: 0, remainingB: 0 };
            return { a: 50, b: 50, meanA: scoreA, meanB: scoreB, remainingA: 0, remainingB: 0 };
        }
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
        // Only accept an actual kickoff timestamp from the real-world scoreboard.
        // Do not parse Sleeper's date-only `date` field and do not invent kickoff
        // times from generic NFL day-of-week estimates.
        var candidates = [game.start_time, game.startTime, game.start, game.scheduled, game.kickoff, game.datetime];
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
        var hasLiveGame = matchupHasActiveGame(teams[0], teams[1]);
        var favoredSide = pred.a >= pred.b ? "a" : "b";
        var trackClass = "prob-track prob-track--" + favoredSide + "-favored" + (hasLiveGame ? " prob-track--live" : "");
        var section = document.createElement("div");
        section.className = "predictor";
        section.innerHTML = '<div class="predictor-head"><div><strong>Live Predictor</strong><span class="model-tag">FS5 model · current score + projected remaining production</span></div></div>' +
            '<div class="prob-wrap"><div class="prob-labels"><b>' + esc(aInfo ? aInfo.teamName : "Team A") + ' ' + pred.a.toFixed(0) + '%</b><span>WIN PROBABILITY</span><b>' + pred.b.toFixed(0) + '% ' + esc(bInfo ? bInfo.teamName : "Team B") + '</b></div><div class="' + trackClass + '"><div class="prob-lane" aria-hidden="true"><div class="prob-fill" style="width:' + pred.a.toFixed(2) + '%"></div><span class="prob-pulse"></span></div><div class="prob-thumb" style="left:' + pred.a.toFixed(2) + '%"><span class="prob-badge">' + Math.max(pred.a, pred.b).toFixed(0) + '%</span></div></div><div class="prob-sub">Remaining projection: ' + formatScore(pred.remainingA) + ' vs ' + formatScore(pred.remainingB) + '</div></div>';
        card.appendChild(section);
    }

    function nflTeamAliases(team) {
        var t = String(team || '').trim().toUpperCase();
        var map = {
            'ARI':['ARI','ARIZONA','CARDINALS'], 'ATL':['ATL','ATLANTA','FALCONS'],
            'BAL':['BAL','BALTIMORE','RAVENS'], 'BUF':['BUF','BUFFALO','BILLS'],
            'CAR':['CAR','CAROLINA','PANTHERS'], 'CHI':['CHI','CHICAGO','BEARS'],
            'CIN':['CIN','CINCINNATI','BENGALS'], 'CLE':['CLE','CLEVELAND','BROWNS'],
            'DAL':['DAL','DALLAS','COWBOYS'], 'DEN':['DEN','DENVER','BRONCOS'],
            'DET':['DET','DETROIT','LIONS'], 'GB':['GB','GNB','GREEN BAY','PACKERS'],
            'HOU':['HOU','HOUSTON','TEXANS'], 'IND':['IND','INDIANAPOLIS','COLTS'],
            'JAX':['JAX','JAC','JACKSONVILLE','JAGUARS'], 'KC':['KC','KAN','KANSAS CITY','CHIEFS'],
            'LV':['LV','LVR','OAK','LAS VEGAS','OAKLAND','RAIDERS'], 'LAC':['LAC','LA CHARGERS','LOS ANGELES CHARGERS','CHARGERS'],
            'LAR':['LAR','LA RAMS','LOS ANGELES RAMS','RAMS'], 'MIA':['MIA','MIAMI','DOLPHINS'],
            'MIN':['MIN','MINNESOTA','VIKINGS'], 'NE':['NE','NWE','NEW ENGLAND','PATRIOTS'],
            'NO':['NO','NOR','NEW ORLEANS','SAINTS'], 'NYG':['NYG','NEW YORK GIANTS','GIANTS'],
            'NYJ':['NYJ','NEW YORK JETS','JETS'], 'PHI':['PHI','PHILADELPHIA','EAGLES'],
            'PIT':['PIT','PITTSBURGH','STEELERS'], 'SEA':['SEA','SEATTLE','SEAHAWKS'],
            'SF':['SF','SFO','SAN FRANCISCO','49ERS'], 'TB':['TB','TAMPA BAY','BUCCANEERS','BUCS'],
            'TEN':['TEN','TENNESSEE','TITANS'], 'WAS':['WAS','WSH','WASHINGTON','COMMANDERS']
        };
        for (var key in map) if (map[key].indexOf(t) !== -1) return map[key];
        return [t];
    }

    function scheduleGameForTeam(team, week) {
        if (!team) return null;
        var aliases = nflTeamAliases(team);
        var targetWeek = Number(week != null ? week : state.selectedWeek);
        var cacheKey = String(targetWeek) + "|" + String(team).toUpperCase();
        if (state.gameCache.has(cacheKey)) return state.gameCache.get(cacheKey);

        // Sleeper is the authoritative source for fantasy-week/game state because
        // it reliably tells us whether the NFL game is pre_game, in_game or complete.
        // ESPN is the authoritative source for real-world kickoff time and NFL score.
        // Merge the two feeds by team + week. NEVER use Sleeper's `date` as a kickoff
        // timestamp; it is date-only and can shift a day when parsed as UTC.
        var sleeperGames = Array.isArray(state.schedule) ? state.schedule.filter(function (game) {
            var home = String(game.home || '').toUpperCase();
            var away = String(game.away || '').toUpperCase();
            var gameWeek = Number(game.week);
            var homeMatch = aliases.some(function(x){ return nflTeamAliases(home).indexOf(x) !== -1; });
            var awayMatch = aliases.some(function(x){ return nflTeamAliases(away).indexOf(x) !== -1; });
            return (homeMatch || awayMatch) && (!Number.isFinite(targetWeek) || !Number.isFinite(gameWeek) || gameWeek === targetWeek);
        }) : [];

        var espnGames = Array.isArray(state.nflGames) ? state.nflGames.filter(function (game) {
            var home = String(game.home || game.home_team || game.homeTeam || '').toUpperCase();
            var away = String(game.away || game.away_team || game.awayTeam || '').toUpperCase();
            var gameWeek = Number(game.week);
            var homeMatch = aliases.some(function(x){ return nflTeamAliases(home).indexOf(x) !== -1; });
            var awayMatch = aliases.some(function(x){ return nflTeamAliases(away).indexOf(x) !== -1; });
            return (homeMatch || awayMatch) && (!Number.isFinite(targetWeek) || !Number.isFinite(gameWeek) || gameWeek === targetWeek);
        }) : [];

        // Match the real-world ESPN game to the Sleeper game by both teams.
        var sleeper = sleeperGames[0] || null;
        var espn = espnGames[0] || null;
        if (!sleeper && !espn) {
            state.gameCache.set(cacheKey, null);
            return null;
        }

        if (espn) {
            var merged = Object.assign({}, espn);
            if (sleeper) {
                // A schedule record can remain `pre_game` after kickoff. Never let
                // that stale state suppress an ESPN in-progress game: every live
                // surface (Watching, feed, ribbons and auto-refresh) relies on this
                // normalized status. A confirmed final still takes precedence.
                var sleeperState = gameStatus(sleeper);
                var espnState = gameStatus(espn);
                if (sleeper.status) merged.sleeper_status = String(sleeper.status).toLowerCase();
                if (sleeperState === 'complete' || espnState === 'complete') merged.status = 'complete';
                else if (sleeperState === 'in_game' || espnState === 'in_game') merged.status = 'in_game';
                else if (sleeperState === 'pre_game' || espnState === 'pre_game') merged.status = 'pre_game';
                if (!merged.home) merged.home = sleeper.home;
                if (!merged.away) merged.away = sleeper.away;
            }
            state.gameCache.set(cacheKey, merged);
            return merged;
        }

        // ESPN did not return this game. Keep the Sleeper game so FINAL/LIVE/UPCOMING
        // state still works, but deliberately do not manufacture a kickoff time.
        var sleeperOnly = Object.assign({}, sleeper, {
            start_time: null,
            startTime: null,
            start: null,
            scheduled: null,
            kickoff: null,
            datetime: null,
            eastern_date: '',
            eastern_time: '',
            home_score: null,
            away_score: null
        });
        state.gameCache.set(cacheKey, sleeperOnly);
        return sleeperOnly;
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
        label.innerHTML = "<span>Available Playing Time <strong>" + pct + "%</strong></span>";

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
        if (Number(week) !== Number(state.currentWeek)) return null;
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

    function playerTouchdownTotal(id) {
        var stats = state.stats && state.stats[String(id)] || {};
        var keys = ["rec_td", "rush_td", "pass_td", "def_td", "fum_td", "st_td", "kr_td", "pr_td"];
        return keys.reduce(function (sum, key) { return sum + statNumber(stats, [key]); }, 0);
    }

    function appendEvent(message, icon, notify, notificationKey) {
        if (!message) return;
        var eventKey = notificationKey ? String(notificationKey) : "";
        // Rendering can occur twice when the matchup and player-stat requests
        // resolve close together. Keep a scored event once in the shared feed,
        // while a later touchdown receives a new cumulative-TD key.
        if (eventKey && state.eventHistory.some(function (event) { return event.eventKey === eventKey; })) return;
        state.eventHistory.unshift({ message: message, icon: icon || "", at: Date.now(), eventKey: eventKey });
        state.eventHistory = state.eventHistory.slice(0, 12);
        if (notify) sendLiveNotification("FS5 Live Scores", message, eventKey || message);
    }

    function analyzeLiveEvents(matchups, week) {
        if (week !== state.currentWeek) return;
        var seen = new Set();
        matchups.forEach(function (m) {
            var liveStarters = getTeamPlayerIds(m).filter(function(id){ var meta=playerMeta(id)||{}; return gameStatus(scheduleGameForTeam(meta.team, week)) === 'in_game'; });
            var key = String(m.roster_id), now = Number(m.points || 0), previous = state.previousScores[key];
            if (liveStarters.length && previous != null && Math.abs(now - Number(previous)) >= 0.001) {
                var delta = now - Number(previous);
                appendEvent(teamLabel(m) + " " + (delta > 0 ? "gained " : "lost ") + Math.abs(delta).toFixed(2) + " points", delta > 0 ? "▲" : "▼", false, "score-" + key + "-" + now.toFixed(2));
            }
            liveStarters.forEach(function (id) {
                if (playerTouchdownDelta(id) > 0 && !seen.has(id)) {
                    seen.add(id);
                    appendEvent(playerName(id) + " touchdown · " + teamLabel(m), "🏈🔥", true, "touchdown-" + id + "-" + playerTouchdownTotal(id));
                }
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
                if (gameStatus(game) === 'in_game') count++;
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

        // The Chaos Meter is a live-game feature. Hide it on historical/future
        // weeks, before kickoff, and once every matchup is officially final.
        // This keeps the meter focused on football that is actually in progress.
        var hasCompleteMatchupData = groups.size > 0;
        var allResultsFinal = hasCompleteMatchupData;
        groups.forEach(function(t){
            if (t.length < 2 || !teamIsFinished(t[0]) || !teamIsFinished(t[1])) {
                allResultsFinal = false;
            }
        });
        if (state.selectedWeek !== state.currentWeek || !liveNflGameInProgress() || allResultsFinal) {
            box.hidden = true;
            box.innerHTML = '';
            return;
        }

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
                rows.push({a:a,b:b,p:p,diff:Math.abs(Number(a.points||0)-Number(b.points||0)), finished:teamIsFinished(a)&&teamIsFinished(b)});
            }
        });

        var leader = state.matchups.slice().sort(function(a,b){return Number(b.points||0)-Number(a.points||0);})[0];
        var leagueLeader = leader ? teamLabel(leader) + ' leads the league at ' + formatScore(leader.points) + ' points.' : 'The scoreboard is ready.';
        var messages = [];
        var activeRows = rows.filter(function(r){ return !r.finished; });
        var finalRows = rows.filter(function(r){ return r.finished; });

        // A selected week can be completely pregame (especially Week 2+).
        // In that state, do not use live-game language such as "coming down to the wire"
        // or "one play can flip this matchup". Treat the broadcast as a matchup-preview booth.
        function matchupHasStarted(r) {
            var ids = getTeamPlayerIds(r.a).concat(getTeamPlayerIds(r.b));
            var seen = {};
            for (var i = 0; i < ids.length; i++) {
                var meta = playerMeta(ids[i]) || {};
                var nflTeam = meta.team;
                if (!nflTeam || seen[String(nflTeam).toUpperCase()]) continue;
                seen[String(nflTeam).toUpperCase()] = true;
                var game = scheduleGameForTeam(nflTeam, state.selectedWeek);
                var status = gameStatus(game);
                if (status === 'in_game' || status === 'complete') return true;
            }
            return false;
        }
        var pregameRows = rows.filter(function(r){ return !matchupHasStarted(r); });
        var weekHasStarted = rows.some(function(r){ return matchupHasStarted(r); });

        // FINAL matchups get their own postgame broadcast language. Do not use
        // live-game language, projected remaining points, Witching Hour, or
        // "coming down to the wire" messages once both NFL/fantasy sides are final.
        finalRows.forEach(function(r){
            var a=teamLabel(r.a), b=teamLabel(r.b), pa=Number(r.a.points||0), pb=Number(r.b.points||0);
            var winner=pa>=pb?a:b, loser=pa>=pb?b:a, margin=Math.abs(pa-pb), total=pa+pb;
            if (margin < 1) messages.push('🏁 Final: ' + a + ' and ' + b + ' finished tied at ' + formatScore(pa) + ' points.');
            else messages.push('🏁 Final: ' + winner + ' beat ' + loser + ' by ' + formatScore(margin) + ' points, ' + formatScore(Math.max(pa,pb)) + '–' + formatScore(Math.min(pa,pb)) + '.');
            messages.push('📊 ' + a + ' vs ' + b + ' combined for ' + formatScore(total) + ' fantasy points.');
            if (margin >= 20) messages.push('💥 Final margin: ' + winner + ' finished ' + formatScore(margin) + ' points ahead of ' + loser + '.');
            else if (margin < 5 && margin > 0) messages.push('😮 Final margin: just ' + formatScore(margin) + ' points separated ' + winner + ' and ' + loser + '.');

            // Highlight the highest individual fantasy scorer in the matchup when available.
            var idsA=getTeamPlayerIds(r.a), idsB=getTeamPlayerIds(r.b), ids=idsA.concat(idsB), best=null;
            ids.forEach(function(id){
                var pts=Number(getPlayerPoints(id)||0);
                if(!best || pts>best.points) best={id:id,points:pts};
            });
            if(best && best.points>0) messages.push('⭐ ' + playerName(best.id) + ' led this matchup with ' + formatScore(best.points) + ' fantasy points.');
        });

        if (rows.length && !weekHasStarted && !finalRows.length) {
            // PREVIEW MODE: every matchup in the selected week is still waiting
            // for its first NFL game to kick off. Keep the booth focused on
            // projected scores, win probabilities, and the matchups to watch.
            messages.push('🎬 FS5 WEEK ' + state.selectedWeek + ' PREVIEW: The matchups are set. Here is what the booth is watching before kickoff.');

            var previewRows = rows.slice().sort(function(a,b){
                return Math.max(b.p.a, b.p.b) - Math.max(a.p.a, a.p.b);
            });
            previewRows.forEach(function(r, index){
                var a=teamLabel(r.a), b=teamLabel(r.b);
                var projectedA=Number(r.p.meanA||0), projectedB=Number(r.p.meanB||0);
                var favored=Number(r.p.a||50) >= Number(r.p.b||50) ? a : b;
                var favoredPct=Math.max(Number(r.p.a||50), Number(r.p.b||50));
                if (index < 3) {
                    messages.push('🔮 Preview: ' + a + ' vs ' + b + ' — projected ' + formatScore(projectedA) + ' to ' + formatScore(projectedB) + '. The model gives ' + favored + ' a ' + favoredPct.toFixed(0) + '% win probability.');
                }
            });

            var topProjected = rows.slice().sort(function(a,b){
                return (Number(b.p.meanA||0)+Number(b.p.meanB||0)) - (Number(a.p.meanA||0)+Number(a.p.meanB||0));
            })[0];
            if (topProjected) {
                messages.push('👀 Matchup to watch: ' + teamLabel(topProjected.a) + ' vs ' + teamLabel(topProjected.b) + ' has the highest projected combined score on the board.');
            }
        } else if (activeRows.length) {
            var activeLeader = state.matchups.slice().sort(function(a,b){return Number(b.points||0)-Number(a.points||0);})[0];
            if (activeLeader) messages.push('🎙️ ' + teamLabel(activeLeader) + ' leads the league at ' + formatScore(activeLeader.points) + ' points.');

            activeRows.forEach(function(r){
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
        } else if (finalRows.length) {
            // Everything is final: make the booth explicitly postgame rather than
            // suggesting that any matchup is still underway.
            var finalLeader = state.matchups.slice().sort(function(a,b){return Number(b.points||0)-Number(a.points||0);})[0];
            if (finalLeader) messages.push('🏆 Week ' + state.selectedWeek + ' is final. ' + teamLabel(finalLeader) + ' finished as the league scoring leader at ' + formatScore(finalLeader.points) + ' points.');
            messages.push('🎙️ FS5 POSTGAME: The scoreboard is final. The booth is breaking down the biggest performances and margins from the week.');
        }

        if(state.eventHistory && state.eventHistory.length && activeRows.length) {
            var latest=state.eventHistory[0];
            messages.push(latest.icon + ' Fresh off the live feed: ' + latest.message + '.');
        }

        if(!messages.length) messages.push('🎙️ FS5 POSTGAME: Final results are in.');

        var storageKey='fs5_broadcast_queue_' + LEAGUE_ID + '_w' + state.selectedWeek;
        var queue=[];
        try { queue=JSON.parse(localStorage.getItem(storageKey)||'[]')||[]; } catch(e) { queue=[]; }
        if(!Array.isArray(queue)) queue=[];
        var available=messages.filter(function(msg){ return queue.indexOf(msg)===-1; });
        if(!available.length){ queue=[]; available=messages.slice(); }
        var text=available[0] || messages[0];
        queue.push(text);
        queue=queue.filter(function(msg,idx){ return messages.indexOf(msg)!==-1 && queue.indexOf(msg)===idx; });
        try { localStorage.setItem(storageKey, JSON.stringify(queue.slice(-Math.max(messages.length-1,1)))); } catch(e) {}

        box.hidden=false;
        var displayText = text.replace(/^🎙️ FS5 LIVE:\s*/, '');
        // Keep the existing broadcast track node during the 10-second data
        // refresh. Replacing the HTML recreates the animated element and
        // restarts the desktop ticker from the beginning. Updating only the
        // text lets the CSS animation keep its current position/timeline.
        var viewport = box.querySelector('.fs5-broadcast__viewport');
        var track = viewport && viewport.querySelector('.fs5-broadcast__track');
        if (!viewport || !track) {
            box.innerHTML='<strong>🎙️ FS5 BROADCAST</strong><span class="fs5-broadcast__viewport"><span class="fs5-broadcast__track"></span></span>';
            viewport = box.querySelector('.fs5-broadcast__viewport');
            track = viewport && viewport.querySelector('.fs5-broadcast__track');
        }
        if (track) track.textContent = displayText;
    }

    function renderWatching() {
        var box=$('fs5-watching'); if(!box)return;
        var c=currentPlayingCount();
        box.hidden=false; box.innerHTML='<span>👀 FS5 WATCHING</span><strong>'+c.active+' active player'+(c.active===1?'':'s')+'</strong><small>of '+c.total+' starters currently in NFL games</small>';
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

    function upcomingMatchupStat(a, b, prediction) {
        var projectedTotal = Number(prediction.meanA || 0) + Number(prediction.meanB || 0);
        var projectedMargin = Math.abs(Number(prediction.meanA || 0) - Number(prediction.meanB || 0));
        var favored = prediction.a >= prediction.b ? a : b;
        var favoredProbability = Math.max(prediction.a, prediction.b);
        var starters = getTeamPlayerIds(a).concat(getTeamPlayerIds(b));
        var topPlayer = null;
        starters.forEach(function (id) {
            var projection = getProjection(id);
            if (!topPlayer || projection > topPlayer.projection) {
                topPlayer = { id: id, projection: projection };
            }
        });

        // Cycle the preview focus by matchup ID so neighboring cards surface
        // different useful data instead of repeating a generic zero-score joke.
        var id = matchupKey(a);
        var numericId = Number(id);
        var focus = Number.isFinite(numericId) ? Math.abs(numericId) % 4 :
            Math.abs(String(id).split('').reduce(function (sum, char) { return sum + char.charCodeAt(0); }, 0)) % 4;

        if (focus === 0 && topPlayer && topPlayer.projection > 0) {
            return '⚡ PLAYER TO WATCH · ' + esc(playerName(topPlayer.id)) + ' projects for ' + formatScore(topPlayer.projection) + ' points.';
        }
        if (focus === 1) {
            return '📊 PROJECTED TOTAL · ' + formatScore(projectedTotal) + ' combined points.';
        }
        if (focus === 2) {
            return '🎯 MODEL EDGE · ' + esc(teamLabel(favored)) + ' at ' + favoredProbability.toFixed(0) + '% win probability.';
        }
        return '📏 PROJECTED MARGIN · ' + esc(teamLabel(favored)) + ' by ' + formatScore(projectedMargin) + ' points.';
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
        var finished=false;
        try { finished=teamIsFinished(a) && teamIsFinished(b); } catch(e) { finished=(remA===0 && remB===0); }

        if (!finished && !matchupHasStarted(a, b)) return upcomingMatchupStat(a, b, pred);

        /*
         * FINAL MATCHUPS: use a dedicated postgame bank. This prevents the
         * broadcast from sounding like the matchup is still being played and
         * gives each matchup a different line instead of recycling 1-2 jokes.
         */
        if (finished) {
            if (diff < 1) options.push('🏁 Dead even. Nobody won, nobody lost, and both managers can blame the fantasy gods.');
            if (diff < 2) options.push('😮 Final margin: '+formatScore(diff)+' points. That is not a victory; that is a clerical error with bragging rights.');
            if (diff >= 2 && diff < 5) options.push('😮 '+esc(winner)+' survived by '+formatScore(diff)+' points. Please send the loser a sympathy GIF.');
            if (diff >= 5 && diff < 10) options.push('📏 '+esc(winner)+' won by '+formatScore(diff)+' points. The scoreboard officially says “close enough to talk trash.”');
            if (diff >= 10 && diff < 20) options.push('💀 '+esc(winner)+' put '+formatScore(diff)+' points between them. The postgame excuses have officially begun.');
            if (diff >= 20) options.push('💥 '+esc(winner)+' finished '+formatScore(diff)+' points ahead. That was less a matchup and more a scheduled demolition.');
            if (pa >= 150 || pb >= 150) options.push('🔥 Somebody in this matchup dropped '+formatScore(Math.max(pa,pb))+' points. The fantasy scoreboard needs a fire extinguisher.');
            if (pa < 100 && pb < 100) options.push('🪦 Both teams finished under 100. The fantasy football gods have ruled this matchup a crime scene.');
            if (Math.max(pa,pb) - Math.min(pa,pb) >= 30) options.push('🚨 A '+formatScore(diff)+'-point gap? That is not a close loss. That is a group-chat event.');
            if (Math.max(pa,pb) >= 140 && Math.min(pa,pb) >= 130) options.push('📈 Both teams cleared 130. This matchup had more production than some entire fantasy leagues.');
            if (pa === pb) options.push('🤝 A tie! The rare fantasy result where everyone gets to say they deserved to win.');
            options.push('🏁 Final is final. '+esc(winner)+' gets the win, while '+esc(loser)+' gets the valuable life lesson of checking the lineup earlier.');
            options.push('🎙️ Postgame report: '+esc(winner)+' has the points, '+esc(loser)+' has the screenshots, and neither has an excuse left.');
            options.push('🧾 The receipts have been printed. '+esc(winner)+' wins; '+esc(loser)+' may now begin the audit of every questionable lineup decision.');
            options.push('📣 Breaking: '+esc(winner)+' has officially been granted permission to mention this victory approximately 47 times.');
            options.push('😈 '+esc(winner)+' can talk trash until next Tuesday. '+esc(loser)+' can appeal to the fantasy commissioner.');
            options.push('🏆 '+esc(winner)+' takes the W. '+esc(loser)+' takes the postgame press conference and the microphone nobody asked for.');
            options.push('🛋️ '+esc(winner)+' gets to relax. '+esc(loser)+' gets to stare at the bench and ask “what if?” for the next six days.');
            options.push('📱 The matchup is final, which means the group chat is now the most dangerous place in the league.');
            options.push('🧠 Final score posted. '+esc(winner)+' made the right fantasy decisions; '+esc(loser)+' has several theories about why.');
            options.push('🎯 '+esc(winner)+' hit the target. '+esc(loser)+' brought a dartboard and called it strategy.');
            options.push('🫡 Respectfully, '+esc(loser)+': the scoreboard has spoken and it is not accepting counterarguments.');
            options.push('☠️ '+esc(winner)+' closed the book on this one. '+esc(loser)+' can stop refreshing the app now.');
            options.push('📊 The numbers are official: '+formatScore(pa)+'–'+formatScore(pb)+'. The excuses are unofficial and already circulating.');
            options.push('🍿 Final whistle. '+esc(winner)+' gets the popcorn; '+esc(loser)+' gets to explain that lineup to the league.');
            options.push('🗞️ Tomorrow’s headline: “'+esc(winner)+' wins.” Subheadline: “'+esc(loser)+' has thoughts.”');
            options.push('🔒 Matchup locked. '+esc(winner)+' has the W and '+esc(loser)+' has absolutely no more players to blame.');
            options.push('🎬 That is a wrap. '+esc(winner)+' gets the ending they wanted; '+esc(loser)+' gets the director’s cut of the excuses.');
            options.push('🏁 No more projections. No more sweat. No more “wait until Monday.” '+esc(winner)+' is officially on top of this matchup.');
        } else {
            // LIVE / ACTIVE MATCHUPS: keep the existing situational trash talk.
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
            if (remA===0 && remB>0 && pa>pb) options.push('😈 '+esc(teamLabel(a))+' has already run out of players. Bold move to keep this interesting.');
            if (remB===0 && remA>0 && pb>pa) options.push('😈 '+esc(teamLabel(b))+' has already run out of players. Bold move to keep this interesting.');
            if (pred.a>pred.b+20 && pa<pb) options.push('🚨 '+esc(teamLabel(a))+' is losing on the scoreboard but winning the model. Somebody tell '+esc(teamLabel(b))+' to look up.');
            if (pred.b>pred.a+20 && pb<pa) options.push('🚨 '+esc(teamLabel(b))+' is losing on the scoreboard but winning the model. Somebody tell '+esc(teamLabel(a))+' to look up.');
            if (pred.a>=60 && pa<pb) options.push('😈 '+esc(teamLabel(a))+' is behind right now, but the model has already started the comeback parade.');
            if (pred.b>=60 && pb<pa) options.push('😈 '+esc(teamLabel(b))+' is behind right now, but the model has already started the comeback parade.');
            if (diff<3 && totalRem>40) options.push('📞 The fantasy emergency hotline is open. '+esc(loser)+' is currently within striking distance.');
            if (diff>=15 && totalRem>40) options.push('🚨 '+esc(loser)+' has plenty of players left, which is exactly why '+esc(winner)+' should remain nervous.');
            if (remA===0 && remB>0 && pb>pa) options.push('⏰ '+esc(teamLabel(b))+' still has players left and '+esc(teamLabel(a))+' does not. The clock is doing some heavy lifting here.');
            if (remB===0 && remA>0 && pa>pb) options.push('⏰ '+esc(teamLabel(a))+' still has players left and '+esc(teamLabel(b))+' does not. This is getting uncomfortable.');
            if (pa>=120 && pb>=120 && diff<15) options.push('🔥 Both managers showed up with points. Unfortunately, one of them has to experience character development.');
            if (pa<80 && pb<80) options.push('🪦 The scoreboard is requesting a wellness check.');
            if (winnerProb>=85) options.push('📢 The model is yelling '+esc(winner)+' while '+esc(loser)+' is pretending not to hear it.');
            if (max<60 && diff<10) options.push('🎲 Nobody has earned the right to celebrate yet. This matchup is basically fantasy roulette.');
            if (totalRem>60 && diff<20) options.push('🍿 There is still enough football left for this to become somebody else’s problem.');
            if (totalRem>0 && totalRem<10) options.push('🫣 Less than 10 projected points remain. Refreshing the app will not create a touchdown.');
            if (diff>=30) options.push('💀 '+esc(loser)+' is down '+formatScore(diff)+'. At this point, even the waiver wire is offering thoughts and prayers.');
            if (!options.length) options.push('😈 TRASH TALK: Nobody has earned the bragging rights yet.');
        }

        if(!options.length) options.push('🎙️ FS5 BOOTH: The matchup is final, the numbers are official, and the group chat is already forming its opinions.');
        // Stable per matchup so the joke does not change every 10-second refresh.
        var hash=Math.abs((String(a.roster_id)+'|'+String(b.roster_id)+'|'+String(state.selectedWeek)).split('').reduce(function(h,c){return ((h<<5)-h)+c.charCodeAt(0)|0;},7));
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

    function appendPointsBank(card, teams) {
        var el=document.createElement('div'); el.className='points-bank';
        el.innerHTML=teams.map(function(m){var cur=Number(m.points||0), rem=projectedRemaining((state.rosterMap.get(String(m.roster_id))||{}).roster), total=Math.max(0,cur+rem), pct=total?Math.max(0,Math.min(100,cur/total*100)):0;return '<div class="points-bank__team"><div><span>💰 '+esc(teamLabel(m))+'</span><strong>'+formatScore(cur)+' banked</strong></div><div class="points-bank__track"><i style="width:'+pct.toFixed(1)+'%"></i></div><small>'+formatScore(rem)+' projected remaining</small></div>';}).join('');
        card.appendChild(el);
    }

    function appendPostgameRecap(card, teams) {
        var a = Number(teams[0].points || 0), b = Number(teams[1].points || 0);
        var margin = Math.abs(a - b);
        var result = a === b ? 'Tie game' : teamLabel(a > b ? teams[0] : teams[1]);
        var recap = document.createElement('section');
        recap.className = 'postgame-recap';
        recap.innerHTML = '<span class="postgame-recap__title">🏁 FINAL RECAP</span>' +
            '<div class="postgame-recap__stats">' +
                '<div><span>WINNER</span><strong>' + esc(result) + '</strong></div>' +
                '<div><span>MARGIN</span><strong>' + formatScore(margin) + ' pts</strong></div>' +
                '<div><span>COMBINED</span><strong>' + formatScore(a + b) + ' pts</strong></div>' +
            '</div>';
        card.appendChild(recap);
    }

    function historicalOwnerId(info) {
        if (!info) return null;
        var user = info.user || {};
        if (user.user_id != null && SLEEPER_TO_HISTORICAL_OWNER_IDS[String(user.user_id)]) return SLEEPER_TO_HISTORICAL_OWNER_IDS[String(user.user_id)];
        var candidates = [user.display_name, user.username, user.metadata && user.metadata.owner_name, info.teamName];
        for (var i = 0; i < candidates.length; i++) {
            var value = String(candidates[i] || '').toLowerCase().replace(/[^a-z]+/g, ' ').trim();
            if (!value) continue;
            var words = value.split(/\s+/);
            for (var j = 0; j < words.length; j++) {
                if (HISTORICAL_OWNER_IDS[words[j]]) return HISTORICAL_OWNER_IDS[words[j]];
            }
        }
        return null;
    }

    function fetchRivalryHistory(primaryId, secondaryId) {
        var cacheKey = String(primaryId) + ':' + String(secondaryId);
        if (state.rivalryHistoryCache.has(cacheKey)) return Promise.resolve(state.rivalryHistoryCache.get(cacheKey));
        if (!window.fs5Supabase || typeof window.fs5Supabase.getClient !== 'function') return Promise.reject(new Error('Historical rivalry data is unavailable.'));
        return window.fs5Supabase.getClient().rpc('site_h2h_page', { p_primary_owner_id: primaryId, p_secondary_owner_id: secondaryId }).then(function (result) {
            if (result.error) throw result.error;
            var data = Array.isArray(result.data) ? result.data[0] : result.data;
            if (data) state.rivalryHistoryCache.set(cacheKey, data);
            return data;
        });
    }

    function appendRivalryHistory(card, teams) {
        var aInfo = state.rosterMap.get(String(teams[0].roster_id));
        var bInfo = state.rosterMap.get(String(teams[1].roster_id));
        var section = document.createElement('section');
        section.className = 'rivalry-history';
        section.innerHTML = '<div class="rivalry-history__head"><strong>🤝 RIVALRY HISTORY</strong><span>All-time FS5 head-to-head</span></div><p class="rivalry-history__status">Loading rivalry record…</p>';
        card.appendChild(section);
        var primaryId = historicalOwnerId(aInfo), secondaryId = historicalOwnerId(bInfo);
        if (!primaryId || !secondaryId || primaryId === secondaryId) {
            section.querySelector('.rivalry-history__status').textContent = 'Historical rivalry data is not available for this matchup.';
            return;
        }
        fetchRivalryHistory(primaryId, secondaryId).then(function (data) {
            if (!section.isConnected || !data) throw new Error('No historical rivalry data returned.');
            var primary = data.primary_owner || {}, secondary = data.secondary_owner || {};
            var games = Array.isArray(data.game_log) ? data.game_log : [];
            var ties = games.filter(function (game) { return game.primary_result === 'TIE' || Number(game.primary_score) === Number(game.secondary_score); }).length;
            var recent = games[0];
            var recentText = recent ? 'Last meeting: ' + esc(recent.year) + ' W' + esc(recent.week_number) + ' · ' + formatScore(recent.primary_score) + '–' + formatScore(recent.secondary_score) : 'No completed meetings yet';
            section.innerHTML = '<div class="rivalry-history__head"><strong>🤝 RIVALRY HISTORY</strong><span>All-time FS5 head-to-head</span></div>' +
                '<div class="rivalry-history__record"><div><span>' + esc(aInfo ? aInfo.teamName : teamLabel(teams[0])) + '</span><b>' + Number(primary.wins || 0) + '</b></div><i>–</i><div><span>' + esc(bInfo ? bInfo.teamName : teamLabel(teams[1])) + '</span><b>' + Number(secondary.wins || 0) + '</b></div></div>' +
                '<div class="rivalry-history__meta"><span>' + games.length + (games.length === 1 ? ' meeting' : ' meetings') + (ties ? ' · ' + ties + (ties === 1 ? ' tie' : ' ties') : '') + '</span><span>' + recentText + '</span></div><a href="/h2h/">View full head-to-head →</a>';
        }).catch(function () {
            if (section.isConnected) section.querySelector('.rivalry-history__status').textContent = 'Rivalry history is temporarily unavailable.';
        });
    }

    function playoffTeamCount() {
        var settings = state.league && state.league.settings || {};
        var count = Number(settings.playoff_teams);
        return Number.isFinite(count) && count > 0 ? Math.floor(count) : 6;
    }

    function projectedPlayoffStandings(teams, winnerRosterId) {
        var rows = [];
        state.rosterMap.forEach(function (info, rosterId) {
            rows.push({ rosterId: String(rosterId), team: info.teamName, wins: Number(info.wins || 0), losses: Number(info.losses || 0), ties: Number(info.ties || 0), points: Number(info.pf || 0) });
        });
        var byRoster = new Map(rows.map(function (row) { return [row.rosterId, row]; }));
        var groups = new Map();
        state.matchups.forEach(function (matchup) { var key = matchupKey(matchup); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(matchup); });
        groups.forEach(function (pair) {
            if (pair.length < 2) return;
            var a = pair[0], b = pair[1], aRow = byRoster.get(String(a.roster_id)), bRow = byRoster.get(String(b.roster_id));
            if (!aRow || !bRow) return;
            aRow.points += teamProjectedFinish(a); bRow.points += teamProjectedFinish(b);
            var winner = String(a.roster_id) === String(winnerRosterId) || String(b.roster_id) === String(winnerRosterId) ? String(winnerRosterId) : (matchupProbability(a, b).a >= matchupProbability(a, b).b ? String(a.roster_id) : String(b.roster_id));
            if (winner === String(a.roster_id)) { aRow.wins++; bRow.losses++; }
            else { bRow.wins++; aRow.losses++; }
        });
        return rows.sort(function (a, b) { return (b.wins + b.ties * .5) - (a.wins + a.ties * .5) || b.points - a.points || a.team.localeCompare(b.team); });
    }

    function appendPlayoffImpact(card, teams, week) {
        // Historical weekly records are not retained in the live feed. Keep the
        // projection honest by showing it only for the current or future slate.
        if (week < state.currentWeek || state.rosterMap.size < 2) return;
        var playoffTeams = playoffTeamCount();
        var scenarios = teams.map(function (team) {
            var table = projectedPlayoffStandings(teams, team.roster_id);
            var rank = table.findIndex(function (row) { return row.rosterId === String(team.roster_id); }) + 1;
            var row = table[rank - 1] || { wins: 0, losses: 0, ties: 0 };
            return { team: teamLabel(team), rank: rank, record: row.wins + '–' + row.losses + (row.ties ? '–' + row.ties : ''), inPlayoffs: rank > 0 && rank <= playoffTeams };
        });
        var section = document.createElement('section');
        section.className = 'playoff-impact';
        section.innerHTML = '<div class="playoff-impact__head"><strong>🏟️ PLAYOFF RACE IMPACT</strong><span>Projected ' + playoffTeams + '-team field</span></div><div class="playoff-impact__scenarios">' + scenarios.map(function (scenario) {
            return '<div><span>If ' + esc(scenario.team) + ' wins</span><strong>No. ' + scenario.rank + ' seed</strong><small>' + esc(scenario.record) + ' · ' + (scenario.inPlayoffs ? 'playoff position' : Math.max(1, scenario.rank - playoffTeams) + ' spot' + (scenario.rank - playoffTeams === 1 ? '' : 's') + ' out') + '</small></div>';
        }).join('') + '</div><p>Uses current records and projected outcomes across this week’s slate. Tiebreaking is estimated by points for.</p>';
        card.appendChild(section);
    }

    function benchPlayerIds(matchup) {
        var roster = (state.rosterMap.get(String(matchup.roster_id)) || {}).roster || {};
        var starters = new Set(getTeamPlayerIds(matchup));
        return (Array.isArray(roster.players) ? roster.players : []).filter(function (id) { return id && !starters.has(String(id)); }).map(String);
    }

    function appendPostgameAwards(card, teams) {
        var starters = [], benches = [];
        teams.forEach(function (team) {
            getTeamPlayerIds(team).forEach(function (id) { starters.push({ id: id, team: team, points: getPlayerPoints(id), projection: getProjection(id) }); });
            benchPlayerIds(team).forEach(function (id) { benches.push({ id: id, team: team, points: getPlayerPoints(id) }); });
        });
        var mvp = starters.slice().sort(function (a, b) { return b.points - a.points; })[0];
        var boom = starters.filter(function (player) { return player.projection > 0; }).sort(function (a, b) { return (b.points - b.projection) - (a.points - a.projection); })[0];
        var benchByTeam = teams.map(function (team) { return { team: team, points: benchPlayerIds(team).reduce(function (sum, id) { return sum + getPlayerPoints(id); }, 0) }; });
        var mostBench = benchByTeam.slice().sort(function (a, b) { return b.points - a.points; })[0];
        var aScore = Number(teams[0].points || 0), bScore = Number(teams[1].points || 0), margin = Math.abs(aScore - bScore);
        var loser = aScore === bScore ? null : (aScore < bScore ? teams[0] : teams[1]);
        var regret = loser ? benches.filter(function (player) { return player.team === loser; }).sort(function (a, b) { return b.points - a.points; })[0] : null;
        var awards = [];
        if (boom && boom.points - boom.projection > 0) awards.push({ label: '🚀 BIGGEST BOOM', value: playerName(boom.id), detail: '+' + formatScore(boom.points - boom.projection) + ' vs projection' });
        else awards.push({ label: '📏 FINAL MARGIN', value: formatScore(margin) + ' pts', detail: margin < 5 ? 'A true escape' : 'The final separation' });
        if (regret && regret.points > margin) awards.push({ label: '🪑 BENCH REGRET', value: playerName(regret.id), detail: formatScore(regret.points) + ' bench points would have covered it' });
        else if (mostBench && mostBench.points > 0) awards.push({ label: '💺 MOST ON BENCH', value: teamLabel(mostBench.team), detail: formatScore(mostBench.points) + ' bench points' });
        if (!awards.length || !mvp) return;
        var section = document.createElement('section'); section.className = 'postgame-awards';
        section.innerHTML = awards.map(function (award) { return '<div class="postgame-award"><span>' + award.label + '</span><strong>' + esc(award.value) + '</strong><small>' + esc(award.detail) + '</small></div>'; }).join('');
        card.appendChild(section);
    }

    function cardVibe(teams) {
        var p=matchupProbability(teams[0],teams[1]), max=Math.max(p.a,p.b), min=Math.min(p.a,p.b);
        if(teamIsFinished(teams[0]) && teamIsFinished(teams[1])) return ' matchup-card--final';
        if(!matchupHasActiveGame(teams[0],teams[1])) return '';
        var timeLeft=matchupPlayingTimePct(teams[0],teams[1]);
        if(timeLeft!=null && timeLeft<10 && (p.a<70 || p.b<70))return ' matchup-card--witching';
        if(timeLeft!=null && timeLeft<50 && min>=40&&max<=60)return ' matchup-card--nail';
        if(Math.abs(Number(teams[0].points||0)-Number(teams[1].points||0))<=5)return ' matchup-card--close';
        return '';
    }

    function renderLiveTicker() {
        var ticker = $("live-event-ticker"); if (!ticker) return;
        if (Number(state.selectedWeek) < Number(state.currentWeek)) {
            ticker.hidden = true;
            ticker.textContent = "";
            return;
        }
        ticker.hidden = false;
        var events = state.eventHistory.filter(function(e){ return !e.at || Date.now()-e.at < 5*60*1000; }).slice(0,5);
        if (!events.length) {
            var active = currentPlayingCount();
            var message = active.active ? active.active + ' FS5 starter' + (active.active === 1 ? ' is' : 's are') + ' active in current NFL games.' : 'Waiting for current-game scoring activity…';
            ticker.innerHTML = '<span class="live-ticker__label">LIVE FEED</span><div class="live-ticker__viewport"><div class="live-ticker__track"><span class="live-ticker__empty">' + esc(message) + '</span></div></div>';
            return;
        }
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

    function matchupHasActiveGame(a, b) {
        return getTeamPlayerIds(a).concat(getTeamPlayerIds(b)).some(function (id) {
            var meta = playerMeta(id) || {};
            return gameStatus(scheduleGameForTeam(meta.team, state.selectedWeek)) === 'in_game';
        });
    }

    function matchupHasStarted(a, b) {
        return getTeamPlayerIds(a).concat(getTeamPlayerIds(b)).some(function (id) {
            var meta = playerMeta(id) || {};
            var status = gameStatus(scheduleGameForTeam(meta.team, state.selectedWeek));
            return status === 'in_game' || status === 'complete';
        });
    }

    function teamRecordPct(matchup) {
        var info = state.rosterMap.get(String(matchup.roster_id));
        if (!info) return null;
        var games = Number(info.wins || 0) + Number(info.losses || 0) + Number(info.ties || 0);
        return games > 0 ? (Number(info.wins || 0) + Number(info.ties || 0) * 0.5) / games : null;
    }

    function isWorseRecord(matchup, opponent) {
        var record = teamRecordPct(matchup);
        var opponentRecord = teamRecordPct(opponent);
        return record != null && opponentRecord != null && record < opponentRecord;
    }

    function matchupPlayerGames(a, b) {
        var seen = new Set();
        return getTeamPlayerIds(a).concat(getTeamPlayerIds(b)).map(function (id) {
            var meta = playerMeta(id) || {};
            return scheduleGameForTeam(meta.team, state.selectedWeek);
        }).filter(function (game) {
            if (!game) return false;
            var key = String(game.id || game.game_id || (game.away || '') + '-' + (game.home || ''));
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    function isMondayGame(game) {
        var start = gameStartMs(game);
        if (!Number.isFinite(start)) return false;
        return new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short' }).format(new Date(start)) === 'Mon';
    }

    function matchupAlert(a, b) {
        if (teamIsFinished(a) && teamIsFinished(b)) return null;
        // Live-score ribbons are reserved for matchups with an NFL game on the
        // field. Pregame and completed matchups retain their normal score state.
        if (!matchupHasActiveGame(a, b)) return null;
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
        } else if (timeLeft != null && timeLeft < 50 && isWorseRecord(a, b) && pred.a > 60) {
            alert = { type: 'upset', text: '🚨 UPSET ALERT · ' + labels[0] };
        } else if (timeLeft != null && timeLeft < 50 && isWorseRecord(b, a) && pred.b > 60) {
            alert = { type: 'upset', text: '🚨 UPSET ALERT · ' + labels[1] };
        } else if (timeLeft != null && timeLeft < 50 && Math.min(pred.a, pred.b) >= 40 && Math.max(pred.a, pred.b) <= 60) {
            alert = { type: 'nail', text: '😬 NAIL BITER' };
        }
        state.previousProbabilities[key] = pred.a;
        return alert;
    }

    function mondayNightSweat(a, b) {
        if (teamIsFinished(a) || teamIsFinished(b)) return null;
        var games = matchupPlayerGames(a, b);
        var mondayGames = games.filter(isMondayGame);
        if (!mondayGames.length) return null;
        if (!mondayGames.some(function (game) { return gameStatus(game) !== 'complete'; })) return null;

        // Do not call a Monday sweat while this matchup still has Thursday or
        // Sunday games unresolved. It becomes relevant only after those games
        // are complete and the Monday player(s) can decide the outcome.
        var nonMondayGames = games.filter(function (game) { return !isMondayGame(game); });
        if (!nonMondayGames.length || !nonMondayGames.every(function (game) { return gameStatus(game) === 'complete'; })) return null;

        var firstMondayKickoff = Math.min.apply(null, mondayGames.map(gameStartMs));
        if (!Number.isFinite(firstMondayKickoff) || Date.now() < firstMondayKickoff - (20 * 60 * 60 * 1000)) return null;

        var pa = matchupProbability(a, b);
        var max = Math.max(pa.a, pa.b), min = Math.min(pa.a, pa.b);
        if (min >= 25 && max <= 75) return '🌙 MONDAY NIGHT SWEAT';
        return null;
    }

    function appendMatchupAlert(card, alert, finished) {
        if (finished) return;
        if (!alert) return;
        var el = document.createElement('div'); el.className = 'matchup-alert matchup-alert--' + alert.type; el.textContent = alert.text; card.appendChild(el);
        sendLiveNotification("FS5 matchup alert", alert.text, "matchup-alert-" + alert.type + "-" + card.getAttribute("data-matchup-key"));
        setTimeout(function () { if (el.parentNode) { el.classList.add('is-fading'); setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350); } }, 10000);
    }

    function notifyIfMatchupFinal(teams, isFinalMatchup, week) {
        if (week !== state.currentWeek) return;
        var key = matchupKey(teams[0]) || (String(teams[0].roster_id) + "-" + String(teams[1].roster_id));
        var wasFinal = state.notificationMatchupStates[key];
        state.notificationMatchupStates[key] = isFinalMatchup;
        if (!state.notificationsPrimed || !isFinalMatchup || wasFinal) return;
        var a = Number(teams[0].points || 0), b = Number(teams[1].points || 0);
        var result = a === b ? "ended in a tie" : teamLabel(a > b ? teams[0] : teams[1]) + " won";
        sendLiveNotification("FS5 final result", result + " · " + formatScore(a) + "–" + formatScore(b), "final-" + key);
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

    function renderScoreBox(matchup, week, showProjection, showLiveActivity) {
        var box = document.createElement("div");
        box.className = "score-box";
        box.innerHTML = '<strong>' + formatScore(matchup.points) + '</strong><span>points</span>';
        if (showProjection) {
            var rosterInfo = state.rosterMap.get(String(matchup.roster_id));
            var projectedTotal = Number(matchup.points || 0) + projectedRemaining(rosterInfo && rosterInfo.roster);
            box.insertAdjacentHTML('beforeend', '<small class="score-projection">Live proj. ' + formatScore(projectedTotal) + '</small>');
        }
        var previous = state.previousScores[String(matchup.roster_id)];
        var delta = Number(matchup.points || 0) - Number(previous == null ? matchup.points || 0 : previous);
        if (showLiveActivity && Number(week) === Number(state.currentWeek) && Math.abs(delta) >= 0.5) {
            var deltaBadge = document.createElement("span"); deltaBadge.className="score-change"; deltaBadge.textContent=(delta>0?"+":"")+formatScore(delta); box.appendChild(deltaBadge);
            setTimeout(function(){ if(deltaBadge && deltaBadge.parentNode){deltaBadge.classList.add("is-hiding"); setTimeout(function(){if(deltaBadge.parentNode)deltaBadge.parentNode.removeChild(deltaBadge);},250);} },10000);
        }
        var reaction = showLiveActivity ? getScoreReaction(matchup, week) : null;
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
            '<div><strong>😬 Nail Biter</strong><p>Less than 50% of combined player time remains and both teams are between 40% and 60% win probability. The Witching Hour takes priority.</p></div>'+
            '<div><strong>⚡ Lead Change</strong><p>The win probability has swung sharply enough to indicate that control of the matchup changed hands.</p></div>'+
            '<div><strong>🚨 Upset Alert</strong><p>A team with the worse record has more than 60% win probability after less than half of the matchup\'s player time remains.</p></div>'+
            '<div><strong>🌙 Monday Night Sweat</strong><p>A reasonably close matchup still has Monday Night Football player(s) who can decide it, after its Thursday and Sunday games are complete.</p></div>'+
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
        notifyIceWatchPlayers(watch, frozen);
        if(!watch.length && !frozen.length){ box.hidden=true; box.innerHTML=''; return; }
        box.hidden=false;
        function chips(items){return items.map(function(x){return '<span class="ice-player">❄️ <span class="ice-player__label"><strong>'+esc(x.name)+'</strong><small>&nbsp;'+esc(x.team)+'</small></span></span>';}).join('');}
        var fallingSnow = '<div class="ice-snow" aria-hidden="true"><span>❄</span><span>❅</span><span>❄</span><span>❆</span><span>❅</span><span>❄</span><span>❆</span><span>❄</span><span>❅</span></div>';
        box.innerHTML=(watch.length?'<section class="ice-panel ice-panel--watch"><div><b>🧊 ICE WATCH</b><span>Zero points entering the 4th quarter</span></div><div class="ice-players">'+chips(watch)+'</div></section>':'')+(frozen.length?'<section class="ice-panel ice-panel--baby">'+fallingSnow+'<div><b>❄️ ICE ICE BABY</b><span>Final · starting lineup goose eggs</span></div><div class="ice-players">'+chips(frozen)+'</div></section>':'');
    }

    function notifyIceWatchPlayers(watch, frozen) {
        // Ice Watch is deliberately based on getTeamPlayerIds above, which
        // returns starters only. Do not notify for a bench player with a zero.
        if (state.selectedWeek !== state.currentWeek || state.statsWeek !== state.selectedWeek || !state.statsReadyForNotifications) return;
        var weekKey = String(state.selectedWeek) + '-';
        var nextStates = {};
        watch.forEach(function (player) { nextStates[weekKey + player.id] = 'watch'; });
        frozen.forEach(function (player) { nextStates[weekKey + player.id] = 'frozen'; });

        // Seed the first fully loaded view. This prevents an old snapshot or
        // page hydration from generating a burst of retrospective alerts.
        if (!state.iceNotificationsPrimed) {
            state.iceNotificationStates = nextStates;
            state.iceNotificationsPrimed = true;
            return;
        }

        watch.forEach(function (player) {
            var key = weekKey + player.id;
            if (state.iceNotificationStates[key] !== 'watch') {
                sendLiveNotification('🧊 FS5 Ice Watch', player.name + ' is scoreless in the 4th quarter for ' + player.team + '.', 'ice-watch-' + key);
            }
        });
        frozen.forEach(function (player) {
            var key = weekKey + player.id;
            if (state.iceNotificationStates[key] !== 'frozen') {
                sendLiveNotification('❄️ FS5 Ice Ice Baby', player.name + ' finished with 0.00 points for ' + player.team + '.', 'ice-baby-' + key);
            }
        });
        state.iceNotificationStates = nextStates;
    }

    async function loadPublicGotwMarkets() {
        var cachedMarkets = [];
        var archivedMarkets = [];
        try {
            var cached = JSON.parse(localStorage.getItem('fs5_public_gotw_markets') || 'null');
            cachedMarkets = cached && Array.isArray(cached.markets) ? cached.markets : [];
        } catch (e) {}
        try {
            var archive = JSON.parse(localStorage.getItem('fs5_live_gotw_archive') || 'null');
            archivedMarkets = archive && Array.isArray(archive.markets) ? archive.markets : [];
        } catch (e) {}

        function marketKey(market) {
            var week = Number(market && (market.weekNumber ?? market.week));
            var number = Number(market && market.gotwNumber);
            var teams = [market && market.owner1, market && market.owner2].map(function (side) {
                return gotwTeamKey(side && (side.teamName || side.ownerName));
            }).sort();
            return (Number.isFinite(week) ? week : '') + '|' + (Number.isFinite(number) ? number : '') + '|' + teams.join('|');
        }

        function mergeMarkets() {
            var merged = new Map();
            Array.prototype.slice.call(arguments).forEach(function (markets) {
                (Array.isArray(markets) ? markets : []).forEach(function (market) {
                    if (!market) return;
                    var key = marketKey(market);
                    var previous = merged.get(key) || {};
                    merged.set(key, Object.assign({}, previous, market, {
                        owner1: Object.assign({}, previous.owner1 || {}, market.owner1 || {}),
                        owner2: Object.assign({}, previous.owner2 || {}, market.owner2 || {})
                    }));
                });
            });
            return Array.from(merged.values());
        }

        function saveMergedMarkets(publishedMarkets) {
            state.gotwMarkets = mergeMarkets(archivedMarkets, cachedMarkets, publishedMarkets);
            try { localStorage.setItem('fs5_live_gotw_archive', JSON.stringify({ savedAt: Date.now(), markets: state.gotwMarkets })); } catch (e) {}
        }

        try {
            var response = await fetch("/gotw.json?ts=" + Date.now(), { cache: "no-store" });
            if (!response.ok) throw new Error("GOTW configuration unavailable");
            var payload = await response.json();
            saveMergedMarkets(payload && Array.isArray(payload.markets) ? payload.markets : []);
        } catch (e) {
            // FS5 Sportsbook stores its current public market snapshot on the
            // shared site origin after a member loads the book. Use it when a
            // standalone published snapshot is unavailable.
            saveMergedMarkets([]);
        }
    }

    function gotwTeamKey(value) {
        // Sportsbook and Sleeper can represent punctuation differently (such
        // as straight versus curly apostrophes). Match the actual team name,
        // not its punctuation or capitalization.
        return String(value || "").trim().toLowerCase().normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "");
    }

    function isGotwMatchup(teams, week) {
        if (!Array.isArray(teams) || teams.length < 2) return null;
        var teamNames = teams.map(function(m) {
            var info = state.rosterMap.get(String(m.roster_id));
            return gotwTeamKey(info && info.teamName);
        });
        return state.gotwMarkets.find(function(market) {
            var marketWeek = Number(market && (market.weekNumber ?? market.week));
            if (Number.isFinite(marketWeek) && marketWeek !== Number(week)) return false;
            var names = [market && market.owner1, market && market.owner2].map(function(side) {
                return gotwTeamKey(side && (side.teamName || side.ownerName));
            });
            return names.length === 2 && names.indexOf(teamNames[0]) !== -1 && names.indexOf(teamNames[1]) !== -1;
        }) || null;
    }

    function gotwSpreadForTeam(market, matchup) {
        if (!market || !matchup) return '';
        var teamKey = gotwTeamKey(teamLabel(matchup));
        var side = [market.owner1, market.owner2].find(function (candidate) {
            return gotwTeamKey(candidate && (candidate.teamName || candidate.ownerName)) === teamKey;
        });
        if (!side || side.spread == null || side.spread === '') return '';
        var numericSpread = Number(side.spread);
        if (Number.isFinite(numericSpread)) {
            if (numericSpread === 0) return 'PK';
            return numericSpread > 0 ? '+' + numericSpread : String(numericSpread);
        }
        return String(side.spread);
    }

    function addGotwPresentation(card, market, matchupState) {
        if (!market) return;
        card.classList.add("matchup-card--gotw");
        card.classList.toggle("matchup-card--gotw-live", matchupState === "LIVE");
        var number = Number(market.gotwNumber);
        var ribbon = document.createElement("div");
        ribbon.className = "gotw-ribbon";
        ribbon.innerHTML = '<span class="gotw-ribbon__star">★</span><span><strong>FS5 GAME OF THE WEEK ' + (Number.isFinite(number) ? "#" + number : "") + '</strong><small>' + esc(market.marketTitle || "FEATURED BY THE FS5 SPORTSBOOK") + '</small></span><span class="gotw-ribbon__signal">' + (matchupState === "LIVE" ? "LIVE FEATURE" : (matchupState === "FINAL" ? "FINAL FEATURE" : "SPOTLIGHT MATCHUP")) + '</span>';
        card.insertBefore(ribbon, card.firstChild);
        var badgeEl = document.createElement("span");
        badgeEl.className = "matchup-card__gotw-badge";
        badgeEl.textContent = Number.isFinite(number) ? "GOTW " + number : "GOTW";
        card.querySelector(".matchup-card__head").appendChild(badgeEl);
    }

    function orderedMatchupEntries(groups, week) {
        return Array.from(groups.entries()).sort(function (first, second) {
            var firstMarket = isGotwMatchup(first[1].slice(0, 2), week);
            var secondMarket = isGotwMatchup(second[1].slice(0, 2), week);
            var firstNumber = Number(firstMarket && firstMarket.gotwNumber);
            var secondNumber = Number(secondMarket && secondMarket.gotwNumber);
            var firstPriority = firstMarket ? (Number.isFinite(firstNumber) ? firstNumber : 0) : Infinity;
            var secondPriority = secondMarket ? (Number.isFinite(secondNumber) ? secondNumber : 0) : Infinity;

            // The SportsBook's explicitly designated one or two Game of the
            // Week markets lead the grid. Every other matchup remains in its
            // established Sleeper matchup-ID order.
            if (firstPriority !== secondPriority) return firstPriority - secondPriority;
            return Number(first[0]) - Number(second[0]);
        });
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
        orderedMatchupEntries(groups, week).forEach(function (entry) {
            var teams = entry[1].slice(0, 2);
            if (teams.length < 2) return;
            var card = document.createElement("article");
            card.className = "matchup-card matchup-card--clickable" + cardVibe(teams);
            var gotwMarket = isGotwMatchup(teams, week);
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", "Open matchup " + entry[0]);
            var head = document.createElement("div");
            head.className = "matchup-card__head";
            var matchupFinished = teamIsFinished(teams[0]) && teamIsFinished(teams[1]);
            var isFinalMatchup = matchupFinished || week < state.currentWeek;
            notifyIfMatchupFinal(teams, isFinalMatchup, week);
            var matchupState = isFinalMatchup ? 'FINAL' : (matchupHasStarted(teams[0], teams[1]) ? 'LIVE' : 'UPCOMING');
            var gotwNumber = Number(gotwMarket && gotwMarket.gotwNumber);
            var matchupTitle = gotwMarket ? 'Game of the Week ' + (Number.isFinite(gotwNumber) ? gotwNumber : '') : 'Matchup ' + entry[0];
            card.setAttribute("aria-label", "Open " + matchupTitle.trim());
            card.setAttribute("data-matchup-key", matchupKey(teams[0]));
            head.innerHTML = '<span>' + esc(matchupTitle.trim()) + '</span><span class="matchup-card__state' + (matchupState === 'LIVE' ? ' is-current' : '') + '">' + matchupState + '</span>';
            card.appendChild(head);
            addGotwPresentation(card, gotwMarket, matchupState);
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
                var gotwSpread = gotwSpreadForTeam(gotwMarket, matchup);
                if (gotwSpread) {
                    var spread = document.createElement("span");
                    spread.className = "gotw-team__spread";
                    spread.textContent = 'SportsBook ' + gotwSpread;
                    name.appendChild(spread);
                }
                var account = document.createElement("span"); account.textContent = info && info.account ? info.account : ""; text.appendChild(account);
                var record = document.createElement("small"); record.textContent = info ? "Record: " + info.wins + "-" + info.losses + "-" + info.ties : ""; text.appendChild(record);
                appendPlayingTimeBar(text, matchup.starters || (info && info.roster && info.roster.starters) || []);
                identity.appendChild(img); identity.appendChild(text);
                var scoreBox = renderScoreBox(matchup, week, !isFinalMatchup, !isFinalMatchup);
                team.appendChild(identity); team.appendChild(scoreBox); card.appendChild(team);
                if (index === 0) { var divider = document.createElement("div"); divider.className = "vs-divider"; divider.innerHTML = '<span>VS</span>'; card.appendChild(divider); }
            });
            if (isFinalMatchup) {
                appendPostgameRecap(card, teams);
                if (state.statsWeek === state.selectedWeek) {
                    appendMatchupSuperlatives(card, teams);
                    appendPostgameAwards(card, teams);
                }
                var finalTrash = document.createElement("div"); finalTrash.className="trash-talk"; finalTrash.innerHTML=trashTalk(teams[0],teams[1]); card.appendChild(finalTrash);
            } else {
                appendPredictor(card, teams);
                var oddsReason = oddsChangeReason(teams[0], teams[1]);
                if (oddsReason) { var reason = document.createElement("div"); reason.className = "odds-change-reason"; reason.textContent = oddsReason; card.appendChild(reason); }
                if (matchupHasMondayTakeover(teams)) { var monday = document.createElement("div"); monday.className = "monday-takeover"; monday.innerHTML = "<span>🌙</span><div><strong>MONDAY NIGHT TAKEOVER</strong><small>The final chapter of this matchup is waiting for Monday Night Football.</small></div></div>"; card.appendChild(monday); }
                appendMatchupSuperlatives(card, teams);
                var trash = document.createElement("div"); trash.className="trash-talk"; trash.innerHTML=trashTalk(teams[0],teams[1]); card.appendChild(trash); applyTrashTalkExpiry(trash);
            }
            var alert = matchupAlert(teams[0], teams[1]);
            if (!alert) { var sweat = mondayNightSweat(teams[0], teams[1]); if (sweat) alert = { type: 'sweat', text: sweat }; }
            appendMatchupAlert(card, alert, teamIsFinished(teams[0]) && teamIsFinished(teams[1]));
            var hint = document.createElement("div"); hint.className = "matchup-hint"; hint.textContent = "Click matchup to view lineups · bench · player details"; card.appendChild(hint);
            function open() { openMatchupModal(teams, entry[0], week); }
            card.addEventListener("click", open);
            card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
            grid.appendChild(card);
        });
        state.notificationsPrimed = true;
        renderLeagueSuperlatives();
        renderWeeklyRecap();
    }

    function renderWeeklyRecap() {
        var box = $('weekly-recap'); if (!box) return;
        if (state.statsWeek !== state.selectedWeek) { box.hidden = true; box.innerHTML = ''; return; }
        var groups = new Map();
        state.matchups.forEach(function (matchup) { var key = matchupKey(matchup); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(matchup); });
        var rows = Array.from(groups.values()).filter(function (teams) { return teams.length >= 2; }).map(function (teams) { return { teams: teams.slice(0, 2), final: (state.selectedWeek < state.currentWeek) || (teamIsFinished(teams[0]) && teamIsFinished(teams[1])) }; });
        if (!rows.length || !rows.every(function (row) { return row.final; })) { box.hidden = true; box.innerHTML = ''; return; }
        var high = rows.map(function (row) { return row.teams; }).reduce(function (best, teams) { return Number(teams[0].points || 0) >= Number(teams[1].points || 0) && Number(teams[0].points || 0) > best.score ? { team: teamLabel(teams[0]), score: Number(teams[0].points || 0) } : (Number(teams[1].points || 0) > best.score ? { team: teamLabel(teams[1]), score: Number(teams[1].points || 0) } : best); }, { team: '', score: -Infinity });
        var closest = rows.slice().sort(function (a, b) { return Math.abs(Number(a.teams[0].points || 0) - Number(a.teams[1].points || 0)) - Math.abs(Number(b.teams[0].points || 0) - Number(b.teams[1].points || 0)); })[0];
        var closestMargin = Math.abs(Number(closest.teams[0].points || 0) - Number(closest.teams[1].points || 0));
        var biggestBench = rows.map(function (row) { return row.teams; }).reduce(function (best, teams) { return teams.reduce(function (currentBest, team) { var points = benchPlayerIds(team).reduce(function (sum, id) { return sum + getPlayerPoints(id); }, 0); return points > currentBest.points ? { team: teamLabel(team), points: points } : currentBest; }, best); }, { team: 'No bench scoring', points: 0 });
        var allScores = rows.reduce(function (scores, row) { return scores.concat([Number(row.teams[0].points || 0), Number(row.teams[1].points || 0)]); }, []);
        var averageScore = allScores.reduce(function (sum, score) { return sum + score; }, 0) / Math.max(1, allScores.length);
        var highOverAverage = high.score - averageScore;
        var closestTeams = teamLabel(closest.teams[0]) + ' and ' + teamLabel(closest.teams[1]);
        var closenessFact = closestMargin === 0 ? closestTeams + ' finished level.' : closestTeams + ' delivered the closest finish, separated by ' + formatScore(closestMargin) + ' points.';
        var benchFact = biggestBench.points > 0 ? biggestBench.team + ' left ' + formatScore(biggestBench.points) + ' points on the bench.' : 'No team left a meaningful scoring swing on the bench.';
        var recapNarrative = high.team + ' set the weekly pace with ' + formatScore(high.score) + ' points' + (highOverAverage > 0 ? ', ' + formatScore(highOverAverage) + ' above the league average.' : '.') + ' ' + closenessFact + ' ' + benchFact;
        var shareText = 'FS5 Week ' + state.selectedWeek + ' Final Recap\n🏆 High score: ' + high.team + ' (' + formatScore(high.score) + ')\n🤏 Closest finish: ' + teamLabel(closest.teams[0]) + ' vs ' + teamLabel(closest.teams[1]) + ' (' + formatScore(closestMargin) + ' pts)\n💺 Most left on bench: ' + biggestBench.team + ' (' + formatScore(Math.max(0, biggestBench.points)) + ')\n\n' + recapNarrative;
        box.hidden = false;
        box.innerHTML = '<div class="weekly-recap__head"><strong>🏁 WEEK ' + state.selectedWeek + ' FINAL RECAP</strong><button class="weekly-recap__share" type="button">Share recap</button></div><div class="weekly-recap__stats"><div><span>HIGH SCORE</span><strong>' + esc(high.team) + ' · ' + formatScore(high.score) + '</strong></div><div><span>CLOSEST FINISH</span><strong>' + esc(teamLabel(closest.teams[0])) + ' vs ' + esc(teamLabel(closest.teams[1])) + ' · ' + formatScore(closestMargin) + '</strong></div><div><span>MOST ON BENCH</span><strong>' + esc(biggestBench.team) + ' · ' + formatScore(Math.max(0, biggestBench.points)) + '</strong></div></div><p class="weekly-recap__narrative">' + esc(recapNarrative) + '</p>';
        box.querySelector('.weekly-recap__share').addEventListener('click', function () {
            var button = this;
            if (navigator.share) { navigator.share({ title: 'FS5 Week ' + state.selectedWeek + ' Final Recap', text: shareText }).catch(function () {}); return; }
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(shareText).then(function () { button.textContent = 'Copied!'; }).catch(function () {});
        });
    }

    function renderLeagueSuperlatives() {
        var box = $("league-superlatives"); if (!box) return;
        var rows = [];
        state.matchups.forEach(function (m) {
            var info = state.rosterMap.get(String(m.roster_id));
            if (!info) return;
            var remaining = projectedRemaining(info.roster);
            rows.push({ team: info.teamName, score: Number(m.points || 0), remaining: remaining, projected: Number(m.points || 0) + remaining });
        });
        rows.sort(function(a,b){return b.score-a.score;});
        if (!rows.length) { box.hidden = true; return; }
        var high = rows[0], low = rows[rows.length - 1];
        var closest = null;
        state.matchups.forEach(function(m){ if (!closest || Math.abs(Number(m.points||0) - Number(closest.diffSource.points||0)) < closest.diff) closest = {diff: Math.abs(Number(m.points||0) - Number((closest && closest.diffSource ? closest.diffSource.points : 0))), diffSource:m}; });
        var groups = new Map(); state.matchups.forEach(function(m){ var k=matchupKey(m); if(!groups.has(k)) groups.set(k,[]); groups.get(k).push(m); });
        var weekIsConcluded = state.selectedWeek < state.currentWeek;
        if (!weekIsConcluded) {
            weekIsConcluded = groups.size > 0;
            groups.forEach(function (teams) {
                if (teams.length < 2 || !teamIsFinished(teams[0]) || !teamIsFinished(teams[1])) weekIsConcluded = false;
            });
        }
        // A future matchup has no live scoring to summarize. Treat it as a
        // preview until the first NFL game for this selected week starts.
        var gamesForSelectedWeek = (Array.isArray(state.nflGames) && state.nflGames.length ? state.nflGames : state.schedule).filter(function (game) {
            var gameWeek = Number(game && game.week);
            return !Number.isFinite(gameWeek) || gameWeek === Number(state.selectedWeek);
        });
        var weekHasStarted = gamesForSelectedWeek.some(function (game) {
            var status = gameStatus(game);
            return status === 'in_game' || status === 'complete';
        });
        var mostLeft = rows.slice().sort(function(a,b){return b.remaining-a.remaining;})[0];
        box.hidden = false;
        if (!weekHasStarted) {
            var lowestProjected = rows.slice().sort(function (a, b) { return a.projected - b.projected; })[0];
            var projectedCloseGames = [];
            groups.forEach(function (teams) {
                if (teams.length < 2) return;
                var aInfo = state.rosterMap.get(String(teams[0].roster_id));
                var bInfo = state.rosterMap.get(String(teams[1].roster_id));
                var aProjected = Number(teams[0].points || 0) + projectedRemaining(aInfo && aInfo.roster);
                var bProjected = Number(teams[1].points || 0) + projectedRemaining(bInfo && bInfo.roster);
                projectedCloseGames.push({ a: teams[0], b: teams[1], diff: Math.abs(aProjected - bProjected) });
            });
            projectedCloseGames.sort(function (a, b) { return a.diff - b.diff; });
            var highestProjectedPlayer = null;
            state.matchups.forEach(function (matchup) {
                getTeamPlayerIds(matchup).forEach(function (id) {
                    var projection = getProjection(id);
                    if (!highestProjectedPlayer || projection > highestProjectedPlayer.projection) {
                        highestProjectedPlayer = { id: id, projection: projection };
                    }
                });
            });
            box.innerHTML = '<div class="superlative-card"><span>🏆 HIGHEST SCORE</span><strong>' + esc(high.team) + '</strong><b>' + formatScore(high.score) + '</b></div>' +
                '<div class="superlative-card"><span>💀 LOWEST PROJECTED</span><strong>' + esc(lowestProjected.team) + '</strong><b>' + formatScore(lowestProjected.projected) + ' proj.</b></div>' +
                '<div class="superlative-card"><span>⚡ MOST PROJECTED</span><strong>' + esc(mostLeft.team) + '</strong><b>' + formatScore(mostLeft.remaining) + ' proj.</b></div>' +
                (projectedCloseGames.length ? '<div class="superlative-card"><span>🤏 CLOSEST PROJECTED MATCHUP</span><strong>' + esc(teamLabel(projectedCloseGames[0].a)) + ' vs ' + esc(teamLabel(projectedCloseGames[0].b)) + '</strong><b>' + formatScore(projectedCloseGames[0].diff) + ' pts</b></div>' : '') +
                (highestProjectedPlayer ? '<div class="superlative-card"><span>🔥 HIGHEST PROJECTED PLAYER</span><strong>' + esc(playerName(highestProjectedPlayer.id)) + '</strong><b>' + formatScore(highestProjectedPlayer.projection) + ' proj.</b></div>' : '');
            return;
        }
        box.innerHTML = '<div class="superlative-card"><span>🏆 HIGHEST SCORE</span><strong>' + esc(high.team) + '</strong><b>' + formatScore(high.score) + '</b></div>' +
            '<div class="superlative-card"><span>💀 LOWEST SCORE</span><strong>' + esc(low.team) + '</strong><b>' + formatScore(low.score) + '</b></div>' +
            (weekIsConcluded ? '' : '<div class="superlative-card"><span>⚡ MOST PROJECTED</span><strong>' + esc(mostLeft.team) + '</strong><b>' + formatScore(mostLeft.remaining) + ' proj.</b></div>');
        var closeGames = [];
        groups.forEach(function(t){ if(t.length>=2) closeGames.push({a:t[0],b:t[1],diff:Math.abs(Number(t[0].points||0)-Number(t[1].points||0))}); });
        if(closeGames.length){ closeGames.sort(function(a,b){return a.diff-b.diff;}); var cg=closeGames[0]; box.insertAdjacentHTML('beforeend','<div class="superlative-card"><span>🤏 CLOSEST MATCHUP</span><strong>' + esc(teamLabel(cg.a)) + ' vs ' + esc(teamLabel(cg.b)) + '</strong><b>' + formatScore(cg.diff) + ' pts</b></div>'); }
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
        var isFinalMatchup = (teamIsFinished(teams[0]) && teamIsFinished(teams[1])) || week < state.currentWeek;
        if (isFinalMatchup) {
            appendPostgameRecap(body, teams);
        } else {
            var matchupPred = matchupProbability(teams[0], teams[1]);
            var modalHasLiveGame = matchupHasActiveGame(teams[0], teams[1]);
            var modalFavoredSide = matchupPred.a >= matchupPred.b ? "a" : "b";
            var modalTrackClass = "modal-prob-track modal-prob-track--" + modalFavoredSide + "-favored" + (modalHasLiveGame ? " modal-prob-track--live" : "");
            var pred = document.createElement("div"); pred.className = "modal-predictor";
            pred.innerHTML = '<div class="modal-predictor__head"><strong>FS5 Live Prediction Model</strong><span>FS5 model</span></div><div class="modal-prob-labels"><b>' + esc(aInfo ? aInfo.teamName : "Team A") + ' ' + matchupPred.a.toFixed(1) + '%</b><b>' + matchupPred.b.toFixed(1) + '% ' + esc(bInfo ? bInfo.teamName : "Team B") + '</b></div><div class="' + modalTrackClass + '"><div class="modal-prob-lane" aria-hidden="true"><div class="modal-prob-fill" style="width:' + matchupPred.a.toFixed(2) + '%"></div><span class="modal-prob-pulse"></span></div><div class="modal-prob-thumb" style="left:' + matchupPred.a.toFixed(2) + '%"><span class="modal-prob-badge">' + Math.max(matchupPred.a, matchupPred.b).toFixed(0) + '%</span></div></div><div class="modal-prob-meta">Projected final: <strong>' + formatScore(matchupPred.meanA) + ' – ' + formatScore(matchupPred.meanB) + '</strong> · Remaining: ' + formatScore(matchupPred.remainingA) + ' – ' + formatScore(matchupPred.remainingB) + '</div>';
            body.appendChild(pred);
        }
        appendRivalryHistory(body, teams);
        appendPlayoffImpact(body, teams, week);
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

    function seasonStatNumber(stats, key) {
        var value = stats && Number(stats[key]);
        return Number.isFinite(value) ? value : 0;
    }

    function formatSeasonStat(value) {
        return Number.isFinite(Number(value)) ? String(Number(value)) : '—';
    }

    function renderPlayerSeasonStats(section, data) {
        var body = section.querySelector('.player-season__body');
        var weeks = data && Array.isArray(data.weeks) ? data.weeks : [];
        var keys = ['pts_ppr', 'pass_yd', 'pass_td', 'rush_yd', 'rush_td', 'rec', 'rec_yd', 'rec_td'];
        var totals = {};
        keys.forEach(function (key) { totals[key] = 0; });
        var playedWeeks = 0;

        var rows = weeks.map(function (entry) {
            var stats = entry && entry.stats;
            if (stats) playedWeeks += 1;
            keys.forEach(function (key) { totals[key] += seasonStatNumber(stats, key); });
            return '<tr><th scope="row">W' + esc(entry && entry.week || '—') + '</th>' +
                '<td>' + (stats ? formatScore(seasonStatNumber(stats, 'pts_ppr')) : '—') + '</td>' +
                '<td>' + (stats ? formatSeasonStat(seasonStatNumber(stats, 'pass_yd')) : '—') + '</td><td>' + (stats ? formatSeasonStat(seasonStatNumber(stats, 'pass_td')) : '—') + '</td>' +
                '<td>' + (stats ? formatSeasonStat(seasonStatNumber(stats, 'rush_yd')) : '—') + '</td><td>' + (stats ? formatSeasonStat(seasonStatNumber(stats, 'rush_td')) : '—') + '</td>' +
                '<td>' + (stats ? formatSeasonStat(seasonStatNumber(stats, 'rec')) : '—') + '</td><td>' + (stats ? formatSeasonStat(seasonStatNumber(stats, 'rec_yd')) : '—') + '</td><td>' + (stats ? formatSeasonStat(seasonStatNumber(stats, 'rec_td')) : '—') + '</td></tr>';
        }).join('');

        if (!playedWeeks) {
            body.innerHTML = '<p class="muted">No completed-season stats are available yet.</p>';
            return;
        }

        body.innerHTML = '<div class="player-season__totals"><span><b>' + formatScore(totals.pts_ppr) + '</b> PPR points</span><span><b>' + playedWeeks + '</b> week' + (playedWeeks === 1 ? '' : 's') + ' played</span></div>' +
            '<div class="player-season__table-wrap"><table class="player-season__table"><thead><tr><th>Week</th><th>PPR</th><th>Pass Yds</th><th>Pass TD</th><th>Rush Yds</th><th>Rush TD</th><th>Rec</th><th>Rec Yds</th><th>Rec TD</th></tr></thead><tbody>' + rows + '</tbody><tfoot><tr><th>Total</th><td>' + formatScore(totals.pts_ppr) + '</td><td>' + formatSeasonStat(totals.pass_yd) + '</td><td>' + formatSeasonStat(totals.pass_td) + '</td><td>' + formatSeasonStat(totals.rush_yd) + '</td><td>' + formatSeasonStat(totals.rush_td) + '</td><td>' + formatSeasonStat(totals.rec) + '</td><td>' + formatSeasonStat(totals.rec_yd) + '</td><td>' + formatSeasonStat(totals.rec_td) + '</td></tr></tfoot></table></div>';
    }

    function loadPlayerSeasonStats(id) {
        var section = document.createElement('section');
        section.className = 'player-season';
        section.innerHTML = '<div class="player-season__head"><h4>2026 PPR Season</h4><span>Week-by-week totals</span></div><div class="player-season__body"><p class="muted">Loading season stats…</p></div>';
        var cacheKey = '2026-' + state.selectedWeek + '-' + String(id);
        var cached = state.playerSeasonStatsCache.get(cacheKey);
        if (cached && Date.now() - cached.saved < 60 * 1000) {
            renderPlayerSeasonStats(section, cached.data);
            return section;
        }
        fetch('/.netlify/functions/sleeper?source=season-stats&season=2026&week=' + encodeURIComponent(state.selectedWeek) + '&player=' + encodeURIComponent(id), {
            cache: 'no-store', headers: { 'Accept': 'application/json' }
        }).then(function (response) {
            return response.text().then(function (text) {
                var data = {};
                try { data = text ? JSON.parse(text) : {}; } catch (e) {}
                if (!response.ok) throw new Error(data.error || 'Unable to load season stats.');
                return data;
            });
        }).then(function (data) {
            state.playerSeasonStatsCache.set(cacheKey, { saved: Date.now(), data: data });
            renderPlayerSeasonStats(section, data);
        }).catch(function (error) {
            section.querySelector('.player-season__body').innerHTML = '<p class="muted">Season stats are temporarily unavailable. ' + esc(error.message || '') + '</p>';
        });
        return section;
    }

    function openPlayerModal(id) {
        var modal = $("player-modal"); if (!modal) return;
        state.openPlayerId = String(id);
        var p = playerMeta(id); var body = $("player-modal-body");
        body.replaceChildren();
        var detail = document.createElement('div'); detail.className = 'player-detail';
        var pGame = playerGameInfo(id);
        var pGameMarkup = pGame ? '<div class="player-detail__game player-detail__game--' + pGame.stateClass + '"><b>' + esc(pGame.stateText) + '</b><span>' + esc(pGame.scoreText || '') + '</span></div>' : '';
        var practice = Number(state.selectedWeek) >= Number(state.currentWeek) ? playerPracticeStatus(p) : '';
        detail.innerHTML = '<img class="player-detail__image" src="' + playerImageUrl(id) + '" alt="" onerror="this.onerror=null;this.src=\'/artwork/logo.png\';"><div><h2>' + esc(playerName(id)) + '</h2><p class="player-detail__team">' + esc((p.position || '--') + ' · ' + (p.team || 'FA') + (p.injury_status ? ' · ' + p.injury_status : '')) + '</p><div class="player-detail__chips"><span>Current ' + formatScore(getPlayerPoints(id)) + '</span><span>Weekly projection ' + formatScore(getProjection(id)) + '</span>' + playerAvailabilityBadge(id, true) + '</div>' + pGameMarkup + '</div>';
        body.appendChild(detail);
        var meta = document.createElement('dl'); meta.className = 'player-meta';
        meta.innerHTML = '<div><dt>Age</dt><dd>' + esc(p.age || '--') + '</dd></div><div><dt>Experience</dt><dd>' + esc(p.years_exp != null ? p.years_exp + ' yrs' : '--') + '</dd></div><div><dt>College</dt><dd>' + esc(p.college || '--') + '</dd></div><div><dt>Jersey</dt><dd>' + esc(p.number || '--') + '</dd></div><div><dt>Status</dt><dd>' + esc(p.status || '--') + '</dd></div><div><dt>Depth Chart</dt><dd>' + esc(p.depth_chart_position || '--') + '</dd></div>' + (practice ? '<div><dt>Practice</dt><dd>' + esc(practice) + '</dd></div>' : '');
        body.appendChild(meta);
        body.appendChild(loadPlayerNews(id));
        body.appendChild(loadPlayerSeasonStats(id));
        modal.hidden = false; document.body.classList.add("modal-open"); $("player-modal-close").focus();
    }

    function closeModals() { document.querySelectorAll(".fs5-modal").forEach(function (m) { m.hidden = true; }); document.body.classList.remove("modal-open"); state.openPlayerId = null; }

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
        var cacheMaxAge = state.selectedWeek === state.currentWeek ? LIVE_PLAYER_STATUS_CACHE_MS : PLAYER_CACHE_MS;
        try {
            var cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
            if (cached && cached.saved && Date.now() - cached.saved < cacheMaxAge && cached.players) {
                state.players = cached.players;
                return Promise.resolve(true);
            }
        } catch (e) {}

        var freshStatuses = state.selectedWeek === state.currentWeek;
        return fetch("/.netlify/functions/sleeper?source=players&fresh=" + (freshStatuses ? "1" : "0") + "&ids=" + encodeURIComponent(list.join(",")), {
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
        state.statsReadyForNotifications = false;
        var persisted = loadReactionSnapshot();
        var statsPaths = ["/stats/nfl/regular/" + season + "/" + week, "/stats/nfl/" + season + "/" + week + "?season_type=regular"];
        var projectionPaths = ["/projections/nfl/regular/" + season + "/" + week, "/projections/nfl/" + season + "/" + week + "?season_type=regular"];
        var projectionKey = season + "-" + week;
        var cachedProjection = state.projectionCache.get(projectionKey);
        var projectionRequest = cachedProjection && Date.now() - cachedProjection.saved < PROJECTION_CACHE_MS ?
            Promise.resolve(cachedProjection.data) : optionalApi(projectionPaths).catch(function () { return {}; });
        return Promise.allSettled([loadPlayerCache(), optionalApi(statsPaths).catch(function () { return {}; }), projectionRequest]).then(function (results) {
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
            state.statsWeek = week;
            state.statsReadyForNotifications = true;
            state.projections = results[2].status === "fulfilled" && results[2].value ? results[2].value : {};
            if (!cachedProjection && Object.keys(state.projections).length) {
                state.projectionCache.set(projectionKey, { saved: Date.now(), data: state.projections });
            }
            renderMatchups(state.matchups, week);
            state.matchups.forEach(function (m) { if (m && m.roster_id != null) state.previousScores[String(m.roster_id)] = Number(m.points || 0); });
            saveReactionSnapshot();
            refreshOpenPlayerModal();
        });
    }

    function refreshOpenPlayerModal() {
        if (!state.openPlayerId) return;
        var modal = $("player-modal");
        if (!modal || modal.hidden) return;
        var detail = modal.querySelector(".player-detail");
        if (!detail) return;
        var pGame = playerGameInfo(state.openPlayerId);
        var old = detail.querySelector(".player-detail__game");
        if (old) old.remove();
        if (pGame) {
            var game = document.createElement("div");
            game.className = "player-detail__game player-detail__game--" + pGame.stateClass;
            game.innerHTML = "<b>" + esc(pGame.stateText) + "</b><span>" + esc(pGame.scoreText || "") + "</span>";
            var chips = detail.querySelector(".player-detail__chips");
            if (chips) chips.insertAdjacentElement("afterend", game);
            else detail.appendChild(game);
        }
        var chips = detail.querySelector('.player-detail__chips');
        if (chips) {
            var oldAvailability = chips.querySelector('.player-status-badge--detail');
            if (oldAvailability) oldAvailability.remove();
            var availabilityMarkup = playerAvailabilityBadge(state.openPlayerId, true);
            if (availabilityMarkup) chips.insertAdjacentHTML('beforeend', availabilityMarkup);
        }
    }

    async function loadWeek(week) {
        state.isLoading = true;
        grid.setAttribute("aria-busy", "true");
        weekContext.textContent = "Loading Week " + week + "...";
        try {
            var scoreboardRequest = scoreboardApi(week).catch(function (error) {
                console.warn("FS5 Netlify scoreboard failed; trying ESPN directly", error);
                return directScoreboardApi(week).catch(function (fallbackError) {
                    console.warn("FS5 direct ESPN scoreboard failed", fallbackError);
                    return state.nflGames || [];
                });
            });
            var responses = await Promise.all([scoreboardRequest, api("/league/" + LEAGUE_ID + "/matchups/" + week)]);
            state.nflGames = responses[0];
            var matchups = responses[1];
            state.selectedWeek = week; weekSelect.value = String(week);
            state.gameCache.clear();
            renderMatchups(matchups, week);
            weekContext.textContent = week === state.currentWeek ? "Current week · live scoring · adaptive auto-refresh" : "2026 season · " + weekLabel(week);
            setStatus(week === state.currentWeek ? "Live · Sleeper connected" : (week > state.currentWeek ? "Future week" : "Historical week"), week === state.currentWeek ? "live" : "");
            loadSupplemental(week).catch(function (e) { console.warn("FS5 supplemental Sleeper feeds unavailable", e); });
        } catch (error) {
            console.error("FS5 Sleeper matchup request failed", error);
            grid.replaceChildren(); grid.hidden = true; empty.hidden = false; empty.textContent = "Sleeper matchup data could not be loaded. Please try again.";
            weekContext.textContent = "Unable to load Week " + week + ". " + (error.message || "Unknown Sleeper error"); setStatus("Sleeper connection error", "error");
        } finally {
            grid.setAttribute("aria-busy", "false");
            state.lastAutoRefreshAt = Date.now();
            state.isLoading = false;
            refreshOpenPlayerModal();
        }
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

    function liveNflGameInProgress() {
        return state.nflGames.some(function (game) { return gameStatus(game) === "in_game"; });
    }

    function shouldAutoRefresh() {
        if (state.isLoading || document.visibilityState !== "visible" || state.selectedWeek !== state.currentWeek) return false;
        var interval = liveNflGameInProgress() ? REFRESH_MS : IDLE_REFRESH_MS;
        return Date.now() - state.lastAutoRefreshAt >= interval;
    }

    async function initialize() {
        setStatus("Connecting to Sleeper...");
        try {
            var results = await Promise.all([api("/state/nfl"), api("/league/" + LEAGUE_ID + "/rosters"), api("/league/" + LEAGUE_ID + "/users"), api("/schedule/nfl/regular/2026").catch(function () { return []; }), api("/league/" + LEAGUE_ID).catch(function () { return {}; })]);
            var nflState = results[0] || {};
            // Always open on the current Sleeper/NFL fantasy week. Prefer
            // Sleeper display_week, then week; never hard-code Week 1.
            // Keep the value constrained to the 2026 regular-season range.
            var detectedWeek = Number(nflState.display_week || nflState.week);
            if (!Number.isFinite(detectedWeek) || detectedWeek < 1 || detectedWeek > 18) detectedWeek = 1;
            state.currentWeek = Math.floor(detectedWeek);
            state.selectedWeek = state.currentWeek;
            state.rosters = Array.isArray(results[1]) ? results[1] : [];
            state.users = Array.isArray(results[2]) ? results[2] : [];
            state.schedule = Array.isArray(results[3]) ? results[3] : [];
            state.league = results[4] || {};
            buildRosterMap(); populateWeeks();
            await loadPublicGotwMarkets();
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
    setInterval(function () { if (shouldAutoRefresh()) loadWeek(state.currentWeek); }, REFRESH_MS);
    initializeLiveTheme();
    initializeLiveNotifications();
    initialize();
})();
