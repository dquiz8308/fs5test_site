// Background Discord alerts for FS5 Live Scores.
// The webhook URL is read only from Netlify's encrypted
// FS5_DISCORD_WEBHOOK_URL environment variable.

const { getStore } = require('@netlify/blobs');

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

exports.handler = async function () {
  const webhookUrl = String(process.env.FS5_DISCORD_WEBHOOK_URL || '').trim();
  if (!isDiscordWebhook(webhookUrl)) {
    console.warn('FS5 Discord alerts skipped: FS5_DISCORD_WEBHOOK_URL is not configured.');
    return { statusCode: 204 };
  }

  try {
    const nflState = await sleeper('/v1/state/nfl');
    const week = readCurrentWeek(nflState);
    if (!week) throw new Error('Sleeper did not provide a valid current week.');

    const [users, rosters, matchups, stats, scoreboard] = await Promise.all([
      sleeper('/v1/league/' + LEAGUE_ID + '/users'),
      sleeper('/v1/league/' + LEAGUE_ID + '/rosters'),
      sleeper('/v1/league/' + LEAGUE_ID + '/matchups/' + week),
      sleeper('/v1/stats/nfl/regular/' + SEASON + '/' + week),
      nflScoreboard(week)
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
      gamesByTeam: gameDirectory(scoreboard)
    });
    const store = getStore(EVENT_STORE);
    await purgeExpiredStoredData(store);
    const previous = await readSnapshot(store);

    // Prime the service once rather than replaying pre-existing scoring from
    // before Discord alerts were enabled.
    if (!previous || previous.week !== snapshot.week) {
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
  const response = await fetch('https://api.sleeper.app' + path, {
    headers: { Accept: 'application/json', 'User-Agent': 'FS5-Discord-Alerts/1.0' }
  });
  if (!response.ok) throw new Error('Sleeper ' + response.status + ' for ' + path);
  return response.json();
}

function readCurrentWeek(state) {
  const week = Number(state && (state.display_week || state.week));
  return Number.isInteger(week) && week >= 1 && week <= 18 ? week : 0;
}

async function nflScoreboard(week) {
  const url = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=' +
    encodeURIComponent(week) + '&seasontype=2&season=' + SEASON + '&limit=1000';
  const response = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'FS5-Discord-Alerts/1.0' } });
  if (!response.ok) throw new Error('ESPN scoreboard ' + response.status);
  const data = await response.json();
  return (data.events || []).map(event => {
    const competition = event.competitions && event.competitions[0] || {};
    const status = competition.status || event.status || {};
    const type = status.type || {};
    return {
      teams: (competition.competitors || []).map(entry => String(entry.team && entry.team.abbreviation || '').toUpperCase()).filter(Boolean),
      state: type.completed ? 'complete' : (type.state === 'in' ? 'in_game' : 'pre_game'),
      period: Number(status.period || 0)
    };
  });
}

function gameDirectory(games) {
  const byTeam = {};
  games.forEach(game => game.teams.forEach(team => { byTeam[team] = game; }));
  return byTeam;
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

  const response = await fetch('https://api.sleeper.app/v1/players/nfl', {
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
      points: Number(matchup.points || 0) + Number(matchup.custom_points || 0)
    });

    (Array.isArray(matchup.starters) ? matchup.starters : []).filter(Boolean).forEach(rawId => {
      const id = String(rawId);
      const meta = input.playerMeta[id] || { name: 'Unknown player', team: '' };
      // A starter whose NFL team has no game this week is on bye, so it must
      // not keep the fantasy matchup from becoming final.
      const game = input.gamesByTeam[meta.team] || { state: 'bye', period: 0 };
      const fantasyPoints = Number(matchup.players_points && matchup.players_points[id] || 0);
      players[id] = {
        id,
        rosterId,
        name: meta.name,
        nflTeam: meta.team,
        fs5Team: teamName,
        points: Number.isFinite(fantasyPoints) ? fantasyPoints : 0,
        touchdowns: touchdownTotal(input.stats && input.stats[id]),
        gameState: game.state,
        period: Number(game.period || 0)
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
    if (player.points === 0 && player.gameState === 'in_game' && player.period >= 4 && !before.iceWatch) {
      events.push({
        key: 'ice-watch-' + current.week + '-' + id,
        content: '🧊 **ICE WATCH:** ' + player.name + ' is scoreless in the 4th quarter for **' + player.fs5Team + '**.'
      });
    }
    if (player.points === 0 && player.gameState === 'complete' && !before.iceBaby) {
      events.push({
        key: 'ice-baby-' + current.week + '-' + id,
        content: '❄️ **ICE ICE BABY:** ' + player.name + ' finished with 0.00 points for **' + player.fs5Team + '**.'
      });
    }
    player.iceWatch = player.points === 0 && player.gameState === 'in_game' && player.period >= 4;
    player.iceBaby = player.points === 0 && player.gameState === 'complete';
  });

  Object.keys(current.matchups).forEach(matchupId => {
    const teams = current.matchups[matchupId];
    const priorTeams = previous.matchups && previous.matchups[matchupId] || [];
    const rosterIds = new Set(teams.map(team => team.rosterId));
    const participantIds = Object.keys(current.players).filter(id => rosterIds.has(current.players[id].rosterId));
    const final = participantIds.length > 0 && participantIds.every(id => {
      const state = current.players[id].gameState;
      return state === 'complete' || state === 'bye';
    });
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

function touchdownTotal(stats) {
  return TD_KEYS.reduce((total, key) => total + Number(stats && stats[key] || 0), 0);
}

async function claimAndPost(store, webhookUrl, event) {
  const key = 'sent/' + event.key;
  const claim = await store.set(key, JSON.stringify({ createdAt: Date.now() }), { onlyIfNew: true });
  if (!claim.modified) return false;
  try {
    const response = await fetch(webhookUrl + (webhookUrl.includes('?') ? '&' : '?') + 'wait=false', {
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

function isDiscordWebhook(value) {
  return /^https:\/\/discord(?:app)?\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+(?:\?.*)?$/i.test(value);
}
