(function (window, document) {
    'use strict';

    var panel = document.querySelector('[data-power-lines]');
    if (!panel) return;

    var boardWrap = panel.querySelector('[data-power-lines-board-wrap]');
    var board = panel.querySelector('[data-power-lines-board]');
    var weekLabels = panel.querySelector('[data-power-lines-weeks]');
    var rankLabels = panel.querySelector('[data-power-lines-ranks]');
    var playoffLine = panel.querySelector('[data-power-lines-playoff-line]');
    var paths = panel.querySelector('[data-power-lines-paths]');
    var markers = panel.querySelector('[data-power-lines-markers]');
    var controls = panel.querySelector('[data-power-lines-controls]');
    var range = panel.querySelector('[data-power-lines-range]');
    var output = panel.querySelector('[data-power-lines-output]');
    var playButton = panel.querySelector('[data-power-lines-play]');
    var playLabel = panel.querySelector('[data-power-lines-play-label]');
    var teamSelect = panel.querySelector('[data-power-lines-team-select]');
    var timeline = null;
    var highlightedOwnerId = null;
    var player = null;
    var pathElements = new Map();
    var markerElements = new Map();
    var SEASON_YEAR = 2026;
    var REGULAR_SEASON_WEEKS = 14;
    var PLAYOFF_TEAMS = 6;
    var colors = ['#ff7357', '#53d4e8', '#ffd15c', '#a98cff', '#6fe0a8', '#ff91b0', '#66a9ff', '#f4a55e', '#5be1c5', '#d989f1', '#b7cf76', '#f06f91'];
    var ownerImages = {
        brycen: 'owners/artwork/profile-current/brycen.png',
        will: 'owners/artwork/profile-current/will.png',
        david: 'owners/artwork/profile-current/david.png',
        jordan: 'owners/artwork/profile-current/jordan.png',
        chris: 'owners/artwork/profile-current/chris.png',
        bailey: 'owners/artwork/profile-current/bailey.png',
        mike: 'owners/artwork/profile-current/mike.png',
        keith: 'owners/artwork/profile-current/keith.png',
        ethan: 'owners/artwork/profile-current/ethan.png',
        matthew: 'owners/artwork/profile-current/matthew.png',
        cody: 'owners/artwork/profile-current/cody.png',
        max: 'owners/artwork/profile-current/max.png'
    };

    function showFailure(message) {
        var failure = document.createElement('p');
        failure.className = 'power-lines__status';
        failure.setAttribute('aria-live', 'polite');
        failure.textContent = message;
        boardWrap.parentNode.insertBefore(failure, boardWrap);
        boardWrap.parentNode.classList.add('is-unavailable');
    }

    function validateTimeline(data) {
        if (!data || !Array.isArray(data.teams) || !Array.isArray(data.frames) || !data.teams.length || !data.frames.length) throw new Error('Standings timeline response is incomplete.');
        var size = data.teams.length;
        data.frames.forEach(function (frame) {
            if (!frame || !Array.isArray(frame.standings) || frame.standings.length !== size) throw new Error('Standings frame is incomplete.');
            var ranks = new Set(frame.standings.map(function (entry) { return Number(entry.rank); }));
            if (ranks.size !== size || Array.from(ranks).some(function (rank) { return !Number.isInteger(rank) || rank < 1 || rank > size; })) throw new Error('Standings frame contains invalid ranks.');
        });
    }

    function teamForOwner(ownerId) {
        return timeline.teams.find(function (team) { return Number(team.owner_id) === Number(ownerId); }) || null;
    }

    function rankFor(frame, ownerId) {
        var row = frame.standings.find(function (entry) { return Number(entry.owner_id) === Number(ownerId); });
        return row ? Number(row.rank) : timeline.teams.length;
    }

    function renderRankLabels() {
        rankLabels.textContent = '';
        for (var rank = 1; rank <= timeline.teams.length; rank += 1) {
            var label = document.createElement('span');
            label.textContent = String(rank);
            rankLabels.appendChild(label);
        }
    }

    function renderWeekLabels() {
        weekLabels.textContent = '';
        var currentWeekIndex = timeline.frames.length - 1;
        for (var index = 0; index <= REGULAR_SEASON_WEEKS; index += 1) {
            var label = document.createElement('span');
            label.textContent = index === 0 ? 'PRE' : 'W' + index;
            if (index === Math.round(player.getPosition())) label.classList.add('is-active');
            if (index === currentWeekIndex) label.classList.add('is-current');
            if (index > currentWeekIndex) label.classList.add('is-future');
            weekLabels.appendChild(label);
        }
    }

    function initializeVisuals() {
        var namespace = 'http://www.w3.org/2000/svg';
        paths.setAttribute('viewBox', '0 0 1000 1000');
        paths.replaceChildren();
        markers.replaceChildren();
        pathElements.clear();
        markerElements.clear();
        timeline.teams.forEach(function (team, index) {
            var path = document.createElementNS(namespace, 'path');
            var color = colors[index % colors.length];
            path.setAttribute('stroke', color);
            path.style.setProperty('--power-color', color);
            path.setAttribute('vector-effect', 'non-scaling-stroke');
            path.classList.add('power-lines__path');
            paths.appendChild(path);
            var marker = document.createElement('button');
            var image = document.createElement('img');
            marker.type = 'button';
            marker.className = 'power-lines__marker';
            marker.style.setProperty('--power-color', color);
            image.src = team.avatar;
            image.alt = '';
            image.loading = 'lazy';
            image.onerror = function () { this.onerror = null; this.src = 'artwork/logo.png'; };
            marker.appendChild(image);
            marker.addEventListener('click', function () {
                highlightedOwnerId = Number(highlightedOwnerId) === Number(team.owner_id) ? null : team.owner_id;
                updateVisuals();
            });
            markers.appendChild(marker);
            pathElements.set(Number(team.owner_id), path);
            markerElements.set(Number(team.owner_id), marker);
        });
    }

    function renderTeamSelect() {
        var neutralOption = document.createElement('option');
        teamSelect.textContent = '';
        neutralOption.value = '';
        neutralOption.textContent = 'All Teams';
        teamSelect.appendChild(neutralOption);
        timeline.teams.slice().sort(function (first, second) {
            return first.team_name.localeCompare(second.team_name);
        }).forEach(function (team) {
            var option = document.createElement('option');
            option.value = String(team.owner_id);
            option.textContent = team.team_name;
            teamSelect.appendChild(option);
        });
    }

    function syncTeamSelect() {
        teamSelect.value = highlightedOwnerId === null ? '' : String(highlightedOwnerId);
    }

    function updateVisuals() {
        if (!timeline || !player) return;
        var position = player.getPosition();
        var nearestFrame = timeline.frames[Math.round(position)];
        range.value = String(position);
        output.textContent = nearestFrame.label;
        renderWeekLabels();
        timeline.teams.forEach(function (team) {
            var geometry = window.fs5PowerLinesTimeline.buildPath(timeline.frames, team.owner_id, position, REGULAR_SEASON_WEEKS, timeline.teams.length);
            var path = pathElements.get(Number(team.owner_id));
            var marker = markerElements.get(Number(team.owner_id));
            var standingRank = rankFor(nearestFrame, team.owner_id);
            path.setAttribute('d', geometry.d);
            path.classList.toggle('is-muted', highlightedOwnerId !== null && Number(team.owner_id) !== Number(highlightedOwnerId));
            path.classList.toggle('is-highlighted', Number(team.owner_id) === Number(highlightedOwnerId));
            marker.style.setProperty('--power-x', geometry.xPercent + '%');
            marker.style.setProperty('--power-y', geometry.yPercent + '%');
            marker.classList.toggle('is-highlighted', Number(team.owner_id) === Number(highlightedOwnerId));
            marker.setAttribute('aria-label', team.team_name + ', rank ' + standingRank + ' near ' + nearestFrame.label + '.');
        });
        syncTeamSelect();
    }

    function updatePlayButton(shouldPlay) {
        playButton.setAttribute('aria-pressed', shouldPlay ? 'true' : 'false');
        playButton.querySelector('[aria-hidden="true"]').textContent = shouldPlay ? '❚❚' : '▶';
        playLabel.textContent = shouldPlay ? 'Pause' : 'Play';
        playButton.setAttribute('aria-label', shouldPlay ? 'Pause standings progression' : 'Play standings progression');
    }

    function configureTimeline() {
        var finalFrame = timeline.frames.length - 1;
        range.max = String(finalFrame);
        range.value = String(finalFrame);
        range.disabled = finalFrame === 0;
        board.style.setProperty('--power-team-count', String(timeline.teams.length));
        board.style.setProperty('--power-frame-count', String(REGULAR_SEASON_WEEKS + 1));
        board.style.setProperty('--power-current-x', ((finalFrame / REGULAR_SEASON_WEEKS) * 100) + '%');
        playoffLine.style.setProperty('--power-playoff-rank', String(Math.min(PLAYOFF_TEAMS, timeline.teams.length)));
        playoffLine.querySelector('span').textContent = PLAYOFF_TEAMS + ' TEAM PLAYOFF LINE';
        renderRankLabels();
        renderTeamSelect();
        initializeVisuals();
        player = window.fs5PowerLinesTimeline.createPlayer({
            getMaximum: function () { return timeline.frames.length - 1; },
            onPosition: updateVisuals,
            onPlayingChange: updatePlayButton,
            reducedMotion: function () { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
        });
        player.setPosition(finalFrame);
        boardWrap.hidden = false;
        controls.hidden = false;
        updateVisuals();
    }

    function rpc(client, name, parameters) {
        return client.rpc(name, parameters).then(function (result) {
            if (result.error) throw result.error;
            return result.data;
        });
    }

    function ownerImage(ownerName) {
        var key = String(ownerName || '').trim().split(/\s+/)[0].toLowerCase();
        return ownerImages[key] || 'artwork/logo.png';
    }

    function buildTimeline(draftRows, weeklyRows, latestWeek) {
        var draftByOwner = new Map();
        draftRows.forEach(function (row) {
            var ownerId = Number(row.owner_id);
            var draftSlot = Number(row.draft_slot);
            if (Number(row.draft_round) === 1 && Number.isInteger(ownerId) && Number.isInteger(draftSlot)) {
                draftByOwner.set(ownerId, { owner_id: ownerId, owner_name: String(row.owner_name || '').trim(), draft_order: draftSlot });
            }
        });
        var latestRows = weeklyRows[weeklyRows.length - 1] || [];
        var teams = latestRows.map(function (row) {
            var ownerId = Number(row.owner_id);
            var draft = draftByOwner.get(ownerId);
            if (!draft) throw new Error('Draft order is missing for a current owner.');
            var ownerName = String(row.owner_name || draft.owner_name).trim();
            return {
                owner_id: ownerId,
                owner_name: ownerName,
                team_name: String(row.team_name || ownerName).trim(),
                avatar: ownerImage(ownerName),
                draft_order: draft.draft_order
            };
        }).sort(function (first, second) { return first.owner_id - second.owner_id; });
        var preseason = teams.slice().sort(function (first, second) { return first.draft_order - second.draft_order; }).map(function (team) {
            return { owner_id: team.owner_id, rank: team.draft_order, wins: 0, losses: 0, ties: 0, points_for: 0 };
        });
        var frames = [{ week: 0, label: 'PRE', standings: preseason }];
        weeklyRows.forEach(function (rows, index) {
            frames.push({
                week: index + 1,
                label: 'W' + (index + 1),
                standings: rows.map(function (row) {
                    return {
                        owner_id: Number(row.owner_id),
                        rank: Number(row.overall_rank),
                        wins: Number(row.wins),
                        losses: Number(row.losses),
                        ties: Number(row.ties),
                        points_for: Number(row.points_for)
                    };
                })
            });
        });
        return { season: SEASON_YEAR, through_week: latestWeek, teams: teams, frames: frames };
    }

    async function requestTimeline() {
        try {
            if (!window.fs5Supabase || typeof window.fs5Supabase.getClient !== 'function') throw new Error('Shared Supabase configuration is unavailable.');
            var client = window.fs5Supabase.getClient();
            var homeData = await rpc(client, 'site_home_current_season', { p_year: SEASON_YEAR });
            var homeRow = Array.isArray(homeData) ? homeData[0] : homeData;
            var latestWeek = Math.min(REGULAR_SEASON_WEEKS, Number(homeRow && homeRow.latest_completed_week));
            if (!Number.isInteger(latestWeek) || latestWeek < 1) throw new Error('No completed regular-season week is available.');
            var requests = [rpc(client, 'site_draft_page', { p_year: SEASON_YEAR })];
            for (var week = 1; week <= latestWeek; week += 1) {
                requests.push(rpc(client, 'site_power_lines_standings', { p_year: SEASON_YEAR, p_through_week: week }));
            }
            var responses = await Promise.all(requests);
            timeline = buildTimeline(responses[0], responses.slice(1), latestWeek);
            validateTimeline(timeline);
            configureTimeline();
        } catch (error) {
            showFailure('The standings race is temporarily unavailable.');
            window.console.warn('Power Lines request failed.', error);
        }
    }

    range.addEventListener('input', function () { if (!player) return; player.pause(); player.setPosition(range.value); });
    teamSelect.addEventListener('change', function () {
        highlightedOwnerId = teamSelect.value === '' ? null : Number(teamSelect.value);
        updateVisuals();
    });
    playButton.addEventListener('click', function () {
        if (!timeline || timeline.frames.length < 2) return;
        player.toggle();
    });
    document.addEventListener('visibilitychange', function () { if (document.hidden && player) player.pause(); });
    requestTimeline();
}(window, document));
