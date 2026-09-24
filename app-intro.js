(function (window, document) {
    'use strict';

    var intro = document.getElementById('app-intro');
    if (!intro) return;

    var sessionKey = 'fs5_opening_seen';
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var mobile = window.matchMedia('(max-width: 900px) and (pointer: coarse)').matches;
    var installed = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    var navigation = window.performance && window.performance.getEntriesByType('navigation')[0];
    var seen = false;
    try {
        seen = window.sessionStorage.getItem(sessionKey) === '1';
    } catch (error) {
        // Storage can be unavailable in private browsing. The intro still expires.
    }

    // Internal Home links and back/forward visits should return directly to Home,
    // including when session storage is unavailable.
    var internalVisit = false;
    try {
        internalVisit = Boolean(document.referrer) && new URL(document.referrer).origin === window.location.origin;
    } catch (error) {}

    if ((!mobile && !installed) || reducedMotion.matches || seen || internalVisit ||
        (navigation && navigation.type === 'back_forward')) {
        intro.remove();
        return;
    }

    var shield = intro.querySelector('img');
    var started = false;
    var finished = false;
    var finishTimer;
    // Never leave an overlay waiting for images, APIs, or the window load event.
    var safetyTimer = window.setTimeout(function () { dismiss(true); }, 3500);

    function dismiss(immediate) {
        if (finished) return;
        finished = true;
        window.clearTimeout(finishTimer);
        window.clearTimeout(safetyTimer);
        document.removeEventListener('focusin', onFocus);
        if (immediate) {
            intro.remove();
        } else {
            intro.classList.add('app-intro--leaving');
            window.setTimeout(function () { intro.remove(); }, 300);
        }
    }

    function onFocus(event) {
        if (!intro.contains(event.target)) dismiss(true);
    }

    function start() {
        if (started || finished) return;
        if (!shield.naturalWidth) { dismiss(true); return; }
        started = true;
        try { window.sessionStorage.setItem(sessionKey, '1'); } catch (error) {}
        intro.hidden = false;
        finishTimer = window.setTimeout(function () { dismiss(false); }, 2200);
    }

    intro.addEventListener('click', function () { dismiss(false); });
    document.addEventListener('focusin', onFocus);
    window.addEventListener('pagehide', function () { dismiss(true); }, { once: true });
    window.addEventListener('pageshow', function (event) {
        if (event.persisted) dismiss(true);
    });
    if (reducedMotion.addEventListener) {
        reducedMotion.addEventListener('change', function (event) {
            if (event.matches) dismiss(true);
        });
    }
    shield.addEventListener('load', start, { once: true });
    shield.addEventListener('error', function () { dismiss(true); }, { once: true });
    if (shield.complete) start();
}(window, document));
