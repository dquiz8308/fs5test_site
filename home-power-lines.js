(function (window, document) {
    'use strict';

    var panel = document.querySelector('[data-power-lines]');
    if (!panel) return;

    var leagueId = String(panel.dataset.leagueId || '').trim();
    var status = panel.querySelector('[data-power-lines-status]');
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
    var teamsList = panel.querySelector('[data-power-lines-teams]');
    var timeline = null;
    var activeIndex = 0;
    var highlightedRosterId = null;
    var playbackTimer = null;
    var REGULAR_SEASON_WEEKS = 14;
    var TRANSITION_MS = 1320;
    var colors = ['#ff7357', '#53d4e8', '#ffd15c', '#a98cff', '#6fe0a8', '#ff91b0', '#66a9ff', '#f4a55e', '#5be1c5', '#d989f1', '#b7cf76', '#f06f91'];

    function showFailure(message) {
        status.textContent = message;
        panel.classList.add('is-unavailable');
    }

    function validateTimeline(data) {
        if (!data || !Array.isArray(data.teams) || !Array.isArray(data.frames) || !data.teams.length || !data.frames.length) throw new Error('Standings timeline response is incomplete.');
        var size = data.teams.length;
        data.frames.forEach(function (frame) {
            if (!frame || !Array.isArray(frame.standings) || frame.standings.length !== size) throw new Error('Standings frame is incomplete.');
        });
    }

    function teamForRoster(rosterId) {
        return timeline.teams.find(function (team) { return Number(team.roster_id) === Number(rosterId); }) || null;
    }

    function rankFor(frame, rosterId) {
        var row = frame.standings.find(function (entry) { return Number(entry.roster_id) === Number(rosterId); });
        return row ? Number(row.rank) : timeline.teams.length;
    }

    function point(index, rank) {
        return {
            x: (index / REGULAR_SEASON_WEEKS) * 100,
            y: ((rank - 0.5) / timeline.teams.length) * 100
        };
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
        for (var index = 0; index <= REGULAR_SEASON_WEEKS; index += 1) {
            var label = document.createElement('span');
            label.textContent = index === 0 ? 'PRE' : 'W' + index;
            if (index === activeIndex) label.className = 'is-active';
            weekLabels.appendChild(label);
        }
    }

    function revealPath(path) {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var length = path.getTotalLength();
        if (!Number.isFinite(length) || length <= 0) return;
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        window.requestAnimationFrame(function () {
            path.style.transition = 'stroke-dashoffset ' + TRANSITION_MS + 'ms cubic-bezier(.16,1,.3,1)';
            path.style.strokeDashoffset = '0';
        });
    }

    function renderPaths(shouldAnimate) {
        var namespace = 'http://www.w3.org/2000/svg';
        paths.replaceChildren();
        paths.setAttribute('viewBox', '0 0 1000 1000');
        timeline.teams.forEach(function (team, index) {
            var path = document.createElementNS(namespace, 'path');
            var firstLocation = point(0, rankFor(timeline.frames[0], team.roster_id));
            var commands = ['M' + (firstLocation.x * 10) + ' ' + (firstLocation.y * 10)];
            for (var frameIndex = 1; frameIndex <= activeIndex; frameIndex += 1) {
                var previousLocation = point(frameIndex - 1, rankFor(timeline.frames[frameIndex - 1], team.roster_id));
                var location = point(frameIndex, rankFor(timeline.frames[frameIndex], team.roster_id));
                var horizontalHandle = (location.x - previousLocation.x) * 0.44;
                commands.push('C' + ((previousLocation.x + horizontalHandle) * 10) + ' ' + (previousLocation.y * 10) + ' ' + ((location.x - horizontalHandle) * 10) + ' ' + (location.y * 10) + ' ' + (location.x * 10) + ' ' + (location.y * 10));
            }
            path.setAttribute('d', commands.join(' '));
            path.setAttribute('stroke', colors[index % colors.length]);
            path.setAttribute('vector-effect', 'non-scaling-stroke');
            path.classList.add('power-lines__path');
            if (highlightedRosterId && Number(team.roster_id) !== Number(highlightedRosterId)) path.classList.add('is-muted');
            paths.appendChild(path);
            if (shouldAnimate && activeIndex > 0) revealPath(path);
        });
    }

    function avatar(team) {
        var image = document.createElement('img');
        image.src = team.avatar || 'artwork/logo.png';
        image.alt = '';
        image.loading = 'lazy';
        image.onerror = function () { this.onerror = null; this.src = 'artwork/logo.png'; };
        return image;
    }

    function toggleHighlightedTeam(rosterId) {
        highlightedRosterId = Number(highlightedRosterId) === Number(rosterId) ? null : rosterId;
        updateFrame();
    }

    function renderMarkers(shouldAnimate) {
        var frame = timeline.frames[activeIndex];
        var previousFrame = timeline.frames[Math.max(0, activeIndex - 1)];
        markers.textContent = '';
        frame.standings.forEach(function (standing) {
            var team = teamForRoster(standing.roster_id);
            if (!team) return;
            var marker = document.createElement('button');
            var location = point(activeIndex, standing.rank);
            marker.type = 'button';
            marker.className = 'power-lines__marker';
            marker.style.setProperty('--power-x', location.x + '%');
            marker.style.setProperty('--power-y', location.y + '%');
            marker.style.setProperty('--power-color', colors[timeline.teams.indexOf(team) % colors.length]);
            marker.setAttribute('aria-label', team.team_name + ', rank ' + standing.rank + ' in ' + frame.label + '.');
            if (Number(highlightedRosterId) === Number(team.roster_id)) marker.classList.add('is-highlighted');
            marker.appendChild(avatar(team));
            marker.addEventListener('click', function () { toggleHighlightedTeam(team.roster_id); });
            markers.appendChild(marker);
            if (shouldAnimate && activeIndex > 0 && marker.animate && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
                var previousLocation = point(activeIndex - 1, rankFor(previousFrame, team.roster_id));
                marker.animate([
                    { left: previousLocation.x + '%', top: previousLocation.y + '%', transform: 'translate(-50%,-50%) scale(.92)' },
                    { left: location.x + '%', top: location.y + '%', transform: 'translate(-50%,-50%) scale(1)' }
                ], { duration: TRANSITION_MS, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
            }
        });
    }

    function renderTeamList() {
        var frame = timeline.frames[activeIndex];
        var previous = timeline.frames[Math.max(0, activeIndex - 1)];
        teamsList.textContent = '';
        frame.standings.slice().sort(function (first, second) { return first.rank - second.rank; }).forEach(function (standing) {
            var team = teamForRoster(standing.roster_id);
            if (!team) return;
            var button = document.createElement('button');
            var copy = document.createElement('span');
            var movement = document.createElement('strong');
            var change = rankFor(previous, team.roster_id) - Number(standing.rank);
            button.type = 'button';
            button.className = 'power-lines__team';
            if (Number(highlightedRosterId) === Number(team.roster_id)) button.classList.add('is-highlighted');
            button.appendChild(avatar(team));
            copy.textContent = team.team_name;
            movement.textContent = activeIndex === 0 ? 'Draft ' + team.draft_order : (change > 0 ? '▲ ' + change : change < 0 ? '▼ ' + Math.abs(change) : '—');
            movement.className = change > 0 ? 'is-up' : change < 0 ? 'is-down' : '';
            button.append(copy, movement);
            button.setAttribute('aria-pressed', Number(highlightedRosterId) === Number(team.roster_id) ? 'true' : 'false');
            button.addEventListener('click', function () { toggleHighlightedTeam(team.roster_id); });
            teamsList.appendChild(button);
        });
    }

    function updateFrame(shouldAnimate) {
        if (!timeline) return;
        activeIndex = Math.max(0, Math.min(timeline.frames.length - 1, activeIndex));
        range.value = String(activeIndex);
        output.textContent = timeline.frames[activeIndex].label;
        renderWeekLabels();
        renderPaths(Boolean(shouldAnimate));
        renderMarkers(Boolean(shouldAnimate));
        renderTeamList();
    }

    function setPlaying(shouldPlay) {
        window.clearInterval(playbackTimer);
        playbackTimer = null;
        playButton.setAttribute('aria-pressed', shouldPlay ? 'true' : 'false');
        playButton.querySelector('[aria-hidden="true"]').textContent = shouldPlay ? '❚❚' : '▶';
        playLabel.textContent = shouldPlay ? 'Pause' : 'Play';
        playButton.setAttribute('aria-label', shouldPlay ? 'Pause standings progression' : 'Play standings progression');
        if (!shouldPlay) return;
        playbackTimer = window.setInterval(function () {
            if (activeIndex >= timeline.frames.length - 1) { setPlaying(false); return; }
            activeIndex += 1;
            updateFrame(true);
        }, TRANSITION_MS + 180);
    }

    function configureTimeline() {
        var finalFrame = timeline.frames.length - 1;
        range.max = String(finalFrame);
        range.value = String(activeIndex);
        range.disabled = finalFrame === 0;
        board.style.setProperty('--power-team-count', String(timeline.teams.length));
        board.style.setProperty('--power-frame-count', String(REGULAR_SEASON_WEEKS + 1));
        playoffLine.style.setProperty('--power-playoff-rank', String(Math.min(timeline.playoff_teams, timeline.teams.length)));
        playoffLine.querySelector('span').textContent = timeline.playoff_teams + ' TEAM PLAYOFF LINE';
        renderRankLabels();
        boardWrap.hidden = false;
        controls.hidden = false;
        status.textContent = String(timeline.season || 'Current') + ' season · ' + timeline.teams.length + ' teams · ' + timeline.through_week + ' completed week' + (timeline.through_week === 1 ? '' : 's');
        updateFrame();
    }

    function requestTimeline() {
        if (!/^\d{10,25}$/.test(leagueId)) { showFailure('Standings timeline is not configured.'); return; }
        fetch('/.netlify/functions/sleeper?source=standings-timeline&league=' + encodeURIComponent(leagueId), { cache: 'no-store', headers: { Accept: 'application/json' } })
            .then(function (response) { return response.text().then(function (text) { var data = null; try { data = text ? JSON.parse(text) : null; } catch (error) {} if (!response.ok) throw new Error(data && data.error || 'Standings timeline is unavailable.'); return data; }); })
            .then(function (data) { validateTimeline(data); timeline = data; activeIndex = Math.max(0, timeline.frames.length - 1); configureTimeline(); })
            .catch(function (error) { showFailure('The standings race is temporarily unavailable.'); window.console.warn('Power Lines request failed.', error); });
    }

    range.addEventListener('input', function () { setPlaying(false); activeIndex = Number(range.value) || 0; updateFrame(); });
    playButton.addEventListener('click', function () {
        if (!timeline || timeline.frames.length < 2) return;
        var playing = playButton.getAttribute('aria-pressed') === 'true';
        if (!playing && activeIndex >= timeline.frames.length - 1) activeIndex = 0;
        setPlaying(!playing);
        updateFrame();
    });
    document.addEventListener('visibilitychange', function () { if (document.hidden) setPlaying(false); });
    requestTimeline();
}(window, document));
