document.addEventListener('DOMContentLoaded', function() {
    var dropdown1 = document.getElementById('dropdown1');
    var dropdown2 = document.getElementById('dropdown2');
    var dropdown3 = document.getElementById('dropdown3');
    var dropdown4 = document.getElementById('dropdown4');
    var dropdown5 = document.getElementById('dropdown5');
    var gameTable = document.getElementById('game-table'); // Reference to the game table
    var h4 = document.getElementById('h4');
    var h3 = document.getElementById('h3');

    // Function to initialize the UI based on the initial value of dropdown1
    function initializeUI() {
        if (dropdown1.value === 'blank') {
            gameTable.style.display = 'none';
            dropdown2.style.display = 'none';
            dropdown3.style.display = 'none';
            dropdown4.style.display = 'none';
            dropdown5.style.display = 'none';
            h4.style.display = 'none';
            h3.style.display = 'none';
        } else {
            gameTable.style.display = '';
            dropdown2.style.display = '';
            h4.style.display = '';
            h3.style.display = '';
            // Further initialization based on other dropdown values can be added here if needed
        }
    }

    dropdown1.addEventListener('change', handleDropdown1Change);
    dropdown2.addEventListener('change', handleDropdown2Change);
    dropdown3.addEventListener('change', handleDropdown3Change);

    function handleDropdown1Change() {
        if (dropdown1.value === 'blank') {
            gameTable.style.display = 'none';
            dropdown2.style.display = 'none';
            dropdown3.style.display = 'none';
            dropdown4.style.display = 'none';
            dropdown5.style.display = 'none';
            h4.style.display = 'none';
            h3.style.display = 'none';
        } else {
            gameTable.style.display = '';
            dropdown2.style.display = '';
            h4.style.display = '';
            h3.style.display = '';
            resetDropdowns();
            updateTableHeaders();
        }
    }

    function handleDropdown2Change() {
        resetLowerDropdowns();
        dropdown3.style.display = dropdown2.value === 'post-season-only' ? 'block' : 'none';
        dropdown4.style.display = 'none'; // Always reset dropdown4 when dropdown2 changes
        dropdown5.style.display = 'none'; // Always reset dropdown5 when dropdown2 changes
    }

    function handleDropdown3Change() {
        dropdown4.style.display = dropdown3.value === 'playoffs-only' ? 'block' : 'none';
        dropdown5.style.display = dropdown3.value === 'consolation-only' ? 'block' : 'none';
    }

    function resetLowerDropdowns() {
        dropdown3.style.display = 'none';
        dropdown3.selectedIndex = 0;
        dropdown4.style.display = 'none';
        dropdown4.selectedIndex = 0;
        dropdown5.style.display = 'none';
        dropdown5.selectedIndex = 0;
    }

    function resetDropdowns() {
        dropdown2.selectedIndex = 0;
        resetLowerDropdowns();
    }

    function updateTableHeaders() {
        var headers = ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"]; // Default headers
        var widths = ["20%", "20%", "20%", "20%", "20%"]; // Default widths

        // Adjust headers and widths based on dropdown1's selection
        if (dropdown1.value === 'highest-team-score') {
            headers = ["Rank", "Score", "Owner", "Year", "Week", "Opponent"];
            widths = ["8%", "18%", "18%", "18%", "18%", "18%"];
        }

        if (dropdown1.value === 'lowest-team-score') {
            headers = ["Rank", "Score", "Owner", "Year", "Week", "Opponent"];
            widths = ["8%", "18%", "18%", "18%", "18%", "18%"];
        }

        if (dropdown1.value === 'biggest-blowouts') {
            headers = ["Rank", "Margin", "Owner", "Year", "Week", "Opponent", "Score"];
            widths = ["6%", "15%", "15%", "15%", "15%", "15%", "19%"];
        }

        if (dropdown1.value === 'closest-wins') {
            headers = ["Rank", "Margin", "Owner", "Year", "Week", "Opponent", "Score"];
            widths = ["6%", "15%", "15%", "15%", "15%", "15%", "19%"];
        }

        if (dropdown1.value === 'least-winning') {
            headers = ["Rank", "Score", "Owner", "Year", "Week", "Opponent", "Score"];
            widths = ["6%", "15%", "15%", "15%", "15%", "15%", "19%"];
        }

        if (dropdown1.value === 'most-losing') {
            headers = ["Rank", "Score", "Owner", "Year", "Week", "Opponent", "Score"];
            widths = ["6%", "15%", "15%", "15%", "15%", "15%", "19%"];
        }

        if (dropdown1.value === 'highest-bench') {
            headers = ["Rank", "Bench", "Owner", "Year", "Week", "Opponent"];
            widths = ["8%", "11%", "11%", "11%", "11%", "11%"];
        }

        if (dropdown1.value === 'highest-scoring-game') {
            headers = ["Rank", "Combined", "Year", "Week", "Owners", "Score"];
            widths = ["8%", "11%", "11%", "11%", "22%", "18%"];

        }

        if (dropdown1.value === 'lowest-scoring-game') {
            headers = ["Rank", "Combined", "Year", "Week", "Owners", "Score"];
            widths = ["8%", "11%", "11%", "11%", "22%", "18%"];
        }

        var thead = document.getElementById('game-table').getElementsByTagName('thead')[0];
        var row = thead.getElementsByTagName('tr')[0];
        row.innerHTML = ''; // Clear existing headers

        headers.forEach(function(header, index) {
            var th = document.createElement('th');
            th.textContent = header;
            th.style.width = widths[index];
            row.appendChild(th);
        });
    }

    // Initial setup
    initializeUI();
    resetDropdowns();
    updateTableHeaders();
});
