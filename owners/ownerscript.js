document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var ownerDropdown = document.getElementById('owner-dropdown');
    var recordDropdown = document.getElementById('game-record-dropdown');
    var statusElement = document.getElementById('owner-data-status');
    var pageMain = document.querySelector('main');
    var teamLogo = document.querySelector('.team-logo');
    var teamLogoImage = document.querySelector('.team-logo-image');
    var teamLogoInitials = document.querySelector('.team-logo-fallback__initials');
    var seasonHistoryList = document.getElementById('season-history-list');
    var seasonHistoryEmpty = document.getElementById('season-history-empty');
    var seasonHistoryControls = document.querySelector('.season-history__controls');
    var seasonHistoryToggle = document.querySelector('.season-history__toggle');
    var seasonHistoryNote = document.querySelector('.season-history__note');
    var seasonHistoryMedia = window.matchMedia('(max-width: 765px)');
    var recordTable = document.querySelector('.game-records-table');
    var recordTableBody = recordTable.querySelector('tbody');
    var recordResults = document.querySelector('.team-game-records__results');
    var h2hGrid = document.getElementById('h2h-summary-grid');
    var h2hEmpty = document.getElementById('h2h-summary-empty');
    var achievementCase = document.getElementById('achievement-case');
    var achievementGrid = document.getElementById('achievement-case-grid');
    var achievementCount = document.getElementById('achievement-case-count');
    var achievementHistoryModal = document.getElementById('achievement-history-modal');
    var achievementHistoryContent = document.getElementById('achievement-history-content');
    var achievementHistoryClose = document.getElementById('achievement-history-close');
    var ownerLocker = document.getElementById('owner-locker');
    var ownerLockerShelves = document.getElementById('owner-locker-shelves');
    var ownerLockerCount = document.getElementById('owner-locker-count');
    var ownerLockerEmpty = document.getElementById('owner-locker-empty');
    var lockerItemModal = document.getElementById('locker-item-modal');
    var lockerItemModalContent = document.getElementById('locker-item-modal-content');
    var lockerItemModalClose = document.getElementById('locker-item-modal-close');
    var requestSequence = 0;
    var currentOwnerData = null;
    var allTimeOwnerTotals = {};
    var allTimeOwnerTotalsPromises = {};
    var currentSeasonRows = [];
    var seasonHistoryExpanded = false;

    var scoreRecordCategories = [
        'high-scores',
        'low-scores',
        'most-losing',
        'least-winning'
    ];

    var defaultValues = {
        wins: '000',
        losses: '000',
        ties: '0',
        'total-games': '000',
        'win-percent': '0.000',
        seasons: '00',
        'team-name': 'Select an owner',
        champs: '0',
        'last-place': '0',
        'ten-win': '0',
        'best-record': '0-0',
        'worst-record': '0-0',
        'average-record': '0.00-0.00',
        'longest-win-streak': '00',
        wstreakdetail: '***',
        'longest-losing-streak': '00',
        lstreakdetail: '***',
        'current-streak': '00',
        'total-points': '0',
        'average-points': '0',
        'points-against': '0',
        'average-points-against': '0',
        'playoff-appearances': '0',
        'playoff-byes': '0',
        'playoff-wins': '0',
        'playoff-losses': '0',
        'playoff-win-percentage': '0.000',
        'championship-appearances': '0',
        'champ-wins': '0',
        'champ-losses': '0',
        'champ-win-percentage': '0.000'
    };

    var rankElementIds = [
        'total-points-rank',
        'average-points-rank',
        'points-against-rank',
        'average-points-against-rank',
        'appearances-rank',
        'byes-rank',
        'wins-rank',
        'losses-rank',
        'win-percentage-rank',
        'championship-appearances-rank',
        'champ-wins-rank',
        'champ-losses-rank',
        'champ-win-percentage-rank'
    ];

    ownerDropdown.addEventListener('change', handleOwnerChange);
    recordDropdown.addEventListener('change', renderSelectedRecordList);
    seasonHistoryToggle.addEventListener('click', toggleSeasonHistory);
    if (achievementHistoryClose) achievementHistoryClose.addEventListener('click', closeAchievementHistory);
    if (achievementHistoryModal) {
        achievementHistoryModal.addEventListener('click', function (event) {
            if (event.target === achievementHistoryModal) closeAchievementHistory();
        });
    }
    if (lockerItemModalClose) lockerItemModalClose.addEventListener('click', closeLockerItemModal);
    if (lockerItemModal) {
        lockerItemModal.addEventListener('click', function (event) {
            if (event.target === lockerItemModal) closeLockerItemModal();
        });
    }
    if (seasonHistoryMedia.addEventListener) {
        seasonHistoryMedia.addEventListener('change', renderSeasonHistoryRows);
    } else {
        seasonHistoryMedia.addListener(renderSeasonHistoryRows);
    }

    resetPage();

    async function handleOwnerChange() {
        var ownerName = ownerDropdown.value;
        var requestId = ++requestSequence;

        currentOwnerData = null;
        resetDataValues();
        resetTeamLogo(ownerName);
        setOwnerBlankState(ownerName === 'Owner');

        if (ownerName === 'Owner') {
            setBusy(false);
            hideStatus();
            return;
        }

        setBusy(true);
        showStatus('Loading owner statistics...', 'is-loading');

        try {
            var data = await fetchOwnerPage(ownerName);

            if (requestId !== requestSequence) {
                return;
            }

            if (!data || !data.owner) {
                showStatus('No statistics were found for this owner.', 'is-empty');
                return;
            }

            currentOwnerData = data;
            renderOwnerPage(data);
            Promise.all([loadCareerTouchdownTotals(), loadLastPlaceGameLossTotals()]).then(function (totals) {
                if (requestId !== requestSequence || currentOwnerData !== data) return;
                var ownerKey = ownerMetricKey(data.owner && data.owner.owner_name);
                renderOwnerAchievements(data, totals[0][ownerKey], totals[1][ownerKey]);
            }).catch(function (error) {
                console.warn('Owner achievement totals could not be loaded.', error);
            });
            hideStatus();
        } catch (error) {
            if (requestId !== requestSequence) {
                return;
            }

            currentOwnerData = null;
            resetDataValues();
            resetTeamLogo(ownerName);
            showStatus(
                'Owner statistics could not be loaded. Please try again or refresh the page.',
                'is-error'
            );
            console.error('Owners Supabase request failed.', {
                ownerName: ownerName,
                error: error
            });
        } finally {
            if (requestId === requestSequence) {
                setBusy(false);
            }
        }
    }

    async function fetchOwnerPage(ownerName) {
        if (!window.fs5Supabase) {
            throw new Error('The shared Supabase configuration did not load.');
        }

        var client = window.fs5Supabase.getClient();
        var response = await client.rpc('site_owner_page', {
            p_owner_name: ownerName
        });

        if (response.error) {
            throw response.error;
        }

        if (Array.isArray(response.data)) {
            return response.data.length ? response.data[0] : null;
        }

        return response.data || null;
    }

    function ownerMetricKey(ownerName) {
        return String(ownerName || '').trim().toLowerCase();
    }

    async function loadAllTimeOwnerTotals(recordCategory) {
        if (allTimeOwnerTotals[recordCategory]) return allTimeOwnerTotals[recordCategory];
        if (allTimeOwnerTotalsPromises[recordCategory]) return allTimeOwnerTotalsPromises[recordCategory];

        allTimeOwnerTotalsPromises[recordCategory] = window.fs5Supabase.getClient().rpc('site_all_time_records', {
            p_record_category: recordCategory,
            p_active_only: false,
            p_scope: 'combined',
            p_limit: 100
        }).then(function (response) {
            if (response.error) throw response.error;
            var totals = {};
            (Array.isArray(response.data) ? response.data : []).forEach(function (row) {
                totals[ownerMetricKey(row.owner_name)] = numberOrZero(row.metric_value);
            });
            allTimeOwnerTotals[recordCategory] = totals;
            return totals;
        }).finally(function () {
            allTimeOwnerTotalsPromises[recordCategory] = null;
        });

        return allTimeOwnerTotalsPromises[recordCategory];
    }

    function loadCareerTouchdownTotals() {
        return loadAllTimeOwnerTotals('owner-tds');
    }

    function loadLastPlaceGameLossTotals() {
        return loadAllTimeOwnerTotals('lastplace-losses');
    }

    function renderOwnerPage(data) {
        renderOwnerHeader(data.owner);
        renderOverall(data.overall);
        renderSeasonSummary(data.season_summary);
        renderStreaks(data.streaks);
        renderOwnerAchievements(data);
        renderPoints(data.points);
        renderPostseason(data.postseason);
        renderAllYears(data.seasons);
        renderSelectedRecordList();
        renderH2H(data.h2h);
        renderOwnerLocker(data.owner);
    }

    function achievementTrophy(tier, type) {
        var style = achievementTierStyle(tier);
        var trophyName = type === 'last-place' ? 'wall-of-shame-' + style : 'trophy-' + style;
        return '<img class="achievement-crest__trophy" src="artwork/achievements/' + trophyName + '.png" alt="" aria-hidden="true" loading="lazy">';
    }

    function metricValue(metric) {
        if (metric && typeof metric === 'object' && metric.value !== undefined) return numberOrZero(metric.value);
        return numberOrZero(metric);
    }

    function renderOwnerAchievements(data, totalTouchdowns, lastPlaceGameLosses) {
        if (!achievementCase || !achievementGrid || !achievementCount) return;
        var overall = data.overall || {};
        var summary = data.season_summary || {};
        var streaks = data.streaks || {};
        var postseason = data.postseason || {};
        var careerWins = numberOrZero(overall.wins);
        var championships = numberOrZero(summary.championships);
        var tenWinSeasons = numberOrZero(summary.ten_win_seasons);
        var lastPlaceFinishes = numberOrZero(lastPlaceGameLosses);
        var longestWin = numberOrZero((streaks.longest_win || {}).length);
        var playoffAppearances = metricValue(postseason.playoff_appearances);
        var achievements = [
            { type: 'wins', title: 'Win Machine', detail: 'Stack career wins', value: careerWins, unit: 'win', tiers: [{ name: 'Bronze Crest', target: 50 }, { name: 'Silver Crest', target: 100 }, { name: 'Gold Crest', target: 150 }, { name: 'Legacy Crest', target: 200 }] },
            { type: 'champion', title: 'FS5 Legend', detail: 'Win an FS5 championship', value: championships, unit: 'title', tiers: [{ name: 'Bronze Crest', target: 1 }, { name: 'Silver Crest', target: 2 }, { name: 'Gold Crest', target: 3 }, { name: 'Legacy Crest', target: 5 }] },
            { type: 'dynasty', title: 'Double-Digit Dynasty', detail: 'Complete a 10-win season', value: tenWinSeasons, unit: '10-win season', tiers: [{ name: 'Bronze Crest', target: 1 }, { name: 'Silver Crest', target: 3 }, { name: 'Gold Crest', target: 5 }, { name: 'Legacy Crest', target: 8 }] },
            { type: 'streak', title: 'Hot Streak', detail: 'Build a winning streak', value: longestWin, unit: 'win', tiers: [{ name: 'Bronze Crest', target: 5 }, { name: 'Silver Crest', target: 7 }, { name: 'Gold Crest', target: 10 }, { name: 'Legacy Crest', target: 13 }] },
            { type: 'playoff', title: 'January Regular', detail: 'Make the FS5 playoffs', value: playoffAppearances, unit: 'playoff appearance', tiers: [{ name: 'Bronze Crest', target: 3 }, { name: 'Silver Crest', target: 5 }, { name: 'Gold Crest', target: 8 }, { name: 'Legacy Crest', target: 12 }] },
            { type: 'last-place', title: 'Wall of Shame', detail: 'Lose the final consolation game', value: lastPlaceFinishes, unit: 'last-place finish', tiers: [{ name: 'Bronze Blunder', target: 1 }, { name: 'Silver Stink', target: 2 }, { name: 'Gold Garbage', target: 3 }, { name: 'Legacy Curse', target: 5 }] }
        ];
        if (totalTouchdowns !== null && totalTouchdowns !== undefined && Number.isFinite(Number(totalTouchdowns))) {
            achievements.splice(1, 0, { type: 'touchdowns', title: 'Touchdown Hoarder', detail: 'Pile up tracked fantasy touchdowns', value: numberOrZero(totalTouchdowns), unit: 'touchdown', tiers: [{ name: 'Bronze Crest', target: 250 }, { name: 'Silver Crest', target: 500 }, { name: 'Gold Crest', target: 750 }, { name: 'Legacy Crest', target: 1000 }] });
        }
        var earned = achievements.filter(function (achievement) { return achievement.value >= achievement.tiers[0].target; }).length;
        achievementCase.hidden = false;
        achievementCount.textContent = earned + ' unlocked';
        achievementGrid.textContent = '';
        achievements.forEach(function (achievement) {
            var card = document.createElement('button');
            var unlocked = achievement.value >= achievement.tiers[0].target;
            var tier = getAchievementTier(achievement);
            card.className = 'achievement-crest achievement-crest--' + achievement.type + ' achievement-tier--' + achievementTierStyle(tier) + (unlocked ? ' is-unlocked' : ' is-locked');
            card.type = 'button';
            card.setAttribute('aria-haspopup', 'dialog');
            card.setAttribute('aria-controls', 'achievement-history-modal');
            card.setAttribute('aria-label', achievement.title + ': ' + (unlocked ? 'unlocked' : 'in progress') + '. Open achievement history and tier guide.');
            card.innerHTML = '<span class="achievement-crest__medallion">' + achievementTrophy(tier, achievement.type) + '</span><span class="achievement-crest__copy"><span class="achievement-crest__state">' + (tier.current ? tier.current.name.toUpperCase() : 'IN PROGRESS') + '</span><span class="achievement-crest__title">' + achievement.title + '</span><span class="achievement-crest__detail">' + achievement.detail + '</span><span class="achievement-crest__progress">' + formatAchievementProgress(achievement) + '</span></span>';
            card.addEventListener('click', function () {
                openAchievementHistory(achievement, tier);
            });
            achievementGrid.appendChild(card);
        });
    }

    function getAchievementTier(achievement) {
        var current = null;
        var next = null;
        achievement.tiers.forEach(function (tier) {
            if (achievement.value >= tier.target) {
                current = tier;
            } else if (!next) {
                next = tier;
            }
        });
        return { current: current, next: next };
    }

    function achievementTierStyle(tier) {
        return tier.current ? tier.current.name.split(' ')[0].toLowerCase() : 'bronze';
    }

    function formatAchievementUnit(value, unit) {
        if (value === 1) return unit;
        if (unit === '10-win season') return '10-win seasons';
        if (unit === 'last-place finish') return 'last-place finishes';
        return unit + 's';
    }

    function formatAchievementProgress(achievement) {
        return achievement.value + ' ' + formatAchievementUnit(achievement.value, achievement.unit);
    }

    function openAchievementHistory(achievement, tier) {
        if (!achievementHistoryModal || !achievementHistoryContent) return;
        var nextMessage = tier.next
            ? (tier.next.target - achievement.value) + ' more ' + formatAchievementUnit(tier.next.target - achievement.value, achievement.unit) + ' to unlock ' + tier.next.name + ' at ' + tier.next.target + '.'
            : 'Every available tier is unlocked.';
        var currentMessage = tier.current
            ? 'Current tier: ' + tier.current.name + '.'
            : 'Current tier: Not yet unlocked.';
        var selectedTiers = achievement.tiers.map(function (tierItem) {
            var tierStyle = tierItem.name.split(' ')[0].toLowerCase();
            var state = achievement.value >= tierItem.target ? ' is-earned' : '';
            return '<span class="achievement-tier-guide__tier achievement-tier-guide__tier--' + tierStyle + state + '"><b>' + tierItem.name + '</b><small>' + tierItem.target + ' ' + formatAchievementUnit(tierItem.target, achievement.unit) + '</small></span>';
        }).join('');

        achievementHistoryContent.innerHTML = '<div class="achievement-history__hero achievement-history--' + achievement.type + '"><span class="achievement-history__trophy">' + achievementTrophy(tier, achievement.type) + '</span><div><p class="achievement-history__eyebrow">ACHIEVEMENT HISTORY</p><h2 id="achievement-history-title">' + achievement.title + '</h2><p>' + achievement.detail + '</p></div></div><section class="achievement-history__summary" aria-label="Current achievement history"><span>CAREER TOTAL</span><strong>' + formatAchievementProgress(achievement) + '</strong><p>' + currentMessage + ' ' + nextMessage + '</p></section><section class="achievement-history__legend" aria-labelledby="achievement-history-legend-title"><div class="achievement-history__legend-header"><h3 id="achievement-history-legend-title">Tier guide</h3><p>Every crest has four levels.</p></div><div class="achievement-tier-guide__tiers achievement-history__selected-tiers">' + selectedTiers + '</div></section>';
        achievementHistoryModal.showModal();
    }

    function closeAchievementHistory() {
        if (achievementHistoryModal && achievementHistoryModal.open) achievementHistoryModal.close();
    }

    function lockerItemProfile(bowlName, roundName) {
        var bowl = String(bowlName || '').toLowerCase();
        var round = String(roundName || '').toLowerCase();
        if (bowl.indexOf('bronze chair') !== -1) return { label: 'Bronze Chair', type: 'bronze-chair', asset: 'artwork/locker/objects/bronze-chair.png' };
        if (bowl.indexOf('pierogi') !== -1) return { label: 'Pierogi Platter', type: 'pierogi', asset: 'artwork/locker/objects/pierogi.png' };
        if (bowl.indexOf('pizza roll') !== -1) return { label: 'Pizza Roll Tray', type: 'pizza-rolls', asset: 'artwork/locker/objects/pizza-rolls.png' };
        if (bowl.indexOf('disco') !== -1) return { label: 'Disco Feeler', type: 'disco', asset: 'artwork/locker/objects/disco.png' };
        if (bowl.indexOf('bloodbath') !== -1) return { label: 'Bloodbath Relic', type: 'bloodbath', asset: 'artwork/locker/objects/bloodbath.png' };
        if (bowl.indexOf('city of homes') !== -1) return { label: 'City of Homes Keepsake', type: 'city-of-homes', asset: 'artwork/locker/objects/city-of-homes.png' };
        if (bowl.indexOf('battle of the bulge') !== -1) return { label: 'Bulge Barbell', type: 'bulge-barbell', asset: 'artwork/locker/objects/bulge-barbell.png' };
        if (bowl.indexOf('jordan lynch') !== -1) return { label: 'Lynch Football', type: 'lynch-football', asset: 'artwork/locker/objects/lynch-football.png' };
        if (bowl.indexOf('random') !== -1) return { label: 'R.A.N.D.O.M. Dice', type: 'random-dice', asset: 'artwork/locker/objects/random-dice.png' };
        if (bowl.indexOf('edge') !== -1) return { label: 'Edge Relic', type: 'edge', asset: 'artwork/locker/objects/edge.png' };
        if (bowl.indexOf('memorial') !== -1) return { label: 'Memorial Frame', type: 'memorial', asset: 'artwork/locker/objects/memorial.png' };
        if (bowl.indexOf('crosby') !== -1) return { label: 'Studio Reel', type: 'studio-reel', asset: 'artwork/locker/objects/studio-reel.png' };
        if (bowl.indexOf('shut the') !== -1) return { label: 'Rivalry Bullhorn', type: 'bullhorn', asset: 'artwork/locker/objects/bullhorn.png' };
        if (bowl.indexOf('last place') !== -1) return { label: 'Basement Trophy', type: 'basement-trophy' };
        if (bowl.indexOf('ninth place') !== -1) return { label: 'Ninth Place Medal', type: 'ninth-medal', asset: 'artwork/locker/objects/ninth-medal.png' };
        if (bowl.indexOf('fifth place') !== -1) return { label: 'Fifth Place Pennant', type: 'fifth-pennant' };
        if (bowl.indexOf('consolation') !== -1) return { label: 'Consolation Cup', type: 'consolation-cup' };
        if (bowl === 'championship' || round === 'championship') return { label: 'Championship Football', type: 'championship-football', asset: 'artwork/locker/objects/championship-football.png' };
        if (bowl === 'semifinal' || round === 'semifinal') return { label: 'Semifinal Playbook', type: 'playbook' };
        if (bowl === 'first round' || round === 'first round') return { label: 'First Round Game Ball', type: 'game-ball', asset: 'artwork/locker/objects/game-ball.png' };
        if (bowl === 'third place game' || round === 'third place game') return { label: 'Bronze Chair', type: 'bronze-chair', asset: 'artwork/locker/objects/bronze-chair.png' };
        return { label: bowlName || 'Bowl Keepsake', type: 'bowl-keepsake' };
    }

    function renderOwnerLocker(owner) {
        if (!ownerLocker || !ownerLockerShelves || !ownerLockerCount || !ownerLockerEmpty) return;
        var ownerName = owner && owner.owner_name;
        var awards = (Array.isArray(window.FS5_LOCKER_AWARDS) ? window.FS5_LOCKER_AWARDS : [])
            .filter(function (award) { return ownerMetricKey(award.owner) === ownerMetricKey(ownerName); });

        ownerLocker.hidden = false;
        ownerLockerShelves.textContent = '';
        ownerLockerCount.textContent = awards.length + (awards.length === 1 ? ' keepsake' : ' keepsakes');
        ownerLockerEmpty.hidden = awards.length > 0;

        var shelfCount = Math.max(4, Math.ceil(awards.length / 5));
        for (var shelfIndex = 0; shelfIndex < shelfCount; shelfIndex++) {
            var index = shelfIndex * 5;
            var shelf = document.createElement('section');
            shelf.className = 'owner-locker__shelf';
            shelf.setAttribute('aria-label', 'Locker shelf ' + (shelfIndex + 1));
            var shelfItems = document.createElement('div');
            shelfItems.className = 'owner-locker__shelf-items';

            awards.slice(index, index + 5).forEach(function (award) {
                var profile = lockerItemProfile(award.bowl, award.round);
                var item = document.createElement('button');
                item.className = 'locker-collectible locker-collectible--' + profile.type;
                item.type = 'button';
                item.setAttribute('aria-haspopup', 'dialog');
                item.setAttribute('aria-controls', 'locker-item-modal');
                item.setAttribute('aria-label', profile.label + ', won in ' + award.season + '. Open game details.');

                var object = document.createElement('span');
                object.className = 'locker-collectible__object locker-object locker-object--' + profile.type;
                object.setAttribute('aria-hidden', 'true');
                if (profile.asset) {
                    var objectImage = document.createElement('img');
                    objectImage.src = profile.asset;
                    objectImage.alt = '';
                    objectImage.loading = 'lazy';
                    object.appendChild(objectImage);
                } else {
                    object.appendChild(document.createElement('span'));
                }
                item.appendChild(object);

                var label = document.createElement('span');
                label.className = 'locker-collectible__label';
                label.textContent = profile.label;
                item.appendChild(label);

                var year = document.createElement('span');
                year.className = 'locker-collectible__year';
                year.textContent = award.season;
                item.appendChild(year);

                item.addEventListener('click', function () {
                    openLockerItemModal(award, profile);
                });
                shelfItems.appendChild(item);
            });

            shelf.appendChild(shelfItems);
            ownerLockerShelves.appendChild(shelf);
        }
    }

    function openLockerItemModal(award, profile) {
        if (!lockerItemModal || !lockerItemModalContent) return;
        lockerItemModalContent.textContent = '';

        var item = document.createElement('article');
        item.className = 'locker-item-detail locker-item-detail--' + profile.type;
        if (award.art) {
            var image = document.createElement('img');
            image.className = 'locker-item-detail__art';
            image.src = award.art;
            image.alt = profile.label + ' from the ' + award.bowl;
            item.appendChild(image);
        } else {
            var fallbackObject = document.createElement('span');
            fallbackObject.className = 'locker-item-detail__object locker-collectible__object locker-object locker-object--' + profile.type;
            fallbackObject.setAttribute('aria-hidden', 'true');
            if (profile.asset) {
                var fallbackImage = document.createElement('img');
                fallbackImage.src = profile.asset;
                fallbackImage.alt = '';
                fallbackObject.appendChild(fallbackImage);
            } else {
                fallbackObject.appendChild(document.createElement('span'));
            }
            item.appendChild(fallbackObject);
        }

        var copy = document.createElement('div');
        copy.className = 'locker-item-detail__copy';
        var eyebrow = document.createElement('p');
        eyebrow.className = 'locker-item-detail__eyebrow';
        eyebrow.textContent = award.season + ' · ' + award.round;
        var title = document.createElement('h2');
        title.id = 'locker-item-modal-title';
        title.textContent = profile.label;
        var bowl = document.createElement('p');
        bowl.className = 'locker-item-detail__bowl';
        bowl.textContent = award.bowl;
        var result = document.createElement('p');
        result.className = 'locker-item-detail__result';
        result.textContent = award.team + ' won ' + formatDecimal(award.score, 2) + '–' + formatDecimal(award.opponentScore, 2) + ' over ' + award.opponent + '.';
        copy.append(eyebrow, title, bowl, result);
        item.appendChild(copy);
        lockerItemModalContent.appendChild(item);
        lockerItemModal.showModal();
    }

    function closeLockerItemModal() {
        if (lockerItemModal && lockerItemModal.open) lockerItemModal.close();
    }

    function renderOwnerHeader(owner) {
        owner = owner || {};
        setText('team-name', displayValue(owner.team_name));
        setText('seasons', formatWholeNumber(owner.seasons_played));

        if (teamLogoImage && owner.owner_name) {
            teamLogoImage.src = 'artwork/profile-current/' + String(owner.owner_name).toLowerCase() + '.png';
            teamLogoImage.alt = displayValue(owner.team_name) + ' team profile image';
        }
    }

    function renderOverall(overall) {
        overall = overall || {};
        setText('wins', formatWholeNumber(overall.wins));
        setText('losses', formatWholeNumber(overall.losses));
        setText('ties', formatWholeNumber(overall.ties));
        setText('total-games', formatWholeNumber(overall.games_played));
        setText('win-percent', formatDecimal(overall.win_percentage, 3));
    }

    function renderSeasonSummary(summary) {
        summary = summary || {};
        setText('champs', formatWholeNumber(summary.championships));
        setText('last-place', formatWholeNumber(summary.last_place_finishes));
        setText('ten-win', formatWholeNumber(summary.ten_win_seasons));
        setText('best-record', formatCompletedRecord(summary.best_record));
        setText('worst-record', formatCompletedRecord(summary.worst_record));
        setText('average-record', formatAverageRecord(summary.average_record));
    }

    function renderStreaks(streaks) {
        streaks = streaks || {};
        var longestWin = streaks.longest_win || {};
        var longestLoss = streaks.longest_loss || {};
        var current = streaks.current || {};

        setText('longest-win-streak', formatWholeNumber(longestWin.length));
        setText('wstreakdetail', formatStreakRange(longestWin));
        setText('longest-losing-streak', formatWholeNumber(longestLoss.length));
        setText('lstreakdetail', formatStreakRange(longestLoss));
        setText('current-streak', displayValue(current.display));
    }

    function renderPoints(points) {
        points = points || {};
        renderRankedMetric(points.total_points, 'total-points', 'total-points-rank', 2, true);
        renderRankedMetric(points.average_points, 'average-points', 'average-points-rank', 2);
        renderRankedMetric(points.total_points_against, 'points-against', 'points-against-rank', 2, true);
        renderRankedMetric(
            points.average_points_against,
            'average-points-against',
            'average-points-against-rank',
            2
        );
    }

    function renderPostseason(postseason) {
        postseason = postseason || {};
        renderRankedMetric(postseason.playoff_appearances, 'playoff-appearances', 'appearances-rank', 0);
        renderRankedMetric(postseason.playoff_byes, 'playoff-byes', 'byes-rank', 0);
        renderRankedMetric(postseason.playoff_wins, 'playoff-wins', 'wins-rank', 0);
        renderRankedMetric(postseason.playoff_losses, 'playoff-losses', 'losses-rank', 0);
        renderRankedMetric(
            postseason.playoff_win_percentage,
            'playoff-win-percentage',
            'win-percentage-rank',
            3
        );
        renderRankedMetric(
            postseason.championship_appearances,
            'championship-appearances',
            'championship-appearances-rank',
            0
        );
        renderRankedMetric(postseason.championship_wins, 'champ-wins', 'champ-wins-rank', 0);
        renderRankedMetric(postseason.championship_losses, 'champ-losses', 'champ-losses-rank', 0);
        renderRankedMetric(
            postseason.championship_win_percentage,
            'champ-win-percentage',
            'champ-win-percentage-rank',
            3
        );
    }

    function renderRankedMetric(metric, valueId, rankId, decimalPlaces, useThousandsSeparator) {
        metric = metric || {};
        setText(
            valueId,
            useThousandsSeparator ?
                formatDecimalWithSeparators(metric.value, decimalPlaces) :
                formatDecimal(metric.value, decimalPlaces)
        );
        setRank(rankId, metric.display_rank);
    }

    function renderAllYears(seasons) {
        currentSeasonRows = Array.isArray(seasons) ? seasons.slice().sort(function(first, second) {
            var firstYear = Number(first.year);
            var secondYear = Number(second.year);
            return Number.isFinite(firstYear) && Number.isFinite(secondYear) ?
                secondYear - firstYear : 0;
        }) : [];
        seasonHistoryExpanded = false;
        renderSeasonHistoryRows();
    }

    function renderSeasonHistoryRows() {
        var recentCount = seasonHistoryMedia.matches ? 4 : 6;
        var visibleRows = seasonHistoryExpanded ?
            currentSeasonRows : getRecentSeasonRows(recentCount);

        seasonHistoryList.textContent = '';
        seasonHistoryEmpty.hidden = currentSeasonRows.length > 0 || ownerDropdown.value !== 'Owner';

        visibleRows.forEach(function(season) {
            seasonHistoryList.appendChild(createSeasonHistoryRow(season));
        });

        var hasAdditionalRows = currentSeasonRows.length > recentCount;
        seasonHistoryControls.hidden = !hasAdditionalRows;
        seasonHistoryToggle.setAttribute('aria-expanded', String(seasonHistoryExpanded));
        seasonHistoryToggle.textContent = seasonHistoryExpanded ?
            'Show recent seasons' :
            'View full history (' + currentSeasonRows.length + ' seasons)';
        seasonHistoryNote.textContent = seasonHistoryExpanded ?
            'All available seasons are shown.' :
            'Only the ' + recentCount + ' most recent seasons are shown.';
    }

    function createSeasonHistoryRow(season) {
        var row = document.createElement('article');
        var year = document.createElement('span');
        var imageFrame = document.createElement('span');
        var image = document.createElement('img');
        var fallback = document.createElement('span');
        var teamName = document.createElement('span');
        var record = document.createElement('span');
        var details = document.createElement('span');
        var finish = document.createElement('span');
        var regularRank = document.createElement('span');
        var selectedOwner = currentOwnerData && currentOwnerData.owner ?
            currentOwnerData.owner.owner_name : ownerDropdown.value;
        var imageSource = selectedOwner && season.year ?
            'artwork/profile-history/' + String(selectedOwner).toLowerCase() + '_' + season.year + '.png' : '';

        row.className = 'season-history__row';
        year.className = 'season-history__year';
        year.textContent = displayValue(season.year);

        imageFrame.className = 'season-history__image';
        image.className = 'season-history__image-element';
        image.alt = displayValue(season.team_name) + ' team image';
        image.hidden = true;
        fallback.className = 'season-history__fallback';
        fallback.textContent = getTeamInitials(season.team_name);
        imageFrame.appendChild(image);
        imageFrame.appendChild(fallback);

        if (imageSource) {
            image.onload = function() {
                image.hidden = false;
                imageFrame.classList.add('has-image');
            };
            image.onerror = function() {
                image.hidden = true;
                image.removeAttribute('src');
                imageFrame.classList.remove('has-image');
            };
            image.src = imageSource;
        }

        teamName.className = 'season-history__team';
        teamName.textContent = displayValue(season.team_name);
        record.className = 'season-history__record';
        record.textContent = formatSeasonRecord(season);
        finish.className = 'season-history__finish';
        finish.textContent = displayValue(season.final_finish) || '\u2014';
        regularRank.className = 'season-history__rank';
        regularRank.textContent = displayValue(season.regular_season_rank) || '\u2014';
        details.className = 'season-history__details';
        details.textContent = 'Finish ' + finish.textContent + ' \u00b7 Reg. Rank ' + regularRank.textContent;

        row.appendChild(year);
        row.appendChild(imageFrame);
        row.appendChild(teamName);
        row.appendChild(record);
        row.appendChild(finish);
        row.appendChild(regularRank);
        row.appendChild(details);
        return row;
    }

    function getRecentSeasonRows(recentCount) {
        return currentSeasonRows.slice(0, recentCount);
    }

    function toggleSeasonHistory() {
        seasonHistoryExpanded = !seasonHistoryExpanded;
        renderSeasonHistoryRows();
    }

    function resetSeasonHistory() {
        currentSeasonRows = [];
        seasonHistoryExpanded = false;
        seasonHistoryList.textContent = '';
        seasonHistoryControls.hidden = true;
        seasonHistoryToggle.setAttribute('aria-expanded', 'false');
        seasonHistoryEmpty.hidden = ownerDropdown.value !== 'Owner';
        seasonHistoryEmpty.textContent = 'Select an owner to view season history.';
    }

    function getTeamInitials(teamName) {
        var words = displayValue(teamName).trim().split(/\s+/).filter(Boolean);
        if (!words.length) {
            return '\u2014';
        }
        if (words.length === 1) {
            return words[0].replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase() || '\u2014';
        }
        return words.slice(0, 2).map(function(word) {
            return word.charAt(0).toUpperCase();
        }).join('');
    }

    function renderSelectedRecordList() {
        var category = recordDropdown.value;
        var rows = currentOwnerData && currentOwnerData.record_lists ?
            currentOwnerData.record_lists[category] : [];
        var metricHeader = scoreRecordCategories.indexOf(category) !== -1 ? 'Team Score' : 'Margin';

        recordTable.querySelector('thead th:nth-child(2)').textContent = metricHeader;
        recordTableBody.textContent = '';
        recordResults.scrollLeft = 0;

        if (!Array.isArray(rows)) {
            return;
        }

        rows.forEach(function(record) {
            var row = document.createElement('tr');
            appendCell(row, record.display_rank);
            appendCell(row, formatDecimal(record.metric_value, 2));
            appendCell(row, record.year);
            appendCell(row, formatWeek(record.week_number));
            appendCell(row, record.opponent_name);
            recordTableBody.appendChild(row);
        });
    }

    function renderH2H(h2hRows) {
        resetH2H();

        if (!Array.isArray(h2hRows) || !h2hRows.length) {
            return;
        }

        h2hRows.slice(0, 11).forEach(function(record, index) {
            var cardNumber = index + 1;
            var card = document.getElementById('owner' + cardNumber + '-name').closest('.owner-stats');
            var wins = numberOrZero(record.wins);
            var losses = numberOrZero(record.losses);
            var ties = numberOrZero(record.ties);
            var opponentName = displayValue(record.opponent_name);

            setText('owner' + cardNumber + '-name', opponentName);
            setText('owner' + cardNumber + '-wins', String(wins));
            setText('owner' + cardNumber + '-losses', String(losses));
            card.dataset.ties = String(ties);
            card.querySelector('.record').dataset.ties = String(ties);
            card.setAttribute(
                'aria-label',
                opponentName + ': ' + wins + ' wins, ' + losses + ' losses, ' +
                    ties + (ties === 1 ? ' tie' : ' ties')
            );
            applyH2HColor(card, wins, losses);
        });

        h2hGrid.hidden = false;
        h2hEmpty.hidden = true;
    }

    function applyH2HColor(card, wins, losses) {
        card.classList.remove('is-winning', 'is-losing', 'is-even');

        if (wins > losses) {
            card.classList.add('is-winning');
        } else if (losses > wins) {
            card.classList.add('is-losing');
        } else {
            card.classList.add('is-even');
        }
    }

    function resetTeamLogo(ownerName) {
        var hasOwner = ownerName && ownerName !== 'Owner';

        if (teamLogo) {
            teamLogo.classList.remove('has-image');
        }
        if (teamLogoImage) {
            teamLogoImage.hidden = true;
            teamLogoImage.removeAttribute('src');
            teamLogoImage.alt = '';
            teamLogoImage.onload = function() {
                teamLogoImage.hidden = false;
                teamLogo.classList.add('has-image');
            };
            teamLogoImage.onerror = function() {
                teamLogoImage.hidden = true;
                teamLogo.classList.remove('has-image');
            };
        }
        if (teamLogoInitials) {
            teamLogoInitials.textContent = hasOwner ? ownerName.slice(0, 2).toUpperCase() : '\u2014';
        }
    }

    function resetPage() {
        currentOwnerData = null;
        resetDataValues();
        resetTeamLogo('Owner');
        setOwnerBlankState(true);
        setBusy(false);
        hideStatus();
    }

    function setOwnerBlankState(isBlank) {
        pageMain.classList.toggle('owners-main--blank', isBlank);
    }

    function resetDataValues() {
        Object.keys(defaultValues).forEach(function(id) {
            setText(id, defaultValues[id]);
        });

        rankElementIds.forEach(function(id) {
            setRank(id, '0');
        });

        resetSeasonHistory();
        if (achievementCase) achievementCase.hidden = true;
        if (achievementGrid) achievementGrid.textContent = '';
        if (achievementCount) achievementCount.textContent = '0 unlocked';
        if (achievementHistoryContent) achievementHistoryContent.textContent = '';
        closeAchievementHistory();
        if (ownerLocker) ownerLocker.hidden = true;
        if (ownerLockerShelves) ownerLockerShelves.textContent = '';
        if (ownerLockerCount) ownerLockerCount.textContent = '0 keepsakes';
        if (ownerLockerEmpty) ownerLockerEmpty.hidden = true;
        if (lockerItemModalContent) lockerItemModalContent.textContent = '';
        closeLockerItemModal();
        recordTableBody.textContent = '';
        resetH2H();
    }

    function resetH2H() {
        h2hGrid.hidden = true;
        h2hEmpty.hidden = ownerDropdown.value !== 'Owner';

        for (var index = 1; index <= 11; index += 1) {
            var nameElement = document.getElementById('owner' + index + '-name');
            var card = nameElement.closest('.owner-stats');
            nameElement.textContent = 'Owner ' + index;
            setText('owner' + index + '-wins', '00');
            setText('owner' + index + '-losses', '00');
            card.classList.remove('is-winning', 'is-losing', 'is-even');
            card.removeAttribute('aria-label');
            delete card.querySelector('.record').dataset.ties;
            delete card.dataset.ties;
        }
    }

    function setBusy(isBusy) {
        pageMain.setAttribute('aria-busy', String(isBusy));
        recordDropdown.disabled = isBusy;
    }

    function showStatus(message, stateClass) {
        statusElement.textContent = message;
        statusElement.className = 'owner-data-status' + (stateClass ? ' ' + stateClass : '');
        statusElement.hidden = false;
    }

    function hideStatus() {
        statusElement.textContent = '';
        statusElement.className = 'owner-data-status';
        statusElement.hidden = true;
    }

    function setText(id, value) {
        var element = document.getElementById(id);
        if (element) {
            element.textContent = displayValue(value);
        }
    }

    function setRank(id, displayRank) {
        var element = document.getElementById(id);
        var valueElement = element ? element.querySelector('span') : null;
        var rankValue = displayRank === null || displayRank === undefined || displayRank === '' ?
            '\u2014' : String(displayRank);

        if (valueElement) {
            valueElement.textContent = 'Rank ' + rankValue;
        } else if (element) {
            element.textContent = 'Rank ' + rankValue;
        }
    }

    function appendCell(row, value) {
        var cell = document.createElement('td');
        cell.textContent = value === null || value === undefined || value === '' ?
            '\u2014' : String(value);
        row.appendChild(cell);
    }

    function formatCompletedRecord(record) {
        if (!record || record.wins === null || record.wins === undefined ||
                record.losses === null || record.losses === undefined) {
            return '\u2014';
        }

        var value = record.wins + ' - ' + record.losses;
        if (numberOrZero(record.ties) > 0) {
            value += ' - ' + record.ties;
        }
        return value;
    }

    function formatAverageRecord(record) {
        if (!record) {
            return '\u2014';
        }

        return formatDecimal(record.wins, 2) + ' - ' + formatDecimal(record.losses, 2);
    }

    function formatSeasonRecord(season) {
        if (!season || season.wins === null || season.wins === undefined ||
                season.losses === null || season.losses === undefined) {
            return '\u2014';
        }

        var value = season.wins + ' - ' + season.losses;
        if (numberOrZero(season.ties) > 0) {
            value += ' - ' + season.ties;
        }
        return value;
    }

    function formatStreakRange(streak) {
        if (!streak || streak.start_year === null || streak.start_year === undefined ||
                streak.start_week === null || streak.start_week === undefined ||
                streak.end_year === null || streak.end_year === undefined ||
                streak.end_week === null || streak.end_week === undefined) {
            return '\u2014';
        }

        var end = streak.start_year === streak.end_year ?
            formatWeek(streak.end_week) :
            streak.end_year + ' ' + formatWeek(streak.end_week);

        return '(' + streak.start_year + ' ' + formatWeek(streak.start_week) + ' - ' + end + ')';
    }

    function formatWeek(value) {
        return value === null || value === undefined || value === '' ?
            '\u2014' : 'Week ' + value;
    }

    function formatWholeNumber(value) {
        if (value === null || value === undefined || value === '') {
            return '\u2014';
        }

        var number = Number(value);
        return Number.isFinite(number) ? String(Math.trunc(number)) : String(value);
    }

    function formatDecimal(value, decimalPlaces) {
        if (value === null || value === undefined || value === '') {
            return '\u2014';
        }

        var number = Number(value);
        return Number.isFinite(number) ? number.toFixed(decimalPlaces) : String(value);
    }

    function formatDecimalWithSeparators(value, decimalPlaces) {
        if (value === null || value === undefined || value === '') {
            return '\u2014';
        }

        var number = Number(value);
        return Number.isFinite(number) ? number.toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        }) : String(value);
    }

    function numberOrZero(value) {
        var number = Number(value);
        return Number.isFinite(number) ? number : 0;
    }

    function displayValue(value) {
        return value === null || value === undefined ? '' : String(value);
    }
});
