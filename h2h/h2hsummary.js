document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var ownerIds = { Bailey: 6, Brycen: 1, Chris: 5, Cody: 11, David: 3, Ethan: 9, Jordan: 4, Keith: 8, Matthew: 10, Max: 12, Mike: 7, Will: 2 };
    var owner1Dropdown = document.getElementById('owner1-dropdown');
    var owner2Dropdown = document.getElementById('owner2-dropdown');
    var swapButton = document.getElementById('swap-owners');
    var owner1Header = document.getElementById('owner1-header');
    var owner2Header = document.getElementById('owner2-header');
    var tableBody = document.querySelector('#matchup-table tbody');
    var matchupCards = document.getElementById('matchup-cards');
    var dataStatus = document.getElementById('h2h-data-status');
    var results = document.getElementById('h2h-results');
    var summaryContainer = document.querySelector('.summary-container');
    var matchupTable = document.getElementById('matchup-table');
    var gameLogControls = document.querySelector('.game-log-controls');
    var gameLogToggle = document.getElementById('game-log-toggle');
    var matchupMeta = document.getElementById('matchup-meta');
    var tieRow = document.getElementById('tie-row');
    var tieCount = document.getElementById('tie-count');
    var requestSequence = 0;
    var currentGameLog = [];
    var gameLogExpanded = false;
    var visibleGameLimit = 10;

    owner1Dropdown.addEventListener('change', updateH2HPage);
    owner2Dropdown.addEventListener('change', updateH2HPage);
    swapButton.addEventListener('click', swapOwners);
    gameLogToggle.addEventListener('click', toggleGameLog);
    clearResults();
    showStatus('Select two owners to view their head-to-head records.', '');

    function swapOwners() {
        var firstOwner = owner1Dropdown.value;
        owner1Dropdown.value = owner2Dropdown.value;
        owner2Dropdown.value = firstOwner;
        updateH2HPage();
        owner1Dropdown.focus();
    }

    async function updateH2HPage() {
        var primaryOwnerName = owner1Dropdown.value;
        var secondaryOwnerName = owner2Dropdown.value;
        var primaryOwnerId = ownerIds[primaryOwnerName];
        var secondaryOwnerId = ownerIds[secondaryOwnerName];
        var requestId = ++requestSequence;
        clearResults();

        if (!primaryOwnerId || !secondaryOwnerId) {
            showStatus('Select two owners to view their head-to-head records.', '');
            return;
        }
        updateOwnerLabels(primaryOwnerName, secondaryOwnerName);
        if (primaryOwnerId === secondaryOwnerId) {
            showStatus('Please select two different owners.', 'is-empty');
            return;
        }

        setBusy(true);
        showStatus('Loading head-to-head records...', 'is-loading');
        try {
            var responseData = await fetchH2HData(primaryOwnerId, secondaryOwnerId);
            if (requestId !== requestSequence) return;
            if (!responseData) {
                showStatus('No head-to-head records were found for this matchup.', 'is-empty');
                return;
            }
            renderSummary(responseData);
            renderGameLog(responseData.game_log, primaryOwnerName, secondaryOwnerName);
            results.hidden = false;
            hideStatus();
        } catch (error) {
            if (requestId !== requestSequence) return;
            clearResults();
            updateOwnerLabels(primaryOwnerName, secondaryOwnerName);
            showStatus('Head-to-head records could not be loaded. Please try again or refresh the page.', 'is-error');
            console.error('H2H Supabase request failed.', { primaryOwner: primaryOwnerName, primaryOwnerId: primaryOwnerId, secondaryOwner: secondaryOwnerName, secondaryOwnerId: secondaryOwnerId, error: error });
        } finally {
            if (requestId === requestSequence) setBusy(false);
        }
    }

    async function fetchH2HData(primaryOwnerId, secondaryOwnerId) {
        if (!window.fs5Supabase) throw new Error('The shared Supabase configuration did not load.');
        var response = await window.fs5Supabase.getClient().rpc('site_h2h_page', { p_primary_owner_id: primaryOwnerId, p_secondary_owner_id: secondaryOwnerId });
        if (response.error) throw response.error;
        if (Array.isArray(response.data)) return response.data.length ? response.data[0] : null;
        return response.data || null;
    }

    function renderSummary(data) {
        renderOwnerSummary(data.primary_owner, 'owner1');
        renderOwnerSummary(data.secondary_owner, 'owner2');
        renderCombinedGame(data.highest_combined_game, 'high');
        renderCombinedGame(data.lowest_combined_game, 'low');
        colorizeSummary();
    }

    function renderOwnerSummary(owner, suffix) {
        owner = owner || {};
        setText('wins-' + suffix, formatWholeNumber(owner.wins));
        setText('postwins-' + suffix, formatWholeNumber(owner.postseason_wins));
        setText('cstreak-' + suffix, formatWholeNumber(owner.current_win_streak));
        setText('long-streak-' + suffix, formatWholeNumber(owner.longest_win_streak));
        setText('total-points-' + suffix, formatPoints(owner.total_points));
        setText('avg-points-' + suffix, formatPoints(owner.average_points));
        renderRankedValue(owner.highest_score, 'highscore-' + suffix, 'highscore-rank-' + suffix);
        renderRankedValue(owner.lowest_score, 'lowscore-' + suffix, 'lowscore-rank-' + suffix);
        renderRankedValue(owner.biggest_win_margin, 'highmargin-' + suffix, 'highmargin-rank-' + suffix);
        renderRankedValue(owner.closest_win_margin, 'lowmargin-' + suffix, 'lowmargin-rank-' + suffix);
    }

    function renderRankedValue(record, valueClass, rankClass) {
        record = record || {};
        setText(valueClass, formatPoints(record.value));
        setText(rankClass, formatPublishedRank(record));
    }

    function renderCombinedGame(game, prefix) {
        var headline = '';
        var result = '';
        var firstScore;
        var secondScore;

        if (game && game.combined_score !== null && game.combined_score !== undefined) {
            headline = formatPoints(game.combined_score) + ' — ' + displayValue(game.year) + ' ' + formatWeek(game.week_number);
            if (game.is_tie) {
                firstScore = game.primary_score;
                secondScore = game.secondary_score;
                result = displayValue(game.primary_owner_name) + ' tied ' + displayValue(game.secondary_owner_name) + ', ' +
                    formatPoints(firstScore) + '–' + formatPoints(secondScore);
            } else {
                firstScore = game.winner_score;
                secondScore = game.loser_score;
                result = displayValue(game.winner_owner_name) + ' defeated ' + displayValue(game.loser_owner_name) + ', ' +
                    formatPoints(firstScore) + '–' + formatPoints(secondScore);
            }
        }

        setText(prefix + '-combined-headline', headline);
        setText(prefix + '-combined-result', result);
        setText(prefix + '-combined-rank-owner1', formatPublishedRank(game, 'is_rank_tied').replace('League rank:', 'League Rank:'));
    }

    function renderGameLog(gameLog, primaryOwnerName, secondaryOwnerName) {
        currentGameLog = Array.isArray(gameLog) ? gameLog : [];
        gameLogExpanded = false;
        updateOwnerLabels(primaryOwnerName, secondaryOwnerName);
        var ties = currentGameLog.filter(function(game) { return game.primary_result === 'TIE' || Number(game.primary_score) === Number(game.secondary_score); }).length;
        tieCount.textContent = String(ties);
        tieRow.hidden = ties === 0;
        matchupMeta.textContent = currentGameLog.length + (currentGameLog.length === 1 ? ' total meeting' : ' total meetings') + ' · Newest first';
        renderVisibleGames();
    }

    function renderVisibleGames() {
        var visibleGames = gameLogExpanded ? currentGameLog : currentGameLog.slice(0, visibleGameLimit);
        tableBody.innerHTML = '';
        matchupCards.innerHTML = '';
        visibleGames.forEach(function(game) {
            tableBody.appendChild(createTableRow(game));
            matchupCards.appendChild(createMatchupCard(game));
        });
        gameLogControls.hidden = currentGameLog.length <= visibleGameLimit;
        gameLogToggle.textContent = gameLogExpanded ? 'Show Less' : 'View All ' + currentGameLog.length + ' Games';
        gameLogToggle.setAttribute('aria-expanded', String(gameLogExpanded));
    }

    function createTableRow(game) {
        var row = document.createElement('tr');
        appendCell(row, game.year);
        appendCell(row, formatWeek(game.week_number));
        var primaryScoreCell = appendCell(row, formatPoints(game.primary_score));
        var secondaryScoreCell = appendCell(row, formatPoints(game.secondary_score));
        appendCell(row, formatPoints(game.primary_margin));
        var hasNote = game.notes !== null && game.notes !== undefined && game.notes !== '';
        var noteCell = appendCell(row, hasNote ? game.notes : '-');
        if (!hasNote) noteCell.classList.add('is-empty-note');
        applyResultClasses(primaryScoreCell, secondaryScoreCell, game);
        return row;
    }

    function createMatchupCard(game) {
        var card = document.createElement('article');
        card.className = 'matchup-card';
        var meta = document.createElement('div');
        meta.className = 'matchup-card__meta';
        appendSpan(meta, displayValue(game.year));
        appendSpan(meta, formatWeek(game.week_number));
        var scores = document.createElement('div');
        scores.className = 'matchup-card__scores';
        var primary = createMobileOwner(owner1Dropdown.value, game.primary_score);
        var margin = document.createElement('div');
        margin.className = 'matchup-card__margin';
        margin.textContent = 'Margin\n' + formatPoints(game.primary_margin);
        var secondary = createMobileOwner(owner2Dropdown.value, game.secondary_score);
        applyResultClasses(primary, secondary, game);
        scores.appendChild(primary); scores.appendChild(margin); scores.appendChild(secondary);
        var note = document.createElement('p');
        note.className = 'matchup-card__note';
        var hasNote = game.notes !== null && game.notes !== undefined && game.notes !== '';
        note.textContent = hasNote ? game.notes : '-';
        if (!hasNote) note.classList.add('is-empty-note');
        card.appendChild(meta); card.appendChild(scores); card.appendChild(note);
        return card;
    }

    function createMobileOwner(name, score) {
        var owner = document.createElement('div');
        owner.className = 'matchup-card__owner';
        var label = document.createElement('strong'); label.textContent = name;
        var value = document.createElement('span'); value.textContent = formatPoints(score);
        owner.appendChild(label); owner.appendChild(value);
        return owner;
    }

    function toggleGameLog() {
        gameLogExpanded = !gameLogExpanded;
        renderVisibleGames();
    }

    function colorizeSummary() {
        var pairs = [
            ['wins-owner1', 'wins-owner2', false], ['postwins-owner1', 'postwins-owner2', false],
            ['cstreak-owner1', 'cstreak-owner2', false], ['long-streak-owner1', 'long-streak-owner2', false],
            ['total-points-owner1', 'total-points-owner2', false], ['avg-points-owner1', 'avg-points-owner2', false],
            ['highscore-owner1', 'highscore-owner2', false], ['lowscore-owner1', 'lowscore-owner2', false],
            ['highmargin-owner1', 'highmargin-owner2', false], ['lowmargin-owner1', 'lowmargin-owner2', true]
        ];
        pairs.forEach(function(pair) {
            var firstValue = document.querySelector('.' + pair[0]);
            var secondValue = document.querySelector('.' + pair[1]);
            var firstTarget = firstValue.closest('.ranked-stat') || firstValue;
            var secondTarget = secondValue.closest('.ranked-stat') || secondValue;
            applyComparison(firstTarget, secondTarget, Number(firstValue.textContent), Number(secondValue.textContent), pair[2]);
        });
    }

    function applyComparison(first, second, firstValue, secondValue, lowerIsBetter) {
        if (!Number.isFinite(firstValue) || !Number.isFinite(secondValue)) return;
        if (firstValue === secondValue) { first.classList.add('stat-value--tie'); second.classList.add('stat-value--tie'); return; }
        var firstIsBetter = lowerIsBetter ? firstValue < secondValue : firstValue > secondValue;
        first.classList.add(firstIsBetter ? 'stat-value--better' : 'stat-value--weaker');
        second.classList.add(firstIsBetter ? 'stat-value--weaker' : 'stat-value--better');
    }

    function applyResultClasses(primary, secondary, game) {
        if (game.primary_score === null || game.primary_score === undefined || game.secondary_score === null || game.secondary_score === undefined) return;
        if (game.primary_result === 'TIE' || Number(game.primary_score) === Number(game.secondary_score)) { primary.classList.add('is-tie'); secondary.classList.add('is-tie'); }
        else if (game.primary_result === 'WIN' || Number(game.primary_score) > Number(game.secondary_score)) { primary.classList.add('is-win'); secondary.classList.add('is-loss'); }
        else { primary.classList.add('is-loss'); secondary.classList.add('is-win'); }
    }

    function appendCell(row, value) { var cell = document.createElement('td'); cell.textContent = displayValue(value); row.appendChild(cell); return cell; }
    function appendSpan(parent, value) { var span = document.createElement('span'); span.textContent = value; parent.appendChild(span); }

    function formatPublishedRank(record, tiedField) {
        if (!record) return '';
        var numericRank = Number(record.numeric_rank);
        var displayRank = record.display_rank;
        var isTied = Boolean(record[tiedField || 'is_tied']);
        if (!Number.isFinite(numericRank) && (displayRank === null || displayRank === undefined || displayRank === '')) return '';
        if (displayRank === null || displayRank === undefined || displayRank === '') displayRank = (isTied ? 'T' : '') + numericRank;
        else {
            displayRank = String(displayRank).replace(/^Rank:\s*/i, '').replace(/(st|nd|rd|th)$/i, '');
            if (isTied && displayRank.charAt(0).toUpperCase() !== 'T') displayRank = 'T' + displayRank;
        }
        return 'League rank: ' + displayRank + getOrdinalSuffix(numericRank);
    }

    function getOrdinalSuffix(value) {
        if (!Number.isFinite(value)) return '';
        var number = Math.abs(Math.trunc(value));
        if (number % 100 >= 11 && number % 100 <= 13) return 'th';
        if (number % 10 === 1) return 'st';
        if (number % 10 === 2) return 'nd';
        if (number % 10 === 3) return 'rd';
        return 'th';
    }

    function formatPoints(value) { if (value === null || value === undefined || value === '') return ''; var number = Number(value); return Number.isFinite(number) ? number.toFixed(2) : displayValue(value); }
    function formatWholeNumber(value) { if (value === null || value === undefined || value === '') return ''; var number = Number(value); return Number.isFinite(number) ? String(Math.trunc(number)) : displayValue(value); }
    function formatWeek(value) { return value === null || value === undefined || value === '' ? '' : 'Week ' + value; }
    function displayValue(value) { return value === null || value === undefined ? '' : String(value); }
    function setText(className, value) { var element = document.querySelector('.' + className); if (element) element.textContent = displayValue(value); }

    function clearResults() {
        document.querySelectorAll('.stat-value--better, .stat-value--weaker, .stat-value--tie').forEach(function(element) { element.classList.remove('stat-value--better', 'stat-value--weaker', 'stat-value--tie'); });
        currentGameLog = [];
        gameLogExpanded = false;
        tableBody.innerHTML = '';
        matchupCards.innerHTML = '';
        matchupMeta.textContent = '';
        tieRow.hidden = true;
        gameLogControls.hidden = true;
        results.hidden = true;
        updateOwnerLabels('Owner 1', 'Owner 2');
        setBusy(false);
    }

    function updateOwnerLabels(primary, secondary) {
        owner1Header.textContent = primary;
        owner2Header.textContent = secondary;
        document.querySelector('.summary-owner1').textContent = primary;
        document.querySelector('.summary-owner2').textContent = secondary;
    }
    function setBusy(isBusy) { summaryContainer.setAttribute('aria-busy', String(isBusy)); matchupTable.setAttribute('aria-busy', String(isBusy)); matchupCards.setAttribute('aria-busy', String(isBusy)); swapButton.disabled = isBusy; }
    function showStatus(message, stateClass) { dataStatus.textContent = message; dataStatus.className = 'h2h-data-status' + (stateClass ? ' ' + stateClass : ''); dataStatus.hidden = false; }
    function hideStatus() { dataStatus.textContent = ''; dataStatus.className = 'h2h-data-status'; dataStatus.hidden = true; }
});
