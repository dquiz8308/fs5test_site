document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var divisions = {
        SMOKEY_ROAD: { name: 'Smokey Road', slug: 'smokey-road', logo: 'artwork/smokey-road.png', accent: '#ef6c18' },
        EVANS: { name: 'Evans', slug: 'evans', logo: 'artwork/evans.png', accent: '#d7b866' },
        MADRAS: { name: 'Madras', slug: 'madras', logo: 'artwork/madras.png', accent: '#df3333' }
    };
    var divisionOrder = ['SMOKEY_ROAD', 'EVANS', 'MADRAS'];
    var eraLabels = {
        all_time: 'All-time division results beginning in 2019.',
        retroactive: 'Retroactive division results from 2019 through 2024.',
        unofficial: 'Unofficial division results from the 2025 season.',
        official: 'Official division results beginning with the 2026 season.'
    };
    var yearSelect = document.getElementById('standings-year');
    var weekSelect = document.getElementById('standings-week');
    var eraSelect = document.getElementById('era-filter');
    var scopeSelect = document.getElementById('scope-filter');
    var comparisonEraSelect = document.getElementById('comparison-era-filter');
    var standingsGrid = document.getElementById('standings-grid');
    var rivalriesGrid = document.getElementById('rivalries-grid');
    var comparisonWrap = document.getElementById('comparison-wrap');
    var legacyGrid = document.getElementById('legacy-grid');
    var pageStatus = document.getElementById('page-status');
    var comparisonStatus = document.getElementById('comparison-status');
    var comparisonContext = document.getElementById('comparison-context');
    var requestSequence = 0;
    var comparisonRequestSequence = 0;

    [yearSelect, weekSelect, eraSelect, scopeSelect].forEach(function(control) {
        control.addEventListener('change', loadPrimaryData);
    });
    comparisonEraSelect.addEventListener('change', loadComparisonData);

    renderStandings([]);
    loadPrimaryData();
    loadComparisonData();

    async function loadPrimaryData() {
        var requestId = ++requestSequence;
        var selection = getSelection();
        setPrimaryBusy(true);
        showStatus('Loading division history...', 'is-loading');

        try {
            var data = await fetchPageData(selection);
            if (requestId !== requestSequence) return;
            data = data || {};
            renderStandings(arrayValue(data.standings));
            renderRivalries(arrayValue(data.rivalries));
            renderLegacy(arrayValue(data.legacy_totals));
            showStatus('', '');
        } catch (error) {
            if (requestId !== requestSequence) return;
            renderStandings([]);
            rivalriesGrid.replaceChildren();
            legacyGrid.replaceChildren();
            showStatus('Division data could not be loaded. Please try again or refresh the page.', 'is-error');
            console.error('Divisions Supabase request failed.', { selection: selection, error: error });
        } finally {
            if (requestId === requestSequence) setPrimaryBusy(false);
        }
    }

    async function loadComparisonData() {
        var requestId = ++comparisonRequestSequence;
        var selection = getSelection();
        selection.era = comparisonEraSelect.value;
        comparisonContext.textContent = eraLabels[selection.era];
        setComparisonBusy(true);
        showComparisonStatus('Loading division comparison...', 'is-loading');
        try {
            var data = await fetchPageData(selection);
            if (requestId !== comparisonRequestSequence) return;
            renderComparison(arrayValue((data || {}).comparison));
            showComparisonStatus('', '');
        } catch (error) {
            if (requestId !== comparisonRequestSequence) return;
            renderEmpty(comparisonWrap, 'Division comparison is temporarily unavailable.');
            showComparisonStatus('Division comparison could not be loaded. Please try again.', 'is-error');
            console.error('Divisions comparison request failed.', { selection: selection, error: error });
        } finally {
            if (requestId === comparisonRequestSequence) setComparisonBusy(false);
        }
    }

    function getSelection() {
        return {
            year: Number(yearSelect.value),
            throughWeek: weekSelect.value === '' ? null : Number(weekSelect.value),
            era: eraSelect.value,
            scope: scopeSelect.value
        };
    }

    async function fetchPageData(selection) {
        if (!window.fs5Supabase) throw new Error('The shared Supabase configuration did not load.');
        var response = await window.fs5Supabase.getClient().rpc('site_divisions_page', {
            p_year: selection.year,
            p_through_week: selection.throughWeek,
            p_era: selection.era,
            p_scope: selection.scope
        });
        if (response.error) throw response.error;
        if (Array.isArray(response.data)) return response.data.length ? response.data[0] : null;
        return response.data || null;
    }

    function renderStandings(rows) {
        var grouped = groupByDivision(rows);
        var fragment = document.createDocumentFragment();
        divisionOrder.forEach(function(code) {
            var meta = divisions[code];
            var card = element('article', 'division-card division-card--' + meta.slug);
            card.style.setProperty('--division-accent', meta.accent);
            var header = element('div', 'division-card__header');
            header.appendChild(image(meta.logo, meta.name + ' logo', 'division-card__logo'));
            var heading = element('div');
            heading.appendChild(textElement('h3', meta.name));
            heading.appendChild(textElement('p', '2026 official standings'));
            header.appendChild(heading);
            card.appendChild(header);
            if (!grouped[code] || !grouped[code].length) {
                var future = element('div', 'future-state');
                future.appendChild(textElement('strong', 'Standings will appear when the 2026 season begins'));
                card.appendChild(future);
            } else {
                card.appendChild(buildStandingsTable(grouped[code]));
            }
            fragment.appendChild(card);
        });
        standingsGrid.replaceChildren(fragment);
    }

    function buildStandingsTable(rows) {
        var table = element('table', 'standings-table');
        table.appendChild(buildHead(['Rank', 'Team / Owner', 'W–L', 'DIV']));
        var body = document.createElement('tbody');
        rows.forEach(function(row) {
            var tr = document.createElement('tr');
            if (row.is_division_champion) tr.classList.add('is-division-champion');
            appendCell(tr, whole(row.division_rank || row.rank));
            var identity = document.createElement('td');
            var copy = element('span', 'team-copy');
            copy.appendChild(textElement('strong', value(row.team_name || row.owner_name)));
            if (row.team_name && row.owner_name) copy.appendChild(textElement('span', row.owner_name));
            if (row.is_division_champion) {
                var championLabel = textElement('span', 'Division Champion', 'champion-label');
                championLabel.prepend(championIcon());
                copy.appendChild(championLabel);
            }
            identity.appendChild(copy);
            tr.appendChild(identity);
            appendCell(tr, winLossRecord(row.wins, row.losses));
            appendCell(tr, winLossRecord(row.division_wins, row.division_losses));
            body.appendChild(tr);
        });
        table.appendChild(body);
        return table;
    }

    function renderRivalries(rows) {
        if (!rows.length) {
            rivalriesGrid.replaceChildren(emptyMessage('No interdivision games were found for this era and scope.'));
            return;
        }
        var fragment = document.createDocumentFragment();
        rows.forEach(function(row) {
            var first = metaFor(row.division_1_code, row.division_1_name);
            var second = metaFor(row.division_2_code, row.division_2_name);
            var card = element('article', 'rivalry-card');
            var teams = element('div', 'rivalry-card__teams');
            var firstWins = Number(row.division_1_wins);
            var secondWins = Number(row.division_2_wins);
            teams.appendChild(rivalryTeam(first, row.division_1_wins, firstWins > secondWins));
            teams.appendChild(textElement('span', 'VS', 'rivalry-card__versus'));
            teams.appendChild(rivalryTeam(second, row.division_2_wins, secondWins > firstWins));
            card.appendChild(teams);
            card.appendChild(textElement('p', whole(row.games_played) + ' games · ' + whole(row.ties) + (Number(row.ties) === 1 ? ' tie' : ' ties'), 'rivalry-card__meta'));
            fragment.appendChild(card);
        });
        rivalriesGrid.replaceChildren(fragment);
    }

    function rivalryTeam(meta, wins, isLeading) {
        var team = element('div', 'rivalry-team' + (isLeading ? ' is-leading' : ''));
        team.appendChild(image(meta.logo, '', ''));
        team.appendChild(textElement('h3', meta.name));
        team.appendChild(textElement('strong', whole(wins)));
        return team;
    }

    function renderComparison(rows) {
        if (!rows.length) {
            renderEmpty(comparisonWrap, 'No division comparison is available for this era.');
            return;
        }
        var table = element('table', 'comparison-table');
        table.appendChild(buildHead(['Division', 'Regular W–L–T', 'Win %', 'Points For', 'Playoff Apps.', 'Championships']));
        var body = document.createElement('tbody');
        rows.forEach(function(row) {
            var meta = metaFor(row.division_code, row.division_name);
            var tr = document.createElement('tr');
            tr.style.setProperty('--division-accent', meta.accent);
            var first = document.createElement('td');
            var identity = element('span', 'comparison-identity');
            identity.appendChild(image(meta.logo, '', ''));
            identity.appendChild(document.createTextNode(meta.name));
            first.appendChild(identity);
            first.setAttribute('data-label', 'Division');
            tr.appendChild(first);
            appendCell(tr, record(row.regular_wins, row.regular_losses, row.regular_ties)).setAttribute('data-label', 'Regular W–L–T');
            appendCell(tr, percentage(row.regular_win_percentage)).setAttribute('data-label', 'Win %');
            appendCell(tr, points(row.regular_points_for)).setAttribute('data-label', 'Points For');
            appendCell(tr, whole(row.playoff_appearances)).setAttribute('data-label', 'Playoff Apps.');
            appendCell(tr, whole(row.championships)).setAttribute('data-label', 'Championships');
            body.appendChild(tr);
        });
        table.appendChild(body);
        comparisonWrap.replaceChildren(table);
    }

    function renderLegacy(rows) {
        if (!rows.length) {
            legacyGrid.replaceChildren(emptyMessage('Legacy totals are temporarily unavailable.'));
            return;
        }
        var fragment = document.createDocumentFragment();
        rows.forEach(function(row) {
            var meta = metaFor(row.division_code, row.division_name);
            var card = element('article', 'legacy-card');
            card.style.setProperty('--division-accent', meta.accent);
            card.appendChild(image(meta.logo, meta.name + ' logo', ''));
            var content = document.createElement('div');
            content.appendChild(textElement('h3', meta.name));
            var stats = element('div', 'legacy-stats');
            stats.appendChild(stat(row.championships, 'Championships'));
            stats.appendChild(stat(row.playoff_appearances, 'Playoff Appearances'));
            stats.appendChild(stat(row.combined_owner_seasons, 'Owner-Seasons'));
            content.appendChild(stats);
            card.appendChild(content);
            fragment.appendChild(card);
        });
        legacyGrid.replaceChildren(fragment);
    }

    function stat(number, label) {
        var item = document.createElement('div');
        item.appendChild(textElement('strong', whole(number)));
        item.appendChild(textElement('span', label));
        return item;
    }

    function groupByDivision(rows) {
        return rows.reduce(function(groups, row) {
            var code = row.division_code;
            if (!groups[code]) groups[code] = [];
            groups[code].push(row);
            return groups;
        }, {});
    }

    function metaFor(code, fallbackName) {
        return divisions[code] || { name: fallbackName || 'Division', logo: '../artwork/logo.png', accent: '#d7b866' };
    }

    function setPrimaryBusy(isBusy) {
        [yearSelect, weekSelect, eraSelect, scopeSelect].forEach(function(control) { control.disabled = isBusy; });
        document.querySelector('.rivalries-section').setAttribute('aria-busy', String(isBusy));
    }

    function setComparisonBusy(isBusy) {
        comparisonEraSelect.disabled = isBusy;
        comparisonWrap.closest('.divisions-section').setAttribute('aria-busy', String(isBusy));
    }

    function showStatus(message, className) {
        pageStatus.textContent = message;
        pageStatus.className = 'page-status' + (className ? ' ' + className : '');
    }

    function showComparisonStatus(message, className) {
        comparisonStatus.textContent = message;
        comparisonStatus.className = 'page-status' + (className ? ' ' + className : '');
    }

    function renderEmpty(container, message) { container.replaceChildren(emptyMessage(message)); }
    function emptyMessage(message) { return textElement('div', message, 'empty-state empty-state--panel'); }
    function arrayValue(valueToCheck) { return Array.isArray(valueToCheck) ? valueToCheck : []; }
    function value(item) { return item === null || item === undefined || item === '' ? '—' : String(item); }
    function whole(item) { var number = Number(item); return Number.isFinite(number) ? String(Math.trunc(number)) : '—'; }
    function points(item) { var number = Number(item); return Number.isFinite(number) ? number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'; }
    function percentage(item) { var number = Number(item); return Number.isFinite(number) ? (number * 100).toFixed(1) + '%' : '—'; }
    function record(wins, losses, ties) { return whole(wins) + '–' + whole(losses) + '–' + whole(ties); }
    function winLossRecord(wins, losses) { return whole(wins) + '–' + whole(losses); }
    function element(tag, className) { var node = document.createElement(tag); if (className) node.className = className; return node; }
    function textElement(tag, text, className) { var node = element(tag, className); node.textContent = text; return node; }
    function image(src, alt, className) { var node = element('img', className); node.src = src; node.alt = alt; return node; }
    function championIcon() {
        var namespace = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(namespace, 'svg');
        var path = document.createElementNS(namespace, 'path');
        svg.setAttribute('class', 'champion-icon');
        svg.setAttribute('viewBox', '0 0 16 16');
        svg.setAttribute('aria-hidden', 'true');
        path.setAttribute('d', 'M3 3.5h10v2.2c0 3.1-1.8 5.1-5 5.8-3.2-.7-5-2.7-5-5.8V3.5Zm2 9h6M8 11.5v1M3 5H1.5c0 2.1.8 3.2 2.2 3.7M13 5h1.5c0 2.1-.8 3.2-2.2 3.7');
        svg.appendChild(path);
        return svg;
    }
    function appendCell(row, text) { var cell = document.createElement('td'); cell.textContent = text; row.appendChild(cell); return cell; }
    function buildHead(labels) { var head = document.createElement('thead'); var row = document.createElement('tr'); labels.forEach(function(label) { var th = document.createElement('th'); th.scope = 'col'; th.textContent = label; row.appendChild(th); }); head.appendChild(row); return head; }
});
