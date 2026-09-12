const PRO_BOWL_DIVISIONS = [
  {
    id: "smokey-road",
    name: "Smokey Road",
    logo: "../../divisions/artwork/smokey-road.png",
    accent: "#df7b3d",
    glow: "rgba(223, 123, 61, 0.22)"
  },
  {
    id: "evans",
    name: "Evans",
    logo: "../../divisions/artwork/evans.png",
    accent: "#d4af52",
    glow: "rgba(212, 175, 82, 0.22)"
  },
  {
    id: "madras",
    name: "Madras",
    logo: "../../divisions/artwork/madras.png",
    accent: "#8a73d6",
    glow: "rgba(138, 115, 214, 0.22)"
  }
];

const PRO_BOWL_POSITIONS = [
  "QB",
  "RB1",
  "RB2",
  "WR1",
  "WR2",
  "TE",
  "FLEX",
  "K",
  "DST"
];

const PRO_BOWL_YEARS = {
  2025: {
    year: 2025,
    unofficial: true,

    // Options: "upcoming", "in-progress", or "complete"
    status: "complete",

    // Exact gold wording displayed in the champion card.
    championLabel: "2025 UNOFFICIAL PRO BOWL CHAMPION",

    // Used before a champion has been determined.
    upcomingLabel: "2025 GOLDEN GRIDIRON CLASSIC",

    statusMessage: "The division lineups are being finalized.",

    winnerDivisionId: "smokey-road",

    // Change enabled to true to display an MVP.
    mvp: {
      enabled: true,
      player: "Christian McCaffrey",
      fantasyTeam: "The Rome Man Empire",
      points: 28.1
    },

    standings: [
      {
        divisionId: "smokey-road",
        rank: 1,
        score: 144.98,
        touchdowns: null,
        submissionStatus: "Lineup Submitted"
      },
      {
        divisionId: "evans",
        rank: 2,
        score: 134.8,
        touchdowns: null,
        submissionStatus: "Lineup Submitted"
      },
      {
        divisionId: "madras",
        rank: 3,
        score: 126.98,
        touchdowns: null,
        submissionStatus: "Lineup Submitted"
      }
    ],

    lineups: {
      "smokey-road": [
        {
          position: "QB",
          player: "Dak Prescott",
          nflTeam: "DAL",
          fantasyTeam: "FS5 Penitentiary",
          points: 22.68
        },
        {
          position: "RB1",
          player: "De'Von Achane",
          nflTeam: "MIA",
          fantasyTeam: "Georgassic Park",
          points: 14.2
        },
        {
          position: "RB2",
          player: "Christian McCaffrey",
          nflTeam: "SF",
          fantasyTeam: "The Rome Man Empire",
          points: 28.1
        },
        {
          position: "WR1",
          player: "Jaxon Smith-Njigba",
          nflTeam: "SEA",
          fantasyTeam: "The Rome Man Empire",
          points: 16.2
        },
        {
          position: "WR2",
          player: "George Pickens",
          nflTeam: "DAL",
          fantasyTeam: "Georgassic Park",
          points: 11.8
        },
        {
          position: "TE",
          player: "Trey McBride",
          nflTeam: "ARI",
          fantasyTeam: "Conkey's Handsome Julians",
          points: 23.6
        },
        {
          position: "FLEX",
          player: "Jahmyr Gibbs",
          nflTeam: "DET",
          fantasyTeam: "FS5 Penitentiary",
          points: 6.4
        },
        {
          position: "K",
          player: "Brandon Aubrey",
          nflTeam: "DAL",
          fantasyTeam: "FS5 Penitentiary",
          points: 17
        },
        {
          position: "DST",
          player: "Denver Broncos",
          nflTeam: "DEN",
          fantasyTeam: "Georgassic Park",
          points: 5
        }
      ],

      "evans": [
        {
          position: "QB",
          player: "Jalen Hurts",
          nflTeam: "PHI",
          fantasyTeam: "Certified Pipers Association",
          points: 8.9
        },
        {
          position: "RB1",
          player: "Bijan Robinson",
          nflTeam: "ATL",
          fantasyTeam: "Pete and His Dirty Dawgs",
          points: 39.9
        },
        {
          position: "RB2",
          player: "James Cook",
          nflTeam: "BUF",
          fantasyTeam: "The Brown Mahomos",
          points: 8.7
        },
        {
          position: "WR1",
          player: "Ja'Marr Chase",
          nflTeam: "CIN",
          fantasyTeam: "Pete and His Dirty Dawgs",
          points: 25
        },
        {
          position: "WR2",
          player: "Puka Nacua",
          nflTeam: "LAR",
          fantasyTeam: "Certified Pipers Association",
          points: 15.7
        },
        {
          position: "TE",
          player: "Dallas Goedert",
          nflTeam: "PHI",
          fantasyTeam: "Pete and His Dirty Dawgs",
          points: 9.8
        },
        {
          position: "FLEX",
          player: "Amon-Ra St. Brown",
          nflTeam: "DET",
          fantasyTeam: "The Brown Mahomos",
          points: 14.8
        },
        {
          position: "K",
          player: "Andy Borregales",
          nflTeam: "NE",
          fantasyTeam: "Atlanta Nitro Hawgs",
          points: 6
        },
        {
          position: "DST",
          player: "Los Angeles Rams",
          nflTeam: "LAR",
          fantasyTeam: "Certified Pipers Association",
          points: 6
        }
      ],

      "madras": [
        {
          position: "QB",
          player: "Josh Allen",
          nflTeam: "BUF",
          fantasyTeam: "Gallon of Allen",
          points: 23.18
        },
        {
          position: "RB1",
          player: "Jonathan Taylor",
          nflTeam: "IND",
          fantasyTeam: "Im So Brocked Up Right Now",
          points: 17.4
        },
        {
          position: "RB2",
          player: "Travis Etienne",
          nflTeam: "JAX",
          fantasyTeam: "Rough Draft",
          points: 11.2
        },
        {
          position: "WR1",
          player: "Chris Olave",
          nflTeam: "NO",
          fantasyTeam: "Gallon of Allen",
          points: 25.9
        },
        {
          position: "WR2",
          player: "Nico Collins",
          nflTeam: "HOU",
          fantasyTeam: "Gallon of Allen",
          points: 8.7
        },
        {
          position: "TE",
          player: "Jake Ferguson",
          nflTeam: "DAL",
          fantasyTeam: "Rough Draft",
          points: 7.6
        },
        {
          position: "FLEX",
          player: "Kyren Williams",
          nflTeam: "LAR",
          fantasyTeam: "Gallon of Allen",
          points: 16
        },
        {
          position: "K",
          player: "Ka'imi Fairbairn",
          nflTeam: "HOU",
          fantasyTeam: "Armory Road Trucks",
          points: 10
        },
        {
          position: "DST",
          player: "New England Patriots",
          nflTeam: "NE",
          fantasyTeam: "Rough Draft",
          points: 7
        }
      ]
    }
  }

  /*
  COPY THIS BLOCK WHEN YOU ADD 2026:

  ,2026: {
    year: 2026,

    status: "upcoming",

    championLabel: "2026 YOUR CUSTOM BOWL NAME CHAMPIONS",

    upcomingLabel: "2026 YOUR CUSTOM BOWL NAME",

    statusMessage:
      "The champion will be crowned after the Pro Bowl is complete.",

    winnerDivisionId: null,

    mvp: {
      enabled: false
    },

    standings: [
      {
        divisionId: "smokey-road",
        rank: null,
        score: null,
        touchdowns: null,
        submissionStatus: "Awaiting Lineup"
      },
      {
        divisionId: "evans",
        rank: null,
        score: null,
        touchdowns: null,
        submissionStatus: "Awaiting Lineup"
      },
      {
        divisionId: "madras",
        rank: null,
        score: null,
        touchdowns: null,
        submissionStatus: "Awaiting Lineup"
      }
    ],

    lineups: {
      "smokey-road": [],
      "evans": [],
      "madras": []
    }
  }
  */
};

