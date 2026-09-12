(() => {
  "use strict";

  /* --------------------------------------------------------------------------
     EDITABLE 2025 DATA

     Add future seasons by copying the entire 2025 object and changing its key.
     The page automatically builds the year dropdown from the keys in BRACKET_DATA.

     Image paths are placeholders. They are relative to /brackets/index.html.
     -------------------------------------------------------------------------- */

  const placeholderStarters = (label) => [
    { name: `${label} QB`, position: "QB", nflTeam: "BUF", points: 24.84 },
    { name: `${label} RB One`, position: "RB", nflTeam: "ATL", points: 18.6 },
    { name: `${label} RB Two`, position: "RB", nflTeam: "DET", points: 14.2 },
    { name: `${label} WR One`, position: "WR", nflTeam: "MIN", points: 22.7 },
    { name: `${label} WR Two`, position: "WR", nflTeam: "DAL", points: 12.9 },
    { name: `${label} Tight End`, position: "TE", nflTeam: "KC", points: 11.4 },
    { name: `${label} Flex`, position: "FLEX", nflTeam: "LAR", points: 16.3 },
    { name: `${label} Defense`, position: "D/ST", nflTeam: "PIT", points: 8.0 },
    { name: `${label} Kicker`, position: "K", nflTeam: "BAL", points: 9.0 }
  ];

  const placeholderBench = (label) => [
    { name: `${label} Bench QB`, position: "QB", nflTeam: "GB", points: 17.52 },
    { name: `${label} Bench RB`, position: "RB", nflTeam: "SEA", points: 10.1 },
    { name: `${label} Bench WR`, position: "WR", nflTeam: "TB", points: 8.7 },
    { name: `${label} Bench TE`, position: "TE", nflTeam: "ARI", points: 6.3 },
    { name: `${label} Bench Flex`, position: "WR", nflTeam: "MIA", points: 4.8 }
  ];

  const lineup = (label) => ({
    starters: placeholderStarters(label),
    bench: placeholderBench(label)
  });

  const BRACKET_DATA = {

//START YEAR 2025

    2025: {
      format: "current",
      teams: {
        p1: {name: "The Rome Man Empire",owner: "Jordan",art: "artwork/2025/p1.png"},
        p2: {name: "Certified Pipers Association",owner: "Max",art: "artwork/2025/p2.png"},
        p3: {name: "FS5 PENITENTIARY",owner: "Bailey",art: "artwork/2025/p3.png"},
        p4: {name: "Pete and His Dirty Dawgs",owner: "Will",art: "artwork/2025/p4.png"},
        p5: {name: "Georgassic Park",owner: "David",art: "artwork/2025/p5.png"},
        p6: {name: "The Brown Mahomos",owner: "Matthew",art: "artwork/2025/p6.png"},
        c1: {name: "Im So Brocked Up Right Now",owner: "Chris",art: "artwork/2025/c1.png"},
        c2: {name: "Gallon of Allen",owner: "Ethan",art: "artwork/2025/c2.png"},
        c3: {name: "Armory Road Trucks",owner: "Mike",art: "artwork/2025/c3.png"},
        c4: {name: "Merry Christmas",owner: "Brycen",art: "artwork/2025/c4.png"},
        c5: {name: "ROUGH DRAFT",owner: "Keith",art: "artwork/2025/c5.png"},
        c6: {name: "Atlanta Nitro Hawgs",owner: "Cody",art: "artwork/2025/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2025_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "Battle of the Bulge",
  bowlArt: "artwork/2025/PQ1.png",
  theme: {accent: "#c58a2c", dark: "#5b3418", soft: "#f2dfbd"},

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 127.64,
      touchdowns: 5,
      winner: true,

      lineup: {
        starters: [
          {name: "Jordan Love",position: "QB",nflTeam: "GB",points: 13.94},
          {name: "Brian Robinson",position: "RB",nflTeam: "ATL",points: 29.50},
          {name: "Omarion Hampton",position: "RB",nflTeam: "LAC",points: 7.50},
          {name: "Davante Adams",position: "WR",nflTeam: "LAR",points: 11.10},
          {name: "Jamaar Chase",position: "WR",nflTeam: "CIN",points: 23.20},
          {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 25.00},
          {name: "Michael Wilson",position: "WR",nflTeam: "ARI",points: 16.40},
          {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 0.00},
          {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 1.00}
        ],

        bench: [
          {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 9.50},
          {name: "Jordan Mason",position: "RB",nflTeam: "MIN",points: 2.90},
          {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 10.50},
          {name: "Quentin Johnston",position: "WR",nflTeam: "LAC",points: 0.00},
          {name: "Tetalroa McMillan",position: "WR",nflTeam: "CAR",points: 4.50},
          {name: "Oronde Gadsen",position: "TE",nflTeam: "LAC",points: 10.10},
        ]
      }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 110.90,
      touchdowns: 2,
      winner: false,

      lineup: {
        starters: [
          {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 5.50},
          {name: "De'Von Achane",position: "RB",nflTeam: "MIA",points: 18.70},
          {name: "Ashton Jeanty",position: "RB",nflTeam: "LV",points: 8.20},
          {name: "Jameson Williams",position: "WR",nflTeam: "DET",points: 26.40},
          {name: "George Pickens",position: "WR",nflTeam: "DAL",points: 6.30},
          {name: "George Kittle",position: "TE",nflTeam: "SF",points: 22.80},
          {name: "Kayshon Boutte",position: "WR",nflTeam: "NE",points: 4.00},
          {name: "Cam Little",position: "K",nflTeam: "JAX",points: 12.00},
          {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 7.00}
        ],
        bench: [
          {name: "Jerry Jeudy",position: "WR",nflTeam: "CLE",points: 4.20},
          {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 45.60},
          {name: "Alec Pierce",position: "WR",nflTeam: "IND",points: 2.60},
          {name: "Garrett Wilson",position: "WR",nflTeam: "NYJ",points: 0.00},
          {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 3.60},
          {name: "Zach Charbonnet",position: "RB",nflTeam: "SEA",points: 3.10},
        ]
      }
    },
  ]
},



//2025_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "The Bloodbath Bowl",
            bowlArt: "artwork/2025/PQ2.png",
            theme: {accent: "#c94c3f", dark: "#421719", soft: "#f0d7d2"},

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 123.70,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 14.60},
                    {name: "Chase Brown",position: "RB",nflTeam: "CIN",points: 16.00},
                    {name: "Jahmyr Gibbs",position: "RB",nflTeam: "DET",points: 9.80},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 17.10},
                    {name: "Rashee Rice",position: "WR",nflTeam: "KC",points: 12.10},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 14.00},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 12.10},
                    {name: "Cameron Dicker",position: "K",nflTeam: "LAC",points: 12.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 16.00}
                  ],
                  bench: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 11.96},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 22.90},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 4.80},
                    {name: "Chris Rodriguez",position: "RB",nflTeam: "WAS",points: 0.00},
                    {name: "Woody Marks",position: "RB",nflTeam: "HOU",points: 10.80},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 7.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 124.76,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 13.06},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 31.10},
                    {name: "Bucky Irving",position: "RB",nflTeam: "TB",points: 8.10},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "WAS",points: 7.30},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 41.40},
                    {name: "Hunter Henry",position: "TE",nflTeam: "NE",points: 2.80},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 14.00},
                    {name: "Tyler Loop",position: "K",nflTeam: "BAL",points: 6.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 1.00}
                  ],
                  bench: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "PIT",points: 16.96},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 21.60},
                    {name: "Tyler Allgeier",position: "RB",nflTeam: "ATL",points: 1.80},
                    {name: "Christian Watson",position: "WR",nflTeam: "GB",points: 5.90},
                    {name: "Rashid Shaheed",position: "WR",nflTeam: "SEA",points: 12.10},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2025_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "The R.A.N.D.O.M Bowl",
            bowlArt: "artwork/2025/PS1.png",
            theme: {accent: "#59c4cf", dark: "#352451", soft: "#e3dff2"},

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 141.40,
                touchdowns: 10,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Drake Maye",position: "QB",nflTeam: "NE",points: 23.70},
                    {name: "Derrick Henry",position: "RB",nflTeam: "BAL",points: 22.80},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "SF",points: 32.60},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 5.70},
                    {name: "Jaxon Smith-Njigba",position: "WR",nflTeam: "SEA",points: 23.60},
                    {name: "Harold Fannin",position: "TE",nflTeam: "CLE",points: 19.50},
                    {name: "Michael Carter",position: "RB",nflTeam: "ARI",points: 6.50},
                    {name: "Brandon Aubrey",position: "K",nflTeam: "DAL",points: 5.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 2.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "LAR",points: 30.88},
                    {name: "Devin Singletary",position: "RB",nflTeam: "NYG",points: 5.60},
                    {name: "Rome Odunze",position: "WR",nflTeam: "CHI",points: 0.00},
                    {name: "Troy Franklin",position: "WR",nflTeam: "DEN",points: 10.60},
                    {name: "Blake Corum",position: "RB",nflTeam: "LAR",points: 13.10},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 2.00},
                  ]
                }
              },
              {
                teamId: "p4",
                seed: 4,
                score: 138.18,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "C.J. Stroud",position: "QB",nflTeam: "HOU",points: 11.48},
                    {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 11.30},
                    {name: "Bijan Robinson",position: "RB",nflTeam: "ATL",points: 29.80},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 19.90},
                    {name: "Tetairoa McMillan",position: "WR",nflTeam: "CAR",points: 19.30},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 12.20},
                    {name: "Michael Wilson",position: "WR",nflTeam: "ARI",points: 13.20},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 10.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 11.00}
                  ],
                  bench: [
                    {name: "Marquise Brown",position: "WR",nflTeam: "KC",points: 5.20},
                    {name: "Jordan Love",position: "QB",nflTeam: "GB",points: 3.78},
                    {name: "Jordan Mason",position: "RB",nflTeam: "MIN",points: 2.10},
                    {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 7.10},
                    {name: "Oronde Gadsden",position: "TE",nflTeam: "LAC",points: 1.70},
                    {name: "Omarion Hampton",position: "RB",nflTeam: "LAC",points: 16.50},
                  ]
                }
              },
            ]
          },



//2025_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "The Jordan Lynch Super Bowl",
            bowlArt: "artwork/2025/PS2.png",
            theme: {accent: "#a98a5d", dark: "#24282c", soft: "#e1ddd3"},

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 150.50,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 19.40},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "PHI",points: 21.20},
                    {name: "Breece Hall",position: "RB",nflTeam: "NYJ",points: 8.30},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 14.30},
                    {name: "Puka Nacua",position: "WR",nflTeam: "LAR",points: 46.50},
                    {name: "Theo Johnson",position: "TE",nflTeam: "NYG",points: 0.00},
                    {name: "Tyrone Tracy",position: "RB",nflTeam: "NYG",points: 9.80},
                    {name: "Eddy Pineiro",position: "K",nflTeam: "SF",points: 12.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 19.00}
                  ],
                  bench: [
                    {name: "Stefon Diggs",position: "WR",nflTeam: "NE",points: 22.80},
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 30.20},
                    {name: "Xavier Worthy",position: "WR",nflTeam: "KC",points: 6.10},
                    {name: "Colston Loveland",position: "TE",nflTeam: "CHI",points: 6.00},
                    {name: "Kyle Monangai",position: "RB",nflTeam: "CHI",points: 12.30},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LAR",points: 6.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 93.44,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "PIT",points: 15.54},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 26.40},
                    {name: "Bucky Irving",position: "RB",nflTeam: "TB",points: 7.10},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "WAS",points: 6.50},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 9.40},
                    {name: "Hunter Henry",position: "TE",nflTeam: "NE",points: 15.50},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 8.00},
                    {name: "Tyler Loop",position: "K",nflTeam: "BAL",points: 6.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: -1.00}
                  ],
                  bench: [
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 14.50},
                    {name: "Christian Watson",position: "WR",nflTeam: "GB",points: 3.70},
                    {name: "Rashid Shaheed",position: "WR",nflTeam: "SEA",points: 3.10},
                    {name: "Quentin Johnston",position: "WR",nflTeam: "LAC",points: 20.40},
                    {name: "Jalen Coker",position: "WR",nflTeam: "CAR",points: 7.70},
                  ]
                }
              },
            ]
          },


//2025_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "The City of Homes Bowl",
            bowlArt: "artwork/2025/F1.png",
            theme: {accent: "#f0a24d", dark: "#24344f", soft: "#f7e2c8"},

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 143.86,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "LAR",points: 12.76},
                    {name: "Derrick Henry",position: "RB",nflTeam: "BAL",points: 45.60},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "SF",points: 28.10},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 1.40},
                    {name: "Jaxon Smith-Njigba",position: "WR",nflTeam: "SEA",points: 16.20},
                    {name: "Harold Fannin",position: "TE",nflTeam: "CLE",points: 11.00},
                    {name: "Blake Corum",position: "RB",nflTeam: "LAR",points: 1.80},
                    {name: "Brandon Aubrey",position: "K",nflTeam: "DAL",points: 17.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 10.00}
                  ],
                  bench: [
                    {name: "David Sills",position: "WR",nflTeam: "ATL",points: 6.70},
                    {name: "Drake Maye",position: "QB",nflTeam: "NE",points: 32.44},
                    {name: "Luther Burden",position: "WR",nflTeam: "CHI",points: 27.80},
                    {name: "Konata Mumpfield",position: "WR",nflTeam: "LAR",points: 3.00},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 10.00},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 103.50,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 8.90},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "PHI",points: 6.80},
                    {name: "Tyrone Tracy",position: "RB",nflTeam: "NYG",points: 6.70},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 9.90},
                    {name: "Puka Nacua",position: "WR",nflTeam: "LAR",points: 15.70},
                    {name: "Colston Loveland",position: "TE",nflTeam: "CHI",points: 21.40},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "NE",points: 22.10},
                    {name: "Eddy Pineiro",position: "K",nflTeam: "SF",points: 6.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LAR",points: 6.00}
                  ],
                  bench: [
                    {name: "Davante Adams",position: "WR",nflTeam: "LAR",points: 0.00},
                    {name: "Jimmy Garoppolo",position: "QB",nflTeam: "LAR",points: 0.00},
                    {name: "Tyler Allgeier",position: "RB",nflTeam: "ATL",points: 2.30},
                    {name: "Breece Hall",position: "RB",nflTeam: "NYJ",points: 20.90},
                    {name: "Stetson Bennett",position: "QB",nflTeam: "LAR",points: 0.00},
                    {name: "AJ Barner",position: "TE",nflTeam: "SEA",points: 13.30},
                  ]
                }
              },
            ]
          },


//2025_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "The Bronze Chair Bowl",
            bowlArt: "artwork/2025/F3.png",
            theme: {accent: "#9a6a3a", dark: "#3f352d", soft: "#e9dfd2"},

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 137.18,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Sam Darnold",position: "QB",nflTeam: "SEA",points: 6.08},
                    {name: "Bijan Robinson",position: "RB",nflTeam: "ATL",points: 39.90},
                    {name: "Omarion Hampton",position: "RB",nflTeam: "LAC",points: 20.00},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 25.00},
                    {name: "Michael Wilson",position: "WR",nflTeam: "ARI",points: 19.90},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 9.80},
                    {name: "Tetairoa McMillan",position: "WR",nflTeam: "CAR",points: 1.50},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 8.00},
                    {name: "Detroit Lions",position: "DEF",nflTeam: "DET",points: 7.00}
                  ],
                  bench: [
                    {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 15.30},
                    {name: "Marquise Brown",position: "WR",nflTeam: "KC",points: 1.70},
                    {name: "Darnell Mooney",position: "WR",nflTeam: "ATL",points: 5.50},
                    {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 8.10},
                    {name: "C.J. Stroud",position: "QB",nflTeam: "HOU",points: 13.76},
                    {name: "Oronde Gadsden",position: "TE",nflTeam: "LAC",points: 12.20},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 92.12,
                touchdowns: 1,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "PIT",points: 7.32},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 8.70},
                    {name: "Bucky Irving",position: "RB",nflTeam: "TB",points: 8.30},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "WAS",points: 11.30},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 14.80},
                    {name: "Hunter Henry",position: "TE",nflTeam: "NE",points: 13.90},
                    {name: "Quentin Johnston",position: "WR",nflTeam: "LAC",points: 14.80},
                    {name: "Tyler Loop",position: "K",nflTeam: "BAL",points: 11.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 2.00}
                  ],
                  bench: [
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 23.80},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 4.90},
                    {name: "Christian Watson",position: "WR",nflTeam: "GB",points: 22.30},
                    {name: "Rashid Shaheed",position: "WR",nflTeam: "SEA",points: 1.80},
                    {name: "Jalen Coker",position: "WR",nflTeam: "CAR",points: 3.60},
                  ]
                }
              },
            ]
          },


//2025_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "The Crosby Studios Bowl",
            bowlArt: "artwork/2025/F5.png",
            theme: {accent: "#74b9e6", dark: "#244f73", soft: "#f4f7f8"},
            artPosition: {modal: "center 42%"},

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 84.00,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 20.40},
                    {name: "De'Von Achane",position: "RB",nflTeam: "MIA",points: 14.20},
                    {name: "Ashton Jeanty",position: "RB",nflTeam: "LV",points: 9.30},
                    {name: "Jameson Williams",position: "WR",nflTeam: "DET",points: 5.70},
                    {name: "George Pickens",position: "WR",nflTeam: "DAL",points: 11.80},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 3.60},
                    {name: "Alec Pierce",position: "WR",nflTeam: "IND",points: 0.00},
                    {name: "Cam Little",position: "K",nflTeam: "JAX",points: 14.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 5.00}
                  ],
                  bench: [
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 0.00},
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "CLE",points: 10.40},
                    {name: "Garrett Wilson",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 3.70},
                    {name: "Kayshon Boutte",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Zach Charbonnet",position: "RB",nflTeam: "SEA",points: 26.20},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 103.88,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 22.68},
                    {name: "Chase Brown",position: "RB",nflTeam: "CIN",points: 29.10},
                    {name: "Jahmyr Gibbs",position: "RB",nflTeam: "DET",points: 6.40},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 11.80},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 9.60},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 8.60},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 1.70},
                    {name: "Cameron Dicker",position: "K",nflTeam: "LAC",points: 3.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 11.00}
                  ],
                  bench: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 0.00},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 2.80},
                    {name: "Jake Tonges",position: "TE",nflTeam: "SF",points: 19.00},
                    {name: "Josh Downs",position: "WR",nflTeam: "IND",points: 5.40},
                    {name: "Woody Marks",position: "RB",nflTeam: "HOU",points: 8.50},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 4.00},
                  ]
                }
              },
            ]
          },
        ],


//END 2025 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2025_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2025/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 134.24,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jaxson Dart",position: "QB",nflTeam: "NYG",points: 22.14},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "GB",points: 23.20},
                    {name: "RJ Harvey",position: "RB",nflTeam: "DEN",points: 10.50},
                    {name: "Ladd McConkey",position: "WR",nflTeam: "LAC",points: 4.00},
                    {name: "Emeka Egbuka",position: "WR",nflTeam: "TB",points: 10.40},
                    {name: "Trey McBride",position: "TE",nflTeam: "ARI",points: 37.40},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 4.60},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 4.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 18.00}
                  ],
                  bench: [
                    {name: "Rico Dowdle",position: "RB",nflTeam: "CAR",points: 12.40},
                    {name: "Emanuel Wilson",position: "RB",nflTeam: "GB",points: 0.30},
                    {name: "Adonai Mitchell",position: "WR",nflTeam: "NYJ",points: 17.40},
                    {name: "Jaylen Wright",position: "RB",nflTeam: "MIA",points: 2.10},
                    {name: "Shedeur Sanders",position: "QB",nflTeam: "CLE",points: 3.48},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 2.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 115.08,
                touchdowns: 6,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Caleb Williams",position: "QB",nflTeam: "CHI",points: 18.98},
                    {name: "Travis Etienne",position: "RB",nflTeam: "JAX",points: 31.50},
                    {name: "Kenneth Gainwell",position: "RB",nflTeam: "PIT",points: 19.60},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 8.60},
                    {name: "Jordan Addison",position: "WR",nflTeam: "MIN",points: 8.60},
                    {name: "Jake Ferguson",position: "TE",nflTeam: "DAL",points: 3.60},
                    {name: "David Montgomery",position: "RB",nflTeam: "DET",points: 9.20},
                    {name: "Jake Bates",position: "K",nflTeam: "DET",points: 11.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 4.00}
                  ],
                  bench: [
                    {name: "Jeremy McNichols",position: "RB",nflTeam: "WAS",points: 1.20},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 3.80},
                    {name: "Daniel Jones",position: "QB",nflTeam: "IND",points: 0.00},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 10.70},
                    {name: "Romeo Doubs",position: "WR",nflTeam: "GB",points: 5.60},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: -2.00},
                  ]
                }
              },
            ]
          },

//2025_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2025/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 138.78,
                touchdowns: 9,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Bo Nix",position: "QB",nflTeam: "DEN",points: 29.08},
                    {name: "TreVeyon Henderson",position: "RB",nflTeam: "NE",points: 30.10},
                    {name: "Devin Neal",position: "RB",nflTeam: "NO",points: 10.20},
                    {name: "DK Metcalf",position: "WR",nflTeam: "PIT",points: 14.50},
                    {name: "Wan'Dale Robinson",position: "WR",nflTeam: "NYG",points: 16.40},
                    {name: "Tyler Warren",position: "TE",nflTeam: "IND",points: 4.90},
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 5.60},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 18.00},
                    {name: "Jacksonville Jaguars",position: "DEF",nflTeam: "JAX",points: 10.00}
                  ],
                  bench: [
                    {name: "Kareem Hunt",position: "RB",nflTeam: "KC",points: 3.00},
                    {name: "Tre Tucker",position: "WR",nflTeam: "LV",points: 0.00},
                    {name: "Devaughn Vele",position: "WR",nflTeam: "NO",points: 11.90},
                    {name: "Brian Thomas",position: "WR",nflTeam: "JAX",points: 17.10},
                    {name: "Ricky Pearsall",position: "WR",nflTeam: "SF",points: 15.60},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 7.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 109.80,
                touchdowns: 9,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Trevor Lawrence",position: "QB",nflTeam: "JAX",points: 44.30},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "CHI",points: 22.60},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 2.90},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 15.90},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "JAX",points: 12.10},
                    {name: "Isaiah Likely",position: "TE",nflTeam: "BAL",points: 0.00},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 7.00},
                    {name: "Riley Patterson",position: "K",nflTeam: "MIA",points: 5.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 0.00}
                  ],
                  bench: [
                    {name: "Jacoby Brissett",position: "QB",nflTeam: "ARI",points: 20.56},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 24.30},
                    {name: "Juwan Johnson",position: "TE",nflTeam: "NO",points: 7.00},
                    {name: "Tyjae Spears",position: "RB",nflTeam: "TEN",points: 5.60},
                    {name: "Jayden Daniels",position: "QB",nflTeam: "WAS",points: 0.00},
                    {name: "Jayden Higgins",position: "WR",nflTeam: "HOU",points: 1.40},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2025_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "Totino's Pizza Roll Bowl",
            bowlArt: "artwork/2025/CS1.png",
            theme: {accent: "#d99a3d", dark: "#6b3e1f", soft: "#f5e4c4"},

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 136.20,
                touchdowns: 10,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Brock Purdy",position: "QB",nflTeam: "SF",points: 30.90},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 16.90},
                    {name: "Javonte Williams",position: "RB",nflTeam: "DAL",points: 6.30},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 14.50},
                    {name: "Zay Flowers",position: "WR",nflTeam: "BAL",points: 21.20},
                    {name: "Brock Bowers",position: "TE",nflTeam: "LV",points: 14.30},
                    {name: "Jauan Jennings",position: "WR",nflTeam: "SF",points: 18.10},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 3.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 11.00}
                  ],
                  bench: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 26.46},
                    {name: "Baker Mayfield",position: "QB",nflTeam: "TB",points: 12.70},
                    {name: "Khalil Shakir",position: "WR",nflTeam: "BUF",points: 7.40},
                    {name: "Brian Robinson",position: "RB",nflTeam: "SF",points: 2.00},
                    {name: "Jaylen Warren",position: "RB",nflTeam: "PIT",points: 29.10},
                    {name: "Bhayshul Tuten",position: "RB",nflTeam: "JAX",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c4",
                seed: 4,
                score: 84.42,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jaxson Dart",position: "QB",nflTeam: "NYG",points: 0.02},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "GB",points: 4.80},
                    {name: "Rico Dowdle",position: "RB",nflTeam: "CAR",points: 8.30},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 12.20},
                    {name: "Ladd McConkey",position: "WR",nflTeam: "LAC",points: 14.30},
                    {name: "Trey McBride",position: "TE",nflTeam: "ARI",points: 6.70},
                    {name: "RJ Harvey",position: "RB",nflTeam: "DEN",points: 22.10},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 11.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 5.00}
                  ],
                  bench: [
                    {name: "Emanuel Wilson",position: "RB",nflTeam: "GB",points: 8.20},
                    {name: "Adonai Mitchell",position: "WR",nflTeam: "NYJ",points: 7.30},
                    {name: "Jaylen Wright",position: "RB",nflTeam: "MIA",points: 12.30},
                    {name: "Kimani Vidal",position: "RB",nflTeam: "LAC",points: 1.10},
                    {name: "Shedeur Sanders",position: "QB",nflTeam: "CLE",points: 11.18},
                    {name: "Emeka Egbuka",position: "WR",nflTeam: "TB",points: 5.00},
                  ]
                }
              },
            ]
          },

//2025_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "The Disco Feeler Bowl",
            bowlArt: "artwork/2025/CS2.png",
            theme: {accent: "#d45bdc", dark: "#241640", soft: "#eadcf3"},

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 98.30,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 6.90},
                    {name: "Kyren Williams",position: "RB",nflTeam: "LAR",points: 11.50},
                    {name: "Quinshon Judkins",position: "RB",nflTeam: "CLE",points: 10.10},
                    {name: "Nico Collins",position: "WR",nflTeam: "HOU",points: 9.90},
                    {name: "Chris Olave",position: "WR",nflTeam: "NO",points: 36.80},
                    {name: "Dalton Kincaid",position: "TE",nflTeam: "BUF",points: 0.00},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 14.10},
                    {name: "Chase McLaughlin",position: "K",nflTeam: "TB",points: 10.00},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: -1.00}
                  ],
                  bench: [
                    {name: "Tony Pollard",position: "RB",nflTeam: "TEN",points: 10.20},
                    {name: "John Metchie",position: "WR",nflTeam: "NYJ",points: 1.40},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 13.50},
                    {name: "Brenton Strange",position: "TE",nflTeam: "JAX",points: 14.90},
                    {name: "Marvin Harrison",position: "WR",nflTeam: "ARI",points: 2.40},
                    {name: "Ollie Gordon",position: "RB",nflTeam: "MIA",points: -0.10},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 62.78,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Bo Nix",position: "QB",nflTeam: "DEN",points: 15.18},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "KC",points: 0.20},
                    {name: "TreVeyon Henderson",position: "RB",nflTeam: "NE",points: 2.20},
                    {name: "DK Metcalf",position: "WR",nflTeam: "PIT",points: 8.20},
                    {name: "Wan'Dale Robinson",position: "WR",nflTeam: "NYG",points: 5.20},
                    {name: "Tyler Warren",position: "TE",nflTeam: "IND",points: 6.00},
                    {name: "Brian Thomas",position: "WR",nflTeam: "JAX",points: 3.80},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 16.00},
                    {name: "Jacksonville Jaguars",position: "DEF",nflTeam: "JAX",points: 6.00}
                  ],
                  bench: [
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 7.20},
                    {name: "Tre Tucker",position: "WR",nflTeam: "LV",points: 9.40},
                    {name: "Devaughn Vele",position: "WR",nflTeam: "NO",points: 0.00},
                    {name: "Ricky Pearsall",position: "WR",nflTeam: "SF",points: 0.00},
                    {name: "Devin Neal",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 5.00},
                  ]
                }
              },
            ]
          },

//2025_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "Brycen Shut the Fuck Up Bowl",
            bowlArt: "artwork/2025/F7.png",
            theme: {accent: "#d6a35b", dark: "#354238", soft: "#eee0c8"},

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 111.32,
                touchdowns: 9,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Brock Purdy",position: "QB",nflTeam: "SF",points: 36.92},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 17.40},
                    {name: "Javonte Williams",position: "RB",nflTeam: "DAL",points: 11.40},
                    {name: "Jauan Jennings",position: "WR",nflTeam: "SF",points: 12.20},
                    {name: "Zay Flowers",position: "WR",nflTeam: "BAL",points: 13.00},
                    {name: "Taysom Hill",position: "TE",nflTeam: "NO",points: 0.00},
                    {name: "Jaylen Warren",position: "RB",nflTeam: "PIT",points: 6.40},
                    {name: "Harrison Mevis",position: "K",nflTeam: "LAR",points: 6.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 8.00}
                  ],
                  bench: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 2.08},
                    {name: "Baker Mayfield",position: "QB",nflTeam: "TB",points: 17.44},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 7.00},
                    {name: "Khalil Shakir",position: "WR",nflTeam: "BUF",points: 9.50},
                    {name: "Brock Bowers",position: "TE",nflTeam: "LV",points: 0.00},
                    {name: "Bhayshul Tuten",position: "RB",nflTeam: "JAX",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 116.78,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 23.18},
                    {name: "Tony Pollard",position: "RB",nflTeam: "TEN",points: 11.50},
                    {name: "Kyren Williams",position: "RB",nflTeam: "LAR",points: 16.00},
                    {name: "Nico Collins",position: "WR",nflTeam: "HOU",points: 8.70},
                    {name: "Chris Olave",position: "WR",nflTeam: "NO",points: 25.90},
                    {name: "Brenton Strange",position: "TE",nflTeam: "JAX",points: 8.40},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 12.10},
                    {name: "Chase McLaughlin",position: "K",nflTeam: "TB",points: 5.00},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: 6.00}
                  ],
                  bench: [
                    {name: "John Metchie",position: "WR",nflTeam: "NYJ",points: 7.10},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 3.20},
                    {name: "Dalton Kincaid",position: "TE",nflTeam: "BUF",points: 0.00},
                    {name: "Marvin Harrison",position: "WR",nflTeam: "ARI",points: 0.00},
                    {name: "Ollie Gordon",position: "RB",nflTeam: "MIA",points: 0.00},
                    {name: "Tyler Shough",position: "QB",nflTeam: "NO",points: 21.92},
                  ]
                }
              },
            ]
          },

//2025_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "The Pierogi Bowl",
            bowlArt: "artwork/2025/F9.png",
            theme: {accent: "#d59a39", dark: "#173b55", soft: "#f3e0b8"},

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 79.74,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "ATL",points: 9.14},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "GB",points: 1.30},
                    {name: "Rico Dowdle",position: "RB",nflTeam: "CAR",points: 9.30},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 0.70},
                    {name: "Ladd McConkey",position: "WR",nflTeam: "LAC",points: 4.10},
                    {name: "Trey McBride",position: "TE",nflTeam: "ARI",points: 23.60},
                    {name: "RJ Harvey",position: "RB",nflTeam: "DEN",points: 18.60},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 8.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 5.00}
                  ],
                  bench: [
                    {name: "Emanuel Wilson",position: "RB",nflTeam: "GB",points: 3.40},
                    {name: "Adonai Mitchell",position: "WR",nflTeam: "NYJ",points: 5.20},
                    {name: "Jaylen Wright",position: "RB",nflTeam: "MIA",points: 5.60},
                    {name: "Shedeur Sanders",position: "QB",nflTeam: "CLE",points: 9.44},
                    {name: "Jaxson Dart",position: "QB",nflTeam: "NYG",points: 25.08},
                    {name: "Emeka Egbuka",position: "WR",nflTeam: "TB",points: 5.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 113.88,
                touchdowns: 3,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Bo Nix",position: "QB",nflTeam: "DEN",points: 19.48},
                    {name: "Audric Estime",position: "RB",nflTeam: "NO",points: 16.80},
                    {name: "TreVeyon Henderson",position: "RB",nflTeam: "NE",points: 8.20},
                    {name: "Wan'Dale Robinson",position: "WR",nflTeam: "NYG",points: 22.30},
                    {name: "Brian Thomas",position: "WR",nflTeam: "JAX",points: 7.90},
                    {name: "Tyler Warren",position: "TE",nflTeam: "IND",points: 9.30},
                    {name: "Tre Tucker",position: "WR",nflTeam: "LV",points: 9.90},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 10.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 10.00}
                  ],
                  bench: [
                    {name: "Kareem Hunt",position: "RB",nflTeam: "KC",points: 3.80},
                    {name: "DK Metcalf",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 3.60},
                    {name: "Ricky Pearsall",position: "WR",nflTeam: "SF",points: 13.50},
                    {name: "Devin Neal",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Jacksonville Jaguars",position: "DEF",nflTeam: "JAX",points: 7.00},
                  ]
                }
              },
            ]
          },


//2025_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "The MR Memorial Bowl",
            bowlArt: "artwork/2025/F11.png",
            theme: {accent: "#c58c55", dark: "#303033", soft: "#e6ded3"},

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 102.00,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Caleb Williams",position: "QB",nflTeam: "CHI",points: 23.00},
                    {name: "Travis Etienne",position: "RB",nflTeam: "JAX",points: 11.20},
                    {name: "Kenneth Gainwell",position: "RB",nflTeam: "PIT",points: 6.80},
                    {name: "Romeo Doubs",position: "WR",nflTeam: "GB",points: 9.20},
                    {name: "Kyle Williams",position: "WR",nflTeam: "NE",points: 5.00},
                    {name: "Jake Ferguson",position: "TE",nflTeam: "DAL",points: 7.60},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 27.20},
                    {name: "Jake Bates",position: "K",nflTeam: "DET",points: 5.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 7.00}
                  ],
                  bench: [
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 2.70},
                    {name: "Darren Waller",position: "TE",nflTeam: "MIA",points: 1.00},
                    {name: "Mack Hollins",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 6.80},
                    {name: "David Montgomery",position: "RB",nflTeam: "DET",points: 6.00},
                    {name: "Jordan Addison",position: "WR",nflTeam: "MIN",points: 12.50},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 117.42,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Trevor Lawrence",position: "QB",nflTeam: "JAX",points: 23.12},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "CHI",points: 21.90},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 7.70},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 8.00},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 11.30},
                    {name: "Juwan Johnson",position: "TE",nflTeam: "NO",points: 13.50},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "JAX",points: 7.90},
                    {name: "Andy Borregales",position: "K",nflTeam: "NE",points: 6.00},
                    {name: "New York Giants",position: "DEF",nflTeam: "NYG",points: 18.00}
                  ],
                  bench: [
                    {name: "Matt Gay",position: "K",nflTeam: "FA",points: 0.00},
                  ]
                }
              },
            ]
          },
        ],
//END 2025 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },

//END2025!!!!!!!!!!!!!!!!!!!!!!!!!!END2025!!!!!!!!!!!!PASTE DIRECTLY BELOW!!!!!!!END2025!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2025








//START YEAR 2024

    2024: {
      format: "current",
      teams: {
        p1: {name: "COUNT DRAFTULA",owner: "Keith",art: "artwork/2024/p1.png"},
        p2: {name: "Raven Bros Circus",owner: "Jordan",art: "artwork/2024/p2.png"},
        p3: {name: "Aubrey Road",owner: "Bailey",art: "artwork/2024/p3.png"},
        p4: {name: "Armory Road Trucks",owner: "Mike",art: "artwork/2024/p4.png"},
        p5: {name: "BPT-MPB",owner: "Brycen",art: "artwork/2024/p5.png"},
        p6: {name: "Pete and His Dawgs",owner: "Will",art: "artwork/2024/p6.png"},
        c1: {name: "Talladerrick Nights",owner: "David",art: "artwork/2024/c1.png"},
        c2: {name: "JMFA The Empire Hitsticks Back",owner: "Ethan",art: "artwork/2024/c2.png"},
        c3: {name: "Atlanta Nitro Hawgs",owner: "Cody",art: "artwork/2024/c3.png"},
        c4: {name: "Mikes Financial Advisor",owner: "Max",art: "artwork/2024/c4.png"},
        c5: {name: "The Stroud Boys",owner: "Matt",art: "artwork/2024/c5.png"},
        c6: {name: "The Home Deebo",owner: "Chris",art: "artwork/2024/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2024_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "Battle of the Bulge",
  bowlArt: "artwork/2024/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 172.04,
      touchdowns: 9,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 16.84},
                    {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 18.60},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "GB",points: 21.60},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 36.90},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 26.60},
                    {name: "Trey McBride",position: "TE",nflTeam: "ARI",points: 17.70},
                    {name: "Ladd McConkey",position: "WR",nflTeam: "LAC",points: 16.80},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 9.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 8.00}
                  ],
                  bench: [
                    {name: "Allen Lazard",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Sam Darnold",position: "QB",nflTeam: "SEA",points: 11.24},
                    {name: "Joshua Palmer",position: "WR",nflTeam: "BUF",points: 3.00},
                    {name: "Jerome Ford",position: "RB",nflTeam: "CLE",points: 18.40},
                    {name: "Tank Dell",position: "WR",nflTeam: "HOU",points: 6.10},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 1.00},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 154.68,
      touchdowns: 9,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 41.28},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 5.70},
                    {name: "Breece Hall",position: "RB",nflTeam: "NYJ",points: 13.10},
                    {name: "Jauan Jennings",position: "WR",nflTeam: "SF",points: 5.10},
                    {name: "Khalil Shakir",position: "WR",nflTeam: "BUF",points: 15.90},
                    {name: "Jonnu Smith",position: "TE",nflTeam: "MIA",points: 19.80},
                    {name: "James Conner",position: "RB",nflTeam: "ARI",points: 30.80},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 8.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 15.00}
                  ],
                  bench: [
                    {name: "Gus Edwards",position: "RB",nflTeam: "LAC",points: 2.30},
                    {name: "Marquise Brown",position: "WR",nflTeam: "KC",points: 0.00},
                    {name: "Darnell Mooney",position: "WR",nflTeam: "ATL",points: 0.00},
                    {name: "Xavier Worthy",position: "WR",nflTeam: "KC",points: 19.60},
                    {name: "Braelon Allen",position: "RB",nflTeam: "NYJ",points: 0.50},
                    {name: "Trey Benson",position: "RB",nflTeam: "ARI",points: 2.20},
                  ]
                }
    },
  ]
},



//2024_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "The Bloodbath Bowl",
            bowlArt: "artwork/2024/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 101.56,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 10.06},
                    {name: "Najee Harris",position: "RB",nflTeam: "LAC",points: 3.10},
                    {name: "Jahmyr Gibbs",position: "RB",nflTeam: "DET",points: 28.40},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "SEA",points: 0.00},
                    {name: "Garrett Wilson",position: "WR",nflTeam: "NYJ",points: 14.60},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 10.10},
                    {name: "Jordan Addison",position: "WR",nflTeam: "MIN",points: 13.30},
                    {name: "Brandon Aubrey",position: "K",nflTeam: "DAL",points: 16.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 6.00}
                  ],
                  bench: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 41.06},
                    {name: "Will Dissly",position: "TE",nflTeam: "LAC",points: 0.00},
                    {name: "Javonte Williams",position: "RB",nflTeam: "DAL",points: 4.30},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 11.10},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 8.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 137.48,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Brock Purdy",position: "QB",nflTeam: "SF",points: 3.98},
                    {name: "Kyren Williams",position: "RB",nflTeam: "LAR",points: 13.20},
                    {name: "Bijan Robinson",position: "RB",nflTeam: "ATL",points: 14.50},
                    {name: "Davante Adams",position: "WR",nflTeam: "LAR",points: 42.80},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 14.30},
                    {name: "Zach Ertz",position: "TE",nflTeam: "WAS",points: 4.50},
                    {name: "Keenan Allen",position: "WR",nflTeam: "CHI",points: 20.20},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 9.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 15.00}
                  ],
                  bench: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "ATL",points: 6.48},
                    {name: "Ray-Ray McCloud",position: "WR",nflTeam: "ATL",points: 2.40},
                    {name: "Noah Fant",position: "TE",nflTeam: "SEA",points: 4.50},
                    {name: "Cedric Tillman",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "Tank Bigsby",position: "RB",nflTeam: "JAX",points: 4.20},
                    {name: "Xavier Legette",position: "WR",nflTeam: "CAR",points: 2.90},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2024_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "The R.A.N.D.O.M Bowl",
            bowlArt: "artwork/2024/PS1.png",
            theme: {accent: "#59c4cf", dark: "#352451", soft: "#e3dff2"},

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 143.02,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Baker Mayfield",position: "QB",nflTeam: "TB",points: 22.32},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "PHI",points: 27.00},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 32.50},
                    {name: "Adam Thielen",position: "WR",nflTeam: "CAR",points: 15.30},
                    {name: "Jalen McMillan",position: "WR",nflTeam: "TB",points: 16.70},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "MIN",points: 4.70},
                    {name: "Calvin Austin",position: "WR",nflTeam: "PIT",points: 10.50},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 8.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 6.00}
                  ],
                  bench: [
                    {name: "Calvin Ridley",position: "WR",nflTeam: "TEN",points: 16.80},
                    {name: "Jordan Love",position: "QB",nflTeam: "GB",points: 11.48},
                    {name: "Wan'Dale Robinson",position: "WR",nflTeam: "NYG",points: 13.20},
                    {name: "George Pickens",position: "WR",nflTeam: "DAL",points: 0.00},
                    {name: "Dalton Kincaid",position: "TE",nflTeam: "BUF",points: 5.50},
                    {name: "Josh Downs",position: "WR",nflTeam: "IND",points: 15.10},
                  ]
                }
              },
              {
                teamId: "p4",
                seed: 4,
                score: 125.08,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 21.98},
                    {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 12.30},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "GB",points: 20.70},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 11.90},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 17.50},
                    {name: "Trey McBride",position: "TE",nflTeam: "ARI",points: 5.00},
                    {name: "Ladd McConkey",position: "WR",nflTeam: "LAC",points: 14.70},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 7.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 14.00}
                  ],
                  bench: [
                    {name: "Allen Lazard",position: "WR",nflTeam: "NYJ",points: 4.00},
                    {name: "Sam Darnold",position: "QB",nflTeam: "SEA",points: 22.94},
                    {name: "Joshua Palmer",position: "WR",nflTeam: "BUF",points: 9.10},
                    {name: "Jerome Ford",position: "RB",nflTeam: "CLE",points: 24.10},
                    {name: "Tank Dell",position: "WR",nflTeam: "HOU",points: 21.80},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 7.00},
                  ]
                }
              },
            ]
          },



//2024_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "The Jordan Lynch Super Bowl",
            bowlArt: "artwork/2024/PS2.png",
            theme: {accent: "#a98a5d", dark: "#24282c", soft: "#e1ddd3"},

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 139.78,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 20.48},
                    {name: "Rico Dowdle",position: "RB",nflTeam: "CAR",points: 8.10},
                    {name: "De'Von Achane",position: "RB",nflTeam: "MIA",points: 31.00},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 19.00},
                    {name: "Zay Flowers",position: "WR",nflTeam: "BAL",points: 15.30},
                    {name: "Brock Bowers",position: "TE",nflTeam: "LV",points: 20.90},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 14.00},
                    {name: "Wil Lutz",position: "K",nflTeam: "DEN",points: 12.00},
                    {name: "Tennessee Titans",position: "DEF",nflTeam: "TEN",points: -1.00}
                  ],
                  bench: [
                    {name: "Tony Pollard",position: "RB",nflTeam: "TEN",points: 8.00},
                    {name: "Pat Freiermuth",position: "TE",nflTeam: "PIT",points: 4.60},
                    {name: "Christian Watson",position: "WR",nflTeam: "GB",points: 2.30},
                    {name: "Tyjae Spears",position: "RB",nflTeam: "TEN",points: 21.60},
                    {name: "Quentin Johnston",position: "WR",nflTeam: "LAC",points: 4.80},
                    {name: "Detroit Lions",position: "DEF",nflTeam: "DET",points: 7.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 150.32,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Brock Purdy",position: "QB",nflTeam: "SF",points: 21.12},
                    {name: "Kyren Williams",position: "RB",nflTeam: "LAR",points: 19.90},
                    {name: "Bijan Robinson",position: "RB",nflTeam: "ATL",points: 24.30},
                    {name: "Davante Adams",position: "WR",nflTeam: "LAR",points: 19.80},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 10.90},
                    {name: "Brenton Strange",position: "TE",nflTeam: "JAX",points: 2.20},
                    {name: "Keenan Allen",position: "WR",nflTeam: "CHI",points: 29.10},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 6.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 17.00}
                  ],
                  bench: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "NYJ",points: 12.84},
                    {name: "Zach Ertz",position: "TE",nflTeam: "WAS",points: 2.20},
                    {name: "Ray-Ray McCloud",position: "WR",nflTeam: "ATL",points: 5.70},
                    {name: "Mike Gesicki",position: "TE",nflTeam: "CIN",points: 3.40},
                    {name: "Tank Bigsby",position: "RB",nflTeam: "JAX",points: 10.10},
                    {name: "Keon Coleman",position: "WR",nflTeam: "BUF",points: 2.70},
                  ]
                }
              },
            ]
          },


//2024_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "The City of Homes Bowl",
            bowlArt: "artwork/2024/F1.png",
            theme: {accent: "#f0a24d", dark: "#24344f", soft: "#f7e2c8"},

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 154.96,
                touchdowns: 9,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Baker Mayfield",position: "QB",nflTeam: "TB",points: 34.56},
                    {name: "Ameer Abdullah",position: "RB",nflTeam: "LV",points: 17.70},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "PHI",points: 18.90},
                    {name: "Adam Thielen",position: "WR",nflTeam: "CAR",points: 28.00},
                    {name: "George Pickens",position: "WR",nflTeam: "DAL",points: 8.00},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "MIN",points: 11.80},
                    {name: "Jalen McMillan",position: "WR",nflTeam: "TB",points: 23.00},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 8.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 5.00}
                  ],
                  bench: [
                    {name: "Calvin Ridley",position: "WR",nflTeam: "TEN",points: 14.10},
                    {name: "Jordan Love",position: "QB",nflTeam: "GB",points: 14.00},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Calvin Austin",position: "WR",nflTeam: "PIT",points: 7.10},
                    {name: "Dalton Kincaid",position: "TE",nflTeam: "BUF",points: 4.40},
                    {name: "Josh Downs",position: "WR",nflTeam: "IND",points: 5.20},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 134.28,
                touchdowns: 8,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Brock Purdy",position: "QB",nflTeam: "SF",points: 30.28},
                    {name: "Kyren Williams",position: "RB",nflTeam: "LAR",points: 16.20},
                    {name: "Bijan Robinson",position: "RB",nflTeam: "ATL",points: 24.80},
                    {name: "Davante Adams",position: "WR",nflTeam: "LAR",points: 9.70},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 17.60},
                    {name: "Zach Ertz",position: "TE",nflTeam: "WAS",points: 25.20},
                    {name: "Keenan Allen",position: "WR",nflTeam: "CHI",points: 7.50},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 0.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 3.00}
                  ],
                  bench: [
                    {name: "Raheem Mostert",position: "RB",nflTeam: "LV",points: 3.90},
                    {name: "Ray-Ray McCloud",position: "WR",nflTeam: "ATL",points: 3.70},
                    {name: "Tank Bigsby",position: "RB",nflTeam: "JAX",points: 3.30},
                    {name: "Jaleel McLaughlin",position: "RB",nflTeam: "DEN",points: 9.60},
                    {name: "Blake Corum",position: "RB",nflTeam: "LAR",points: -0.40},
                    {name: "Drake Maye",position: "QB",nflTeam: "NE",points: 9.88},
                  ]
                }
              },
            ]
          },


//2024_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "The Bronze Chair Bowl",
            bowlArt: "artwork/2024/F3.png",
            theme: {accent: "#9a6a3a", dark: "#3f352d", soft: "#e9dfd2"},

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 178.18,
                touchdowns: 11,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 36.98},
                    {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 11.70},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "GB",points: 10.90},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 29.70},
                    {name: "Ladd McConkey",position: "WR",nflTeam: "LAC",points: 29.40},
                    {name: "Trey McBride",position: "TE",nflTeam: "ARI",points: 30.30},
                    {name: "Jerome Ford",position: "RB",nflTeam: "CLE",points: 2.20},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 8.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 19.00}
                  ],
                  bench: [
                    {name: "Allen Lazard",position: "WR",nflTeam: "NYJ",points: 1.90},
                    {name: "Sam Darnold",position: "QB",nflTeam: "SEA",points: 24.78},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 0.00},
                    {name: "Joshua Palmer",position: "WR",nflTeam: "BUF",points: 8.10},
                    {name: "Tank Dell",position: "WR",nflTeam: "HOU",points: 0.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 13.00},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 109.42,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 29.42},
                    {name: "Tyjae Spears",position: "RB",nflTeam: "TEN",points: 13.30},
                    {name: "De'Von Achane",position: "RB",nflTeam: "MIA",points: 5.80},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 12.20},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 20.00},
                    {name: "Brock Bowers",position: "TE",nflTeam: "LV",points: 14.60},
                    {name: "Zay Flowers",position: "WR",nflTeam: "BAL",points: 5.10},
                    {name: "Wil Lutz",position: "K",nflTeam: "DEN",points: 6.00},
                    {name: "Tennessee Titans",position: "DEF",nflTeam: "TEN",points: 3.00}
                  ],
                  bench: [
                    {name: "Tony Pollard",position: "RB",nflTeam: "TEN",points: 0.00},
                    {name: "Rico Dowdle",position: "RB",nflTeam: "CAR",points: 9.80},
                    {name: "Pat Freiermuth",position: "TE",nflTeam: "PIT",points: 11.00},
                    {name: "Christian Watson",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Quentin Johnston",position: "WR",nflTeam: "LAC",points: 9.80},
                    {name: "Detroit Lions",position: "DEF",nflTeam: "DET",points: 5.00},
                  ]
                }
              },
            ]
          },


//2024_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "The Crosby Studios Bowl",
            bowlArt: "artwork/2024/F5.png",
            theme: {accent: "#74b9e6", dark: "#244f73", soft: "#f4f7f8"},
            artPosition: {modal: "center 42%"},

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 93.78,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 22.98},
                    {name: "James Conner",position: "RB",nflTeam: "ARI",points: 2.80},
                    {name: "Breece Hall",position: "RB",nflTeam: "NYJ",points: 6.30},
                    {name: "Khalil Shakir",position: "WR",nflTeam: "BUF",points: 5.50},
                    {name: "Xavier Worthy",position: "WR",nflTeam: "KC",points: 22.90},
                    {name: "Jonnu Smith",position: "TE",nflTeam: "MIA",points: 11.60},
                    {name: "Darnell Mooney",position: "WR",nflTeam: "ATL",points: 5.70},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 4.00},
                    {name: "Las Vegas Raiders",position: "DEF",nflTeam: "LV",points: 12.00}
                  ],
                  bench: [
                    {name: "Gus Edwards",position: "RB",nflTeam: "LAC",points: 0.00},
                    {name: "Marquise Brown",position: "WR",nflTeam: "KC",points: 8.60},
                    {name: "Jauan Jennings",position: "WR",nflTeam: "SF",points: 13.70},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 1.80},
                    {name: "Braelon Allen",position: "RB",nflTeam: "NYJ",points: 2.60},
                    {name: "Trey Benson",position: "RB",nflTeam: "ARI",points: 0.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 134.82,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 25.82},
                    {name: "Najee Harris",position: "RB",nflTeam: "LAC",points: 10.10},
                    {name: "Jahmyr Gibbs",position: "RB",nflTeam: "DET",points: 26.30},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "SEA",points: 3.90},
                    {name: "Garrett Wilson",position: "WR",nflTeam: "NYJ",points: 17.60},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 19.20},
                    {name: "Jordan Addison",position: "WR",nflTeam: "MIN",points: 18.90},
                    {name: "Brandon Aubrey",position: "K",nflTeam: "DAL",points: 1.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 12.00}
                  ],
                  bench: [
                    {name: "Will Dissly",position: "TE",nflTeam: "LAC",points: 4.10},
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 16.04},
                    {name: "Javonte Williams",position: "RB",nflTeam: "DAL",points: 2.00},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 1.60},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 17.00},
                  ]
                }
              },
            ]
          },
        ],


//END 2024 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2024_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2024/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 99.54,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jayden Daniels",position: "QB",nflTeam: "WAS",points: 23.64},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 17.00},
                    {name: "Brian Robinson",position: "RB",nflTeam: "WAS",points: 11.70},
                    {name: "DK Metcalf",position: "WR",nflTeam: "PIT",points: 5.80},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 19.80},
                    {name: "Cole Kmet",position: "TE",nflTeam: "CHI",points: 2.40},
                    {name: "Marvin Harrison",position: "WR",nflTeam: "ARI",points: 5.20},
                    {name: "Jake Moody",position: "K",nflTeam: "SF",points: 9.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 5.00}
                  ],
                  bench: [
                    {name: "David Njoku",position: "TE",nflTeam: "CLE",points: 0.00},
                    {name: "Travis Homer",position: "RB",nflTeam: "CHI",points: 0.70},
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 9.80},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 28.00},
                    {name: "Anthony Richardson",position: "QB",nflTeam: "IND",points: 14.38},
                    {name: "Isaiah Davis",position: "RB",nflTeam: "NYJ",points: 3.60},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 123.94,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "C.J. Stroud",position: "QB",nflTeam: "HOU",points: 11.64},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "CHI",points: 9.90},
                    {name: "Chase Brown",position: "RB",nflTeam: "CIN",points: 26.30},
                    {name: "Nico Collins",position: "WR",nflTeam: "HOU",points: 17.70},
                    {name: "Puka Nacua",position: "WR",nflTeam: "LAR",points: 17.80},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 3.30},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 20.30},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 10.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 7.00}
                  ],
                  bench: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "NYG",points: 8.42},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "BAL",points: 8.60},
                    {name: "J.K. Dobbins",position: "RB",nflTeam: "LAC",points: 0.00},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 6.80},
                    {name: "Rashod Bateman",position: "WR",nflTeam: "BAL",points: 23.00},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 0.00},
                  ]
                }
              },
            ]
          },

//2024_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2024/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 125.80,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 13.80},
                    {name: "Joe Mixon",position: "RB",nflTeam: "HOU",points: 10.60},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 26.30},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "MIA",points: 5.60},
                    {name: "Malik Nabers",position: "WR",nflTeam: "NYG",points: 24.20},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 10.40},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "LV",points: 10.90},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 9.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 15.00}
                  ],
                  bench: [
                    {name: "Marquez Valdes-Scantling",position: "WR",nflTeam: "SEA",points: 8.80},
                    {name: "Noah Gray",position: "TE",nflTeam: "KC",points: 10.10},
                    {name: "Tyler Allgeier",position: "RB",nflTeam: "ATL",points: 4.30},
                    {name: "Parker Washington",position: "WR",nflTeam: "JAX",points: 8.40},
                    {name: "Bo Nix",position: "QB",nflTeam: "DEN",points: 13.50},
                    {name: "Bucky Irving",position: "RB",nflTeam: "TB",points: 13.30},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 105.74,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tua Tagovailoa",position: "QB",nflTeam: "MIA",points: 3.84},
                    {name: "Zach Charbonnet",position: "RB",nflTeam: "SEA",points: 13.60},
                    {name: "Isaac Guerendo",position: "RB",nflTeam: "SF",points: 11.50},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 25.00},
                    {name: "Brian Thomas",position: "WR",nflTeam: "JAX",points: 32.50},
                    {name: "Cade Otton",position: "TE",nflTeam: "TB",points: 4.40},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "WAS",points: 4.90},
                    {name: "Jake Bates",position: "K",nflTeam: "DET",points: 6.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 4.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "LAR",points: 8.20},
                    {name: "Travis Etienne",position: "RB",nflTeam: "JAX",points: 12.50},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 9.50},
                    {name: "Jake Ferguson",position: "TE",nflTeam: "DAL",points: 4.30},
                    {name: "Jaylen Warren",position: "RB",nflTeam: "PIT",points: 2.50},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 21.00},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2024_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "Totino's Pizza Roll Bowl",
            bowlArt: "artwork/2024/CS1.png",
            theme: {accent: "#d99a3d", dark: "#6b3e1f", soft: "#f5e4c4"},

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 108.74,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 4.54},
                    {name: "Derrick Henry",position: "RB",nflTeam: "BAL",points: 20.90},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIA",points: 15.60},
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "CLE",points: 4.00},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 22.40},
                    {name: "Sam LaPorta",position: "TE",nflTeam: "DET",points: 14.30},
                    {name: "Romeo Doubs",position: "WR",nflTeam: "GB",points: 4.00},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 21.00},
                    {name: "Los Angeles Chargers",position: "DEF",nflTeam: "LAC",points: 2.00}
                  ],
                  bench: [
                    {name: "Amari Cooper",position: "WR",nflTeam: "BUF",points: 2.00},
                    {name: "Jeremy McNichols",position: "RB",nflTeam: "WAS",points: 7.80},
                    {name: "Justice Hill",position: "RB",nflTeam: "BAL",points: 3.00},
                    {name: "Patrick Taylor",position: "RB",nflTeam: "SF",points: 3.50},
                    {name: "Tucker Kraft",position: "TE",nflTeam: "GB",points: 9.50},
                    {name: "Rome Odunze",position: "WR",nflTeam: "CHI",points: 9.70},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 129.56,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "C.J. Stroud",position: "QB",nflTeam: "HOU",points: 16.06},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 13.90},
                    {name: "Chase Brown",position: "RB",nflTeam: "CIN",points: 13.90},
                    {name: "Nico Collins",position: "WR",nflTeam: "HOU",points: 13.00},
                    {name: "Puka Nacua",position: "WR",nflTeam: "LAR",points: 13.60},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 1.70},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 36.40},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 19.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 2.00}
                  ],
                  bench: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "NYG",points: 15.38},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "BAL",points: 7.70},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 15.50},
                    {name: "J.K. Dobbins",position: "RB",nflTeam: "LAC",points: 0.00},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "CHI",points: 8.30},
                    {name: "Rashod Bateman",position: "WR",nflTeam: "BAL",points: 8.40},
                  ]
                }
              },
            ]
          },

//2024_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "The Disco Feeler Bowl",
            bowlArt: "artwork/2024/CS2.png",
            theme: {accent: "#d45bdc", dark: "#241640", soft: "#eadcf3"},

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 135.08,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Michael Penix",position: "QB",nflTeam: "ATL",points: 6.38},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 39.80},
                    {name: "Tyrone Tracy",position: "RB",nflTeam: "NYG",points: 16.90},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 17.00},
                    {name: "Jaxon Smith-Njigba",position: "WR",nflTeam: "SEA",points: 24.00},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 8.00},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 10.00},
                    {name: "Cameron Dicker",position: "K",nflTeam: "LAC",points: 10.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 3.00}
                  ],
                  bench: [
                    {name: "Hunter Henry",position: "TE",nflTeam: "NE",points: 13.90},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "KC",points: 15.90},
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 23.70},
                    {name: "Jameson Williams",position: "WR",nflTeam: "DET",points: 26.00},
                    {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 11.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 3.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 118.46,
                touchdowns: 6,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 22.16},
                    {name: "Joe Mixon",position: "RB",nflTeam: "HOU",points: 8.10},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 27.60},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "MIA",points: 11.90},
                    {name: "Malik Nabers",position: "WR",nflTeam: "NYG",points: 13.80},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 13.80},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "LV",points: 6.10},
                    {name: "Chase McLaughlin",position: "K",nflTeam: "TB",points: 7.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 8.00}
                  ],
                  bench: [
                    {name: "Marquez Valdes-Scantling",position: "WR",nflTeam: "SEA",points: 0.00},
                    {name: "Noah Gray",position: "TE",nflTeam: "KC",points: 2.00},
                    {name: "Tyler Allgeier",position: "RB",nflTeam: "ATL",points: 4.10},
                    {name: "Parker Washington",position: "WR",nflTeam: "JAX",points: 11.40},
                    {name: "Bo Nix",position: "QB",nflTeam: "DEN",points: 21.02},
                    {name: "Bucky Irving",position: "RB",nflTeam: "TB",points: 18.20},
                  ]
                }
              },
            ]
          },

//2024_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "The Edge Bowl",
            bowlArt: "artwork/2024/F7.png",
            theme: {accent: "#c07a43", dark: "#3a2d29", soft: "#ead8ca"},

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 145.82,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Michael Penix",position: "QB",nflTeam: "ATL",points: 11.22},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 27.60},
                    {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 4.40},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 16.50},
                    {name: "Jaxon Smith-Njigba",position: "WR",nflTeam: "SEA",points: 6.20},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 22.40},
                    {name: "Jameson Williams",position: "WR",nflTeam: "DET",points: 24.50},
                    {name: "Cameron Dicker",position: "K",nflTeam: "LAC",points: 17.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 16.00}
                  ],
                  bench: [
                    {name: "Hunter Henry",position: "TE",nflTeam: "NE",points: 0.00},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "KC",points: 8.00},
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 26.00},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 1.50},
                    {name: "Tyrone Tracy",position: "RB",nflTeam: "NYG",points: 9.30},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 8.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 94.40,
                touchdowns: 0,
                winner: false,

                lineup: {
                  starters: [
                    {name: "C.J. Stroud",position: "QB",nflTeam: "HOU",points: 6.10},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "CHI",points: 12.10},
                    {name: "Chase Brown",position: "RB",nflTeam: "CIN",points: 13.10},
                    {name: "Nico Collins",position: "WR",nflTeam: "HOU",points: 8.90},
                    {name: "Puka Nacua",position: "WR",nflTeam: "LAR",points: 22.90},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 4.10},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 17.20},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 11.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: -1.00}
                  ],
                  bench: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "NYG",points: 17.70},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "BAL",points: 2.70},
                    {name: "J.K. Dobbins",position: "RB",nflTeam: "LAC",points: 15.30},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 14.40},
                    {name: "Rashod Bateman",position: "WR",nflTeam: "BAL",points: 2.20},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 0.00},
                  ]
                }
              },
            ]
          },

//2024_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "The Pierogi Bowl",
            bowlArt: "artwork/2024/F9.png",
            theme: {accent: "#d59a39", dark: "#173b55", soft: "#f3e0b8"},

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 123.58,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "NYJ",points: 0.48},
                    {name: "Derrick Henry",position: "RB",nflTeam: "BAL",points: 24.50},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIA",points: 4.80},
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "CLE",points: 21.40},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 19.20},
                    {name: "Sam LaPorta",position: "TE",nflTeam: "DET",points: 18.40},
                    {name: "Romeo Doubs",position: "WR",nflTeam: "GB",points: 14.80},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 10.00},
                    {name: "Los Angeles Chargers",position: "DEF",nflTeam: "LAC",points: 10.00}
                  ],
                  bench: [
                    {name: "Amari Cooper",position: "WR",nflTeam: "BUF",points: 14.60},
                    {name: "Jeremy McNichols",position: "RB",nflTeam: "WAS",points: 3.00},
                    {name: "Justice Hill",position: "RB",nflTeam: "BAL",points: 0.00},
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 0.00},
                    {name: "Tucker Kraft",position: "TE",nflTeam: "GB",points: 7.30},
                    {name: "Rome Odunze",position: "WR",nflTeam: "CHI",points: 2.50},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 154.24,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 24.44},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 11.30},
                    {name: "Bucky Irving",position: "RB",nflTeam: "TB",points: 23.00},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "MIA",points: 19.50},
                    {name: "Malik Nabers",position: "WR",nflTeam: "NYG",points: 36.10},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 14.80},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "LV",points: 17.10},
                    {name: "Chase McLaughlin",position: "K",nflTeam: "TB",points: 12.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: -4.00}
                  ],
                  bench: [
                    {name: "Joe Mixon",position: "RB",nflTeam: "HOU",points: 5.90},
                    {name: "Marquez Valdes-Scantling",position: "WR",nflTeam: "SEA",points: 0.00},
                    {name: "Noah Gray",position: "TE",nflTeam: "KC",points: 1.60},
                    {name: "Tyler Allgeier",position: "RB",nflTeam: "ATL",points: 1.90},
                    {name: "Parker Washington",position: "WR",nflTeam: "JAX",points: 12.10},
                    {name: "Bo Nix",position: "QB",nflTeam: "DEN",points: 21.86},
                  ]
                }
              },
            ]
          },


//2024_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "The MR Memorial Bowl",
            bowlArt: "artwork/2024/F11.png",
            theme: {accent: "#c58c55", dark: "#303033", soft: "#e6ded3"},

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 129.68,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jayden Daniels",position: "QB",nflTeam: "WAS",points: 31.78},
                    {name: "Brian Robinson",position: "RB",nflTeam: "WAS",points: 8.90},
                    {name: "Kendre Miller",position: "RB",nflTeam: "NO",points: 2.90},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 40.10},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 30.00},
                    {name: "Jake Ferguson",position: "TE",nflTeam: "DAL",points: 2.80},
                    {name: "DK Metcalf",position: "WR",nflTeam: "PIT",points: 7.20},
                    {name: "Brandon McManus",position: "K",nflTeam: "GB",points: 5.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 1.00}
                  ],
                  bench: [
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Mike Boone",position: "RB",nflTeam: "CAR",points: 1.10},
                    {name: "Patrick Taylor",position: "RB",nflTeam: "SF",points: 0.00},
                    {name: "Raheem Blackshear",position: "RB",nflTeam: "CAR",points: 2.00},
                    {name: "Jordan Mims",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Marvin Harrison",position: "WR",nflTeam: "ARI",points: 15.60},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 81.36,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "LAR",points: 9.16},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 0.10},
                    {name: "Zach Charbonnet",position: "RB",nflTeam: "SEA",points: 10.60},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 12.60},
                    {name: "Brian Thomas",position: "WR",nflTeam: "JAX",points: 23.90},
                    {name: "Chig Okonkwo",position: "TE",nflTeam: "TEN",points: 10.90},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "WAS",points: 9.10},
                    {name: "Jake Bates",position: "K",nflTeam: "DET",points: 9.00},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: -4.00}
                  ],
                  bench: [
                    {name: "Tua Tagovailoa",position: "QB",nflTeam: "MIA",points: 0.00},
                    {name: "Travis Etienne",position: "RB",nflTeam: "JAX",points: 8.50},
                    {name: "Cade Otton",position: "TE",nflTeam: "TB",points: 0.00},
                    {name: "Jaylen Warren",position: "RB",nflTeam: "PIT",points: 16.20},
                    {name: "Isaac Guerendo",position: "RB",nflTeam: "SF",points: 13.90},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 13.00},
                  ]
                }
              },
            ]
          },
        ],
//END 2024 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2024!!!!!!!!!!!!!!!!!!!!!!!!!!END2024!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2024!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2024





//START YEAR 2023

    2023: {
      format: "current",
      teams: {
        p1: {name: "Tuas Concussions One Kupp",owner: "Chris",art: "artwork/2023/p1.png"},
        p2: {name: "Pompano Mokes",owner: "Max",art: "artwork/2023/p2.png"},
        p3: {name: "Atlanta Nitro Hawgs",owner: "Cody",art: "artwork/2023/p3.png"},
        p4: {name: "Free ChiefsAholic",owner: "Brycen",art: "artwork/2023/p4.png"},
        p5: {name: "The Running Backs",owner: "Mike",art: "artwork/2023/p5.png"},
        p6: {name: "Mark of the Beasts",owner: "Jordan",art: "artwork/2023/p6.png"},
        c1: {name: "Plague Dr draft",owner: "Keith",art: "artwork/2023/c1.png"},
        c2: {name: "The NightAmon Cometh",owner: "David",art: "artwork/2023/c2.png"},
        c3: {name: "Jackson Fan Account A New Hope ",owner: "Ethan",art: "artwork/2023/c3.png"},
        c4: {name: "Vick's Dumb Bitches",owner: "Will",art: "artwork/2023/c4.png"},
        c5: {name: "The PissDawgs",owner: "Matt",art: "artwork/2023/c5.png"},
        c6: {name: "McGriddy Twins",owner: "Bailey",art: "artwork/2023/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2023_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2023/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 102.30,
      touchdowns: 3,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 15.70},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 12.30},
                    {name: "Jaylen Warren",position: "RB",nflTeam: "PIT",points: 11.80},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 9.20},
                    {name: "Puka Nacua",position: "WR",nflTeam: "LAR",points: 10.30},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 7.80},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 20.20},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 1.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 14.00}
                  ],
                  bench: [
                    {name: "Jerick McKinnon",position: "RB",nflTeam: "KC",points: 16.16},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 25.50},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 26.10},
                    {name: "Clyde Edwards-Helaire",position: "RB",nflTeam: "KC",points: 20.10},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 0.00},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 89.18,
      touchdowns: 2,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Sam Howell",position: "QB",nflTeam: "SEA",points: 8.28},
                    {name: "David Montgomery",position: "RB",nflTeam: "DET",points: 10.20},
                    {name: "De'Von Achane",position: "RB",nflTeam: "MIA",points: 9.20},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 6.70},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 28.20},
                    {name: "Taysom Hill",position: "TE",nflTeam: "NO",points: 1.50},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 12.10},
                    {name: "Chase McLaughlin",position: "K",nflTeam: "TB",points: 11.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 2.00}
                  ],
                  bench: [
                    {name: "Gardner Minshew",position: "QB",nflTeam: "LV",points: 20.60},
                    {name: "Cole Kmet",position: "TE",nflTeam: "CHI",points: 13.30},
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "CLE",points: 10.40},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 0.00},
                    {name: "Tyler Allgeier",position: "RB",nflTeam: "ATL",points: 6.10},
                    {name: "Jerome Ford",position: "RB",nflTeam: "CLE",points: 7.10},
                  ]
                }
    },
  ]
},



//2023_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2023/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 85.64,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Fields",position: "QB",nflTeam: "PIT",points: 9.64},
                    {name: "Devin Singletary",position: "RB",nflTeam: "NYG",points: 21.00},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "CHI",points: 9.50},
                    {name: "Garrett Wilson",position: "WR",nflTeam: "NYJ",points: 5.90},
                    {name: "Parker Washington",position: "WR",nflTeam: "JAX",points: 5.20},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 6.70},
                    {name: "Ty Chandler",position: "RB",nflTeam: "MIN",points: 24.70},
                    {name: "Cameron Dicker",position: "K",nflTeam: "LAC",points: 3.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 0.00}
                  ],
                  bench: [
                    {name: "Keenan Allen",position: "WR",nflTeam: "CHI",points: 0.00},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "LV",points: 0.00},
                    {name: "Trevor Lawrence",position: "QB",nflTeam: "JAX",points: 14.66},
                    {name: "Kenneth Gainwell",position: "RB",nflTeam: "PHI",points: 2.10},
                    {name: "Zamir White",position: "RB",nflTeam: "LV",points: 17.50},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 152.12,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 21.92},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "WAS",points: 7.80},
                    {name: "Kyren Williams",position: "RB",nflTeam: "LAR",points: 24.50},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 15.70},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 21.90},
                    {name: "Trey McBride",position: "TE",nflTeam: "ARI",points: 20.20},
                    {name: "Rashee Rice",position: "WR",nflTeam: "KC",points: 24.10},
                    {name: "Brandon Aubrey",position: "K",nflTeam: "DAL",points: 4.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 12.00}
                  ],
                  bench: [
                    {name: "Zay Jones",position: "WR",nflTeam: "JAX",points: 10.90},
                    {name: "Tyjae Spears",position: "RB",nflTeam: "TEN",points: 4.70},
                    {name: "Tank Dell",position: "WR",nflTeam: "HOU",points: 0.00},
                    {name: "C.J. Stroud",position: "QB",nflTeam: "HOU",points: 0.00},
                    {name: "Jordan Addison",position: "WR",nflTeam: "MIN",points: 29.10},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2023_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2023/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 108.72,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tua Tagovailoa",position: "QB",nflTeam: "MIA",points: 15.52},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 8.50},
                    {name: "Travis Etienne",position: "RB",nflTeam: "JAX",points: 6.10},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LAR",points: 10.90},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 25.20},
                    {name: "Evan Engram",position: "TE",nflTeam: "JAX",points: 17.50},
                    {name: "Raheem Mostert",position: "RB",nflTeam: "MIA",points: 12.00},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 6.00},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 7.00}
                  ],
                  bench: [
                    {name: "Logan Thomas",position: "TE",nflTeam: "WAS",points: 14.60},
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 20.40},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "LV",points: 7.20},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 6.90},
                    {name: "Breece Hall",position: "RB",nflTeam: "NYJ",points: 43.10},
                    {name: "Zay Flowers",position: "WR",nflTeam: "BAL",points: 22.20},
                  ]
                }
              },
              {
                teamId: "p4",
                seed: 4,
                score: 112.20,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 16.70},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 12.10},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 6.60},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 4.80},
                    {name: "Puka Nacua",position: "WR",nflTeam: "LAR",points: 33.00},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 9.40},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 10.60},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 19.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 0.00}
                  ],
                  bench: [
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 13.90},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 8.00},
                    {name: "Clyde Edwards-Helaire",position: "RB",nflTeam: "KC",points: 7.80},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Jaylen Warren",position: "RB",nflTeam: "PIT",points: 10.40},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 5.00},
                  ]
                }
              },
            ]
          },



//2023_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2023/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 108.60,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Brock Purdy",position: "QB",nflTeam: "SF",points: 2.40},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "SF",points: 25.10},
                    {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 19.70},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "TEN",points: 4.00},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 15.60},
                    {name: "Sam LaPorta",position: "TE",nflTeam: "DET",points: 4.80},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 25.00},
                    {name: "Jake Moody",position: "K",nflTeam: "SF",points: 6.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 6.00}
                  ],
                  bench: [
                    {name: "David Njoku",position: "TE",nflTeam: "CLE",points: 16.40},
                    {name: "Gus Edwards",position: "RB",nflTeam: "LAC",points: 14.00},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "GB",points: 0.00},
                    {name: "Gabe Davis",position: "WR",nflTeam: "JAX",points: 23.00},
                    {name: "Josh Palmer",position: "WR",nflTeam: "LAC",points: 9.70},
                    {name: "George Pickens",position: "WR",nflTeam: "PIT",points: 35.50},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 121.34,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 23.44},
                    {name: "Kyren Williams",position: "RB",nflTeam: "LAR",points: 16.40},
                    {name: "Tyjae Spears",position: "RB",nflTeam: "TEN",points: 11.70},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 27.60},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 9.40},
                    {name: "Trey McBride",position: "TE",nflTeam: "ARI",points: 9.10},
                    {name: "Rashee Rice",position: "WR",nflTeam: "KC",points: 11.70},
                    {name: "Brandon Aubrey",position: "K",nflTeam: "DAL",points: 9.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 3.00}
                  ],
                  bench: [
                    {name: "Zay Jones",position: "WR",nflTeam: "JAX",points: 0.00},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "WAS",points: 11.60},
                    {name: "Tank Dell",position: "WR",nflTeam: "HOU",points: 0.00},
                    {name: "C.J. Stroud",position: "QB",nflTeam: "HOU",points: 0.00},
                    {name: "Jordan Addison",position: "WR",nflTeam: "MIN",points: 1.20},
                  ]
                }
              },
            ]
          },


//2023_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2023/F1.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 140.30,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 12.00},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 29.50},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 16.50},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 30.90},
                    {name: "Puka Nacua",position: "WR",nflTeam: "LAR",points: 18.70},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 4.60},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 16.10},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 5.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 7.00}
                  ],
                  bench: [
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 17.10},
                    {name: "Clyde Edwards-Helaire",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 11.10},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Jaylen Warren",position: "RB",nflTeam: "PIT",points: 19.80},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 14.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 129.98,
                touchdowns: 7,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 19.18},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "WAS",points: 4.00},
                    {name: "Kyren Williams",position: "RB",nflTeam: "LAR",points: 30.10},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 10.00},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 18.20},
                    {name: "Trey McBride",position: "TE",nflTeam: "ARI",points: 10.80},
                    {name: "Rashee Rice",position: "WR",nflTeam: "KC",points: 17.70},
                    {name: "Brandon Aubrey",position: "K",nflTeam: "DAL",points: 11.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 9.00}
                  ],
                  bench: [
                    {name: "Jeff Wilson",position: "RB",nflTeam: "MIA",points: 6.40},
                    {name: "Khalil Herbert",position: "RB",nflTeam: "CHI",points: 20.90},
                    {name: "Tyjae Spears",position: "RB",nflTeam: "TEN",points: 6.90},
                    {name: "Tank Dell",position: "WR",nflTeam: "HOU",points: 0.00},
                    {name: "C.J. Stroud",position: "QB",nflTeam: "HOU",points: 12.92},
                    {name: "Jordan Addison",position: "WR",nflTeam: "MIN",points: 5.80},
                  ]
                }
              },
            ]
          },


//2023_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2023/F3.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 170.88,
                touchdowns: 9,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 23.68},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 6.90},
                    {name: "Breece Hall",position: "RB",nflTeam: "NYJ",points: 27.60},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LAR",points: 12.70},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 40.20},
                    {name: "Evan Engram",position: "TE",nflTeam: "JAX",points: 12.00},
                    {name: "Travis Etienne",position: "RB",nflTeam: "JAX",points: 25.80},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 9.00},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 13.00}
                  ],
                  bench: [
                    {name: "Logan Thomas",position: "TE",nflTeam: "WAS",points: 5.00},
                    {name: "Raheem Mostert",position: "RB",nflTeam: "MIA",points: 0.00},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "LV",points: 11.60},
                    {name: "Tua Tagovailoa",position: "QB",nflTeam: "MIA",points: 14.88},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 9.60},
                    {name: "Zay Flowers",position: "WR",nflTeam: "BAL",points: 19.60},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 103.40,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Brock Purdy",position: "QB",nflTeam: "SF",points: 17.60},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "SF",points: 13.10},
                    {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 8.60},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "TEN",points: 14.20},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 15.60},
                    {name: "Sam LaPorta",position: "TE",nflTeam: "DET",points: 15.40},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 2.90},
                    {name: "Jake Moody",position: "K",nflTeam: "SF",points: 9.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 7.00}
                  ],
                  bench: [
                    {name: "David Njoku",position: "TE",nflTeam: "CLE",points: 17.40},
                    {name: "Gus Edwards",position: "RB",nflTeam: "LAC",points: 10.80},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "GB",points: 0.00},
                    {name: "Gabe Davis",position: "WR",nflTeam: "JAX",points: 4.10},
                    {name: "Josh Palmer",position: "WR",nflTeam: "LAC",points: 0.00},
                    {name: "George Pickens",position: "WR",nflTeam: "PIT",points: 20.10},
                  ]
                }
              },
            ]
          },


//2023_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2023/F5.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 108.60,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Sam Howell",position: "QB",nflTeam: "SEA",points: 6.66},
                    {name: "David Montgomery",position: "RB",nflTeam: "DET",points: 12.50},
                    {name: "De'Von Achane",position: "RB",nflTeam: "MIA",points: 23.70},
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "CLE",points: 8.40},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 24.40},
                    {name: "Taysom Hill",position: "TE",nflTeam: "NO",points: 11.54},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 17.40},
                    {name: "Chase McLaughlin",position: "K",nflTeam: "TB",points: 1.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 3.00}
                  ],
                  bench: [
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 0.00},
                    {name: "Gardner Minshew",position: "QB",nflTeam: "LV",points: 13.26},
                    {name: "Cole Kmet",position: "TE",nflTeam: "CHI",points: 0.00},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Tyler Allgeier",position: "RB",nflTeam: "ATL",points: 15.80},
                    {name: "Jerome Ford",position: "RB",nflTeam: "CLE",points: 26.10},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 101.82,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Fields",position: "QB",nflTeam: "PIT",points: 25.22},
                    {name: "Zamir White",position: "RB",nflTeam: "LV",points: 15.60},
                    {name: "Ty Chandler",position: "RB",nflTeam: "MIN",points: 9.40},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "MIA",points: 13.60},
                    {name: "Garrett Wilson",position: "WR",nflTeam: "NYJ",points: 9.90},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 1.50},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "CHI",points: 7.60},
                    {name: "Cameron Dicker",position: "K",nflTeam: "LAC",points: 13.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 6.00}
                  ],
                  bench: [
                    {name: "Keenan Allen",position: "WR",nflTeam: "CHI",points: 0.00},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "LV",points: 5.00},
                    {name: "Devin Singletary",position: "RB",nflTeam: "NYG",points: 11.60},
                    {name: "Trevor Lawrence",position: "QB",nflTeam: "JAX",points: 0.00},
                    {name: "Kenneth Gainwell",position: "RB",nflTeam: "PHI",points: 6.68},
                    {name: "Parker Washington",position: "WR",nflTeam: "JAX",points: 1.20},
                  ]
                }
              },
            ]
          },
        ],


//END 2023 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2023_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2023/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 103.22,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "PIT",points: 17.52},
                    {name: "Derrick Henry",position: "RB",nflTeam: "BAL",points: 5.00},
                    {name: "James Conner",position: "RB",nflTeam: "ARI",points: 17.90},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "HOU",points: 8.80},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 10.00},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 9.80},
                    {name: "Diontae Johnson",position: "WR",nflTeam: "CAR",points: 16.20},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 5.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 13.00}
                  ],
                  bench: [
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 7.30},
                    {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 10.90},
                    {name: "Nico Collins",position: "WR",nflTeam: "HOU",points: 0.00},
                    {name: "Christian Watson",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Dameon Pierce",position: "RB",nflTeam: "HOU",points: 0.30},
                    {name: "Cade Otton",position: "TE",nflTeam: "TB",points: 6.40},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 105.26,
                touchdowns: 3,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 6.06},
                    {name: "Tony Pollard",position: "RB",nflTeam: "TEN",points: 7.70},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 36.10},
                    {name: "Amari Cooper",position: "WR",nflTeam: "CLE",points: 20.90},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 10.60},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "MIN",points: 12.30},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 9.60},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 0.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 2.00}
                  ],
                  bench: [
                    {name: "Latavius Murray",position: "RB",nflTeam: "BUF",points: 7.10},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "DAL",points: 3.00},
                    {name: "Deshaun Watson",position: "QB",nflTeam: "CLE",points: 0.00},
                    {name: "Tanner Hudson",position: "TE",nflTeam: "CIN",points: 9.90},
                    {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 17.20},
                    {name: "Demario Douglas",position: "WR",nflTeam: "NE",points: 6.30},
                  ]
                }
              },
            ]
          },

//2023_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2023/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 86.64,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 18.54},
                    {name: "Javonte Williams",position: "RB",nflTeam: "DEN",points: 4.00},
                    {name: "Bijan Robinson",position: "RB",nflTeam: "ATL",points: 0.40},
                    {name: "Odell Beckham",position: "WR",nflTeam: "BAL",points: 2.40},
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 11.80},
                    {name: "Jake Ferguson",position: "TE",nflTeam: "DAL",points: 10.40},
                    {name: "Davante Adams",position: "WR",nflTeam: "LV",points: 24.10},
                    {name: "Dustin Hopkins",position: "K",nflTeam: "CLE",points: 8.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 7.00}
                  ],
                  bench: [
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 3.00},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "BUF",points: 21.10},
                    {name: "Jordan Love",position: "QB",nflTeam: "GB",points: 17.46},
                    {name: "Isaiah Likely",position: "TE",nflTeam: "BAL",points: 18.00},
                    {name: "Brian Robinson",position: "RB",nflTeam: "WAS",points: 0.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 9.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 113.42,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "LAR",points: 18.52},
                    {name: "Antonio Gibson",position: "RB",nflTeam: "NE",points: 8.50},
                    {name: "Jahmyr Gibbs",position: "RB",nflTeam: "DET",points: 24.80},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 15.40},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 10.40},
                    {name: "Dalton Kincaid",position: "TE",nflTeam: "BUF",points: 0.00},
                    {name: "Jaxon Smith-Njigba",position: "WR",nflTeam: "SEA",points: 14.80},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 12.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 9.00}
                  ],
                  bench: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 31.12},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 7.10},
                    {name: "Chris Olave",position: "WR",nflTeam: "NO",points: 0.00},
                    {name: "Jahan Dotson",position: "WR",nflTeam: "WAS",points: 2.20},
                    {name: "Zach Charbonnet",position: "RB",nflTeam: "SEA",points: 1.60},
                    {name: "Keaton Mitchell",position: "RB",nflTeam: "BAL",points: 10.80},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2023_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2023/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 109.48,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jordan Love",position: "QB",nflTeam: "GB",points: 13.94},
                    {name: "Brian Robinson",position: "RB",nflTeam: "ATL",points: 29.50},
                    {name: "Omarion Hampton",position: "RB",nflTeam: "LAC",points: 7.50},
                    {name: "Davante Adams",position: "WR",nflTeam: "LAR",points: 11.10},
                    {name: "Jamaar Chase",position: "WR",nflTeam: "CIN",points: 23.20},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 25.00},
                    {name: "Michael Wilson",position: "WR",nflTeam: "ARI",points: 16.40},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 0.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 1.00}
                  ],

                  bench: [
                    {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 9.50},
                    {name: "Jordan Mason",position: "RB",nflTeam: "MIN",points: 2.90},
                    {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 10.50},
                    {name: "Quentin Johnston",position: "WR",nflTeam: "LAC",points: 0.00},
                    {name: "Tetalroa McMillan",position: "WR",nflTeam: "CAR",points: 4.50},
                    {name: "Oronde Gadsen",position: "TE",nflTeam: "LAC",points: 10.10},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 143.22,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 18.62},
                    {name: "Tony Pollard",position: "RB",nflTeam: "TEN",points: 5.30},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 5.00},
                    {name: "Amari Cooper",position: "WR",nflTeam: "CLE",points: 51.50},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 14.00},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "MIN",points: 9.80},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 21.00},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 12.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 6.00}
                  ],
                  bench: [
                    {name: "Latavius Murray",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "DAL",points: 10.30},
                    {name: "Deshaun Watson",position: "QB",nflTeam: "CLE",points: 0.00},
                    {name: "Tanner Hudson",position: "TE",nflTeam: "CIN",points: 1.50},
                    {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Demario Douglas",position: "WR",nflTeam: "NE",points: 12.40},
                  ]
                }
              },
            ]
          },

//2023_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2023/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 151.90,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jake Browning",position: "QB",nflTeam: "CIN",points: 13.40},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "PHI",points: 19.40},
                    {name: "A.J. Dillon",position: "RB",nflTeam: "GB",points: 7.20},
                    {name: "Calvin Ridley",position: "WR",nflTeam: "TEN",points: 25.80},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 28.60},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 19.60},
                    {name: "Romeo Doubs",position: "WR",nflTeam: "GB",points: 17.90},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 16.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 4.00}
                  ],
                  bench: [
                    {name: "Derek Carr",position: "QB",nflTeam: "NO",points: 24.96},
                    {name: "D'Onta Foreman",position: "RB",nflTeam: "CLE",points: 0.00},
                    {name: "Noah Brown",position: "WR",nflTeam: "HOU",points: 6.80},
                    {name: "Matt Breida",position: "RB",nflTeam: "NYG",points: 1.30},
                    {name: "Darrell Henderson",position: "RB",nflTeam: "FA",points: 0.00},
                    {name: "Miles Sanders",position: "RB",nflTeam: "CAR",points: 1.80},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 135.06,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Taylor Heinicke",position: "QB",nflTeam: "ATL",points: 14.16},
                    {name: "Boston Scott",position: "RB",nflTeam: "LAR",points: -1.70},
                    {name: "Jahmyr Gibbs",position: "RB",nflTeam: "DET",points: 24.00},
                    {name: "Jameson Williams",position: "WR",nflTeam: "DET",points: 9.30},
                    {name: "Jaxon Smith-Njigba",position: "WR",nflTeam: "SEA",points: 12.10},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 14.10},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 26.10},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 22.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 15.00}
                  ],
                  bench: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 14.28},
                    {name: "Antonio Gibson",position: "RB",nflTeam: "NE",points: 10.20},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "Chris Olave",position: "WR",nflTeam: "NO",points: 23.30},
                    {name: "Dalton Kincaid",position: "TE",nflTeam: "BUF",points: 1.70},
                    {name: "Zach Charbonnet",position: "RB",nflTeam: "SEA",points: 0.60},
                  ]
                }
              },
            ]
          },

//2023_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2023/F7.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 83.20,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 20.30},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 11.50},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 5.40},
                    {name: "Amari Cooper",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 9.30},
                    {name: "Tanner Hudson",position: "TE",nflTeam: "CIN",points: 6.80},
                    {name: "Tony Pollard",position: "RB",nflTeam: "TEN",points: 5.90},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 12.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 12.00}
                  ],
                  bench: [
                    {name: "Latavius Murray",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "DAL",points: 17.00},
                    {name: "Deshaun Watson",position: "QB",nflTeam: "CLE",points: 0.00},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "MIN",points: 0.00},
                    {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 26.90},
                    {name: "Demario Douglas",position: "WR",nflTeam: "NE",points: 7.30},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 87.28,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jake Browning",position: "QB",nflTeam: "CIN",points: 21.08},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "PHI",points: 8.80},
                    {name: "A.J. Dillon",position: "RB",nflTeam: "GB",points: 2.70},
                    {name: "Calvin Ridley",position: "WR",nflTeam: "TEN",points: 7.90},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 22.10},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 5.90},
                    {name: "Romeo Doubs",position: "WR",nflTeam: "GB",points: 5.80},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 8.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 5.00}
                  ],
                  bench: [
                    {name: "Derek Carr",position: "QB",nflTeam: "NO",points: 15.58},
                    {name: "D'Onta Foreman",position: "RB",nflTeam: "CLE",points: 0.00},
                    {name: "Noah Brown",position: "WR",nflTeam: "HOU",points: 1.80},
                    {name: "Matt Breida",position: "RB",nflTeam: "NYG",points: 0.00},
                    {name: "Darrell Henderson",position: "RB",nflTeam: "FA",points: 0.00},
                    {name: "Miles Sanders",position: "RB",nflTeam: "CAR",points: 4.20},
                  ]
                }
              },
            ]
          },

//2023_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2023/F9.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 109.26,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 21.16},
                    {name: "Joe Mixon",position: "RB",nflTeam: "HOU",points: 18.70},
                    {name: "Najee Harris",position: "RB",nflTeam: "PIT",points: 24.20},
                    {name: "Adam Thielen",position: "WR",nflTeam: "CAR",points: 9.80},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 2.00},
                    {name: "Chig Okonkwo",position: "TE",nflTeam: "TEN",points: 6.40},
                    {name: "K.J. Osborn",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 24.00},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: 3.00}
                  ],
                  bench: [
                    {name: "Christian Kirk",position: "WR",nflTeam: "JAX",points: 0.00},
                    {name: "Baker Mayfield",position: "QB",nflTeam: "TB",points: 16.26},
                    {name: "Marquise Brown",position: "WR",nflTeam: "KC",points: 0.00},
                    {name: "Zack Moss",position: "RB",nflTeam: "CIN",points: 0.00},
                    {name: "Josh Downs",position: "WR",nflTeam: "IND",points: 7.30},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: -1.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 79.78,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "LAR",points: 12.58},
                    {name: "Antonio Gibson",position: "RB",nflTeam: "NE",points: 5.60},
                    {name: "Jahmyr Gibbs",position: "RB",nflTeam: "DET",points: 5.30},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 10.90},
                    {name: "Chris Olave",position: "WR",nflTeam: "NO",points: 5.60},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 15.70},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 7.10},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 7.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 10.00}
                  ],
                  bench: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 10.84},
                    {name: "Jameson Williams",position: "WR",nflTeam: "DET",points: 9.50},
                    {name: "Rashid Shaheed",position: "WR",nflTeam: "NO",points: 3.40},
                    {name: "Dalton Kincaid",position: "TE",nflTeam: "BUF",points: 12.70},
                    {name: "Zach Charbonnet",position: "RB",nflTeam: "SEA",points: 9.10},
                    {name: "Jaxon Smith-Njigba",position: "WR",nflTeam: "SEA",points: 8.20},
                  ]
                }
              },
            ]
          },


//2023_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "The Malcolm Rhodes Memorial Bowl",
            bowlArt: "artwork/2023/F11.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 121.06,
                touchdowns: 6,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Joe Flacco",position: "QB",nflTeam: "IND",points: 22.66},
                    {name: "Derrick Henry",position: "RB",nflTeam: "BAL",points: 4.20},
                    {name: "James Conner",position: "RB",nflTeam: "ARI",points: 26.30},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "HOU",points: 7.10},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 6.00},
                    {name: "Darren Waller",position: "TE",nflTeam: "NYG",points: 10.10},
                    {name: "Nico Collins",position: "WR",nflTeam: "HOU",points: 15.70},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 8.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 21.00}
                  ],
                  bench: [
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 4.90},
                    {name: "Demarcus Robinson",position: "WR",nflTeam: "LAR",points: 13.20},
                    {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 14.00},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 3.90},
                    {name: "Diontae Johnson",position: "WR",nflTeam: "CAR",points: 11.60},
                    {name: "Christian Watson",position: "WR",nflTeam: "GB",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 145.84,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 36.34},
                    {name: "Brian Robinson",position: "RB",nflTeam: "WAS",points: 11.60},
                    {name: "Bijan Robinson",position: "RB",nflTeam: "ATL",points: 11.60},
                    {name: "Davante Adams",position: "WR",nflTeam: "LV",points: 37.60},
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 9.60},
                    {name: "Jake Ferguson",position: "TE",nflTeam: "DAL",points: 7.30},
                    {name: "Javonte Williams",position: "RB",nflTeam: "DEN",points: 8.80},
                    {name: "Greg Joseph",position: "K",nflTeam: "GB",points: 6.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 17.00}
                  ],
                  bench: [
                    {name: "Odell Beckham",position: "WR",nflTeam: "BAL",points: 4.30},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 9.10},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "BUF",points: 6.30},
                    {name: "Jordan Love",position: "QB",nflTeam: "GB",points: 28.44},
                    {name: "Isaiah Likely",position: "TE",nflTeam: "BAL",points: 18.20},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: -1.00},
                  ]
                }
              },
            ]
          },
        ],
//END 2023 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2023!!!!!!!!!!!!!!!!!!!!!!!!!!END2023!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2023!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2023







//START YEAR 2022 COMPLETE

    2022: {
      format: "current",
      teams: {
        p1: {name: "The Trophy Breakers",owner: "Brycen",art: "artwork/2022/p1.png"},
        p2: {name: "The Many St Browns of Newnan",owner: "Jordan",art: "artwork/2022/p2.png"},
        p3: {name: "The Home Deebo",owner: "Chris",art: "artwork/2022/p3.png"},
        p4: {name: "Waddle House",owner: "Bailey",art: "artwork/2022/p4.png"},
        p5: {name: "Dr draft",owner: "Keith",art: "artwork/2022/p5.png"},
        p6: {name: "JMFA Revenge of Dairy Sanders",owner: "Ethan",art: "artwork/2022/p6.png"},
        c1: {name: "The Street Vendors",owner: "Cody",art: "artwork/2022/c1.png"},
        c2: {name: "Vick's Dogs",owner: "Will",art: "artwork/2022/c2.png"},
        c3: {name: "Moorbius",owner: "David",art: "artwork/2022/c3.png"},
        c4: {name: "Maximum Brutality",owner: "Mike",art: "artwork/2022/c4.png"},
        c5: {name: "JT Wills Certified Lover Boy",owner: "Max",art: "artwork/2022/c5.png"},
        c6: {name: "The Ayahuascas",owner: "Matt",art: "artwork/2022/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2022_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2022/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 138.40,
      touchdowns: 8,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 24.80},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 26.30},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 15.00},
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 19.00},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 20.40},
                    {name: "David Njoku",position: "TE",nflTeam: "CLE",points: 5.80},
                    {name: "Adam Thielen",position: "WR",nflTeam: "CAR",points: 13.10},
                    {name: "Daniel Carlson",position: "K",nflTeam: "LV",points: 7.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 7.00}
                  ],
                  bench: [
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 14.50},
                    {name: "Jeff Wilson",position: "RB",nflTeam: "MIA",points: 0.00},
                    {name: "Gus Edwards",position: "RB",nflTeam: "BAL",points: 5.50},
                    {name: "Hunter Renfrow",position: "WR",nflTeam: "LV",points: 2.40},
                    {name: "Cole Kmet",position: "TE",nflTeam: "CHI",points: 6.50},
                    {name: "Justin Fields",position: "QB",nflTeam: "CHI",points: 23.58},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 161.20,
      touchdowns: 9,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 32.40},
                    {name: "Latavius Murray",position: "RB",nflTeam: "BUF",points: 21.20},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 20.60},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 13.80},
                    {name: "Amari Cooper",position: "WR",nflTeam: "CLE",points: 9.80},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 20.50},
                    {name: "Zay Jones",position: "WR",nflTeam: "JAX",points: 34.90},
                    {name: "Ryan Succop",position: "K",nflTeam: "TB",points: 5.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 3.00}
                  ],
                  bench: [
                    {name: "Jarvis Landry",position: "WR",nflTeam: "NO",points: 0.00},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "NO",points: 3.30},
                    {name: "Hayden Hurst",position: "TE",nflTeam: "CAR",points: 0.00},
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 0.00},
                    {name: "Marquez Valdes-Scantling",position: "WR",nflTeam: "KC",points: 11.60},
                    {name: "Eddy Pineiro",position: "K",nflTeam: "CAR",points: 12.00},
                  ]
                }
    },
  ]
},



//2022_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2022/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 137.50,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 34.70},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 27.00},
                    {name: "Miles Sanders",position: "RB",nflTeam: "CAR",points: 1.90},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "ARI",points: 13.00},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 16.30},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 25.30},
                    {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 5.30},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 3.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 11.00}
                  ],
                  bench: [
                    {name: "DJ Chark",position: "WR",nflTeam: "CAR",points: 2.80},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIN",points: 0.10},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 0.00},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 11.90},
                    {name: "Greg Dulcich",position: "TE",nflTeam: "DEN",points: 2.10},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 3.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 134.14,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 32.74},
                    {name: "Cordarrelle Patterson",position: "RB",nflTeam: "ATL",points: 12.20},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "SF",points: 25.80},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 16.60},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "NE",points: 16.80},
                    {name: "Cade Otton",position: "TE",nflTeam: "TB",points: 3.00},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "LV",points: 13.00},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 9.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 5.00}
                  ],
                  bench: [
                    {name: "Raheem Mostert",position: "RB",nflTeam: "MIA",points: 16.60},
                    {name: "Allen Lazard",position: "WR",nflTeam: "NYJ",points: 1.70},
                    {name: "Darius Slayton",position: "WR",nflTeam: "NYG",points: 7.30},
                    {name: "Tua Tagovailoa",position: "QB",nflTeam: "MIA",points: 18.06},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 9.70},
                    {name: "Jordan Mason",position: "RB",nflTeam: "SF",points: 6.40},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2022_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2022/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 83.18,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 22.98},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 11.20},
                    {name: "Tony Pollard",position: "RB",nflTeam: "DAL",points: 14.00},
                    {name: "Marquise Goodwin",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "BUF",points: 4.60},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 7.30},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 13.10},
                    {name: "Graham Gano",position: "K",nflTeam: "NYG",points: 14.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: -4.00}
                  ],
                  bench: [
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 11.40},
                    {name: "Marquise Brown",position: "WR",nflTeam: "ARI",points: 8.80},
                    {name: "Joshua Palmer",position: "WR",nflTeam: "LAC",points: 3.60},
                    {name: "Treylon Burks",position: "WR",nflTeam: "TEN",points: 1.50},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 12.50},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 4.00},
                  ]
                }
              },
              {
                teamId: "p5",
                seed: 5,
                score: 92.16,
                touchdowns: 3,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 24.16},
                    {name: "Latavius Murray",position: "RB",nflTeam: "BUF",points: 7.00},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 5.40},
                    {name: "Amari Cooper",position: "WR",nflTeam: "CLE",points: 13.20},
                    {name: "Zay Jones",position: "WR",nflTeam: "JAX",points: 2.10},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 17.30},
                    {name: "Marquez Valdes-Scantling",position: "WR",nflTeam: "KC",points: 0.00},
                    {name: "Ryan Succop",position: "K",nflTeam: "TB",points: 15.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 8.00}
                  ],
                  bench: [
                    {name: "Jarvis Landry",position: "WR",nflTeam: "NO",points: 0.00},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "NO",points: 3.40},
                    {name: "Hayden Hurst",position: "TE",nflTeam: "CAR",points: 0.00},
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 0.00},
                    {name: "Gardner Minshew",position: "QB",nflTeam: "IND",points: 22.70},
                    {name: "Deon Jackson",position: "RB",nflTeam: "IND",points: 3.90},
                  ]
                }
              },
            ]
          },



//2022_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2022/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 118.70,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 5.50},
                    {name: "Jerick McKinnon",position: "RB",nflTeam: "KC",points: 12.80},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 27.30},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 31.30},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 14.60},
                    {name: "Juwan Johnson",position: "TE",nflTeam: "NO",points: 1.90},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 16.30},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 2.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 7.00}
                  ],
                  bench: [
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 0.00},
                    {name: "Isaiah McKenzie",position: "WR",nflTeam: "IND",points: 0.60},
                    {name: "Devin Singletary",position: "RB",nflTeam: "HOU",points: 20.50},
                    {name: "Chig Okonkwo",position: "TE",nflTeam: "TEN",points: 2.00},
                    {name: "Brian Robinson",position: "RB",nflTeam: "WAS",points: 5.80},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: 4.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 121.66,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Derek Carr",position: "QB",nflTeam: "NO",points: 6.36},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 10.70},
                    {name: "Miles Sanders",position: "RB",nflTeam: "CAR",points: 6.10},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "ARI",points: 1.40},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 26.80},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 30.00},
                    {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 15.30},
                    {name: "Brett Maher",position: "K",nflTeam: "DAL",points: 18.00},
                    {name: "Tennessee Titans",position: "DEF",nflTeam: "TEN",points: 4.00}
                  ],
                  bench: [
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIN",points: 1.70},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 0.00},
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 0.00},
                    {name: "Greg Dulcich",position: "TE",nflTeam: "DEN",points: 13.90},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 7.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 8.00},
                  ]
                }
              },
            ]
          },


//2022_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2022/F1.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 93.50,
                touchdowns: 3,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 7.90},
                    {name: "Latavius Murray",position: "RB",nflTeam: "BUF",points: 11.20},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 13.30},
                    {name: "Amari Cooper",position: "WR",nflTeam: "CLE",points: 25.50},
                    {name: "Zay Jones",position: "WR",nflTeam: "JAX",points: 5.40},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 11.30},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "DAL",points: 7.90},
                    {name: "Ryan Succop",position: "K",nflTeam: "TB",points: 3.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 8.00}
                  ],
                  bench: [
                    {name: "Jamaal Williams",position: "RB",nflTeam: "NO",points: 22.70},
                    {name: "Hayden Hurst",position: "TE",nflTeam: "CAR",points: 0.00},
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 0.00},
                    {name: "Marquez Valdes-Scantling",position: "WR",nflTeam: "KC",points: 4.80},
                    {name: "Gardner Minshew",position: "QB",nflTeam: "IND",points: 12.96},
                    {name: "Deon Jackson",position: "RB",nflTeam: "IND",points: 1.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 83.58,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "DEN",points: 23.58},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 6.40},
                    {name: "Miles Sanders",position: "RB",nflTeam: "CAR",points: 6.10},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "Jahan Dotson",position: "WR",nflTeam: "WAS",points: 6.70},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 12.30},
                    {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 9.80},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 3.00},
                    {name: "New York Giants",position: "DEF",nflTeam: "NYG",points: 14.00}
                  ],
                  bench: [
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "ARI",points: 0.00},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIN",points: 5.50},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 0.00},
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 0.00},
                    {name: "Brett Maher",position: "K",nflTeam: "DAL",points: 10.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 8.00},
                  ]
                }
              },
            ]
          },


//2022_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2022/F3.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 131.36,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 0.00},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 9.70},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 12.60},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Marquise Brown",position: "WR",nflTeam: "ARI",points: 12.10},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "HOU",points: 24.60},
                    {name: "Kenneth Walker",position: "RB",nflTeam: "SEA",points: 15.20},
                    {name: "Graham Gano",position: "K",nflTeam: "NYG",points: 8.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 4.00}
                  ],
                  bench: [
                    {name: "Marquise Goodwin",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 8.40},
                    {name: "Tony Pollard",position: "RB",nflTeam: "DAL",points: 0.00},
                    {name: "Joshua Palmer",position: "WR",nflTeam: "LAC",points: 0.00},
                    {name: "Treylon Burks",position: "WR",nflTeam: "TEN",points: 12.60},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 4.00},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 79.08,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 16.68},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 7.30},
                    {name: "Brian Robinson",position: "RB",nflTeam: "WAS",points: 8.70},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 2.50},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 10.20},
                    {name: "Noah Fant",position: "TE",nflTeam: "SEA",points: 6.00},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 19.70},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 0.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 3.00}
                  ],
                  bench: [
                    {name: "Jerick McKinnon",position: "RB",nflTeam: "KC",points: 22.60},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 3.50},
                    {name: "Isaiah McKenzie",position: "WR",nflTeam: "IND",points: 0.00},
                    {name: "Devin Singletary",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "Juwan Johnson",position: "TE",nflTeam: "NO",points: 11.20},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: 4.00},
                  ]
                }
              },
            ]
          },


//2022_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2022/F5.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 111.40,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Fields",position: "QB",nflTeam: "CHI",points: 16.20},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 32.10},
                    {name: "Jeff Wilson",position: "RB",nflTeam: "MIA",points: 10.60},
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 16.10},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 8.20},
                    {name: "David Njoku",position: "TE",nflTeam: "CLE",points: 3.10},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "Daniel Carlson",position: "K",nflTeam: "LV",points: 12.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 3.00}
                  ],
                  bench: [
                    {name: "Adam Thielen",position: "WR",nflTeam: "CAR",points: 2.60},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 0.00},
                    {name: "Gus Edwards",position: "RB",nflTeam: "BAL",points: 0.20},
                    {name: "Hunter Renfrow",position: "WR",nflTeam: "LV",points: 4.90},
                    {name: "Cole Kmet",position: "TE",nflTeam: "CHI",points: 10.70},
                    {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 0.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 114.82,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 25.52},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "SF",points: 31.30},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "LV",points: 19.50},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 11.80},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "NE",points: 4.10},
                    {name: "Cade Otton",position: "TE",nflTeam: "TB",points: 3.70},
                    {name: "Allen Lazard",position: "WR",nflTeam: "NYJ",points: 10.90},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 11.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: -3.00}
                  ],
                  bench: [
                    {name: "Cordarrelle Patterson",position: "RB",nflTeam: "ATL",points: 20.40},
                    {name: "Raheem Mostert",position: "RB",nflTeam: "MIA",points: 23.10},
                    {name: "Darius Slayton",position: "WR",nflTeam: "NYG",points: 1.40},
                    {name: "Tua Tagovailoa",position: "QB",nflTeam: "MIA",points: 0.00},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 9.50},
                    {name: "Jordan Mason",position: "RB",nflTeam: "SF",points: 7.30},
                  ]
                }
              },
            ]
          },
        ],


//END 2022 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2022_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "First Round",
            bowlArt: "artwork/2022/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 116.58,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 14.08},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "TB",points: 11.40},
                    {name: "David Montgomery",position: "RB",nflTeam: "DET",points: 24.10},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 22.30},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 19.70},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 6.10},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 3.90},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 4.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 11.00}
                  ],
                  bench: [
                    {name: "Rex Burkhead",position: "RB",nflTeam: "HOU",points: 3.70},
                    {name: "Samaje Perine",position: "RB",nflTeam: "DEN",points: 3.40},
                    {name: "Donovan Peoples-Jones",position: "WR",nflTeam: "CLE",points: 13.10},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 12.00},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 8.70},
                    {name: "Michael Badgley",position: "K",nflTeam: "DET",points: 8.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 100.44,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 20.24},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 2.30},
                    {name: "Bam Knight",position: "RB",nflTeam: "NYJ",points: 2.30},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 19.00},
                    {name: "Garrett Wilson",position: "WR",nflTeam: "NYJ",points: 13.80},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "MIN",points: 8.30},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 12.50},
                    {name: "Nick Folk",position: "K",nflTeam: "NE",points: 13.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 9.00}
                  ],
                  bench: [
                    {name: "Tom Brady",position: "QB",nflTeam: "TB",points: 16.58},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 13.30},
                    {name: "Darren Waller",position: "TE",nflTeam: "NYG",points: 13.80},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 3.70},
                    {name: "J.K. Dobbins",position: "RB",nflTeam: "BAL",points: 13.80},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 17.60},
                  ]
                }
              },
            ]
          },

//2022_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2022/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 134.00,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Daniel Jones",position: "QB",nflTeam: "NYG",points: 9.90},
                    {name: "A.J. Dillon",position: "RB",nflTeam: "GB",points: 22.10},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 24.80},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 18.30},
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "DEN",points: 14.60},
                    {name: "Dawson Knox",position: "TE",nflTeam: "BUF",points: 21.80},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "WAS",points: 7.50},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 9.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 6.00}
                  ],
                  bench: [
                    {name: "Mike White",position: "QB",nflTeam: "MIA",points: 0.00},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 0.00},
                    {name: "Damien Harris",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "LV",points: 4.70},
                    {name: "Michael Carter",position: "RB",nflTeam: "NYJ",points: 4.10},
                    {name: "Pierre Strong",position: "RB",nflTeam: "NE",points: 6.70},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 85.84,
                touchdowns: 1,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Deshaun Watson",position: "QB",nflTeam: "CLE",points: 12.64},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 12.40},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "PHI",points: 12.50},
                    {name: "Christian Kirk",position: "WR",nflTeam: "JAX",points: 15.20},
                    {name: "Chris Olave",position: "WR",nflTeam: "NO",points: 8.30},
                    {name: "Taysom Hill",position: "TE",nflTeam: "NO",points: 10.20},
                    {name: "Christian Watson",position: "WR",nflTeam: "GB",points: 8.60},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 5.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 1.00}
                  ],
                  bench: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "NYJ",points: 10.86},
                    {name: "Evan Engram",position: "TE",nflTeam: "JAX",points: 14.20},
                    {name: "Diontae Johnson",position: "WR",nflTeam: "PIT",points: 20.00},
                    {name: "Travis Etienne",position: "RB",nflTeam: "JAX",points: 12.70},
                    {name: "Elijah Moore",position: "WR",nflTeam: "CLE",points: 9.40},
                    {name: "Robbie Gould",position: "K",nflTeam: "SF",points: 3.00},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2022_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2022/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 125.7,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Geno Smith",position: "QB",nflTeam: "SEA",points: 12.20},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 17.80},
                    {name: "James Conner",position: "RB",nflTeam: "ARI",points: 25.00},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "MIA",points: 14.30},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 17.70},
                    {name: "Gerald Everett",position: "TE",nflTeam: "LAC",points: 0.00},
                    {name: "George Pickens",position: "WR",nflTeam: "PIT",points: 16.70},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 9.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 13.00}
                  ],
                  bench: [
                    {name: "Melvin Gordon",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "Corey Davis",position: "WR",nflTeam: "NYJ",points: 3.40},
                    {name: "D'Onta Foreman",position: "RB",nflTeam: "CHI",points: 22.50},
                    {name: "Robert Tonyan",position: "TE",nflTeam: "CHI",points: 2.30},
                    {name: "Dameon Pierce",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "Brock Purdy",position: "QB",nflTeam: "SF",points: 15.96},
                  ]
                }
              },
              {
                teamId: "c4",
                seed: 4,
                score: 144.20,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 25.70},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "TB",points: 25.20},
                    {name: "David Montgomery",position: "RB",nflTeam: "DET",points: 10.40},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 14.30},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 34.00},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 7.50},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 13.10},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 9.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 5.00}
                  ],
                  bench: [
                    {name: "Rex Burkhead",position: "RB",nflTeam: "HOU",points: 8.70},
                    {name: "Samaje Perine",position: "RB",nflTeam: "DEN",points: 5.20},
                    {name: "Donovan Peoples-Jones",position: "WR",nflTeam: "CLE",points: 1.20},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 14.60},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 10.00},
                    {name: "Michael Badgley",position: "K",nflTeam: "DET",points: 5.00},
                  ]
                }
              },
            ]
          },

//2022_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2022/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 125.66,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Trevor Lawrence",position: "QB",nflTeam: "JAX",points: 18.26},
                    {name: "Cam Akers",position: "RB",nflTeam: "LAR",points: 34.70},
                    {name: "Najee Harris",position: "RB",nflTeam: "PIT",points: 15.50},
                    {name: "Davante Adams",position: "WR",nflTeam: "LV",points: 3.50},
                    {name: "Gabe Davis",position: "WR",nflTeam: "BUF",points: 11.50},
                    {name: "Pat Freiermuth",position: "TE",nflTeam: "PIT",points: 13.60},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 11.60},
                    {name: "Greg Zuerlein",position: "K",nflTeam: "NYJ",points: 3.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 14.00}
                  ],
                  bench: [
                    {name: "Julio Jones",position: "WR",nflTeam: "TB",points: 1.50},
                    {name: "Robert Woods",position: "WR",nflTeam: "HOU",points: 7.00},
                    {name: "Marcus Mariota",position: "QB",nflTeam: "PHI",points: 0.00},
                    {name: "Tyler Higbee",position: "TE",nflTeam: "LAR",points: 30.40},
                    {name: "Antonio Gibson",position: "RB",nflTeam: "WAS",points: 5.10},
                    {name: "Jaylen Warren",position: "RB",nflTeam: "PIT",points: 4.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 113.86,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Daniel Jones",position: "QB",nflTeam: "NYG",points: 20.76},
                    {name: "A.J. Dillon",position: "RB",nflTeam: "GB",points: 12.80},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 3.30},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 20.10},
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "DEN",points: 17.70},
                    {name: "Dawson Knox",position: "TE",nflTeam: "BUF",points: 12.80},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "WAS",points: 16.40},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 3.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 7.00}
                  ],
                  bench: [
                    {name: "Mike White",position: "QB",nflTeam: "MIA",points: 0.00},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 9.70},
                    {name: "Damien Harris",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "LV",points: 20.30},
                    {name: "Michael Carter",position: "RB",nflTeam: "NYJ",points: 10.00},
                    {name: "Pierre Strong",position: "RB",nflTeam: "NE",points: 3.00},
                  ]
                }
              },
            ]
          },

//2022_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2022/F7.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 126.20,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jared Goff",position: "QB",nflTeam: "DET",points: 22.40},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "TB",points: 8.70},
                    {name: "David Montgomery",position: "RB",nflTeam: "DET",points: 5.60},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 21.00},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 21.00},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 19.00},
                    {name: "Tyler Allgeier",position: "RB",nflTeam: "ATL",points: 16.50},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 8.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 4.00}
                  ],
                  bench: [
                    {name: "Rex Burkhead",position: "RB",nflTeam: "HOU",points: 4.00},
                    {name: "Samaje Perine",position: "RB",nflTeam: "DEN",points: 0.00},
                    {name: "Donovan Peoples-Jones",position: "WR",nflTeam: "CLE",points: 8.30},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 26.70},
                    {name: "Drake London",position: "WR",nflTeam: "ATL",points: 9.70},
                    {name: "Isiah Pacheco",position: "RB",nflTeam: "KC",points: 12.90},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 123.28,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Trevor Lawrence",position: "QB",nflTeam: "JAX",points: 4.48},
                    {name: "Cam Akers",position: "RB",nflTeam: "LAR",points: 14.30},
                    {name: "Najee Harris",position: "RB",nflTeam: "PIT",points: 20.30},
                    {name: "Davante Adams",position: "WR",nflTeam: "LV",points: 34.30},
                    {name: "Gabe Davis",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Pat Freiermuth",position: "TE",nflTeam: "PIT",points: 6.60},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 16.40},
                    {name: "Greg Zuerlein",position: "K",nflTeam: "NYJ",points: 8.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 12.00}
                  ],
                  bench: [
                    {name: "Julio Jones",position: "WR",nflTeam: "TB",points: 3.30},
                    {name: "Robert Woods",position: "WR",nflTeam: "HOU",points: 14.90},
                    {name: "Marcus Mariota",position: "QB",nflTeam: "PHI",points: 0.00},
                    {name: "Tyler Higbee",position: "TE",nflTeam: "LAR",points: 4.10},
                    {name: "Antonio Gibson",position: "RB",nflTeam: "WAS",points: 0.00},
                    {name: "Jaylen Warren",position: "RB",nflTeam: "PIT",points: 12.80},
                  ]
                }
              },
            ]
          },

//2022_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2022/F9.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 95.72,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Geno Smith",position: "QB",nflTeam: "SEA",points: 17.12},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 0.00},
                    {name: "James Conner",position: "RB",nflTeam: "ARI",points: 14.00},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "MIA",points: 15.70},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 5.70},
                    {name: "Gerald Everett",position: "TE",nflTeam: "LAC",points: 10.50},
                    {name: "George Pickens",position: "WR",nflTeam: "PIT",points: 4.90},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 3.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 7.00}
                  ],
                  bench: [
                    {name: "Melvin Gordon",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "Corey Davis",position: "WR",nflTeam: "NYJ",points: 7.50},
                    {name: "D'Onta Foreman",position: "RB",nflTeam: "CHI",points: 3.50},
                    {name: "Robert Tonyan",position: "TE",nflTeam: "CHI",points: 14.20},
                    {name: "Dameon Pierce",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "Brock Purdy",position: "QB",nflTeam: "SF",points: 17.06},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 117.78,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Daniel Jones",position: "QB",nflTeam: "NYG",points: 36.18},
                    {name: "A.J. Dillon",position: "RB",nflTeam: "GB",points: 10.10},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 7.10},
                    {name: "DJ Moore",position: "WR",nflTeam: "CHI",points: 23.70},
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "DEN",points: 10.80},
                    {name: "Dawson Knox",position: "TE",nflTeam: "BUF",points: 0.00},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "WAS",points: 1.60},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 0.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 10.00}
                  ],
                  bench: [
                    {name: "Mike White",position: "QB",nflTeam: "MIA",points: 3.60},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 7.50},
                    {name: "Damien Harris",position: "RB",nflTeam: "BUF",points: 7.90},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "LV",points: 16.90},
                    {name: "Michael Carter",position: "RB",nflTeam: "NYJ",points: 2.50},
                    {name: "Pierre Strong",position: "RB",nflTeam: "NE",points: 0.00},
                  ]
                }
              },
            ]
          },


//2022_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "The Malcolm Rhodes Memorial Bowl",
            bowlArt: "artwork/2022/F11.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 100.48,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 14.38},
                    {name: "Zack Moss",position: "RB",nflTeam: "IND",points: 7.40},
                    {name: "Bam Knight",position: "RB",nflTeam: "NYJ",points: 6.40},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 1.30},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "MIN",points: 12.90},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 20.50},
                    {name: "Nick Folk",position: "K",nflTeam: "NE",points: 5.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 10.00}
                  ],
                  bench: [
                    {name: "Tom Brady",position: "QB",nflTeam: "TB",points: 37.68},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 48.70},
                    {name: "Darren Waller",position: "TE",nflTeam: "NYG",points: 16.20},
                    {name: "J.K. Dobbins",position: "RB",nflTeam: "BAL",points: 9.30},
                    {name: "James Cook",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "Garrett Wilson",position: "WR",nflTeam: "NYJ",points: 4.80},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 125.76,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Deshaun Watson",position: "QB",nflTeam: "CLE",points: 21.86},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 9.00},
                    {name: "Travis Etienne",position: "RB",nflTeam: "JAX",points: 23.00},
                    {name: "Christian Kirk",position: "WR",nflTeam: "JAX",points: 4.10},
                    {name: "Chris Olave",position: "WR",nflTeam: "NO",points: 8.20},
                    {name: "Evan Engram",position: "TE",nflTeam: "JAX",points: 3.90},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "PHI",points: 27.70},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 9.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 0.00}
                  ],
                  bench: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "NYJ",points: 16.56},
                    {name: "Taysom Hill",position: "TE",nflTeam: "NO",points: 13.56},
                    {name: "Diontae Johnson",position: "WR",nflTeam: "PIT",points: 5.50},
                    {name: "Elijah Moore",position: "WR",nflTeam: "CLE",points: 3.80},
                    {name: "Christian Watson",position: "WR",nflTeam: "GB",points: 2.10},
                    {name: "Robbie Gould",position: "K",nflTeam: "SF",points: 14.00},
                  ]
                }
              },
            ]
          },
        ],
//END 2022 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          { 	
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2022!!!!!!!!!!!!!!!!!!!!!!!!!!END2022!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2022!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2022






//START YEAR 2021 COMPLETE

    2021: {
      format: "current",
      teams: {
        p1: {name: "Vick's Dogs",owner: "Will",art: "artwork/2021/p1.png"},
        p2: {name: "Men of the Hunt",owner: "Jordan",art: "artwork/2021/p2.png"},
        p3: {name: "Alvin and the Airheads",owner: "Brycen",art: "artwork/2021/p3.png"},
        p4: {name: "Mikes Brakes",owner: "Max",art: "artwork/2021/p4.png"},
        p5: {name: "Mr Draft",owner: "Keith",art: "artwork/2021/p5.png"},
        p6: {name: "Indiaaron Jones",owner: "David",art: "artwork/2021/p6.png"},
        c1: {name: "Maximum Brutality",owner: "Mike",art: "artwork/2021/c1.png"},
        c2: {name: "Unsolicited Dak Pics",owner: "Chris",art: "artwork/2021/c2.png"},
        c3: {name: "Terry on the Very Bottom",owner: "Bailey",art: "artwork/2021/c3.png"},
        c4: {name: "Clean Brycen and The Girls",owner: "Cody",art: "artwork/2021/c4.png"},
        c5: {name: "JMFA Episode II Attack of CMC",owner: "Ethan",art: "artwork/2021/c5.png"},
        c6: {name: "Davy Jones Locker Room",owner: "Matt",art: "artwork/2021/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2021_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2021/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 113.32,
      touchdowns: 5,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 23.82},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 11.10},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "LV",points: 12.40},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 2.40},
                    {name: "Davante Adams",position: "WR",nflTeam: "LV",points: 16.40},
                    {name: "Pat Freiermuth",position: "TE",nflTeam: "PIT",points: 7.70},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 23.50},
                    {name: "Robbie Gould",position: "K",nflTeam: "SF",points: 7.00},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: 9.00}
                  ],
                  bench: [
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "FA",points: 0.00},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 7.90},
                    {name: "Jeff Wilson",position: "RB",nflTeam: "SF",points: 19.90},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIN",points: 0.00},
                    {name: "Elijah Moore",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Elijah Mitchell",position: "RB",nflTeam: "SF",points: 0.00},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 112.10,
      touchdowns: 7,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 20.80},
                    {name: "Myles Gaskin",position: "RB",nflTeam: "MIA",points: 5.40},
                    {name: "Devin Singletary",position: "RB",nflTeam: "BUF",points: 16.60},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LAR",points: 34.70},
                    {name: "Braxton Berrios",position: "WR",nflTeam: "NYJ",points: 10.60},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "TB",points: 4.90},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 5.10},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 8.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 6.00}
                  ],
                  bench: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 10.48},
                    {name: "Rex Burkhead",position: "RB",nflTeam: "HOU",points: 5.70},
                    {name: "Zach Ertz",position: "TE",nflTeam: "ARI",points: 13.40},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 20.60},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 20.50},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 0.00},
                  ]
                }
    },
  ]
},



//2021_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2021/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 77.38,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 12.78},
                    {name: "Cordarrelle Patterson",position: "RB",nflTeam: "ATL",points: 4.30},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 5.10},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 10.90},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 18.90},
                    {name: "Gerald Everett",position: "TE",nflTeam: "LAC",points: 10.00},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "BAL",points: 3.40},
                    {name: "Nick Folk",position: "K",nflTeam: "NE",points: 5.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 7.00}
                  ],
                  bench: [
                    {name: "Cole Beasley",position: "WR",nflTeam: "BUF",points: 7.50},
                    {name: "Austin Hooper",position: "TE",nflTeam: "TEN",points: 0.00},
                    {name: "Ricky Seals-Jones",position: "TE",nflTeam: "NYG",points: 6.90},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 0.00},
                    {name: "Miles Sanders",position: "RB",nflTeam: "PHI",points: 16.60},
                    {name: "K.J. Osborn",position: "WR",nflTeam: "MIN",points: 5.10},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 110.94,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 27.64},
                    {name: "James Conner",position: "RB",nflTeam: "ARI",points: 9.00},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 15.00},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "BUF",points: 13.50},
                    {name: "DJ Moore",position: "WR",nflTeam: "CAR",points: 12.80},
                    {name: "Mike Gesicki",position: "TE",nflTeam: "MIA",points: 9.30},
                    {name: "Darrell Henderson",position: "RB",nflTeam: "LAR",points: 4.70},
                    {name: "Matt Gay",position: "K",nflTeam: "LAR",points: 10.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LAR",points: 9.00}
                  ],
                  bench: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 0.00},
                    {name: "Sony Michel",position: "RB",nflTeam: "LAR",points: 13.50},
                    {name: "Tyler Conklin",position: "TE",nflTeam: "NYJ",points: 1.70},
                    {name: "A.J. Dillon",position: "RB",nflTeam: "GB",points: 10.50},
                    {name: "Van Jefferson",position: "WR",nflTeam: "LAR",points: 5.30},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 7.00},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2021_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2021/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 118.98,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "TB",points: 14.38},
                    {name: "Craig Reynolds",position: "RB",nflTeam: "DET",points: 8.10},
                    {name: "Antonio Gibson",position: "RB",nflTeam: "WAS",points: 13.80},
                    {name: "Marquise Brown",position: "WR",nflTeam: "ARI",points: 9.40},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 19.60},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "DAL",points: 22.20},
                    {name: "Amari Cooper",position: "WR",nflTeam: "CLE",points: 21.50},
                    {name: "Daniel Carlson",position: "K",nflTeam: "LV",points: 5.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 5.00}
                  ],
                  bench: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 4.64},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 1.70},
                    {name: "Tyler Higbee",position: "TE",nflTeam: "LAR",points: 9.10},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 0.00},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Tim Patrick",position: "WR",nflTeam: "DEN",points: 3.80},
                  ]
                }
              },
              {
                teamId: "p4",
                seed: 4,
                score: 160.68,
                touchdowns: 9,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 19.98},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "LV",points: 11.40},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIN",points: 16.00},
                    {name: "Davante Adams",position: "WR",nflTeam: "LV",points: 33.40},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 26.00},
                    {name: "C.J. Uzomah",position: "TE",nflTeam: "NYJ",points: 8.60},
                    {name: "Joshua Palmer",position: "WR",nflTeam: "LAC",points: 15.30},
                    {name: "Robbie Gould",position: "K",nflTeam: "SF",points: 5.00},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: 25.00}
                  ],
                  bench: [
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 0.00},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 0.00},
                    {name: "Jeff Wilson",position: "RB",nflTeam: "SF",points: 14.70},
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "DEN",points: 9.00},
                    {name: "Pat Freiermuth",position: "TE",nflTeam: "PIT",points: 0.00},
                    {name: "Elijah Mitchell",position: "RB",nflTeam: "SF",points: 0.00},
                  ]
                }
              },
            ]
          },



//2021_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2021/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 146.08,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "LAR",points: 6.68},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 31.50},
                    {name: "Justin Jackson",position: "RB",nflTeam: "LAC",points: 34.20},
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 16.50},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 14.00},
                    {name: "Dawson Knox",position: "TE",nflTeam: "BUF",points: 9.10},
                    {name: "Antonio Brown",position: "WR",nflTeam: "TB",points: 20.10},
                    {name: "Greg Joseph",position: "K",nflTeam: "MIN",points: 11.00},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: 3.00}
                  ],
                  bench: [
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 7.00},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 0.00},
                    {name: "Samaje Perine",position: "RB",nflTeam: "CIN",points: 2.60},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 0.00},
                    {name: "Noah Fant",position: "TE",nflTeam: "SEA",points: 6.00},
                    {name: "Mac Jones",position: "QB",nflTeam: "NE",points: 5.10},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 127.16,
                touchdowns: 6,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 16.66},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 13.70},
                    {name: "Sony Michel",position: "RB",nflTeam: "LAR",points: 20.50},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "BUF",points: 21.50},
                    {name: "DJ Moore",position: "WR",nflTeam: "CAR",points: 10.50},
                    {name: "Mike Gesicki",position: "TE",nflTeam: "MIA",points: 5.20},
                    {name: "Ronald Jones",position: "RB",nflTeam: "KC",points: 16.10},
                    {name: "Matt Gay",position: "K",nflTeam: "LAR",points: 12.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LAR",points: 11.00}
                  ],
                  bench: [
                    {name: "James Conner",position: "RB",nflTeam: "ARI",points: 0.00},
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 0.00},
                    {name: "Darrell Henderson",position: "RB",nflTeam: "LAR",points: 1.70},
                    {name: "A.J. Dillon",position: "RB",nflTeam: "GB",points: 8.60},
                    {name: "Van Jefferson",position: "WR",nflTeam: "LAR",points: 1.60},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 19.00},
                  ]
                }
              },
            ]
          },


//2021_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2021/F1.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 138.82,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 20.32},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 4.30},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "LV",points: 18.00},
                    {name: "Davante Adams",position: "WR",nflTeam: "LV",points: 30.60},
                    {name: "Amon-Ra St. Brown",position: "WR",nflTeam: "DET",points: 35.40},
                    {name: "Pat Freiermuth",position: "TE",nflTeam: "PIT",points: 7.20},
                    {name: "Elijah Mitchell",position: "RB",nflTeam: "SF",points: 21.00},
                    {name: "Greg Zuerlein",position: "K",nflTeam: "NYJ",points: 2.00},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: 0.00}
                  ],
                  bench: [
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 14.70},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 15.30},
                    {name: "Jeff Wilson",position: "RB",nflTeam: "SF",points: 0.00},
                    {name: "Foster Moreau",position: "TE",nflTeam: "LV",points: 1.90},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIN",points: 5.30},
                    {name: "Jaret Patterson",position: "RB",nflTeam: "WAS",points: 20.80},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 85.36,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "LAR",points: 14.26},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 15.60},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 20.20},
                    {name: "Antonio Brown",position: "WR",nflTeam: "FA",points: 5.60},
                    {name: "Michael Pittman",position: "WR",nflTeam: "IND",points: 10.70},
                    {name: "Dawson Knox",position: "TE",nflTeam: "BUF",points: 0.00},
                    {name: "Gabe Davis",position: "WR",nflTeam: "BUF",points: 7.00},
                    {name: "Greg Joseph",position: "K",nflTeam: "MIN",points: 6.00},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: 6.00}
                  ],
                  bench: [
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 0.00},
                    {name: "Justin Jackson",position: "RB",nflTeam: "LAC",points: 9.10},
                    {name: "Boston Scott",position: "RB",nflTeam: "PHI",points: 24.60},
                    {name: "Noah Fant",position: "TE",nflTeam: "SEA",points: 21.20},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 13.40},
                    {name: "Mac Jones",position: "QB",nflTeam: "NE",points: 22.28},
                  ]
                }
              },
            ]
          },


//2021_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2021/F3.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 82.70,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "TB",points: 26.40},
                    {name: "Ameer Abdullah",position: "RB",nflTeam: "LV",points: 9.20},
                    {name: "Craig Reynolds",position: "RB",nflTeam: "DET",points: 2.30},
                    {name: "Marquise Brown",position: "WR",nflTeam: "ARI",points: 3.80},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 11.80},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "DAL",points: 11.40},
                    {name: "Amari Cooper",position: "WR",nflTeam: "CLE",points: 10.80},
                    {name: "Daniel Carlson",position: "K",nflTeam: "LV",points: 11.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: -4.00}
                  ],
                  bench: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 0.50},
                    {name: "Tyler Higbee",position: "TE",nflTeam: "LAR",points: 12.90},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 0.00},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Tim Patrick",position: "WR",nflTeam: "DEN",points: 0.00},
                    {name: "Antonio Gibson",position: "RB",nflTeam: "WAS",points: 0.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 91.36,
                touchdowns: 1,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 12.96},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 15.60},
                    {name: "Sony Michel",position: "RB",nflTeam: "LAR",points: 18.90},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "BUF",points: 10.20},
                    {name: "DJ Moore",position: "WR",nflTeam: "CAR",points: 5.90},
                    {name: "Mike Gesicki",position: "TE",nflTeam: "MIA",points: 9.10},
                    {name: "Ronald Jones",position: "RB",nflTeam: "KC",points: 3.70},
                    {name: "Matt Gay",position: "K",nflTeam: "LAR",points: 2.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LAR",points: 13.00}
                  ],
                  bench: [
                    {name: "James Conner",position: "RB",nflTeam: "ARI",points: 0.00},
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 0.00},
                    {name: "Darrell Henderson",position: "RB",nflTeam: "LAR",points: 0.00},
                    {name: "A.J. Dillon",position: "RB",nflTeam: "GB",points: 22.30},
                    {name: "Van Jefferson",position: "WR",nflTeam: "LAR",points: 10.30},
                    {name: "DeVonta Smith",position: "WR",nflTeam: "PHI",points: 8.40},
                  ]
                }
              },
            ]
          },


//2021_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2021/F5.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 123.70,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 20.90},
                    {name: "Rex Burkhead",position: "RB",nflTeam: "HOU",points: 13.90},
                    {name: "Devin Singletary",position: "RB",nflTeam: "BUF",points: 23.00},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LAR",points: 21.50},
                    {name: "Jaylen Waddle",position: "WR",nflTeam: "MIA",points: 7.70},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 13.10},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 13.60},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 7.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 3.00}
                  ],
                  bench: [
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "TB",points: 18.50},
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 0.00},
                    {name: "Zach Ertz",position: "TE",nflTeam: "ARI",points: 11.10},
                    {name: "Braxton Berrios",position: "WR",nflTeam: "NYJ",points: 25.70},
                    {name: "Myles Gaskin",position: "RB",nflTeam: "MIA",points: 2.30},
                    {name: "Chuba Hubbard",position: "RB",nflTeam: "CAR",points: 15.80},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 120.64,
                touchdowns: 6,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 34.84},
                    {name: "Cordarrelle Patterson",position: "RB",nflTeam: "ATL",points: 7.20},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 21.00},
                    {name: "A.J. Brown",position: "WR",nflTeam: "PHI",points: 6.10},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 17.20},
                    {name: "Gerald Everett",position: "TE",nflTeam: "LAC",points: 6.60},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "BAL",points: 8.70},
                    {name: "Nick Folk",position: "K",nflTeam: "NE",points: 8.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 11.00}
                  ],
                  bench: [
                    {name: "Cole Beasley",position: "WR",nflTeam: "BUF",points: 6.20},
                    {name: "Austin Hooper",position: "TE",nflTeam: "TEN",points: 4.80},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 0.00},
                    {name: "Ricky Seals-Jones",position: "TE",nflTeam: "NYG",points: 1.80},
                    {name: "Miles Sanders",position: "RB",nflTeam: "PHI",points: 0.00},
                    {name: "K.J. Osborn",position: "WR",nflTeam: "MIN",points: 14.00},
                  ]
                }
              },
            ]
          },
        ],


//END 2021 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2021_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "First Round",
            bowlArt: "artwork/2021/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 90.68,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 12.58},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 16.30},
                    {name: "Javonte Williams",position: "RB",nflTeam: "DEN",points: 12.10},
                    {name: "Christian Kirk",position: "WR",nflTeam: "JAX",points: 24.40},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 1.30},
                    {name: "David Njoku",position: "TE",nflTeam: "CLE",points: 5.90},
                    {name: "Mike Davis",position: "RB",nflTeam: "ATL",points: 2.10},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 7.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 9.00}
                  ],
                  bench: [
                    {name: "Julio Jones",position: "WR",nflTeam: "TEN",points: 0.00},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "ARI",points: 0.00},
                    {name: "Darren Waller",position: "TE",nflTeam: "LV",points: 0.00},
                    {name: "Travis Homer",position: "RB",nflTeam: "SEA",points: 0.00},
                    {name: "Laviska Shenault",position: "WR",nflTeam: "JAX",points: 8.90},
                    {name: "Kenneth Gainwell",position: "RB",nflTeam: "PHI",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 134.60,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 29.60},
                    {name: "James Robinson",position: "RB",nflTeam: "JAX",points: 17.80},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 5.00},
                    {name: "Hunter Renfrow",position: "WR",nflTeam: "LV",points: 6.20},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 4.30},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 35.60},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "DEN",points: 7.10},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 13.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 16.00}
                  ],
                  bench: [
                    {name: "A.J. Green",position: "WR",nflTeam: "ARI",points: 10.40},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "Matt Breida",position: "RB",nflTeam: "NYG",points: 0.10},
                    {name: "Godwin Igwebuike",position: "RB",nflTeam: "DET",points: 1.10},
                    {name: "Rashaad Penny",position: "RB",nflTeam: "SEA",points: 6.40},
                    {name: "Mecole Hardman",position: "WR",nflTeam: "KC",points: 3.10},
                  ]
                }
              },
            ]
          },

//2021_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2021/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 120.04,
                touchdowns: 6,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 23.04},
                    {name: "D'Onta Foreman",position: "RB",nflTeam: "CAR",points: 15.50},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 23.00},
                    {name: "DeVante Parker",position: "WR",nflTeam: "NE",points: 16.80},
                    {name: "Russell Gage",position: "WR",nflTeam: "TB",points: 23.10},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 11.70},
                    {name: "Odell Beckham",position: "WR",nflTeam: "LAR",points: 1.70},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 7.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 3.00}
                  ],
                  bench: [
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "BUF",points: 9.00},
                    {name: "Ty Johnson",position: "RB",nflTeam: "NYJ",points: 0.00},
                    {name: "Zack Moss",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "Darnell Mooney",position: "WR",nflTeam: "CHI",points: 11.60},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 124.84,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Joe Burrow",position: "QB",nflTeam: "CIN",points: 5.50},
                    {name: "De'Von Achane",position: "RB",nflTeam: "MIA",points: 18.70},
                    {name: "Ashton Jeanty",position: "RB",nflTeam: "LV",points: 8.20},
                    {name: "Jameson Williams",position: "WR",nflTeam: "DET",points: 26.40},
                    {name: "George Pickens",position: "WR",nflTeam: "DAL",points: 6.30},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 22.80},
                    {name: "Kayshon Boutte",position: "WR",nflTeam: "NE",points: 4.00},
                    {name: "Cam Little",position: "K",nflTeam: "JAX",points: 12.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 7.00}
                  ],
                  bench: [
                    {name: "Jerry Jeudy",position: "WR",nflTeam: "CLE",points: 4.20},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 45.60},
                    {name: "Alec Pierce",position: "WR",nflTeam: "IND",points: 2.60},
                    {name: "Garrett Wilson",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Rachaad White",position: "RB",nflTeam: "TB",points: 3.60},
                    {name: "Zach Charbonnet",position: "RB",nflTeam: "SEA",points: 3.10},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2021_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2021/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 80.14,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 8.54},
                    {name: "Clyde Edwards-Helaire",position: "RB",nflTeam: "KC",points: 10.10},
                    {name: "Najee Harris",position: "RB",nflTeam: "PIT",points: 16.00},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 12.10},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 10.40},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 4.10},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "NE",points: 11.90},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 4.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 3.00}
                  ],
                  bench: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "DEN",points: 16.54},
                    {name: "David Johnson",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "Kendrick Bourne",position: "WR",nflTeam: "NE",points: 5.30},
                    {name: "Damien Harris",position: "RB",nflTeam: "NE",points: 28.30},
                    {name: "Tony Pollard",position: "RB",nflTeam: "DAL",points: 7.00},
                    {name: "Chase Claypool",position: "WR",nflTeam: "PIT",points: 8.10},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 149.72,
                touchdowns: 9,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 22.32},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "DEN",points: 1.00},
                    {name: "James Robinson",position: "RB",nflTeam: "JAX",points: 1.00},
                    {name: "Hunter Renfrow",position: "WR",nflTeam: "LV",points: 13.00},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 43.40},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 26.50},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "CLE",points: 9.50},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 11.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 22.00}
                  ],
                  bench: [
                    {name: "A.J. Green",position: "WR",nflTeam: "ARI",points: 4.30},
                    {name: "Rashaad Penny",position: "RB",nflTeam: "SEA",points: 19.50},
                    {name: "Mecole Hardman",position: "WR",nflTeam: "KC",points: 12.10},
                    {name: "Cam Akers",position: "RB",nflTeam: "LAR",points: 0.00},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Kadarius Toney",position: "WR",nflTeam: "NYG",points: 6.80},
                  ]
                }
              },
            ]
          },

//2021_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2021/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 113.10,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 31.30},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 3.80},
                    {name: "David Montgomery",position: "RB",nflTeam: "CHI",points: 23.60},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 7.50},
                    {name: "Diontae Johnson",position: "WR",nflTeam: "PIT",points: 15.10},
                    {name: "Tyler Conklin",position: "TE",nflTeam: "NYJ",points: 8.40},
                    {name: "Michael Carter",position: "RB",nflTeam: "NYJ",points: 14.40},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 3.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 6.00}
                  ],
                  bench: [
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 0.00},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "HOU",points: 0.00},
                    {name: "Duke Johnson",position: "RB",nflTeam: "BUF",points: 3.90},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "DET",points: 7.70},
                    {name: "Noah Gray",position: "TE",nflTeam: "KC",points: 3.20},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 12.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 91.44,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 16.94},
                    {name: "D'Onta Foreman",position: "RB",nflTeam: "CAR",points: 7.70},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 10.80},
                    {name: "Russell Gage",position: "WR",nflTeam: "TB",points: 5.90},
                    {name: "Darnell Mooney",position: "WR",nflTeam: "CHI",points: 10.90},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 16.20},
                    {name: "DeVante Parker",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 10.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 13.00}
                  ],
                  bench: [
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "BUF",points: 4.00},
                    {name: "Odell Beckham",position: "WR",nflTeam: "LAR",points: 13.70},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Ty Johnson",position: "RB",nflTeam: "NYJ",points: 0.00},
                    {name: "Zack Moss",position: "RB",nflTeam: "BUF",points: 3.50},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: -1.00},
                  ]
                }
              },
            ]
          },

//2021_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2021/F7.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 132.76,
                touchdowns: 6,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 20.86},
                    {name: "Dare Ogunbowale",position: "RB",nflTeam: "HOU",points: 14.80},
                    {name: "Rashaad Penny",position: "RB",nflTeam: "SEA",points: 32.50},
                    {name: "Hunter Renfrow",position: "WR",nflTeam: "LV",points: 20.60},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 9.20},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 14.90},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "CLE",points: 8.90},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 10.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 1.00}
                  ],
                  bench: [
                    {name: "A.J. Green",position: "WR",nflTeam: "ARI",points: 10.40},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "DEN",points: 10.20},
                    {name: "Mecole Hardman",position: "WR",nflTeam: "KC",points: 6.30},
                    {name: "D'Ernest Johnson",position: "RB",nflTeam: "CLE",points: 2.40},
                    {name: "Cam Akers",position: "RB",nflTeam: "LAR",points: 0.00},
                    {name: "Rhamondre Stevenson",position: "RB",nflTeam: "NE",points: 22.70},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 145.84,
                touchdowns: 9,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 23.04},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 10.20},
                    {name: "David Montgomery",position: "RB",nflTeam: "CHI",points: 20.10},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "HOU",points: 19.60},
                    {name: "Diontae Johnson",position: "WR",nflTeam: "PIT",points: 17.10},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 13.40},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 14.40},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 13.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 15.00}
                  ],
                  bench: [
                    {name: "Duke Johnson",position: "RB",nflTeam: "BUF",points: 8.50},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "DET",points: 13.40},
                    {name: "Tyler Conklin",position: "TE",nflTeam: "NYJ",points: 9.70},
                    {name: "Noah Gray",position: "TE",nflTeam: "KC",points: 1.60},
                    {name: "Michael Carter",position: "RB",nflTeam: "NYJ",points: 7.30},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 3.00},
                  ]
                }
              },
            ]
          },

//2021_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2021/F9.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 134.30,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 10.20},
                    {name: "Damien Harris",position: "RB",nflTeam: "NE",points: 17.70},
                    {name: "Najee Harris",position: "RB",nflTeam: "PIT",points: 29.60},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 30.90},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 8.10},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 4.50},
                    {name: "Kendrick Bourne",position: "WR",nflTeam: "NE",points: 14.30},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 16.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 3.00}
                  ],
                  bench: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "DEN",points: 27.84},
                    {name: "David Johnson",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "NE",points: 21.30},
                    {name: "Tony Pollard",position: "RB",nflTeam: "DAL",points: 8.80},
                    {name: "Clyde Edwards-Helaire",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "Chase Claypool",position: "WR",nflTeam: "PIT",points: 4.70},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 108.68,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 17.68},
                    {name: "D'Onta Foreman",position: "RB",nflTeam: "CAR",points: 19.20},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 18.40},
                    {name: "Odell Beckham",position: "WR",nflTeam: "LAR",points: 14.90},
                    {name: "Russell Gage",position: "WR",nflTeam: "TB",points: 8.00},
                    {name: "Kyle Pitts",position: "TE",nflTeam: "ATL",points: 8.90},
                    {name: "DeVante Parker",position: "WR",nflTeam: "NE",points: 8.60},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 7.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 6.00}
                  ],
                  bench: [
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Ty Johnson",position: "RB",nflTeam: "NYJ",points: 17.20},
                    {name: "Zack Moss",position: "RB",nflTeam: "BUF",points: 3.90},
                    {name: "Darnell Mooney",position: "WR",nflTeam: "CHI",points: 19.90},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 12.00},
                  ]
                }
              },
            ]
          },


//2021_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "The Malcolm Rhodes Memorial Bowl",
            bowlArt: "artwork/2021/F11.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 122.92,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 22.92},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 5.80},
                    {name: "Javonte Williams",position: "RB",nflTeam: "DEN",points: 4.20},
                    {name: "Christian Kirk",position: "WR",nflTeam: "JAX",points: 13.90},
                    {name: "Ja'Marr Chase",position: "WR",nflTeam: "CIN",points: 55.60},
                    {name: "Cole Kmet",position: "TE",nflTeam: "CHI",points: 5.50},
                    {name: "Robby Anderson",position: "WR",nflTeam: "CAR",points: 3.00},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 3.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 9.00}
                  ],
                  bench: [
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "ARI",points: 0.00},
                    {name: "Mike Davis",position: "RB",nflTeam: "ATL",points: 12.70},
                    {name: "Devontae Booker",position: "RB",nflTeam: "NYG",points: 6.60},
                    {name: "Byron Pringle",position: "WR",nflTeam: "CHI",points: 6.50},
                    {name: "Dontrell Hilliard",position: "RB",nflTeam: "TEN",points: 16.80},
                    {name: "Deonte Harris",position: "WR",nflTeam: "NO",points: 4.30},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 117.66,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Trey Lance",position: "QB",nflTeam: "SF",points: 19.06},
                    {name: "Darrel Williams",position: "RB",nflTeam: "KC",points: 25.70},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "DET",points: 5.90},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 12.10},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "MIA",points: 10.20},
                    {name: "Hunter Henry",position: "TE",nflTeam: "NE",points: 6.70},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 4.00},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 13.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 21.00}
                  ],
                  bench: [
                    {name: "Derek Watt",position: "RB",nflTeam: "PIT",points: 0.10},
                    {name: "Andy Janovich",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "John Kelly",position: "RB",nflTeam: "CLE",points: 0.00},
                    {name: "Kalen Ballage",position: "RB",nflTeam: "PIT",points: 0.00},
                    {name: "Benny Snell",position: "RB",nflTeam: "PIT",points: 0.20},
                    {name: "Demetric Felton",position: "RB",nflTeam: "CLE",points: 0.00},
                  ]
                }
              },
            ]
          },
        ],
//END 2021 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2021!!!!!!!!!!!!!!!!!!!!!!!!!!END2021!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2021!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2021







//START YEAR 2020  COMPLETE

    2020: {
      format: "current",
      teams: {
        p1: {name: "Mr Auto Draft",owner: "Keith",art: "artwork/2020/p1.png"},
        p2: {name: "Maximum Brutality",owner: "Mike",art: "artwork/2020/p2.png"},
        p3: {name: "The Crosby Show",owner: "David",art: "artwork/2020/p3.png"},
        p4: {name: "Vick's Dogs",owner: "Will",art: "artwork/2020/p4.png"},
        p5: {name: "The Flying Dutchmen",owner: "Cody",art: "artwork/2020/p5.png"},
        p6: {name: "Jackson Mahomes Fan Account",owner: "Ethan",art: "artwork/2020/p6.png"},
        c1: {name: "Congrats David",owner: "Max",art: "artwork/2020/c1.png"},
        c2: {name: "Vape Lords",owner: "Chris",art: "artwork/2020/c2.png"},
        c3: {name: "Deshaun Mustard",owner: "Jordan",art: "artwork/2020/c3.png"},
        c4: {name: "Davy Jones Locker Room",owner: "Matt",art: "artwork/2020/c4.png"},
        c5: {name: "Underdogs",owner: "Bailey",art: "artwork/2020/c5.png"},
        c6: {name: "Kareem n The Fever Dream",owner: "Brycen",art: "artwork/2020/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2020_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2020/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 101.74,
      touchdowns: 1,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "NE",points: 4.36},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 19.00},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 23.60},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 8.60},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "CLE",points: 11.68},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 3.80},
                    {name: "Robby Anderson",position: "WR",nflTeam: "CAR",points: 17.70},
                    {name: "Daniel Carlson",position: "K",nflTeam: "LV",points: 9.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 4.00}
                  ],
                  bench: [
                    {name: "Antonio Brown",position: "WR",nflTeam: "TB",points: 9.90},
                    {name: "Logan Thomas",position: "TE",nflTeam: "WAS",points: 10.30},
                    {name: "Keelan Cole",position: "WR",nflTeam: "JAX",points: 19.70},
                    {name: "Baker Mayfield",position: "QB",nflTeam: "CLE",points: 30.02},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 9.90},
                    {name: "Antonio Gibson",position: "RB",nflTeam: "WAS",points: 0.00},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 149.72,
      touchdowns: 6,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 34.92},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "DEN",points: 12.10},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "DET",points: 15.00},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "BUF",points: 29.10},
                    {name: "A.J. Brown",position: "WR",nflTeam: "TEN",points: 24.20},
                    {name: "Eric Ebron",position: "TE",nflTeam: "PIT",points: 7.00},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 4.40},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 5.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 18.00}
                  ],
                  bench: [
                    {name: "Adrian Peterson",position: "RB",nflTeam: "DET",points: 4.00},
                    {name: "Marvin Jones",position: "WR",nflTeam: "DET",points: 8.80},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 23.84},
                    {name: "DeAndre Washington",position: "RB",nflTeam: "MIA",points: 7.20},
                    {name: "Tim Patrick",position: "WR",nflTeam: "DEN",points: 12.60},
                    {name: "Myles Gaskin",position: "RB",nflTeam: "MIA",points: 0.00},
                  ]
                }
    },
  ]
},



//2020_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2020/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 159.72,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 18.32},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 36.20},
                    {name: "Chris Carson",position: "RB",nflTeam: "SEA",points: 18.80},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "ARI",points: 22.60},
                    {name: "Robert Woods",position: "WR",nflTeam: "LAR",points: 8.10},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "DET",points: 16.30},
                    {name: "Keke Coutee",position: "WR",nflTeam: "HOU",points: 9.40},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 9.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LAR",points: 21.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 14.36},
                    {name: "Sterling Shepard",position: "WR",nflTeam: "NYG",points: 6.50},
                    {name: "Hunter Henry",position: "TE",nflTeam: "LAC",points: 10.10},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "GB",points: 3.80},
                    {name: "Kalen Ballage",position: "RB",nflTeam: "LAC",points: 3.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 9.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 94.32,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 18.62},
                    {name: "James Conner",position: "RB",nflTeam: "PIT",points: 1.80},
                    {name: "James Robinson",position: "RB",nflTeam: "JAX",points: 12.30},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 20.20},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 8.10},
                    {name: "Noah Fant",position: "TE",nflTeam: "DEN",points: 0.00},
                    {name: "J.K. Dobbins",position: "RB",nflTeam: "BAL",points: 13.30},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 8.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 12.00}
                  ],
                  bench: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 7.26},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "KC",points: 5.50},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "KC",points: 7.20},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Mike Gesicki",position: "TE",nflTeam: "MIA",points: 23.50},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 17.00},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2020_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2020/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 98.85,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 18.32},
                    {name: "Mike Davis",position: "RB",nflTeam: "CAR",points: 8.10},
                    {name: "Kenyan Drake",position: "RB",nflTeam: "ARI",points: 6.00},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 11.20},
                    {name: "Allen Robinson",position: "WR",nflTeam: "CHI",points: 12.30},
                    {name: "Darren Waller",position: "TE",nflTeam: "LV",points: 30.00},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LAR",points: 8.90},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 6.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: -2.00}
                  ],
                  bench: [
                    {name: "Tom Brady",position: "QB",nflTeam: "TB",points: 23.40},
                    {name: "Breshad Perriman",position: "WR",nflTeam: "NYJ",points: 3.10},
                    {name: "Jonnu Smith",position: "TE",nflTeam: "TEN",points: 10.20},
                    {name: "Ronald Jones",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Devin Singletary",position: "RB",nflTeam: "BUF",points: 17.40},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 2.00},
                  ]
                }
              },
              {
                teamId: "p5",
                seed: 5,
                score: 150.32,
                touchdowns: 9,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 29.22},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "DEN",points: 24.10},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "DET",points: 22.20},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "BUF",points: 25.70},
                    {name: "A.J. Brown",position: "WR",nflTeam: "TEN",points: 15.40},
                    {name: "Eric Ebron",position: "TE",nflTeam: "PIT",points: 0.00},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 14.70},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 11.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 8.00}
                  ],
                  bench: [
                    {name: "Adrian Peterson",position: "RB",nflTeam: "DET",points: 2.30},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 2.12},
                    {name: "Tim Patrick",position: "WR",nflTeam: "DEN",points: 4.40},
                    {name: "Irv Smith",position: "TE",nflTeam: "MIN",points: 6.70},
                    {name: "Lynn Bowden",position: "RB",nflTeam: "MIA",points: 10.60},
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 37.82},
                  ]
                }
              },
            ]
          },



//2020_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2020/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 118.14,
                touchdowns: 6,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 19.34},
                    {name: "Todd Gurley",position: "RB",nflTeam: "ATL",points: 3.40},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 19.50},
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 9.10},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 7.40},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 22.80},
                    {name: "Kendrick Bourne",position: "WR",nflTeam: "SF",points: 18.60},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 8.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 10.00}
                  ],
                  bench: [
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 0.00},
                    {name: "Latavius Murray",position: "RB",nflTeam: "NO",points: 10.90},
                    {name: "Nelson Agholor",position: "WR",nflTeam: "LV",points: 8.90},
                    {name: "Christian Kirk",position: "WR",nflTeam: "ARI",points: 6.30},
                    {name: "Gus Edwards",position: "RB",nflTeam: "BAL",points: 9.80},
                    {name: "Salvon Ahmed",position: "RB",nflTeam: "MIA",points: 21.70},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 149.46,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 37.66},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 25.20},
                    {name: "Chris Carson",position: "RB",nflTeam: "SEA",points: 8.90},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "ARI",points: 30.00},
                    {name: "Robert Woods",position: "WR",nflTeam: "LAR",points: 21.60},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "DET",points: 1.80},
                    {name: "Keke Coutee",position: "WR",nflTeam: "HOU",points: 14.30},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 8.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LAR",points: 2.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 15.28},
                    {name: "Sterling Shepard",position: "WR",nflTeam: "NYG",points: 8.80},
                    {name: "Hunter Henry",position: "TE",nflTeam: "LAC",points: 17.50},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "GB",points: 4.00},
                    {name: "Russell Gage",position: "WR",nflTeam: "ATL",points: 17.80},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 6.00},
                  ]
                }
              },
            ]
          },


//2020_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2020/F1.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 103.12,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 21.32},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "DEN",points: 7.90},
                    {name: "D'Andre Swift",position: "RB",nflTeam: "DET",points: 9.00},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "BUF",points: 41.50},
                    {name: "A.J. Brown",position: "WR",nflTeam: "TEN",points: 8.30},
                    {name: "Tyler Eifert",position: "TE",nflTeam: "JAX",points: 3.70},
                    {name: "Allen Lazard",position: "WR",nflTeam: "GB",points: 3.40},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 2.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 6.00}
                  ],
                  bench: [
                    {name: "Jimmy Graham",position: "TE",nflTeam: "CHI",points: 22.90},
                    {name: "Eric Ebron",position: "TE",nflTeam: "PIT",points: 15.70},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 0.00},
                    {name: "Irv Smith",position: "TE",nflTeam: "MIN",points: 23.30},
                    {name: "Zack Moss",position: "RB",nflTeam: "BUF",points: 12.70},
                    {name: "Jalen Hurts",position: "QB",nflTeam: "PHI",points: 18.58},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 104.50,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 32.30},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 9.80},
                    {name: "Chris Carson",position: "RB",nflTeam: "SEA",points: 10.90},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "ARI",points: 12.80},
                    {name: "Robert Woods",position: "WR",nflTeam: "LAR",points: 8.90},
                    {name: "T.J. Hockenson",position: "TE",nflTeam: "DET",points: 6.30},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "NO",points: 13.50},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 4.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LAR",points: 6.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 0.68},
                    {name: "Sterling Shepard",position: "WR",nflTeam: "NYG",points: 22.70},
                    {name: "Hunter Henry",position: "TE",nflTeam: "LAC",points: 0.00},
                    {name: "Keke Coutee",position: "WR",nflTeam: "HOU",points: 10.40},
                    {name: "Russell Gage",position: "WR",nflTeam: "ATL",points: 6.30},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 0.00},
                  ]
                }
              },
            ]
          },


//2020_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2020/F3.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 159.24,
                touchdowns: 9,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 25.14},
                    {name: "Mike Davis",position: "RB",nflTeam: "CAR",points: 8.80},
                    {name: "Kenyan Drake",position: "RB",nflTeam: "ARI",points: 13.00},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 43.20},
                    {name: "Allen Robinson",position: "WR",nflTeam: "CHI",points: 20.30},
                    {name: "Darren Waller",position: "TE",nflTeam: "LV",points: 16.20},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LAR",points: 14.60},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 7.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 11.00}
                  ],
                  bench: [
                    {name: "Tom Brady",position: "QB",nflTeam: "TB",points: 29.92},
                    {name: "Breshad Perriman",position: "WR",nflTeam: "NYJ",points: 0.60},
                    {name: "Jonnu Smith",position: "TE",nflTeam: "TEN",points: 12.00},
                    {name: "Ronald Jones",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Devin Singletary",position: "RB",nflTeam: "BUF",points: 7.20},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 0.00},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 156.64,
                touchdowns: 8,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 23.64},
                    {name: "Gus Edwards",position: "RB",nflTeam: "BAL",points: 14.20},
                    {name: "Jonathan Taylor",position: "RB",nflTeam: "IND",points: 19.40},
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 23.70},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 7.40},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 22.80},
                    {name: "Nelson Agholor",position: "WR",nflTeam: "LV",points: 26.50},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 9.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 10.00}
                  ],
                  bench: [
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 0.00},
                    {name: "Latavius Murray",position: "RB",nflTeam: "NO",points: 12.60},
                    {name: "Todd Gurley",position: "RB",nflTeam: "ATL",points: 8.00},
                    {name: "Kendrick Bourne",position: "WR",nflTeam: "SF",points: 2.60},
                    {name: "Christian Kirk",position: "WR",nflTeam: "ARI",points: 14.60},
                    {name: "Salvon Ahmed",position: "RB",nflTeam: "MIA",points: 1.30},
                  ]
                }
              },
            ]
          },


//2020_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2020/F5.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 133.06,
                touchdowns: 6,
                winner: true,
                
                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "NE",points: 9.76},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 16.50},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 15.80},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 40.10},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 14.00},
                    {name: "Robby Anderson",position: "WR",nflTeam: "CAR",points: 16.90},
                    {name: "Daniel Carlson",position: "K",nflTeam: "LV",points: 13.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 7.00}
                  ],
                  bench: [
                    {name: "Antonio Brown",position: "WR",nflTeam: "TB",points: 13.50},
                    {name: "Logan Thomas",position: "TE",nflTeam: "WAS",points: 13.30},
                    {name: "Keelan Cole",position: "WR",nflTeam: "JAX",points: 5.60},
                    {name: "Baker Mayfield",position: "QB",nflTeam: "CLE",points: 8.00},
                    {name: "Tee Higgins",position: "WR",nflTeam: "CIN",points: 21.90},
                    {name: "Antonio Gibson",position: "RB",nflTeam: "WAS",points: 9.90},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 117.42,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 19.22},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "TB",points: 15.60},
                    {name: "James Conner",position: "RB",nflTeam: "PIT",points: 17.60},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "KC",points: 1.40},
                    {name: "CeeDee Lamb",position: "WR",nflTeam: "DAL",points: 23.40},
                    {name: "Noah Fant",position: "TE",nflTeam: "DEN",points: 12.50},
                    {name: "J.K. Dobbins",position: "RB",nflTeam: "BAL",points: 13.70},
                    {name: "Tyler Bass",position: "K",nflTeam: "BUF",points: 8.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 6.00}
                  ],
                  bench: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 19.90},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 0.00},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "KC",points: 4.90},
                    {name: "Mike Gesicki",position: "TE",nflTeam: "MIA",points: 9.40},
                    {name: "James Robinson",position: "RB",nflTeam: "JAX",points: 0.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 9.00},
                  ]
                }
              },
            ]
          },
        ],


//END 2020 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2020_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "First Round",
            bowlArt: "artwork/2020/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 124.54,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 22.14},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 7.90},
                    {name: "J.D. McKissic",position: "RB",nflTeam: "WAS",points: 10.60},
                    {name: "Corey Davis",position: "WR",nflTeam: "TEN",points: 4.40},
                    {name: "Calvin Ridley",position: "WR",nflTeam: "ATL",points: 26.40},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "TB",points: 7.20},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 21.90},
                    {name: "Rodrigo Blankenship",position: "K",nflTeam: "IND",points: 14.00},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: 10.00}
                  ],
                  bench: [
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 18.20},
                    {name: "Frank Gore",position: "RB",nflTeam: "NYJ",points: 2.10},
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "TEN",points: 16.48},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 2.80},
                    {name: "DeVante Parker",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "CAR",points: 16.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 110.12,
                touchdowns: 6,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 15.72},
                    {name: "Phillip Lindsay",position: "RB",nflTeam: "DEN",points: 5.10},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "LV",points: 10.40},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "KC",points: 26.10},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 16.40},
                    {name: "Tyler Higbee",position: "TE",nflTeam: "LAR",points: 5.40},
                    {name: "Marquise Brown",position: "WR",nflTeam: "BAL",points: 13.00},
                    {name: "Ryan Succop",position: "K",nflTeam: "TB",points: 8.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 10.00}
                  ],
                  bench: [
                    {name: "Jared Cook",position: "TE",nflTeam: "NO",points: 12.70},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "HOU",points: 0.00},
                    {name: "Devontae Booker",position: "RB",nflTeam: "LV",points: 4.90},
                    {name: "Jared Goff",position: "QB",nflTeam: "LAR",points: 14.58},
                    {name: "Darrell Henderson",position: "RB",nflTeam: "LAR",points: 0.50},
                    {name: "Henry Ruggs",position: "WR",nflTeam: "LV",points: 4.80},
                  ]
                }
              },
            ]
          },

//2020_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2020/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 102.36,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Deshaun Watson",position: "QB",nflTeam: "HOU",points: 16.56},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 3.30},
                    {name: "Nyheim Hines",position: "RB",nflTeam: "IND",points: 11.50},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 18.10},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 9.90},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "DAL",points: 6.40},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 25.60},
                    {name: "Joey Slye",position: "K",nflTeam: "CAR",points: 9.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 2.00}
                  ],
                  bench: [
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 0.00},
                    {name: "Chase Edmonds",position: "RB",nflTeam: "ARI",points: 9.30},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "NE",points: 8.70},
                    {name: "Cam Akers",position: "RB",nflTeam: "LAR",points: 21.40},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 104.54,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Taysom Hill",position: "QB",nflTeam: "NO",points: 18.94},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 29.00},
                    {name: "Clyde Edwards-Helaire",position: "RB",nflTeam: "KC",points: 14.10},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 9.30},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 4.50},
                    {name: "Hayden Hurst",position: "TE",nflTeam: "ATL",points: 1.70},
                    {name: "Diontae Johnson",position: "WR",nflTeam: "PIT",points: 8.00},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 10.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 9.00}
                  ],
                  bench: [
                    {name: "Duke Johnson",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "Austin Hooper",position: "TE",nflTeam: "CLE",points: 0.00},
                    {name: "Kenny Golladay",position: "WR",nflTeam: "DET",points: 0.00},
                    {name: "Ty Johnson",position: "RB",nflTeam: "NYJ",points: 1.60},
                    {name: "Chase Claypool",position: "WR",nflTeam: "PIT",points: 4.50},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 12.00},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2020_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2020/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 101.20,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 6.70},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 18.40},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 24.80},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "NYJ",points: 12.60},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 2.50},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 17.60},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 14.60},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 2.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 2.00}
                  ],
                  bench: [
                    {name: "Marvin Jones",position: "WR",nflTeam: "DET",points: 27.20},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 0.00},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 7.90},
                    {name: "DJ Chark",position: "WR",nflTeam: "JAX",points: 9.30},
                    {name: "David Montgomery",position: "RB",nflTeam: "CHI",points: 29.20},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c4",
                seed: 4,
                score: 152.74,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 12.04},
                    {name: "Frank Gore",position: "RB",nflTeam: "NYJ",points: 13.50},
                    {name: "J.D. McKissic",position: "RB",nflTeam: "WAS",points: 25.70},
                    {name: "Corey Davis",position: "WR",nflTeam: "TEN",points: 21.00},
                    {name: "Calvin Ridley",position: "WR",nflTeam: "ATL",points: 32.30},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "TB",points: 5.90},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 22.30},
                    {name: "Rodrigo Blankenship",position: "K",nflTeam: "IND",points: 11.00},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: 9.00}
                  ],
                  bench: [
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 6.00},
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "TEN",points: 37.02},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 8.90},
                    {name: "DeVante Parker",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 0.00},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "CAR",points: 8.80},
                  ]
                }
              },
            ]
          },

//2020_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2020/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 103.54,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 33.14},
                    {name: "Wayne Gallman",position: "RB",nflTeam: "NYG",points: 2.90},
                    {name: "Miles Sanders",position: "RB",nflTeam: "PHI",points: 10.00},
                    {name: "Cole Beasley",position: "WR",nflTeam: "BUF",points: 19.20},
                    {name: "Amari Cooper",position: "WR",nflTeam: "DAL",points: 2.30},
                    {name: "Robert Tonyan",position: "TE",nflTeam: "GB",points: 10.80},
                    {name: "DJ Moore",position: "WR",nflTeam: "CAR",points: 19.20},
                    {name: "Wil Lutz",position: "K",nflTeam: "NO",points: 3.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 3.00}
                  ],
                  bench: [
                    {name: "Jordan Reed",position: "TE",nflTeam: "SF",points: 9.80},
                    {name: "Raheem Mostert",position: "RB",nflTeam: "SF",points: 6.80},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 4.20},
                    {name: "Sony Michel",position: "RB",nflTeam: "NE",points: 9.20},
                    {name: "Damien Harris",position: "RB",nflTeam: "NE",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 105.52,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "IND",points: 17.02},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 5.80},
                    {name: "Clyde Edwards-Helaire",position: "RB",nflTeam: "KC",points: 9.30},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 13.60},
                    {name: "Chase Claypool",position: "WR",nflTeam: "PIT",points: 7.80},
                    {name: "Hayden Hurst",position: "TE",nflTeam: "ATL",points: 12.10},
                    {name: "Diontae Johnson",position: "WR",nflTeam: "PIT",points: 19.90},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 8.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 12.00}
                  ],
                  bench: [
                    {name: "Duke Johnson",position: "RB",nflTeam: "HOU",points: 24.30},
                    {name: "Austin Hooper",position: "TE",nflTeam: "CLE",points: 15.10},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "Kenny Golladay",position: "WR",nflTeam: "DET",points: 0.00},
                    {name: "Taysom Hill",position: "QB",nflTeam: "NO",points: 6.30},
                    {name: "Ty Johnson",position: "RB",nflTeam: "NYJ",points: 17.50},
                  ]
                }
              },
            ]
          },

//2020_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2020/F7.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 113.20,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 19.90},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 17.90},
                    {name: "J.D. McKissic",position: "RB",nflTeam: "WAS",points: 23.20},
                    {name: "Corey Davis",position: "WR",nflTeam: "TEN",points: 0.00},
                    {name: "Calvin Ridley",position: "WR",nflTeam: "ATL",points: 17.30},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "TB",points: 19.80},
                    {name: "Brandon Aiyuk",position: "WR",nflTeam: "SF",points: 4.10},
                    {name: "Rodrigo Blankenship",position: "K",nflTeam: "IND",points: 6.00},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: 5.00}
                  ],
                  bench: [
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 10.40},
                    {name: "Frank Gore",position: "RB",nflTeam: "NYJ",points: 6.30},
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "TEN",points: 16.34},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 6.30},
                    {name: "DeVante Parker",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "CAR",points: 20.80},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 131.46,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tua Tagovailoa",position: "QB",nflTeam: "MIA",points: 8.86},
                    {name: "David Johnson",position: "RB",nflTeam: "HOU",points: 28.90},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 14.20},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 19.40},
                    {name: "Chase Claypool",position: "WR",nflTeam: "PIT",points: 9.40},
                    {name: "Austin Hooper",position: "TE",nflTeam: "CLE",points: 14.10},
                    {name: "Diontae Johnson",position: "WR",nflTeam: "PIT",points: 21.60},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 8.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 7.00}
                  ],
                  bench: [
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "Kenny Golladay",position: "WR",nflTeam: "DET",points: 0.00},
                    {name: "Taysom Hill",position: "QB",nflTeam: "NO",points: 11.02},
                    {name: "Hayden Hurst",position: "TE",nflTeam: "ATL",points: 15.70},
                    {name: "Ty Johnson",position: "RB",nflTeam: "NYJ",points: 1.30},
                    {name: "Clyde Edwards-Helaire",position: "RB",nflTeam: "KC",points: 0.00},
                  ]
                }
              },
            ]
          },

//2020_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2020/F9.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 202.66,
                touchdowns: 12,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 25.54},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 56.20},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 12.80},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "NYJ",points: 29.32},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 24.60},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 13.60},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 17.60},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 14.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 9.00}
                  ],
                  bench: [
                    {name: "Marvin Jones",position: "WR",nflTeam: "DET",points: 4.90},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 13.20},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 6.80},
                    {name: "DJ Chark",position: "WR",nflTeam: "JAX",points: 16.20},
                    {name: "David Montgomery",position: "RB",nflTeam: "CHI",points: 20.10},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 90.28,
                touchdowns: 1,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 15.38},
                    {name: "Wayne Gallman",position: "RB",nflTeam: "NYG",points: 7.30},
                    {name: "Miles Sanders",position: "RB",nflTeam: "PHI",points: 18.40},
                    {name: "Cole Beasley",position: "WR",nflTeam: "BUF",points: 4.70},
                    {name: "Amari Cooper",position: "WR",nflTeam: "DAL",points: 16.10},
                    {name: "Robert Tonyan",position: "TE",nflTeam: "GB",points: 2.70},
                    {name: "DJ Moore",position: "WR",nflTeam: "CAR",points: 8.70},
                    {name: "Wil Lutz",position: "K",nflTeam: "NO",points: 10.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 7.00}
                  ],
                  bench: [
                    {name: "Jordan Reed",position: "TE",nflTeam: "SF",points: 0.00},
                    {name: "Raheem Mostert",position: "RB",nflTeam: "SF",points: 0.00},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 9.40},
                    {name: "Sony Michel",position: "RB",nflTeam: "NE",points: 6.90},
                    {name: "Damien Harris",position: "RB",nflTeam: "NE",points: 0.00},
                  ]
                }
              },
            ]
          },


//2020_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "The Malcolm Rhodes Memorial Bowl",
            bowlArt: "artwork/2020/F11.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 141.34,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 8.14},
                    {name: "Jeff Wilson",position: "RB",nflTeam: "SF",points: 27.40},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "LV",points: 6.90},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "HOU",points: 27.10},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "KC",points: 10.50},
                    {name: "Jared Cook",position: "TE",nflTeam: "NO",points: 11.20},
                    {name: "Michael Gallup",position: "WR",nflTeam: "DAL",points: 30.10},
                    {name: "Cairo Santos",position: "K",nflTeam: "CHI",points: 11.00},
                    {name: "Washington Football Team",position: "DEF",nflTeam: "WAS",points: 9.00}
                  ],
                  bench: [
                    {name: "Tyler Higbee",position: "TE",nflTeam: "LAR",points: 6.40},
                    {name: "Rashard Higgins",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "Phillip Lindsay",position: "RB",nflTeam: "DEN",points: 0.00},
                    {name: "Marquise Brown",position: "WR",nflTeam: "BAL",points: 12.50},
                    {name: "Darrell Henderson",position: "RB",nflTeam: "LAR",points: 6.20},
                    {name: "Justin Herbert",position: "QB",nflTeam: "LAC",points: 16.72},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 128.26,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Deshaun Watson",position: "QB",nflTeam: "HOU",points: 26.76},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 20.10},
                    {name: "Myles Gaskin",position: "RB",nflTeam: "MIA",points: 33.90},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 11.90},
                    {name: "Justin Jefferson",position: "WR",nflTeam: "MIN",points: 14.50},
                    {name: "Dalton Schultz",position: "TE",nflTeam: "DAL",points: 5.10},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 9.00},
                    {name: "Ryan Succop",position: "K",nflTeam: "TB",points: 5.00},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 2.00}
                  ],
                  bench: [
                    {name: "Ito Smith",position: "RB",nflTeam: "ATL",points: 6.10},
                    {name: "Nyheim Hines",position: "RB",nflTeam: "IND",points: 10.40},
                    {name: "Devine Ozigbo",position: "RB",nflTeam: "JAX",points: 1.40},
                    {name: "Jakobi Meyers",position: "WR",nflTeam: "NE",points: 8.50},
                    {name: "Tony Pollard",position: "RB",nflTeam: "DAL",points: 3.00},
                  ]
                }
              },
            ]
          },
        ],
//END 2020 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2020!!!!!!!!!!!!!!!!!!!!!!!!!!END2020!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2020!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2020




//START YEAR 2019  COMPLETE

    2019: {
      format: "current",
      teams: {
        p1: {name: "Maximum Brutality",owner: "Mike",art: "artwork/2019/p1.png"},
        p2: {name: "Double Dawgs",owner: "Max",art: "artwork/2019/p2.png"},
        p3: {name: "Vick's Dogs",owner: "Will",art: "artwork/2019/p3.png"},
        p4: {name: "Vape Lords",owner: "Chris",art: "artwork/2019/p4.png"},
        p5: {name: "Mr Auto Draft",owner: "Keith",art: "artwork/2019/p5.png"},
        p6: {name: "Reek Havoc",owner: "Brycen",art: "artwork/2019/p6.png"},
        c1: {name: "Lutz get to it to it to it",owner: "Ethan",art: "artwork/2019/c1.png"},
        c2: {name: "Beats by Deandre",owner: "Cody",art: "artwork/2019/c2.png"},
        c3: {name: "Davy Jones Locker Room",owner: "Matt",art: "artwork/2019/c3.png"},
        c4: {name: "The Breakfast Chubb",owner: "Jordan",art: "artwork/2019/c4.png"},
        c5: {name: "Recyclables",owner: "Bailey",art: "artwork/2019/c5.png"},
        c6: {name: "A Song of Matty Ice and Fire",owner: "David",art: "artwork/2019/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2019_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2019/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 156.40,
      touchdowns: 8,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 11.40},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 27.60},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 31.20},
                    {name: "Odell Beckham",position: "WR",nflTeam: "CLE",points: 5.90},
                    {name: "Allen Robinson",position: "WR",nflTeam: "CHI",points: 21.80},
                    {name: "Jared Cook",position: "TE",nflTeam: "NO",points: 20.40},
                    {name: "Robby Anderson",position: "WR",nflTeam: "NYJ",points: 25.10},
                    {name: "Matt Gay",position: "K",nflTeam: "TB",points: 8.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 5.00}
                  ],
                  bench: [
                    {name: "Danny Amendola",position: "WR",nflTeam: "DET",points: 8.40},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 5.00},
                    {name: "Latavius Murray",position: "RB",nflTeam: "NO",points: 11.40},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "LA",points: 0.00},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "SF",points: 0.60},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "CAR",points: 6.20},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 140.80,
      touchdowns: 6,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Carson Wentz",position: "QB",nflTeam: "PHI",points: 19.90},
                    {name: "James White",position: "RB",nflTeam: "NE",points: 12.40},
                    {name: "Devin Singletary",position: "RB",nflTeam: "BUF",points: 17.80},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 24.30},
                    {name: "Robert Woods",position: "WR",nflTeam: "LA",points: 25.70},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 18.00},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 15.70},
                    {name: "Aldrick Rosas",position: "K",nflTeam: "NYG",points: 5.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 2.00}
                  ],
                  bench: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 13.58},
                    {name: "Vance McDonald",position: "TE",nflTeam: "PIT",points: 1.30},
                    {name: "Duke Johnson",position: "RB",nflTeam: "HOU",points: 10.50},
                    {name: "Corey Davis",position: "WR",nflTeam: "TEN",points: 5.40},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Marquez Valdes-Scantling",position: "WR",nflTeam: "GB",points: 0.00},
                  ]
                }
    },
  ]
},



//2019_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2019/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 123.96,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 17.46},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 21.30},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 15.50},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 13.30},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 8.30},
                    {name: "Austin Hooper",position: "TE",nflTeam: "ATL",points: 5.20},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 23.90},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 8.00},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 11.00}
                  ],
                  bench: [
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "NE",points: 2.30},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 20.18},
                    {name: "Peyton Barber",position: "RB",nflTeam: "TB",points: 7.30},
                    {name: "Christian Kirk",position: "WR",nflTeam: "ARI",points: 16.90},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 7.10},
                    {name: "Zane Gonzalez",position: "K",nflTeam: "ARI",points: 5.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 90.94,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jacoby Brissett",position: "QB",nflTeam: "IND",points: 22.64},
                    {name: "Phillip Lindsay",position: "RB",nflTeam: "DEN",points: 13.50},
                    {name: "Benny Snell",position: "RB",nflTeam: "PIT",points: 2.10},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "KC",points: 13.00},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 30.40},
                    {name: "Darren Fells",position: "TE",nflTeam: "HOU",points: 2.20},
                    {name: "Golden Tate",position: "WR",nflTeam: "NYG",points: 2.10},
                    {name: "Josh Lambo",position: "K",nflTeam: "JAX",points: 4.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 1.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 0.00},
                    {name: "Jared Goff",position: "QB",nflTeam: "LA",points: 16.12},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 14.30},
                    {name: "Ronald Jones",position: "RB",nflTeam: "TB",points: 9.90},
                    {name: "Sony Michel",position: "RB",nflTeam: "NE",points: 1.90},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIN",points: 8.40},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2019_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2019/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 139.90,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 22.70},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "KC",points: 1.60},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 37.50},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "NYJ",points: 27.00},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 17.10},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 17.10},
                    {name: "David Montgomery",position: "RB",nflTeam: "CHI",points: 5.90},
                    {name: "Matt Prater",position: "K",nflTeam: "DET",points: 5.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 6.00}
                  ],
                  bench: [
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 6.50},
                    {name: "Jordan Howard",position: "RB",nflTeam: "PHI",points: 0.00},
                    {name: "Mitchell Trubisky",position: "QB",nflTeam: "CHI",points: 16.26},
                    {name: "Marlon Mack",position: "RB",nflTeam: "IND",points: 1.90},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "GB",points: 4.30},
                    {name: "James Washington",position: "WR",nflTeam: "PIT",points: 13.30},
                  ]
                }
              },
              {
                teamId: "p4",
                seed: 4,
                score: 139.82,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 14.42},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 18.60},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 17.10},
                    {name: "Danny Amendola",position: "WR",nflTeam: "DET",points: 18.20},
                    {name: "Allen Robinson",position: "WR",nflTeam: "CHI",points: 19.50},
                    {name: "Jared Cook",position: "TE",nflTeam: "NO",points: 9.40},
                    {name: "Odell Beckham",position: "WR",nflTeam: "CLE",points: 14.60},
                    {name: "Matt Gay",position: "K",nflTeam: "TB",points: 8.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 20.00}
                  ],
                  bench: [
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 7.20},
                    {name: "Latavius Murray",position: "RB",nflTeam: "NO",points: 6.90},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "LA",points: 8.60},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "SF",points: 4.00},
                    {name: "Robby Anderson",position: "WR",nflTeam: "NYJ",points: 12.60},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "CAR",points: 16.40},
                  ]
                }
              },
            ]
          },



//2019_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2019/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 160.98,
                touchdowns: 8,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 37.08},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "LAC",points: 7.40},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 31.00},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 12.00},
                    {name: "DJ Moore",position: "WR",nflTeam: "CAR",points: 20.30},
                    {name: "Tyler Higbee",position: "TE",nflTeam: "LA",points: 23.10},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LA",points: 16.10},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 9.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 5.00}
                  ],
                  bench: [
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "TEN",points: 24.16},
                    {name: "DeAndre Washington",position: "RB",nflTeam: "LV",points: 4.20},
                    {name: "James Conner",position: "RB",nflTeam: "PIT",points: 15.10},
                    {name: "Mark Andrews",position: "TE",nflTeam: "BAL",points: 15.20},
                    {name: "A.J. Brown",position: "WR",nflTeam: "TEN",points: 25.40},
                    {name: "Marquise Brown",position: "WR",nflTeam: "BAL",points: 14.50},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 108.28,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 17.68},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 20.80},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 7.30},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 18.90},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 26.00},
                    {name: "Austin Hooper",position: "TE",nflTeam: "ATL",points: 5.00},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 8.60},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 6.00},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: -2.00}
                  ],
                  bench: [
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "NE",points: 3.30},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 15.88},
                    {name: "Peyton Barber",position: "RB",nflTeam: "TB",points: 6.00},
                    {name: "Christian Kirk",position: "WR",nflTeam: "ARI",points: 10.10},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 10.50},
                    {name: "Zane Gonzalez",position: "K",nflTeam: "ARI",points: 8.00},
                  ]
                }
              },
            ]
          },


//2019_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2019/F1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 107.24,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 25.44},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 32.30},
                    {name: "Marlon Mack",position: "RB",nflTeam: "IND",points: 18.10},
                    {name: "Anthony Miller",position: "WR",nflTeam: "CHI",points: 1.20},
                    {name: "James Washington",position: "WR",nflTeam: "PIT",points: 9.10},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 6.80},
                    {name: "Mike Boone",position: "RB",nflTeam: "MIN",points: 4.30},
                    {name: "Matt Prater",position: "K",nflTeam: "DET",points: 5.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 5.00}
                  ],
                  bench: [
                    {name: "LeSean McCoy",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "Dion Lewis",position: "RB",nflTeam: "TEN",points: 9.70},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 5.60},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "NYJ",points: 10.00},
                    {name: "Mitchell Trubisky",position: "QB",nflTeam: "CHI",points: 8.28},
                    {name: "David Montgomery",position: "RB",nflTeam: "CHI",points: 6.90},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 132.42,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 29.82},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "LAC",points: 22.70},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 15.40},
                    {name: "DJ Moore",position: "WR",nflTeam: "CAR",points: 1.10},
                    {name: "A.J. Brown",position: "WR",nflTeam: "TEN",points: 15.30},
                    {name: "Tyler Higbee",position: "TE",nflTeam: "LA",points: 19.40},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 14.70},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 10.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 4.00}
                  ],
                  bench: [
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "TEN",points: 23.68},
                    {name: "Breshad Perriman",position: "WR",nflTeam: "TB",points: 17.20},
                    {name: "DeAndre Washington",position: "RB",nflTeam: "LV",points: 18.60},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LA",points: 13.10},
                    {name: "James Conner",position: "RB",nflTeam: "PIT",points: 3.20},
                    {name: "Marquise Brown",position: "WR",nflTeam: "BAL",points: 1.60},
                  ]
                }
              },
            ]
          },


//2019_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2019/F3.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 110.64,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 8.34},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 9.30},
                    {name: "Aaron Jones",position: "RB",nflTeam: "GB",points: 28.00},
                    {name: "Allen Robinson",position: "WR",nflTeam: "CHI",points: 11.30},
                    {name: "Robby Anderson",position: "WR",nflTeam: "NYJ",points: 11.20},
                    {name: "Jared Cook",position: "TE",nflTeam: "NO",points: 23.40},
                    {name: "Danny Amendola",position: "WR",nflTeam: "DET",points: 4.10},
                    {name: "Matt Gay",position: "K",nflTeam: "TB",points: 10.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 5.00}
                  ],
                  bench: [
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 14.80},
                    {name: "Latavius Murray",position: "RB",nflTeam: "NO",points: 4.50},
                    {name: "Odell Beckham",position: "WR",nflTeam: "CLE",points: 14.40},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "LA",points: 13.90},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "SF",points: 3.30},
                    {name: "Curtis Samuel",position: "WR",nflTeam: "CAR",points: 4.10},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 69.10,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 11.30},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 16.80},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 0.00},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 11.60},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 2.20},
                    {name: "Austin Hooper",position: "TE",nflTeam: "ATL",points: 15.20},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 0.00},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 11.00},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 1.00}
                  ],
                  bench: [
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "NE",points: 5.40},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 21.94},
                    {name: "Peyton Barber",position: "RB",nflTeam: "TB",points: -0.70},
                    {name: "Christian Kirk",position: "WR",nflTeam: "ARI",points: 0.90},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 24.10},
                    {name: "Zane Gonzalez",position: "K",nflTeam: "ARI",points: 9.00},
                  ]
                }
              },
            ]
          },


//2019_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2019/F5.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 109.16,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Carson Wentz",position: "QB",nflTeam: "PHI",points: 18.96},
                    {name: "James White",position: "RB",nflTeam: "NE",points: 6.90},
                    {name: "Devin Singletary",position: "RB",nflTeam: "BUF",points: 5.80},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 14.20},
                    {name: "Robert Woods",position: "WR",nflTeam: "LA",points: 20.30},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 21.40},
                    {name: "Terry McLaurin",position: "WR",nflTeam: "WAS",points: 15.60},
                    {name: "Aldrick Rosas",position: "K",nflTeam: "NYG",points: 5.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 1.00}
                  ],
                  bench: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 6.88},
                    {name: "Vance McDonald",position: "TE",nflTeam: "PIT",points: 3.90},
                    {name: "Duke Johnson",position: "RB",nflTeam: "HOU",points: 0.60},
                    {name: "Corey Davis",position: "WR",nflTeam: "TEN",points: 7.00},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 4.20},
                    {name: "Marquez Valdes-Scantling",position: "WR",nflTeam: "GB",points: 1.60},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 116.16,
                touchdowns: 3,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jacoby Brissett",position: "QB",nflTeam: "IND",points: 15.66},
                    {name: "Phillip Lindsay",position: "RB",nflTeam: "DEN",points: 19.80},
                    {name: "Sony Michel",position: "RB",nflTeam: "NE",points: 11.10},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "KC",points: 12.20},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 31.60},
                    {name: "Darren Fells",position: "TE",nflTeam: "HOU",points: 5.70},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 8.10},
                    {name: "Josh Lambo",position: "K",nflTeam: "JAX",points: 6.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 6.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 0.00},
                    {name: "Golden Tate",position: "WR",nflTeam: "NYG",points: 15.60},
                    {name: "Jared Goff",position: "QB",nflTeam: "LA",points: 20.12},
                    {name: "Ronald Jones",position: "RB",nflTeam: "TB",points: 19.90},
                    {name: "Alexander Mattison",position: "RB",nflTeam: "MIN",points: 0.00},
                    {name: "Benny Snell",position: "RB",nflTeam: "PIT",points: 1.40},
                  ]
                }
              },
            ]
          },
        ],


//END 2019 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2019_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "First Round",
            bowlArt: "artwork/2019/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 121.68,
                touchdowns: 4,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Baker Mayfield",position: "QB",nflTeam: "CLE",points: 10.98},
                    {name: "Mark Ingram",position: "RB",nflTeam: "BAL",points: 10.90},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 12.70},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 11.60},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 8.40},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 18.70},
                    {name: "Darius Slayton",position: "WR",nflTeam: "NYG",points: 32.40},
                    {name: "Daniel Carlson",position: "K",nflTeam: "LV",points: 3.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 13.00}
                  ],
                  bench: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 40.06},
                    {name: "Cole Beasley",position: "WR",nflTeam: "BUF",points: 14.90},
                    {name: "Ryan Griffin",position: "TE",nflTeam: "NYJ",points: 1.80},
                    {name: "Tyrell Williams",position: "WR",nflTeam: "LV",points: 6.50},
                    {name: "Jaylen Samuels",position: "RB",nflTeam: "PIT",points: 5.40},
                    {name: "Tennessee Titans",position: "DEF",nflTeam: "TEN",points: 10.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 113.04,
                touchdowns: 5,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 34.74},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 14.80},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 6.30},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "CLE",points: 11.60},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 8.10},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 8.70},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 13.80},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 8.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 7.00}
                  ],
                  bench: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "LAC",points: 24.56},
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 0.00},
                    {name: "Gerald Everett",position: "TE",nflTeam: "LA",points: 0.00},
                    {name: "Matt Breida",position: "RB",nflTeam: "SF",points: 6.80},
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 9.96},
                    {name: "Adam Vinatieri",position: "K",nflTeam: "IND",points: 0.00},
                  ]
                }
              },
            ]
          },

//2019_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2019/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 102.24,
                touchdowns: 3,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 10.74},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "JAX",points: 9.30},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 9.70},
                    {name: "Amari Cooper",position: "WR",nflTeam: "DAL",points: 20.30},
                    {name: "Kenny Golladay",position: "WR",nflTeam: "DET",points: 17.80},
                    {name: "Jack Doyle",position: "TE",nflTeam: "IND",points: 4.70},
                    {name: "Kenyan Drake",position: "RB",nflTeam: "ARI",points: 9.70},
                    {name: "Brett Maher",position: "K",nflTeam: "FA",points: 6.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LA",points: 14.00}
                  ],
                  bench: [
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "SF",points: 34.10},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "WAS",points: 13.60},
                    {name: "Jimmy Garoppolo",position: "QB",nflTeam: "SF",points: 28.06},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 0.00},
                    {name: "Jacob Hollister",position: "TE",nflTeam: "SEA",points: 7.40},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 4.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 90.52,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 21.32},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 19.40},
                    {name: "Tarik Cohen",position: "RB",nflTeam: "CHI",points: 9.10},
                    {name: "Marvin Jones",position: "WR",nflTeam: "DET",points: 6.80},
                    {name: "DeVante Parker",position: "WR",nflTeam: "MIA",points: 4.80},
                    {name: "Hunter Henry",position: "TE",nflTeam: "LAC",points: 11.90},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 13.20},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 6.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: -2.00}
                  ],
                  bench: [
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 0.00},
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 10.76},
                    {name: "Damien Williams",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 13.30},
                    {name: "Raheem Mostert",position: "RB",nflTeam: "SF",points: 24.90},
                    {name: "Michael Gallup",position: "WR",nflTeam: "DAL",points: 16.90},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2019_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2019/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 144.62,
                touchdowns: 7,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Deshaun Watson",position: "QB",nflTeam: "HOU",points: 16.92},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "NYJ",points: 10.80},
                    {name: "Chris Carson",position: "RB",nflTeam: "SEA",points: 26.70},
                    {name: "Will Fuller",position: "WR",nflTeam: "HOU",points: 11.10},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 4.70},
                    {name: "Darren Waller",position: "TE",nflTeam: "LV",points: 20.20},
                    {name: "Miles Sanders",position: "RB",nflTeam: "PHI",points: 35.20},
                    {name: "Wil Lutz",position: "K",nflTeam: "NO",points: 10.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 9.00}
                  ],
                  bench: [
                    {name: "Dez Bryant",position: "WR",nflTeam: "FA",points: 0.00},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 0.00},
                    {name: "Isaiah Ford",position: "WR",nflTeam: "MIA",points: 5.10},
                    {name: "DJ Chark",position: "WR",nflTeam: "JAX",points: 0.00},
                    {name: "Patrick Laird",position: "RB",nflTeam: "MIA",points: 7.40},
                  ]
                }
              },
              {
                teamId: "c4",
                seed: 4,
                score: 200.48,
                touchdowns: 11,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 28.28},
                    {name: "Mark Ingram",position: "RB",nflTeam: "BAL",points: 23.60},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 23.80},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 38.40},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 11.90},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 26.40},
                    {name: "Darius Slayton",position: "WR",nflTeam: "NYG",points: 11.10},
                    {name: "Robbie Gould",position: "K",nflTeam: "SF",points: 10.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 27.00}
                  ],
                  bench: [
                    {name: "Cole Beasley",position: "WR",nflTeam: "BUF",points: 1.60},
                    {name: "Chris Conley",position: "WR",nflTeam: "JAX",points: 20.90},
                    {name: "Tyrell Williams",position: "WR",nflTeam: "LV",points: 12.50},
                    {name: "Baker Mayfield",position: "QB",nflTeam: "CLE",points: 16.98},
                    {name: "Jaylen Samuels",position: "RB",nflTeam: "PIT",points: 1.40},
                    {name: "Tennessee Titans",position: "DEF",nflTeam: "TEN",points: 5.00},
                  ]
                }
              },
            ]
          },

//2019_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2019/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 115.44,
                touchdowns: 2,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 19.34},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 13.10},
                    {name: "Boston Scott",position: "RB",nflTeam: "PHI",points: 13.50},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 17.90},
                    {name: "Dede Westbrook",position: "WR",nflTeam: "JAX",points: 4.10},
                    {name: "Noah Fant",position: "TE",nflTeam: "DEN",points: 7.60},
                    {name: "John Brown",position: "WR",nflTeam: "BUF",points: 16.90},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 5.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 18.00}
                  ],
                  bench: [
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 7.80},
                    {name: "Sterling Shepard",position: "WR",nflTeam: "NYG",points: 20.10},
                    {name: "Kerryon Johnson",position: "RB",nflTeam: "DET",points: 0.00},
                    {name: "Calvin Ridley",position: "WR",nflTeam: "ATL",points: 0.00},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "LV",points: 12.90},
                    {name: "Joey Slye",position: "K",nflTeam: "CAR",points: 8.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 111.20,
                touchdowns: 7,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jimmy Garoppolo",position: "QB",nflTeam: "SF",points: 12.60},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "JAX",points: 12.30},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 30.30},
                    {name: "Amari Cooper",position: "WR",nflTeam: "DAL",points: 2.90},
                    {name: "Kenny Golladay",position: "WR",nflTeam: "DET",points: 7.40},
                    {name: "Jack Doyle",position: "TE",nflTeam: "IND",points: 4.10},
                    {name: "Kenyan Drake",position: "RB",nflTeam: "ARI",points: 39.60},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 6.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LA",points: -4.00}
                  ],
                  bench: [
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "SF",points: 2.90},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "WAS",points: 18.10},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 0.00},
                    {name: "Jacob Hollister",position: "TE",nflTeam: "SEA",points: 5.30},
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 16.36},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 3.00},
                  ]
                }
              },
            ]
          },

//2019_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2019/F7.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 118.06,
                touchdowns: 5,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 22.86},
                    {name: "Mark Ingram",position: "RB",nflTeam: "BAL",points: 17.10},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 4.50},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 26.60},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 9.10},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 18.90},
                    {name: "Darius Slayton",position: "WR",nflTeam: "NYG",points: 0.00},
                    {name: "Robbie Gould",position: "K",nflTeam: "SF",points: 10.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 9.00}
                  ],
                  bench: [
                    {name: "Cole Beasley",position: "WR",nflTeam: "BUF",points: 17.80},
                    {name: "Chris Conley",position: "WR",nflTeam: "JAX",points: 13.60},
                    {name: "Tyrell Williams",position: "WR",nflTeam: "LV",points: 12.20},
                    {name: "Baker Mayfield",position: "QB",nflTeam: "CLE",points: 14.08},
                    {name: "Jaylen Samuels",position: "RB",nflTeam: "PIT",points: 7.90},
                    {name: "Tennessee Titans",position: "DEF",nflTeam: "TEN",points: -1.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 95.36,
                touchdowns: 4,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 10.96},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 11.90},
                    {name: "Kerryon Johnson",position: "RB",nflTeam: "DET",points: 5.30},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 7.30},
                    {name: "Sterling Shepard",position: "WR",nflTeam: "NYG",points: 19.60},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 1.70},
                    {name: "John Brown",position: "WR",nflTeam: "BUF",points: 12.60},
                    {name: "Younghoe Koo",position: "K",nflTeam: "ATL",points: 6.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 20.00}
                  ],
                  bench: [
                    {name: "Jalen Richard",position: "RB",nflTeam: "LV",points: 6.90},
                    {name: "Dede Westbrook",position: "WR",nflTeam: "JAX",points: 2.50},
                    {name: "Boston Scott",position: "RB",nflTeam: "PHI",points: 7.90},
                    {name: "Josh Jacobs",position: "RB",nflTeam: "LV",points: 0.00},
                    {name: "Noah Fant",position: "TE",nflTeam: "DEN",points: 3.00},
                    {name: "Joey Slye",position: "K",nflTeam: "CAR",points: 8.00},
                  ]
                }
              },
            ]
          },

//2019_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2019/F9.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 98.66,
                touchdowns: 2,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Deshaun Watson",position: "QB",nflTeam: "HOU",points: 9.06},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "NYJ",points: 13.30},
                    {name: "Chris Carson",position: "RB",nflTeam: "SEA",points: 7.00},
                    {name: "Will Fuller",position: "WR",nflTeam: "HOU",points: 3.10},
                    {name: "Deebo Samuel",position: "WR",nflTeam: "SF",points: 15.90},
                    {name: "Darren Waller",position: "TE",nflTeam: "LV",points: 7.70},
                    {name: "Miles Sanders",position: "RB",nflTeam: "PHI",points: 26.60},
                    {name: "Wil Lutz",position: "K",nflTeam: "NO",points: 8.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 8.00}
                  ],
                  bench: [
                    {name: "Dez Bryant",position: "WR",nflTeam: "FA",points: 0.00},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 0.00},
                    {name: "Isaiah Ford",position: "WR",nflTeam: "MIA",points: 11.80},
                    {name: "DJ Chark",position: "WR",nflTeam: "JAX",points: 3.80},
                    {name: "Patrick Laird",position: "RB",nflTeam: "MIA",points: 2.80},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 150.92,
                touchdowns: 6,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jimmy Garoppolo",position: "QB",nflTeam: "SF",points: 10.42},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "JAX",points: 13.50},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 43.90},
                    {name: "Amari Cooper",position: "WR",nflTeam: "DAL",points: 6.40},
                    {name: "Kenny Golladay",position: "WR",nflTeam: "DET",points: 18.60},
                    {name: "Jack Doyle",position: "TE",nflTeam: "IND",points: 3.70},
                    {name: "Kenyan Drake",position: "RB",nflTeam: "ARI",points: 33.40},
                    {name: "Jason Myers",position: "K",nflTeam: "SEA",points: 9.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 12.00}
                  ],
                  bench: [
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "SF",points: 9.10},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "WAS",points: 13.50},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 0.00},
                    {name: "Jacob Hollister",position: "TE",nflTeam: "SEA",points: 11.40},
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 20.62},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LA",points: 9.00},
                  ]
                }
              },
            ]
          },


//2019_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "",
            bowlArt: "artwork/2019/F11.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 90.02,
                touchdowns: 3,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kyler Murray",position: "QB",nflTeam: "ARI",points: 12.72},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "CLE",points: 8.10},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 29.00},
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 0.20},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 22.60},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 3.40},
                    {name: "DK Metcalf",position: "WR",nflTeam: "SEA",points: 0.00},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 9.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 5.00}
                  ],
                  bench: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "LAC",points: 11.16},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "CLE",points: 14.40},
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 11.00},
                    {name: "Gerald Everett",position: "TE",nflTeam: "LA",points: 0.00},
                    {name: "Matt Breida",position: "RB",nflTeam: "SF",points: 0.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 11.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 155.16,
                touchdowns: 7,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 15.96},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 33.70},
                    {name: "Raheem Mostert",position: "RB",nflTeam: "SF",points: 11.30},
                    {name: "DeVante Parker",position: "WR",nflTeam: "MIA",points: 22.10},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 33.80},
                    {name: "Hunter Henry",position: "TE",nflTeam: "LAC",points: 9.50},
                    {name: "Michael Gallup",position: "WR",nflTeam: "DAL",points: 14.80},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 7.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 7.00}
                  ],
                  bench: [
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 5.30},
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 17.24},
                    {name: "Carlos Hyde",position: "RB",nflTeam: "HOU",points: 10.70},
                    {name: "Damien Williams",position: "RB",nflTeam: "KC",points: 18.20},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 1.70},
                    {name: "Tarik Cohen",position: "RB",nflTeam: "CHI",points: 6.30},
                  ]
                }
              },
            ]
          },
        ],
//END 2019 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2019!!!!!!!!!!!!!!!!!!!!!!!!!!END2019!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2019!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2019








//START YEAR 2018  COMPLETE

    2018: {
      format: "current",
      teams: {
        p1: {name: "King Goffrey",owner: "Brycen",art: "artwork/2018/p1.png"},
        p2: {name: "Vick's Dogs",owner: "Will",art: "artwork/2018/p2.png"},
        p3: {name: "Matty Twice",owner: "Bailey",art: "artwork/2018/p3.png"},
        p4: {name: "Christs Crusaders",owner: "Matt",art: "artwork/2018/p4.png"},
        p5: {name: "Golden Taint",owner: "Harrison",art: "artwork/2018/p5.png"},
        p6: {name: "Maximum Brutality",owner: "Mike",art: "artwork/2018/p6.png"},
        c1: {name: "The Quintorris Bless 'Em's",owner: "Ethan",art: "artwork/2018/c1.png"},
        c2: {name: "Vape Lords",owner: "Chris",art: "artwork/2018/c2.png"},
        c3: {name: "The Breakfast Chubb",owner: "Jordan",art: "artwork/2018/c3.png"},
        c4: {name: "kkk",owner: "Keith",art: "artwork/2018/c4.png"},
        c5: {name: "Captain Kirk",owner: "David",art: "artwork/2018/c5.png"},
        c6: {name: "zea pakkk",owner: "James",art: "artwork/2018/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2018_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2018/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 89.92,
      touchdowns: null,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 18.02},
                    {name: "Marlon Mack",position: "RB",nflTeam: "IND",points: 25.90},
                    {name: "Tarik Cohen",position: "RB",nflTeam: "CHI",points: 14.50},
                    {name: "Josh Gordon",position: "WR",nflTeam: "NE",points: 2.90},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 0.00},
                    {name: "Vance McDonald",position: "TE",nflTeam: "PIT",points: 9.30},
                    {name: "Adam Humphries",position: "WR",nflTeam: "TB",points: 6.30},
                    {name: "Wil Lutz",position: "K",nflTeam: "NO",points: 6.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 7.00}
                  ],
                  bench: [
                    {name: "Frank Gore",position: "RB",nflTeam: "MIA",points: 1.40},
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "ATL",points: 7.10},
                    {name: "Deshaun Watson",position: "QB",nflTeam: "HOU",points: 22.36},
                    {name: "Josh Reynolds",position: "WR",nflTeam: "LA",points: 12.00},
                    {name: "Sony Michel",position: "RB",nflTeam: "NE",points: 5.90},
                    {name: "Detroit Lions",position: "DEF",nflTeam: "DET",points: 2.00},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 95.72,
      touchdowns: null,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 9.68},
                    {name: "Doug Martin",position: "RB",nflTeam: "LV",points: 3.90},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 9.60},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 7.60},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 11.90},
                    {name: "Eric Ebron",position: "TE",nflTeam: "IND",points: 1.80},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 30.24},
                    {name: "Greg Zuerlein",position: "K",nflTeam: "LA",points: 11.00},
                    {name: "Jacksonville Jaguars",position: "DEF",nflTeam: "JAX",points: 10.00}
                  ],
                  bench: [
                    {name: "Jordy Nelson",position: "WR",nflTeam: "LV",points: 14.80},
                    {name: "Devin Funchess",position: "WR",nflTeam: "CAR",points: 0.00},
                    {name: "Peyton Barber",position: "RB",nflTeam: "TB",points: 16.90},
                    {name: "Mitchell Trubisky",position: "QB",nflTeam: "CHI",points: 19.00},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 5.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 8.00},
                  ]
                }
    },
  ]
},



//2018_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2018/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 113.84,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 25.04},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 9.40},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 34.40},
                    {name: "Amari Cooper",position: "WR",nflTeam: "DAL",points: 8.30},
                    {name: "Calvin Ridley",position: "WR",nflTeam: "ATL",points: 9.20},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 4.10},
                    {name: "Kenyan Drake",position: "RB",nflTeam: "MIA",points: 6.40},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "SEA",points: 5.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 12.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 12.32},
                    {name: "Nelson Agholor",position: "WR",nflTeam: "PHI",points: 1.80},
                    {name: "Tre'Quan Smith",position: "WR",nflTeam: "NO",points: 3.50},
                    {name: "Dan Bailey",position: "K",nflTeam: "MIN",points: 11.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 2.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 149.70,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Nick Mullens",position: "QB",nflTeam: "SF",points: 14.80},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 20.50},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 26.00},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 14.90},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 13.80},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 13.10},
                    {name: "Kenny Golladay",position: "WR",nflTeam: "DET",points: 21.60},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 5.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 20.00}
                  ],
                  bench: [
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 0.00},
                    {name: "Tyrell Williams",position: "WR",nflTeam: "LAC",points: 13.10},
                    {name: "Carson Wentz",position: "QB",nflTeam: "PHI",points: 0.00},
                    {name: "Austin Hooper",position: "TE",nflTeam: "ATL",points: 0.00},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 10.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 13.00},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2018_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2018/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 157.04,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jared Goff",position: "QB",nflTeam: "LA",points: 17.24},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 26.50},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 13.50},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 19.00},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 24.10},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 35.00},
                    {name: "Phillip Lindsay",position: "RB",nflTeam: "DEN",points: 7.70},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 6.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LA",points: 8.00}
                  ],
                  bench: [
                    {name: "Chris Thompson",position: "RB",nflTeam: "WAS",points: 3.80},
                    {name: "Spencer Ware",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "LA",points: 9.20},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "GB",points: 27.60},
                    {name: "Baker Mayfield",position: "QB",nflTeam: "CLE",points: 24.96},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 6.00},
                  ]
                }
              },
              {
                teamId: "p5",
                seed: 5,
                score: 143.48,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 21.58},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 16.20},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 18.70},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 13.90},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 27.90},
                    {name: "Eric Ebron",position: "TE",nflTeam: "IND",points: 5.80},
                    {name: "Jaylen Samuels",position: "RB",nflTeam: "PIT",points: 15.40},
                    {name: "Greg Zuerlein",position: "K",nflTeam: "LA",points: 7.00},
                    {name: "Jacksonville Jaguars",position: "DEF",nflTeam: "JAX",points: 17.00}
                  ],
                  bench: [
                    {name: "Jordy Nelson",position: "WR",nflTeam: "LV",points: 14.50},
                    {name: "Doug Martin",position: "RB",nflTeam: "LV",points: 18.60},
                    {name: "Peyton Barber",position: "RB",nflTeam: "TB",points: 8.60},
                    {name: "Mitchell Trubisky",position: "QB",nflTeam: "CHI",points: 12.14},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 8.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: -1.00},
                  ]
                }
              },
            ]
          },



//2018_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2018/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 103.44,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "LAC",points: 3.34},
                    {name: "James White",position: "RB",nflTeam: "NE",points: 13.40},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 9.80},
                    {name: "Robert Woods",position: "WR",nflTeam: "LA",points: 28.40},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "KC",points: 13.10},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 14.40},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 9.00},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 6.00},
                    {name: "Los Angeles Chargers",position: "DEF",nflTeam: "LAC",points: 6.00}
                  ],
                  bench: [
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 0.00},
                    {name: "Alex Smith",position: "QB",nflTeam: "WAS",points: 0.00},
                    {name: "Sterling Shepard",position: "WR",nflTeam: "NYG",points: 17.00},
                    {name: "Josh Doctson",position: "WR",nflTeam: "WAS",points: 6.00},
                    {name: "Jalen Richard",position: "RB",nflTeam: "LV",points: 15.10},
                    {name: "Brett Maher",position: "K",nflTeam: "DAL",points: 11.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 134.34,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Nick Mullens",position: "QB",nflTeam: "SF",points: 7.64},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 5.10},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 29.80},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 44.50},
                    {name: "Kenny Golladay",position: "WR",nflTeam: "DET",points: 11.80},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 10.40},
                    {name: "Dante Pettis",position: "WR",nflTeam: "SF",points: 5.10},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 6.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 14.00}
                  ],
                  bench: [
                    {name: "Tyrell Williams",position: "WR",nflTeam: "LAC",points: 2.20},
                    {name: "Carson Wentz",position: "QB",nflTeam: "PHI",points: 0.00},
                    {name: "Austin Hooper",position: "TE",nflTeam: "ATL",points: 5.60},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "Jason Sanders",position: "K",nflTeam: "MIA",points: 1.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 7.00},
                  ]
                }
              },
            ]
          },


//2018_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2018/F1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 129.36,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jared Goff",position: "QB",nflTeam: "LA",points: 23.96},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "GB",points: 5.00},
                    {name: "Nick Chubb",position: "RB",nflTeam: "CLE",points: 4.00},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 20.30},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "LA",points: 23.20},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 4.50},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "LA",points: 24.40},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 8.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LA",points: 16.00}
                  ],
                  bench: [
                    {name: "Spencer Ware",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Brian Hill",position: "RB",nflTeam: "ATL",points: 4.90},
                    {name: "Baker Mayfield",position: "QB",nflTeam: "CLE",points: 21.04},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 14.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 106.16,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Josh Allen",position: "QB",nflTeam: "BUF",points: 40.46},
                    {name: "Elijah McGuire",position: "RB",nflTeam: "NYJ",points: 6.50},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 5.00},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "WAS",points: 1.70},
                    {name: "Kendrick Bourne",position: "WR",nflTeam: "SF",points: 16.90},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 11.20},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 12.40},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 10.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 2.00}
                  ],
                  bench: [
                    {name: "Darren Sproles",position: "RB",nflTeam: "PHI",points: 5.60},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Austin Hooper",position: "TE",nflTeam: "ATL",points: 11.70},
                    {name: "Nick Mullens",position: "QB",nflTeam: "SF",points: 19.08},
                    {name: "Nyheim Hines",position: "RB",nflTeam: "IND",points: 5.90},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 0.00},
                  ]
                }
              },
            ]
          },


//2018_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2018/F3.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 131.90,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 23.10},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 11.60},
                    {name: "Saquon Barkley",position: "RB",nflTeam: "NYG",points: 24.20},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 14.90},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 7.90},
                    {name: "Eric Ebron",position: "TE",nflTeam: "IND",points: 16.00},
                    {name: "Jaylen Samuels",position: "RB",nflTeam: "PIT",points: 11.20},
                    {name: "Greg Zuerlein",position: "K",nflTeam: "LA",points: 14.00},
                    {name: "Jacksonville Jaguars",position: "DEF",nflTeam: "JAX",points: 9.00}
                  ],
                  bench: [
                    {name: "Jordy Nelson",position: "WR",nflTeam: "LV",points: 16.80},
                    {name: "Doug Martin",position: "RB",nflTeam: "LV",points: 9.10},
                    {name: "Peyton Barber",position: "RB",nflTeam: "TB",points: 7.80},
                    {name: "Mitchell Trubisky",position: "QB",nflTeam: "CHI",points: 10.12},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 0.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 24.00},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 144.34,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "LAC",points: 7.04},
                    {name: "James White",position: "RB",nflTeam: "NE",points: 16.90},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 11.70},
                    {name: "Robert Woods",position: "WR",nflTeam: "LA",points: 4.50},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "KC",points: 28.60},
                    {name: "George Kittle",position: "TE",nflTeam: "SF",points: 29.90},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 18.70},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 8.00},
                    {name: "Los Angeles Chargers",position: "DEF",nflTeam: "LAC",points: 19.00}
                  ],
                  bench: [
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 0.00},
                    {name: "Alex Smith",position: "QB",nflTeam: "WAS",points: 0.00},
                    {name: "Sterling Shepard",position: "WR",nflTeam: "NYG",points: 11.60},
                    {name: "Josh Doctson",position: "WR",nflTeam: "WAS",points: 5.30},
                    {name: "Jalen Richard",position: "RB",nflTeam: "LV",points: 3.80},
                    {name: "Brett Maher",position: "K",nflTeam: "DAL",points: 4.00},
                  ]
                }
              },
            ]
          },


//2018_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2018/F5.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 84.24,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Patrick Mahomes",position: "QB",nflTeam: "KC",points: 17.34},
                    {name: "Marlon Mack",position: "RB",nflTeam: "IND",points: 18.80},
                    {name: "Tarik Cohen",position: "RB",nflTeam: "CHI",points: 11.20},
                    {name: "Josh Gordon",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 10.40},
                    {name: "Vance McDonald",position: "TE",nflTeam: "PIT",points: 6.90},
                    {name: "Adam Humphries",position: "WR",nflTeam: "TB",points: 11.60},
                    {name: "Wil Lutz",position: "K",nflTeam: "NO",points: 2.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 6.00}
                  ],
                  bench: [
                    {name: "Frank Gore",position: "RB",nflTeam: "MIA",points: 0.00},
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "ATL",points: 20.40},
                    {name: "Deshaun Watson",position: "QB",nflTeam: "HOU",points: 21.96},
                    {name: "Josh Reynolds",position: "WR",nflTeam: "LA",points: 21.50},
                    {name: "Sony Michel",position: "RB",nflTeam: "NE",points: 5.00},
                    {name: "Detroit Lions",position: "DEF",nflTeam: "DET",points: 15.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 83.82,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 29.32},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 6.30},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 0.00},
                    {name: "Amari Cooper",position: "WR",nflTeam: "DAL",points: 6.10},
                    {name: "Calvin Ridley",position: "WR",nflTeam: "ATL",points: 14.20},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 4.40},
                    {name: "Kenyan Drake",position: "RB",nflTeam: "MIA",points: 14.50},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "SEA",points: 9.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 0.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 18.44},
                    {name: "Nelson Agholor",position: "WR",nflTeam: "PHI",points: 21.00},
                    {name: "Tre'Quan Smith",position: "WR",nflTeam: "NO",points: 12.00},
                    {name: "Dan Bailey",position: "K",nflTeam: "MIN",points: 4.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 1.00},
                  ]
                }
              },
            ]
          },
        ],


//END 2018 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2018_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "First Round",
            bowlArt: "artwork/2018/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 82.64,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 4.74},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 9.30},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 19.80},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "HOU",points: 11.90},
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 3.90},
                    {name: "Trey Burton",position: "TE",nflTeam: "CHI",points: 13.60},
                    {name: "Allen Robinson",position: "WR",nflTeam: "CHI",points: 8.40},
                    {name: "Michael Badgley",position: "K",nflTeam: "LAC",points: 3.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 8.00}
                  ],
                  bench: [
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "Allen Hurns",position: "WR",nflTeam: "DAL",points: 1.90},
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 4.28},
                    {name: "Cameron Meredith",position: "WR",nflTeam: "NO",points: 0.00},
                    {name: "O.J. Howard",position: "TE",nflTeam: "TB",points: 0.00},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 8.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 92.14,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 6.24},
                    {name: "Dion Lewis",position: "RB",nflTeam: "TEN",points: 7.40},
                    {name: "Chris Carson",position: "RB",nflTeam: "SEA",points: 26.80},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 15.20},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 8.00},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "GB",points: 6.20},
                    {name: "Corey Davis",position: "WR",nflTeam: "TEN",points: 6.30},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 14.00},
                    {name: "Oakland Raiders",position: "DEF",nflTeam: "LV",points: 2.00}
                  ],
                  bench: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 15.30},
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 0.00},
                    {name: "John Brown",position: "WR",nflTeam: "BAL",points: 1.90},
                    {name: "Wendell Smallwood",position: "RB",nflTeam: "PHI",points: 19.70},
                    {name: "Ito Smith",position: "RB",nflTeam: "ATL",points: 5.90},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 7.00},
                  ]
                }
              },
            ]
          },

//2018_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2018/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 78.62,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 5.92},
                    {name: "Damien Williams",position: "RB",nflTeam: "KC",points: 30.30},
                    {name: "Jeff Wilson",position: "RB",nflTeam: "SF",points: 2.60},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 0.00},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 9.20},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 15.50},
                    {name: "Dede Westbrook",position: "WR",nflTeam: "JAX",points: 7.10},
                    {name: "Cody Parkey",position: "K",nflTeam: "CHI",points: 6.00},
                    {name: "New York Giants",position: "DEF",nflTeam: "NYG",points: 2.00}
                  ],
                  bench: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 13.10},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 23.70},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "LAC",points: 0.00},
                    {name: "James Conner",position: "RB",nflTeam: "PIT",points: 0.00},
                    {name: "Jaylen Samuels",position: "RB",nflTeam: "PIT",points: 19.20},
                    {name: "Gus Edwards",position: "RB",nflTeam: "BAL",points: 16.40},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 104.88,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 18.98},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 19.10},
                    {name: "Justin Jackson",position: "RB",nflTeam: "LAC",points: 17.50},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 16.10},
                    {name: "D.J. Moore",position: "WR",nflTeam: "CAR",points: 3.40},
                    {name: "Jared Cook",position: "TE",nflTeam: "LV",points: 4.30},
                    {name: "Jordan Howard",position: "RB",nflTeam: "CHI",points: 14.50},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 4.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 7.00}
                  ],
                  bench: [
                    {name: "Michael Crabtree",position: "WR",nflTeam: "BAL",points: 0.00},
                    {name: "Theo Riddick",position: "RB",nflTeam: "DET",points: 7.60},
                    {name: "Jeff Driskel",position: "QB",nflTeam: "CIN",points: 10.40},
                    {name: "David Njoku",position: "TE",nflTeam: "CLE",points: 6.00},
                    {name: "Josh Adams",position: "RB",nflTeam: "PHI",points: 8.80},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 7.00},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2018_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2018/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 116.46,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 5.04},
                    {name: "Lamar Miller",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 13.80},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 12.80},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 20.80},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 33.20},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "CLE",points: 11.82},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 12.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 7.00}
                  ],
                  bench: [
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 2.00},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "KC",points: 0.00},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "NYJ",points: 0.00},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 2.10},
                    {name: "Matt Breida",position: "RB",nflTeam: "SF",points: 3.60},
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 16.06},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 116.82,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 16.64},
                    {name: "Dion Lewis",position: "RB",nflTeam: "TEN",points: 5.50},
                    {name: "Chris Carson",position: "RB",nflTeam: "SEA",points: 23.60},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 16.58},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 20.50},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "GB",points: 6.40},
                    {name: "Corey Davis",position: "WR",nflTeam: "TEN",points: 7.60},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 8.00},
                    {name: "Oakland Raiders",position: "DEF",nflTeam: "LV",points: 12.00}
                  ],
                  bench: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 22.22},
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 0.00},
                    {name: "John Brown",position: "WR",nflTeam: "BAL",points: 4.70},
                    {name: "Wendell Smallwood",position: "RB",nflTeam: "PHI",points: 6.70},
                    {name: "Ito Smith",position: "RB",nflTeam: "ATL",points: 0.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 10.00},
                  ]
                }
              },
            ]
          },

//2018_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2018/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 102.88,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 42.88},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "JAX",points: 16.10},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 0.00},
                    {name: "Golden Tate",position: "WR",nflTeam: "PHI",points: 3.30},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 19.40},
                    {name: "Cameron Brate",position: "TE",nflTeam: "TB",points: 2.80},
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "DET",points: 4.40},
                    {name: "Matt Prater",position: "K",nflTeam: "DET",points: 9.00},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 5.00}
                  ],
                  bench: [
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 0.00},
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 20.36},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "WAS",points: 13.70},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "PHI",points: 11.20},
                    {name: "Royce Freeman",position: "RB",nflTeam: "DEN",points: 2.10},
                    {name: "Kerryon Johnson",position: "RB",nflTeam: "DET",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 100.24,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 28.54},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 13.70},
                    {name: "Josh Adams",position: "RB",nflTeam: "PHI",points: 0.10},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 21.00},
                    {name: "DJ Moore",position: "WR",nflTeam: "CAR",points: 3.90},
                    {name: "Jared Cook",position: "TE",nflTeam: "LV",points: 4.00},
                    {name: "Jordan Howard",position: "RB",nflTeam: "CHI",points: 15.00},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 13.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 1.00}
                  ],
                  bench: [
                    {name: "Michael Crabtree",position: "WR",nflTeam: "BAL",points: 3.00},
                    {name: "Theo Riddick",position: "RB",nflTeam: "DET",points: 4.50},
                    {name: "Jeff Driskel",position: "QB",nflTeam: "CIN",points: 17.42},
                    {name: "David Njoku",position: "TE",nflTeam: "CLE",points: 16.30},
                    {name: "Justin Jackson",position: "RB",nflTeam: "LAC",points: 11.60},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 3.00},
                  ]
                }
              },
            ]
          },

//2018_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2018/F7.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 85.38,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "MIN",points: 9.98},
                    {name: "Dion Lewis",position: "RB",nflTeam: "TEN",points: 5.30},
                    {name: "Chris Carson",position: "RB",nflTeam: "SEA",points: 19.90},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 13.60},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 14.70},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "GB",points: 5.10},
                    {name: "Corey Davis",position: "WR",nflTeam: "TEN",points: 9.80},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 6.00},
                    {name: "Oakland Raiders",position: "DEF",nflTeam: "LV",points: 1.00}
                  ],
                  bench: [
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 0.00},
                    {name: "John Brown",position: "WR",nflTeam: "BAL",points: 1.70},
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 33.48},
                    {name: "Wendell Smallwood",position: "RB",nflTeam: "PHI",points: 11.70},
                    {name: "Ito Smith",position: "RB",nflTeam: "ATL",points: 0.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 23.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 92.46,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 1.04},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "WAS",points: 0.00},
                    {name: "Royce Freeman",position: "RB",nflTeam: "DEN",points: 18.30},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "PHI",points: 16.90},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 26.70},
                    {name: "Cameron Brate",position: "TE",nflTeam: "TB",points: 5.90},
                    {name: "Golden Tate",position: "WR",nflTeam: "PHI",points: 7.30},
                    {name: "Matt Prater",position: "K",nflTeam: "DET",points: 11.32},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 5.00}
                  ],
                  bench: [
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "DET",points: 1.50},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 0.00},
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 18.24},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "JAX",points: 0.00},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 11.80},
                    {name: "Kerryon Johnson",position: "RB",nflTeam: "DET",points: 0.00},
                  ]
                }
              },
            ]
          },

//2018_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2018/F9.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 121.60,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 26.00},
                    {name: "Lamar Miller",position: "RB",nflTeam: "HOU",points: 13.60},
                    {name: "Dalvin Cook",position: "RB",nflTeam: "MIN",points: 10.00},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 28.80},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 8.10},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 5.90},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "CLE",points: 21.20},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 0.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 8.00}
                  ],
                  bench: [
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 3.50},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "KC",points: 0.00},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "NYJ",points: 0.00},
                    {name: "Mike Williams",position: "WR",nflTeam: "LAC",points: 16.40},
                    {name: "Matt Breida",position: "RB",nflTeam: "SF",points: 0.00},
                    {name: "Lamar Jackson",position: "QB",nflTeam: "BAL",points: 26.16},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 108.88,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 7.88},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 11.80},
                    {name: "Josh Adams",position: "RB",nflTeam: "PHI",points: 11.30},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 28.60},
                    {name: "DJ Moore",position: "WR",nflTeam: "CAR",points: 12.10},
                    {name: "Jared Cook",position: "TE",nflTeam: "LV",points: 5.80},
                    {name: "Jordan Howard",position: "RB",nflTeam: "CHI",points: 24.40},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 5.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 2.00}
                  ],
                  bench: [
                    {name: "Michael Crabtree",position: "WR",nflTeam: "BAL",points: 4.00},
                    {name: "Theo Riddick",position: "RB",nflTeam: "DET",points: 2.40},
                    {name: "Jeff Driskel",position: "QB",nflTeam: "CIN",points: 5.10},
                    {name: "David Njoku",position: "TE",nflTeam: "CLE",points: 9.20},
                    {name: "Justin Jackson",position: "RB",nflTeam: "LAC",points: 1.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 8.00},
                  ]
                }
              },
            ]
          },


//2018_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "",
            bowlArt: "artwork/2018/F11.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 76.50,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 30.10},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 12.40},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 0.00},
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 6.70},
                    {name: "Allen Robinson",position: "WR",nflTeam: "CHI",points: 0.00},
                    {name: "Trey Burton",position: "TE",nflTeam: "CHI",points: 8.30},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "HOU",points: 0.00},
                    {name: "Michael Badgley",position: "K",nflTeam: "LAC",points: 3.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 16.00}
                  ],
                  bench: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 0.00},
                    {name: "Allen Hurns",position: "WR",nflTeam: "DAL",points: 5.90},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 3.40},
                    {name: "Cameron Meredith",position: "WR",nflTeam: "NO",points: 0.00},
                    {name: "O.J. Howard",position: "TE",nflTeam: "TB",points: 0.00},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 14.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 84.98,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 13.78},
                    {name: "Damien Williams",position: "RB",nflTeam: "KC",points: 12.90},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "LAC",points: 9.60},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 4.70},
                    {name: "Courtland Sutton",position: "WR",nflTeam: "DEN",points: 3.50},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 21.10},
                    {name: "Robby Anderson",position: "WR",nflTeam: "NYJ",points: 5.40},
                    {name: "Cody Parkey",position: "K",nflTeam: "CHI",points: 4.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 10.00}
                  ],
                  bench: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 0.00},
                    {name: "Dede Westbrook",position: "WR",nflTeam: "JAX",points: 2.00},
                    {name: "James Conner",position: "RB",nflTeam: "PIT",points: 12.40},
                    {name: "Chris Godwin",position: "WR",nflTeam: "TB",points: 29.40},
                    {name: "Jeff Wilson",position: "RB",nflTeam: "SF",points: 0.90},
                    {name: "Gus Edwards",position: "RB",nflTeam: "BAL",points: 7.60},
                  ]
                }
              },
            ]
          },
        ],
//END 2018 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2018!!!!!!!!!!!!!!!!!!!!!!!!!!END2018!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2018!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2018






//START YEAR 2017  COMPLETE

    2017: {
      format: "current",
      teams: {
        p1: {name: "The Brown Note",owner: "Brycen",art: "artwork/2017/p1.png"},
        p2: {name: "Vick's Dogs",owner: "Will",art: "artwork/2017/p2.png"},
        p3: {name: "Dea Paak",owner: "James",art: "artwork/2017/p3.png"},
        p4: {name: "kkk",owner: "Keith",art: "artwork/2017/p4.png"},
        p5: {name: "Dirty Matt and The Birds",owner: "Bailey",art: "artwork/2017/p5.png"},
        p6: {name: "Maximum Brutality",owner: "Mike",art: "artwork/2017/p6.png"},
        c1: {name: "Le'veon Smells",owner: "Matt",art: "artwork/2017/c1.png"},
        c2: {name: "Dak and Milds",owner: "Jordan",art: "artwork/2017/c2.png"},
        c3: {name: "Joseph Smith",owner: "Ethan",art: "artwork/2017/c3.png"},
        c4: {name: "Hate",owner: "Chris",art: "artwork/2017/c4.png"},
        c5: {name: "Golden Taint",owner: "Harrison",art: "artwork/2017/c5.png"},
        c6: {name: "Scam Newton",owner: "David",art: "artwork/2017/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2017_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2017/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 93.16,
      touchdowns: null,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 25.76},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 10.30},
                    {name: "Javorius Allen",position: "RB",nflTeam: "BAL",points: 7.40},
                    {name: "Marquise Goodwin",position: "WR",nflTeam: "SF",points: 12.40},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "WAS",points: 11.50},
                    {name: "Delanie Walker",position: "TE",nflTeam: "TEN",points: 7.70},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 4.10},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 14.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 0.00}
                  ],
                  bench: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 15.72},
                    {name: "James White",position: "RB",nflTeam: "NE",points: 0.80},
                    {name: "Devin Funchess",position: "WR",nflTeam: "CAR",points: 1.90},
                    {name: "Kenyan Drake",position: "RB",nflTeam: "MIA",points: 17.30},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 0.00},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 100.98,
      touchdowns: null,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 15.38},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 2.80},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "KC",points: 32.60},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 5.40},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 9.70},
                    {name: "Austin Hooper",position: "TE",nflTeam: "ATL",points: 1.20},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "LV",points: 15.90},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 8.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 10.00}
                  ],
                  bench: [
                    {name: "Adrian Peterson",position: "RB",nflTeam: "ARI",points: 0.00},
                    {name: "Nick Foles",position: "QB",nflTeam: "PHI",points: 25.48},
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "ATL",points: 2.60},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 0.00},
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 13.68},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 10.10},
                  ]
                }
    },
  ]
},



//2017_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2017/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 97.64,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 17.14},
                    {name: "Jerick McKinnon",position: "RB",nflTeam: "MIN",points: 13.80},
                    {name: "Alex Collins",position: "RB",nflTeam: "BAL",points: 5.20},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 5.40},
                    {name: "Robert Woods",position: "WR",nflTeam: "LA",points: 10.50},
                    {name: "Jack Doyle",position: "TE",nflTeam: "IND",points: 4.70},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 13.90},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 7.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 20.00}
                  ],
                  bench: [
                    {name: "Antonio Gates",position: "TE",nflTeam: "LAC",points: 7.00},
                    {name: "Jared Goff",position: "QB",nflTeam: "LA",points: 10.80},
                    {name: "Will Fuller",position: "WR",nflTeam: "HOU",points: 4.40},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "JAX",points: 0.00},
                    {name: "Patrick Murray",position: "K",nflTeam: "TB",points: 3.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: -3.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 114.26,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tyrod Taylor",position: "QB",nflTeam: "BUF",points: 23.16},
                    {name: "Kerwynn Williams",position: "RB",nflTeam: "ARI",points: 6.10},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 42.00},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 3.00},
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 3.00},
                    {name: "Eric Ebron",position: "TE",nflTeam: "DET",points: 9.30},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 11.70},
                    {name: "Greg Zuerlein",position: "K",nflTeam: "LA",points: 10.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 6.00}
                  ],
                  bench: [
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 7.70},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 6.00},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 0.80},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 10.30},
                    {name: "DeAndre Washington",position: "RB",nflTeam: "LV",points: 1.90},
                    {name: "Tennessee Titans",position: "DEF",nflTeam: "TEN",points: 3.00},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2017_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2017/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 92.28,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Blake Bortles",position: "QB",nflTeam: "JAX",points: 22.38},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 12.60},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "GB",points: 5.80},
                    {name: "Robby Anderson",position: "WR",nflTeam: "NYJ",points: 5.10},
                    {name: "Keelan Cole",position: "WR",nflTeam: "JAX",points: 10.80},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 8.10},
                    {name: "Lamar Miller",position: "RB",nflTeam: "HOU",points: 6.50},
                    {name: "Ryan Succop",position: "K",nflTeam: "TEN",points: 11.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 10.00}
                  ],
                  bench: [
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "PHI",points: 1.50},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Alfred Morris",position: "RB",nflTeam: "DAL",points: 0.00},
                    {name: "Rex Burkhead",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Amari Cooper",position: "WR",nflTeam: "LV",points: 12.60},
                    {name: "Ricky Seals-Jones",position: "TE",nflTeam: "ARI",points: 0.00},
                  ]
                }
              },
              {
                teamId: "p5",
                seed: 5,
                score: 96.02,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 14.22},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 11.80},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "KC",points: 16.60},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 14.90},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 12.30},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 1.20},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "LV",points: 0.00},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 7.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 18.00}
                  ],
                  bench: [
                    {name: "Nick Foles",position: "QB",nflTeam: "PHI",points: 8.52},
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "ATL",points: 3.10},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 11.20},
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 5.34},
                    {name: "Austin Hooper",position: "TE",nflTeam: "ATL",points: 1.80},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 3.10},
                  ]
                }
              },
            ]
          },



//2017_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2017/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 104.26,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 17.46},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "TEN",points: 11.90},
                    {name: "Bilal Powell",position: "RB",nflTeam: "NYJ",points: 20.50},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 12.50},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 6.60},
                    {name: "Jared Cook",position: "TE",nflTeam: "LV",points: 1.50},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "KC",points: 10.80},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 10.00},
                    {name: "Los Angeles Chargers",position: "DEF",nflTeam: "LAC",points: 13.00}
                  ],
                  bench: [
                    {name: "Chris Hogan",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Kirk Cousins",position: "QB",nflTeam: "WAS",points: 22.76},
                    {name: "Austin Seferian-Jenkins",position: "TE",nflTeam: "NYJ",points: 2.10},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "CLE",points: 4.30},
                    {name: "Graham Gano",position: "K",nflTeam: "CAR",points: 10.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 92.84,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tyrod Taylor",position: "QB",nflTeam: "BUF",points: 12.84},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 39.60},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 3.20},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 8.10},
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 2.40},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 0.60},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 10.10},
                    {name: "Nick Rose",position: "K",nflTeam: "LAC",points: 2.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 14.00}
                  ],
                  bench: [
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 18.74},
                    {name: "Kerwynn Williams",position: "RB",nflTeam: "ARI",points: 6.50},
                    {name: "Eric Ebron",position: "TE",nflTeam: "DET",points: 14.30},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Greg Zuerlein",position: "K",nflTeam: "LA",points: 0.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 13.00},
                  ]
                }
              },
            ]
          },


//2017_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2017/F1.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 114.18,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 18.08},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 14.10},
                    {name: "Derrick Henry",position: "RB",nflTeam: "TEN",points: 17.70},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 8.00},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 11.70},
                    {name: "Austin Hooper",position: "TE",nflTeam: "ATL",points: 3.50},
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "ATL",points: 7.10},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 18.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 16.00}
                  ],
                  bench: [
                    {name: "Michael Crabtree",position: "WR",nflTeam: "LV",points: 1.70},
                    {name: "Nick Foles",position: "QB",nflTeam: "PHI",points: -0.44},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 3.70},
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 12.76},
                    {name: "Evan Engram",position: "TE",nflTeam: "NYG",points: 0.00},
                    {name: "Kareem Hunt",position: "RB",nflTeam: "KC",points: 9.50},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 45.72,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "WAS",points: 7.52},
                    {name: "Bilal Powell",position: "RB",nflTeam: "NYJ",points: 5.60},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "CLE",points: 2.10},
                    {name: "Kelvin Benjamin",position: "WR",nflTeam: "BUF",points: 2.70},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 9.40},
                    {name: "Jared Cook",position: "TE",nflTeam: "LV",points: 3.50},
                    {name: "Dede Westbrook",position: "WR",nflTeam: "JAX",points: 0.90},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 4.00},
                    {name: "Los Angeles Chargers",position: "DEF",nflTeam: "LAC",points: 10.00}
                  ],
                  bench: [
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 0.00},
                    {name: "Chris Hogan",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 0.00},
                    {name: "Austin Seferian-Jenkins",position: "TE",nflTeam: "NYJ",points: 0.00},
                    {name: "Wayne Gallman",position: "RB",nflTeam: "NYG",points: 8.90},
                    {name: "Graham Gano",position: "K",nflTeam: "CAR",points: 4.00},
                  ]
                }
              },
            ]
          },


//2017_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2017/F3.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 49.62,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Blake Bortles",position: "QB",nflTeam: "JAX",points: 3.22},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 5.40},
                    {name: "Jamaal Williams",position: "RB",nflTeam: "GB",points: 11.30},
                    {name: "Robby Anderson",position: "WR",nflTeam: "NYJ",points: 0.30},
                    {name: "Keelan Cole",position: "WR",nflTeam: "JAX",points: 1.30},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 2.40},
                    {name: "Lamar Miller",position: "RB",nflTeam: "HOU",points: 3.70},
                    {name: "Ryan Succop",position: "K",nflTeam: "TEN",points: 9.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 13.00}
                  ],
                  bench: [
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "PHI",points: 4.80},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Alfred Morris",position: "RB",nflTeam: "DAL",points: 0.10},
                    {name: "Rex Burkhead",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Amari Cooper",position: "WR",nflTeam: "LV",points: 17.50},
                    {name: "Ricky Seals-Jones",position: "TE",nflTeam: "ARI",points: 0.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 73.06,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tyrod Taylor",position: "QB",nflTeam: "BUF",points: 15.66},
                    {name: "Kerwynn Williams",position: "RB",nflTeam: "ARI",points: 8.10},
                    {name: "Joe Mixon",position: "RB",nflTeam: "CIN",points: 7.70},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 1.70},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 5.50},
                    {name: "Eric Ebron",position: "TE",nflTeam: "DET",points: 0.90},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 13.50},
                    {name: "Nick Rose",position: "K",nflTeam: "LAC",points: 6.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 14.00}
                  ],
                  bench: [
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 0.30},
                    {name: "Adam Thielen",position: "WR",nflTeam: "MIN",points: 6.10},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 0.00},
                    {name: "Greg Zuerlein",position: "K",nflTeam: "LA",points: 0.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 8.00},
                  ]
                }
              },
            ]
          },


//2017_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2017/F5.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 79.32,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 23.72},
                    {name: "Javorius Allen",position: "RB",nflTeam: "BAL",points: 3.70},
                    {name: "Kenyan Drake",position: "RB",nflTeam: "MIA",points: 9.00},
                    {name: "Marquise Goodwin",position: "WR",nflTeam: "SF",points: 9.80},
                    {name: "Devin Funchess",position: "WR",nflTeam: "CAR",points: 10.80},
                    {name: "Delanie Walker",position: "TE",nflTeam: "TEN",points: 1.90},
                    {name: "Jamison Crowder",position: "WR",nflTeam: "WAS",points: 2.40},
                    {name: "Harrison Butker",position: "K",nflTeam: "KC",points: 9.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 9.00}
                  ],
                  bench: [
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 1.40},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 7.00},
                    {name: "James White",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Marcus Mariota",position: "QB",nflTeam: "TEN",points: 13.36},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: -2.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 94.80,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 14.00},
                    {name: "Alex Collins",position: "RB",nflTeam: "BAL",points: 15.60},
                    {name: "Leonard Fournette",position: "RB",nflTeam: "JAX",points: 13.60},
                    {name: "Keenan Allen",position: "WR",nflTeam: "LAC",points: 25.30},
                    {name: "Robert Woods",position: "WR",nflTeam: "LA",points: 0.00},
                    {name: "Jack Doyle",position: "TE",nflTeam: "IND",points: 9.80},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 7.50},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 6.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 3.00}
                  ],
                  bench: [
                    {name: "Antonio Gates",position: "TE",nflTeam: "LAC",points: 4.60},
                    {name: "Jerick McKinnon",position: "RB",nflTeam: "MIN",points: 4.40},
                    {name: "Jared Goff",position: "QB",nflTeam: "LA",points: 0.00},
                    {name: "Will Fuller",position: "WR",nflTeam: "HOU",points: 1.70},
                    {name: "Patrick Murray",position: "K",nflTeam: "TB",points: 5.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 2.00},
                  ]
                }
              },
            ]
          },
        ],


//END 2017 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2017_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "First Round",
            bowlArt: "artwork/2017/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 76.48,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 11.58},
                    {name: "Latavius Murray",position: "RB",nflTeam: "MIN",points: 16.40},
                    {name: "Jordan Howard",position: "RB",nflTeam: "CHI",points: 6.30},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 0.60},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 9.90},
                    {name: "Cameron Brate",position: "TE",nflTeam: "TB",points: 4.90},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "DEN",points: 15.80},
                    {name: "Stephen Hauschka",position: "K",nflTeam: "BUF",points: 6.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 5.00}
                  ],
                  bench: [
                    {name: "Benjamin Watson",position: "TE",nflTeam: "BAL",points: 13.40},
                    {name: "Mike Gillislee",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Theo Riddick",position: "RB",nflTeam: "DET",points: 4.10},
                    {name: "J.J. Nelson",position: "WR",nflTeam: "ARI",points: 5.30},
                    {name: "Jacoby Brissett",position: "QB",nflTeam: "IND",points: 14.12},
                    {name: "Sterling Shepard",position: "WR",nflTeam: "NYG",points: 19.90},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 88.38,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 17.38},
                    {name: "Frank Gore",position: "RB",nflTeam: "IND",points: 6.80},
                    {name: "Jay Ajayi",position: "RB",nflTeam: "PHI",points: 8.90},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "PHI",points: 10.90},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 11.40},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 4.60},
                    {name: "Rod Smith",position: "RB",nflTeam: "DAL",points: 9.40},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 9.00},
                    {name: "Jacksonville Jaguars",position: "DEF",nflTeam: "JAX",points: 10.00}
                  ],
                  bench: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 0.52},
                    {name: "Ted Ginn",position: "WR",nflTeam: "NO",points: 0.00},
                    {name: "Orleans Darkwa",position: "RB",nflTeam: "NYG",points: 7.60},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: -0.10},
                    {name: "Matt Prater",position: "K",nflTeam: "DET",points: 8.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 14.00},
                  ]
                }
              },
            ]
          },

//2017_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2017/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 100.54,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 18.24},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 21.60},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 19.60},
                    {name: "Josh Gordon",position: "WR",nflTeam: "CLE",points: 4.70},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "NE",points: 12.00},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "SEA",points: -0.10},
                    {name: "Rishard Matthews",position: "WR",nflTeam: "TEN",points: 15.50},
                    {name: "Wil Lutz",position: "K",nflTeam: "NO",points: 7.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 2.00}
                  ],
                  bench: [
                    {name: "Danny Amendola",position: "WR",nflTeam: "NE",points: 2.30},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 17.54},
                    {name: "Ameer Abdullah",position: "RB",nflTeam: "DET",points: 2.10},
                    {name: "Tyrell Williams",position: "WR",nflTeam: "LAC",points: 3.10},
                    {name: "Corey Coleman",position: "WR",nflTeam: "CLE",points: 1.60},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 11.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 82.48,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 31.48},
                    {name: "Carlos Hyde",position: "RB",nflTeam: "SF",points: 3.90},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "LAC",points: 22.90},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 6.90},
                    {name: "Paul Richardson",position: "WR",nflTeam: "SEA",points: 1.80},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 4.70},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 6.80},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 1.00},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 3.00}
                  ],
                  bench: [
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 3.60},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 2.80},
                    {name: "Philip Rivers",position: "QB",nflTeam: "LAC",points: 7.08},
                    {name: "Jordan Reed",position: "TE",nflTeam: "WAS",points: 0.00},
                    {name: "Thomas Rawls",position: "RB",nflTeam: "SEA",points: 0.00},
                    {name: "Paul Perkins",position: "RB",nflTeam: "NYG",points: 0.00},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2017_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2017/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 97.66,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 15.56},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "PIT",points: 15.70},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 9.00},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 1.40},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "LA",points: 9.00},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 12.70},
                    {name: "Dion Lewis",position: "RB",nflTeam: "NE",points: 27.30},
                    {name: "Giorgio Tavecchio",position: "K",nflTeam: "LV",points: 4.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 3.00}
                  ],
                  bench: [
                    {name: "DeSean Jackson",position: "WR",nflTeam: "TB",points: 0.00},
                    {name: "Kenny Stills",position: "WR",nflTeam: "MIA",points: 3.40},
                    {name: "Marqise Lee",position: "WR",nflTeam: "JAX",points: 0.00},
                    {name: "Damien Williams",position: "RB",nflTeam: "MIA",points: 0.00},
                    {name: "Nelson Agholor",position: "WR",nflTeam: "PHI",points: 3.50},
                    {name: "Peyton Barber",position: "RB",nflTeam: "TB",points: 5.50},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 85.92,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 10.82},
                    {name: "Frank Gore",position: "RB",nflTeam: "IND",points: 14.60},
                    {name: "Jay Ajayi",position: "RB",nflTeam: "PHI",points: 11.30},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "PHI",points: 0.00},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 13.50},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 10.70},
                    {name: "Ted Ginn",position: "WR",nflTeam: "NO",points: 15.00},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 11.00},
                    {name: "Jacksonville Jaguars",position: "DEF",nflTeam: "JAX",points: -1.00}
                  ],
                  bench: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 11.42},
                    {name: "Orleans Darkwa",position: "RB",nflTeam: "NYG",points: 1.00},
                    {name: "Rod Smith",position: "RB",nflTeam: "DAL",points: 3.30},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 0.00},
                    {name: "Matt Prater",position: "K",nflTeam: "DET",points: 5.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 8.00},
                  ]
                }
              },
            ]
          },

//2017_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2017/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 57.56,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Case Keenum",position: "QB",nflTeam: "MIN",points: 9.36},
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "LV",points: 7.20},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 3.60},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 2.30},
                    {name: "Marvin Jones",position: "WR",nflTeam: "DET",points: 5.00},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 2.70},
                    {name: "Samaje Perine",position: "RB",nflTeam: "WAS",points: 5.40},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 7.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 15.00}
                  ],
                  bench: [
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 0.70},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAX",points: 0.00},
                    {name: "Hunter Henry",position: "TE",nflTeam: "LAC",points: 0.00},
                    {name: "Josh Doctson",position: "WR",nflTeam: "WAS",points: 12.10},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LA",points: 12.50},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LA",points: 4.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 84.94,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 16.94},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 14.70},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 5.80},
                    {name: "Josh Gordon",position: "WR",nflTeam: "CLE",points: 1.90},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "NE",points: 2.50},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "SEA",points: 6.30},
                    {name: "Rishard Matthews",position: "WR",nflTeam: "TEN",points: 4.80},
                    {name: "Wil Lutz",position: "K",nflTeam: "NO",points: 11.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 21.00}
                  ],
                  bench: [
                    {name: "Danny Amendola",position: "WR",nflTeam: "NE",points: 2.80},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 5.90},
                    {name: "Tyrell Williams",position: "WR",nflTeam: "LAC",points: 5.00},
                    {name: "Corey Coleman",position: "WR",nflTeam: "CLE",points: 0.30},
                    {name: "Tarik Cohen",position: "RB",nflTeam: "CHI",points: 2.10},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 19.00},
                  ]
                }
              },
            ]
          },

//2017_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2017/F7.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 97.50,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 15.60},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "PIT",points: 0.00},
                    {name: "Alvin Kamara",position: "RB",nflTeam: "NO",points: 18.80},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 18.40},
                    {name: "Kenny Stills",position: "WR",nflTeam: "MIA",points: 3.40},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 0.00},
                    {name: "Dion Lewis",position: "RB",nflTeam: "NE",points: 25.30},
                    {name: "Giorgio Tavecchio",position: "K",nflTeam: "LV",points: 4.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 12.00}
                  ],
                  bench: [
                    {name: "DeSean Jackson",position: "WR",nflTeam: "TB",points: 0.00},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "LA",points: 0.00},
                    {name: "Marqise Lee",position: "WR",nflTeam: "JAX",points: 0.00},
                    {name: "Damien Williams",position: "RB",nflTeam: "MIA",points: 0.00},
                    {name: "Nelson Agholor",position: "WR",nflTeam: "PHI",points: 1.80},
                    {name: "Peyton Barber",position: "RB",nflTeam: "TB",points: 14.90},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 56.40,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 0.00},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 3.20},
                    {name: "Christian McCaffrey",position: "RB",nflTeam: "CAR",points: 5.40},
                    {name: "Josh Gordon",position: "WR",nflTeam: "CLE",points: 11.50},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "NE",points: 14.70},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "SEA",points: 4.50},
                    {name: "Rishard Matthews",position: "WR",nflTeam: "TEN",points: 0.70},
                    {name: "Wil Lutz",position: "K",nflTeam: "NO",points: 6.40},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 10.00}
                  ],
                  bench: [
                    {name: "Joe Flacco",position: "QB",nflTeam: "BAL",points: 14.12},
                    {name: "Danny Amendola",position: "WR",nflTeam: "NE",points: 4.30},
                    {name: "Martavis Bryant",position: "WR",nflTeam: "PIT",points: 6.50},
                    {name: "Mike Davis",position: "RB",nflTeam: "SEA",points: 6.40},
                    {name: "Matt Breida",position: "RB",nflTeam: "SF",points: 10.40},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 1.00},
                  ]
                }
              },
            ]
          },

//2017_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2017/F9.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 85.82,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 27.12},
                    {name: "Frank Gore",position: "RB",nflTeam: "IND",points: 11.10},
                    {name: "Jay Ajayi",position: "RB",nflTeam: "PHI",points: 0.00},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "PHI",points: 0.80},
                    {name: "JuJu Smith-Schuster",position: "WR",nflTeam: "PIT",points: 20.30},
                    {name: "Vernon Davis",position: "TE",nflTeam: "WAS",points: 2.00},
                    {name: "Ted Ginn",position: "WR",nflTeam: "NO",points: 3.50},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 9.00},
                    {name: "Jacksonville Jaguars",position: "DEF",nflTeam: "JAX",points: 12.00}
                  ],
                  bench: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 20.68},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 0.00},
                    {name: "Orleans Darkwa",position: "RB",nflTeam: "NYG",points: 21.40},
                    {name: "Austin Ekeler",position: "RB",nflTeam: "LAC",points: 0.00},
                    {name: "Matt Prater",position: "K",nflTeam: "DET",points: 9.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 18.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 65.06,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Case Keenum",position: "QB",nflTeam: "MIN",points: 11.56},
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "LV",points: 11.90},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 16.80},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 2.40},
                    {name: "Marvin Jones",position: "WR",nflTeam: "DET",points: 14.10},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 1.00},
                    {name: "Samaje Perine",position: "RB",nflTeam: "WAS",points: 0.30},
                    {name: "Jake Elliott",position: "K",nflTeam: "PHI",points: 0.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 7.00}
                  ],
                  bench: [
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: -0.30},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAX",points: 3.80},
                    {name: "Hunter Henry",position: "TE",nflTeam: "LAC",points: 0.00},
                    {name: "Josh Doctson",position: "WR",nflTeam: "WAS",points: 3.70},
                    {name: "Cooper Kupp",position: "WR",nflTeam: "LA",points: 0.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LA",points: 5.00},
                  ]
                }
              },
            ]
          },


//2017_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "",
            bowlArt: "artwork/2017/F11.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 115.64,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 20.44},
                    {name: "Latavius Murray",position: "RB",nflTeam: "MIN",points: 23.40},
                    {name: "Jordan Howard",position: "RB",nflTeam: "CHI",points: 1.40},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 21.00},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 15.20},
                    {name: "Benjamin Watson",position: "TE",nflTeam: "BAL",points: 6.10},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "DEN",points: 6.10},
                    {name: "Stephen Hauschka",position: "K",nflTeam: "BUF",points: 10.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 12.00}
                  ],
                  bench: [
                    {name: "Mike Gillislee",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Theo Riddick",position: "RB",nflTeam: "DET",points: 2.20},
                    {name: "Cameron Brate",position: "TE",nflTeam: "TB",points: 3.70},
                    {name: "J.J. Nelson",position: "WR",nflTeam: "ARI",points: 1.80},
                    {name: "Jacoby Brissett",position: "QB",nflTeam: "IND",points: 10.36},
                    {name: "Sterling Shepard",position: "WR",nflTeam: "NYG",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 74.70,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 11.10},
                    {name: "Carlos Hyde",position: "RB",nflTeam: "SF",points: 19.80},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "LAC",points: 12.40},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 11.70},
                    {name: "Paul Richardson",position: "WR",nflTeam: "SEA",points: 0.00},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 1.70},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 0.00},
                    {name: "Ka'imi Fairbairn",position: "K",nflTeam: "HOU",points: 9.00},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 9.00}
                  ],
                  bench: [
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Philip Rivers",position: "QB",nflTeam: "LAC",points: 27.98},
                    {name: "Jordan Reed",position: "TE",nflTeam: "WAS",points: 0.00},
                    {name: "Thomas Rawls",position: "RB",nflTeam: "SEA",points: 2.80},
                    {name: "Paul Perkins",position: "RB",nflTeam: "NYG",points: 1.80},
                  ]
                }
              },
            ]
          },
        ],
//END 2017 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2017!!!!!!!!!!!!!!!!!!!!!!!!!!END2017!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2017!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2017






//START YEAR 2016  COMPLETE

    2016: {
      format: "current",
      teams: {
        p1: {name: "Marshawn's Lynching Party",owner: "Harrison",art: "artwork/2016/p1.png"},
        p2: {name: "Deez Nuts",owner: "Jordan",art: "artwork/2016/p2.png"},
        p3: {name: "The Clit Commanders",owner: "Brycen",art: "artwork/2016/p3.png"},
        p4: {name: "Dirty birds",owner: "Preston",art: "artwork/2016/p4.png"},
        p5: {name: "Vick's Dogs",owner: "Will",art: "artwork/2016/p5.png"},
        p6: {name: "Natty Ice",owner: "David",art: "artwork/2016/p6.png"},
        c1: {name: "Ronalbro's",owner: "Bailey",art: "artwork/2016/c1.png"},
        c2: {name: "Tom deflated my balls",owner: "Sam",art: "artwork/2016/c2.png"},
        c3: {name: "kkk",owner: "Keith",art: "artwork/2016/c3.png"},
        c4: {name: "I love anal 69 in my butt",owner: "Mike",art: "artwork/2016/c4.png"},
        c5: {name: "Mattyice8",owner: "Matt",art: "artwork/2016/c5.png"},
        c6: {name: "Hate",owner: "Chris",art: "artwork/2016/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2016_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2016/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 105.22,
      touchdowns: null,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Carson Palmer",position: "QB",nflTeam: "ARI",points: 20.72},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "TEN",points: 14.10},
                    {name: "Carlos Hyde",position: "RB",nflTeam: "SF",points: 5.70},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 4.50},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 2.50},
                    {name: "Ladarius Green",position: "TE",nflTeam: "PIT",points: 7.20},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 31.50},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 11.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 8.00}
                  ],
                  bench: [
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 9.70},
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 29.36},
                    {name: "Thomas Rawls",position: "RB",nflTeam: "SEA",points: 3.90},
                    {name: "Malcolm Mitchell",position: "WR",nflTeam: "NE",points: 1.40},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 11.20},
                    {name: "Kenneth Farrow",position: "RB",nflTeam: "LAC",points: 3.30},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 54.50,
      touchdowns: null,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 18.80},
                    {name: "Jeremy Hill",position: "RB",nflTeam: "CIN",points: 11.10},
                    {name: "Jerick McKinnon",position: "RB",nflTeam: "MIN",points: 7.10},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 0.00},
                    {name: "Amari Cooper",position: "WR",nflTeam: "LV",points: 2.80},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "SEA",points: 3.10},
                    {name: "Willie Snead",position: "WR",nflTeam: "NO",points: 7.60},
                    {name: "Chandler Catanzaro",position: "K",nflTeam: "ARI",points: 5.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: -1.00}
                  ],
                  bench: [
                    {name: "Joe Flacco",position: "QB",nflTeam: "BAL",points: 12.14},
                    {name: "Gary Barnidge",position: "TE",nflTeam: "CLE",points: 3.50},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 7.50},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 9.20},
                    {name: "Mike Wallace",position: "WR",nflTeam: "BAL",points: 6.00},
                    {name: "Charles Sims",position: "RB",nflTeam: "TB",points: 1.90},
                  ]
                }
    },
  ]
},



//2016_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2016/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 98.06,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tyrod Taylor",position: "QB",nflTeam: "BUF",points: 15.86},
                    {name: "Spencer Ware",position: "RB",nflTeam: "KC",points: 9.40},
                    {name: "Ty Montgomery",position: "RB",nflTeam: "GB",points: 28.30},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 12.20},
                    {name: "Steve Smith",position: "WR",nflTeam: "BAL",points: 10.00},
                    {name: "Dwayne Allen",position: "TE",nflTeam: "IND",points: 1.30},
                    {name: "Kelvin Benjamin",position: "WR",nflTeam: "CAR",points: 2.00},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 10.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 9.00}
                  ],
                  bench: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 14.94},
                    {name: "Cole Beasley",position: "WR",nflTeam: "DAL",points: 4.80},
                    {name: "Eric Ebron",position: "TE",nflTeam: "DET",points: 3.60},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 16.80},
                    {name: "Donte Moncrief",position: "WR",nflTeam: "IND",points: 0.00},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "LAC",points: 0.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 62.72,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 7.42},
                    {name: "Matt Forte",position: "RB",nflTeam: "NYJ",points: 2.80},
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "NE",points: 9.10},
                    {name: "DeSean Jackson",position: "WR",nflTeam: "WAS",points: 11.10},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 3.70},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 4.10},
                    {name: "Frank Gore",position: "RB",nflTeam: "IND",points: 11.50},
                    {name: "Matt Prater",position: "K",nflTeam: "DET",points: 6.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 7.00}
                  ],
                  bench: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 19.34},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "LV",points: 12.00},
                    {name: "Eric Decker",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "MIN",points: 0.30},
                    {name: "Alfred Morris",position: "RB",nflTeam: "DAL",points: 0.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 5.00},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2016_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2016/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 125.38,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 37.18},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "PIT",points: 25.70},
                    {name: "Latavius Murray",position: "RB",nflTeam: "LV",points: 5.10},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 6.00},
                    {name: "Amari Cooper",position: "WR",nflTeam: "LV",points: 7.60},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 5.90},
                    {name: "Jay Ajayi",position: "RB",nflTeam: "MIA",points: 26.90},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "LV",points: 3.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LA",points: 8.00}
                  ],
                  bench: [
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "Delanie Walker",position: "TE",nflTeam: "TEN",points: 8.30},
                    {name: "Ted Ginn",position: "WR",nflTeam: "CAR",points: 2.90},
                    {name: "Chris Thompson",position: "RB",nflTeam: "WAS",points: 15.70},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "KC",points: 15.50},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 8.00},
                  ]
                }
              },
              {
                teamId: "p4",
                seed: 4,
                score: 91.66,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 16.06},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "TEN",points: 6.00},
                    {name: "Carlos Hyde",position: "RB",nflTeam: "SF",points: 10.20},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 12.50},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 9.80},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 5.30},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 8.80},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 13.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 10.00}
                  ],
                  bench: [
                    {name: "Carson Palmer",position: "QB",nflTeam: "ARI",points: 15.26},
                    {name: "Ladarius Green",position: "TE",nflTeam: "PIT",points: 0.00},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 10.40},
                    {name: "Thomas Rawls",position: "RB",nflTeam: "SEA",points: 0.80},
                    {name: "Malcolm Mitchell",position: "WR",nflTeam: "NE",points: 2.90},
                    {name: "Kenneth Farrow",position: "RB",nflTeam: "LAC",points: 5.70},
                  ]
                }
              },
            ]
          },



//2016_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2016/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 155.50,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 33.60},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 19.50},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 21.20},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 27.40},
                    {name: "Taylor Gabriel",position: "WR",nflTeam: "ATL",points: 1.50},
                    {name: "Martellus Bennett",position: "TE",nflTeam: "NE",points: 7.90},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 23.40},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 19.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 2.00}
                  ],
                  bench: [
                    {name: "Bilal Powell",position: "RB",nflTeam: "NYJ",points: 7.40},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 15.40},
                    {name: "Kirk Cousins",position: "QB",nflTeam: "WAS",points: 29.80},
                    {name: "Cameron Meredith",position: "WR",nflTeam: "CHI",points: 19.50},
                    {name: "Tyrell Williams",position: "WR",nflTeam: "SD",points: 12.40},
                    {name: "Kenneth Dixon",position: "RB",nflTeam: "BAL",points: 5.80},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 101.46,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tyrod Taylor",position: "QB",nflTeam: "BUF",points: 31.16},
                    {name: "Spencer Ware",position: "RB",nflTeam: "KC",points: 8.20},
                    {name: "Ty Montgomery",position: "RB",nflTeam: "GB",points: 4.00},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 5.80},
                    {name: "Steve Smith",position: "WR",nflTeam: "BAL",points: 15.90},
                    {name: "Dwayne Allen",position: "TE",nflTeam: "IND",points: 3.10},
                    {name: "Kelvin Benjamin",position: "WR",nflTeam: "CAR",points: 12.30},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 11.00},
                    {name: "San Diego Chargers",position: "DEF",nflTeam: "SD",points: 10.00}
                  ],
                  bench: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 19.06},
                    {name: "Cole Beasley",position: "WR",nflTeam: "DAL",points: 2.50},
                    {name: "Eric Ebron",position: "TE",nflTeam: "DET",points: 9.30},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 2.90},
                    {name: "Donte Moncrief",position: "WR",nflTeam: "IND",points: 9.00},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "SD",points: 0.00},
                  ]
                }
              },
            ]
          },


//2016_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2016/F1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 90.90,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 34.20},
                    {name: "DeAngelo Williams",position: "RB",nflTeam: "PIT",points: 21.40},
                    {name: "Latavius Murray",position: "RB",nflTeam: "LV",points: 2.50},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 15.60},
                    {name: "Tyreek Hill",position: "WR",nflTeam: "KC",points: 6.10},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 2.20},
                    {name: "Jay Ajayi",position: "RB",nflTeam: "MIA",points: 7.90},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "LV",points: 0.00},
                    {name: "Los Angeles Rams",position: "DEF",nflTeam: "LA",points: 1.00}
                  ],
                  bench: [
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "Delanie Walker",position: "TE",nflTeam: "TEN",points: 3.50},
                    {name: "Chris Thompson",position: "RB",nflTeam: "WAS",points: 4.20},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "PIT",points: 0.00},
                    {name: "Amari Cooper",position: "WR",nflTeam: "LV",points: 9.90},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 2.00},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 78.90,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 14.72},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 11.90},
                    {name: "Ezekiel Elliott",position: "RB",nflTeam: "DAL",points: 0.00},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 6.60},
                    {name: "Tyrell Williams",position: "WR",nflTeam: "LAC",points: 7.00},
                    {name: "Antonio Gates",position: "TE",nflTeam: "LAC",points: 11.50},
                    {name: "Cameron Meredith",position: "WR",nflTeam: "CHI",points: 10.18},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 8.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 9.00}
                  ],
                  bench: [
                    {name: "Martellus Bennett",position: "TE",nflTeam: "NE",points: 9.30},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 0.00},
                    {name: "Bilal Powell",position: "RB",nflTeam: "NYJ",points: 19.70},
                    {name: "Kirk Cousins",position: "QB",nflTeam: "WAS",points: 11.48},
                    {name: "Taylor Gabriel",position: "WR",nflTeam: "ATL",points: 0.00},
                    {name: "Kenneth Dixon",position: "RB",nflTeam: "BAL",points: 12.30},
                  ]
                }
              },
            ]
          },


//2016_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2016/F3.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 108.40,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 20.00},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "TEN",points: 1.90},
                    {name: "Carlos Hyde",position: "RB",nflTeam: "SF",points: 0.00},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 9.50},
                    {name: "Michael Thomas",position: "WR",nflTeam: "NO",points: 21.60},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 17.70},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 23.70},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 4.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 10.00}
                  ],
                  bench: [
                    {name: "Carson Palmer",position: "QB",nflTeam: "ARI",points: 20.20},
                    {name: "Ladarius Green",position: "TE",nflTeam: "PIT",points: 0.00},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 17.10},
                    {name: "Thomas Rawls",position: "RB",nflTeam: "SEA",points: 7.40},
                    {name: "Malcolm Mitchell",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Kenneth Farrow",position: "RB",nflTeam: "LAC",points: 0.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 62.60,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tyrod Taylor",position: "QB",nflTeam: "BUF",points: 0.00},
                    {name: "Spencer Ware",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "Ty Montgomery",position: "RB",nflTeam: "GB",points: 6.10},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 14.40},
                    {name: "Steve Smith",position: "WR",nflTeam: "BAL",points: 3.40},
                    {name: "Dwayne Allen",position: "TE",nflTeam: "IND",points: 9.40},
                    {name: "Kelvin Benjamin",position: "WR",nflTeam: "CAR",points: 15.30},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 9.00},
                    {name: "Los Angeles Chargers",position: "DEF",nflTeam: "LAC",points: 5.00}
                  ],
                  bench: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 0.00},
                    {name: "Cole Beasley",position: "WR",nflTeam: "DAL",points: 4.90},
                    {name: "Eric Ebron",position: "TE",nflTeam: "DET",points: 6.10},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 13.60},
                    {name: "Donte Moncrief",position: "WR",nflTeam: "IND",points: 0.00},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "LAC",points: 0.00},
                  ]
                }
              },
            ]
          },


//2016_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2016/F5.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 101.48,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Joe Flacco",position: "QB",nflTeam: "BAL",points: 8.68},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 19.20},
                    {name: "Jerick McKinnon",position: "RB",nflTeam: "MIN",points: 23.00},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "SEA",points: 6.40},
                    {name: "Willie Snead",position: "WR",nflTeam: "NO",points: 8.20},
                    {name: "Chandler Catanzaro",position: "K",nflTeam: "ARI",points: 14.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 22.00}
                  ],
                  bench: [
                    {name: "Gary Barnidge",position: "TE",nflTeam: "CLE",points: 10.00},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 23.70},
                    {name: "Mike Wallace",position: "WR",nflTeam: "BAL",points: 3.30},
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 18.54},
                    {name: "Allen Robinson",position: "WR",nflTeam: "JAX",points: 8.20},
                    {name: "Jeremy Hill",position: "RB",nflTeam: "CIN",points: 0.00},
                    {name: "Charles Sims",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Tyler Boyd",position: "WR",nflTeam: "CIN",points: 5.40},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 77.84,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 25.64},
                    {name: "Matt Forte",position: "RB",nflTeam: "NYJ",points: 0.00},
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "NE",points: 11.10},
                    {name: "DeSean Jackson",position: "WR",nflTeam: "WAS",points: 3.40},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 10.30},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 0.80},
                    {name: "Frank Gore",position: "RB",nflTeam: "IND",points: 7.60},
                    {name: "Matt Prater",position: "K",nflTeam: "DET",points: 8.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 11.00}
                  ],
                  bench: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 29.44},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "LV",points: 4.70},
                    {name: "Eric Decker",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "MIN",points: 0.00},
                    {name: "Alfred Morris",position: "RB",nflTeam: "DAL",points: 1.50},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 16.00},
                  ]
                }
              },
            ]
          },
        ],


//END 2016 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2016_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "First Round",
            bowlArt: "artwork/2016/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 81.04,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "LAC",points: 14.24},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 28.90},
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 4.20},
                    {name: "Michael Floyd",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 13.30},
                    {name: "Jordan Reed",position: "TE",nflTeam: "WAS",points: 0.60},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 4.80},
                    {name: "Graham Gano",position: "K",nflTeam: "CAR",points: 14.00},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 1.00}
                  ],
                  bench: [
                    {name: "Shane Vereen",position: "RB",nflTeam: "NYG",points: 2.00},
                    {name: "Markus Wheaton",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 11.02},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAX",points: 0.00},
                    {name: "T.J. Yeldon",position: "RB",nflTeam: "JAX",points: 6.20},
                    {name: "Laquon Treadwell",position: "WR",nflTeam: "MIN",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 70.74,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Marcus Mariota",position: "QB",nflTeam: "TEN",points: 5.44},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 22.80},
                    {name: "DeAndre Washington",position: "RB",nflTeam: "LV",points: 3.40},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 9.10},
                    {name: "Terrance Williams",position: "WR",nflTeam: "DAL",points: 3.00},
                    {name: "Coby Fleener",position: "TE",nflTeam: "NO",points: 1.00},
                    {name: "Breshad Perriman",position: "WR",nflTeam: "BAL",points: 0.00},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 18.00},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 8.00}
                  ],
                  bench: [
                    {name: "Jeremy Maclin",position: "WR",nflTeam: "KC",points: 8.20},
                    {name: "Brent Celek",position: "TE",nflTeam: "PHI",points: 0.50},
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 10.48},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 1.30},
                    {name: "Matt Jones",position: "RB",nflTeam: "WAS",points: 0.00},
                    {name: "Don Jackson",position: "RB",nflTeam: "GB",points: 0.00},
                  ]
                }
              },
            ]
          },

//2016_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2016/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 89.02,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Colin Kaepernick",position: "QB",nflTeam: "SF",points: 17.42},
                    {name: "Terrance West",position: "RB",nflTeam: "BAL",points: 12.20},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "CLE",points: 2.80},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 5.80},
                    {name: "Travis Benjamin",position: "WR",nflTeam: "LAC",points: 11.60},
                    {name: "Cameron Brate",position: "TE",nflTeam: "TB",points: 13.30},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 5.90},
                    {name: "Brandon McManus",position: "K",nflTeam: "DEN",points: 3.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 17.00}
                  ],
                  bench: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 10.38},
                    {name: "Brandon Marshall",position: "WR",nflTeam: "NYJ",points: 1.60},
                    {name: "Rishard Matthews",position: "WR",nflTeam: "TEN",points: 8.50},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 19.00},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 9.30},
                    {name: "Zach Zenner",position: "RB",nflTeam: "DET",points: 4.40},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 77.20,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 20.00},
                    {name: "Rashad Jennings",position: "RB",nflTeam: "NYG",points: 3.80},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 3.60},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 9.50},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 8.00},
                    {name: "Jordan Howard",position: "RB",nflTeam: "CHI",points: 17.30},
                    {name: "Caleb Sturgis",position: "K",nflTeam: "PHI",points: 12.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 3.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 10.22},
                    {name: "Dion Lewis",position: "RB",nflTeam: "NE",points: 10.40},
                    {name: "Vernon Davis",position: "TE",nflTeam: "WAS",points: 2.30},
                    {name: "Marvin Jones",position: "WR",nflTeam: "DET",points: 4.10},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "CHI",points: 14.90},
                    {name: "Rob Kelley",position: "RB",nflTeam: "WAS",points: 11.50},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2016_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2016/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 52.04,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 12.24},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "DEN",points: 0.00},
                    {name: "Kenny Stills",position: "WR",nflTeam: "MIA",points: 9.50},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "NO",points: 9.80},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 9.30},
                    {name: "John Brown",position: "WR",nflTeam: "ARI",points: 1.20},
                    {name: "Dan Bailey",position: "K",nflTeam: "DAL",points: 6.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 4.00}
                  ],
                  bench: [
                    {name: "Brandon LaFell",position: "WR",nflTeam: "CIN",points: 19.00},
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 22.36},
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "ATL",points: 5.60},
                    {name: "Theo Riddick",position: "RB",nflTeam: "DET",points: 0.00},
                    {name: "Tyler Eifert",position: "TE",nflTeam: "CIN",points: 0.00},
                    {name: "James White",position: "RB",nflTeam: "NE",points: 10.60},
                    {name: "Wendell Smallwood",position: "RB",nflTeam: "PHI",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c4",
                seed: 4,
                score: 75.58,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "LAC",points: 18.88},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 20.50},
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Michael Floyd",position: "WR",nflTeam: "NE",points: 0.60},
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 15.00},
                    {name: "Jordan Reed",position: "TE",nflTeam: "WAS",points: 0.00},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 2.60},
                    {name: "Graham Gano",position: "K",nflTeam: "CAR",points: 10.00},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 8.00}
                  ],
                  bench: [
                    {name: "Shane Vereen",position: "RB",nflTeam: "NYG",points: 0.00},
                    {name: "Markus Wheaton",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 22.08},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAX",points: 0.00},
                    {name: "T.J. Yeldon",position: "RB",nflTeam: "JAX",points: 0.50},
                    {name: "Laquon Treadwell",position: "WR",nflTeam: "MIN",points: 0.00},
                  ]
                }
              },
            ]
          },

//2016_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2016/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 53.38,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 23.98},
                    {name: "Ryan Mathews",position: "RB",nflTeam: "PHI",points: 6.20},
                    {name: "Lamar Miller",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "Kenny Britt",position: "WR",nflTeam: "LA",points: 1.50},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 4.30},
                    {name: "C.J. Fiedorowicz",position: "TE",nflTeam: "HOU",points: 4.20},
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 5.20},
                    {name: "Stephen Hauschka",position: "K",nflTeam: "SEA",points: 5.00},
                    {name: "New York Giants",position: "DEF",nflTeam: "NYG",points: 3.00}
                  ],
                  bench: [
                    {name: "Anquan Boldin",position: "WR",nflTeam: "DET",points: 3.30},
                    {name: "Darren Sproles",position: "RB",nflTeam: "PHI",points: 12.30},
                    {name: "Chris Ivory",position: "RB",nflTeam: "JAX",points: 15.40},
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "MIA",points: 0.00},
                    {name: "Christine Michael",position: "RB",nflTeam: "GB",points: 0.50},
                    {name: "Jordan Matthews",position: "WR",nflTeam: "PHI",points: 1.20},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 120.64,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Colin Kaepernick",position: "QB",nflTeam: "SF",points: 26.14},
                    {name: "Terrance West",position: "RB",nflTeam: "BAL",points: 5.50},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "CLE",points: 17.80},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 15.60},
                    {name: "Rishard Matthews",position: "WR",nflTeam: "TEN",points: 9.10},
                    {name: "Cameron Brate",position: "TE",nflTeam: "TB",points: 7.20},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 15.70},
                    {name: "Brandon McManus",position: "K",nflTeam: "DEN",points: 6.60},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 17.00}
                  ],
                  bench: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 12.72},
                    {name: "Brandon Marshall",position: "WR",nflTeam: "NYJ",points: 2.80},
                    {name: "Travis Benjamin",position: "WR",nflTeam: "LAC",points: 7.50},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 3.80},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 4.90},
                    {name: "Zach Zenner",position: "RB",nflTeam: "DET",points: 21.20},
                  ]
                }
              },
            ]
          },

//2016_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2016/F7.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 55.46,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "LAC",points: 14.86},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 1.60},
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Michael Floyd",position: "WR",nflTeam: "NE",points: 9.60},
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 4.40},
                    {name: "Jordan Reed",position: "TE",nflTeam: "WAS",points: 8.00},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 0.00},
                    {name: "Graham Gano",position: "K",nflTeam: "CAR",points: 6.00},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 11.00}
                  ],
                  bench: [
                    {name: "Shane Vereen",position: "RB",nflTeam: "NYG",points: 0.00},
                    {name: "Markus Wheaton",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Derek Carr",position: "QB",nflTeam: "LV",points: 0.00},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAX",points: 0.00},
                    {name: "T.J. Yeldon",position: "RB",nflTeam: "JAX",points: 0.00},
                    {name: "Laquon Treadwell",position: "WR",nflTeam: "MIN",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 71.40,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Colin Kaepernick",position: "QB",nflTeam: "SF",points: 12.20},
                    {name: "Terrance West",position: "RB",nflTeam: "BAL",points: 3.50},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "CLE",points: 14.80},
                    {name: "Travis Benjamin",position: "WR",nflTeam: "LAC",points: 0.00},
                    {name: "Rishard Matthews",position: "WR",nflTeam: "TEN",points: 17.40},
                    {name: "Cameron Brate",position: "TE",nflTeam: "TB",points: 0.00},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 12.50},
                    {name: "Brandon McManus",position: "K",nflTeam: "DEN",points: 6.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 5.00}
                  ],
                  bench: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 13.44},
                    {name: "Brandon Marshall",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 0.00},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 0.40},
                    {name: "Zach Zenner",position: "RB",nflTeam: "DET",points: 17.00},
                  ]
                }
              },
            ]
          },

//2016_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2016/F9.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 41.70,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 7.20},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "DEN",points: 0.00},
                    {name: "Kenny Stills",position: "WR",nflTeam: "MIA",points: 10.10},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "NO",points: 1.90},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 1.00},
                    {name: "John Brown",position: "WR",nflTeam: "ARI",points: 2.50},
                    {name: "Dan Bailey",position: "K",nflTeam: "DAL",points: 7.00},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 12.00}
                  ],
                  bench: [
                    {name: "Brandon LaFell",position: "WR",nflTeam: "CIN",points: 6.70},
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 24.66},
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "ATL",points: 9.20},
                    {name: "Theo Riddick",position: "RB",nflTeam: "DET",points: 0.00},
                    {name: "Tyler Eifert",position: "TE",nflTeam: "CIN",points: 0.00},
                    {name: "James White",position: "RB",nflTeam: "NE",points: 3.00},
                    {name: "Wendell Smallwood",position: "RB",nflTeam: "PHI",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 68.08,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Dak Prescott",position: "QB",nflTeam: "DAL",points: 2.38},
                    {name: "Ryan Mathews",position: "RB",nflTeam: "PHI",points: 0.00},
                    {name: "Lamar Miller",position: "RB",nflTeam: "HOU",points: 0.00},
                    {name: "Kenny Britt",position: "WR",nflTeam: "LA",points: 0.00},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 12.30},
                    {name: "C.J. Fiedorowicz",position: "TE",nflTeam: "HOU",points: 7.20},
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 13.20},
                    {name: "Stephen Hauschka",position: "K",nflTeam: "SEA",points: 13.00},
                    {name: "New York Giants",position: "DEF",nflTeam: "NYG",points: 20.00}
                  ],
                  bench: [
                    {name: "Anquan Boldin",position: "WR",nflTeam: "DET",points: 11.70},
                    {name: "Darren Sproles",position: "RB",nflTeam: "PHI",points: 3.60},
                    {name: "Chris Ivory",position: "RB",nflTeam: "JAX",points: 0.00},
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "MIA",points: 0.00},
                    {name: "Christine Michael",position: "RB",nflTeam: "GB",points: 1.60},
                    {name: "Jordan Matthews",position: "WR",nflTeam: "PHI",points: 0.00},
                  ]
                }
              },
            ]
          },


//2016_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "",
            bowlArt: "artwork/2016/F11.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 48.10,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Marcus Mariota",position: "QB",nflTeam: "TEN",points: 0.00},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 4.40},
                    {name: "DeAndre Washington",position: "RB",nflTeam: "LV",points: 5.70},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 4.70},
                    {name: "Terrance Williams",position: "WR",nflTeam: "DAL",points: 9.30},
                    {name: "Coby Fleener",position: "TE",nflTeam: "NO",points: 3.80},
                    {name: "Breshad Perriman",position: "WR",nflTeam: "BAL",points: 6.20},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 3.00},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 11.00}
                  ],
                  bench: [
                    {name: "Jeremy Maclin",position: "WR",nflTeam: "KC",points: 5.30},
                    {name: "Brent Celek",position: "TE",nflTeam: "PHI",points: 0.90},
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 9.88},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 0.00},
                    {name: "Matt Jones",position: "RB",nflTeam: "WAS",points: 0.00},
                    {name: "Don Jackson",position: "RB",nflTeam: "GB",points: 0.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 95.28,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 8.08},
                    {name: "Rashad Jennings",position: "RB",nflTeam: "NYG",points: 11.70},
                    {name: "Todd Gurley",position: "RB",nflTeam: "LA",points: 7.70},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 4.40},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 25.90},
                    {name: "Jordan Howard",position: "RB",nflTeam: "CHI",points: 13.50},
                    {name: "Caleb Sturgis",position: "K",nflTeam: "PHI",points: 9.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 15.00}
                  ],
                  bench: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 19.88},
                    {name: "Dion Lewis",position: "RB",nflTeam: "NE",points: 5.20},
                    {name: "Vernon Davis",position: "TE",nflTeam: "WAS",points: 4.90},
                    {name: "Marvin Jones",position: "WR",nflTeam: "DET",points: 7.60},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "CHI",points: 1.00},
                    {name: "Rob Kelley",position: "RB",nflTeam: "WAS",points: 3.30},
                  ]
                }
              },
            ]
          },
        ],
//END 2016 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2016!!!!!!!!!!!!!!!!!!!!!!!!!!END2016!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2016!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2016







//START YEAR 2015  COMPLETE

    2015: {
      format: "current",
      teams: {
        p1: {name: "Dirty birds",owner: "Preston",art: "artwork/2015/p1.png"},
        p2: {name: "Natty Ice",owner: "David",art: "artwork/2015/p2.png"},
        p3: {name: "Tom deflated my balls",owner: "Sam",art: "artwork/2015/p3.png"},
        p4: {name: "Devonta Freeman",owner: "Jordan",art: "artwork/2015/p4.png"},
        p5: {name: "Hate",owner: "Chris",art: "artwork/2015/p5.png"},
        p6: {name: "The Clit Commanders",owner: "Brycen",art: "artwork/2015/p6.png"},
        c1: {name: "Will Meyer",owner: "Cody",art: "artwork/2015/c1.png"},
        c2: {name: "kkk",owner: "Keith",art: "artwork/2015/c2.png"},
        c3: {name: "Vick's Dogs",owner: "Will",art: "artwork/2015/c3.png"},
        c4: {name: "Mike Vick in a box",owner: "Harrison",art: "artwork/2015/c4.png"},
        c5: {name: "Mattyice8",owner: "Matt",art: "artwork/2015/c5.png"},
        c6: {name: "Ronalbro's",owner: "Bailey",art: "artwork/2015/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2015_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2015/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 133.90,
      touchdowns: null,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 41.60},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "MIN",points: 6.30},
                    {name: "Todd Gurley",position: "RB",nflTeam: "STL",points: 13.90},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 3.70},
                    {name: "Amari Cooper",position: "WR",nflTeam: "OAK",points: 24.00},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 7.30},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 16.10},
                    {name: "Graham Gano",position: "K",nflTeam: "CAR",points: 8.00},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 13.00}
                  ],
                  bench: [
                    {name: "Delanie Walker",position: "TE",nflTeam: "TEN",points: 18.40},
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 10.06},
                    {name: "Ronnie Hillman",position: "RB",nflTeam: "DEN",points: 2.80},
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 13.60},
                    {name: "T.J. Yeldon",position: "RB",nflTeam: "JAC",points: 0.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 21.00},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 137.04,
      touchdowns: null,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "MIA",points: 15.04},
                    {name: "Danny Woodhead",position: "RB",nflTeam: "SD",points: 30.00},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 40.90},
                    {name: "Calvin Johnson",position: "WR",nflTeam: "DET",points: 1.90},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 30.90},
                    {name: "Dwayne Allen",position: "TE",nflTeam: "IND",points: 0.60},
                    {name: "Allen Robinson",position: "WR",nflTeam: "JAC",points: 11.70},
                    {name: "Caleb Sturgis",position: "K",nflTeam: "PHI",points: 5.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 1.00}
                  ],
                  bench: [
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 5.80},
                    {name: "Jay Cutler",position: "QB",nflTeam: "CHI",points: 13.34},
                    {name: "Heath Miller",position: "TE",nflTeam: "PIT",points: 1.20},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "DEN",points: 2.00},
                    {name: "Dorial Green-Beckham",position: "WR",nflTeam: "TEN",points: 11.30},
                  ]
                }
    },
  ]
},



//2015_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2015/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 81.56,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Carson Palmer",position: "QB",nflTeam: "ARI",points: 14.96},
                    {name: "Chris Ivory",position: "RB",nflTeam: "NYJ",points: 4.20},
                    {name: "Eddie Lacy",position: "RB",nflTeam: "GB",points: 2.30},
                    {name: "James Jones",position: "WR",nflTeam: "GB",points: 14.20},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAC",points: 4.40},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 13.90},
                    {name: "James Starks",position: "RB",nflTeam: "GB",points: 3.60},
                    {name: "Robbie Gould",position: "K",nflTeam: "CHI",points: 7.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 17.00}
                  ],
                  bench: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 26.74},
                    {name: "Travis Benjamin",position: "WR",nflTeam: "CLE",points: 3.50},
                    {name: "Rishard Matthews",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Alfred Morris",position: "RB",nflTeam: "WAS",points: 8.40},
                    {name: "Tavon Austin",position: "WR",nflTeam: "STL",points: 19.30},
                    {name: "Willie Snead",position: "WR",nflTeam: "NO",points: 7.60},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 77.56,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 26.56},
                    {name: "Frank Gore",position: "RB",nflTeam: "IND",points: 5.90},
                    {name: "Lamar Miller",position: "RB",nflTeam: "MIA",points: 2.40},
                    {name: "Vincent Jackson",position: "WR",nflTeam: "TB",points: 0.00},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "NO",points: 18.40},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 8.80},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 11.50},
                    {name: "Adam Vinatieri",position: "K",nflTeam: "IND",points: 4.00},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 0.00}
                  ],
                  bench: [
                    {name: "Martellus Bennett",position: "TE",nflTeam: "CHI",points: 0.00},
                    {name: "Pierre Garcon",position: "WR",nflTeam: "WAS",points: 9.40},
                    {name: "Nick Foles",position: "QB",nflTeam: "STL",points: 0.00},
                    {name: "Markus Wheaton",position: "WR",nflTeam: "PIT",points: 12.20},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 3.20},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "CLE",points: 3.00},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2015_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2015/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 147.42,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Blake Bortles",position: "QB",nflTeam: "JAC",points: 29.22},
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 7.50},
                    {name: "Latavius Murray",position: "RB",nflTeam: "OAK",points: 17.70},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 23.80},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 17.70},
                    {name: "Jordan Reed",position: "TE",nflTeam: "WAS",points: 24.90},
                    {name: "Kamar Aiken",position: "WR",nflTeam: "BAL",points: 6.60},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 5.00},
                    {name: "Washington Redskins",position: "DEF",nflTeam: "WAS",points: 15.00}
                  ],
                  bench: [
                    {name: "Darren McFadden",position: "RB",nflTeam: "DAL",points: 9.80},
                    {name: "Gary Barnidge",position: "TE",nflTeam: "CLE",points: 4.70},
                    {name: "Tim Hightower",position: "RB",nflTeam: "NO",points: 28.90},
                    {name: "Michael Floyd",position: "WR",nflTeam: "ARI",points: 11.10},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "CHI",points: 0.00},
                    {name: "Cameron Artis-Payne",position: "RB",nflTeam: "CAR",points: 5.60},
                  ]
                }
              },
              {
                teamId: "p5",
                seed: 5,
                score: 91.36,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "MIA",points: 13.96},
                    {name: "Danny Woodhead",position: "RB",nflTeam: "SD",points: 10.80},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 18.70},
                    {name: "Calvin Johnson",position: "WR",nflTeam: "DET",points: 13.70},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 6.10},
                    {name: "Dwayne Allen",position: "TE",nflTeam: "IND",points: 0.00},
                    {name: "Allen Robinson",position: "WR",nflTeam: "JAC",points: 21.10},
                    {name: "Caleb Sturgis",position: "K",nflTeam: "PHI",points: 6.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 1.00}
                  ],
                  bench: [
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 1.70},
                    {name: "Jay Cutler",position: "QB",nflTeam: "CHI",points: 12.34},
                    {name: "Heath Miller",position: "TE",nflTeam: "PIT",points: 4.90},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "DEN",points: 12.10},
                    {name: "Dorial Green-Beckham",position: "WR",nflTeam: "TEN",points: 0.00},
                  ]
                }
              },
            ]
          },



//2015_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2015/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 85.44,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 11.14},
                    {name: "Rashad Jennings",position: "RB",nflTeam: "NYG",points: 13.60},
                    {name: "C.J. Spiller",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Eric Decker",position: "WR",nflTeam: "NYJ",points: 10.70},
                    {name: "Brandon Marshall",position: "WR",nflTeam: "NYJ",points: 23.50},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 8.60},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 8.90},
                    {name: "Brandon McManus",position: "K",nflTeam: "DEN",points: 8.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 1.00}
                  ],
                  bench: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 14.34},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Tre Mason",position: "RB",nflTeam: "STL",points: 0.60},
                    {name: "Dustin Hopkins",position: "K",nflTeam: "WAS",points: 6.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 5.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 117.00,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Carson Palmer",position: "QB",nflTeam: "ARI",points: 16.60},
                    {name: "Chris Ivory",position: "RB",nflTeam: "NYJ",points: 4.20},
                    {name: "Eddie Lacy",position: "RB",nflTeam: "GB",points: 14.80},
                    {name: "James Jones",position: "WR",nflTeam: "GB",points: 6.60},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAC",points: 22.70},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 4.00},
                    {name: "James Starks",position: "RB",nflTeam: "GB",points: -0.90},
                    {name: "Robbie Gould",position: "K",nflTeam: "CHI",points: 16.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 33.00}
                  ],
                  bench: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 28.18},
                    {name: "Travis Benjamin",position: "WR",nflTeam: "CLE",points: 2.00},
                    {name: "Rishard Matthews",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Alfred Morris",position: "RB",nflTeam: "WAS",points: 4.90},
                    {name: "Tavon Austin",position: "WR",nflTeam: "STL",points: 2.80},
                    {name: "Willie Snead",position: "WR",nflTeam: "NO",points: 7.50},
                  ]
                }
              },
            ]
          },


//2015_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2015/F1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 82.56,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Blake Bortles",position: "QB",nflTeam: "JAC",points: 3.56},
                    {name: "Tim Hightower",position: "RB",nflTeam: "NO",points: 16.70},
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 10.80},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 14.90},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 8.90},
                    {name: "Jordan Reed",position: "TE",nflTeam: "WAS",points: 4.50},
                    {name: "Charcandrick West",position: "RB",nflTeam: "KC",points: 3.20},
                    {name: "Chris Boswell",position: "K",nflTeam: "PIT",points: 8.00},
                    {name: "Washington Redskins",position: "DEF",nflTeam: "WAS",points: 12.00}
                  ],
                  bench: [
                    {name: "Darren McFadden",position: "RB",nflTeam: "DAL",points: 12.50},
                    {name: "Gary Barnidge",position: "TE",nflTeam: "CLE",points: 6.60},
                    {name: "Kamar Aiken",position: "WR",nflTeam: "BAL",points: 7.60},
                    {name: "Michael Floyd",position: "WR",nflTeam: "ARI",points: 1.60},
                    {name: "Latavius Murray",position: "RB",nflTeam: "OAK",points: 5.60},
                    {name: "Cameron Artis-Payne",position: "RB",nflTeam: "CAR",points: 12.10},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 56.86,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Carson Palmer",position: "QB",nflTeam: "ARI",points: 7.16},
                    {name: "Alfred Morris",position: "RB",nflTeam: "WAS",points: 10.00},
                    {name: "Eddie Lacy",position: "RB",nflTeam: "GB",points: 4.10},
                    {name: "James Jones",position: "WR",nflTeam: "GB",points: 10.20},
                    {name: "Jordan Matthews",position: "WR",nflTeam: "PHI",points: 17.40},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 1.60},
                    {name: "Jeremy Langford",position: "RB",nflTeam: "CHI",points: 1.40},
                    {name: "Robbie Gould",position: "K",nflTeam: "CHI",points: 8.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: -3.00}
                  ],
                  bench: [
                    {name: "James Starks",position: "RB",nflTeam: "GB",points: 4.20},
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 16.42},
                    {name: "Ted Ginn",position: "WR",nflTeam: "CAR",points: 0.00},
                    {name: "Chris Ivory",position: "RB",nflTeam: "NYJ",points: 8.10},
                    {name: "Tavon Austin",position: "WR",nflTeam: "STL",points: 6.20},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAC",points: 1.70},
                  ]
                }
              },
            ]
          },


//2015_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2015/F3.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 103.00,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "MIA",points: 23.70},
                    {name: "Danny Woodhead",position: "RB",nflTeam: "SD",points: 6.20},
                    {name: "David Johnson",position: "RB",nflTeam: "ARI",points: 5.90},
                    {name: "Calvin Johnson",position: "WR",nflTeam: "DET",points: 19.70},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 22.70},
                    {name: "Dwayne Allen",position: "TE",nflTeam: "IND",points: 0.00},
                    {name: "Allen Robinson",position: "WR",nflTeam: "JAC",points: 10.80},
                    {name: "Caleb Sturgis",position: "K",nflTeam: "PHI",points: 5.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 9.00}
                  ],
                  bench: [
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 4.00},
                    {name: "Jay Cutler",position: "QB",nflTeam: "CHI",points: 12.90},
                    {name: "Heath Miller",position: "TE",nflTeam: "PIT",points: 7.80},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "DEN",points: 13.00},
                    {name: "Dorial Green-Beckham",position: "WR",nflTeam: "TEN",points: 8.10},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 84.76,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 5.26},
                    {name: "Rashad Jennings",position: "RB",nflTeam: "NYG",points: 23.60},
                    {name: "C.J. Spiller",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Eric Decker",position: "WR",nflTeam: "NYJ",points: 11.00},
                    {name: "Brandon Marshall",position: "WR",nflTeam: "NYJ",points: 18.60},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 1.80},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 11.50},
                    {name: "Brandon McManus",position: "K",nflTeam: "DEN",points: 9.00},
                    {name: "Tampa Bay Buccaneers",position: "DEF",nflTeam: "TB",points: 4.00}
                  ],
                  bench: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 19.36},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Tre Mason",position: "RB",nflTeam: "STL",points: 10.40},
                    {name: "Dustin Hopkins",position: "K",nflTeam: "WAS",points: 10.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 6.00},
                  ]
                }
              },
            ]
          },


//2015_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2015/F5.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 110.72,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 32.72},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "MIN",points: 12.80},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 13.40},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 9.40},
                    {name: "Amari Cooper",position: "WR",nflTeam: "OAK",points: 2.00},
                    {name: "Delanie Walker",position: "TE",nflTeam: "TEN",points: 13.00},
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 5.40},
                    {name: "Graham Gano",position: "K",nflTeam: "CAR",points: 8.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 14.00}
                  ],
                  bench: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 12.84},
                    {name: "Ronnie Hillman",position: "RB",nflTeam: "DEN",points: 18.70},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 1.00},
                    {name: "T.J. Yeldon",position: "RB",nflTeam: "JAC",points: 0.00},
                    {name: "Todd Gurley",position: "RB",nflTeam: "STL",points: 0.00},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 6.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 76.98,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 21.18},
                    {name: "Frank Gore",position: "RB",nflTeam: "IND",points: 7.60},
                    {name: "Lamar Miller",position: "RB",nflTeam: "MIA",points: 6.30},
                    {name: "Vincent Jackson",position: "WR",nflTeam: "TB",points: 0.00},
                    {name: "Brandin Cooks",position: "WR",nflTeam: "NO",points: 2.20},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 9.40},
                    {name: "Tyler Lockett",position: "WR",nflTeam: "SEA",points: 4.30},
                    {name: "Adam Vinatieri",position: "K",nflTeam: "IND",points: 14.00},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 12.00}
                  ],
                  bench: [
                    {name: "Martellus Bennett",position: "TE",nflTeam: "CHI",points: 0.00},
                    {name: "Pierre Garcon",position: "WR",nflTeam: "WAS",points: 10.90},
                    {name: "Nick Foles",position: "QB",nflTeam: "STL",points: 0.00},
                    {name: "Markus Wheaton",position: "WR",nflTeam: "PIT",points: 11.70},
                    {name: "Davante Adams",position: "WR",nflTeam: "GB",points: 5.40},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "CLE",points: 5.30},
                  ]
                }
              },
            ]
          },
        ],


//END 2015 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2015_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "First Round",
            bowlArt: "artwork/2015/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 73.84,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "SD",points: 20.44},
                    {name: "DeAngelo Williams",position: "RB",nflTeam: "PIT",points: 11.60},
                    {name: "Antonio Andrews",position: "RB",nflTeam: "TEN",points: 7.00},
                    {name: "Jeremy Maclin",position: "WR",nflTeam: "KC",points: 11.00},
                    {name: "Terrance Williams",position: "WR",nflTeam: "DAL",points: 1.30},
                    {name: "Tyler Eifert",position: "TE",nflTeam: "CIN",points: 0.00},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 16.50},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 2.00},
                    {name: "St. Louis Rams",position: "DEF",nflTeam: "STL",points: 4.00}
                  ],
                  bench: [
                    {name: "Sam Bradford",position: "QB",nflTeam: "PHI",points: 16.84},
                    {name: "Julius Thomas",position: "TE",nflTeam: "JAC",points: 7.90},
                    {name: "Benjamin Watson",position: "TE",nflTeam: "NO",points: 10.90},
                    {name: "Marquess Wilson",position: "WR",nflTeam: "CHI",points: 0.00},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "OAK",points: 8.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 14.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 112.86,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "WAS",points: 35.86},
                    {name: "Shane Vereen",position: "RB",nflTeam: "NYG",points: 13.20},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 5.10},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "OAK",points: 7.00},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 15.70},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 2.10},
                    {name: "Marques Colston",position: "WR",nflTeam: "NO",points: 9.90},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 15.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 9.00}
                  ],
                  bench: [
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 0.00},
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 12.54},
                    {name: "Darren Sproles",position: "RB",nflTeam: "PHI",points: 2.50},
                    {name: "Ladarius Green",position: "TE",nflTeam: "SD",points: 1.30},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "SD",points: 4.70},
                    {name: "Dan Bailey",position: "K",nflTeam: "DAL",points: 12.00},
                  ]
                }
              },
            ]
          },

//2015_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2015/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 99.20,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 0.00},
                    {name: "Matt Forte",position: "RB",nflTeam: "CHI",points: 16.40},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 8.50},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 26.50},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 18.10},
                    {name: "Charles Clay",position: "TE",nflTeam: "BUF",points: 0.00},
                    {name: "Martavis Bryant",position: "WR",nflTeam: "PIT",points: 8.70},
                    {name: "Chandler Catanzaro",position: "K",nflTeam: "ARI",points: 10.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 11.00}
                  ],
                  bench: [
                    {name: "Justin Forsett",position: "RB",nflTeam: "BAL",points: 0.00},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 16.50},
                    {name: "Tyrod Taylor",position: "QB",nflTeam: "BUF",points: 27.30},
                    {name: "Jordan Cameron",position: "TE",nflTeam: "MIA",points: 0.50},
                    {name: "Mike Wallace",position: "WR",nflTeam: "MIN",points: 3.70},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 12.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 63.04,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Brock Osweiler",position: "QB",nflTeam: "DEN",points: 29.74},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "PHI",points: 0.30},
                    {name: "Andre Williams",position: "RB",nflTeam: "NYG",points: 2.10},
                    {name: "Roddy White",position: "WR",nflTeam: "ATL",points: 4.70},
                    {name: "Kendall Wright",position: "WR",nflTeam: "TEN",points: 0.00},
                    {name: "Owen Daniels",position: "TE",nflTeam: "DEN",points: 1.40},
                    {name: "John Brown",position: "WR",nflTeam: "ARI",points: 9.80},
                    {name: "Josh Brown",position: "K",nflTeam: "NYG",points: 5.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 10.00}
                  ],
                  bench: [
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Peyton Manning",position: "QB",nflTeam: "DEN",points: 0.00},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 13.80},
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 19.02},
                    {name: "DeVante Parker",position: "WR",nflTeam: "MIA",points: 8.70},
                    {name: "Marcus Mariota",position: "QB",nflTeam: "TEN",points: -0.72},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2015_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2015/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 54.94,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 21.14},
                    {name: "Jeremy Hill",position: "RB",nflTeam: "CIN",points: 6.10},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 0.00},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 6.40},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 11.10},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 1.20},
                    {name: "Matt Jones",position: "RB",nflTeam: "WAS",points: 0.00},
                    {name: "Nick Folk",position: "K",nflTeam: "NYJ",points: 0.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 9.00}
                  ],
                  bench: [
                    {name: "Chris Johnson",position: "RB",nflTeam: "ARI",points: 0.00},
                    {name: "Joe Flacco",position: "QB",nflTeam: "BAL",points: 0.00},
                    {name: "Percy Harvin",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Vernon Davis",position: "TE",nflTeam: "DEN",points: 0.00},
                    {name: "Anquan Boldin",position: "WR",nflTeam: "SF",points: 2.70},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 2.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 75.20,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "WAS",points: 32.20},
                    {name: "Shane Vereen",position: "RB",nflTeam: "NYG",points: 2.40},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 4.30},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "OAK",points: 9.90},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 6.10},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 11.30},
                    {name: "Marques Colston",position: "WR",nflTeam: "NO",points: 0.00},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 8.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 1.00}
                  ],
                  bench: [
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 0.00},
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 16.40},
                    {name: "Darren Sproles",position: "RB",nflTeam: "PHI",points: 6.50},
                    {name: "Ladarius Green",position: "TE",nflTeam: "SD",points: 2.70},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "SD",points: 0.00},
                    {name: "Dan Bailey",position: "K",nflTeam: "DAL",points: 6.00},
                  ]
                }
              },
            ]
          },

//2015_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2015/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 51.00,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 4.50},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Karlos Williams",position: "RB",nflTeam: "BUF",points: 13.70},
                    {name: "DeSean Jackson",position: "WR",nflTeam: "WAS",points: 4.00},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "BUF",points: 8.40},
                    {name: "Jacob Tamme",position: "TE",nflTeam: "ATL",points: 2.90},
                    {name: "Donte Moncrief",position: "WR",nflTeam: "IND",points: 1.50},
                    {name: "Steven Hauschka",position: "K",nflTeam: "SEA",points: 5.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 11.00}
                  ],
                  bench: [
                    {name: "Ryan Mathews",position: "RB",nflTeam: "PHI",points: 7.80},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 0.00},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 1.90},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 22.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 44.40,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 0.00},
                    {name: "Matt Forte",position: "RB",nflTeam: "CHI",points: 7.70},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 4.10},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 12.70},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 5.90},
                    {name: "Charles Clay",position: "TE",nflTeam: "BUF",points: 0.00},
                    {name: "Martavis Bryant",position: "WR",nflTeam: "PIT",points: 1.00},
                    {name: "Chandler Catanzaro",position: "K",nflTeam: "ARI",points: 8.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 5.00}
                  ],
                  bench: [
                    {name: "Justin Forsett",position: "RB",nflTeam: "BAL",points: 0.00},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 5.90},
                    {name: "Tyrod Taylor",position: "QB",nflTeam: "BUF",points: 11.86},
                    {name: "Jordan Cameron",position: "TE",nflTeam: "MIA",points: 3.40},
                    {name: "Mike Wallace",position: "WR",nflTeam: "MIN",points: 1.10},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 0.00},
                  ]
                }
              },
            ]
          },

//2015_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2015/F7.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 70.54,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Kirk Cousins",position: "QB",nflTeam: "WAS",points: 19.04},
                    {name: "Shane Vereen",position: "RB",nflTeam: "NYG",points: 8.40},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 4.80},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "OAK",points: 9.40},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 9.90},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 0.00},
                    {name: "Marques Colston",position: "WR",nflTeam: "NO",points: 0.00},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 4.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 15.00}
                  ],
                  bench: [
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 0.00},
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 16.34},
                    {name: "Darren Sproles",position: "RB",nflTeam: "PHI",points: 10.40},
                    {name: "Ladarius Green",position: "TE",nflTeam: "SD",points: 0.00},
                    {name: "Melvin Gordon",position: "RB",nflTeam: "SD",points: 0.00},
                    {name: "Dan Bailey",position: "K",nflTeam: "DAL",points: 3.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 75.96,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 23.76},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 0.00},
                    {name: "Karlos Williams",position: "RB",nflTeam: "BUF",points: 8.70},
                    {name: "DeSean Jackson",position: "WR",nflTeam: "WAS",points: 0.00},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "BUF",points: 13.60},
                    {name: "Jacob Tamme",position: "TE",nflTeam: "ATL",points: 6.10},
                    {name: "Donte Moncrief",position: "WR",nflTeam: "IND",points: -0.20},
                    {name: "Steven Hauschka",position: "K",nflTeam: "SEA",points: 16.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 8.00}
                  ],
                  bench: [
                    {name: "Ryan Mathews",position: "RB",nflTeam: "PHI",points: 1.80},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 0.00},
                    {name: "Stefon Diggs",position: "WR",nflTeam: "MIN",points: 0.80},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 29.00},
                  ]
                }
              },
            ]
          },

//2015_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2015/F9.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 68.42,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 24.92},
                    {name: "Jeremy Hill",position: "RB",nflTeam: "CIN",points: 17.50},
                    {name: "Tevin Coleman",position: "RB",nflTeam: "ATL",points: 0.00},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 4.40},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 7.80},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 11.80},
                    {name: "Matt Jones",position: "RB",nflTeam: "WAS",points: 0.00},
                    {name: "Nick Folk",position: "K",nflTeam: "NYJ",points: 0.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 2.00}
                  ],
                  bench: [
                    {name: "Chris Johnson",position: "RB",nflTeam: "ARI",points: 0.00},
                    {name: "Joe Flacco",position: "QB",nflTeam: "BAL",points: 0.00},
                    {name: "Percy Harvin",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Vernon Davis",position: "TE",nflTeam: "DEN",points: 0.00},
                    {name: "Anquan Boldin",position: "WR",nflTeam: "SF",points: 13.10},
                    {name: "Pittsburgh Steelers",position: "DEF",nflTeam: "PIT",points: 19.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 51.10,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 0.00},
                    {name: "Matt Forte",position: "RB",nflTeam: "CHI",points: 17.00},
                    {name: "Duke Johnson",position: "RB",nflTeam: "CLE",points: 4.50},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 7.90},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 17.70},
                    {name: "Charles Clay",position: "TE",nflTeam: "BUF",points: 0.00},
                    {name: "Martavis Bryant",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Chandler Catanzaro",position: "K",nflTeam: "ARI",points: 0.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 4.00}
                  ],
                  bench: [
                    {name: "Justin Forsett",position: "RB",nflTeam: "BAL",points: 0.00},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 3.40},
                    {name: "Tyrod Taylor",position: "QB",nflTeam: "BUF",points: 18.38},
                    {name: "Jordan Cameron",position: "TE",nflTeam: "MIA",points: 6.60},
                    {name: "Mike Wallace",position: "WR",nflTeam: "MIN",points: 2.20},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 7.00},
                  ]
                }
              },
            ]
          },


//2015_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "",
            bowlArt: "artwork/2015/F11.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 80.22,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Philip Rivers",position: "QB",nflTeam: "SD",points: 15.62},
                    {name: "DeAngelo Williams",position: "RB",nflTeam: "PIT",points: 2.10},
                    {name: "Antonio Andrews",position: "RB",nflTeam: "TEN",points: 0.30},
                    {name: "Jeremy Maclin",position: "WR",nflTeam: "KC",points: 13.20},
                    {name: "Terrance Williams",position: "WR",nflTeam: "DAL",points: 17.30},
                    {name: "Tyler Eifert",position: "TE",nflTeam: "CIN",points: 11.10},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 4.60},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 12.00},
                    {name: "St. Louis Rams",position: "DEF",nflTeam: "STL",points: 4.00}
                  ],
                  bench: [
                    {name: "Sam Bradford",position: "QB",nflTeam: "PHI",points: 18.60},
                    {name: "Julius Thomas",position: "TE",nflTeam: "JAC",points: 1.20},
                    {name: "Benjamin Watson",position: "TE",nflTeam: "NO",points: 11.90},
                    {name: "Marquess Wilson",position: "WR",nflTeam: "CHI",points: 0.00},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "OAK",points: 5.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 8.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 58.78,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Brock Osweiler",position: "QB",nflTeam: "DEN",points: 7.28},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "PHI",points: 10.90},
                    {name: "Andre Williams",position: "RB",nflTeam: "NYG",points: 2.60},
                    {name: "Roddy White",position: "WR",nflTeam: "ATL",points: 1.00},
                    {name: "Kendall Wright",position: "WR",nflTeam: "TEN",points: 0.00},
                    {name: "Owen Daniels",position: "TE",nflTeam: "DEN",points: 1.50},
                    {name: "John Brown",position: "WR",nflTeam: "ARI",points: 4.50},
                    {name: "Josh Brown",position: "K",nflTeam: "NYG",points: 12.00},
                    {name: "Minnesota Vikings",position: "DEF",nflTeam: "MIN",points: 19.00}
                  ],
                  bench: [
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Peyton Manning",position: "QB",nflTeam: "DEN",points: 2.56},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 15.20},
                    {name: "Jameis Winston",position: "QB",nflTeam: "TB",points: 16.40},
                    {name: "DeVante Parker",position: "WR",nflTeam: "MIA",points: 16.60},
                    {name: "Marcus Mariota",position: "QB",nflTeam: "TEN",points: 0.00},
                  ]
                }
              },
            ]
          },
        ],
//END 2015 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2015!!!!!!!!!!!!!!!!!!!!!!!!!!END2015!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2015!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2015






//START YEAR 2014  COMPLETE

    2014: {
      format: "current",
      teams: {
        p1: {name: "cougars",owner: "Mike",art: "artwork/2014/p1.png"},
        p2: {name: "Dirty birds",owner: "Preston",art: "artwork/2014/p2.png"},
        p3: {name: "Tickle me Al-Mo",owner: "Cody",art: "artwork/2014/p3.png"},
        p4: {name: "Insane Clowney Posse",owner: "Jordan",art: "artwork/2014/p4.png"},
        p5: {name: "The Startled Penguins",owner: "Max",art: "artwork/2014/p5.png"},
        p6: {name: "How I Lucked Your Mother",owner: "Brycen",art: "artwork/2014/p6.png"},
        c1: {name: "Ronalbro's",owner: "Bailey",art: "artwork/2014/c1.png"},
        c2: {name: "Let me see some TD's",owner: "Sam",art: "artwork/2014/c2.png"},
        c3: {name: "Natty Ice",owner: "David",art: "artwork/2014/c3.png"},
        c4: {name: "Hate",owner: "Chris",art: "artwork/2014/c4.png"},
        c5: {name: "Vick's Dogs",owner: "Will",art: "artwork/2014/c5.png"},
        c6: {name: "Mattyice8",owner: "Matt",art: "artwork/2014/c6.png"}
      },

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "playoffs-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "p1"
          },

//2014_PQ1

{
  type: "matchup",
  id: "PQ1",
  round: "first",
  slot: "first-upper",
  roundName: "First Round",
  bowlName: "",
  bowlArt: "artwork/2014/PQ1.png",

  teams: [
    {
      teamId: "p4",
      seed: 4,
      score: 90.52,
      touchdowns: null,
      winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 11.42},
                    {name: "Arian Foster",position: "RB",nflTeam: "HOU",points: 11.70},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "CLE",points: 2.70},
                    {name: "Harry Douglas",position: "WR",nflTeam: "ATL",points: 13.10},
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 30.30},
                    {name: "Andrew Quarless",position: "TE",nflTeam: "GB",points: 0.70},
                    {name: "Bishop Sankey",position: "RB",nflTeam: "TEN",points: 2.60},
                    {name: "Cody Parkey",position: "K",nflTeam: "PHI",points: 9.00},
                    {name: "Detroit Lions",position: "DEF",nflTeam: "DET",points: 9.00}
                  ],
                  bench: [
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 0.00},
                    {name: "Malcom Floyd",position: "WR",nflTeam: "SD",points: 3.40},
                    {name: "Kendall Wright",position: "WR",nflTeam: "TEN",points: 0.00},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "BUF",points: 2.80},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 7.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 13.00},
                  ]
                }
    },

    {
      teamId: "p5",
      seed: 5,
      score: 98.20,
      touchdowns: null,
      winner: true,

                lineup: {
                  starters: [
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 22.00},
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 15.80},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "PIT",points: 23.90},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 4.90},
                    {name: "Jordan Matthews",position: "WR",nflTeam: "PHI",points: 0.00},
                    {name: "Coby Fleener",position: "TE",nflTeam: "IND",points: 3.20},
                    {name: "Kelvin Benjamin",position: "WR",nflTeam: "CAR",points: 10.40},
                    {name: "Adam Vinatieri",position: "K",nflTeam: "IND",points: 5.00},
                    {name: "New York Giants",position: "DEF",nflTeam: "NYG",points: 13.00}
                  ],
                  bench: [
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "MIA",points: 15.94},
                    {name: "Dwayne Allen",position: "TE",nflTeam: "IND",points: 7.60},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 9.90},
                    {name: "Andre Williams",position: "RB",nflTeam: "NYG",points: 5.30},
                    {name: "Terrance West",position: "RB",nflTeam: "CLE",points: 2.30},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 18.00},
                  ]
                }
    },
  ]
},



//2014_PQ2


          {
            type: "matchup",
            id: "PQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2014/PQ2.png",

            teams: [
              {
                teamId: "p3",
                seed: 3,
                score: 55.92,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Peyton Manning",position: "QB",nflTeam: "DEN",points: 13.02},
                    {name: "Steven Jackson",position: "RB",nflTeam: "ATL",points: 5.70},
                    {name: "Alfred Morris",position: "RB",nflTeam: "WAS",points: 4.90},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 5.50},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 5.30},
                    {name: "Martellus Bennett",position: "TE",nflTeam: "CHI",points: 5.60},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "SF",points: 1.90},
                    {name: "Randy Bullock",position: "K",nflTeam: "HOU",points: 6.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 8.00}
                  ],
                  bench: [
                    {name: "Percy Harvin",position: "WR",nflTeam: "NYJ",points: 1.00},
                    {name: "Jay Cutler",position: "QB",nflTeam: "CHI",points: 13.76},
                    {name: "Anquan Boldin",position: "WR",nflTeam: "SF",points: 2.30},
                    {name: "Ronnie Hillman",position: "RB",nflTeam: "DEN",points: 0.00},
                    {name: "Kerwynn Williams",position: "RB",nflTeam: "ARI",points: 8.60},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: 12.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 95.28,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 15.28},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "PHI",points: 6.50},
                    {name: "Frank Gore",position: "RB",nflTeam: "SF",points: 8.90},
                    {name: "Jeremy Maclin",position: "WR",nflTeam: "PHI",points: 9.80},
                    {name: "Roddy White",position: "WR",nflTeam: "ATL",points: 11.80},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 15.60},
                    {name: "DeSean Jackson",position: "WR",nflTeam: "WAS",points: 2.40},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 8.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 17.00}
                  ],
                  bench: [
                    {name: "Matt Asiata",position: "RB",nflTeam: "MIN",points: 14.60},
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 21.58},
                    {name: "Darren Sproles",position: "RB",nflTeam: "PHI",points: 7.30},
                    {name: "Bernard Pierce",position: "RB",nflTeam: "BAL",points: 3.70},
                    {name: "Brandon McManus",position: "K",nflTeam: "DEN",points: 0.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 7.00},
                  ]
                }
              },
            ]
          },

          {
            type: "bye",
            id: "playoffs-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "p2"
          },


//2014_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2014/PS1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 113.12,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 14.72},
                    {name: "Lamar Miller",position: "RB",nflTeam: "MIA",points: 21.00},
                    {name: "Eddie Lacy",position: "RB",nflTeam: "GB",points: 16.40},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "CHI",points: 13.20},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 3.80},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 3.10},
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 18.90},
                    {name: "Blair Walsh",position: "K",nflTeam: "MIN",points: 9.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 13.00}
                  ],
                  bench: [
                    {name: "Hakeem Nicks",position: "WR",nflTeam: "IND",points: 7.20},
                    {name: "Miles Austin",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 12.40},
                    {name: "Vincent Jackson",position: "WR",nflTeam: "TB",points: 6.00},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 11.50},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAC",points: 2.60},
                  ]
                }
              },
              {
                teamId: "p5",
                seed: 5,
                score: 85.94,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "MIA",points: 29.34},
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 23.30},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "PIT",points: 13.20},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 0.00},
                    {name: "Jordan Matthews",position: "WR",nflTeam: "PHI",points: 5.80},
                    {name: "Coby Fleener",position: "TE",nflTeam: "IND",points: 3.60},
                    {name: "Kelvin Benjamin",position: "WR",nflTeam: "CAR",points: 4.70},
                    {name: "Adam Vinatieri",position: "K",nflTeam: "IND",points: 1.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 5.00}
                  ],
                  bench: [
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 27.34},
                    {name: "Dwayne Allen",position: "TE",nflTeam: "IND",points: 0.00},
                    {name: "Joseph Randle",position: "RB",nflTeam: "DAL",points: 2.40},
                    {name: "Charles Johnson",position: "WR",nflTeam: "MIN",points: 3.80},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 1.10},
                    {name: "Andre Williams",position: "RB",nflTeam: "NYG",points: 11.00},
                  ]
                }
              },
            ]
          },



//2014_PS2
          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2014/PS2.png",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 91.92,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 11.32},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "DEN",points: 19.80},
                    {name: "Tre Mason",position: "RB",nflTeam: "STL",points: 14.30},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 13.30},
                    {name: "Brandon LaFell",position: "WR",nflTeam: "NE",points: 6.40},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "NO",points: 9.30},
                    {name: "Jonas Gray",position: "RB",nflTeam: "NE",points: 6.50},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 5.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 6.00}
                  ],
                  bench: [
                    {name: "Dan Herron",position: "RB",nflTeam: "IND",points: 4.00},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 0.00},
                    {name: "Josh Gordon",position: "WR",nflTeam: "CLE",points: 4.50},
                    {name: "Latavius Murray",position: "RB",nflTeam: "OAK",points: 10.80},
                    {name: "Martavis Bryant",position: "WR",nflTeam: "PIT",points: 5.30},
                    {name: "St. Louis Rams",position: "DEF",nflTeam: "STL",points: -3.00},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 88.06,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 0.36},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "PHI",points: 17.60},
                    {name: "Matt Asiata",position: "RB",nflTeam: "MIN",points: 21.70},
                    {name: "Jeremy Maclin",position: "WR",nflTeam: "PHI",points: 6.20},
                    {name: "Roddy White",position: "WR",nflTeam: "ATL",points: 5.50},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 9.10},
                    {name: "DeSean Jackson",position: "WR",nflTeam: "WAS",points: 12.60},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 14.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 1.00}
                  ],
                  bench: [
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 13.84},
                    {name: "Frank Gore",position: "RB",nflTeam: "SF",points: 21.80},
                    {name: "Darren Sproles",position: "RB",nflTeam: "PHI",points: 6.70},
                    {name: "Bernard Pierce",position: "RB",nflTeam: "BAL",points: -0.20},
                    {name: "Brandon McManus",position: "K",nflTeam: "DEN",points: 0.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 7.00},
                  ]
                }
              },
            ]
          },


//2014_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "artwork/2014/F1.png",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 100.04,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 24.44},
                    {name: "Lamar Miller",position: "RB",nflTeam: "MIA",points: 23.80},
                    {name: "Eddie Lacy",position: "RB",nflTeam: "GB",points: 10.60},
                    {name: "Alshon Jeffery",position: "WR",nflTeam: "CHI",points: 3.40},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 0.50},
                    {name: "Travis Kelce",position: "TE",nflTeam: "KC",points: 14.40},
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 6.90},
                    {name: "Blair Walsh",position: "K",nflTeam: "MIN",points: 7.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 9.00}
                  ],
                  bench: [
                    {name: "Hakeem Nicks",position: "WR",nflTeam: "IND",points: 4.60},
                    {name: "Miles Austin",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 16.98},
                    {name: "Vincent Jackson",position: "WR",nflTeam: "TB",points: 1.10},
                    {name: "Zach Ertz",position: "TE",nflTeam: "PHI",points: 5.60},
                    {name: "Allen Hurns",position: "WR",nflTeam: "JAC",points: 1.50},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 90.34,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 9.14},
                    {name: "Dan Herron",position: "RB",nflTeam: "IND",points: 6.60},
                    {name: "C.J. Anderson",position: "RB",nflTeam: "DEN",points: 28.70},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 21.90},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 0.00},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "NO",points: 5.40},
                    {name: "Devonta Freeman",position: "RB",nflTeam: "ATL",points: 1.60},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 9.00},
                    {name: "Philadelphia Eagles",position: "DEF",nflTeam: "PHI",points: 8.00}
                  ],
                  bench: [
                    {name: "Brandon LaFell",position: "WR",nflTeam: "NE",points: 8.30},
                    {name: "Josh Gordon",position: "WR",nflTeam: "CLE",points: 0.00},
                    {name: "Latavius Murray",position: "RB",nflTeam: "OAK",points: 9.70},
                    {name: "Tre Mason",position: "RB",nflTeam: "STL",points: 5.70},
                    {name: "Martavis Bryant",position: "WR",nflTeam: "PIT",points: 8.10},
                    {name: "St. Louis Rams",position: "DEF",nflTeam: "STL",points: 8.00},
                  ]
                }
              },
            ]
          },


//2014_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "artwork/2014/F3.png",

            teams: [
              {
                teamId: "p5",
                seed: 5,
                score: 91.16,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Ryan Tannehill",position: "QB",nflTeam: "MIA",points: 12.36},
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 13.60},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "PIT",points: 10.00},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 6.20},
                    {name: "Jordan Matthews",position: "WR",nflTeam: "PHI",points: 16.50},
                    {name: "Coby Fleener",position: "TE",nflTeam: "IND",points: 17.60},
                    {name: "Kelvin Benjamin",position: "WR",nflTeam: "CAR",points: 0.90},
                    {name: "Adam Vinatieri",position: "K",nflTeam: "IND",points: 9.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 5.00}
                  ],
                  bench: [
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 19.16},
                    {name: "Dwayne Allen",position: "TE",nflTeam: "IND",points: 0.00},
                    {name: "Joseph Randle",position: "RB",nflTeam: "DAL",points: 13.20},
                    {name: "Charles Johnson",position: "WR",nflTeam: "MIN",points: 1.10},
                    {name: "Jarvis Landry",position: "WR",nflTeam: "MIA",points: 5.50},
                    {name: "Andre Williams",position: "RB",nflTeam: "NYG",points: 12.20},
                  ]
                }
              },
              {
                teamId: "p6",
                seed: 6,
                score: 76.00,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 14.90},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "PHI",points: 11.40},
                    {name: "Matt Asiata",position: "RB",nflTeam: "MIN",points: 10.80},
                    {name: "Jeremy Maclin",position: "WR",nflTeam: "PHI",points: 4.90},
                    {name: "Roddy White",position: "WR",nflTeam: "ATL",points: 8.40},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 0.00},
                    {name: "DeSean Jackson",position: "WR",nflTeam: "WAS",points: 14.60},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 3.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 8.00}
                  ],
                  bench: [
                    {name: "Alex Smith",position: "QB",nflTeam: "KC",points: 0.00},
                    {name: "Frank Gore",position: "RB",nflTeam: "SF",points: 14.90},
                    {name: "Darren Sproles",position: "RB",nflTeam: "PHI",points: 2.80},
                    {name: "Bernard Pierce",position: "RB",nflTeam: "BAL",points: 0.80},
                    {name: "Brandon McManus",position: "K",nflTeam: "DEN",points: 0.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 9.00},
                  ]
                }
              },
            ]
          },


//2014_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-fifth",
            roundName: "Fifth Place Game",
            bowlName: "",
            bowlArt: "artwork/2014/F5.png",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 73.96,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 8.26},
                    {name: "Arian Foster",position: "RB",nflTeam: "HOU",points: 9.30},
                    {name: "Isaiah Crowell",position: "RB",nflTeam: "CLE",points: 2.20},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 5.80},
                    {name: "Odell Beckham",position: "WR",nflTeam: "NYG",points: 24.50},
                    {name: "Andrew Quarless",position: "TE",nflTeam: "GB",points: 0.00},
                    {name: "Malcom Floyd",position: "WR",nflTeam: "SD",points: 2.90},
                    {name: "Cody Parkey",position: "K",nflTeam: "PHI",points: 10.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 11.00}
                  ],
                  bench: [
                    {name: "Harry Douglas",position: "WR",nflTeam: "ATL",points: 2.80},
                    {name: "Kendall Wright",position: "WR",nflTeam: "TEN",points: 7.90},
                    {name: "Sammy Watkins",position: "WR",nflTeam: "BUF",points: 6.20},
                    {name: "Bishop Sankey",position: "RB",nflTeam: "TEN",points: -0.20},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 4.00},
                    {name: "Detroit Lions",position: "DEF",nflTeam: "DET",points: 4.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 77.22,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Peyton Manning",position: "QB",nflTeam: "DEN",points: 8.42},
                    {name: "Alfred Morris",position: "RB",nflTeam: "WAS",points: 6.20},
                    {name: "Kerwynn Williams",position: "RB",nflTeam: "ARI",points: 6.70},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 8.60},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "DEN",points: 7.30},
                    {name: "Martellus Bennett",position: "TE",nflTeam: "CHI",points: 5.90},
                    {name: "Anquan Boldin",position: "WR",nflTeam: "SF",points: 14.10},
                    {name: "Randy Bullock",position: "K",nflTeam: "HOU",points: 3.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 17.00}
                  ],
                  bench: [
                    {name: "Michael Crabtree",position: "WR",nflTeam: "SF",points: 4.10},
                    {name: "Percy Harvin",position: "WR",nflTeam: "NYJ",points: 0.00},
                    {name: "Jay Cutler",position: "QB",nflTeam: "CHI",points: 10.78},
                    {name: "Steven Jackson",position: "RB",nflTeam: "ATL",points: 0.00},
                    {name: "Ronnie Hillman",position: "RB",nflTeam: "DEN",points: 5.80},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: 10.00},
                  ]
                }
              },
            ]
          },
        ],


//END 2014 Playoffs

        connections: [
          {
            from: "playoffs-bye-1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "PQ1",
            to: "PS1",
            result: "winner"
          },
          {
            from: "playoffs-bye-2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PQ2",
            to: "PS2",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          },
          {
            from: "PQ1",
            to: "F5",
            result: "loser"
          },
          {
            from: "PQ2",
            to: "F5",
            result: "loser"
          }
        ]
      },

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "first", label: "First Round" },
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [
          {
            type: "bye",
            id: "consolation-bye-1",
            round: "first",
            slot: "bye-top",
            seed: 1,
            teamId: "c1"
          },

//2014_CQ1

          {
            type: "matchup",
            id: "CQ1",
            round: "first",
            slot: "first-upper",
            roundName: "First Round",
            bowlName: "First Round",
            bowlArt: "artwork/2014/CQ1.png",


            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 68.68,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Jake Locker",position: "QB",nflTeam: "TEN",points: 2.98},
                    {name: "Jamaal Charles",position: "RB",nflTeam: "KC",points: 5.30},
                    {name: "Jeremy Hill",position: "RB",nflTeam: "CIN",points: 27.20},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 10.30},
                    {name: "Torrey Smith",position: "WR",nflTeam: "BAL",points: 1.60},
                    {name: "Julius Thomas",position: "TE",nflTeam: "DEN",points: 3.00},
                    {name: "Rashad Jennings",position: "RB",nflTeam: "NYG",points: 0.30},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 8.00},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 10.00}
                  ],
                  bench: [
                    {name: "Jermaine Gresham",position: "TE",nflTeam: "CIN",points: 0.00},
                    {name: "Owen Daniels",position: "TE",nflTeam: "BAL",points: 12.20},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 3.00},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: -2.00},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 94.40,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tony Romo",position: "QB",nflTeam: "DAL",points: 20.50},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 11.90},
                    {name: "Reggie Bush",position: "RB",nflTeam: "DET",points: 1.70},
                    {name: "Mike Wallace",position: "WR",nflTeam: "MIA",points: 16.40},
                    {name: "Keenan Allen",position: "WR",nflTeam: "SD",points: 1.80},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 11.40},
                    {name: "Steve Smith",position: "WR",nflTeam: "BAL",points: 3.70},
                    {name: "Shayne Graham",position: "K",nflTeam: "NO",points: 7.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 20.00}
                  ],
                  bench: [
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 15.40},
                    {name: "Robert Griffin III",position: "QB",nflTeam: "WAS",points: 16.04},
                    {name: "Rueben Randle",position: "WR",nflTeam: "NYG",points: 3.00},
                    {name: "Montee Ball",position: "RB",nflTeam: "DEN",points: 0.00},
                    {name: "Branden Oliver",position: "RB",nflTeam: "SD",points: 7.00},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "OAK",points: 9.00},
                  ]
                }
              },
            ]
          },

//2014_CQ2

          {
            type: "matchup",
            id: "CQ2",
            round: "first",
            slot: "first-lower",
            roundName: "First Round",
            bowlName: "",
            bowlArt: "artwork/2014/CQ2.png",

            teams: [
              {
                teamId: "c3",
                seed: 3,
                score: 91.40,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 21.10},
                    {name: "Matt Forte",position: "RB",nflTeam: "CHI",points: 9.90},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 10.30},
                    {name: "Eric Decker",position: "WR",nflTeam: "NYJ",points: 10.00},
                    {name: "Michael Floyd",position: "WR",nflTeam: "ARI",points: 5.50},
                    {name: "Charles Clay",position: "TE",nflTeam: "MIA",points: 5.90},
                    {name: "Kenny Stills",position: "WR",nflTeam: "NO",points: 6.70},
                    {name: "Dan Bailey",position: "K",nflTeam: "DAL",points: 8.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 14.00}
                  ],
                  bench: [
                    {name: "Brian Hartline",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 11.00},
                    {name: "Philip Rivers",position: "QB",nflTeam: "SD",points: 9.58},
                    {name: "Fred Jackson",position: "RB",nflTeam: "BUF",points: 9.80},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 12.30},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 13.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 47.24,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Colin Kaepernick",position: "QB",nflTeam: "SF",points: 10.24},
                    {name: "Joique Bell",position: "RB",nflTeam: "DET",points: 10.30},
                    {name: "Trent Richardson",position: "RB",nflTeam: "IND",points: 4.10},
                    {name: "Pierre Garcon",position: "WR",nflTeam: "WAS",points: 3.60},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 5.30},
                    {name: "Delanie Walker",position: "TE",nflTeam: "TEN",points: 9.30},
                    {name: "Reggie Wayne",position: "WR",nflTeam: "IND",points: 0.40},
                    {name: "Phil Dawson",position: "K",nflTeam: "SF",points: 1.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 3.00}
                  ],
                  bench: [
                    {name: "Joe Flacco",position: "QB",nflTeam: "BAL",points: 13.64},
                    {name: "Marques Colston",position: "WR",nflTeam: "NO",points: 12.50},
                    {name: "James Jones",position: "WR",nflTeam: "OAK",points: 11.70},
                    {name: "Brent Celek",position: "TE",nflTeam: "PHI",points: 3.20},
                    {name: "Chris Ivory",position: "RB",nflTeam: "NYJ",points: 8.60},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 16.00},
                  ]
                }
              },
            ]
          },


          {
            type: "bye",
            id: "consolation-bye-2",
            round: "first",
            slot: "bye-bottom",
            seed: 2,
            teamId: "c2"
          },

//2014_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2014/CS1.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 56.18,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Johnny Manziel",position: "QB",nflTeam: "CLE",points: 1.58},
                    {name: "Darren McFadden",position: "RB",nflTeam: "OAK",points: 5.40},
                    {name: "Justin Forsett",position: "RB",nflTeam: "BAL",points: 3.20},
                    {name: "Riley Cooper",position: "WR",nflTeam: "PHI",points: 17.30},
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "CIN",points: 1.60},
                    {name: "Larry Donnell",position: "TE",nflTeam: "NYG",points: 4.20},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 4.90},
                    {name: "Caleb Sturgis",position: "K",nflTeam: "MIA",points: 5.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 13.00}
                  ],
                  bench: [
                    {name: "Ray Rice",position: "RB",nflTeam: "FA",points: 0.00},
                    {name: "Eddie Royal",position: "WR",nflTeam: "SD",points: 15.40},
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 5.92},
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 14.34},
                    {name: "DeAngelo Williams",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Andre Johnson",position: "WR",nflTeam: "HOU",points: 6.50},
                  ]
                }
              },
              {
                teamId: "c5",
                seed: 5,
                score: 102.72,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tony Romo",position: "QB",nflTeam: "DAL",points: 27.52},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 11.50},
                    {name: "Reggie Bush",position: "RB",nflTeam: "DET",points: 15.80},
                    {name: "Mike Wallace",position: "WR",nflTeam: "MIA",points: 17.80},
                    {name: "Keenan Allen",position: "WR",nflTeam: "SD",points: 0.00},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 21.20},
                    {name: "Steve Smith",position: "WR",nflTeam: "BAL",points: 4.90},
                    {name: "Shayne Graham",position: "K",nflTeam: "NO",points: 2.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 2.00}
                  ],
                  bench: [
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Robert Griffin III",position: "QB",nflTeam: "WAS",points: 7.90},
                    {name: "Rueben Randle",position: "WR",nflTeam: "NYG",points: 19.20},
                    {name: "Montee Ball",position: "RB",nflTeam: "DEN",points: 0.00},
                    {name: "Branden Oliver",position: "RB",nflTeam: "SD",points: 8.10},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "OAK",points: 14.00},
                  ]
                }
              },
            ]
          },

//2014_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "artwork/2014/CS2.png",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 97.98,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jordan Love",position: "QB",nflTeam: "GB",points: 13.94},
                    {name: "Brian Robinson",position: "RB",nflTeam: "ATL",points: 29.50},
                    {name: "Omarion Hampton",position: "RB",nflTeam: "LAC",points: 7.50},
                    {name: "Davante Adams",position: "WR",nflTeam: "LAR",points: 11.10},
                    {name: "Jamaar Chase",position: "WR",nflTeam: "CIN",points: 23.20},
                    {name: "Dallas Goedert",position: "TE",nflTeam: "PHI",points: 25.00},
                    {name: "Michael Wilson",position: "WR",nflTeam: "ARI",points: 16.40},
                    {name: "Evan McPherson",position: "K",nflTeam: "CIN",points: 0.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 1.00}
                  ],

                  bench: [
                    {name: "Aaron Jones",position: "RB",nflTeam: "MIN",points: 9.50},
                    {name: "Jordan Mason",position: "RB",nflTeam: "MIN",points: 2.90},
                    {name: "Jayden Reed",position: "WR",nflTeam: "GB",points: 10.50},
                    {name: "Quentin Johnston",position: "WR",nflTeam: "LAC",points: 0.00},
                    {name: "Tetalroa McMillan",position: "WR",nflTeam: "CAR",points: 4.50},
                    {name: "Oronde Gadsen",position: "TE",nflTeam: "LAC",points: 10.10},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 77.58,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 10.28},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "DAL",points: 11.80},
                    {name: "Shane Vereen",position: "RB",nflTeam: "NE",points: 5.00},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 11.50},
                    {name: "Calvin Johnson",position: "WR",nflTeam: "DET",points: 10.30},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 15.00},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 13.10},
                    {name: "Steven Hauschka",position: "K",nflTeam: "SEA",points: 5.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 16.00}
                  ],
                  bench: [
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "NE",points: 0.00},
                    {name: "Andre Ellington",position: "RB",nflTeam: "ARI",points: 0.00},
                    {name: "Stepfan Taylor",position: "RB",nflTeam: "ARI",points: 4.40},
                    {name: "Jordan Reed",position: "TE",nflTeam: "WAS",points: 0.50},
                    {name: "John Brown",position: "WR",nflTeam: "ARI",points: 5.40},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 6.00},
                  ]
                }
              },
            ]
          },

//2014_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "artwork/2014/F7.png",

            teams: [
              {
                teamId: "c5",
                seed: 5,
                score: 64.86,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Tony Romo",position: "QB",nflTeam: "DAL",points: 17.96},
                    {name: "Mark Ingram",position: "RB",nflTeam: "NO",points: 12.10},
                    {name: "Reggie Bush",position: "RB",nflTeam: "DET",points: 4.10},
                    {name: "Mike Wallace",position: "WR",nflTeam: "MIA",points: 0.00},
                    {name: "Keenan Allen",position: "WR",nflTeam: "SD",points: 0.00},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 6.70},
                    {name: "Steve Smith",position: "WR",nflTeam: "BAL",points: 9.00},
                    {name: "Shayne Graham",position: "K",nflTeam: "NO",points: 3.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 12.00}
                  ],
                  bench: [
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Robert Griffin III",position: "QB",nflTeam: "WAS",points: 19.34},
                    {name: "Rueben Randle",position: "WR",nflTeam: "NYG",points: 15.80},
                    {name: "Montee Ball",position: "RB",nflTeam: "DEN",points: 0.00},
                    {name: "Branden Oliver",position: "RB",nflTeam: "SD",points: 13.50},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "OAK",points: 2.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 100.30,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 4.10},
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "NE",points: 6.20},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "DAL",points: 18.10},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 11.50},
                    {name: "Calvin Johnson",position: "WR",nflTeam: "DET",points: 15.90},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 4.90},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 18.60},
                    {name: "Steven Hauschka",position: "K",nflTeam: "SEA",points: 8.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 13.00}
                  ],
                  bench: [
                    {name: "Shane Vereen",position: "RB",nflTeam: "NE",points: 1.50},
                    {name: "Andre Ellington",position: "RB",nflTeam: "ARI",points: 0.00},
                    {name: "Stepfan Taylor",position: "RB",nflTeam: "ARI",points: 2.60},
                    {name: "Jordan Reed",position: "TE",nflTeam: "WAS",points: 5.00},
                    {name: "John Brown",position: "WR",nflTeam: "ARI",points: 5.10},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 2.00},
                  ]
                }
              },
            ]
          },

//2014_F9

          {
            type: "matchup",
            id: "F9",
            round: "finals",
            slot: "final-third",
            roundName: "Ninth Place Game",
            bowlName: "",
            bowlArt: "artwork/2014/F9.png",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 63.80,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Johnny Manziel",position: "QB",nflTeam: "CLE",points: 0.00},
                    {name: "Darren McFadden",position: "RB",nflTeam: "OAK",points: 1.90},
                    {name: "Justin Forsett",position: "RB",nflTeam: "BAL",points: 13.60},
                    {name: "Riley Cooper",position: "WR",nflTeam: "PHI",points: 3.70},
                    {name: "Mohamed Sanu",position: "WR",nflTeam: "CIN",points: 1.60},
                    {name: "Larry Donnell",position: "TE",nflTeam: "NYG",points: 2.60},
                    {name: "Mike Evans",position: "WR",nflTeam: "TB",points: 11.40},
                    {name: "Caleb Sturgis",position: "K",nflTeam: "MIA",points: 6.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 23.00}
                  ],
                  bench: [
                    {name: "Ray Rice",position: "RB",nflTeam: "FA",points: 0.00},
                    {name: "Eddie Royal",position: "WR",nflTeam: "SD",points: 9.50},
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 21.58},
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 14.56},
                    {name: "DeAngelo Williams",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Andre Johnson",position: "WR",nflTeam: "HOU",points: 19.40},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 122.90,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 7.00},
                    {name: "Matt Forte",position: "RB",nflTeam: "CHI",points: 7.40},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 12.40},
                    {name: "Eric Decker",position: "WR",nflTeam: "NYJ",points: 28.10},
                    {name: "Michael Floyd",position: "WR",nflTeam: "ARI",points: 27.30},
                    {name: "Charles Clay",position: "TE",nflTeam: "MIA",points: 10.50},
                    {name: "Kenny Stills",position: "WR",nflTeam: "NO",points: 8.20},
                    {name: "Dan Bailey",position: "K",nflTeam: "DAL",points: 14.00},
                    {name: "New Orleans Saints",position: "DEF",nflTeam: "NO",points: 8.00}
                  ],
                  bench: [
                    {name: "Brian Hartline",position: "WR",nflTeam: "MIA",points: 9.40},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 2.70},
                    {name: "Philip Rivers",position: "QB",nflTeam: "SD",points: 5.84},
                    {name: "Fred Jackson",position: "RB",nflTeam: "BUF",points: 6.20},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 18.80},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 2.00},
                  ]
                }
              },
            ]
          },


//2014_F11

          {
            type: "matchup",
            id: "F11",
            round: "finals",
            slot: "final-fifth",
            roundName: "Last Place Game",
            bowlName: "",
            bowlArt: "artwork/2014/F11.png",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 80.40,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Jake Locker",position: "QB",nflTeam: "TEN",points: 0.00},
                    {name: "Jamaal Charles",position: "RB",nflTeam: "KC",points: 6.20},
                    {name: "Jeremy Hill",position: "RB",nflTeam: "CIN",points: 11.00},
                    {name: "Golden Tate",position: "WR",nflTeam: "DET",points: 4.50},
                    {name: "Torrey Smith",position: "WR",nflTeam: "BAL",points: 14.30},
                    {name: "Julius Thomas",position: "TE",nflTeam: "DEN",points: 0.00},
                    {name: "Rashad Jennings",position: "RB",nflTeam: "NYG",points: 5.40},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 8.00},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 31.00}
                  ],
                  bench: [
                    {name: "Jermaine Gresham",position: "TE",nflTeam: "CIN",points: 8.00},
                    {name: "Owen Daniels",position: "TE",nflTeam: "BAL",points: 4.60},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 2.90},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: -1.00},
                  ]
                }
              },
              {
                teamId: "c6",
                seed: 6,
                score: 73.26,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Colin Kaepernick",position: "QB",nflTeam: "SF",points: 22.46},
                    {name: "Joique Bell",position: "RB",nflTeam: "DET",points: 6.00},
                    {name: "Trent Richardson",position: "RB",nflTeam: "IND",points: 2.00},
                    {name: "Pierre Garcon",position: "WR",nflTeam: "WAS",points: 5.30},
                    {name: "Doug Baldwin",position: "WR",nflTeam: "SEA",points: 5.10},
                    {name: "Delanie Walker",position: "TE",nflTeam: "TEN",points: 4.30},
                    {name: "Reggie Wayne",position: "WR",nflTeam: "IND",points: 9.10},
                    {name: "Phil Dawson",position: "K",nflTeam: "SF",points: 10.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 9.00}
                  ],
                  bench: [
                    {name: "Joe Flacco",position: "QB",nflTeam: "BAL",points: 20.58},
                    {name: "Marques Colston",position: "WR",nflTeam: "NO",points: 11.10},
                    {name: "James Jones",position: "WR",nflTeam: "OAK",points: 1.70},
                    {name: "Brent Celek",position: "TE",nflTeam: "PHI",points: 6.10},
                    {name: "Chris Ivory",position: "RB",nflTeam: "NYJ",points: 9.70},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 17.00},
                  ]
                }
              },
            ]
          },
        ],
//END 2014 CONSOLATION

        connections: [
          {
            from: "consolation-bye-1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "CQ1",
            to: "CS1",
            result: "winner"
          },
          {
            from: "consolation-bye-2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CQ2",
            to: "CS2",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F7",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F9",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F9",
            result: "loser"
          },
          {
            from: "CQ1",
            to: "F11",
            result: "loser"
          },
          {
            from: "CQ2",
            to: "F11",
            result: "loser"
          }
        ]
      }
    },



//END2014!!!!!!!!!!!!!!!!!!!!!!!!!!END2014!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2014!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!END2014








//START YEAR 2013

    2013: {
      format: "old",

      teams: {
        p1: {name: "cougars",owner: "Mike",art: "artwork/2013/p1.png"},
        p2: {name: "Squad",owner: "Chris",art: "artwork/2013/p2.png"},
        p3: {name: "David Sucks Wang",owner: "Brycen",art: "artwork/2013/p3.png"},
        p4: {name: "Dirty birds",owner: "Preston",art: "artwork/2013/p4.png"},
        c1: {name: "Meyeahs",owner: "Stewart",art: "artwork/2013/c1.png"},
        c2: {name: "Wangles",owner: "Bailey",art: "artwork/2013/c2.png"},
        c3: {name: "Wilfredo's Pasta",owner: "Will",art: "artwork/2013/c3.png"},
        c4: {name: "Natty Ice",owner: "David",art: "artwork/2013/c4.png"}
      },


//START 2013 PLAYOFFS

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [


//2013_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 77.74,
                touchdowns: null,
                winner: false,

                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 12.14},
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 7.60},
                    {name: "Reggie Bush",position: "RB",nflTeam: "DET",points: 2.40},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 21.70},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 10.50},
                    {name: "Charles Clay",position: "TE",nflTeam: "MIA",points: 3.20},
                    {name: "Kendall Wright",position: "WR",nflTeam: "TEN",points: 2.20},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 7.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 11.00}
                  ],
                  bench: [
                    {name: "Harry Douglas",position: "WR",nflTeam: "ATL",points: 4.60},
                    {name: "Daniel Thomas",position: "RB",nflTeam: "MIA",points: 0.90},
                    {name: "Denarius Moore",position: "WR",nflTeam: "OAK",points: 1.70},
                    {name: "Coby Fleener",position: "TE",nflTeam: "IND",points: 0.80},
                    {name: "Eddie Lacy",position: "RB",nflTeam: "GB",points: 21.00},
                    {name: "St. Louis Rams",position: "DEF",nflTeam: "STL",points: 15.00},
                  ]
                }


              },
              {
                teamId: "p4",
                seed: 4,
                score: 104.90,
                touchdowns: null,
                winner: true,

                lineup: {
                  starters: [
                    {name: "Nick Foles",position: "QB",nflTeam: "PHI",points: 18.90},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "DAL",points: 23.10},
                    {name: "Frank Gore",position: "RB",nflTeam: "SF",points: 16.30},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 13.30},
                    {name: "Josh Gordon",position: "WR",nflTeam: "CLE",points: 11.90},
                    {name: "Julius Thomas",position: "TE",nflTeam: "DEN",points: 13.80},
                    {name: "Keenan Allen",position: "WR",nflTeam: "SD",points: 6.60},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 1.00},
                    {name: "Cleveland Browns",position: "DEF",nflTeam: "CLE",points: 0.00}
                  ],
                  bench: [
                    {name: "Knowshon Moreno",position: "RB",nflTeam: "DEN",points: 10.20},
                    {name: "Dwayne Bowe",position: "WR",nflTeam: "KC",points: 4.60},
                    {name: "Vincent Jackson",position: "WR",nflTeam: "TB",points: 9.80},
                    {name: "Andre Brown",position: "RB",nflTeam: "NYG",points: 3.40},
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 14.14},
                    {name: "Bobby Rainey",position: "RB",nflTeam: "TB",points: 8.10},
                  ]
                }
              },
            ]
          },


//2013_PS2

          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 100.58,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Colin Kaepernick",position: "QB",nflTeam: "SF",points: 22.98},
                    {name: "Rashad Jennings",position: "RB",nflTeam: "OAK",points: 7.20},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "MIN",points: 4.70},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 4.60},
                    {name: "Torrey Smith",position: "WR",nflTeam: "BAL",points: 6.90},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "NO",points: 13.30},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "PIT",points: 16.90},
                    {name: "Matt Prater",position: "K",nflTeam: "DEN",points: 13.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 11.00}
                  ],
                  bench: [
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Shane Vereen",position: "RB",nflTeam: "NE",points: 7.00},
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 10.88},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 6.70},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 14.00},
                    {name: "Oakland Raiders",position: "DEF",nflTeam: "OAK",points: 7.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 114.62,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 9.52},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "PHI",points: 28.20},
                    {name: "Alfred Morris",position: "RB",nflTeam: "WAS",points: 14.80},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "SF",points: 10.20},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 1.80},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 4.20},
                    {name: "Ryan Mathews",position: "RB",nflTeam: "SD",points: 17.90},
                    {name: "Adam Vinatieri",position: "K",nflTeam: "IND",points: 11.00},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: 17.00}
                  ],
                  bench: [
                    {name: "Jordan Cameron",position: "TE",nflTeam: "CLE",points: 0.00},
                    {name: "DeAngelo Williams",position: "RB",nflTeam: "CAR",points: 12.70},
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 19.98},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 5.20},
                    {name: "Lamar Miller",position: "RB",nflTeam: "MIA",points: 0.80},
                    {name: "Terrance Williams",position: "WR",nflTeam: "DAL",points: 8.40},
                  ]
                }
              },
            ]
          },


//2013_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 65.32,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Nick Foles",position: "QB",nflTeam: "PHI",points: 16.02},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "DAL",points: 6.70},
                    {name: "Frank Gore",position: "RB",nflTeam: "SF",points: 1.40},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 15.90},
                    {name: "Josh Gordon",position: "WR",nflTeam: "CLE",points: 8.20},
                    {name: "Julius Thomas",position: "TE",nflTeam: "DEN",points: 3.60},
                    {name: "Vincent Jackson",position: "WR",nflTeam: "TB",points: 3.50},
                    {name: "Justin Tucker",position: "K",nflTeam: "BAL",points: 9.00},
                    {name: "Miami Dolphins",position: "DEF",nflTeam: "MIA",points: 1.00}
                  ],
                  bench: [
                    {name: "Knowshon Moreno",position: "RB",nflTeam: "DEN",points: 12.40},
                    {name: "Dwayne Bowe",position: "WR",nflTeam: "KC",points: 0.00},
                    {name: "Andre Brown",position: "RB",nflTeam: "NYG",points: -0.90},
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 15.98},
                    {name: "Bobby Rainey",position: "RB",nflTeam: "TB",points: 3.60},
                    {name: "Keenan Allen",position: "WR",nflTeam: "SD",points: 8.90},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 98.28,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 10.78},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "PHI",points: 19.40},
                    {name: "Alfred Morris",position: "RB",nflTeam: "WAS",points: 6.30},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "SF",points: 2.90},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 11.30},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 9.10},
                    {name: "Ryan Mathews",position: "RB",nflTeam: "SD",points: 15.50},
                    {name: "Adam Vinatieri",position: "K",nflTeam: "IND",points: 12.00},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: 11.00}
                  ],
                  bench: [
                    {name: "Jordan Cameron",position: "TE",nflTeam: "CLE",points: 6.90},
                    {name: "DeAngelo Williams",position: "RB",nflTeam: "CAR",points: 8.80},
                    {name: "Ben Roethlisberger",position: "QB",nflTeam: "PIT",points: 8.06},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 15.50},
                    {name: "Lamar Miller",position: "RB",nflTeam: "MIA",points: 7.70},
                    {name: "Terrance Williams",position: "WR",nflTeam: "DAL",points: 3.90},
                  ]
                }
              },
            ]
          },




//2013_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 130.84,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 38.04},
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 16.10},
                    {name: "Reggie Bush",position: "RB",nflTeam: "DET",points: 12.50},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 12.10},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 8.70},
                    {name: "Charles Clay",position: "TE",nflTeam: "MIA",points: 4.30},
                    {name: "Eddie Lacy",position: "RB",nflTeam: "GB",points: 14.10},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 9.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 16.00}
                  ],
                  bench: [
                    {name: "Harry Douglas",position: "WR",nflTeam: "ATL",points: 5.80},
                    {name: "Daniel Thomas",position: "RB",nflTeam: "MIA",points: 0.00},
                    {name: "Denarius Moore",position: "WR",nflTeam: "OAK",points: 6.30},
                    {name: "Coby Fleener",position: "TE",nflTeam: "IND",points: 2.50},
                    {name: "St. Louis Rams",position: "DEF",nflTeam: "STL",points: 4.00},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 95.08,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 8.58},
                    {name: "Rashad Jennings",position: "RB",nflTeam: "OAK",points: 1.70},
                    {name: "Giovani Bernard",position: "RB",nflTeam: "CIN",points: 7.30},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 16.10},
                    {name: "Torrey Smith",position: "WR",nflTeam: "BAL",points: 2.70},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "NO",points: 13.10},
                    {name: "Le'Veon Bell",position: "RB",nflTeam: "PIT",points: 15.60},
                    {name: "Matt Prater",position: "K",nflTeam: "DEN",points: 12.00},
                    {name: "Carolina Panthers",position: "DEF",nflTeam: "CAR",points: 18.00}
                  ],
                  bench: [
                    {name: "Colin Kaepernick",position: "QB",nflTeam: "SF",points: 22.80},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 17.50},
                    {name: "Shane Vereen",position: "RB",nflTeam: "NE",points: 10.50},
                    {name: "Adrian Peterson",position: "RB",nflTeam: "MIN",points: 0.00},
                    {name: "Oakland Raiders",position: "DEF",nflTeam: "OAK",points: 2.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 6.00},
                  ]
                }
              },
            ]
          },

        ],


//END 2013 PLAYOFFS

        connections: [
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          }
        ]
      },


//START 2013 CONSOLATION

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [


//2013_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 60.04,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 9.84},
                    {name: "Chris Johnson",position: "RB",nflTeam: "TEN",points: 9.30},
                    {name: "Fred Jackson",position: "RB",nflTeam: "BUF",points: 17.80},
                    {name: "Stevie Johnson",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "PIT",points: 6.70},
                    {name: "Scott Chandler",position: "TE",nflTeam: "BUF",points: 3.10},
                    {name: "Calvin Johnson",position: "WR",nflTeam: "DET",points: 4.30},
                    {name: "Garrett Hartley",position: "K",nflTeam: "FA",points: 0.00},
                    {name: "Detroit Lions",position: "DEF",nflTeam: "DET",points: 9.00}
                  ],
                  bench: [
                    {name: "Jermichael Finley",position: "TE",nflTeam: "GB",points: 0.00},
                    {name: "Maurice Jones-Drew",position: "RB",nflTeam: "JAC",points: 6.90},
                    {name: "Michael Vick",position: "QB",nflTeam: "PHI",points: -0.20},
                    {name: "Mike Tolbert",position: "RB",nflTeam: "CAR",points: 0.60},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 11.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 2.00},
                  ]
                }
              },
              {
                teamId: "c4",
                seed: 4,
                score: 83.20,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Robert Griffin III",position: "QB",nflTeam: "WAS",points: 0.00},
                    {name: "Jamaal Charles",position: "RB",nflTeam: "KC",points: 20.40},
                    {name: "C.J. Spiller",position: "RB",nflTeam: "BUF",points: 10.30},
                    {name: "Riley Cooper",position: "WR",nflTeam: "PHI",points: 11.30},
                    {name: "Steve Smith",position: "WR",nflTeam: "CAR",points: 4.40},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 3.50},
                    {name: "Rashard Mendenhall",position: "RB",nflTeam: "ARI",points: 8.30},
                    {name: "David Akers",position: "K",nflTeam: "DET",points: 4.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 21.00}
                  ],
                  bench: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 17.92},
                    {name: "Jared Cook",position: "TE",nflTeam: "STL",points: 2.70},
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "NE",points: 19.60},
                    {name: "Victor Cruz",position: "WR",nflTeam: "NYG",points: 0.00},
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 1.00},
                  ]
                }
              },
            ]
          },


//2013_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 91.18,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 6.78},
                    {name: "Pierre Thomas",position: "RB",nflTeam: "NO",points: 1.50},
                    {name: "Trent Richardson",position: "RB",nflTeam: "IND",points: 5.80},
                    {name: "Pierre Garcon",position: "WR",nflTeam: "WAS",points: 20.40},
                    {name: "Andre Johnson",position: "WR",nflTeam: "HOU",points: 6.30},
                    {name: "Tony Gonzalez",position: "TE",nflTeam: "ATL",points: 12.30},
                    {name: "Eric Decker",position: "WR",nflTeam: "DEN",points: 25.10},
                    {name: "Blair Walsh",position: "K",nflTeam: "MIN",points: 2.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 11.00}
                  ],
                  bench: [
                    {name: "BenJarvus Green-Ellis",position: "RB",nflTeam: "CIN",points: 9.40},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 7.70},
                    {name: "Golden Tate",position: "WR",nflTeam: "SEA",points: 3.40},
                    {name: "Case Keenum",position: "QB",nflTeam: "HOU",points: 0.00},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 0.80},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 19.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 58.34,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Tony Romo",position: "QB",nflTeam: "DAL",points: 14.94},
                    {name: "Matt Forte",position: "RB",nflTeam: "CHI",points: 5.40},
                    {name: "Danny Woodhead",position: "RB",nflTeam: "SD",points: 6.80},
                    {name: "Brandon LaFell",position: "WR",nflTeam: "CAR",points: 1.30},
                    {name: "Mike Wallace",position: "WR",nflTeam: "MIA",points: 3.80},
                    {name: "Vernon Davis",position: "TE",nflTeam: "SF",points: 0.00},
                    {name: "DeSean Jackson",position: "WR",nflTeam: "PHI",points: 4.10},
                    {name: "Phil Dawson",position: "K",nflTeam: "SF",points: 10.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 12.00}
                  ],
                  bench: [
                    {name: "Martellus Bennett",position: "TE",nflTeam: "CHI",points: 8.50},
                    {name: "Brandon Marshall",position: "WR",nflTeam: "CHI",points: 9.60},
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 12.04},
                    {name: "Andre Ellington",position: "RB",nflTeam: "ARI",points: 7.20},
                    {name: "Ryan Succop",position: "K",nflTeam: "KC",points: 1.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 28.00},
                  ]
                }
              },
            ]
          },


//2013_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 96.94,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 19.54},
                    {name: "LeGarrette Blount",position: "RB",nflTeam: "NE",points: 30.90},
                    {name: "C.J. Spiller",position: "RB",nflTeam: "BUF",points: 13.30},
                    {name: "Riley Cooper",position: "WR",nflTeam: "PHI",points: 3.90},
                    {name: "James Jones",position: "WR",nflTeam: "GB",points: 4.10},
                    {name: "Greg Olsen",position: "TE",nflTeam: "CAR",points: 10.20},
                    {name: "Rashard Mendenhall",position: "RB",nflTeam: "ARI",points: 4.00},
                    {name: "David Akers",position: "K",nflTeam: "DET",points: 9.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 2.00}
                  ],
                  bench: [
                    {name: "Matt Ryan",position: "QB",nflTeam: "ATL",points: 17.10},
                    {name: "Jamaal Charles",position: "RB",nflTeam: "KC",points: 0.00},
                    {name: "Jared Cook",position: "TE",nflTeam: "STL",points: 9.00},
                    {name: "Victor Cruz",position: "WR",nflTeam: "NYG",points: 0.00},
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 0.00},
                    {name: "Kansas City Chiefs",position: "DEF",nflTeam: "KC",points: 5.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 66.58,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 12.68},
                    {name: "Pierre Thomas",position: "RB",nflTeam: "NO",points: 8.30},
                    {name: "Trent Richardson",position: "RB",nflTeam: "IND",points: 10.20},
                    {name: "Pierre Garcon",position: "WR",nflTeam: "WAS",points: 5.60},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 8.50},
                    {name: "Tony Gonzalez",position: "TE",nflTeam: "ATL",points: 5.60},
                    {name: "Eric Decker",position: "WR",nflTeam: "DEN",points: 8.70},
                    {name: "Blair Walsh",position: "K",nflTeam: "MIN",points: 2.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 5.00}
                  ],
                  bench: [
                    {name: "BenJarvus Green-Ellis",position: "RB",nflTeam: "CIN",points: 6.60},
                    {name: "Golden Tate",position: "WR",nflTeam: "SEA",points: 19.10},
                    {name: "Andre Johnson",position: "WR",nflTeam: "HOU",points: 4.90},
                    {name: "Case Keenum",position: "QB",nflTeam: "HOU",points: 0.00},
                    {name: "DeAndre Hopkins",position: "WR",nflTeam: "HOU",points: 3.50},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 15.00},
                  ]
                }
              },
            ]
          },


//2013_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-third",
            roundName: "Last Place Game",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 72.66,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 19.16},
                    {name: "Chris Johnson",position: "RB",nflTeam: "TEN",points: 20.10},
                    {name: "Fred Jackson",position: "RB",nflTeam: "BUF",points: 17.30},
                    {name: "Stevie Johnson",position: "WR",nflTeam: "BUF",points: 0.00},
                    {name: "Emmanuel Sanders",position: "WR",nflTeam: "PIT",points: 2.60},
                    {name: "Scott Chandler",position: "TE",nflTeam: "BUF",points: 5.50},
                    {name: "Calvin Johnson",position: "WR",nflTeam: "DET",points: 0.00},
                    {name: "Garrett Hartley",position: "K",nflTeam: "FA",points: 0.00},
                    {name: "Detroit Lions",position: "DEF",nflTeam: "DET",points: 8.00}
                  ],
                  bench: [
                    {name: "Jermichael Finley",position: "TE",nflTeam: "GB",points: 0.00},
                    {name: "Maurice Jones-Drew",position: "RB",nflTeam: "JAC",points: 7.00},
                    {name: "Michael Vick",position: "QB",nflTeam: "PHI",points: 0.00},
                    {name: "Mike Tolbert",position: "RB",nflTeam: "CAR",points: 3.90},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 14.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 6.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 76.50,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Tony Romo",position: "QB",nflTeam: "DAL",points: 0.00},
                    {name: "Matt Forte",position: "RB",nflTeam: "CHI",points: 33.70},
                    {name: "Danny Woodhead",position: "RB",nflTeam: "SD",points: 6.00},
                    {name: "Brandon LaFell",position: "WR",nflTeam: "CAR",points: 0.00},
                    {name: "Mike Wallace",position: "WR",nflTeam: "MIA",points: 8.50},
                    {name: "Vernon Davis",position: "TE",nflTeam: "SF",points: 10.50},
                    {name: "DeSean Jackson",position: "WR",nflTeam: "PHI",points: 2.80},
                    {name: "Phil Dawson",position: "K",nflTeam: "SF",points: 13.00},
                    {name: "Arizona Cardinals",position: "DEF",nflTeam: "ARI",points: 2.00}
                  ],
                  bench: [
                    {name: "Martellus Bennett",position: "TE",nflTeam: "CHI",points: 1.50},
                    {name: "Brandon Marshall",position: "WR",nflTeam: "CHI",points: 13.40},
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 8.08},
                    {name: "Andre Ellington",position: "RB",nflTeam: "ARI",points: 4.20},
                    {name: "Ryan Succop",position: "K",nflTeam: "KC",points: 6.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 5.00},
                  ]
                }
              },
            ]
          },

        ],


//END 2013 CONSOLATION

        connections: [
          {
            from: "CS1",
            to: "F5",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F5",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F7",
            result: "loser"
          }
        ]
      }
    },

//END2013!!!!!!!!!!!!!!!!!!!END2013!!!!!!!!!!!!!!!!!!!!!END2013!!!!!!!!!!!!!!!!!!!!!!!!!!!!








//START YEAR 2012

    2012: {
      format: "old",

      teams: {
        p1: {name: "The Startled Penguins",owner: "Max",art: "artwork/2012/p1.png"},
        p2: {name: "LynchMob",owner: "Jordan",art: "artwork/2012/p2.png"},
        p3: {name: "Dirty birds",owner: "Preston",art: "artwork/2012/p3.png"},
        p4: {name: "Qui",owner: "Tyler",art: "artwork/2012/p4.png"},
        c1: {name: "Squad",owner: "Chris",art: "artwork/2012/c1.png"},
        c2: {name: "Green Eggs and CAM",owner: "Brycen",art: "artwork/2012/c2.png"},
        c3: {name: "You suck more than my GF",owner: "Parker",art: "artwork/2012/c3.png"},
        c4: {name: "Saving Rex Ryan",owner: "Will",art: "artwork/2012/c4.png"}
      },


//START 2012 PLAYOFFS

      playoffs: {
        label: "Playoffs",

        rounds: [
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [


//2012_PS1

          {
            type: "matchup",
            id: "PS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 119.58,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 32.78},
                    {name: "Ray Rice",position: "RB",nflTeam: "BAL",points: 21.80},
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 11.90},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 9.60},
                    {name: "Brandon Marshall",position: "WR",nflTeam: "CHI",points: 12.80},
                    {name: "Heath Miller",position: "TE",nflTeam: "PIT",points: 4.50},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 12.20},
                    {name: "Lawrence Tynes",position: "K",nflTeam: "NYG",points: 2.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 12.00}
                  ],
                  bench: [
                    {name: "Darren McFadden",position: "RB",nflTeam: "OAK",points: 4.80},
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 7.12},
                    {name: "Cecil Shorts",position: "WR",nflTeam: "JAC",points: 5.40},
                    {name: "Sidney Rice",position: "WR",nflTeam: "SEA",points: 1.40},
                    {name: "Mike Williams",position: "WR",nflTeam: "TB",points: 19.20},
                    {name: "Matt Prater",position: "K",nflTeam: "DEN",points: 10.00},
                  ]
                }
              },
              {
                teamId: "p4",
                seed: 4,
                score: 118.88,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 14.68},
                    {name: "Reggie Bush",position: "RB",nflTeam: "MIA",points: 28.70},
                    {name: "David Wilson",position: "RB",nflTeam: "NYG",points: 7.70},
                    {name: "Reggie Wayne",position: "WR",nflTeam: "IND",points: 14.10},
                    {name: "Victor Cruz",position: "WR",nflTeam: "NYG",points: 2.10},
                    {name: "Martellus Bennett",position: "TE",nflTeam: "NYG",points: 2.70},
                    {name: "Danario Alexander",position: "WR",nflTeam: "SD",points: 12.90},
                    {name: "Jason Hanson",position: "K",nflTeam: "DET",points: 10.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 26.00}
                  ],
                  bench: [
                    {name: "Percy Harvin",position: "WR",nflTeam: "MIN",points: 0.00},
                    {name: "Hakeem Nicks",position: "WR",nflTeam: "NYG",points: 0.00},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 0.00},
                    {name: "David Akers",position: "K",nflTeam: "SF",points: 9.00},
                    {name: "Rob Bironas",position: "K",nflTeam: "TEN",points: 1.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 2.00},
                  ]
                }
              },
            ]
          },



//2012_PS2

          {
            type: "matchup",
            id: "PS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "p2",
                seed: 2,
                score: 88.64,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Sam Bradford",position: "QB",nflTeam: "STL",points: 13.74},
                    {name: "Arian Foster",position: "RB",nflTeam: "HOU",points: 0.90},
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 25.00},
                    {name: "Stevie Johnson",position: "WR",nflTeam: "BUF",points: 2.40},
                    {name: "Pierre Garcon",position: "WR",nflTeam: "WAS",points: 8.90},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "NO",points: 8.80},
                    {name: "Vick Ballard",position: "RB",nflTeam: "IND",points: 6.90},
                    {name: "Dan Bailey",position: "K",nflTeam: "DAL",points: 7.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 15.00}
                  ],
                  bench: [
                    {name: "Josh Freeman",position: "QB",nflTeam: "TB",points: 12.68},
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 15.92},
                    {name: "Denarius Moore",position: "WR",nflTeam: "OAK",points: 1.20},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 11.10},
                    {name: "Fred Jackson",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: -1.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 100.82,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Robert Griffin III",position: "QB",nflTeam: "WAS",points: 14.32},
                    {name: "Stevan Ridley",position: "RB",nflTeam: "NE",points: 8.40},
                    {name: "Trent Richardson",position: "RB",nflTeam: "CLE",points: 6.80},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 12.40},
                    {name: "Andre Johnson",position: "WR",nflTeam: "HOU",points: 9.70},
                    {name: "Jermaine Gresham",position: "TE",nflTeam: "CIN",points: 3.80},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 34.40},
                    {name: "Shayne Graham",position: "K",nflTeam: "HOU",points: 8.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 3.00}
                  ],
                  bench: [
                    {name: "Ahmad Bradshaw",position: "RB",nflTeam: "NYG",points: 4.70},
                    {name: "Brandon Lloyd",position: "WR",nflTeam: "NE",points: 6.20},
                    {name: "Vincent Jackson",position: "WR",nflTeam: "TB",points: 10.80},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 15.70},
                    {name: "T.Y. Hilton",position: "WR",nflTeam: "IND",points: 3.40},
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 14.30},
                  ]
                }
              },
            ]
          },


//2012_F1

          {
            type: "matchup",
            id: "F1",
            round: "finals",
            slot: "final-championship",
            roundName: "Championship",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "p1",
                seed: 1,
                score: 77.60,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Aaron Rodgers",position: "QB",nflTeam: "GB",points: 28.60},
                    {name: "Ray Rice",position: "RB",nflTeam: "BAL",points: 0.50},
                    {name: "Doug Martin",position: "RB",nflTeam: "TB",points: 22.00},
                    {name: "A.J. Green",position: "WR",nflTeam: "CIN",points: 2.60},
                    {name: "Brandon Marshall",position: "WR",nflTeam: "CHI",points: 4.00},
                    {name: "Jermaine Gresham",position: "TE",nflTeam: "CIN",points: 0.00},
                    {name: "Brandon Lloyd",position: "WR",nflTeam: "NE",points: 0.90},
                    {name: "Matt Prater",position: "K",nflTeam: "DEN",points: 8.00},
                    {name: "Denver Broncos",position: "DEF",nflTeam: "DEN",points: 11.00}
                  ],
                  bench: [
                    {name: "Darren McFadden",position: "RB",nflTeam: "OAK",points: 5.90},
                    {name: "Andy Dalton",position: "QB",nflTeam: "CIN",points: 7.52},
                    {name: "Randall Cobb",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Sidney Rice",position: "WR",nflTeam: "SEA",points: 0.00},
                    {name: "Mike Williams",position: "WR",nflTeam: "TB",points: 12.50},
                    {name: "Lawrence Tynes",position: "K",nflTeam: "NYG",points: 6.00},
                  ]
                }
              },
              {
                teamId: "p3",
                seed: 3,
                score: 96.20,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Robert Griffin III",position: "QB",nflTeam: "WAS",points: 16.30},
                    {name: "Arian Foster",position: "RB",nflTeam: "HOU",points: 17.90},
                    {name: "C.J. Spiller",position: "RB",nflTeam: "BUF",points: 17.10},
                    {name: "Dez Bryant",position: "WR",nflTeam: "DAL",points: 7.10},
                    {name: "Julio Jones",position: "WR",nflTeam: "ATL",points: 5.60},
                    {name: "Kyle Rudolph",position: "TE",nflTeam: "MIN",points: 2.00},
                    {name: "Calvin Johnson",position: "WR",nflTeam: "DET",points: 7.20},
                    {name: "Blair Walsh",position: "K",nflTeam: "MIN",points: 15.00},
                    {name: "San Diego Chargers",position: "DEF",nflTeam: "SD",points: 8.00}
                  ],
                  bench: [
                    {name: "Andre Johnson",position: "WR",nflTeam: "HOU",points: 14.10},
                    {name: "Vincent Jackson",position: "WR",nflTeam: "TB",points: 5.00},
                    {name: "Russell Wilson",position: "QB",nflTeam: "SEA",points: 25.80},
                    {name: "Andrew Luck",position: "QB",nflTeam: "IND",points: 15.74},
                    {name: "Trent Richardson",position: "RB",nflTeam: "CLE",points: 0.00},
                    {name: "Houston Texans",position: "DEF",nflTeam: "HOU",points: 0.00},
                  ]
                }
              },
            ]
          },


//2012_F3

          {
            type: "matchup",
            id: "F3",
            round: "finals",
            slot: "final-third",
            roundName: "Third Place Game",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "p4",
                seed: 4,
                score: 86.26,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Tom Brady",position: "QB",nflTeam: "NE",points: 19.36},
                    {name: "Reggie Bush",position: "RB",nflTeam: "MIA",points: 4.90},
                    {name: "David Wilson",position: "RB",nflTeam: "NYG",points: 15.00},
                    {name: "Reggie Wayne",position: "WR",nflTeam: "IND",points: 4.00},
                    {name: "Victor Cruz",position: "WR",nflTeam: "NYG",points: 11.20},
                    {name: "Martellus Bennett",position: "TE",nflTeam: "NYG",points: 1.50},
                    {name: "Darrius Heyward-Bey",position: "WR",nflTeam: "OAK",points: 7.30},
                    {name: "Rob Bironas",position: "K",nflTeam: "TEN",points: 8.00},
                    {name: "Buffalo Bills",position: "DEF",nflTeam: "BUF",points: 15.00}
                  ],
                  bench: [
                    {name: "Hakeem Nicks",position: "WR",nflTeam: "NYG",points: 0.00},
                    {name: "Rob Gronkowski",position: "TE",nflTeam: "NE",points: 10.20},
                    {name: "Danario Alexander",position: "WR",nflTeam: "SD",points: 9.40},
                    {name: "David Akers",position: "K",nflTeam: "SF",points: 9.00},
                    {name: "Jason Hanson",position: "K",nflTeam: "DET",points: 6.00},
                    {name: "Chicago Bears",position: "DEF",nflTeam: "CHI",points: 9.00},
                  ]
                }
              },
              {
                teamId: "p2",
                seed: 2,
                score: 101.38,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Sam Bradford",position: "QB",nflTeam: "STL",points: 12.68},
                    {name: "Stevan Ridley",position: "RB",nflTeam: "NE",points: 19.40},
                    {name: "Marshawn Lynch",position: "RB",nflTeam: "SEA",points: 11.40},
                    {name: "Stevie Johnson",position: "WR",nflTeam: "BUF",points: 11.10},
                    {name: "Pierre Garcon",position: "WR",nflTeam: "WAS",points: 4.60},
                    {name: "Jimmy Graham",position: "TE",nflTeam: "NO",points: 17.50},
                    {name: "Vick Ballard",position: "RB",nflTeam: "IND",points: 14.70},
                    {name: "Dan Bailey",position: "K",nflTeam: "DAL",points: 4.00},
                    {name: "Seattle Seahawks",position: "DEF",nflTeam: "SEA",points: 6.00}
                  ],
                  bench: [
                    {name: "Josh Freeman",position: "QB",nflTeam: "TB",points: 10.98},
                    {name: "Matthew Stafford",position: "QB",nflTeam: "DET",points: 17.78},
                    {name: "Denarius Moore",position: "WR",nflTeam: "OAK",points: 6.50},
                    {name: "Larry Fitzgerald",position: "WR",nflTeam: "ARI",points: 1.30},
                    {name: "Fred Jackson",position: "RB",nflTeam: "BUF",points: 0.00},
                    {name: "Dallas Cowboys",position: "DEF",nflTeam: "DAL",points: 0.00},
                  ]
                }
              },
            ]
          },

        ],


//END 2012 PLAYOFFS

        connections: [
          {
            from: "PS1",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS2",
            to: "F1",
            result: "winner"
          },
          {
            from: "PS1",
            to: "F3",
            result: "loser"
          },
          {
            from: "PS2",
            to: "F3",
            result: "loser"
          }
        ]
      },


//START 2012 CONSOLATION

      consolation: {
        label: "Consolation",

        rounds: [
          { key: "semifinals", label: "Semifinals" },
          { key: "finals", label: "Final Games" }
        ],

        cards: [


//2012_CS1

          {
            type: "matchup",
            id: "CS1",
            round: "semifinals",
            slot: "semi-upper",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 112.24,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 29.74},
                    {name: "Knowshon Moreno",position: "RB",nflTeam: "DEN",points: 12.70},
                    {name: "Michael Turner",position: "RB",nflTeam: "ATL",points: 5.70},
                    {name: "Kenny Britt",position: "WR",nflTeam: "TEN",points: 10.10},
                    {name: "Wes Welker",position: "WR",nflTeam: "NE",points: 15.70},
                    {name: "Aaron Hernandez",position: "TE",nflTeam: "NE",points: 1.30},
                    {name: "Lance Moore",position: "WR",nflTeam: "NO",points: 9.00},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 11.00},
                    {name: "Indianapolis Colts",position: "DEF",nflTeam: "IND",points: 17.00}
                  ],
                  bench: [
                    {name: "Brandon Pettigrew",position: "TE",nflTeam: "DET",points: 0.00},
                    {name: "Mikel Leshoure",position: "RB",nflTeam: "DET",points: 10.60},
                    {name: "Jacquizz Rodgers",position: "RB",nflTeam: "ATL",points: 2.50},
                    {name: "Malcom Floyd",position: "WR",nflTeam: "SD",points: 0.00},
                    {name: "Mike Wallace",position: "WR",nflTeam: "PIT",points: 1.20},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: 15.00},
                  ]
                }
              },
              {
                teamId: "c4",
                seed: 4,
                score: 117.26,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Peyton Manning",position: "QB",nflTeam: "DEN",points: 23.56},
                    {name: "Matt Forte",position: "RB",nflTeam: "CHI",points: 15.50},
                    {name: "Alfred Morris",position: "RB",nflTeam: "WAS",points: 16.80},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 16.20},
                    {name: "James Jones",position: "WR",nflTeam: "GB",points: 16.00},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 10.40},
                    {name: "Donnie Avery",position: "WR",nflTeam: "IND",points: 3.80},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 7.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 8.00}
                  ],
                  bench: [
                    {name: "LeSean McCoy",position: "RB",nflTeam: "PHI",points: 12.20},
                    {name: "Brian Hartline",position: "WR",nflTeam: "MIA",points: 1.20},
                    {name: "Scott Chandler",position: "TE",nflTeam: "BUF",points: 2.50},
                    {name: "Alex Smith",position: "QB",nflTeam: "SF",points: 0.00},
                    {name: "Robbie Gould",position: "K",nflTeam: "CHI",points: 0.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 4.00},
                  ]
                }
              },
            ]
          },


//2012_CS2

          {
            type: "matchup",
            id: "CS2",
            round: "semifinals",
            slot: "semi-lower",
            roundName: "Semifinal",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "c2",
                seed: 2,
                score: 80.90,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 20.80},
                    {name: "C.J. Spiller",position: "RB",nflTeam: "BUF",points: 17.30},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "DAL",points: 7.10},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "SF",points: 6.50},
                    {name: "Calvin Johnson",position: "WR",nflTeam: "DET",points: 20.50},
                    {name: "Tony Gonzalez",position: "TE",nflTeam: "ATL",points: 0.90},
                    {name: "Frank Gore",position: "RB",nflTeam: "SF",points: 2.80},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "OAK",points: 6.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: -1.00}
                  ],
                  bench: [
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 0.00},
                    {name: "Maurice Jones-Drew",position: "RB",nflTeam: "JAC",points: 0.00},
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 10.80},
                    {name: "Garrett Hartley",position: "K",nflTeam: "NO",points: 10.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 7.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 97.24,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Tony Romo",position: "QB",nflTeam: "DAL",points: 32.64},
                    {name: "Chris Johnson",position: "RB",nflTeam: "TEN",points: 4.10},
                    {name: "Jamaal Charles",position: "RB",nflTeam: "KC",points: 27.00},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Greg Jennings",position: "WR",nflTeam: "GB",points: 10.50},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 6.00},
                    {name: "Ryan Broyles",position: "WR",nflTeam: "DET",points: 0.00},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 13.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 4.00}
                  ],
                  bench: [
                    {name: "Joe Flacco",position: "QB",nflTeam: "BAL",points: 25.36},
                    {name: "Colin Kaepernick",position: "QB",nflTeam: "SF",points: 14.86},
                    {name: "Miles Austin",position: "WR",nflTeam: "DAL",points: 10.50},
                    {name: "Marques Colston",position: "WR",nflTeam: "NO",points: 15.30},
                    {name: "Steven Jackson",position: "RB",nflTeam: "STL",points: 13.70},
                    {name: "Kevin Smith",position: "RB",nflTeam: "DET",points: 0.40},
                  ]
                }
              },
            ]
          },


//2012_F5

          {
            type: "matchup",
            id: "F5",
            round: "finals",
            slot: "final-championship",
            roundName: "Consolation Championship",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "c4",
                seed: 4,
                score: 156.26,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Peyton Manning",position: "QB",nflTeam: "DEN",points: 24.16},
                    {name: "Matt Forte",position: "RB",nflTeam: "CHI",points: 18.40},
                    {name: "Alfred Morris",position: "RB",nflTeam: "WAS",points: 39.20},
                    {name: "Demaryius Thomas",position: "WR",nflTeam: "DEN",points: 18.20},
                    {name: "James Jones",position: "WR",nflTeam: "GB",points: 12.20},
                    {name: "Antonio Gates",position: "TE",nflTeam: "SD",points: 7.50},
                    {name: "LeSean McCoy",position: "RB",nflTeam: "PHI",points: 10.60},
                    {name: "Matt Bryant",position: "K",nflTeam: "ATL",points: 5.00},
                    {name: "New England Patriots",position: "DEF",nflTeam: "NE",points: 21.00}
                  ],
                  bench: [
                    {name: "Donnie Avery",position: "WR",nflTeam: "IND",points: 0.00},
                    {name: "Brian Hartline",position: "WR",nflTeam: "MIA",points: 6.90},
                    {name: "Scott Chandler",position: "TE",nflTeam: "BUF",points: 0.00},
                    {name: "Alex Smith",position: "QB",nflTeam: "SF",points: 0.04},
                    {name: "Robbie Gould",position: "K",nflTeam: "CHI",points: 0.00},
                    {name: "Baltimore Ravens",position: "DEF",nflTeam: "BAL",points: 3.00},
                  ]
                }
              },
              {
                teamId: "c3",
                seed: 3,
                score: 81.52,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Tony Romo",position: "QB",nflTeam: "DAL",points: 12.72},
                    {name: "Chris Johnson",position: "RB",nflTeam: "TEN",points: 12.50},
                    {name: "Jamaal Charles",position: "RB",nflTeam: "KC",points: 6.70},
                    {name: "Julian Edelman",position: "WR",nflTeam: "NE",points: 0.00},
                    {name: "Greg Jennings",position: "WR",nflTeam: "GB",points: 24.00},
                    {name: "Jason Witten",position: "TE",nflTeam: "DAL",points: 11.60},
                    {name: "Ryan Broyles",position: "WR",nflTeam: "DET",points: 0.00},
                    {name: "Mason Crosby",position: "K",nflTeam: "GB",points: 12.00},
                    {name: "New York Jets",position: "DEF",nflTeam: "NYJ",points: 2.00}
                  ],
                  bench: [
                    {name: "Joe Flacco",position: "QB",nflTeam: "BAL",points: 1.36},
                    {name: "Colin Kaepernick",position: "QB",nflTeam: "SF",points: 19.54},
                    {name: "Miles Austin",position: "WR",nflTeam: "DAL",points: 0.00},
                    {name: "Marques Colston",position: "WR",nflTeam: "NO",points: 17.20},
                    {name: "Steven Jackson",position: "RB",nflTeam: "STL",points: 9.70},
                    {name: "Kevin Smith",position: "RB",nflTeam: "DET",points: 0.00},
                  ]
                }
              },
            ]
          },


//2012_F7

          {
            type: "matchup",
            id: "F7",
            round: "finals",
            slot: "final-third",
            roundName: "Last Place Game",
            bowlName: "",
            bowlArt: "",

            teams: [
              {
                teamId: "c1",
                seed: 1,
                score: 101.14,
                touchdowns: null,
                winner: true,
                lineup: {
                  starters: [
                    {name: "Drew Brees",position: "QB",nflTeam: "NO",points: 29.84},
                    {name: "Knowshon Moreno",position: "RB",nflTeam: "DEN",points: 11.40},
                    {name: "Michael Turner",position: "RB",nflTeam: "ATL",points: 7.80},
                    {name: "Wes Welker",position: "WR",nflTeam: "NE",points: 16.50},
                    {name: "Lance Moore",position: "WR",nflTeam: "NO",points: 12.10},
                    {name: "Aaron Hernandez",position: "TE",nflTeam: "NE",points: 4.40},
                    {name: "Kenny Britt",position: "WR",nflTeam: "TEN",points: 2.10},
                    {name: "Stephen Gostkowski",position: "K",nflTeam: "NE",points: 4.00},
                    {name: "Cincinnati Bengals",position: "DEF",nflTeam: "CIN",points: 13.00}
                  ],
                  bench: [
                    {name: "Brandon Pettigrew",position: "TE",nflTeam: "DET",points: 1.10},
                    {name: "Mikel Leshoure",position: "RB",nflTeam: "DET",points: 7.70},
                    {name: "Jacquizz Rodgers",position: "RB",nflTeam: "ATL",points: 7.80},
                    {name: "Mike Wallace",position: "WR",nflTeam: "PIT",points: 0.00},
                    {name: "Green Bay Packers",position: "DEF",nflTeam: "GB",points: -3.00},
                  ]
                }
              },
              {
                teamId: "c2",
                seed: 2,
                score: 81.12,
                touchdowns: null,
                winner: false,
                lineup: {
                  starters: [
                    {name: "Cam Newton",position: "QB",nflTeam: "CAR",points: 11.32},
                    {name: "DeMarco Murray",position: "RB",nflTeam: "DAL",points: 8.60},
                    {name: "Michael Crabtree",position: "WR",nflTeam: "SF",points: 29.20},
                    {name: "Tony Gonzalez",position: "TE",nflTeam: "ATL",points: 4.10},
                    {name: "Frank Gore",position: "RB",nflTeam: "SF",points: 14.90},
                    {name: "Sebastian Janikowski",position: "K",nflTeam: "OAK",points: 3.00},
                    {name: "San Francisco 49ers",position: "DEF",nflTeam: "SF",points: 10.00}
                  ],
                  bench: [
                    {name: "Jonathan Stewart",position: "RB",nflTeam: "CAR",points: 0.00},
                    {name: "Jordy Nelson",position: "WR",nflTeam: "GB",points: 14.70},
                    {name: "Ahmad Bradshaw",position: "RB",nflTeam: "NYG",points: 20.80},
                    {name: "Maurice Jones-Drew",position: "RB",nflTeam: "JAC",points: 0.00},
                    {name: "Eli Manning",position: "QB",nflTeam: "NYG",points: 28.32},
                    {name: "Antonio Brown",position: "WR",nflTeam: "PIT",points: 7.60},
                    {name: "Garrett Hartley",position: "K",nflTeam: "NO",points: 10.00},
                    {name: "Atlanta Falcons",position: "DEF",nflTeam: "ATL",points: 2.00},
                  ]
                }
              },
            ]
          },

        ],


//END 2012 CONSOLATION

        connections: [
          {
            from: "CS1",
            to: "F5",
            result: "winner"
          },
          {
            from: "CS2",
            to: "F5",
            result: "winner"
          },
          {
            from: "CS1",
            to: "F7",
            result: "loser"
          },
          {
            from: "CS2",
            to: "F7",
            result: "loser"
          }
        ]
      }
    },

//END2012!!!!!!!!!!!!!!!!!!!END2012!!!!!!!!!!!!!!!!!!!!!END2012!!!!!!!!!!!!!!!!!!!!!!!!!!!!






//BELOW BRACKET ENDS ALL BRACKET_DATA
  };




//END ALL BRACKET DATA

  const SELECTORS = {
    root: "[data-bracket-page]",
    yearSelect: "[data-year-select]",
    previousYear: "[data-year-previous]",
    nextYear: "[data-year-next]",
    bracketToggles: "[data-bracket-toggle]",
    activeSeason: "[data-active-season]",
    activeBracketTitle: "[data-active-bracket-title]",
    mobileRoundTabs: "[data-mobile-round-tabs]",
    bracketCanvas: "[data-bracket-canvas]",
    bracketRounds: "[data-bracket-rounds]",
    connectors: "[data-bracket-connectors]",
    status: "[data-bracket-status]",
    modal: "[data-matchup-modal]",
    modalDialog: "[data-matchup-dialog]",
    modalContent: "[data-matchup-content]",
    modalClose: "[data-modal-close]"
  };

  const state = {
    year: null,
    bracket: "playoffs",
    mobileRound: null,
    openMatchupId: null,
    lastFocusedElement: null,
    connectorFrame: null
  };

  let elements = {};

  function init() {
    const root = document.querySelector(SELECTORS.root);

    if (!root) {
      return;
    }

    elements = {
      root,
      yearSelect: root.querySelector(SELECTORS.yearSelect),
      previousYear: root.querySelector(SELECTORS.previousYear),
      nextYear: root.querySelector(SELECTORS.nextYear),
      bracketToggles: [
        ...root.querySelectorAll(SELECTORS.bracketToggles)
      ],
      activeSeason: root.querySelector(SELECTORS.activeSeason),
      activeBracketTitle: root.querySelector(
        SELECTORS.activeBracketTitle
      ),
      mobileRoundTabs: root.querySelector(
        SELECTORS.mobileRoundTabs
      ),
      bracketCanvas: root.querySelector(SELECTORS.bracketCanvas),
      bracketRounds: root.querySelector(SELECTORS.bracketRounds),
      connectors: root.querySelector(SELECTORS.connectors),
      status: root.querySelector(SELECTORS.status),
      modal: root.querySelector(SELECTORS.modal),
      modalDialog: root.querySelector(SELECTORS.modalDialog),
      modalContent: root.querySelector(SELECTORS.modalContent)
    };

    buildYearSelect();
    bindEvents();
    syncStateFromUrl();
  }

  function getYears() {
    return Object.keys(BRACKET_DATA)
      .map(Number)
      .sort((a, b) => b - a);
  }

  function buildYearSelect() {
    elements.yearSelect.innerHTML = getYears()
      .map((year) => `<option value="${year}">${year}</option>`)
      .join("");
  }

  function bindEvents() {
    elements.yearSelect.addEventListener("change", () => {
      changeYear(Number(elements.yearSelect.value));
    });

    elements.previousYear.addEventListener("click", () => {
      stepYear(1);
    });

    elements.nextYear.addEventListener("click", () => {
      stepYear(-1);
    });

    elements.bracketToggles.forEach((button) => {
      button.addEventListener("click", () => {
        const nextBracket = button.dataset.bracketToggle;

        if (nextBracket === state.bracket) {
          return;
        }

        state.bracket = nextBracket;
        state.mobileRound = null;

        closeModal({
          updateUrl: false,
          restoreFocus: false
        });

        render();

        writeUrl(
          {
            matchup: null
          },
          "push"
        );
      });
    });

    elements.bracketRounds.addEventListener("click", (event) => {
      const card = event.target.closest("[data-matchup-id]");

      if (!card) {
        return;
      }

      openMatchup(card.dataset.matchupId, {
        updateUrl: true
      });
    });

    elements.mobileRoundTabs.addEventListener(
      "click",
      (event) => {
        const button = event.target.closest(
          "[data-mobile-round]"
        );

        if (!button) {
          return;
        }

        state.mobileRound = button.dataset.mobileRound;
        updateMobileRoundVisibility();
      }
    );

    elements.root
      .querySelectorAll(SELECTORS.modalClose)
      .forEach((closeControl) => {
        closeControl.addEventListener("click", () => {
          closeModal({
            updateUrl: true,
            restoreFocus: true
          });
        });
      });

    elements.modalContent.addEventListener("click", (event) => {
      const benchButton = event.target.closest(
        "[data-bench-toggle]"
      );

      if (!benchButton) {
        return;
      }

      const benchSection =
        elements.modalContent.querySelector(
          "[data-bench-section]"
        );

      const willOpen = benchSection.hidden;

      benchSection.hidden = !willOpen;

      benchButton.setAttribute(
        "aria-expanded",
        String(willOpen)
      );

      benchButton.textContent = willOpen
        ? "Hide Bench Players"
        : "View Bench Players";
    });

    document.addEventListener("keydown", handleKeydown);
    window.addEventListener("resize", scheduleConnectorDraw);
    window.addEventListener("popstate", syncStateFromUrl);
  }

  function syncStateFromUrl() {
    const params = new URLSearchParams(
      window.location.search
    );

    const years = getYears();
    const requestedYear = Number(params.get("year"));
    const requestedBracket = params.get("bracket");
    const requestedMatchup = params.get("matchup");

    state.year = BRACKET_DATA[requestedYear]
      ? requestedYear
      : years[0];

    state.bracket = [
      "playoffs",
      "consolation"
    ].includes(requestedBracket)
      ? requestedBracket
      : "playoffs";

    state.mobileRound = null;

    render();

    if (
      requestedMatchup &&
      findMatchup(requestedMatchup)
    ) {
      openMatchup(requestedMatchup, {
        updateUrl: false
      });
    } else {
      closeModal({
        updateUrl: false,
        restoreFocus: false
      });
    }
  }

  function changeYear(year) {
    if (!BRACKET_DATA[year] || year === state.year) {
      return;
    }

    state.year = year;
    state.mobileRound = null;

    closeModal({
      updateUrl: false,
      restoreFocus: false
    });

    render();

    writeUrl(
      {
        matchup: null
      },
      "push"
    );
  }

  function stepYear(offset) {
    const years = getYears();
    const currentIndex = years.indexOf(state.year);
    const nextYear = years[currentIndex + offset];

    if (nextYear) {
      changeYear(nextYear);
    }
  }

  function render() {
    const season = BRACKET_DATA[state.year];
    const bracket = season[state.bracket];

    elements.root.dataset.bracketFormat = season.format;

    elements.yearSelect.value = String(state.year);

    updateYearArrows();
    updateBracketToggle();

    elements.activeSeason.textContent =
      `${state.year} season`;

    elements.activeBracketTitle.textContent =
      bracket.label;

    elements.status.textContent =
      `${state.year} ${bracket.label} bracket loaded.`;

    elements.bracketRounds.style.setProperty(
      "--round-count",
      bracket.rounds.length
    );

    elements.mobileRoundTabs.style.setProperty(
      "--mobile-round-count",
      bracket.rounds.length
    );

    renderRoundTabs(bracket);
    renderRounds(season, bracket);
    updateMobileRoundVisibility();
    scheduleConnectorDraw();
  }

  function updateYearArrows() {
    const years = getYears();
    const currentIndex = years.indexOf(state.year);

    elements.nextYear.disabled = currentIndex <= 0;
    elements.previousYear.disabled =
      currentIndex >= years.length - 1;
  }

  function updateBracketToggle() {
    elements.bracketToggles.forEach((button) => {
      const isActive =
        button.dataset.bracketToggle === state.bracket;

      button.classList.toggle("is-active", isActive);

      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });
  }

  function renderRoundTabs(bracket) {
    const validRound = bracket.rounds.some(
      (round) => round.key === state.mobileRound
    );

    if (!state.mobileRound || !validRound) {
      state.mobileRound = bracket.rounds[0].key;
    }

    elements.mobileRoundTabs.innerHTML =
      bracket.rounds
        .map((round) => {
          const active =
            round.key === state.mobileRound;

          return `
            <button
              class="mobile-round-tabs__button${active ? " is-active" : ""}"
              type="button"
              role="tab"
              aria-selected="${active}"
              data-mobile-round="${escapeAttribute(round.key)}"
            >
              ${escapeHTML(round.label)}
            </button>
          `;
        })
        .join("");
  }

  function renderRounds(season, bracket) {
    elements.bracketRounds.innerHTML =
      bracket.rounds
        .map((round) => {
          const cards = bracket.cards.filter(
            (card) => card.round === round.key
          );

          return `
            <section
              class="bracket-round"
              data-round="${escapeAttribute(round.key)}"
              aria-label="${escapeAttribute(round.label)}"
            >
              <h3 class="bracket-round__title">
                ${escapeHTML(round.label)}
              </h3>

              ${cards
                .map((card) => renderCard(season, card))
                .join("")}
            </section>
          `;
        })
        .join("");
  }

  function renderCard(season, card) {
    if (card.type === "bye") {
      const team = season.teams[card.teamId];

      return `
        <div
          class="matchup-card matchup-card--bye"
          data-card-id="${escapeAttribute(card.id)}"
          data-slot="${escapeAttribute(card.slot)}"
        >
          <div class="matchup-team">
            <span class="matchup-team__seed">
              ${escapeHTML(card.seed)}
            </span>

            <span class="matchup-team__name">
              ${escapeHTML(team.name)}
            </span>

            <span class="matchup-card__bye-label">
              Bye
            </span>
          </div>
        </div>
      `;
    }

    const title = card.bowlName || card.roundName;

const roundLabel = card.bowlName
  ? `
      <span class="matchup-card__round">
        ${escapeHTML(card.roundName)}
      </span>
    `
  : "";

    const cardArtPosition = card.artPosition?.card;
    const headerStyle = card.bowlArt
      ? ` style="--bowl-art: url('${escapeCssUrl(card.bowlArt)}');${cardArtPosition ? ` --bowl-position: ${escapeAttribute(cardArtPosition)};` : ""}"`
      : "";

    return `
      <button
        class="matchup-card"
        type="button"
        data-card-id="${escapeAttribute(card.id)}"
        data-matchup-id="${escapeAttribute(card.id)}"
        data-slot="${escapeAttribute(card.slot)}"
        aria-label="Open ${escapeAttribute(title)} matchup details"
      >
        <span class="matchup-card__header"${headerStyle}>
        ${roundLabel}

          <span class="matchup-card__title">
            ${escapeHTML(title)}
          </span>
        </span>

        <span class="matchup-card__teams">
          ${card.teams
            .map((entry) =>
              renderCompactTeam(
                season.teams[entry.teamId],
                entry
              )
            )
            .join("")}
        </span>
      </button>
    `;
  }

  function renderCompactTeam(team, entry) {
    const artStyle = team.art
      ? ` style="--team-art: url('${escapeCssUrl(team.art)}')"`
      : "";

    return `
      <span
        class="matchup-team${entry.winner ? " is-winner" : ""}"
        ${artStyle}
      >
        <span class="matchup-team__seed">
          ${escapeHTML(entry.seed)}
        </span>

        <span class="matchup-team__identity">
          <span class="matchup-team__name">
            ${escapeHTML(team.name)}
          </span>

          ${
            entry.winner
              ? '<span class="matchup-team__winner-label">Winner</span>'
              : ""
          }
        </span>

        <span class="matchup-team__score">
          ${formatScore(entry.score)}
        </span>
      </span>
    `;
  }

  function updateMobileRoundVisibility() {
    elements.mobileRoundTabs
      .querySelectorAll("[data-mobile-round]")
      .forEach((button) => {
        const active =
          button.dataset.mobileRound ===
          state.mobileRound;

        button.classList.toggle("is-active", active);

        button.setAttribute(
          "aria-selected",
          String(active)
        );
      });

    elements.bracketRounds
      .querySelectorAll("[data-round]")
      .forEach((round) => {
        round.classList.toggle(
          "is-mobile-active",
          round.dataset.round === state.mobileRound
        );
      });
  }

  function scheduleConnectorDraw() {
    if (state.connectorFrame) {
      cancelAnimationFrame(state.connectorFrame);
    }

    state.connectorFrame = requestAnimationFrame(() => {
      state.connectorFrame = null;
      drawConnectors();
    });
  }

  function drawConnectors() {
    if (
      window.matchMedia("(max-width: 820px)").matches
    ) {
      elements.connectors.innerHTML = "";
      return;
    }

    const bracket =
      BRACKET_DATA[state.year][state.bracket];

    const canvasRect =
      elements.bracketCanvas.getBoundingClientRect();

    const width = elements.bracketCanvas.clientWidth;
    const height = elements.bracketCanvas.clientHeight;

    elements.connectors.setAttribute(
      "viewBox",
      `0 0 ${width} ${height}`
    );

    elements.connectors.setAttribute(
      "width",
      String(width)
    );

    elements.connectors.setAttribute(
      "height",
      String(height)
    );

    const paths = bracket.connections.map(
      (connection) => {
        const from =
          elements.bracketRounds.querySelector(
            `[data-card-id="${cssEscape(connection.from)}"]`
          );

        const to =
          elements.bracketRounds.querySelector(
            `[data-card-id="${cssEscape(connection.to)}"]`
          );

        if (!from || !to) {
          return "";
        }

        const fromRect = from.getBoundingClientRect();
        const toRect = to.getBoundingClientRect();

        const x1 =
          fromRect.right - canvasRect.left;

        const y1 =
          fromRect.top +
          fromRect.height / 2 -
          canvasRect.top;

        const x2 =
          toRect.left - canvasRect.left;

        const y2 =
          toRect.top +
          toRect.height / 2 -
          canvasRect.top;

        const midpoint =
          x1 + Math.max(18, (x2 - x1) * 0.5);

        const className =
          connection.result === "loser"
            ? "bracket-connector bracket-connector--loser"
            : "bracket-connector";

        return `
          <path
            class="${className}"
            d="M ${x1} ${y1} H ${midpoint} V ${y2} H ${x2}"
          />
        `;
      }
    );

    elements.connectors.innerHTML =
      paths.join("");
  }

  function findMatchup(matchupId) {
    const season = BRACKET_DATA[state.year];
    const bracket = season[state.bracket];

    return (
      bracket.cards.find(
        (card) =>
          card.type === "matchup" &&
          card.id === matchupId
      ) || null
    );
  }

  function openMatchup(matchupId, { updateUrl }) {
    const matchup = findMatchup(matchupId);

    if (!matchup) {
      return;
    }

    const season = BRACKET_DATA[state.year];

const theme = matchup.theme || {};

elements.modalContent.style.setProperty(
  "--matchup-accent",
  theme.accent || "#e6b84d"
);

elements.modalContent.style.setProperty(
  "--matchup-dark",
  theme.dark || "#172840"
);

elements.modalContent.style.setProperty(
  "--matchup-soft",
  theme.soft || "#ece7dc"
);



    state.openMatchupId = matchupId;
    state.lastFocusedElement =
      document.activeElement;

    state.mobileRound = matchup.round;

    updateMobileRoundVisibility();

    elements.modalContent.innerHTML =
      renderModalContent(season, matchup);

    elements.modal.hidden = false;

    document.body.classList.add(
      "bracket-modal-open"
    );

    requestAnimationFrame(() => {
      const closeButton =
        elements.modal.querySelector(
          "[data-modal-close]"
        );

      closeButton?.focus();
    });

    if (updateUrl) {
      writeUrl(
        {
          matchup: matchupId
        },
        "push"
      );
    }
  }

  function closeModal({
    updateUrl,
    restoreFocus
  }) {
    if (!elements.modal || elements.modal.hidden) {
      return;
    }

    elements.modal.hidden = true;
    elements.modalContent.innerHTML = "";

    document.body.classList.remove(
      "bracket-modal-open"
    );

    state.openMatchupId = null;

    if (updateUrl) {
      writeUrl(
        {
          matchup: null
        },
        "replace"
      );
    }

    if (
      restoreFocus &&
      state.lastFocusedElement instanceof HTMLElement
    ) {
      state.lastFocusedElement.focus();
    }
  }

  function renderModalContent(season, matchup) {
    const title = matchup.bowlName
      ? `${matchup.roundName} — ${matchup.bowlName}`
      : matchup.roundName;

const eyebrow = matchup.bowlName
  ? `
      <p class="matchup-modal__eyebrow">
        ${escapeHTML(matchup.roundName)}
      </p>
    `
  : "";

    const modalArtPosition = matchup.artPosition?.modal;
    const heroStyle = matchup.bowlArt
      ? ` style="--bowl-art: url('${escapeCssUrl(matchup.bowlArt)}');${modalArtPosition ? ` --bowl-position: ${escapeAttribute(modalArtPosition)};` : ""}"`
      : "";

    const [teamAEntry, teamBEntry] =
      matchup.teams;

    const teamA =
      season.teams[teamAEntry.teamId];

    const teamB =
      season.teams[teamBEntry.teamId];

    return `
      <header
        class="matchup-modal__hero"
        ${heroStyle}
      >
${eyebrow}

        <h2
          class="matchup-modal__title"
          id="matchup-modal-title"
        >
          ${escapeHTML(title)}
        </h2>
      </header>

      <div class="matchup-modal__body">
        <section
          class="matchup-scoreboard"
          aria-label="Final score"
        >
          ${renderScoreboardTeam(
            teamA,
            teamAEntry
          )}

          <div
            class="matchup-scoreboard__versus"
            aria-hidden="true"
          >
            FINAL
          </div>

          ${renderScoreboardTeam(
            teamB,
            teamBEntry
          )}
        </section>

        <section
          class="lineup-section"
          aria-labelledby="starting-lineups-title"
        >
          <div class="lineup-section__heading">
            <h3
              class="lineup-section__title"
              id="starting-lineups-title"
            >
              Starting Lineups
            </h3>

            <p class="lineup-section__note">
              Player points only
            </p>
          </div>

          <div class="lineup-grid">
            ${renderLineupCard(
              teamA.name,
              teamAEntry.lineup.starters,
              "Starters"
            )}

            ${renderLineupCard(
              teamB.name,
              teamBEntry.lineup.starters,
              "Starters"
            )}
          </div>
        </section>

        <div class="bench-control">
          <button
            class="bench-control__button"
            type="button"
            data-bench-toggle
            aria-expanded="false"
          >
            View Bench Players
          </button>
        </div>

        <section
          class="bench-section"
          data-bench-section
          hidden
          aria-label="Bench players"
        >
          <div class="lineup-section__heading">
            <h3 class="lineup-section__title">
              Bench
            </h3>

            <p class="lineup-section__note">
              
            </p>
          </div>

          <div class="lineup-grid">
            ${renderLineupCard(
              teamA.name,
              teamAEntry.lineup.bench,
              "Bench"
            )}

            ${renderLineupCard(
              teamB.name,
              teamBEntry.lineup.bench,
              "Bench"
            )}
          </div>
        </section>
      </div>
    `;
  }

  function renderScoreboardTeam(team, entry) {
    const showTouchdowns = state.year >= 2019;
    const artStyle = team.art
      ? ` style="--team-art: url('${escapeCssUrl(team.art)}')"`
      : "";

    return `
      <article
        class="matchup-scoreboard__team${entry.winner ? " is-winner" : ""}"
        ${artStyle}
      >
        <p class="matchup-scoreboard__seed">
          Seed ${escapeHTML(entry.seed)}
          ${entry.winner ? " · Winner" : ""}
        </p>

        <h3 class="matchup-scoreboard__name">
          ${escapeHTML(team.name)}
        </h3>

        <p class="matchup-scoreboard__owner">
          Owner: ${escapeHTML(team.owner)}
        </p>

        <div class="matchup-scoreboard__stats">
          <strong class="matchup-scoreboard__score">
            ${formatScore(entry.score)}
          </strong>

${showTouchdowns
  ? `
      <span class="matchup-scoreboard__tds">
        <strong>
          ${escapeHTML(entry.touchdowns)}
        </strong>

        <span>
          Touchdowns
        </span>
      </span>
    `
  : ""}
          </span>
        </div>
      </article>
    `;
  }

  function renderLineupCard(
    teamName,
    players,
    label
  ) {
    return `
      <article class="lineup-card">
        <h4 class="lineup-card__heading">
          ${escapeHTML(teamName)} — ${escapeHTML(label)}
        </h4>

        <table class="lineup-table">
          <thead>
            <tr>
              <th scope="col">Player</th>
              <th scope="col">Pos.</th>
              <th scope="col">NFL</th>
              <th scope="col">Pts.</th>
            </tr>
          </thead>

          <tbody>
            ${players
              .map(
                (player) => `
                  <tr>
                    <td class="lineup-table__player">
                      ${escapeHTML(player.name)}
                    </td>

                    <td>
                      ${escapeHTML(player.position)}
                    </td>

                    <td>
                      ${escapeHTML(player.nflTeam)}
                    </td>

                    <td>
                      ${formatScore(player.points)}
                    </td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </article>
    `;
  }

  function handleKeydown(event) {
    if (elements.modal?.hidden) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();

      closeModal({
        updateUrl: true,
        restoreFocus: true
      });

      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusable = [
      ...elements.modal.querySelectorAll(
        'button:not([disabled]), [href], select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ].filter(
      (element) =>
        !element.hidden &&
        element.offsetParent !== null
    );

    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }

  function writeUrl({ matchup }, mode) {
    const url = new URL(window.location.href);

    url.searchParams.set(
      "year",
      String(state.year)
    );

    url.searchParams.set(
      "bracket",
      state.bracket
    );

    if (matchup) {
      url.searchParams.set(
        "matchup",
        matchup
      );
    } else {
      url.searchParams.delete("matchup");
    }

    const method =
      mode === "replace"
        ? "replaceState"
        : "pushState";

    window.history[method](
      {
        bracketPage: true
      },
      "",
      url
    );
  }

  function formatScore(value) {
    const number = Number(value);

    return Number.isFinite(number)
      ? number.toFixed(2)
      : escapeHTML(value);
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHTML(value);
  }

  function escapeCssUrl(value) {
    return String(value ?? "").replace(
      /[\\'"()\n\r]/g,
      ""
    );
  }

  function cssEscape(value) {
    if (window.CSS?.escape) {
      return window.CSS.escape(value);
    }

    return String(value).replace(
      /([ #;?%&,.+*~\\':"!^$[\]()=>|/@])/g,
      "\\$1"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );
  } else {
    init();
  }
})();
