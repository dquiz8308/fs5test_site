(function () {
    "use strict";

    function initializeSiteNavigation() {
        const nav = document.querySelector(".site-nav");
        const menuToggle = document.querySelector(".menu-toggle");

        if (!nav || !menuToggle) {
            return;
        }

        const mobileQuery = window.matchMedia("(max-width: 768px)");
        const submenuGroups = Array.from(nav.querySelectorAll(".site-nav__item--has-submenu"));
        const disclosureButtons = Array.from(nav.querySelectorAll(".site-nav__disclosure"));
        const navigationLinks = Array.from(nav.querySelectorAll("a[href]"));

        function isMobile() {
            return mobileQuery.matches;
        }

        function getDisclosure(group) {
            return group.querySelector(":scope > .site-nav__category-row .site-nav__disclosure");
        }

        function closeSubmenu(group, restoreFocus) {
            if (!group) {
                return;
            }

            const disclosure = getDisclosure(group);
            group.classList.remove("is-submenu-open");

            if (disclosure) {
                disclosure.setAttribute("aria-expanded", "false");
                if (restoreFocus) {
                    disclosure.focus();
                }
            }
        }

        function closeAllSubmenus(exceptGroup) {
            submenuGroups.forEach(function (group) {
                if (group !== exceptGroup) {
                    closeSubmenu(group, false);
                }
            });
        }

        function openSubmenu(group) {
            if (!group) {
                return;
            }

            const disclosure = getDisclosure(group);
            closeAllSubmenus(group);
            group.classList.add("is-submenu-open");

            if (disclosure) {
                disclosure.setAttribute("aria-expanded", "true");
            }
        }

        function setMenuAccessibility(isOpen) {
            if (!isMobile()) {
                nav.removeAttribute("aria-hidden");
                nav.removeAttribute("inert");
                return;
            }

            nav.setAttribute("aria-hidden", isOpen ? "false" : "true");
            if (isOpen) {
                nav.removeAttribute("inert");
            } else {
                nav.setAttribute("inert", "");
            }
        }

        function openMobileMenu() {
            if (!isMobile() || nav.classList.contains("is-open")) {
                return;
            }

            nav.classList.add("is-open");
            menuToggle.classList.add("is-active");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
            document.body.classList.add("nav-menu-open");
            setMenuAccessibility(true);

            const firstLink = nav.querySelector(".site-nav__link");
            if (firstLink) {
                window.requestAnimationFrame(function () {
                    window.requestAnimationFrame(function () {
                        firstLink.focus();
                    });
                });
            }
        }

        function closeMobileMenu(restoreFocus) {
            const wasOpen = nav.classList.contains("is-open");
            nav.classList.remove("is-open");
            menuToggle.classList.remove("is-active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            document.body.classList.remove("nav-menu-open");
            closeAllSubmenus();
            setMenuAccessibility(false);

            if (restoreFocus && wasOpen) {
                menuToggle.focus();
            }
        }

        function resetForViewport() {
            closeAllSubmenus();
            nav.classList.remove("is-open");
            menuToggle.classList.remove("is-active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            document.body.classList.remove("nav-menu-open");
            setMenuAccessibility(false);
        }

        function getMobileFocusableItems() {
            const candidates = [menuToggle].concat(
                Array.from(nav.querySelectorAll("a[href], button:not([disabled])"))
            );

            return candidates.filter(function (element) {
                const submenu = element.closest(".site-nav__submenu");
                if (submenu && !submenu.parentElement.classList.contains("is-submenu-open")) {
                    return false;
                }
                return element.getClientRects().length > 0;
            });
        }

        menuToggle.addEventListener("click", function () {
            if (nav.classList.contains("is-open")) {
                closeMobileMenu(true);
            } else {
                openMobileMenu();
            }
        });

        disclosureButtons.forEach(function (button) {
            button.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    button.click();
                }
            });

            button.addEventListener("click", function (event) {
                event.stopPropagation();
                const group = button.closest(".site-nav__item--has-submenu");
                const isOpen = group.classList.contains("is-submenu-open");

                if (isOpen) {
                    closeSubmenu(group, false);
                } else {
                    openSubmenu(group);
                }
            });
        });

        submenuGroups.forEach(function (group) {
            group.addEventListener("focusin", function (event) {
                if (!isMobile() && !event.target.closest(".site-nav__disclosure")) {
                    openSubmenu(group);
                }
            });

            group.addEventListener("focusout", function () {
                if (!isMobile()) {
                    window.setTimeout(function () {
                        if (!group.contains(document.activeElement)) {
                            closeSubmenu(group, false);
                        }
                    }, 0);
                }
            });
        });

        navigationLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (isMobile()) {
                    closeMobileMenu(false);
                } else {
                    closeAllSubmenus();
                }
            });
        });

        document.addEventListener("click", function (event) {
            if (!nav.contains(event.target) && event.target !== menuToggle) {
                closeAllSubmenus();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                const openGroup = nav.querySelector(".site-nav__item--has-submenu.is-submenu-open");
                if (openGroup) {
                    event.preventDefault();
                    closeSubmenu(openGroup, true);
                    return;
                }

                if (isMobile() && nav.classList.contains("is-open")) {
                    event.preventDefault();
                    closeMobileMenu(true);
                }
                return;
            }

            if (event.key !== "Tab" || !isMobile() || !nav.classList.contains("is-open")) {
                return;
            }

            const focusableItems = getMobileFocusableItems();
            if (!focusableItems.length) {
                return;
            }

            const first = focusableItems[0];
            const last = focusableItems[focusableItems.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        if (typeof mobileQuery.addEventListener === "function") {
            mobileQuery.addEventListener("change", resetForViewport);
        } else {
            mobileQuery.addListener(resetForViewport);
        }

        resetForViewport();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeSiteNavigation);
    } else {
        initializeSiteNavigation();
    }
}());
