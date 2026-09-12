document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var dropdown1 = document.getElementById('dropdown1');
    var dropdown2 = document.getElementById('dropdown2');
    var dropdown3 = document.getElementById('dropdown3');
    var dropdown4 = document.getElementById('dropdown4');
    var dropdown5 = document.getElementById('dropdown5');
    var table = document.getElementById('game-table');
    var tbody = table.getElementsByTagName('tbody')[0];
    var dataStatus = document.getElementById('data-status');
    var requestSequence = 0;

    var ownerScoreCategories = [
        'highest-team-score',
        'lowest-team-score',
        'highest-bench'
    ];

    var ownerScorePairCategories = [
        'biggest-blowouts',
        'closest-wins',
        'least-winning',
        'most-losing'
    ];

    var combinedScoreCategories = [
        'highest-scoring-game',
        'lowest-scoring-game'
    ];

    var playoffGameCodes = {
        'playoff-qf': 'PQF',
        'playoff-sf': 'PSF',
        'championship': 'PO1',
        'third-place': 'PO3',
        'fifth-place': 'PO5'
    };

    var consolationGameCodes = {
        'consolation-qf': 'CQF',
        'consolation-sf': 'CSF',
        'consolation-champ': 'CO7',
        'ninth-place': 'CO9',
        'last-place': 'CO11'
    };

    [dropdown1, dropdown2, dropdown3, dropdown4, dropdown5].forEach(function(dropdown) {
        dropdown.addEventListener('change', updateGameTable);
    });

    function getSelection() {
        var scope = dropdown2.value;
        var gameCode = null;

        if (dropdown2.value === 'post-season-only') {
            if (dropdown3.value === 'all-post-season') {
                scope = 'post-season-only';
            } else if (dropdown3.value === 'playoffs-only') {
                scope = 'playoffs-only';
                gameCode = playoffGameCodes[dropdown4.value] || null;
            } else if (dropdown3.value === 'consolation-only') {
                scope = 'consolation-only';
                gameCode = consolationGameCodes[dropdown5.value] || null;
            }
        }

        return {
            category: dropdown1.value,
            scope: scope,
            gameCode: gameCode
        };
    }

    async function updateGameTable() {
        var selection = getSelection();
        var requestId = ++requestSequence;

        if (selection.category === 'blank') {
            clearTable();
            hideStatus();
            return;
        }

        clearTable();
        showStatus('Loading records...', '');

        try {
            var rows = await fetchSupabaseRows(selection);

            if (requestId !== requestSequence) {
                return;
            }

            if (!rows.length) {
                showEmptyState();
                return;
            }

            renderSupabaseRows(rows, selection.category);
            hideStatus();
        } catch (error) {
            if (requestId !== requestSequence) {
                return;
            }

            console.error('Single Game Supabase request failed.', {
                recordCategory: selection.category,
                scope: selection.scope,
                gameCode: selection.gameCode,
                error: error
            });
            showStatus(
                'Records could not be loaded. Please try another filter or refresh the page.',
                'is-error'
            );
        }
    }

    async function fetchSupabaseRows(selection) {
        if (!window.fs5Supabase) {
            throw new Error('The shared Supabase configuration did not load.');
        }

        var client = window.fs5Supabase.getClient();
        var response = await client.rpc('site_single_game_records', {
            p_record_category: selection.category,
            p_scope: selection.scope,
            p_game_code: selection.gameCode,
            p_limit: 20
        });

        if (response.error) {
            throw response.error;
        }

        return Array.isArray(response.data) ? response.data : [];
    }

    function renderSupabaseRows(rows, category) {
        clearTable();

        rows.forEach(function(row) {
            var cells;

            if (ownerScoreCategories.indexOf(category) !== -1) {
                cells = [
                    row.display_rank,
                    formatPoints(row.metric_value),
                    row.owner_name,
                    row.year,
                    formatWeek(row.week_number),
                    row.opponent_name
                ];
            } else if (ownerScorePairCategories.indexOf(category) !== -1) {
                cells = [
                    row.display_rank,
                    formatPoints(row.metric_value),
                    row.owner_name,
                    row.year,
                    formatWeek(row.week_number),
                    row.opponent_name,
                    row.score_display
                ];
            } else if (combinedScoreCategories.indexOf(category) !== -1) {
                cells = [
                    row.display_rank,
                    formatPoints(row.metric_value),
                    row.year,
                    formatWeek(row.week_number),
                    formatCombinedOwners(row),
                    formatCombinedScore(row)
                ];
            } else {
                return;
            }

            appendRow(cells);
        });
    }

    function appendRow(cells) {
        var tr = document.createElement('tr');

        cells.forEach(function(value) {
            var td = document.createElement('td');
            td.textContent = displayValue(value);
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    }

    function formatCombinedOwners(row) {
        var firstOwner = displayValue(row.first_owner_name);
        var secondOwner = displayValue(row.second_owner_name);

        if (!firstOwner || !secondOwner) {
            return '';
        }

        return firstOwner + (
            scoresAreTied(row.first_score, row.second_score) ? ' tied ' : ' over '
        ) + secondOwner;
    }

    function formatCombinedScore(row) {
        if (row.first_score === null || row.first_score === undefined ||
                row.second_score === null || row.second_score === undefined) {
            return '';
        }

        return formatPoints(row.first_score) + ' - ' + formatPoints(row.second_score);
    }

    function scoresAreTied(firstScore, secondScore) {
        if (firstScore === null || firstScore === undefined ||
                secondScore === null || secondScore === undefined) {
            return false;
        }

        return Number(firstScore) === Number(secondScore);
    }

    function formatPoints(value) {
        if (value === null || value === undefined || value === '') {
            return '';
        }

        var number = Number(value);
        return Number.isFinite(number) ? number.toFixed(2) : displayValue(value);
    }

    function formatWeek(value) {
        if (value === null || value === undefined || value === '') {
            return '';
        }

        return 'Week ' + value;
    }

    function displayValue(value) {
        return value === null || value === undefined ? '' : String(value);
    }

    function showEmptyState() {
        clearTable();
        showStatus('No records were found for the selected filters.', '');
    }

    function clearTable() {
        tbody.innerHTML = '';
    }

    function showStatus(message, stateClass) {
        dataStatus.textContent = message;
        dataStatus.className = 'data-status' + (stateClass ? ' ' + stateClass : '');
        dataStatus.hidden = false;
    }

    function hideStatus() {
        dataStatus.textContent = '';
        dataStatus.className = 'data-status';
        dataStatus.hidden = true;
    }
});
