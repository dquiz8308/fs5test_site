const bowlAccordion = document.querySelector("[data-bowl-accordion]");

if (bowlAccordion) {
  const categoryOrder = [
    {
      name: "Playoffs",
      items: [
        "1st Place Game",
        "3rd Place Game",
        "5th Place Game",
        "Playoff Semifinal (#1 seed)",
        "Playoff Semifinal (#2 seed)",
        "Playoff Quarterfinal (4 v. 5)",
        "Playoff Quarterfinal (3 v. 6)"
      ]
    },
    {
      name: "Consolation",
      items: [
        "7th Place Game",
        "9th Place Game",
        "Consolation Semifinal (#1 seed)",
        "Consolation Semifinal (#2 seed)",
        "11th Place Game"
      ]
    },
    {
      name: "Special",
      items: ["In-Season Tournament", "Pro Bowl"]
    }
  ];

  const sectionsByTitle = new Map();

  bowlAccordion.querySelectorAll(".bowl-section").forEach((section) => {
    const title = section.querySelector(".bowl-trigger__title").textContent.trim();
    sectionsByTitle.set(title, section);
  });

  const layout = document.createElement("div");
  layout.className = "bowl-layout";

  const rail = document.createElement("aside");
  rail.className = "bowl-rail";
  rail.setAttribute("aria-labelledby", "bowl-categories-title");
  rail.innerHTML = '<h2 class="bowl-rail__title" id="bowl-categories-title">Bowl Categories</h2>';

  const history = document.createElement("div");
  history.className = "bowl-history";
  history.setAttribute("aria-live", "polite");

  const entries = [];

  function getSeasonYear(card) {
    const year = Number.parseInt(card.querySelector(".season-card__year")?.textContent, 10);
    return Number.isFinite(year) ? year : Number.NEGATIVE_INFINITY;
  }

  function initializeSeasonHistory(panel) {
    const seasonList = panel.querySelector(".season-list");

    if (!seasonList) {
      return;
    }

    const cards = Array.from(seasonList.children)
      .filter((child) => child.classList.contains("season-card"))
      .sort((cardA, cardB) => getSeasonYear(cardB) - getSeasonYear(cardA));

    cards.forEach((card) => seasonList.append(card));

    if (cards.length <= 2) {
      return;
    }

    const olderGames = document.createElement("div");
    const toggle = document.createElement("button");
    const olderGamesId = `${panel.id}-older-games`;

    olderGames.className = "season-list__older";
    olderGames.id = olderGamesId;
    olderGames.hidden = true;
    cards.slice(2).forEach((card) => olderGames.append(card));

    toggle.className = "season-history-toggle";
    toggle.type = "button";
    toggle.textContent = "Show Older Games";
    toggle.setAttribute("aria-controls", olderGamesId);
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
      const willExpand = toggle.getAttribute("aria-expanded") !== "true";

      olderGames.hidden = !willExpand;
      toggle.setAttribute("aria-expanded", String(willExpand));
      toggle.textContent = willExpand ? "Show Less" : "Show Older Games";

      if (!willExpand) {
        window.requestAnimationFrame(() => {
          const heading = panel.querySelector(".bowl-panel__header");
          const headingBounds = heading?.getBoundingClientRect();
          const headingIsVisible = headingBounds
            && headingBounds.bottom > 0
            && headingBounds.top < window.innerHeight;

          if (heading && !headingIsVisible) {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            heading.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
              block: "start"
            });
          }
        });
      }
    });

    seasonList.append(olderGames, toggle);
  }

  categoryOrder.forEach((category) => {
    const label = document.createElement("h3");
    label.className = "bowl-group-label";
    label.textContent = category.name;
    rail.append(label);

    category.items.forEach((title) => {
      const section = sectionsByTitle.get(title);
      const trigger = section.querySelector(".bowl-trigger");
      const panel = section.querySelector(".bowl-panel");
      const heading = document.createElement("div");

      trigger.dataset.group = category.name.toLowerCase();
      trigger.dataset.placeGame = String(title.includes("Place Game"));
      heading.className = "bowl-panel__header";
      heading.innerHTML = `<h2 class="bowl-panel__title">${title}</h2>`;
      panel.prepend(heading);
      initializeSeasonHistory(panel);

      rail.append(trigger);
      history.append(panel);
      entries.push({ trigger, panel });
      section.remove();
    });
  });

  const historyEmptyState = document.createElement("div");
  historyEmptyState.className = "bowl-history__empty";
  historyEmptyState.innerHTML = `
    <span class="bowl-history__empty-icon" aria-hidden="true">★</span>
    <p>Select a Bowl Game</p>`;
  history.append(historyEmptyState);

  layout.append(rail, history);
  bowlAccordion.replaceWith(layout);

  function closeEntry(entry) {
    entry.trigger.setAttribute("aria-expanded", "false");
    entry.panel.setAttribute("aria-hidden", "true");
    entry.panel.classList.remove("is-active");
  }

  function openEntry(entry) {
    entries.forEach(closeEntry);
    entry.trigger.setAttribute("aria-expanded", "true");
    entry.panel.setAttribute("aria-hidden", "false");
    entry.panel.classList.add("is-active");
    historyEmptyState.hidden = true;
  }

  entries.forEach((entry) => {
    entry.trigger.addEventListener("click", () => {
      const wasOpen = entry.trigger.getAttribute("aria-expanded") === "true";
      entries.forEach(closeEntry);
      if (wasOpen) {
        historyEmptyState.hidden = false;
      } else {
        openEntry(entry);
      }
    });
  });

  if (entries.length > 0) {
    openEntry(entries[0]);
  } else {
    historyEmptyState.hidden = false;
  }
}
