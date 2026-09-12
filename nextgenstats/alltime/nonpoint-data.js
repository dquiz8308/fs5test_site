(function() {
    'use strict';

    var REQUEST_LIMIT = 10;
    var requestSequence = {};

    var panels = [
        {
            tableClass: 'season-totals-table',
            dropdownClass: 'season-totals-dropdown',
            controlClass: 'checkbox-container'
        },
        {
            tableClass: 'owner-totals-table',
            dropdownClass: 'owner-totals-dropdown',
            controlClass: 'checkbox-owner'
        },
        {
            tableClass: 'playoff-records-table',
            dropdownClass: 'playoff-records-dropdown',
            controlClass: 'checkbox-playoffs'
        },
        {
            tableClass: 'consolation-records-table',
            dropdownClass: 'consolation-records-dropdown',
            controlClass: 'checkbox-consolation'
        },
        {
            tableClass: 'championship-records-table',
            dropdownClass: 'championship-records-dropdown',
            controlClass: 'checkbox-championship'
        },
        {
            tableClass: 'lastplace-records-table',
            dropdownClass: 'lastplace-records-dropdown',
            controlClass: 'checkbox-lastplace'
        }
    ];

    var categoryContracts = {
        'top-points-for': { headers: ['Rank', 'Owner', 'Points For', 'Year', 'Avg/Game'], type: 'season-points', scope: 'regular' },
        'top-points-against': { headers: ['Rank', 'Owner', 'Points Against', 'Year', 'Avg/Game'], type: 'season-points', scope: 'regular' },
        'season-tds': { headers: ['Rank', 'Owner', 'Touchdowns', 'Year'], type: 'season-total', scoped: true },
        'season-qb': { headers: ['Rank', 'Owner', 'Total QB Points', 'Year'], type: 'season-points-total', scoped: true },
        'season-rb': { headers: ['Rank', 'Owner', 'Total RB Points', 'Year'], type: 'season-points-total', scoped: true },
        'season-wr': { headers: ['Rank', 'Owner', 'Total WR Points', 'Year'], type: 'season-points-total', scoped: true },
        'season-te': { headers: ['Rank', 'Owner', 'Total TE Points', 'Year'], type: 'season-points-total', scoped: true },
        'season-k': { headers: ['Rank', 'Owner', 'Total K Points', 'Year'], type: 'season-total', scoped: true },
        'season-def': { headers: ['Rank', 'Owner', 'Total DEF Points', 'Year'], type: 'season-total', scoped: true },
        'owner-tds': { headers: ['Rank', 'Owner', 'TDs'], type: 'owner-total' },
        'owner-close': { headers: ['Rank', 'Owner', 'Games'], type: 'owner-total' },
        'owner-top': { headers: ['Rank', 'Owner', 'Weeks'], type: 'owner-total' },
        'owner-bottom': { headers: ['Rank', 'Owner', 'Weeks'], type: 'owner-total' },
        'owner-1rank': { headers: ['Rank', 'Owner', 'Weeks'], type: 'owner-total' },
        'win-streaks': { headers: ['Rank', 'Streak', 'Owner', 'Start', 'End'], type: 'game-streak' },
        'lose-streaks': { headers: ['Rank', 'Streak', 'Owner', 'Start', 'End'], type: 'game-streak' },
        'playoff-app': { headers: ['Rank', 'Owner', 'App'], type: 'owner-total' },
        'playoff-percent': { headers: ['Rank', 'Owner', 'App %', 'Apps', '# of Seasons'], type: 'percentage' },
        'playoff-byes': { headers: ['Rank', 'Owner', 'Playoff Byes'], type: 'owner-total' },
        'long-po-streaks': { headers: ['Rank', 'Owner', 'Streak', 'Years'], type: 'appearance-streak' },
        'current-po-streaks': { headers: ['Rank', 'Owner', 'Streak', 'Years'], type: 'appearance-streak' },
        'po-wins-winner': { headers: ['Rank', 'Owner', 'PO Wins'], type: 'owner-total' },
        'po-wins-all': { headers: ['Rank', 'Owner', 'PO Wins'], type: 'owner-total' },
        'lstreak-make': { headers: ['Rank', 'Owner', 'Streak', 'Year'], type: 'opening-streak' },
        'wstreak-miss': { headers: ['Rank', 'Owner', 'Streak', 'Year'], type: 'opening-streak' },
        'consolation-app': { headers: ['Rank', 'Owner', 'App'], type: 'owner-total' },
        'consolation-percent': { headers: ['Rank', 'Owner', 'App %', 'App', '# of Seasons'], type: 'percentage' },
        'consolation-byes': { headers: ['Rank', 'Owner', 'Consol Byes'], type: 'owner-total' },
        'long-con-streaks': { headers: ['Rank', 'Owner', 'Streak', 'Years'], type: 'appearance-streak' },
        'current-con-streaks': { headers: ['Rank', 'Owner', 'Streak', 'Years'], type: 'appearance-streak' },
        'championship-app': { headers: ['Rank', 'Owner', 'App'], type: 'owner-total' },
        'championship-wins': { headers: ['Rank', 'Owner', 'Wins'], type: 'owner-total' },
        'championship-losses': { headers: ['Rank', 'Owner', 'Losses'], type: 'owner-total' },
        'long-championship-streaks': { headers: ['Rank', 'Owner', 'Streak', 'Years'], type: 'appearance-streak' },
        'championship-percent': { headers: ['Rank', 'Owner', 'Win %', 'Wins', 'App'], type: 'win-percentage' },
        'lastplace-app': { headers: ['Rank', 'Owner', 'App'], type: 'owner-total' },
        'lastplace-losses': { headers: ['Rank', 'Owner', 'Losses'], type: 'owner-total' },
        'lastplace-wins': { headers: ['Rank', 'Owner', 'Wins'], type: 'owner-total' },
        'long-lastplace-streaks': { headers: ['Rank', 'Owner', 'Streak', 'Years'], type: 'appearance-streak' },
        'lastplace-percent': { headers: ['Rank', 'Owner', 'Lose %', 'Losses', 'App'], type: 'loss-percentage' }
    };

    function detail(row, key) {
        return row && row.details && typeof row.details === 'object' ? row.details[key] : null;
    }

    function display(value) {
        return value === null || value === undefined ? '' : String(value);
    }

    function fixed(value) {
        var number = Number(value);
        return value === null || value === undefined || !Number.isFinite(number) ? '' : number.toFixed(2);
    }

    function whole(value) {
        var number = Number(value);
        return value === null || value === undefined || !Number.isFinite(number) ? '' : String(Math.trunc(number));
    }

    function percentage(value) {
        var number = Number(value);
        if (value === null || value === undefined || !Number.isFinite(number)) {
            return '';
        }
        return (Math.abs(number) <= 1 ? number * 100 : number).toFixed(2) + '%';
    }

    function weekPoint(year, week) {
        if (year === null || year === undefined) {
            return '';
        }
        return week === null || week === undefined ? String(year) : year + ' Week ' + week;
    }

    function yearRange(row) {
        var start = detail(row, 'start_year');
        var end = detail(row, 'is_current') ? 'Current' : detail(row, 'end_year');
        if (start === null || start === undefined) {
            return '';
        }
        return end === null || end === undefined ? String(start) : start + ' - ' + end;
    }

    function rowValues(row, contract) {
        var rank = display(row.display_rank);
        var owner = display(row.owner_name);
        var metric = row.metric_value;

        switch (contract.type) {
            case 'season-points':
                return [rank, owner, fixed(metric), display(detail(row, 'year')), fixed(detail(row, 'average_per_game'))];
            case 'season-points-total':
                return [rank, owner, fixed(metric), display(detail(row, 'year'))];
            case 'season-total':
                return [rank, owner, display(metric), display(detail(row, 'year'))];
            case 'game-streak':
                // A future View More enhancement is planned for winning and losing streak tables.
                return [
                    rank,
                    whole(detail(row, 'streak_length') ?? metric),
                    owner,
                    weekPoint(detail(row, 'start_year'), detail(row, 'start_week')),
                    weekPoint(detail(row, 'end_year'), detail(row, 'end_week'))
                ];
            case 'appearance-streak':
                return [rank, owner, whole(detail(row, 'streak_length') ?? metric), yearRange(row)];
            case 'opening-streak':
                return [rank, owner, whole(detail(row, 'streak_length') ?? metric), display(detail(row, 'year') ?? detail(row, 'start_year'))];
            case 'percentage':
                return [rank, owner, percentage(metric), whole(detail(row, 'appearances')), whole(detail(row, 'seasons_played'))];
            case 'win-percentage':
                return [rank, owner, percentage(metric), whole(detail(row, 'wins')), whole(detail(row, 'appearances'))];
            case 'loss-percentage':
                return [rank, owner, percentage(metric), whole(detail(row, 'losses')), whole(detail(row, 'appearances'))];
            default:
                return [rank, owner, whole(metric)];
        }
    }

    function replaceHeaders(table, headers) {
        var row = document.createElement('tr');
        headers.forEach(function(header) {
            var cell = document.createElement('th');
            cell.textContent = header;
            row.appendChild(cell);
        });
        table.querySelector('thead').replaceChildren(row);
    }

    function renderRows(table, rows, contract) {
        var body = table.querySelector('tbody');
        var fragment = document.createDocumentFragment();
        rows.forEach(function(row) {
            var tableRow = document.createElement('tr');
            rowValues(row, contract).forEach(function(value) {
                var cell = document.createElement('td');
                cell.textContent = value;
                tableRow.appendChild(cell);
            });
            fragment.appendChild(tableRow);
        });
        body.replaceChildren(fragment);
    }

    function renderState(table, columnCount, message, stateClass) {
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.colSpan = columnCount;
        cell.className = stateClass;
        cell.textContent = message;
        row.appendChild(cell);
        table.querySelector('tbody').replaceChildren(row);
    }

    function selectionFor(panel) {
        var dropdown = document.querySelector('.' + panel.dropdownClass);
        var category = dropdown.value;
        var contract = categoryContracts[category];
        var activeControl = document.querySelector('.' + panel.controlClass + ' input[id$="-active"]');
        var scope = contract.scope || 'combined';

        if (contract.scoped) {
            if (document.getElementById('season-regular').checked) {
                scope = 'regular';
            } else if (document.getElementById('season-post').checked) {
                scope = 'postseason';
            }
        }

        return {
            category: category,
            contract: contract,
            activeOnly: Boolean(activeControl && activeControl.checked),
            scope: scope
        };
    }

    function setPanelDisabled(panel, disabled) {
        document.querySelector('.' + panel.dropdownClass).disabled = disabled;
        document.querySelectorAll('.' + panel.controlClass + ' input').forEach(function(control) {
            control.disabled = disabled;
        });
    }

    async function loadPanel(panel) {
        var selection = selectionFor(panel);
        var table = document.querySelector('.' + panel.tableClass);
        var requestId = (requestSequence[panel.tableClass] || 0) + 1;
        requestSequence[panel.tableClass] = requestId;

        replaceHeaders(table, selection.contract.headers);
        renderState(table, selection.contract.headers.length, 'Loading records...', 'table-status table-loading');
        setPanelDisabled(panel, true);

        try {
            var client = window.fs5Supabase.getClient();
            var result = await client.rpc('site_all_time_records', {
                p_record_category: selection.category,
                p_active_only: selection.activeOnly,
                p_scope: selection.scope,
                p_limit: REQUEST_LIMIT
            });

            if (requestId !== requestSequence[panel.tableClass]) {
                return;
            }
            if (result.error) {
                throw result.error;
            }

            var rows = Array.isArray(result.data) ? result.data : [];
            if (rows.length === 0) {
                renderState(table, selection.contract.headers.length, 'No records found for this selection.', 'table-status table-empty');
            } else {
                renderRows(table, rows, selection.contract);
            }
        } catch (error) {
            if (requestId !== requestSequence[panel.tableClass]) {
                return;
            }
            console.error('All-Time Records Supabase request failed.', {
                recordCategory: selection.category,
                activeOnly: selection.activeOnly,
                scope: selection.scope,
                error: error
            });
            renderState(table, selection.contract.headers.length, 'Records are temporarily unavailable. Please try again.', 'table-status table-error');
        } finally {
            if (requestId === requestSequence[panel.tableClass]) {
                setPanelDisabled(panel, false);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        panels.forEach(function(panel) {
            var dropdown = document.querySelector('.' + panel.dropdownClass);
            dropdown.addEventListener('change', function() {
                loadPanel(panel);
            });
            document.querySelectorAll('.' + panel.controlClass + ' input').forEach(function(control) {
                control.addEventListener('change', function() {
                    loadPanel(panel);
                });
            });
            loadPanel(panel);
        });
    });
})();
