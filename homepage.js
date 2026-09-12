(function (window, document) {
    "use strict";

    var seasonYear = 2025;
    var seasonNumeral = "XV";
    var allowedStatuses = ["preseason", "regular", "postseason", "completed"];
    var seasonPanel = document.querySelector(".home-season");

    if (!seasonPanel) {
        return;
    }

    var requestedStatus = String(seasonPanel.dataset.homeSeasonStatus || "").toLowerCase();
    var homepageStatus = allowedStatuses.indexOf(requestedStatus) === -1 ? "completed" : requestedStatus;
    var actions = seasonPanel.querySelector(".home-season__actions");
    var stats = seasonPanel.querySelector(".home-season__stats");

    var statusContent = {
        preseason: {
            links: [
                ["2025 Records", "nextgenstats/seasonrecords/index.html"],
                ["Draft", "vault/drafts/index.html"]
            ],
            stats: [
                ["season", "Season", seasonNumeral],
                ["status", "Status", "Preseason"],
                ["trophy", "Reigning Champion", "The Rome Man Empire"],
                ["calendar", "Draft Status", "Drafted"]
            ]
        },
        regular: {
            links: [
                ["2025 Records", "nextgenstats/seasonrecords/index.html"],
                ["Divisions", "divisions/index.html"]
            ],
            stats: [
                ["season", "Season", seasonNumeral],
                ["status", "Status", "Regular"],
                ["weeks", "Weeks Completed", null, "week"],
                ["rank", "Current #1 Rank", null, "leader"]
            ]
        },
        postseason: {
            links: [
                ["2025 Records", "nextgenstats/seasonrecords/index.html"],
                ["Playoff Brackets", "vault/brackets/index.html"],
                ["Bowl Games", "vault/bowls/index.html"]
            ],
            stats: [
                ["season", "Season", seasonNumeral],
                ["status", "Status", "Postseason"],
                ["weeks", "Weeks Completed", null, "week"],
                ["trophy", "#1 Seed", null, "leader"]
            ]
        },
        completed: {
            links: [
                ["2025 Records", "nextgenstats/seasonrecords/index.html"],
                ["Playoffs", "vault/brackets/index.html"],
                ["Pro Bowl", "vault/probowl/index.html"]
            ],
            stats: [
                ["season", "Season", seasonNumeral],
                ["status", "Status", "Completed"],
                ["trophy", "Reigning Champion", "The Rome Man Empire"],
                ["trophy", "Pro Bowl Winner", "Smokey Road"]
            ]
        }
    };

    var iconPaths = {
        season: '<rect x="4.5" y="7.5" width="23" height="20" rx="2.5"/><path d="M4.5 12.5h23M10 4.5v6M22 4.5v6M10 17h3M16 17h3M22 17h1M10 22h3M16 22h3M22 22h1"/>',
        calendar: '<rect x="4.5" y="7.5" width="23" height="20" rx="2.5"/><path d="M4.5 12.5h23M10 4.5v6M22 4.5v6M10 17h12M10 22h8"/>',
        status: '<rect x="7" y="6.5" width="18" height="22" rx="2.5"/><path d="M12 6.5V4h8v2.5M11 15l3 3 7-7M11 23h10"/>',
        weeks: '<path d="M6 5v11h20V5M16 16v11M11 27h10M6 10h5M21 10h5"/>',
        rank: '<path d="m16 4 3.2 6.5 7.2 1-5.2 5.1 1.2 7.2-6.4-3.4-6.4 3.4 1.2-7.2-5.2-5.1 7.2-1z"/>',
        trophy: '<path d="M10 5h12v5c0 6-2.5 9-6 10-3.5-1-6-4-6-10zM10 8H5c0 5 2 8 6.5 8M22 8h5c0 5-2 8-6.5 8M16 20v5M11 28h10M12 25h8"/>'
    };

    function renderActions(links) {
        actions.replaceChildren();

        links.forEach(function (link, index) {
            var anchor = document.createElement("a");
            var arrow = document.createElement("span");
            anchor.className = "home-season__button" + (index === 0 ? " home-season__button--primary" : " home-season__button--status");
            anchor.href = link[1];
            anchor.appendChild(document.createTextNode(link[0] + " "));
            arrow.setAttribute("aria-hidden", "true");
            arrow.innerHTML = "&rsaquo;";
            anchor.appendChild(arrow);
            actions.appendChild(anchor);
        });
    }

    function createStat(stat) {
        var item = document.createElement("div");
        var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var copy = document.createElement("dl");
        var label = document.createElement("dt");
        var value = document.createElement("dd");

        item.className = "home-season__stat";
        icon.setAttribute("class", "home-season__stat-icon");
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("focusable", "false");
        icon.setAttribute("viewBox", "0 0 32 32");
        icon.innerHTML = iconPaths[stat[0]] || iconPaths.status;
        copy.className = "home-season__stat-copy";
        label.textContent = stat[1];
        value.textContent = stat[2] === null ? "Loading..." : stat[2];

        if (stat[3] === "week" || stat[3] === "leader") {
            value.className = "home-season__stat-value--loading";
            value.dataset.homeRpcValue = stat[3];
        }

        copy.appendChild(label);
        copy.appendChild(value);
        item.appendChild(icon);
        item.appendChild(copy);
        return item;
    }

    function renderStats(statItems) {
        stats.replaceChildren();
        statItems.forEach(function (stat) {
            stats.appendChild(createStat(stat));
        });
    }

    function setFallback(element, text) {
        if (!element) {
            return;
        }
        element.className = "home-season__stat-value--fallback";
        element.textContent = text;
    }

    function renderRpcValues(row) {
        var weekTarget = stats.querySelector('[data-home-rpc-value="week"]');
        var leaderTarget = stats.querySelector('[data-home-rpc-value="leader"]');
        var rawCompletedWeek = row && row.latest_completed_week;
        var completedWeek = rawCompletedWeek === null || rawCompletedWeek === undefined || rawCompletedWeek === ""
            ? NaN
            : Number(rawCompletedWeek);
        var teamName = row && typeof row.first_place_team_name === "string" ? row.first_place_team_name.trim() : "";
        var ownerName = row && typeof row.first_place_owner_name === "string" ? row.first_place_owner_name.trim() : "";

        if (weekTarget) {
            if (Number.isInteger(completedWeek) && completedWeek >= 0 && completedWeek <= 17) {
                weekTarget.className = "";
                weekTarget.textContent = completedWeek + " / 17";
            } else {
                setFallback(weekTarget, "Week unavailable");
            }
        }

        if (leaderTarget) {
            if (teamName || ownerName) {
                leaderTarget.className = "";
                leaderTarget.replaceChildren();

                var primary = document.createElement("span");
                primary.className = "home-season__stat-primary";
                primary.textContent = teamName || ownerName;
                leaderTarget.appendChild(primary);

                if (teamName && ownerName) {
                    var secondary = document.createElement("span");
                    secondary.className = "home-season__stat-secondary";
                    secondary.textContent = "Owner: " + ownerName;
                    leaderTarget.appendChild(secondary);
                }
            } else {
                setFallback(leaderTarget, "Standings unavailable");
            }
        }
    }

    function loadCurrentSeason() {
        try {
            if (!window.fs5Supabase || typeof window.fs5Supabase.getClient !== "function") {
                throw new Error("Shared Supabase configuration is unavailable.");
            }

            window.fs5Supabase.getClient()
                .rpc("site_home_current_season", { p_year: seasonYear })
                .then(function (result) {
                    if (result.error) {
                        throw result.error;
                    }

                    var row = Array.isArray(result.data) ? result.data[0] : result.data;
                    renderRpcValues(row || null);
                })
                .catch(function (error) {
                    setFallback(stats.querySelector('[data-home-rpc-value="week"]'), "Week unavailable");
                    setFallback(stats.querySelector('[data-home-rpc-value="leader"]'), "Standings unavailable");
                    window.console.warn("Homepage current-season data is unavailable.", error);
                });
        } catch (error) {
            setFallback(stats.querySelector('[data-home-rpc-value="week"]'), "Week unavailable");
            setFallback(stats.querySelector('[data-home-rpc-value="leader"]'), "Standings unavailable");
            window.console.warn("Homepage current-season data is unavailable.", error);
        }
    }

    seasonPanel.dataset.homeSeasonStatus = homepageStatus;
    renderActions(statusContent[homepageStatus].links);
    renderStats(statusContent[homepageStatus].stats);
    loadCurrentSeason();
}(window, document));
