document.addEventListener('DOMContentLoaded', () => {
    // Mapping of dropdown classes to their corresponding header classes
    const dropdownToHeaderMap = {
        'single-game-dropdown': 'single-game-details',
        'position-totals-dropdown': 'position-total-details',
        'highest-position-dropdown': 'highest-position-details',
        'nonpoint-dropdown': 'nonpoint-details',

    };

    // Placeholder texts for each option and dropdown
    const optionTexts = {
        'single-game-dropdown': {
            'high-score': '**Highest team scores throughout the year (Reg + Playoffs)',
            'low-score': '**Lowest team scores throughout the year (Reg + Playoffs)',
            'high-margin': '**Biggest Blowouts (Highest margin of victory) throughout the year (Reg + Playoffs)',
            'low-margin': '**Closest Games (Lowest margin of victory) throughout the year (Reg + Playoffs)',
            'least-win': '**Lowest scores while still winning matchup (Reg + Playoffs)',
            'most-lose': '**Highest scores while still losing matchup (Reg + Playoffs)',
            'high-comb': '**Highest scoring games or most combined points from both teams (Reg + Playoffs)',
            'low-comb': '**Lowest scoring games or least combined points from both teams (Reg + Playoffs)',
            'high-bench': '**Highest bench points in a single week (Reg + Playoffs)',
            'high-tds': '**Highest number of Touchdowns scored in a single week. Only tracked from 2019 - Current (Reg + Playoffs)',

        },
        'position-totals-dropdown': {
            'total-qb': '**Total Quarterback points scored throughout season.',
            'total-rb': '**Total Runningback points scored throughout season.',
            'total-wr': '**Total Wide Reciever points scored throughout season.',
            'total-te': '**Total Tide End points scored throughout season.',
            'total-def': '**Total Defenseive points scored throughout season.',
            'total-k': '**Total Kicker points scored throughout season.',
            'bench': '**Total Bench points scored throughout season.',
            'tds': '**Total touchdowns scored throughout season.',
            'mnf': '**Total Monday Night Football points scored throughout season. Not seperated out between playoffs and reg. (Reg + Post)',
            'tnf': '**Total Thursday Night Football points scored throughout season. Not seperated out between playoffs and reg. (Reg + Post)',

        },
        'highest-position-dropdown': {
            'high-all': '**Highest player scores from any position',
            'high-qb': '**Highest Quarterback scores',
            'high-rb': '**Highest Runningback scores',
            'high-wr': '**Highest Wide Reciever scores',
            'high-te': '**Highest Tight End scores',
            'high-k': '**Highest Kicker Scores',
            'high-def': '**Highest defensive scores',

        },
        'nonpoint-dropdown': {
            '1rank': 'Number of weeks a member was ranked at #1. Stat only tracked from 2019 (when the League switched from H2H to PF as the standing tiebreaker)',
            'top-team': '**Number of weeks a member had the highest scoring team in the League',
            'bottom-team': '**Number of weeks a member had the lowest scoring team in the League',
            'close-games': '**Number of close games a member has had (Decided by 10 points or less, win or lose)',
            'coaching-calls': '**Number of games a member could have won, had he had a different lineup from his bench',
        },

    };

    // Function to update header text based on selected dropdown option
    function updateHeaderText(dropdownClass) {
        const dropdown = document.querySelector(`.${dropdownClass}`);
        const selectedOption = dropdown.value;
        const headerClass = dropdownToHeaderMap[dropdownClass];
        const header = document.querySelector(`.${headerClass}`);
        
        if (header) {
            const texts = optionTexts[dropdownClass];
            header.textContent = texts[selectedOption] || '*Example text demonstrating further context around a selected stat';
        }
    }

    // Adding event listeners to each dropdown and updating headers initially
    for (const dropdownClass in dropdownToHeaderMap) {
        const dropdown = document.querySelector(`.${dropdownClass}`);
        if (dropdown) {
            dropdown.addEventListener('change', () => updateHeaderText(dropdownClass));
            dropdown.addEventListener('season-options-rebuilt', () => updateHeaderText(dropdownClass));
            // Update header text initially
            updateHeaderText(dropdownClass);
        } else {
            console.error(`Dropdown with class ${dropdownClass} not found.`);
        }
    }
});
