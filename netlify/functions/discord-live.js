// Background Discord alerts for FS5 Live Scores.
// The webhook URL is read only from Netlify's encrypted
// FS5_DISCORD_WEBHOOK_URL environment variable.

const { connectLambda, getStore } = require('@netlify/blobs');

const LEAGUE_ID = '1387297022695993344';
const SEASON = 2026;
const EVENT_STORE = 'fs5-discord-live-events';
const SNAPSHOT_KEY = 'snapshot/current';
const STARTER_META_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const STARTER_CACHE_RETENTION_MS = 14 * 24 * 60 * 60 * 1000;
const SENT_EVENT_RETENTION_MS = 45 * 24 * 60 * 60 * 1000;
const CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;
const LAST_CLEANUP_KEY = 'maintenance/last-sent-event-cleanup';
const TD_KEYS = ['rec_td', 'rush_td', 'pass_td', 'def_td', 'fum_td', 'st_td', 'kr_td', 'pr_td'];

exports.handler = async function (event) {
  if (String(process.env.FS5_DISCORD_LIVE_ENABLED || '').toLowerCase() !== 'true') {
    console.info('FS5 Discord alerts are preserved but not enabled.');
    return { statusCode: 204 };
  }
  const webhookUrl = String(process.env.FS5_DISCORD_WEBHOOK_URL || '').trim();
  if (!isDiscordWebhook(webhookUrl)) {
    console.warn('FS5 Discord alerts skipped: FS5_DISCORD_WEBHOOK_URL is not configured.');
    return { statusCode: 204 };
  }

  try {
    connectLambda(event);
    const nflState = await sleeper('/v1/state/nfl');
    const week = readCurrentWeek(nflState);
    if (!week) throw new Error('Sleeper did not provide a valid current week.');

    const [users, rosters, matchups, stats, schedule, yahooPeriods] = await Promise.all([
      sleeper('/v1/league/' + LEAGUE_ID + '/users'),
      sleeper('/v1/league/' + LEAGUE_ID + '/rosters'),
      sleeper('/v1/league/' + LEAGUE_ID + '/matchups/' + week),
      sleeper('/v1/stats/nfl/regular/' + SEASON + '/' + week),
      sleeper('/schedule/nfl/regular/' + SEASON),
      yahooPeriodsForWeek(week)
    ]);
    const starterIds = unique((Array.isArray(matchups) ? matchups : []).flatMap(matchup =>
      (Array.isArray(matchup.starters) ? matchup.starters : []).filter(Boolean).map(String)
    ));
    const snapshot = buildSnapshot({
      week,
      matchups,
      stats,
      teams: teamDirectory(users, rosters),
      playerMeta: await starterMetadata(starterIds),
      gamesByTeam: gameDirectory(schedule, week, yahooPeriods),
      byeTeams: byeTeamsForWeek(schedule, week)
    });
    const store = getStore(EVENT_STORE);
    await purgeExpiredStoredData(store);
    const previous = await readSnapshot(store);

    // Prime the service once rather than replaying pre-existing scoring from
    // before Discord alerts were enabled.
    if (!previous || previous.week !== snapshot.week) {
      markSnapshotStates(snapshot);
      await store.set(SNAPSHOT_KEY, JSON.stringify(snapshot));
      console.info('FS5 Discord alerts primed for week ' + snapshot.week + '.');
      return { statusCode: 204 };
    }

    const events = deriveEvents(previous, snapshot);
    let sent = 0;
    for (const event of events) {
      if (await claimAndPost(store, webhookUrl, event)) sent += 1;
    }
    await store.set(SNAPSHOT_KEY, JSON.stringify(snapshot));
    console.info('FS5 Discord alert check complete: ' + sent + ' new event(s).');
    return { statusCode: 204 };
  } catch (error) {
    console.error('FS5 Discord alert check failed:', error && error.message ? error.message : error);
    return { statusCode: 500 };
  }
};

async function sleeper(path) {
  const response = await fetchWithTimeout('https://api.sleeper.app' + path, {
    headers: { Accept: 'application/json', 'User-Agent': 'FS5-Discord-Alerts/1.0' }
  });
  if (!response.ok) throw new Error('Sleeper ' + response.status + ' for ' + path);
  return response.json();
}

