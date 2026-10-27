(function (window, document) {
    'use strict';

    var panel = document.querySelector('[data-season-power-lines]');
    var yearSelect = document.getElementById('season-year');
    if (!panel || !yearSelect) return;

    var CONFIG = [
        { from: 2012, to: 2013, teams: 10, weeks: 15, playoffs: 4 },
        { from: 2014, to: 2018, teams: 12, weeks: 14, playoffs: 6 },
        { from: 2019, to: 2020, teams: 12, weeks: 13, playoffs: 6 },
        { from: 2021, to: 2025, teams: 12, weeks: 14, playoffs: 6 }
    ];
    var COLORS = ['#ff7357','#53d4e8','#ffd15c','#a98cff','#6fe0a8','#ff91b0','#66a9ff','#f4a55e','#5be1c5','#d989f1','#b7cf76','#f06f91'];
    var boardWrap = panel.querySelector('[data-power-lines-board-wrap]');
    var board = panel.querySelector('[data-power-lines-board]');
    var weeks = panel.querySelector('[data-power-lines-weeks]');
    var ranks = panel.querySelector('[data-power-lines-ranks]');
    var playoffLine = panel.querySelector('[data-power-lines-playoff-line]');
    var paths = panel.querySelector('[data-power-lines-paths]');
    var markers = panel.querySelector('[data-power-lines-markers]');
    var controls = panel.querySelector('[data-power-lines-controls]');
    var status = panel.querySelector('[data-power-lines-status]');
    var range = panel.querySelector('[data-power-lines-range]');
    var play = panel.querySelector('[data-power-lines-play]');
    var playLabel = panel.querySelector('[data-power-lines-play-label]');
    var expandToggle = panel.querySelector('[data-power-lines-expand]');
    var teamSelect = panel.querySelector('[data-power-lines-team-select]');
    var timeline = null;
    var highlightedOwnerId = null;
    var player = null;
    var pathElements = new Map();
    var markerElements = new Map();
    var requestToken = 0;

    function configFor(year) { return CONFIG.find(function (item) { return year >= item.from && year <= item.to; }); }
    function rpc(client, name, args) { return client.rpc(name, args).then(function (result) { if (result.error) throw result.error; return result.data || []; }); }
    function ownerKey(name) { return String(name || '').trim().split(/\s+/)[0].toLowerCase(); }
    function portrait(name, year) { return '../../owners/artwork/profile-history/' + ownerKey(name) + '_' + year + '.png'; }
    function reducedMotion() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    function rank(frame, ownerId) { var row = frame.standings.find(function (item) { return Number(item.owner_id) === Number(ownerId); }); return row ? Number(row.rank) : timeline.teams.length; }

    function stop() {
        if (player) player.pause();
        play.setAttribute('aria-pressed', 'false');
        playLabel.textContent = 'Play';
        play.setAttribute('aria-label', 'Play standings progression');
    }

    function setStatus(message) { status.textContent = message; status.hidden = false; boardWrap.hidden = true; controls.hidden = true; }

    function renderLabels() {
        weeks.replaceChildren();
        timeline.frames.forEach(function (frame, index) {
            var label = document.createElement('span'); label.textContent = frame.label;
            if (/^W\d+$/.test(frame.label)) {
                label.classList.add('is-week');
                label.setAttribute('data-mobile-label', frame.label.slice(1));
            }
            if (index === Math.round(player.getPosition())) label.classList.add('is-active');
            weeks.appendChild(label);
        });
    }

    function renderRankLabels() {
        ranks.replaceChildren();
        for (var i = 1; i <= timeline.teams.length; i += 1) { var label = document.createElement('span'); label.textContent = i; ranks.appendChild(label); }
    }

    function initializeVisuals() {
        var ns = 'http://www.w3.org/2000/svg';
        paths.setAttribute('viewBox', '0 0 1000 1000');
        paths.replaceChildren(); markers.replaceChildren(); pathElements.clear(); markerElements.clear();
        timeline.teams.forEach(function (teamRow) {
            var path = document.createElementNS(ns, 'path');
            path.setAttribute('stroke', teamRow.color); path.setAttribute('vector-effect', 'non-scaling-stroke');
            path.style.setProperty('--power-color', teamRow.color); path.classList.add('season-power-lines__path');
            paths.appendChild(path);
            var marker = document.createElement('button'); var image = document.createElement('img');
            marker.type = 'button'; marker.className = 'season-power-lines__marker'; marker.style.setProperty('--power-color', teamRow.color);
            image.src = teamRow.avatar; image.alt = ''; image.loading = 'lazy'; image.onerror = function () { this.onerror = null; this.src = '../../artwork/logo.png'; };
            marker.appendChild(image); marker.addEventListener('click', function () { highlightedOwnerId = Number(highlightedOwnerId) === Number(teamRow.owner_id) ? null : teamRow.owner_id; update(); }); markers.appendChild(marker);
            pathElements.set(Number(teamRow.owner_id), path); markerElements.set(Number(teamRow.owner_id), marker);
        });
    }

    function update() {
        if (!timeline || !player) return;
        var position = player.getPosition(); var nearest = timeline.frames[Math.round(position)];
        range.value = position; renderLabels();
        timeline.teams.forEach(function (teamRow) {
            var geometry = window.fs5PowerLinesTimeline.buildPath(timeline.frames, teamRow.owner_id, position, timeline.frames.length - 1, timeline.teams.length);
            var path = pathElements.get(Number(teamRow.owner_id)); var marker = markerElements.get(Number(teamRow.owner_id));
            path.setAttribute('d', geometry.d);
            path.classList.toggle('is-muted', highlightedOwnerId !== null && Number(teamRow.owner_id) !== Number(highlightedOwnerId));
            path.classList.toggle('is-highlighted', Number(teamRow.owner_id) === Number(highlightedOwnerId));
            marker.style.setProperty('--power-x', geometry.xPercent + '%'); marker.style.setProperty('--power-y', geometry.yPercent + '%');
            marker.classList.toggle('is-highlighted', Number(teamRow.owner_id) === Number(highlightedOwnerId));
            marker.setAttribute('aria-label', teamRow.team_name + ', rank ' + rank(nearest, teamRow.owner_id) + ' near ' + nearest.label + '.');
        });
        teamSelect.value = highlightedOwnerId === null ? '' : String(highlightedOwnerId);
    }
    function buildSelect() { teamSelect.replaceChildren(new Option('All Teams', '')); timeline.teams.slice().sort(function (a,b) { return a.team_name.localeCompare(b.team_name); }).forEach(function (item) { teamSelect.appendChild(new Option(item.team_name, item.owner_id)); }); }

    function buildTimeline(year, cfg, draftRows, weekRows, finalRows) {
        var draft = new Map();
        draftRows.forEach(function (row) { if (Number(row.draft_round) === 1) draft.set(Number(row.owner_id), Number(row.draft_slot)); });
        var latest = weekRows[weekRows.length - 1];
        var teams = latest.map(function (row, index) { var id=Number(row.owner_id); if (!draft.has(id)) throw new Error('Draft order is missing for ' + row.owner_name + '.'); return {owner_id:id,owner_name:String(row.owner_name),team_name:String(row.team_name || row.owner_name),avatar:portrait(row.owner_name,year),draft_order:draft.get(id),color:COLORS[index%COLORS.length]}; });
        if (teams.length !== cfg.teams) throw new Error('Unexpected team count for ' + year + '.');
        var frames = [{label:'PRE',standings:teams.map(function (item) { return {owner_id:item.owner_id,rank:item.draft_order}; })}];
        weekRows.forEach(function (rows, index) { frames.push({label:'W'+(index+1),standings:rows.map(function (row) { return {owner_id:Number(row.owner_id),rank:Number(row.overall_rank)}; })}); });
        var idByOwner = new Map(teams.map(function (item) { return [item.owner_name.toLowerCase(), item.owner_id]; }));
        var finalStandings = finalRows.map(function (row) { var id=idByOwner.get(String(row.owner_name).trim().toLowerCase()); if (!id) throw new Error('Final placement owner mapping failed for ' + row.owner_name + '.'); return {owner_id:id,rank:Number(row.numeric_rank)}; });
        frames.push({label:'FINAL',standings:finalStandings});
        frames.forEach(function (frame) { if (frame.standings.length !== cfg.teams || new Set(frame.standings.map(function (row) { return row.rank; })).size !== cfg.teams) throw new Error(frame.label + ' standings are incomplete.'); });
        return {year:year,teams:teams,frames:frames,config:cfg};
    }

    async function load() {
        var token = ++requestToken; var year = Number(yearSelect.value); var cfg = configFor(year); stop(); timeline = null; player = null; highlightedOwnerId = null; setStatus('Loading Power Lines…');
        try {
            if (!cfg) throw new Error('Power Lines is not configured for ' + year + '.');
            var client = window.fs5Supabase.getClient();
            var draftRows = await rpc(client,'site_draft_page',{p_year:year});
            var weekRows = [];
            for (var week=1; week<=cfg.weeks; week+=1) {
                if (token !== requestToken) return;
                weekRows.push(await rpc(client,'site_power_lines_standings',{p_year:year,p_through_week:week}));
            }
            if (token !== requestToken) return;
            var finalRows = await rpc(client,'site_season_records',{p_year:year,p_record_category:'final-placing',p_scope:'combined',p_limit:cfg.teams});
            if (token !== requestToken) return;
            timeline = buildTimeline(year,cfg,draftRows,weekRows,finalRows);
            board.style.setProperty('--power-team-count',cfg.teams); board.style.setProperty('--power-frame-count',timeline.frames.length); playoffLine.style.setProperty('--power-playoff-rank',cfg.playoffs); playoffLine.querySelector('span').textContent=cfg.playoffs+' TEAM PLAYOFF LINE';
            range.max=timeline.frames.length-1; buildSelect(); renderRankLabels(); initializeVisuals();
            player = window.fs5PowerLinesTimeline.createPlayer({getMaximum:function(){return timeline.frames.length-1;},onPosition:update,onPlayingChange:updatePlayButton,reducedMotion:reducedMotion});
            player.setPosition(timeline.frames.length-1); status.hidden=true; boardWrap.hidden=false; controls.hidden=false; update();
        } catch (error) { if (token !== requestToken) return; setStatus('Power Lines is temporarily unavailable for this season.'); window.console.warn('Historical Power Lines request failed.',error); }
    }

    function updatePlayButton(playing) { play.setAttribute('aria-pressed',playing?'true':'false'); playLabel.textContent=playing?'Pause':'Play'; play.setAttribute('aria-label',playing?'Pause standings progression':'Play standings progression'); }
    play.addEventListener('click', function () { if (player) player.toggle(); });
    range.addEventListener('input',function(){if(!player)return;player.pause();player.setPosition(range.value);});
    teamSelect.addEventListener('change',function(){highlightedOwnerId=teamSelect.value===''?null:Number(teamSelect.value);update();});
    expandToggle.addEventListener('change',function(){panel.classList.toggle('is-power-lines-expanded',expandToggle.checked);});
    document.addEventListener('season-records-loaded',function(event){
        if (event.detail && Number(event.detail.year) === Number(yearSelect.value)) load();
    });
    yearSelect.addEventListener('change',function(){
        requestToken += 1;
        stop();
        timeline = null;
        player = null;
        highlightedOwnerId = null;
        setStatus('Loading Power Lines…');
    });
    document.addEventListener('visibilitychange',function(){if(document.hidden&&player)player.pause();});
}(window, document));
