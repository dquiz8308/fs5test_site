/* Verified awards only. See docs/LOCKER_PPR_MEDALS.md before adding records.
   Empty until full-season leaders and final FS5 ownership are verified. */
window.FS5_LOCKER_PPR_MEDALS = [];

(function () {
    'use strict';
    var namespace = 'http://www.w3.org/2000/svg';
    window.createFS5PprMedal = function (award) {
        var svg = document.createElementNS(namespace, 'svg');
        svg.setAttribute('viewBox', '0 0 1024 1024');
        svg.setAttribute('class', 'locker-ppr-medal');
        svg.setAttribute('aria-hidden', 'true');
        var image = document.createElementNS(namespace, 'image');
        image.setAttribute('href', 'artwork/locker/ppr-leader-gold.png');
        image.setAttribute('width', '1024');
        image.setAttribute('height', '1024');
        svg.appendChild(image);
        [[award.position, 670, 52], [award.player_name, 735, 38], [String(award.season), 790, 34]].forEach(function (line) {
            var text = document.createElementNS(namespace, 'text');
            text.setAttribute('x', '512');
            text.setAttribute('y', line[1]);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-family', 'Georgia, serif');
            text.setAttribute('font-weight', 'bold');
            text.setAttribute('font-size', line[2]);
            text.setAttribute('fill', '#503006');
            if (String(line[0]).length > 20) {
                text.setAttribute('textLength', '520');
                text.setAttribute('lengthAdjust', 'spacingAndGlyphs');
            }
            text.textContent = line[0];
            svg.appendChild(text);
        });
        return svg;
    };
}());