async function yahooPeriodsForWeek(week) {
  const periods = new Map();
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
  const url = 'https://api-secure.sports.yahoo.com/v1/editorial/s/scoreboard?leagues=nfl&date=' + encodeURIComponent(date);
  let status = null;

  try {
    const response = await fetchWithTimeout(url, {
      headers: { Accept: 'application/json', 'User-Agent': 'FS5-Discord-Alerts/1.0' }
    });
    status = response.status;
    const text = await response.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (_) {}

    const scoreboard = data && data.service && data.service.scoreboard;
    const gamesById = scoreboard && scoreboard.games;
    const teamsById = scoreboard && scoreboard.teams;
    if (!response.ok || !gamesById || typeof gamesById !== 'object' || !teamsById || typeof teamsById !== 'object') {
      console.warn('FS5 Yahoo period unavailable:', response.ok ? 'unexpected scoreboard schema' : 'HTTP ' + status);
      return periods;
    }

    const games = Object.values(gamesById).filter(game => game && typeof game === 'object');
    games.filter(game => Number(game.week_number) === Number(week)).forEach(game => {
      const home = teamsById[game.home_team_id] || {};
      const away = teamsById[game.away_team_id] || {};
      const key = nflGameKey(game.week_number, home.abbr, away.abbr);
      const period = Number(game.current_period_id);
      if (key && Number.isInteger(period) && period >= 1 && period <= 5) periods.set(key, period);
    });
    return periods;
  } catch (error) {
    console.warn('FS5 Yahoo period unavailable:', error && error.name === 'AbortError' ? 'request timed out' : 'request failed');
    return periods;
  }
}

function readCurrentWeek(state) {
  const week = Number(state && (state.display_week || state.week));
  return Number.isInteger(week) && week >= 1 && week <= 17 ? week : 0;
}

function gameDirectory(games, week, yahooPeriods) {
  const byTeam = {};
  (Array.isArray(games) ? games : []).forEach(game => {
    if (!game || Number(game.week) !== Number(week)) return;
    const rawState = String(game.status || '').toLowerCase();
    const state = rawState === 'complete' ? 'complete' :
      (rawState === 'in_game' ? 'in_game' : (rawState === 'pre_game' ? 'pre_game' : 'unknown'));
    const normalized = {
      teams: [game.home, game.away].map(team => String(team || '').toUpperCase()).filter(Boolean),
      state,
      period: yahooPeriods instanceof Map
        ? (yahooPeriods.get(nflGameKey(week, game.home, game.away)) || null)
        : null
    };
    if (normalized.teams.length !== 2) return;
    normalized.teams.forEach(team => { byTeam[team] = normalized; });
  });
  return byTeam;
}

function nflGameKey(week, home, away) {
  const gameWeek = Number(week);
  const homeAbbreviation = String(home || '').trim().toUpperCase();
  const awayAbbreviation = String(away || '').trim().toUpperCase();
  if (!Number.isInteger(gameWeek) || !homeAbbreviation || !awayAbbreviation || homeAbbreviation === awayAbbreviation) return '';
  return gameWeek + '|' + homeAbbreviation + '|' + awayAbbreviation;
}

function byeTeamsForWeek(schedule, week) {
  if (!Array.isArray(schedule)) return new Set();
  const games = schedule.filter(game => game && String(game.status || '').toLowerCase() !== 'canceled');
  const teamGameCounts = new Map();
  const teamsByWeek = new Map();
  let valid = games.length === 272;
  games.forEach(game => {
    const home = String(game.home || '').toUpperCase();
    const away = String(game.away || '').toUpperCase();
    const gameWeek = Number(game.week);
    if (!home || !away || home === away || !Number.isInteger(gameWeek) || gameWeek < 1 || gameWeek > 18) valid = false;
    if (!teamsByWeek.has(gameWeek)) teamsByWeek.set(gameWeek, new Set());
    const weekTeams = teamsByWeek.get(gameWeek);
    if (weekTeams.has(home) || weekTeams.has(away)) valid = false;
    weekTeams.add(home);
    weekTeams.add(away);
    [home, away].forEach(team => teamGameCounts.set(team, (teamGameCounts.get(team) || 0) + 1));
  });
  if (!valid || teamsByWeek.size !== 18 || Array.from(teamsByWeek.values()).some(teams => teams.size < 26 || teams.size > 32) ||
      teamGameCounts.size !== 32 || Array.from(teamGameCounts.values()).some(count => count !== 17)) return new Set();

  const scheduled = new Set();
  games.filter(game => Number(game.week) === week).forEach(game => {
    scheduled.add(String(game.home).toUpperCase());
    scheduled.add(String(game.away).toUpperCase());
  });
  return new Set(Array.from(teamGameCounts.keys()).filter(team => !scheduled.has(team)));
}