const yearSelect = document.getElementById("pro-bowl-year");
const pageTitle = document.getElementById("pro-bowl-page-title");
const hero = document.getElementById("pro-bowl-hero");
const desktopLineups = document.getElementById(
  "pro-bowl-lineups-desktop"
);
const mobileTabs = document.getElementById("pro-bowl-mobile-tabs");
const mobileLineup = document.getElementById("pro-bowl-mobile-lineup");
const historyContainer = document.getElementById("pro-bowl-history");

let activeMobileDivisionId = null;

function getDivision(divisionId) {
  return PRO_BOWL_DIVISIONS.find(
    (division) => division.id === divisionId
  );
}

function formatPoints(value) {
  return Number.isFinite(value) ? value.toFixed(2) : "—";
}

function ordinal(rank) {
  if (!Number.isFinite(rank)) {
    return "Pending";
  }

  if (rank === 1) {
    return "1st Place";
  }

  if (rank === 2) {
    return "2nd Place";
  }

  if (rank === 3) {
    return "3rd Place";
  }

  return `${rank}th Place`;
}

function getLineupPlayer(yearData, divisionId, position) {
  const lineup = yearData.lineups?.[divisionId] || [];

  return (
    lineup.find((player) => player.position === position) || {
      position,
      player: "TBD",
      nflTeam: "—",
      fantasyTeam: "Awaiting Selection",
      points: null
    }
  );
}

