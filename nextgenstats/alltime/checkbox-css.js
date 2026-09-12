document.addEventListener('DOMContentLoaded', () => {
    // Function to update checkbox styles based on dropdown selection
    function updateCheckboxStyles() {
        const dropdown = document.querySelector('.season-totals-dropdown');
        const selectedOption = dropdown.value;
        
        const checkboxes = document.querySelectorAll('.checkbox-container label, .checkbox-container input[type="checkbox"]');
        
        if (selectedOption === 'top-points-for' || selectedOption === 'top-points-against') {
            checkboxes.forEach(checkbox => {
                checkbox.style.display = 'inline-block';
            });
        } else {
            checkboxes.forEach(checkbox => {
                checkbox.style.display = '';
            });
        }
    }

    // Initial call to update styles based on the default dropdown selection
    updateCheckboxStyles();

    // Adding event listener to the dropdown to update styles on change
    const dropdown = document.querySelector('.season-totals-dropdown');
    dropdown.addEventListener('change', updateCheckboxStyles);
});