function teamDirectory(users, rosters) {
  const usersById = new Map((Array.isArray(users) ? users : []).map(user => [String(user.user_id), user]));
  const teams = {};
  (Array.isArray(rosters) ? rosters : []).forEach(roster => {
    const user = usersById.get(String(roster.owner_id)) || {};
    const metadata = user.metadata || {};
    teams[String(roster.roster_id)] = String(metadata.team_name || user.display_name || user.username || 'FS5 Team').trim();
  });
  return teams;
}

async function starterMetadata(ids) {
  const store = getStore(EVENT_STORE);
  const cacheKey = 'starters/' + SEASON + '-' + ids.slice().sort().join(',');
  const cached = await store.get(cacheKey, { type: 'json' });
  if (cached && cached.saved && Date.now() - Number(cached.saved) < STARTER_META_MAX_AGE_MS && cached.players) return cached.players;

  const response = await fetchWithTimeout('https://api.sleeper.app/v1/players/nfl', {
    headers: { Accept: 'application/json', 'User-Agent': 'FS5-Discord-Alerts/1.0' }
  });
  if (!response.ok) throw new Error('Sleeper player catalog ' + response.status);
  const catalog = await response.json();
  const players = {};
  ids.forEach(id => {
    const player = catalog && catalog[id] || {};
    players[id] = {
      name: String(player.full_name || [player.first_name, player.last_name].filter(Boolean).join(' ') || 'Unknown player'),
      team: String(player.team || '').toUpperCase()
    };
  });
  await store.set(cacheKey, JSON.stringify({ saved: Date.now(), players }));
  return players;
}

function buildSnapshot(input) {
  const players = {};
  const matchups = {};
  (Array.isArray(input.matchups) ? input.matchups : []).forEach(matchup => {
    const matchupId = String(matchup.matchup_id || matchup.roster_id);
    if (!matchups[matchupId]) matchups[matchupId] = [];
    const rosterId = String(matchup.roster_id);
    const teamName = input.teams[rosterId] || 'FS5 Team';
    matchups[matchupId].push({
      rosterId,
      teamName,
      points: matchupTotal(matchup)
    });

    (Array.isArray(matchup.starters) ? matchup.starters : []).filter(Boolean).forEach(rawId => {
      const id = String(rawId);
      const meta = input.playerMeta[id] || { name: 'Unknown player', team: '' };
      const game = input.gamesByTeam[meta.team];
      const gameState = game ? game.state : (meta.team && input.byeTeams.has(meta.team) ? 'bye' : 'unknown');
      const hasPlayerPoints = matchup.players_points && Object.prototype.hasOwnProperty.call(matchup.players_points, id);
      const fantasyPoints = hasPlayerPoints ? numericOrNull(matchup.players_points[id]) : null;
      players[id] = {
        id,
        rosterId,
        name: meta.name,
        nflTeam: meta.team,
        fs5Team: teamName,
        points: fantasyPoints,
        touchdowns: touchdownTotal(input.stats && input.stats[id]),
        gameState,
        period: game ? game.period : null
      };
    });
  });
  return { week: input.week, players, matchups };
}

function deriveEvents(previous, current) {
  const events = [];
  Object.keys(current.players).forEach(id => {
    const player = current.players[id];
    const before = previous.players && previous.players[id] || {};
    const touchdownIncrease = Math.max(0, Number(player.touchdowns) - Number(before.touchdowns || 0));
    if (touchdownIncrease && player.gameState === 'in_game') {
      events.push({
        key: 'td-' + current.week + '-' + id + '-' + player.touchdowns,
        content: '🏈 **TOUCHDOWN!** ' + player.name + ' scored for **' + player.fs5Team + '** (' + player.nflTeam + ').'
      });
    }
    const explicitZero = Number.isFinite(player.points) && player.points === 0;
    if (explicitZero && player.gameState === 'in_game' && player.period >= 4 && !before.iceWatch) {
      events.push({
        key: 'ice-watch-' + current.week + '-' + id,
        content: '🧊 **ICE WATCH:** ' + player.name + ' is scoreless in the 4th quarter for **' + player.fs5Team + '**.'
      });
    }
    if (explicitZero && player.gameState === 'complete' && !before.iceBaby) {
      events.push({
        key: 'ice-baby-' + current.week + '-' + id,
        content: '❄️ **ICE ICE BABY:** ' + player.name + ' finished with 0.00 points for **' + player.fs5Team + '**.'
      });
    }
    player.iceWatch = explicitZero && player.gameState === 'in_game' && player.period >= 4;
    player.iceBaby = explicitZero && player.gameState === 'complete';
  });

  Object.keys(current.matchups).forEach(matchupId => {
    const teams = current.matchups[matchupId];
    const priorTeams = previous.matchups && previous.matchups[matchupId] || [];
    const final = matchupIsFinal(current, teams);
    teams.final = final;
    if (final && !priorTeams.final && teams.length >= 2) {
      const first = teams[0];
      const second = teams[1];
      const result = first.points === second.points
        ? first.teamName + ' and ' + second.teamName + ' tied'
        : (first.points > second.points ? first.teamName : second.teamName) + ' won';
      events.push({
        key: 'final-' + current.week + '-' + matchupId,
        content: '🏁 **MATCHUP FINAL:** ' + result + ' · **' + format(first.points) + '–' + format(second.points) + '**.'
      });
    }
  });
  return events;
}