function populateYearSelect() {
  const years = Object.keys(PRO_BOWL_YEARS)
    .map(Number)
    .sort((a, b) => b - a);

  yearSelect.innerHTML = years
    .map((year) => {
      return `<option value="${year}">${year}</option>`;
    })
    .join("");

  yearSelect.value = String(years[0]);

  renderYear(years[0]);
}

function renderYear(year) {
  const yearData = PRO_BOWL_YEARS[year];

  if (!yearData) {
    return;
  }

  pageTitle.textContent = "Pro Bowl";

  renderEventHero(yearData);
  renderDesktopLineups(yearData);
  renderMobileLineups(yearData);
  renderPersistentHistory();
}

function renderHero(yearData) {
  const isComplete = yearData.status === "complete";

  const winner = isComplete
    ? getDivision(yearData.winnerDivisionId)
    : null;

  const winnerStanding = isComplete
    ? yearData.standings.find(
        (standing) =>
          standing.divisionId === yearData.winnerDivisionId
      )
    : null;

  hero.style.setProperty(
    "--division-glow",
    winner?.glow || "rgba(227, 180, 73, 0.16)"
  );

  if (!isComplete || !winner) {
    hero.innerHTML = `
      <div class="pro-bowl-hero__content">
        <p class="pro-bowl-hero__label">
          ${yearData.upcomingLabel}
        </p>

        <h2 class="pro-bowl-hero__status">
          Champion To Be Determined
        </h2>

        <p class="pro-bowl-hero__status-copy">
          ${
            yearData.statusMessage ||
            "The Pro Bowl has not been completed yet."
          }
        </p>
      </div>
    `;

    return;
  }

  const mvpMarkup = yearData.mvp?.enabled
    ? `
      <div class="pro-bowl-hero__mvp">
        MVP: ${yearData.mvp.player}
        · ${yearData.mvp.fantasyTeam}
        · ${formatPoints(yearData.mvp.points)} pts
      </div>
    `
    : "";

  hero.innerHTML = `
    <div class="pro-bowl-hero__content">
      <p class="pro-bowl-hero__label">
        ${yearData.championLabel}
      </p>

      <div class="pro-bowl-hero__winner">
        <img
          class="pro-bowl-hero__logo"
          src="${winner.logo}"
          alt="${winner.name} division logo"
        >

        <div>
          <h2 class="pro-bowl-hero__name">
            ${winner.name}
          </h2>

          <p class="pro-bowl-hero__score">
            Winning score:
            ${formatPoints(winnerStanding?.score)} points
          </p>
        </div>
      </div>

      ${mvpMarkup}
    </div>
  `;
}

