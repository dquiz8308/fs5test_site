(function (window, document) {
    "use strict";

    var page = document.querySelector("[data-draft-page]");
    if (!page) return;

    var select = page.querySelector("[data-year-select]");
    var format = page.querySelector("[data-draft-format]");
    var state = page.querySelector("[data-draft-state]");
    var desktop = page.querySelector("[data-desktop-board]");
    var mobile = page.querySelector("[data-mobile-board]");
    var requestId = 0;

    for (var year = 2026; year >= 2012; year -= 1) {
        var option = document.createElement("option");
        option.value = String(year);
        option.textContent = String(year);
        select.appendChild(option);
    }
    select.value = "2026";

    function setState(message, kind) {
        state.textContent = message;
        state.dataset.state = kind;
        state.hidden = false;
        desktop.hidden = true;
        mobile.hidden = true;
    }

    function validateRows(rows, expectedYear) {
        if (!Array.isArray(rows) || rows.length === 0) throw new Error("No draft picks were returned for this season.");
        var leagueSizes = new Set();
        var rounds = new Set();
        var cells = new Set();

        rows.forEach(function (row) {
            var rowYear = Number(row.year);
            var leagueSize = Number(row.league_size);
            var round = Number(row.draft_round);
            var slot = Number(row.draft_slot);
            if (rowYear !== expectedYear) throw new Error("The draft response did not match the selected season.");
            if (!Number.isInteger(leagueSize) || !Number.isInteger(round) || !Number.isInteger(slot)) throw new Error("The draft response contains invalid placement data.");
            if (round < 1 || round > 15 || slot < 1 || slot > leagueSize) throw new Error("The draft response contains an out-of-range draft cell.");
            leagueSizes.add(leagueSize);
            rounds.add(round);
            var key = round + ":" + slot;
            if (cells.has(key)) throw new Error("The draft response contains a duplicate draft cell.");
            cells.add(key);
        });
        if (leagueSizes.size !== 1) throw new Error("The draft response contains inconsistent league sizes.");
        var leagueSize = Number(rows[0].league_size);
        if (leagueSize !== (expectedYear <= 2013 ? 10 : 12)) throw new Error("The draft response contains an unexpected league size.");
        if (rounds.size !== 15 || Array.from({ length: 15 }, function (_, i) { return i + 1; }).some(function (round) { return !rounds.has(round); })) throw new Error("The draft response must contain all 15 rounds.");
        return leagueSize;
    }

    function textElement(tag, className, value) {
        var element = document.createElement(tag);
        element.className = className;
        element.textContent = value == null ? "" : String(value);
        return element;
    }

    function pickMeta(row) {
        return [row.position_code, row.nfl_team].filter(function (value) { return value != null && String(value).trim(); }).join(" · ");
    }

    function renderDesktop(rows, leagueSize, selectedYear) {
        var board = document.createElement("div");
        board.className = "draft-board";
        board.style.gridTemplateColumns = "62px repeat(" + leagueSize + ", minmax(82px, 1fr))";
        board.setAttribute("role", "table");
        board.setAttribute("aria-label", selectedYear + " FS5 draft board");
        board.appendChild(textElement("div", "draft-corner", "Round"));

        for (var slot = 1; slot <= leagueSize; slot += 1) {
            var ownerRow = rows.find(function (row) { return Number(row.draft_slot) === slot; });
            var header = document.createElement("div");
            header.className = "draft-header";
            header.setAttribute("role", "columnheader");
            header.append(textElement("span", "draft-header__slot", "Pick " + slot), textElement("span", "draft-header__owner", ownerRow ? ownerRow.owner_name : ""));
            board.appendChild(header);
        }
        for (var round = 1; round <= 15; round += 1) {
            board.appendChild(textElement("div", "draft-round", "Round " + round));
            for (var draftSlot = 1; draftSlot <= leagueSize; draftSlot += 1) {
                var row = rows.find(function (item) { return Number(item.draft_round) === round && Number(item.draft_slot) === draftSlot; });
                var card = document.createElement("div");
                card.className = "draft-pick";
                card.setAttribute("role", "cell");
                if (row) card.append(textElement("span", "draft-pick__number", "#" + row.overall_pick), textElement("strong", "draft-pick__player", row.player_name || "Unknown player"), textElement("span", "draft-pick__meta", pickMeta(row)));
                board.appendChild(card);
            }
        }
        desktop.replaceChildren(board);
    }

    function renderMobile(rows, selectedYear) {
        var fragment = document.createDocumentFragment();
        for (var round = 1; round <= 15; round += 1) {
            var section = document.createElement("section");
            section.className = "draft-round-card";
            var panelId = "draft-round-panel-" + selectedYear + "-" + round;
            var toggle = document.createElement("button");
            var toggleTitle = textElement("span", "draft-round-toggle__title", "ROUND " + round);
            var toggleSummary = document.createElement("span");
            var firstPick = ((round - 1) * Number(rows[0].league_size)) + 1;
            var lastPick = round * Number(rows[0].league_size);
            toggle.className = "draft-round-toggle";
            toggle.type = "button";
            toggle.setAttribute("aria-expanded", round === 1 ? "true" : "false");
            toggle.setAttribute("aria-controls", panelId);
            toggleSummary.className = "draft-round-toggle__summary";
            toggleSummary.append(textElement("span", "draft-round-toggle__range", firstPick + "–" + lastPick), textElement("span", "draft-round-toggle__icon", ""));
            toggle.append(toggleTitle, toggleSummary);
            var list = document.createElement("ol");
            list.className = "draft-round-list";
            list.id = panelId;
            list.classList.add("draft-round-panel");
            list.hidden = round !== 1;
            rows.filter(function (row) { return Number(row.draft_round) === round; }).sort(function (a, b) { return Number(a.overall_pick) - Number(b.overall_pick); }).forEach(function (row) {
                var item = document.createElement("li");
                item.className = "draft-mobile-pick";
                var details = document.createElement("span");
                details.append(textElement("span", "draft-mobile-pick__owner", row.owner_name), textElement("strong", "draft-mobile-pick__player", row.player_name || "Unknown player"));
                item.append(textElement("span", "draft-mobile-pick__number", row.overall_pick), details, textElement("span", "draft-mobile-pick__meta", pickMeta(row)));
                list.appendChild(item);
            });
            toggle.addEventListener("click", function () {
                var shouldOpen = this.getAttribute("aria-expanded") !== "true";
                mobile.querySelectorAll(".draft-round-toggle").forEach(function (button) {
                    button.setAttribute("aria-expanded", "false");
                    document.getElementById(button.getAttribute("aria-controls")).hidden = true;
                });
                if (shouldOpen) {
                    this.setAttribute("aria-expanded", "true");
                    document.getElementById(this.getAttribute("aria-controls")).hidden = false;
                }
            });
            section.append(toggle, list);
            fragment.appendChild(section);
        }
        mobile.replaceChildren(fragment);
        mobile.setAttribute("aria-label", selectedYear + " draft by round");
    }

    function loadDraft(selectedYear) {
        var currentRequest = ++requestId;
        setState("Loading " + selectedYear + " draft…", "loading");
        format.textContent = "Loading draft format…";
        try {
            if (!window.fs5Supabase || typeof window.fs5Supabase.getClient !== "function") throw new Error("Draft data is temporarily unavailable.");
            window.fs5Supabase.getClient().rpc("site_draft_page", { p_year: selectedYear }).then(function (result) {
                if (currentRequest !== requestId) return;
                if (result.error) throw result.error;
                var leagueSize = validateRows(result.data, selectedYear);
                renderDesktop(result.data, leagueSize, selectedYear);
                renderMobile(result.data, selectedYear);
                format.textContent = leagueSize + " Team Snake Draft";
                state.hidden = true;
                desktop.hidden = false;
                mobile.hidden = false;
            }).catch(function (error) {
                if (currentRequest !== requestId) return;
                setState(error && error.message ? error.message : "The draft could not be loaded. Please try again.", "error");
                format.textContent = "Draft unavailable";
                window.console.warn("Draft Archive request failed.", error);
            });
        } catch (error) {
            if (currentRequest !== requestId) return;
            setState(error.message || "The draft could not be loaded.", "error");
            format.textContent = "Draft unavailable";
        }
    }

    select.addEventListener("change", function () { loadDraft(Number(select.value)); });
    loadDraft(2026);
}(window, document));