function markSnapshotStates(snapshot) {
  Object.values(snapshot.players || {}).forEach(player => {
    const explicitZero = Number.isFinite(player.points) && player.points === 0;
    player.iceWatch = explicitZero && player.gameState === 'in_game' && player.period >= 4;
    player.iceBaby = explicitZero && player.gameState === 'complete';
  });
  Object.values(snapshot.matchups || {}).forEach(teams => {
    teams.final = matchupIsFinal(snapshot, teams);
  });
  return snapshot;
}

function matchupIsFinal(snapshot, teams) {
  if (!Array.isArray(teams) || teams.length < 2) return false;
  return teams.every(team => {
    if (!Number.isFinite(team.points)) return false;
    const participantIds = Object.keys(snapshot.players || {}).filter(id => snapshot.players[id].rosterId === team.rosterId);
    return participantIds.length > 0 && participantIds.every(id => {
      const state = snapshot.players[id].gameState;
      return state === 'complete' || state === 'bye';
    });
  });
}

function matchupTotal(matchup) {
  const custom = Number(matchup && matchup.custom_points);
  if (matchup && matchup.custom_points != null && Number.isFinite(custom)) return custom;
  const standard = Number(matchup && matchup.points);
  return matchup && matchup.points != null && Number.isFinite(standard) ? standard : null;
}

function numericOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function touchdownTotal(stats) {
  return TD_KEYS.reduce((total, key) => total + Number(stats && stats[key] || 0), 0);
}

async function claimAndPost(store, webhookUrl, event) {
  const key = 'sent/' + event.key;
  const claim = await store.set(key, JSON.stringify({ createdAt: Date.now() }), { onlyIfNew: true });
  if (!claim.modified) return false;
  try {
    const response = await fetchWithTimeout(webhookUrl + (webhookUrl.includes('?') ? '&' : '?') + 'wait=false', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: event.content, allowed_mentions: { parse: [] } })
    });
    if (!response.ok) throw new Error('Discord webhook ' + response.status);
    return true;
  } catch (error) {
    await store.delete(key);
    throw error;
  }
}

async function purgeExpiredStoredData(store) {
  const now = Date.now();
  const lastCleanup = Number(await store.get(LAST_CLEANUP_KEY) || 0);
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

  const expiredKeys = [];
  const sentEvents = await store.list({ prefix: 'sent/' });
  for (const blob of sentEvents.blobs || []) {
    const saved = await store.get(blob.key);
    let createdAt = Date.parse(String(saved || ''));
    try {
      createdAt = Number(JSON.parse(saved).createdAt);
    } catch (_) {
      // Support the initial ISO-string format if any alerts were sent before
      // this retention policy was deployed.
    }
    if (Number.isFinite(createdAt) && createdAt < now - SENT_EVENT_RETENTION_MS) expiredKeys.push(blob.key);
  }

  const starterCaches = await store.list({ prefix: 'starters/' });
  for (const blob of starterCaches.blobs || []) {
    const saved = await store.get(blob.key, { type: 'json' });
    if (saved && Number(saved.saved) < now - STARTER_CACHE_RETENTION_MS) expiredKeys.push(blob.key);
  }

  await Promise.all(expiredKeys.map(key => store.delete(key)));
  await store.set(LAST_CLEANUP_KEY, String(now));
  if (expiredKeys.length) console.info('FS5 Discord alerts pruned ' + expiredKeys.length + ' expired stored item(s).');
}

async function readSnapshot(store) {
  const snapshot = await store.get(SNAPSHOT_KEY, { type: 'json' });
  return snapshot && typeof snapshot === 'object' ? snapshot : null;
}

function unique(values) {
  return Array.from(new Set(values));
}

function format(value) {
  return Number(value || 0).toFixed(2);
}

async function fetchWithTimeout(url, options, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, Object.assign({}, options || {}, { signal: controller.signal }));
  } finally {
    clearTimeout(timeout);
  }
}

function isDiscordWebhook(value) {
  return /^https:\/\/discord(?:app)?\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+(?:\?.*)?$/i.test(value);
}
