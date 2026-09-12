(function () {
    'use strict';

    const SESSION_KEY = 'fs5bookMemberSession';
    const FUNCTIONS_URL = 'https://aksxwbktytovuvdacypp.supabase.co/functions/v1';
    const FALLBACK_ART = '../artwork/logo.png';
    let token = sessionStorage.getItem(SESSION_KEY) || '';
    let book = null;
    let selectedFuture = null;
    let pending = false;
    const el = id => document.getElementById(id);
    const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value) || 0);
    const shown = value => value === null || value === undefined || value === '' ? '—' : String(value);
    const spread = value => value !== '' && value !== null && value !== undefined && Number(value) > 0 ? `+${value}` : shown(value);
    const americanOdds = value => value !== '' && value !== null && value !== undefined && Number(value) > 0 ? `+${Number(value)}` : shown(value);
    const result = item => shown(item.settlementResult || item.status || 'Pending');
    const gotwResult = item => {
        const value = item.settlementResult || item.status || 'Pending';
        return String(value).toUpperCase() === 'PENDING_APPROVAL' ? 'PENDING' : shown(value);
    };
    const futuresResult = item => {
        const value = item.settlementResult || item.status || 'Pending';
        const status = String(value).toUpperCase();
        if (status === 'PENDING_APPROVAL') return 'PENDING';
        if (status.includes('WIN') || status === 'WON') return 'WIN';
        if (status.includes('LOSS') || status.includes('LOSE') || status === 'LOST') return 'LOSE';
        if (status === 'CONFIRMED') return 'CONFIRMED';
        return shown(value);
    };

    async function request(name, { method = 'GET', body, auth = true } = {}) {
        const headers = { 'Content-Type': 'application/json' };
        const key = window.fs5Supabase && window.fs5Supabase.config.publishableKey;
        if (key) headers.apikey = key;
        if (auth && token) headers.Authorization = `Bearer ${token}`;
        const response = await fetch(`${FUNCTIONS_URL}/${name}`, {
            method, headers, body: body === undefined ? undefined : JSON.stringify(body)
        });
        let data = {};
        try { data = await response.json(); } catch (ignore) { /* Status handling below is authoritative. */ }
        if (!response.ok) {
            const error = new Error(data.error || data.message || `Request failed (${response.status}).`);
            error.status = response.status;
            throw error;
        }
        return data;
    }

    function visible(id, show, display = 'block') { el(id).style.display = show ? display : 'none'; }
    function showLogin() {
        visible('login-area', true); visible('sb-logo', true); visible('sb-bill', false);
        visible('member-data', false); visible('sportsbook-dashboard', false);
    }
    function showMember() {
        visible('login-area', false); visible('sb-logo', false); visible('sb-bill', true);
        visible('member-data', true, 'flex'); visible('sportsbook-dashboard', true);
    }
    function clearSession() { token = ''; book = null; sessionStorage.removeItem(SESSION_KEY); }
    function setButton(button, busy, label = 'Submitting…') {
        if (busy) button.dataset.label = button.textContent;
        button.disabled = busy;
        button.textContent = busy ? label : (button.dataset.label || button.textContent);
    }
    function submissionKey() {
        return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;
    }
    function overlay(id, message, success = true) {
        const node = el(id);
        node.className = success ? 'success-message' : 'closed-message';
        node.textContent = message;
        node.style.display = 'flex';
        if (success) setTimeout(() => { node.style.display = 'none'; }, 3500);
    }
    function empty(body, columns, message) {
        const cell = body.insertRow().insertCell(); cell.colSpan = columns; cell.textContent = message;
    }
    function cells(row, values) { values.forEach(value => { row.insertCell().textContent = shown(value); }); }
    function owner(item, number) { return item[`owner${number}`] || {}; }
    function teamName(side) { return side.teamName || side.ownerName || 'Team unavailable'; }
    function statusClass(value) {
        const status = String(value || '').toLowerCase();
        if (status.includes('win') || status === 'won') return 'is-win';
        if (status.includes('loss') || status.includes('lose') || status === 'lost' || status === 'dnp') return 'is-loss';
        if (status.includes('push')) return 'is-push';
        if (status.includes('confirm')) return 'is-confirmed';
        if (status.includes('pending')) return 'is-pending';
        return 'is-open';
    }

    function marketIsBettable(market) {
        if (!market || String(market.status || '').toUpperCase() !== 'OPEN') return false;
        const now = Date.now();
        const opensAt = market.opensAt ? Date.parse(market.opensAt) : null;
        const closesAt = market.closesAt ? Date.parse(market.closesAt) : null;
        return (opensAt === null || Number.isFinite(opensAt) && now >= opensAt) &&
            (closesAt === null || Number.isFinite(closesAt) && now < closesAt);
    }

    function futureIsBettable(item) {
        if (!item || String(item.marketStatus || '').toUpperCase() !== 'OPEN') return false;
        const now = Date.now();
        const opensAt = item.opensAt ? Date.parse(item.opensAt) : null;
        const closesAt = item.closesAt ? Date.parse(item.closesAt) : null;
        return (opensAt === null || Number.isFinite(opensAt) && now >= opensAt) &&
            (closesAt === null || Number.isFinite(closesAt) && now < closesAt);
    }

    function renderMarket(slot, market) {
        const box = el(`gotw${slot}-box`);
        box.style.display = 'block';
        const select = el(`gotw${slot}-dropdown`);
        const amount = el(`gotw${slot}-amount-input`);
        const score = el(`gotw${slot}-score-guess`);
        const button = el(`gotw${slot}submit-button`);
        const state = el(`gotw${slot}-success`);
        const banner = box.querySelector('.matchup-banner');
        select.innerHTML = '<option value="">Choose a team</option>';
        amount.value = '';
        score.value = '';
        if (!market) {
            delete box.dataset.marketId;
            delete box.dataset.spreadVersionId;
            select.disabled = true;
            amount.disabled = true;
            score.disabled = true;
            score.placeholder = 'Unavailable';
            button.disabled = true;
            banner.querySelectorAll('.matchup-team').forEach(side => {
                side.querySelector('.matchup-team__label').textContent = 'Unavailable';
                side.querySelector('.matchup-team__spread').textContent = '—';
                side.querySelector('img').src = FALLBACK_ART;
            });
            banner.setAttribute('aria-label', 'GOTW market unavailable');
            state.className = 'closed-message';
            state.textContent = 'GOTW market unavailable.';
            state.style.display = 'flex';
            return;
        }
        box.dataset.marketId = market.marketId;
        box.dataset.spreadVersionId = market.spreadVersionId;
        box.querySelector(`.gotw${slot}-title`).firstChild.nodeValue = market.marketTitle || `Game of the Week #${market.gotwNumber || slot}`;
        [1, 2].forEach(number => {
            const sideData = owner(market, number);
            const side = banner.querySelector(number === 1 ? '.matchup-team--one' : '.matchup-team--two');
            side.querySelector('.matchup-team__label').textContent = teamName(sideData);
            side.querySelector('.matchup-team__spread').textContent = spread(sideData.spread);
            side.querySelector('img').src = sideData.profileImagePath || FALLBACK_ART;
            if (sideData.ownerId !== undefined && sideData.ownerId !== null) {
                const option = document.createElement('option');
                option.value = sideData.ownerId;
                option.textContent = `${teamName(sideData)} — ${sideData.ownerName || 'Owner'} (${spread(sideData.spread)})`;
                select.appendChild(option);
            }
        });
        banner.setAttribute('aria-label', `${teamName(owner(market, 1))} versus ${teamName(owner(market, 2))}`);
        const bettable = marketIsBettable(market);
        select.disabled = !bettable;
        amount.disabled = !bettable;
        button.disabled = !bettable;
        score.disabled = !bettable || !market.combinedScoreEnabled;
        score.placeholder = market.combinedScoreEnabled ? '' : 'Unavailable';
        if (!bettable) {
            state.className = 'closed-message';
            state.textContent = 'Betting is closed.';
            state.style.display = 'flex';
        }
    }

    function historyDetail(item, id, label) {
        const row = document.createElement('tr'); row.id = id; row.className = 'gotw-history-detail-row'; row.hidden = true;
        const cell = row.insertCell(); cell.colSpan = 4;
        const article = document.createElement('article'); article.className = `gotw-history-detail ${statusClass(label)}`;
        const matchup = document.createElement('div'); matchup.className = 'history-matchup';
        [1, 2].forEach(number => {
            if (number === 2) {
                const vs = document.createElement('span'); vs.className = 'history-matchup__vs'; vs.textContent = 'VS'; vs.setAttribute('aria-hidden', 'true'); matchup.appendChild(vs);
            }
            const sideData = owner(item, number);
            const side = document.createElement('div');
            side.className = `history-team${Number(item.spreadWinnerOwnerId) === Number(sideData.ownerId) ? ' is-spread-winner' : ''}`;
            const identity = document.createElement('div'); identity.className = 'history-team__identity';
            const image = document.createElement('img'); image.src = sideData.profileImagePath || FALLBACK_ART; image.alt = ''; image.setAttribute('aria-hidden', 'true');
            const name = document.createElement('span'); name.className = 'history-team__name'; name.textContent = teamName(sideData);
            const line = document.createElement('span'); line.className = 'history-team__spread'; line.textContent = spread(sideData.spread);
            identity.append(image, name, line);
            if (Number(item.spreadWinnerOwnerId) === Number(sideData.ownerId)) {
                const winner = document.createElement('span'); winner.className = 'history-team__winner-label'; winner.textContent = 'Spread winner'; identity.appendChild(winner);
            }
            const scoreBlock = document.createElement('div'); scoreBlock.className = 'history-team__score-block';
            const small = document.createElement('small'); small.textContent = 'Final Score';
            const score = document.createElement('strong'); score.className = 'history-team__score'; score.textContent = shown(sideData.finalScore);
            scoreBlock.append(small, score); side.append(identity, scoreBlock); matchup.appendChild(side);
        });
        const summary = document.createElement('div'); summary.className = 'history-score-summary';
        [['Actual Combined Score', item.actualCombinedScore], ['Your Combined Score', item.combinedScoreGuess],
            ['Difference', item.combinedScoreDifference], ['Accepted Spread', item.acceptedSpread], ['Wager Result', label]
        ].forEach(([title, value]) => {
            const wrapper = document.createElement('span');
            if (title === 'Wager Result') wrapper.className = 'history-wager-result';
            const small = document.createElement('small'); small.textContent = title;
            const strong = document.createElement('strong'); strong.textContent = shown(value);
            wrapper.append(small, strong); summary.appendChild(wrapper);
        });
        article.append(matchup, summary); cell.appendChild(article); return row;
    }

    function renderGotwHistory(items) {
        const body = el('gotw-table').tBodies[0]; body.replaceChildren(); visible('gotw-table-box', true);
        if (!items.length) return empty(body, 4, 'No GOTW wagers yet.');
        items.forEach((item, index) => {
            const label = gotwResult(item); const row = document.createElement('tr'); const id = `gotw-detail-${item.wagerId || index}`;
            row.className = `gotw-history-row ${statusClass(label)}`; row.tabIndex = 0; row.setAttribute('role', 'button');
            row.setAttribute('aria-expanded', 'false'); row.setAttribute('aria-controls', id);
            cells(row, [item.weekNumber, money(item.stakeAmount), `${item.selectedTeamName || item.selectedOwnerName || '—'} ${spread(item.acceptedSpread)}`, label]);
            const chevron = document.createElement('span'); chevron.className = 'gotw-history-chevron'; chevron.setAttribute('aria-hidden', 'true'); row.cells[row.cells.length - 1].appendChild(chevron);
            const detail = historyDetail(item, id, label);
            const toggle = () => {
                const open = row.getAttribute('aria-expanded') !== 'true';
                body.querySelectorAll('[aria-expanded="true"]').forEach(other => { other.setAttribute('aria-expanded', 'false'); el(other.getAttribute('aria-controls')).hidden = true; });
                row.setAttribute('aria-expanded', String(open)); detail.hidden = !open;
            };
            row.addEventListener('click', toggle);
            row.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); } });
            body.append(row, detail);
        });
    }

    function renderFutures(offered, history) {
        visible('futures-offered-box', true); visible('futures-placed-box', true);
        const offeredBody = el('futures-offered-table').tBodies[0]; const historyBody = el('futures-placed-table').tBodies[0];
        const amount = el('futures-amount-input'); const button = el('submit-future-button'); const closed = el('future-success');
        offeredBody.replaceChildren(); historyBody.replaceChildren(); selectedFuture = null; el('selected-future').textContent = ''; el('calculated-payout').textContent = '';
        const hasBettableFuture = offered.some(futureIsBettable);
        amount.value = ''; amount.disabled = !hasBettableFuture; button.disabled = true;
        if (!offered.length) empty(offeredBody, 2, 'No futures are currently offered.');
        offered.forEach(item => {
            const bettable = futureIsBettable(item);
            const row = offeredBody.insertRow(); cells(row, [item.future, americanOdds(item.americanOdds)]); row.tabIndex = bettable ? 0 : -1;
            row.setAttribute('aria-disabled', String(!bettable));
            const choose = () => {
                offeredBody.querySelectorAll('tr').forEach(other => other.classList.remove('highlighted-row')); row.classList.add('highlighted-row');
                selectedFuture = item; el('selected-future').textContent = `${item.future}, Odds: ${americanOdds(item.americanOdds)}`;
                amount.value = ''; button.disabled = false; el('calculated-payout').textContent = '';
            };
            if (bettable) {
                row.addEventListener('click', choose); row.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(); } });
            }
        });
        if (offered.length && !hasBettableFuture) {
            closed.className = 'closed-message'; closed.textContent = 'Futures betting is closed.'; closed.style.display = 'flex';
        }
        if (!history.length) empty(historyBody, 5, 'No futures wagers yet.');
        history.forEach(item => {
            const authoritativeResult = result(item);
            const row = historyBody.insertRow(); cells(row, [item.future, money(item.stakeAmount), americanOdds(item.acceptedOdds),
                item.payout === null || item.payout === undefined ? '—' : money(item.payout), futuresResult(item)]); row.className = statusClass(authoritativeResult);
        });
    }

    function renderSurvivor(data) {
        visible('survivor-selection', true, 'flex');
        let pickOverlay = el('survivor-pick-overlay');
        if (!pickOverlay) {
            pickOverlay = document.createElement('div');
            pickOverlay.id = 'survivor-pick-overlay';
            pickOverlay.className = 'closed-message';
            pickOverlay.textContent = 'Survivor is closed.';
            el('survivor-selection').appendChild(pickOverlay);
        }
        if (!data || data.available === false) {
            visible('survivor-selection-box', false); visible('survivor-box', false);
            el('survivordetail').textContent = data && data.instructions || 'Survivor is unavailable.';
            el('survivor-dropdown').innerHTML = '<option>Unavailable</option>'; el('survivor-dropdown').disabled = true; el('survivor-submit-button').disabled = true;
            pickOverlay.style.display = 'flex'; return;
        }
        visible('survivor-selection-box', true); visible('survivor-box', true);
        const hasCurrentWeek = data.currentWeek !== null && data.currentWeek !== undefined;
        const survivorOpen = String(data.status || '').toUpperCase() === 'OPEN' && data.canSubmit === true;
        el('survivordetail').textContent = hasCurrentWeek ? (data.instructions || `Select Pick for Week ${data.currentWeek}`) : 'Survivor';
        el('survivor-selection-title').textContent = hasCurrentWeek ? `Survivor Pool Selections - Week ${data.currentWeek}` : 'Survivor Pool Selections';
        const select = el('survivor-dropdown'); select.disabled = !survivorOpen; el('survivor-submit-button').disabled = !survivorOpen;
        pickOverlay.style.display = survivorOpen ? 'none' : 'flex';
        select.innerHTML = '<option value="">Choose a team</option>';
        (data.eligibleOwners || []).forEach(item => {
            const option = document.createElement('option'); option.value = item.ownerId; option.textContent = `${item.teamName || item.ownerName} — ${item.ownerName}`; select.appendChild(option);
        });
        if (data.myEntry && data.myEntry.currentSelectionOwnerId != null) {
            select.value = String(data.myEntry.currentSelectionOwnerId);
        }
        const selections = el('survivor-selection-table').tBodies[0]; selections.replaceChildren();
        const activeStandings = (data.standings || []).filter(item => item.entryStatus === 'ACTIVE');
        const currentWeekSelections = (data.currentWeekSelections || []).filter(selection => activeStandings.some(standing =>
            selection.memberId != null && standing.memberId != null
                ? String(selection.memberId) === String(standing.memberId)
                : selection.memberName === standing.memberName
        ));
        if (!currentWeekSelections.length) empty(selections, 3, 'No selections posted yet.');
        currentWeekSelections.forEach(item => cells(selections.insertRow(), [
            item.memberName,
            item.selectedTeamName,
            item.adminDecision || item.selectionStatus
        ]));
        const selectionsBox = el('survivor-selection-box');
        let selectionsOverlay = el('survivor-selections-overlay');
        if (!selectionsOverlay) {
            selectionsOverlay = document.createElement('div');
            selectionsOverlay.id = 'survivor-selections-overlay';
            selectionsOverlay.className = 'closed-message';
            selectionsOverlay.textContent = 'Selections hidden until all picks are in';
            selectionsBox.appendChild(selectionsOverlay);
        }
        selectionsOverlay.style.display = data.selectionsVisible === false ? 'flex' : 'none';
        const standings = el('survivor-table').tBodies[0]; standings.replaceChildren();
        if (!(data.standings || []).length) empty(standings, 3, 'Standings are not yet available.');
        (data.standings || []).forEach(item => {
            const row = standings.insertRow(); cells(row, [item.rank, item.memberName, item.weeksAlive]);
            const entryStatus = String(item.entryStatus || '').toUpperCase();
            if (entryStatus === 'WINNER' || entryStatus === 'ELIMINATED' || entryStatus === 'ACTIVE') {
                if (entryStatus !== 'ACTIVE') row.className = entryStatus === 'WINNER' ? 'survivor-standing--winner' : 'survivor-standing--eliminated';
                const badge = document.createElement('span');
                badge.className = `survivor-standing__badge survivor-standing__badge--${entryStatus.toLowerCase()}`;
                badge.textContent = entryStatus === 'WINNER' ? 'CHAMPION' : entryStatus === 'ACTIVE' ? 'ACTIVE' : `ELIMINATED${item.eliminatedWeekNumber != null ? ` W${item.eliminatedWeekNumber}` : ''}`;
                row.cells[1].appendChild(badge);
            }
        });
    }

    function render(data) {
        book = data; showMember();
        ['gotw1-success', 'gotw2-success', 'future-success'].forEach(id => { el(id).style.display = 'none'; el(id).className = 'success-message'; });
        el('welcome').textContent = data.member && data.member.name || 'Member';
        el('balance').textContent = money(data.balances && data.balances.cash);
        el('free-bet-balance').textContent = money(data.balances && data.balances.freeBet);
        const gotw = Array.isArray(data.gotw) ? data.gotw : [];
        renderMarket(1, gotw[0]); renderMarket(2, gotw[1]);
        renderGotwHistory(Array.isArray(data.gotwHistory) ? data.gotwHistory : []);
        renderFutures(Array.isArray(data.futuresOffered) ? data.futuresOffered : [], Array.isArray(data.futureHistory) ? data.futureHistory : []);
        renderSurvivor(data.survivor || { available: false });
    }
    async function loadBook() { render(await request('member-book')); }

    async function login(event) {
        event.preventDefault(); if (pending) return;
        const button = event.currentTarget.querySelector('button'); pending = true; setButton(button, true, 'Signing in…'); el('login-error').textContent = '';
        try {
            const data = await request('member-login', { method: 'POST', auth: false, body: { accessCode: el('password-input').value.trim() } });
            token = data.sessionToken || data.accessToken || data.token || data.session && data.session.token || '';
            if (!token) throw new Error('The login response did not include a session token.');
            sessionStorage.setItem(SESSION_KEY, token); await loadBook();
        } catch (error) {
            clearSession(); showLogin(); console.error('SportsBook login failed:', error); el('login-error').textContent = error.message || 'Unable to sign in.';
        } finally { pending = false; setButton(button, false); }
    }
    async function logout() {
        const oldToken = token; clearSession(); showLogin(); el('password-input').value = '';
        if (!oldToken) return; token = oldToken;
        try { await request('member-logout', { method: 'POST' }); }
        catch (error) { console.error('Server logout failed; local session was cleared:', error); }
        finally { token = ''; }
    }
    function stake(input) {
        const amount = Number(String(input.value).replace(/[$,\s]/g, ''));
        if (!Number.isFinite(amount) || amount <= 0) throw new Error('Enter a wager amount greater than $0.');
        return amount;
    }
    async function submitGotw(slot) {
        if (pending) return; const button = el(`gotw${slot}submit-button`); const market = book.gotw[slot - 1];
        try {
            if (!marketIsBettable(market)) throw new Error('This GOTW market is not open for betting.');
            const selectedOwnerId = Number(el(`gotw${slot}-dropdown`).value); if (!selectedOwnerId) throw new Error('Choose a team before submitting.');
            const stakeAmount = stake(el(`gotw${slot}-amount-input`)); const scoreInput = el(`gotw${slot}-score-guess`); let combinedScoreGuess = null;
            if (market.combinedScoreEnabled && scoreInput.value !== '') { combinedScoreGuess = Number(scoreInput.value); if (!Number.isFinite(combinedScoreGuess) || combinedScoreGuess < 0) throw new Error('Enter a valid combined score.'); }
            pending = true; setButton(button, true);
            await request('member-submit-wager', { method: 'POST', body: { type: 'SPREAD', marketId: Number(market.marketId), spreadVersionId: Number(market.spreadVersionId), selectedOwnerId, combinedScoreGuess, stakeAmount, submissionKey: submissionKey() } });
            await loadBook(); overlay(`gotw${slot}-success`, 'Wager submitted and pending confirmation.');
        } catch (error) { console.error(`GOTW ${slot} submission failed:`, error); overlay(`gotw${slot}-success`, error.message || 'Unable to submit wager.', false); }
        finally { pending = false; setButton(button, false); button.disabled = !marketIsBettable(book && book.gotw && book.gotw[slot - 1]); }
    }
    async function submitFuture() {
        if (pending) return; const button = el('submit-future-button');
        try {
            if (!selectedFuture) throw new Error('Choose a future before submitting.');
            if (!futureIsBettable(selectedFuture)) throw new Error('Futures betting is closed.');
            const stakeAmount = stake(el('futures-amount-input'));
            pending = true; setButton(button, true);
            await request('member-submit-wager', { method: 'POST', body: { type: 'FUTURE', marketId: Number(selectedFuture.marketId), futureOptionVersionId: Number(selectedFuture.futureOptionVersionId), stakeAmount, submissionKey: submissionKey() } });
            await loadBook(); overlay('future-success', 'Future wager submitted and pending confirmation.');
        } catch (error) { console.error('Future submission failed:', error); overlay('future-success', error.message || 'Unable to submit future wager.', false); }
        finally { pending = false; setButton(button, false); button.disabled = !futureIsBettable(selectedFuture); }
    }
    async function submitSurvivor() {
        if (pending) return; const button = el('survivor-submit-button');
        try {
            const selectedOwnerId = Number(el('survivor-dropdown').value); if (!selectedOwnerId) throw new Error('Choose a Survivor selection before submitting.');
            pending = true; setButton(button, true); await request('member-submit-survivor', { method: 'POST', body: { selectedOwnerId } }); await loadBook();
            let success = el('survivor-success');
            if (!success) {
                success = document.createElement('div'); success.id = 'survivor-success'; success.className = 'success-message'; el('survivor-selection').appendChild(success);
            }
            overlay('survivor-success', 'Survivor pick submitted.');
        } catch (error) { console.error('Survivor submission failed:', error); alert(error.message || 'Unable to submit Survivor selection.'); }
        finally { pending = false; setButton(button, false); }
    }
    function updatePayout() {
        const amount = Number(el('futures-amount-input').value); const odds = selectedFuture && Number(selectedFuture.americanOdds);
        if (!selectedFuture || !Number.isFinite(amount) || amount <= 0 || !Number.isFinite(odds)) return void (el('calculated-payout').textContent = '');
        const payout = odds > 0 ? amount + amount * odds / 100 : amount + amount * 100 / Math.abs(odds);
        el('calculated-payout').textContent = `Payout (incl stake): ${money(payout)}`;
    }
    async function restore() {
        if (!token) return showLogin();
        try { await request('member-status'); await loadBook(); }
        catch (error) { console.error('SportsBook session restore failed:', error); clearSession(); showLogin(); if (error.status !== 401) el('login-error').textContent = 'Unable to restore your session. Please sign in again.'; }
    }

    document.addEventListener('DOMContentLoaded', () => {
        el('login-form').addEventListener('submit', login); el('logout-button').addEventListener('click', logout);
        el('gotw1submit-button').addEventListener('click', () => submitGotw(1)); el('gotw2submit-button').addEventListener('click', () => submitGotw(2));
        el('submit-future-button').addEventListener('click', submitFuture); el('survivor-submit-button').addEventListener('click', submitSurvivor);
        el('futures-amount-input').addEventListener('input', updatePayout); restore();
    });
})();
