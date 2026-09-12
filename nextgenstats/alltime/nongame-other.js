document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.querySelector('.season-totals-dropdown');
    var controls = {
        active: document.getElementById('season-active'),
        combined: document.getElementById('season-combined'),
        regular: document.getElementById('season-regular'),
        post: document.getElementById('season-post')
    };

    function setVisible(control, visible) {
        control.style.display = visible ? 'inline-block' : 'none';
        var label = document.querySelector('label[for="' + control.id + '"]');
        if (label) {
            label.style.display = visible ? 'inline-block' : 'none';
        }
    }

    function updateCheckboxes(category) {
        Object.keys(controls).forEach(function(key) {
            controls[key].checked = false;
        });

        var usesActiveFilter = category === 'top-points-for' || category === 'top-points-against';
        setVisible(controls.active, usesActiveFilter);
        setVisible(controls.combined, !usesActiveFilter);
        setVisible(controls.regular, !usesActiveFilter);
        setVisible(controls.post, !usesActiveFilter);

        if (!usesActiveFilter) {
            controls.combined.checked = true;
        }
    }

    function manageScopeCheckboxes(event) {
        if (!event.target.checked || event.target === controls.active) {
            return;
        }

        ['combined', 'regular', 'post'].forEach(function(key) {
            if (controls[key] !== event.target) {
                controls[key].checked = false;
            }
        });
    }

    dropdown.addEventListener('change', function(event) {
        updateCheckboxes(event.target.value);
    });

    Object.keys(controls).forEach(function(key) {
        controls[key].addEventListener('change', manageScopeCheckboxes);
    });

    updateCheckboxes(dropdown.value);
});
