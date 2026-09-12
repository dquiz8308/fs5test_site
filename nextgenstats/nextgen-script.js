(function() {
    'use strict';

    var EXPECTED_OWNER_COUNT = 12;
    var tableBody = document.querySelector('.summary-table tbody');
    var sortButtons = Array.from(document.querySelectorAll('.sort-button'));
    var mostWinsElement = document.getElementById('snapshot-most-wins');
    var bestWinPctElement = document.getElementById('snapshot-best-win-pct');
    var rows = [];
    var activeSortKey = null;
    var activeSortDirection = null;

    function setSortEnabled(enabled) {
        sortButtons.forEach(function(button) {
            button.disabled = !enabled;
        });
    }

    function resetSortState() {
        activeSortKey = null;
        activeSortDirection = null;
        sortButtons.forEach(function(button) {
            button.closest('th').setAttribute('aria-sort', 'none');
        });
    }

    function renderState(message, className) {
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.colSpan = 4;
        cell.className = className || 'summary-state';
        cell.textContent = message;
        row.appendChild(cell);
        tableBody.replaceChildren(row);
    }

    function renderRows(dataRows) {
        var fragment = document.createDocumentFragment();
        dataRows.forEach(function(owner) {
            var row = document.createElement('tr');
            [owner.owner_name, owner.wins, owner.losses, owner.ties].forEach(function(value) {
                var cell = document.createElement('td');
                cell.textContent = String(value);
                row.appendChild(cell);
            });
            fragment.appendChild(row);
        });
        tableBody.replaceChildren(fragment);
    }

    function resetSnapshot() {
        mostWinsElement.textContent = '—';
        bestWinPctElement.textContent = '—';
    }

    function renderSnapshot(dataRows) {
        var mostWins = dataRows.reduce(function(best, owner) {
            if (owner.wins !== best.wins) {
                return owner.wins > best.wins ? owner : best;
            }
            return owner.display_order < best.display_order ? owner : best;
        });

        var bestWinPct = dataRows.reduce(function(best, owner) {
            var games = owner.wins + owner.losses + owner.ties;
            var percentage = games === 0 ? 0 : (owner.wins + (owner.ties * 0.5)) / games;

            if (percentage !== best.percentage) {
                return percentage > best.percentage ? { owner: owner, percentage: percentage } : best;
            }
            return owner.display_order < best.owner.display_order
                ? { owner: owner, percentage: percentage }
                : best;
        }, { owner: dataRows[0], percentage: -1 });

        mostWinsElement.replaceChildren(
            document.createTextNode(mostWins.owner_name + ' '),
            createSnapshotValue(String(mostWins.wins))
        );
        bestWinPctElement.replaceChildren(
            document.createTextNode(bestWinPct.owner.owner_name + ' '),
            createSnapshotValue(bestWinPct.percentage.toFixed(3).replace(/^0/, ''))
        );
    }

    function createSnapshotValue(value) {
        var span = document.createElement('span');
        span.className = 'snapshot-value';
        span.textContent = value;
        return span;
    }

    function validateRows(data) {
        if (!Array.isArray(data) || data.length !== EXPECTED_OWNER_COUNT) {
            throw new Error('Expected exactly 12 current-owner rows.');
        }

        var ownerIds = new Set();
        var ownerNames = new Set();
        var displayOrders = new Set();

        data.forEach(function(row) {
            if (
                row.owner_id === null ||
                typeof row.owner_name !== 'string' ||
                row.owner_name.trim() === '' ||
                !Number.isInteger(row.display_order) ||
                !Number.isInteger(row.wins) ||
                !Number.isInteger(row.losses) ||
                !Number.isInteger(row.ties)
            ) {
                throw new Error('The Quick Summary response contains an invalid row.');
            }

            ownerIds.add(String(row.owner_id));
            ownerNames.add(row.owner_name);
            displayOrders.add(row.display_order);
        });

        if (
            ownerIds.size !== EXPECTED_OWNER_COUNT ||
            ownerNames.size !== EXPECTED_OWNER_COUNT ||
            displayOrders.size !== EXPECTED_OWNER_COUNT
        ) {
            throw new Error('The Quick Summary response contains duplicate owners or display-order values.');
        }
    }

    function sortRows(sortKey) {
        var direction = activeSortKey === sortKey && activeSortDirection === 'ascending'
            ? 'descending'
            : 'ascending';

        activeSortKey = sortKey;
        activeSortDirection = direction;

        sortButtons.forEach(function(button) {
            var header = button.closest('th');
            header.setAttribute(
                'aria-sort',
                button.dataset.sortKey === sortKey ? direction : 'none'
            );
        });

        rows.sort(function(first, second) {
            var difference = first[sortKey] - second[sortKey];
            if (difference === 0) {
                return first.display_order - second.display_order;
            }
            return direction === 'ascending' ? difference : -difference;
        });

        renderRows(rows);
    }

    async function loadSummary() {
        setSortEnabled(false);
        resetSortState();
        resetSnapshot();
        renderState('Loading Quick Summary…', 'summary-state');

        try {
            var client = window.fs5Supabase.getClient();
            var result = await client.rpc('site_nextgenstats_summary');

            if (result.error) {
                throw result.error;
            }
            if (!result.data || result.data.length === 0) {
                renderState('No Quick Summary records are available.', 'summary-state');
                return;
            }

            validateRows(result.data);
            rows = result.data.slice().sort(function(first, second) {
                return first.display_order - second.display_order;
            });
            renderRows(rows);
            renderSnapshot(rows);
            setSortEnabled(true);
        } catch (error) {
            console.error('NextGenStats Quick Summary request failed.', {
                rpc: 'site_nextgenstats_summary',
                error: error
            });
            renderState('Quick Summary is temporarily unavailable. Please try again.', 'summary-state summary-error');
        }
    }

    sortButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            sortRows(button.dataset.sortKey);
        });
    });

    loadSummary();
})();
