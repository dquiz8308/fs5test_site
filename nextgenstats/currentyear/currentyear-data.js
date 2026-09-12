(function() {
    'use strict';

    var CURRENT_YEAR = 2026;
    var requestSequence = {};

    var panels = [
        {
            key: 'single-game',
            tableClass: 'single-game-table',
            dropdownClass: 'single-game-dropdown'
        },
        {
            key: 'position-totals',
            tableClass: 'position-totals-table',
            dropdownClass: 'position-totals-dropdown',
            hasScope: true
        },
        {
            key: 'highest-position',
            tableClass: 'highest-position-table',
            dropdownClass: 'highest-position-dropdown'
        },
        {
            key: 'nonpoint',
            tableClass: 'nonpoint-table',
            dropdownClass: 'nonpoint-dropdown'
        }
    ];

    var contracts = {
        'high-score': { rpc: 'high-score', headers: ['Rank', 'Score', 'Owner', 'Week'], type: 'owner-points', limit: 10 },
        'low-score': { rpc: 'low-score', headers: ['Rank', 'Score', 'Owner', 'Week'], type: 'owner-points', limit: 10 },
        'high-margin': { rpc: 'high-margin', headers: ['Rank', 'Margin', 'Owner', 'Week', 'Detail'], type: 'owner-game', limit: 10 },
        'low-margin': { rpc: 'low-margin', headers: ['Rank', 'Margin', 'Owner', 'Week', 'Detail'], type: 'owner-game', limit: 10 },
        'least-win': { rpc: 'least-win', headers: ['Rank', 'Score', 'Owner', 'Week', 'Detail'], type: 'owner-game', limit: 10 },
        'most-lose': { rpc: 'most-lose', headers: ['Rank', 'Score', 'Owner', 'Week', 'Detail'], type: 'owner-game', limit: 10 },
        'high-comb': { rpc: 'high-comb', headers: ['Rank', 'Combined', 'Week', 'Detail'], type: 'combined-game', limit: 10 },
        'low-comb': { rpc: 'low-comb', headers: ['Rank', 'Combined', 'Week', 'Detail'], type: 'combined-game', limit: 10 },
        'high-bench': { rpc: 'high-bench', headers: ['Rank', 'Bench', 'Owner', 'Week'], type: 'owner-points', limit: 10 },
        'high-tds': { rpc: 'high-tds', headers: ['Rank', 'Owner', 'TDs', 'Week'], type: 'single-count', limit: 12 },

        'total-qb': { rpc: 'total-qb', headers: ['Rank', 'Total QB', 'Owner'], type: 'total-points', limit: 12, scoped: true },
        'total-rb': { rpc: 'total-rb', headers: ['Rank', 'Total RB', 'Owner'], type: 'total-points', limit: 12, scoped: true },
        'total-wr': { rpc: 'total-wr', headers: ['Rank', 'Total WR', 'Owner'], type: 'total-points', limit: 12, scoped: true },
        'total-te': { rpc: 'total-te', headers: ['Rank', 'Total TE', 'Owner'], type: 'total-points', limit: 12, scoped: true },
        'total-k': { rpc: 'total-k', headers: ['Rank', 'Total K', 'Owner'], type: 'total-points', limit: 12, scoped: true },
        'total-def': { rpc: 'total-def', headers: ['Rank', 'Total DEF', 'Owner'], type: 'total-points', limit: 12, scoped: true },
        'bench': { rpc: 'total-bench', headers: ['Rank', 'Total Bench', 'Owner'], type: 'total-points', limit: 12, scoped: true },
        'tds': { rpc: 'total-tds', headers: ['Rank', 'Owner', 'Total TDs'], type: 'total-count', limit: 12, scoped: true },
        'mnf': { rpc: 'total-mnf', headers: ['Rank', 'Total MNF', 'Owner'], type: 'total-points', limit: 12, combinedOnly: true },
        'tnf': { rpc: 'total-tnf', headers: ['Rank', 'Total TNF', 'Owner'], type: 'total-points', limit: 12, combinedOnly: true },

        'high-all': { rpc: 'all-high', headers: ['Rank', 'Score', 'Owner', 'Week', 'Player'], type: 'highest-points', limit: 10 },
        'high-qb': { rpc: 'qb-high', headers: ['Rank', 'Score', 'Owner', 'Week', 'Player'], type: 'highest-points', limit: 10 },
        'high-rb': { rpc: 'rb-high', headers: ['Rank', 'Score', 'Owner', 'Week', 'Player'], type: 'highest-points', limit: 10 },
        'high-wr': { rpc: 'wr-high', headers: ['Rank', 'Score', 'Owner', 'Week', 'Player'], type: 'highest-points', limit: 10 },
        'high-te': { rpc: 'te-high', headers: ['Rank', 'Score', 'Owner', 'Week', 'Player'], type: 'highest-points', limit: 10 },
        'high-k': { rpc: 'k-high', headers: ['Rank', 'Score', 'Owner', 'Week', 'Player'], type: 'highest-points', limit: 10 },
        'high-def': { rpc: 'def-high', headers: ['Rank', 'Score', 'Owner', 'Week', 'Player'], type: 'highest-points', limit: 10 },

        '1rank': { rpc: 'rank1', headers: ['Rank', 'Owner', '# of Weeks'], type: 'nonpoint', limit: 12 },
        'top-team': { rpc: 'top-team', headers: ['Rank', 'Owner', '# of Weeks'], type: 'nonpoint', limit: 12 },
        'bottom-team': { rpc: 'bottom-team', headers: ['Rank', 'Owner', '# of Weeks'], type: 'nonpoint', limit: 12 },
        'close-games': { rpc: 'close-games', headers: ['Rank', 'Owner', '# of Games'], type: 'nonpoint', limit: 12 },
        'coaching-calls': { rpc: 'coaching-call', headers: ['Rank', 'Owner', '# of Games'], type: 'nonpoint', limit: 12 }
    };

    function missing(value) {
        return value === null || value === undefined || value === '';
    }

    function text(value) {
        return missing(value) ? '—' : String(value);
    }

    function points(value) {
        var number = Number(value);
        return missing(value) || !Number.isFinite(number) ? '—' : number.toFixed(2);
    }

    function whole(value) {
        var number = Number(value);
        return missing(value) || !Number.isFinite(number) ? '—' : String(Math.trunc(number));
    }

    function gameDetail(row) {
        return text(row.owner_name) + ' ' + points(row.owner_score) + ' - ' +
            points(row.opponent_score) + ' ' + text(row.opponent_name);
    }

    function combinedDetail(row) {
        return text(row.first_owner_name) + ' ' + points(row.first_score) + ' - ' +
            points(row.second_score) + ' ' + text(row.second_owner_name);
    }

    function rpcRowValues(row, contract) {
        var rank = text(row.display_rank);
        switch (contract.type) {
            case 'owner-points':
                return [rank, points(row.metric_value), text(row.owner_name), text(row.week_number)];
            case 'owner-game':
                return [rank, points(row.metric_value), text(row.owner_name), text(row.week_number), gameDetail(row)];
            case 'combined-game':
                return [rank, points(row.metric_value), text(row.week_number), combinedDetail(row)];
            case 'single-count':
                return [rank, text(row.owner_name), whole(row.metric_value), text(row.week_number)];
            case 'total-points':
                return [rank, points(row.metric_value), text(row.owner_name)];
            case 'total-count':
            case 'nonpoint':
                return [rank, text(row.owner_name), whole(row.metric_value)];
            case 'highest-points':
                return [rank, points(row.metric_value), text(row.owner_name), text(row.week_number), text(row.player_name)];
            default:
                return [];
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

    function renderRows(table, rows) {
        var fragment = document.createDocumentFragment();
        rows.forEach(function(values) {
            var row = document.createElement('tr');
            values.forEach(function(value) {
                var cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            fragment.appendChild(row);
        });
        table.querySelector('tbody').replaceChildren(fragment);
    }

    function renderState(table, columnCount, message, stateClass) {
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.colSpan = columnCount;
        cell.className = 'table-status ' + stateClass;
        cell.textContent = message;
        row.appendChild(cell);
        table.querySelector('tbody').replaceChildren(row);
    }

    function selectedScope(contract) {
        if (contract.combinedOnly) {
            return 'combined';
        }
        if (document.getElementById('position-reg').checked) {
            return 'regular';
        }
        if (document.getElementById('position-post').checked) {
            return 'postseason';
        }
        return 'combined';
    }

    function selectionFor(panel) {
        var browserCategory = document.querySelector('.' + panel.dropdownClass).value;
        var contract = contracts[browserCategory];
        return {
            browserCategory: browserCategory,
            rpcCategory: contract.rpc,
            contract: contract,
            scope: panel.hasScope ? selectedScope(contract) : 'combined'
        };
    }

    function setPanelDisabled(panel, disabled) {
        document.querySelector('.' + panel.dropdownClass).disabled = disabled;
        if (panel.hasScope) {
            updateScopeControls(disabled);
        }
    }

    function updateScopeControls(requestPending) {
        var dropdown = document.querySelector('.position-totals-dropdown');
        var contract = contracts[dropdown.value];
        var inputs = document.querySelectorAll('.checkbox-position input');
        var combinedOnly = Boolean(contract.combinedOnly);

        if (combinedOnly) {
            document.getElementById('position-comb').checked = true;
            document.getElementById('position-reg').checked = false;
            document.getElementById('position-post').checked = false;
        }

        inputs.forEach(function(input) {
            input.disabled = Boolean(requestPending || combinedOnly);
        });
        document.querySelector('.checkbox-position').setAttribute(
            'aria-disabled',
            requestPending || combinedOnly ? 'true' : 'false'
        );
    }

    async function fetchSupabase(selection) {
        if (!window.fs5Supabase) {
            throw new Error('The shared Supabase configuration did not load.');
        }
        var response = await window.fs5Supabase.getClient().rpc('site_current_year_records', {
            p_year: CURRENT_YEAR,
            p_record_category: selection.rpcCategory,
            p_scope: selection.scope,
            p_limit: selection.contract.limit
        });
        if (response.error) {
            throw response.error;
        }
        return Array.isArray(response.data) ? response.data : [];
    }

    async function loadPanel(panel) {
        var selection = selectionFor(panel);
        var table = document.querySelector('.' + panel.tableClass);
        var requestId = (requestSequence[panel.key] || 0) + 1;
        requestSequence[panel.key] = requestId;

        replaceHeaders(table, selection.contract.headers);
        renderState(
            table,
            selection.contract.headers.length,
            'Loading records...',
            'table-loading'
        );
        setPanelDisabled(panel, true);

        try {
            var rawRows = await fetchSupabase(selection);

            if (requestId !== requestSequence[panel.key]) {
                return;
            }
            if (!rawRows.length) {
                renderState(
                    table,
                    selection.contract.headers.length,
                    '2026 Records will begin here after the season starts.',
                    'table-empty'
                );
                return;
            }

            renderRows(
                table,
                rawRows.map(function(row) { return rpcRowValues(row, selection.contract); })
            );
            adjustColumnWidths(panel.tableClass, panel.dropdownClass);
        } catch (error) {
            if (requestId !== requestSequence[panel.key]) {
                return;
            }
            console.error('Current Year records request failed.', {
                panel: panel.key,
                year: CURRENT_YEAR,
                recordCategory: selection.rpcCategory,
                browserCategory: selection.browserCategory,
                scope: selection.scope,
                limit: selection.contract.limit,
                error: error
            });
            renderState(
                table,
                selection.contract.headers.length,
                'Records are temporarily unavailable. Please try again.',
                'table-error'
            );
        } finally {
            if (requestId === requestSequence[panel.key]) {
                setPanelDisabled(panel, false);
            }
        }
    }

    function adjustColumnWidths(tableClass, dropdownClass) {
        var widthsByCategory = {
            'high-score': ['10%', '30%', '30%', '30%'],
            'low-score': ['10%', '30%', '30%', '30%'],
            'high-margin': ['9%', '13%', '13%', '13%', '52%'],
            'low-margin': ['9%', '13%', '13%', '13%', '52%'],
            'least-win': ['9%', '13%', '13%', '13%', '52%'],
            'most-lose': ['9%', '13%', '13%', '13%', '52%'],
            'high-comb': ['8%', '20%', '20%', '52%'],
            'low-comb': ['8%', '20%', '20%', '52%']
        };
        var table = document.querySelector('.' + tableClass);
        var category = document.querySelector('.' + dropdownClass).value;
        var widths = widthsByCategory[category];
        table.querySelectorAll('tr').forEach(function(row) {
            Array.from(row.children).forEach(function(cell, index) {
                cell.style.width = widths && widths[index] ? widths[index] : '';
            });
        });
    }

    function setupScopeControls(positionPanel) {
        var inputs = document.querySelectorAll('.checkbox-position input');
        document.getElementById('position-comb').checked = true;
        inputs.forEach(function(input) {
            input.addEventListener('change', function() {
                if (!input.checked) {
                    input.checked = true;
                    return;
                }
                inputs.forEach(function(other) {
                    other.checked = other === input;
                });
                loadPanel(positionPanel);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        var positionPanel = panels.filter(function(panel) {
            return panel.key === 'position-totals';
        })[0];

        setupScopeControls(positionPanel);
        updateScopeControls(false);

        panels.forEach(function(panel) {
            document.querySelector('.' + panel.dropdownClass).addEventListener('change', function() {
                if (panel.hasScope) {
                    document.getElementById('position-comb').checked = true;
                    document.getElementById('position-reg').checked = false;
                    document.getElementById('position-post').checked = false;
                    updateScopeControls(false);
                }
                loadPanel(panel);
            });
        });

        panels.forEach(loadPanel);
    });
})();
