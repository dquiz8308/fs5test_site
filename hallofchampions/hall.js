document.addEventListener("DOMContentLoaded", () => {
    const hall = document.querySelector(".champions-hall");

    if (!hall) {
        return;
    }

    const entries = hall.querySelectorAll(".champion");

    if (!entries.length) {
        return;
    }

    const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const reducedMotionEnabled = reducedMotionQuery.matches;
    const intersectionObserverSupported =
        "IntersectionObserver" in window;

    /*
        Keep everything visible when reduced motion is enabled
        or IntersectionObserver is unsupported.
    */
    if (
        reducedMotionEnabled ||
        !intersectionObserverSupported
    ) {
        entries.forEach((entry) => {
            entry.classList.add("is-visible");
        });

        return;
    }

    /*
        Reveal styling is activated only after JavaScript
        confirms that IntersectionObserver is available.
    */
    hall.classList.add("champions-reveal-active");

    const observer = new IntersectionObserver(
        (observedEntries, currentObserver) => {
            observedEntries.forEach((observedEntry) => {
                if (!observedEntry.isIntersecting) {
                    return;
                }

                observedEntry.target.classList.add(
                    "is-visible"
                );

                currentObserver.unobserve(
                    observedEntry.target
                );
            });
        },
        {
            root: null,
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    entries.forEach((entry) => {
        observer.observe(entry);
    });
});