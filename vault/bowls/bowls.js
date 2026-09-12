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

  historyEmptyState.hidden = false;
}
