(function() {
    'use strict';

    var yearDropdown = document.querySelector('.year-dropdown');
    var requestTokens = {
        finalrank: 0,
        finalpoints: 0,
        single: 0,
        totals: 0,
        highest: 0,
        nonpoint: 0
    };

    var categoryOptions = {
        single: [
            ['high-score', 'Highest Score'],
            ['low-score', 'Lowest Score'],
            ['high-margin', 'Biggest Blowout'],
            ['low-margin', 'Closest Win'],
            ['least-win', 'Least Winning'],
            ['most-lose', 'Most Losing'],
            ['high-comb', 'Highest Scoring Game'],
            ['low-comb', 'Lowest Scoring Game'],
            ['high-bench', 'Highest Bench'],
            ['high-tds', 'Most TDs']
        ],
        totals: [
            ['total-qb', 'Total QB'],
            ['total-rb', 'Total RB'],
            ['total-wr', 'Total WR'],
            ['total-te', 'Total TE'],
            ['total-k', 'Total K'],
            ['total-def', 'Total DEF'],
            ['bench', 'Total Bench'],
            ['tds', 'Total TDs'],
            ['mnf', 'Total MNF'],
            ['tnf', 'Total TNF']
        ],
        highest: [
            ['high-all', 'Highest Players (All)'],
            ['high-qb', 'Highest QB Scores'],
            ['high-rb', 'Highest RB Scores'],
            ['high-wr', 'Highest WR Scores'],
            ['high-te', 'Highest TE Scores'],
            ['high-k', 'Highest K Scores'],
            ['high-def', 'Highest DEF Scores']
        ],
        nonpoint: [
            ['1rank', 'Total Weeks Ranked at #1'],
            ['top-team', 'Total Top Scoring Weeks'],
            ['bottom-team', 'Total Lowest Scoring Weeks'],
            ['close-games', 'Total Close Games'],
            ['coaching-calls', 'Total Coaching Calls']
        ]
    };

    var panels = {
        finalrank: {
            table: document.querySelector('.finalrank-table'),
            category: 'final-placing',
            limit: 12
        },
        finalpoints: {
            table: document.querySelector('.finalpoints-table'),
            category: 'points-for-against',
            limit: 12
        },
        single: {
            table: document.querySelector('.single-game-table'),
            dropdown: document.querySelector('.single-game-dropdown'),
            limit: function(category) { return category === 'high-tds' ? 12 : 10; }
        },
        totals: {
            table: document.querySelector('.position-totals-table'),
            dropdown: document.querySelector('.position-totals-dropdown'),
            limit: 12
        },
        highest: {
            table: document.querySelector('.highest-position-table'),
            dropdown: document.querySelector('.highest-position-dropdown'),
            limit: 10
        },
        nonpoint: {
            table: document.querySelector('.nonpoint-table'),
            dropdown: document.querySelector('.nonpoint-dropdown'),
            limit: 12
        }
    };

    var scopes = [
        { element: document.getElementById('position-comb'), value: 'combined' },
        { element: document.getElementById('position-reg'), value: 'regular' },
        { element: document.getElementById('position-post'), value: 'postseason' }
    ];

    var headers = {
        finalrank: ['Rank', 'Owner', 'Team Name', 'Record'],
        finalpoints: ['Rank', 'Owner', 'Points For', 'Avg PPG', 'Points Against', 'Avg PPA'],
        single: {
            'high-score': ['Rank', 'Score', 'Owner', 'Week'],
            'low-score': ['Rank', 'Score', 'Owner', 'Week'],
            'high-margin': ['Rank', 'Margin', 'Owner', 'Week', 'Detail'],
            'low-margin': ['Rank', 'Margin', 'Owner', 'Week', 'Detail'],
            'least-win': ['Rank', 'Score', 'Owner', 'Week', 'Detail'],
            'most-lose': ['Rank', 'Score', 'Owner', 'Week', 'Detail'],
            'high-comb': ['Rank', 'Combined', 'Week', 'Detail'],
            'low-comb': ['Rank', 'Combined', 'Week', 'Detail'],
            'high-bench': ['Rank', 'Bench', 'Owner', 'Week'],
            'high-tds': ['Rank', 'Owner', 'TDs', 'Week']
        },
        totals: {
            'total-qb': ['Rank', 'Total QB', 'Owner'],
            'total-rb': ['Rank', 'Total RB', 'Owner'],
            'total-wr': ['Rank', 'Total WR', 'Owner'],
            'total-te': ['Rank', 'Total TE', 'Owner'],
            'total-k': ['Rank', 'Total K', 'Owner'],
            'total-def': ['Rank', 'Total DEF', 'Owner'],
            bench: ['Rank', 'Total Bench', 'Owner'],
            tds: ['Rank', 'Owner', 'Total TDs'],
            mnf: ['Rank', 'Total MNF', 'Owner'],
            tnf: ['Rank', 'Total TNF', 'Owner']
        },
        highest: {
            'high-all': ['Rank', 'Score', 'Owner', 'Week', 'Player'],
            'high-qb': ['Rank', 'Score', 'Owner', 'Week', 'Player'],
            'high-rb': ['Rank', 'Score', 'Owner', 'Week', 'Player'],
            'high-wr': ['Rank', 'Score', 'Owner', 'Week', 'Player'],
            'high-te': ['Rank', 'Score', 'Owner', 'Week', 'Player'],
            'high-k': ['Rank', 'Score', 'Owner', 'Week', 'Player'],
            'high-def': ['Rank', 'Score', 'Owner', 'Week', 'Player']
        },
        nonpoint: {
            '1rank': ['Rank', 'Owner', '# of Weeks'],
            'top-team': ['Rank', 'Owner', '# of Weeks'],
            'bottom-team': ['Rank', 'Owner', '# of Weeks'],
            'close-games': ['Rank', 'Owner', '# of Games'],
            'coaching-calls': ['Rank', 'Owner', '# of Games']
        }
    };

    function availableOptions(panelKey, year) {
        return categoryOptions[panelKey].filter(function(option) {
            var category = option[0];
            if (year < 2019 && ['high-tds', 'tds', 'mnf', 'tnf', '1rank', 'coaching-calls'].includes(category)) {
                return false;
            }
            if (year < 2018 && category === 'close-games') {
                return false;
            }
            return true;
        });
    }

    function rebuildDropdown(panelKey, year) {
        var dropdown = panels[panelKey].dropdown;
        var previousValue = dropdown.value;
        var options = availableOptions(panelKey, year);
        dropdown.replaceChildren();
        options.forEach(function(optionData) {
            var option = document.createElement('option');
            option.value = optionData[0];
            option.textContent = optionData[1];
            dropdown.appendChild(option);
        });
        if (options.some(function(optionData) { return optionData[0] === previousValue; })) {
            dropdown.value = previousValue;
        }
        dropdown.dispatchEvent(new CustomEvent('season-options-rebuilt'));
    }

    function setCombinedScope() {
        scopes.forEach(function(scope) {
            scope.element.checked = scope.value === 'combined';
        });
    }

    function selectedScope() {
        var selected = scopes.find(function(scope) { return scope.element.checked; });
        return selected ? selected.value : 'combined';
    }

    function updateScopeControls() {
        var combinedOnly = ['mnf', 'tnf'].includes(panels.totals.dropdown.value);
        if (combinedOnly) {
            setCombinedScope();
        }
        scopes.forEach(function(scope) {
            scope.element.disabled = combinedOnly;
        });
        document.querySelector('.checkbox-position').setAttribute('aria-disabled', String(combinedOnly));
    }

    function panelCategory(panelKey) {
        return panels[panelKey].category || panels[panelKey].dropdown.value;
    }

    function panelHeaders(panelKey, category) {
        return Array.isArray(headers[panelKey]) ? headers[panelKey] : headers[panelKey][category];
    }

    function setHeaders(panelKey, category) {
        var row = panels[panelKey].table.querySelector('thead tr');
        row.replaceChildren();
        panelHeaders(panelKey, category).forEach(function(label) {
            var cell = document.createElement('th');
            cell.textContent = label;
            row.appendChild(cell);
        });
    }

    function setState(panelKey, category, message, isError) {
        setHeaders(panelKey, category);
        var body = panels[panelKey].table.querySelector('tbody');
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.colSpan = panelHeaders(panelKey, category).length;
        cell.className = isError ? 'table-status table-error' : 'table-status';
        cell.textContent = message;
        row.appendChild(cell);
        body.replaceChildren(row);
    }

    function displayText(value) {
        return value === null || value === undefined || value === '' ? '—' : String(value);
    }

    function points(value) {
        if (value === null || value === undefined || value === '') {
            return '—';
        }
        var number = Number(value);
        return Number.isFinite(number) ? number.toFixed(2) : '—';
    }

    function count(value) {
        if (value === null || value === undefined || value === '') {
            return '—';
        }
        var number = Number(value);
        return Number.isFinite(number) ? String(Math.trunc(number)) : '—';
    }

    function matchup(ownerOne, scoreOne, ownerTwo, scoreTwo) {
        if (!ownerOne || !ownerTwo) {
            return '—';
        }
        return displayText(ownerOne) + ' over ' + displayText(ownerTwo) +
            ' (' + points(scoreOne) + ' - ' + points(scoreTwo) + ')';
    }

    function rowValues(panelKey, category, row) {
        if (panelKey === 'finalrank') {
            return [displayText(row.display_rank), displayText(row.owner_name),
                displayText(row.team_name), displayText(row.record_display)];
        }
        if (panelKey === 'finalpoints') {
            return [displayText(row.display_rank), displayText(row.owner_name),
                points(row.points_for), points(row.average_points_for),
                points(row.points_against), points(row.average_points_against)];
        }
        if (panelKey === 'highest') {
            return [displayText(row.display_rank), points(row.metric_value),
                displayText(row.owner_name), displayText(row.week_number),
                displayText(row.player_name)];
        }
        if (panelKey === 'nonpoint') {
            return [displayText(row.display_rank), displayText(row.owner_name), count(row.metric_value)];
        }
        if (panelKey === 'totals') {
            if (category === 'tds') {
                return [displayText(row.display_rank), displayText(row.owner_name), count(row.metric_value)];
            }
            return [displayText(row.display_rank), points(row.metric_value), displayText(row.owner_name)];
        }
        if (category === 'high-tds') {
            return [displayText(row.display_rank), displayText(row.owner_name),
                count(row.metric_value), displayText(row.week_number)];
        }
        if (['high-comb', 'low-comb'].includes(category)) {
            return [displayText(row.display_rank), points(row.metric_value), displayText(row.week_number),
                matchup(row.first_owner_name, row.first_score, row.second_owner_name, row.second_score)];
        }
        if (['high-margin', 'low-margin', 'least-win', 'most-lose'].includes(category)) {
            var firstOwner = category === 'most-lose' ? row.opponent_name : row.owner_name;
            var firstScore = category === 'most-lose' ? row.opponent_score : row.owner_score;
            var secondOwner = category === 'most-lose' ? row.owner_name : row.opponent_name;
            var secondScore = category === 'most-lose' ? row.owner_score : row.opponent_score;
            return [displayText(row.display_rank), points(row.metric_value), displayText(row.owner_name),
                displayText(row.week_number), matchup(firstOwner, firstScore, secondOwner, secondScore)];
        }
        return [displayText(row.display_rank), points(row.metric_value),
            displayText(row.owner_name), displayText(row.week_number)];
    }

    function renderRows(panelKey, category, rows) {
        setHeaders(panelKey, category);
        var body = panels[panelKey].table.querySelector('tbody');
        var fragment = document.createDocumentFragment();
        rows.forEach(function(dataRow) {
            var tableRow = document.createElement('tr');
            rowValues(panelKey, category, dataRow).forEach(function(value) {
                var cell = document.createElement('td');
                cell.textContent = value;
                tableRow.appendChild(cell);
            });
            fragment.appendChild(tableRow);
        });
        body.replaceChildren(fragment);
    }

    function setPanelControls(panelKey, disabled) {
        if (panels[panelKey].dropdown) {
            panels[panelKey].dropdown.disabled = disabled;
        }
        if (panelKey === 'totals') {
            scopes.forEach(function(scope) {
                scope.element.disabled = disabled || ['mnf', 'tnf'].includes(panels.totals.dropdown.value);
            });
        }
    }

    async function loadPanel(panelKey) {
        var panel = panels[panelKey];
        var category = panelCategory(panelKey);
        var token = ++requestTokens[panelKey];
        var scope = panelKey === 'totals' ? selectedScope() : 'combined';
        var limit = typeof panel.limit === 'function' ? panel.limit(category) : panel.limit;
        var context = {
            year: Number(yearDropdown.value),
            recordCategory: category,
            scope: scope,
            limit: limit
        };

        setPanelControls(panelKey, true);
        setState(panelKey, category, 'Loading records…', false);

        try {
            var client = window.fs5Supabase.getClient();
            var result = await client.rpc('site_season_records', {
                p_year: context.year,
                p_record_category: context.recordCategory,
                p_scope: context.scope,
                p_limit: context.limit
            });

            if (token !== requestTokens[panelKey]) {
                return;
            }
            if (result.error) {
                throw result.error;
            }
            if (!result.data || result.data.length === 0) {
                setState(panelKey, category, 'No records are available for this selection.', false);
                return;
            }
            renderRows(panelKey, category, result.data);
        } catch (error) {
            if (token !== requestTokens[panelKey]) {
                return;
            }
            console.error('Season Records Supabase request failed.', {
                year: context.year,
                recordCategory: context.recordCategory,
                scope: context.scope,
                limit: context.limit,
                error: error
            });
            setState(panelKey, category, 'Records are temporarily unavailable. Please try again.', true);
        } finally {
            if (token === requestTokens[panelKey]) {
                setPanelControls(panelKey, false);
                if (panelKey === 'totals') {
                    updateScopeControls();
                }
            }
        }
    }

    function loadAllPanels() {
        Object.keys(panels).forEach(loadPanel);
    }

    function handleYearChange() {
        var year = Number(yearDropdown.value);
        ['single', 'totals', 'highest', 'nonpoint'].forEach(function(panelKey) {
            rebuildDropdown(panelKey, year);
        });
        setCombinedScope();
        updateScopeControls();
        loadAllPanels();
    }

    yearDropdown.addEventListener('change', handleYearChange);

    ['single', 'highest', 'nonpoint'].forEach(function(panelKey) {
        panels[panelKey].dropdown.addEventListener('change', function() {
            loadPanel(panelKey);
        });
    });

    panels.totals.dropdown.addEventListener('change', function() {
        setCombinedScope();
        updateScopeControls();
        loadPanel('totals');
    });

    scopes.forEach(function(scope) {
        scope.element.addEventListener('change', function() {
            if (!scope.element.checked) {
                scope.element.checked = true;
                return;
            }
            scopes.forEach(function(otherScope) {
                otherScope.element.checked = otherScope === scope;
            });
            loadPanel('totals');
        });
    });

    setCombinedScope();
    handleYearChange();
})();
