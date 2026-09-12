(function (window, document) {
    "use strict";

    var permanentText = "FastStrongFive";
    var foundedText = "Founded 2012";
    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function getOrdinalSuffix(day) {
        var remainder100 = day % 100;

        if (remainder100 >= 11 && remainder100 <= 13) {
            return "th";
        }

        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    function formatDateOnly(value) {
        var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || "").trim());

        if (!match) {
            return null;
        }

        var year = Number(match[1]);
        var month = Number(match[2]);
        var day = Number(match[3]);
        var candidate = new Date(Date.UTC(year, month - 1, day));

        if (
            candidate.getUTCFullYear() !== year ||
            candidate.getUTCMonth() !== month - 1 ||
            candidate.getUTCDate() !== day
        ) {
            return null;
        }

        return monthNames[month - 1] + " " + day + getOrdinalSuffix(day) + ", " + year;
    }

    function renderStatus(status, detailText) {
        status.replaceChildren(document.createTextNode(foundedText));

        if (!detailText) {
            return;
        }

        var separator = document.createElement("span");
        separator.className = "footer-separator";
        separator.setAttribute("aria-hidden", "true");
        separator.textContent = "\u00b7";

        status.appendChild(document.createTextNode(" "));
        status.appendChild(separator);
        status.appendChild(document.createTextNode(" " + detailText));
    }

    function initializeFooterStatus() {
        var footer = document.querySelector("footer");

        if (!footer) {
            return;
        }

        var permanent = footer.querySelector("[data-footer-permanent]");
        var status = footer.querySelector("[data-footer-status]");

        if (!permanent || !status) {
            return;
        }

        permanent.textContent = permanentText;
        status.dataset.state = "loading";
        renderStatus(status, "Checking update status\u2026");

        try {
            if (!window.fs5Supabase || typeof window.fs5Supabase.getClient !== "function") {
                throw new Error("Shared Supabase configuration is unavailable.");
            }

            window.fs5Supabase.getClient()
                .rpc("site_website_data_status")
                .then(function (result) {
                    if (result.error) {
                        throw result.error;
                    }

                    var row = Array.isArray(result.data) ? result.data[0] : result.data;
                    var formatted = formatDateOnly(row && row.data_updated_through);

                    if (!formatted) {
                        throw new Error("The website data-status response did not include a valid date.");
                    }

                    status.dataset.state = "ready";
                    renderStatus(status, "Last Updated " + formatted);
                })
                .catch(function (error) {
                    status.dataset.state = "unavailable";
                    renderStatus(status, "");
                    window.console.warn("Footer update status is unavailable.", error);
                });
        } catch (error) {
            status.dataset.state = "unavailable";
            renderStatus(status, "");
            window.console.warn("Footer update status is unavailable.", error);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeFooterStatus);
    } else {
        initializeFooterStatus();
    }
}(window, document));
