document.addEventListener('DOMContentLoaded', () => {
    // Mapping of dropdown classes to their corresponding header classes
    const dropdownToHeaderMap = {
        'season-totals-dropdown': 'season-total-details',
        'owner-totals-dropdown': 'owner-total-details',
        'playoff-records-dropdown': 'playoff-records-details',
        'consolation-records-dropdown': 'consolation-records-details',
        'championship-records-dropdown': 'championship-records-details',
        'lastplace-records-dropdown': 'lastplace-records-details'
    };

    // Placeholder texts for each option and dropdown
    const optionTexts = {
        'season-totals-dropdown': {
            'top-points-for': '*Most PF in a Regular Season (PPR Era Only)',
            'top-points-against': '*Most PAAAA in a Regular Season (PPR Era Only)', 
	    'season-tds': '*Most TDs in a Season (Stat only tracked since 2019)',
	    'season-qb': '*Most QB points in a Season (PPR Era Only)',
	    'season-rb': '*Most RB points in a Season (PPR Era Only)',
	    'season-wr': '*Most WR points in a Season (PPR Era Only)',
	    'season-te': '*Most TE points in a Season (PPR Era Only)',
	    'season-k': '*Most Kicker points in a Season (All years, STD + PPR)',
	    'season-def': '*Most Defensive points in a Season (All Years, STD +PPR)',

        },
        'owner-totals-dropdown': {
            'owner-tds': '*Total Career Touchdowns, REG + POST (Stat only tracked since 2019)',
            'owner-close': '*Total Career Close Games (Decided by 10 points or less, PPR Era Only)',
            'owner-top': '*Total Career Weeks as the Highest Scoring Team in the League (All years)',
            'owner-bottom': '*Total Career Weeks as the Lowest Scoring Team in the League (All years)',
            'owner-1rank': '*Total Career Weeks as the #1 ranked team in the League (#1 seed), using historical end-of-week ranks from 2012–2025',
            'win-streaks': '*Longest winning streaks (All years)',
            'lose-streaks': '*Longest losing streaks (All years)',


        },
        'playoff-records-dropdown': {
            'playoff-app': '*Total Playoff Appearances (Career)',
            'playoff-percent': '*Percentage of years that an owner has made the playoffs with the number of seasons played (Career)', 
            'playoff-byes': '*Total number of playoff byes (#1 or #2 seed) a member has obtained (Career)',
            'long-po-streaks': '*Longest Playoff Appearance Streaks (Career)',
            'current-po-streaks': '*All current Playoff Appearance Streaks',
            'po-wins-winner': '*Most Playoff Wins in the winners bracket only (Quarter Finals, Semi-Finals, Championships) (Career)',
            'po-wins-all': '*Most Playoff Wins including all Playoff Games (Quarter Finals, Semi-Finals, Championships, 3rd Place Game, 5th Place Game) (Career)',
            'lstreak-make': '*Longest Losing Streak to start the Season and still make the playoffs (All Years)',
            'wstreak-miss': '*Longest Winning Streak to start the Season and still miss the playoffs (All Years)',

        },
        'consolation-records-dropdown': {
            'consolation-app': '*Total Consolation Appearances (Career)',
            'consolation-percent': '*Percentage of years that an owner has made the Consolation playoffs with the number of seasons played (Career)', 
            'consolation-byes': '*Total number of consolation byes(#7 or #8 seed) a member has obtained (Career)',
            'long-con-streaks': '*Longest Consolation Playoff Appearance Streaks (Career)',
            'current-con-streaks': '*All current Consolation Playoff Appearance Streaks',

        },
        'championship-records-dropdown': {
            'championship-app': '*Total Championship Appearances (Career)',
            'championship-wins': '*Total Championship Wins (Career)', 
            'championship-losses': '*Total Championship Losses (Career)',
            'long-championship-streaks': '*Longest Championship Appearance Streaks (All Years)',
            'championship-percent': '*Highest Championship Win Percentages (Career)',

        },
        'lastplace-records-dropdown': {
            'lastplace-app': '*Total Last Place Game Appearances (Career)',
            'lastplace-losses': '*Total Last Place Game losses, and the owner ended in last place (Career)', 
            'lastplace-wins': '*Total Last Place Game wins, and the owner avoided last place (Career)',
            'long-lastplace-streaks': '*Longest Last Place Game Appearance Streaks (All Years)',
            'lastplace-percent': '*Highest Last Place Game Lose Percentages (Career)',

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
            // Update header text initially
            updateHeaderText(dropdownClass);
        } else {
            console.error(`Dropdown with class ${dropdownClass} not found.`);
        }
    }
});