function renderRankings(yearData) {
  const orderedStandings = [...yearData.standings].sort(
    (a, b) => {
      if (
        !Number.isFinite(a.rank) &&
        !Number.isFinite(b.rank)
      ) {
        return 0;
      }

      if (!Number.isFinite(a.rank)) {
        return 1;
      }

      if (!Number.isFinite(b.rank)) {
        return -1;
      }

      return a.rank - b.rank;
    }
  );

  rankingsContainer.innerHTML = orderedStandings
    .map((standing) => {
      const division = getDivision(standing.divisionId);

      const isWinner =
        yearData.status === "complete" &&
        standing.divisionId === yearData.winnerDivisionId;

      const completeStats =
        Number.isFinite(standing.score) &&
        Number.isFinite(standing.touchdowns);

      return `
        <article
          class="
            pro-bowl-rank-card
            ${
              isWinner
                ? "pro-bowl-rank-card--winner"
                : ""
            }
          "
          style="--division-accent: ${division.accent};"
        >
          <div class="pro-bowl-rank-card__place">
            ${
              Number.isFinite(standing.rank)
                ? standing.rank
                : "—"
            }
          </div>

          <div class="pro-bowl-rank-card__division">
            <img
              class="pro-bowl-rank-card__logo"
              src="${division.logo}"
              alt="${division.name} division logo"
            >

            <div>
              <h3 class="pro-bowl-rank-card__name">
                ${division.name}
              </h3>

              <p class="pro-bowl-rank-card__finish">
                ${ordinal(standing.rank)}
              </p>
            </div>
          </div>

          ${
            completeStats
              ? `
                <div class="pro-bowl-rank-card__stats">
                  <div class="pro-bowl-stat">
                    <span class="pro-bowl-stat__label">
                      Score
                    </span>

                    <strong class="pro-bowl-stat__value">
                      ${formatPoints(standing.score)}
                    </strong>
                  </div>

                  <div class="pro-bowl-stat">
                    <span class="pro-bowl-stat__label">
                      Touchdowns
                    </span>

                    <strong class="pro-bowl-stat__value">
                      ${standing.touchdowns}
                    </strong>
                  </div>
                </div>
              `
              : `
                <p class="pro-bowl-rank-card__pending">
                  ${
                    standing.submissionStatus ||
                    "Awaiting Result"
                  }
                </p>
              `
          }
        </article>
      `;
    })
    .join("");
}

function renderDesktopLineups(yearData) {
  const headingCells = PRO_BOWL_DIVISIONS
    .map((division) => {
      return `
        <th
          class="pro-bowl-table__division-heading"
          style="--division-accent: ${division.accent};"
          scope="col"
        >
          <span class="pro-bowl-table__division-title">
            <img
              class="pro-bowl-table__division-logo"
              src="${division.logo}"
              alt=""
            >

            ${division.name}
          </span>
        </th>
      `;
    })
    .join("");

  const rows = PRO_BOWL_POSITIONS
    .map((position) => {
      const playerCells = PRO_BOWL_DIVISIONS
        .map((division) => {
          const player = getLineupPlayer(
            yearData,
            division.id,
            position
          );

          return `
            <td>
              <div class="pro-bowl-player">
                <div>
                  <span class="pro-bowl-player__name">
                    ${player.player}<span class="pro-bowl-player__nfl">${player.nflTeam}</span>
                  </span>

                  <span class="pro-bowl-player__meta">${player.fantasyTeam}</span>
                </div>

                <strong class="pro-bowl-player__points">
                  ${formatPoints(player.points)}
                </strong>
              </div>
            </td>
          `;
        })
        .join("");

      return `
        <tr>
          <td class="pro-bowl-table__position">
            ${position}
          </td>

          ${playerCells}
        </tr>
      `;
    })
    .join("");

  desktopLineups.innerHTML = `
    <table class="pro-bowl-table">
      <thead>
        <tr>
          <th
            class="pro-bowl-table__position-heading"
            scope="col"
          >
            POS
          </th>

          ${headingCells}
        </tr>
      </thead>

      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function renderMobileLineups(yearData) {
  const availableIds = PRO_BOWL_DIVISIONS.map(
    (division) => division.id
  );

  if (
    !activeMobileDivisionId ||
    !availableIds.includes(activeMobileDivisionId)
  ) {
    activeMobileDivisionId =
      yearData.winnerDivisionId || availableIds[0];
  }

  mobileTabs.innerHTML = PRO_BOWL_DIVISIONS
    .map((division) => {
      const selected =
        division.id === activeMobileDivisionId;

      return `
        <button
          id="pro-bowl-tab-${division.id}"
          class="pro-bowl-tab"
          type="button"
          role="tab"
          aria-selected="${selected}"
          aria-controls="pro-bowl-mobile-panel"
          tabindex="${selected ? "0" : "-1"}"
          data-division-id="${division.id}"
          style="--division-accent: ${division.accent};"
        >
          ${division.name}
        </button>
      `;
    })
    .join("");

  mobileTabs
    .querySelectorAll(".pro-bowl-tab")
    .forEach((button) => {
      button.addEventListener("click", () => {
        activeMobileDivisionId =
          button.dataset.divisionId;

        renderMobileLineups(yearData);
      });

      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
          return;
        }

        event.preventDefault();
        const currentIndex = availableIds.indexOf(button.dataset.divisionId);
        const nextIndex = event.key === "Home"
          ? 0
          : event.key === "End"
            ? availableIds.length - 1
            : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + availableIds.length) % availableIds.length;

        activeMobileDivisionId = availableIds[nextIndex];
        renderMobileLineups(yearData);
        document.getElementById(`pro-bowl-tab-${activeMobileDivisionId}`).focus();
      });
    });

  const division = getDivision(
    activeMobileDivisionId
  );

  const rows = PRO_BOWL_POSITIONS
    .map((position) => {
      const player = getLineupPlayer(
        yearData,
        division.id,
        position
      );

      return `
        <tr>
          <td class="pro-bowl-table__position">
            ${position}
          </td>

          <td class="pro-bowl-mobile-table__player">
            <strong>${player.player}</strong>
            <span class="pro-bowl-mobile-table__source">
              ${player.nflTeam} · ${player.fantasyTeam}
            </span>
          </td>

          <td>
            <strong>
              ${formatPoints(player.points)}
            </strong>
          </td>
        </tr>
      `;
    })
    .join("");

  mobileLineup.id = "pro-bowl-mobile-panel";
  mobileLineup.setAttribute("role", "tabpanel");
  mobileLineup.setAttribute("aria-labelledby", `pro-bowl-tab-${division.id}`);
  mobileLineup.innerHTML = `
    <table
      class="
        pro-bowl-table
        pro-bowl-mobile-table
      "
    >
      <thead>
        <tr>
          <th scope="col">POS</th>
          <th scope="col">Player</th>
          <th scope="col">PTS</th>
        </tr>
      </thead>

      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function renderHistory() {
  const completedYears = Object.values(
    PRO_BOWL_YEARS
  ).filter((yearData) => {
    return (
      yearData.status === "complete" &&
      yearData.winnerDivisionId
    );
  });

  const history = PRO_BOWL_DIVISIONS
    .map((division, originalIndex) => {
      const winningYears = completedYears
        .filter((yearData) => {
          return (
            yearData.winnerDivisionId === division.id
          );
        })
        .map((yearData) => yearData.year)
        .sort((a, b) => b - a);

      return {
        ...division,
        originalIndex,
        wins: winningYears.length,
        winningYears
      };
    })
    .sort((a, b) => {
      return (
        b.wins - a.wins ||
        a.originalIndex - b.originalIndex
      );
    });

  historyContainer.innerHTML = history
    .map((division) => {
      return `
        <article
          class="pro-bowl-history-card"
          style="--division-accent: ${division.accent};"
        >
          <div class="pro-bowl-history-card__division">
            <img
              class="pro-bowl-history-card__logo"
              src="${division.logo}"
              alt="${division.name} division logo"
            >

            <h3 class="pro-bowl-history-card__name">
              ${division.name}
            </h3>
          </div>

          <p class="pro-bowl-history-card__count">
            ${division.wins}

            <span class="pro-bowl-history-card__count-label">
              ${division.wins === 1 ? "win" : "wins"}
            </span>
          </p>

          <p class="pro-bowl-history-card__years-label">
            Winning years
          </p>

          <p class="pro-bowl-history-card__years">
            ${
              division.winningYears.length
                ? division.winningYears.join(", ")
                : "—"
            }
          </p>
        </article>
      `;
    })
    .join("");
}

function renderEventHero(yearData) {
  const winner = getDivision(yearData.winnerDivisionId);
  const winnerStanding = yearData.standings.find(
    (standing) => standing.divisionId === yearData.winnerDivisionId
  );

  if (yearData.status !== "complete" || !winner) {
    renderHero(yearData);
    return;
  }

  const resultsMarkup = [...yearData.standings]
    .sort((a, b) => a.rank - b.rank)
    .map((standing) => {
      const division = getDivision(standing.divisionId);
      return `
        <div class="pro-bowl-result" style="--division-accent: ${division.accent};">
          <img class="pro-bowl-result__logo" src="${division.logo}" alt="">
          <span>
            <span class="pro-bowl-result__rank">${ordinal(standing.rank)}</span>
            <strong class="pro-bowl-result__name">${division.name}</strong>
            ${Number.isFinite(standing.touchdowns)
              ? `<span class="pro-bowl-result__tds">${standing.touchdowns} TDs</span>`
              : ""}
          </span>
          <strong class="pro-bowl-result__score">${formatPoints(standing.score)}</strong>
        </div>
      `;
    })
    .join("");

  const mvpMarkup = yearData.mvp?.enabled
    ? `
      <div class="pro-bowl-hero__mvp">
        <span class="pro-bowl-hero__mvp-label">MVP</span>
        <strong class="pro-bowl-hero__mvp-name">${yearData.mvp.player}</strong>
        <span class="pro-bowl-hero__mvp-team">${yearData.mvp.fantasyTeam}</span>
        <strong class="pro-bowl-hero__mvp-points">${formatPoints(yearData.mvp.points)} pts</strong>
      </div>
    `
    : "";

  hero.innerHTML = `
    <div class="pro-bowl-hero__content">
      <div class="pro-bowl-hero__champion">
        <span class="pro-bowl-hero__logo-frame">
          <img class="pro-bowl-hero__logo" src="${winner.logo}" alt="FastStrongFive logo">
        </span>
        <div>
          <p class="pro-bowl-hero__label">${yearData.championLabel}</p>
          <h2 class="pro-bowl-hero__name">${winner.name}</h2>
          <span class="pro-bowl-hero__score-label">Champion score</span>
          <strong class="pro-bowl-hero__score">${formatPoints(winnerStanding?.score)}</strong>
        </div>
      </div>
      ${mvpMarkup}
      <div class="pro-bowl-hero__results" aria-label="Final results">${resultsMarkup}</div>
    </div>
  `;
}

function renderPersistentHistory() {
  const rows = Object.values(PRO_BOWL_YEARS)
    .filter((yearData) => yearData.status === "complete" && yearData.winnerDivisionId)
    .sort((a, b) => b.year - a.year)
    .map((yearData) => {
      const standings = [...yearData.standings].sort((a, b) => a.rank - b.rank);
      const champion = getDivision(standings[0].divisionId);
      const runnerUp = getDivision(standings[1].divisionId);
      const third = getDivision(standings[2].divisionId);

      return `
        <tr>
          <td>
            ${yearData.year}${yearData.unofficial ? ' <span class="pro-bowl-history__unofficial">(Unofficial)</span>' : ""}
          </td>
          <td>${champion.name}</td>
          <td>${formatPoints(standings[0].score)}</td>
          <td>${runnerUp.name} (${formatPoints(standings[1].score)})</td>
          <td>${third.name} (${formatPoints(standings[2].score)})</td>
        </tr>
      `;
    })
    .join("");

  historyContainer.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Year</th>
        <th scope="col">Champion</th>
        <th scope="col">Champion Score</th>
        <th scope="col">Runner-Up</th>
        <th scope="col">Third Place</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  `;
}

yearSelect.addEventListener("change", (event) => {
  activeMobileDivisionId = null;

  renderYear(Number(event.target.value));
});

populateYearSelect();
