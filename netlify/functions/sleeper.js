// FS5 Sleeper proxy. League/matchup endpoints use Sleeper's public v1 API.
// Player-name lookups are handled specially: Sleeper's full NFL player catalog is
// now ~14MB, so we filter it server-side and return only the requested IDs.

let playerCatalogCache = null;
let playerCatalogFetchedAt = 0;
const PLAYER_CATALOG_CACHE_MS = 24 * 60 * 60 * 1000;
const PLAYER_SEASON_STATS_CACHE_MS = 60 * 1000;
const STANDINGS_TIMELINE_CACHE_MS = 5 * 60 * 1000;
const playerSeasonStatsCache = new Map();
const standingsTimelineCache = new Map();

exports.handler = async function (event) {
  const qs = event.queryStringParameters || {};
  const source = qs.source === 'scoreboard' ? 'scoreboard' : (qs.source === 'data' ? 'data' : (qs.source === 'players' ? 'players' : (qs.source === 'season-stats' ? 'season-stats' : (qs.source === 'news' ? 'news' : (qs.source === 'standings-timeline' ? 'standings-timeline' : 'app')))));

  if (source === 'scoreboard') {
    return getNflScoreboard(qs.season || '2026', qs.week || '1');
  }

  if (source === 'diagnostic') {
    return getScoreboardDiagnostic(qs.season || '2026', qs.week || '1');
  }

  if (source === 'news') {
    return getPlayerNews(qs.player || '', qs.team || '');
  }

  if (source === 'players') {
    return getRequestedPlayers(qs.ids || '');
  }

  if (source === 'season-stats') {
    return getPlayerSeasonStats(qs.player || '', qs.season || '2026', qs.week || '1');
  }

  if (source === 'standings-timeline') {
    return getStandingsTimeline(qs.league || '');
  }

  let path = qs.path || '';
  try { path = decodeURIComponent(path); } catch (_) {}
  if (!path.startsWith('/')) path = '/' + path;
  if (!path.startsWith('/v1/') && !path.startsWith('/schedule/')) path = '/v1' + path;

  if (!/^\/(v1\/)?[A-Za-z0-9_?=&.\-\/]+$/.test(path)) {
    return json(400, { error: 'Invalid Sleeper API path.' });
  }

  const hosts = source === 'data'
    ? ['https://api.sleeper.com']
    : ['https://api.sleeper.app'];

  if (path.includes('/league/') && path.includes('/matchups/')) {
    hosts.push('https://api.sleeper.com');
  }

  let lastError = 'Sleeper request failed.';
  for (const host of hosts) {
    try {
      const response = await fetch(host + path, {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'User-Agent': 'FS5-Live-Scores/1.0' }
      });
      const text = await response.text();
      if (response.ok) {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store, max-age=0'
          },
          body: text
        };
      }
      lastError = `Sleeper ${response.status} from ${host}${path}`;
      if (!path.includes('/matchups/')) break;
    } catch (err) {
      lastError = err && err.message ? err.message : lastError;
    }
  }
  return json(502, { error: lastError, path, source });
};

async function sleeperJson(path) {
  let lastError = 'Sleeper request failed.';
  for (const host of ['https://api.sleeper.app', 'https://api.sleeper.com']) {
    try {
      const response = await fetch(host + path, { headers: { 'Accept': 'application/json', 'User-Agent': 'FS5-Live-Scores/1.0' } });
      if (!response.ok) { lastError = `Sleeper ${response.status} from ${host}${path}`; continue; }
      return await response.json();
    } catch (error) { lastError = error && error.message ? error.message : lastError; }
  }
  throw new Error(lastError);
}

function sleeperTeamImage(user) {
  const customAvatar = user && user.metadata && user.metadata.avatar;
  if (customAvatar) {
    const value = String(customAvatar).trim();
    if (/^https?:\/\//i.test(value)) return value;
    if (/^\/\//.test(value)) return 'https:' + value;
    if (value.charAt(0) === '/') return 'https://sleepercdn.com' + value;
    return 'https://sleepercdn.com/' + value.replace(/^\/+/, '');
  }
  return user && user.avatar ? 'https://sleepercdn.com/avatars/' + encodeURIComponent(String(user.avatar)) : '';
}

function numberValue(value) { const number = Number(value); return Number.isFinite(number) ? number : 0; }

function rankedStandings(totals) {
  return Array.from(totals.values()).sort((first, second) => {
    if (second.wins !== first.wins) return second.wins - first.wins;
    if (first.losses !== second.losses) return first.losses - second.losses;
    if (second.points_for !== first.points_for) return second.points_for - first.points_for;
    return first.roster_id - second.roster_id;
  }).map((team, index) => Object.assign({}, team, { rank: index + 1 }));
}

async function getStandingsTimeline(leagueId) {
  const id = String(leagueId || '').trim();
  if (!/^\d{10,25}$/.test(id)) return json(400, { error: 'A valid Sleeper league ID is required.' });
  const cached = standingsTimelineCache.get(id);
  if (cached && Date.now() - cached.saved < STANDINGS_TIMELINE_CACHE_MS) return cached.response;
  try {
    const [league, rosters, users, drafts] = await Promise.all([
      sleeperJson('/v1/league/' + id), sleeperJson('/v1/league/' + id + '/rosters'),
      sleeperJson('/v1/league/' + id + '/users'), sleeperJson('/v1/league/' + id + '/drafts')
    ]);
    if (!league || !Array.isArray(rosters) || !Array.isArray(users) || !Array.isArray(drafts)) throw new Error('Sleeper returned incomplete league data.');
    const usersById = new Map(users.map(user => [String(user.user_id), user]));
    const draft = drafts.find(item => String(item.draft_id) === String(league.draft_id)) || drafts.find(item => item.status === 'complete');
    const draftOrder = draft && draft.draft_order || {};
    const teams = rosters.map(roster => {
      const user = usersById.get(String(roster.owner_id)) || {};
      const metadata = user.metadata || {};
      return { roster_id: Number(roster.roster_id), owner_name: String(metadata.owner_name || user.display_name || user.username || 'FS5 Owner').trim(), team_name: String(metadata.team_name || user.display_name || user.username || 'FS5 Team').trim(), avatar: sleeperTeamImage(user), draft_order: Number(draftOrder[String(roster.owner_id)]) || null };
    }).filter(team => Number.isInteger(team.roster_id));
    if (!teams.length || teams.some(team => !team.draft_order)) throw new Error('Sleeper draft order is not available for this league.');
    const completedWeek = Math.max(0, Math.min(17, Number(league.settings && league.settings.last_scored_leg) || 0));
    const matchupSets = await Promise.all(Array.from({ length: completedWeek }, (_, index) => sleeperJson('/v1/league/' + id + '/matchups/' + (index + 1))));
    const totals = new Map(teams.map(team => [team.roster_id, { roster_id: team.roster_id, wins: 0, losses: 0, ties: 0, points_for: 0 }]));
    const preStandings = teams.slice().sort((first, second) => first.draft_order - second.draft_order).map((team, index) => ({ roster_id: team.roster_id, rank: index + 1, wins: 0, losses: 0, ties: 0, points_for: 0 }));
    const frames = [{ week: 0, label: 'PRE', standings: preStandings }];
    matchupSets.forEach((entries, index) => {
      const matchups = new Map();
      (Array.isArray(entries) ? entries : []).forEach(entry => {
        const matchupId = Number(entry && entry.matchup_id); const rosterId = Number(entry && entry.roster_id);
        if (!Number.isInteger(matchupId) || !Number.isInteger(rosterId) || !totals.has(rosterId)) return;
        if (!matchups.has(matchupId)) matchups.set(matchupId, []);
        matchups.get(matchupId).push(entry);
      });
      matchups.forEach(entriesForMatchup => {
        if (entriesForMatchup.length !== 2) return;
        const first = entriesForMatchup[0]; const second = entriesForMatchup[1];
        const firstPoints = numberValue(first.points) + numberValue(first.custom_points); const secondPoints = numberValue(second.points) + numberValue(second.custom_points);
        const firstTotal = totals.get(Number(first.roster_id)); const secondTotal = totals.get(Number(second.roster_id));
        firstTotal.points_for += firstPoints; secondTotal.points_for += secondPoints;
        if (firstPoints > secondPoints) { firstTotal.wins += 1; secondTotal.losses += 1; }
        else if (secondPoints > firstPoints) { secondTotal.wins += 1; firstTotal.losses += 1; }
        else { firstTotal.ties += 1; secondTotal.ties += 1; }
      });
      frames.push({ week: index + 1, label: 'W' + (index + 1), standings: rankedStandings(totals) });
    });
    const response = { statusCode: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=60' }, body: JSON.stringify({ league_id: id, season: Number(league.season) || null, playoff_teams: Math.max(1, Number(league.settings && league.settings.playoff_teams) || 6), through_week: completedWeek, teams: teams, frames: frames }) };
    standingsTimelineCache.set(id, { saved: Date.now(), response: response });
    return response;
  } catch (error) { return json(502, { error: error && error.message ? error.message : 'Standings timeline is unavailable.' }); }
}

async function getRequestedPlayers(idsParam) {
  const ids = Array.from(new Set(String(idsParam || '')
    .split(',')
    .map(id => id.trim())
    .filter(id => /^[A-Za-z0-9_-]+$/.test(id))))
    .slice(0, 400);

  if (!ids.length) return json(400, { error: 'At least one valid player ID is required.' });

  let catalog = playerCatalogCache;
  if (!catalog || Date.now() - playerCatalogFetchedAt > PLAYER_CATALOG_CACHE_MS) {
    let lastError = 'Unable to load the Sleeper player catalog.';
    for (const host of ['https://api.sleeper.app', 'https://api.sleeper.com']) {
      try {
        const response = await fetch(host + '/v1/players/nfl', {
          headers: { 'Accept': 'application/json', 'User-Agent': 'FS5-Live-Scores/1.0' }
        });
        if (!response.ok) {
          lastError = `Sleeper player catalog returned ${response.status}.`;
          continue;
        }
        const data = await response.json();
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
          lastError = 'Sleeper player catalog returned an invalid response.';
          continue;
        }
        catalog = data;
        playerCatalogCache = data;
        playerCatalogFetchedAt = Date.now();
        break;
      } catch (err) {
        lastError = err && err.message ? err.message : lastError;
      }
    }
    if (!catalog) return json(502, { error: lastError });
  }

  const players = {};
  for (const id of ids) {
    if (catalog[id]) players[id] = catalog[id];
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    },
    body: JSON.stringify(players)
  };
}

async function getPlayerSeasonStats(playerId, season, throughWeek) {
  const id = String(playerId || '').trim();
  const year = Number(season) || 2026;
  const lastWeek = Math.max(1, Math.min(17, Number(throughWeek) || 1));
  if (!/^[A-Za-z0-9_-]+$/.test(id)) return json(400, { error: 'A valid player ID is required.' });

  const cacheKey = `${year}:${lastWeek}:${id}`;
  const cached = playerSeasonStatsCache.get(cacheKey);
  if (cached && Date.now() - cached.saved < PLAYER_SEASON_STATS_CACHE_MS) return cached.response;

  async function getWeek(week) {
    let lastError = 'Sleeper weekly stats request failed.';
    for (const host of ['https://api.sleeper.app', 'https://api.sleeper.com']) {
      try {
        const response = await fetch(`${host}/v1/stats/nfl/regular/${year}/${week}`, {
          headers: { 'Accept': 'application/json', 'User-Agent': 'FS5-Live-Scores/1.0' }
        });
        if (!response.ok) {
          lastError = `Sleeper weekly stats returned ${response.status}.`;
          continue;
        }
        const data = await response.json();
        return { week, stats: data && data[id] || null };
      } catch (err) {
        lastError = err && err.message ? err.message : lastError;
      }
    }
    throw new Error(lastError);
  }

  const results = await Promise.allSettled(Array.from({ length: lastWeek }, (_, index) => getWeek(index + 1)));
  const weeks = results.map((result, index) => result.status === 'fulfilled' ? result.value : { week: index + 1, stats: null });
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60'
    },
    body: JSON.stringify({ playerId: id, season: year, throughWeek: lastWeek, weeks })
  };
  playerSeasonStatsCache.set(cacheKey, { saved: Date.now(), response });
  return response;
}


async function getNflScoreboard(season, week) {
  // Primary source: ESPN's week-specific NFL scoreboard. This is a single request
  // and is much more reliable for Netlify than making seven date requests.
  const year = Number(season) || 2026;
  const wk = Math.max(1, Number(week) || 1);
  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'FS5-Live-Scores/1.0'
  };

  async function fetchJson(url) {
    const response = await fetch(url, { headers });
    const text = await response.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (_) {}
    if (!response.ok) throw new Error(`Scoreboard returned ${response.status}.`);
    return data || {};
  }

  function mapScoreboard(data) {
    const collected = new Map();
    for (const event of (data.events || [])) {
      const comp = event.competitions && event.competitions[0] || {};
      const competitors = comp.competitors || [];
      const home = competitors.find(c => c.homeAway === 'home') || {};
      const away = competitors.find(c => c.homeAway === 'away') || {};
      const st = comp.status || event.status || {};
      const type = st.type || {};
      const mapTeam = c => c.team && (c.team.abbreviation || c.team.shortDisplayName || c.team.displayName) || '';
      const startMs = Date.parse(String(event.date || ''));
      const eastern = Number.isFinite(startMs) ? new Intl.DateTimeFormat('en-US', {
        timeZone:'America/New_York', weekday:'short', month:'short', day:'numeric',
        year:'numeric', hour:'numeric', minute:'2-digit', hour12:true
      }).formatToParts(new Date(startMs)) : [];
      const part = key => { const hit = eastern.find(x => x.type === key); return hit ? hit.value : ''; };
      const easternDate = eastern.length ? [part('weekday'), part('month'), part('day'), part('year')].filter(Boolean).join(' ') : '';
      const easternTime = eastern.length ? `${part('hour')}:${part('minute')} ${part('dayPeriod')} ET` : '';
      const game = {
        id: event.id,
        week: wk,
        date: event.date,
        start_time: event.date,
        eastern_date: easternDate,
        eastern_time: easternTime,
        home: mapTeam(home),
        away: mapTeam(away),
        home_score: home.score != null ? Number(home.score) : null,
        away_score: away.score != null ? Number(away.score) : null,
        status: type.completed ? 'complete' : (type.state === 'in' ? 'in_game' : 'pre_game'),
        period: Number(st.period || 0),
        clock: st.displayClock || '',
        detail: type.shortDetail || type.detail || ''
      };
      if (game.id) collected.set(String(game.id), game);
    }
    return Array.from(collected.values());
  }

  const errors = [];

  // 1) Week-specific endpoint: preferred for both live and completed weeks.
  try {
    const data = await fetchJson(
      `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=${wk}&seasontype=2&season=${year}&limit=1000`
    );
    const games = mapScoreboard(data);
    if (games.length) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
          'X-FS5-Scoreboard-Source': 'ESPN-week'
        },
        body: JSON.stringify(games)
      };
    }
    errors.push('ESPN week endpoint returned zero games.');
  } catch (err) {
    errors.push('ESPN week: ' + (err && err.message ? err.message : 'request failed'));
  }

  // 2) Fallback: date window around the NFL week. This protects against an
  // ESPN week endpoint change while still avoiding the old seven-request-only path.
  try {
    const seasonStart = new Date(Date.UTC(year, 8, 9));
    const weekStart = new Date(seasonStart.getTime() + (wk - 1) * 7 * 86400000);
    const ymd = d => d.toISOString().slice(0, 10).replace(/-/g, '');
    const urls = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart.getTime() + i * 86400000);
      urls.push(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${ymd(d)}&limit=1000`);
    }
    const results = await Promise.allSettled(urls.map(fetchJson));
    const merged = new Map();
    for (const result of results) {
      if (result.status !== 'fulfilled') continue;
      for (const game of mapScoreboard(result.value)) merged.set(String(game.id), game);
    }
    if (merged.size) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
          'X-FS5-Scoreboard-Source': 'ESPN-dates'
        },
        body: JSON.stringify(Array.from(merged.values()))
      };
    }
    errors.push('ESPN date fallback returned zero games.');
  } catch (err) {
    errors.push('ESPN date fallback: ' + (err && err.message ? err.message : 'request failed'));
  }

  return json(502, {
    error: 'NFL scoreboard unavailable.',
    source: 'ESPN',
    week: wk,
    season: year,
    details: errors
  });
}

async function getScoreboardDiagnostic(season, week) {
  const year = Number(season) || 2026;
  const wk = Math.max(1, Number(week) || 1);
  const sleeperUrl = `https://api.sleeper.app/schedule/nfl/regular/${year}`;
  const espnUrl = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=${wk}&seasontype=2&season=${year}&limit=1000`;
  const result = {
    season: year,
    week: wk,
    sleeper: { ok: false, games: 0, error: '' },
    espn: { ok: false, games: 0, error: '' },
    sample: []
  };
  try {
    const r = await fetch(sleeperUrl, { headers: { 'Accept':'application/json', 'User-Agent':'FS5-Live-Scores/1.0' } });
    const d = await r.json();
    const games = Array.isArray(d) ? d.filter(g => Number(g.week) === wk) : [];
    result.sleeper.ok = r.ok;
    result.sleeper.games = games.length;
  } catch (e) { result.sleeper.error = e.message || String(e); }
  try {
    const r = await fetch(espnUrl, { headers: { 'Accept':'application/json', 'User-Agent':'FS5-Live-Scores/1.0' } });
    const d = await r.json();
    const events = Array.isArray(d.events) ? d.events : [];
    result.espn.ok = r.ok;
    result.espn.games = events.length;
    result.sample = events.slice(0, 5).map(e => {
      const c = e.competitions && e.competitions[0] || {};
      const teams = c.competitors || [];
      const home = teams.find(x => x.homeAway === 'home') || {};
      const away = teams.find(x => x.homeAway === 'away') || {};
      const st = c.status && c.status.type || {};
      return {
        id: e.id,
        matchup: `${away.team && away.team.abbreviation || ''} @ ${home.team && home.team.abbreviation || ''}`,
        status: st.name || '',
        completed: !!st.completed,
        away_score: away.score != null ? Number(away.score) : null,
        home_score: home.score != null ? Number(home.score) : null
      };
    });
  } catch (e) { result.espn.error = e.message || String(e); }
  return json(200, result);
}

async function getPlayerNews(playerName, team) {
  const name = String(playerName || '').trim();
  const nflTeam = String(team || '').trim();
  if (!name) return json(400, { error: 'Player name is required.' });

  // Google News RSS is used only as a current-news feed. We request it on
  // demand when a manager opens a player, rather than for every player on load.
  const query = [name, nflTeam, 'NFL'].filter(Boolean).join(' ');
  const rssUrl = 'https://news.google.com/rss/search?q=' + encodeURIComponent(query) + '&hl=en-US&gl=US&ceid=US:en';
  try {
    const response = await fetch(rssUrl, {
      headers: { 'Accept': 'application/rss+xml, application/xml, text/xml', 'User-Agent': 'FS5-Live-Scores/1.0' }
    });
    if (!response.ok) return json(502, { error: `News feed returned ${response.status}.` });
    const xml = await response.text();
    const items = parseRssItems(xml).slice(0, 5);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=900'
      },
      body: JSON.stringify({ query, items })
    };
  } catch (err) {
    return json(502, { error: err && err.message ? err.message : 'Unable to load player news.' });
  }
}

function parseRssItems(xml) {
  const items = [];
  const blocks = String(xml || '').match(/<item[\s\S]*?<\/item>/gi) || [];
  for (const block of blocks) {
    const title = xmlTag(block, 'title');
    const link = xmlTag(block, 'link');
    const pubDate = xmlTag(block, 'pubDate');
    const sourceMatch = block.match(/<source(?:\s+url=["']([^"']*)["'])?>([\s\S]*?)<\/source>/i);
    const source = sourceMatch ? decodeXml(sourceMatch[2]).trim() : '';
    if (!title || !link) continue;
    items.push({ title: decodeXml(title).trim(), link: decodeXml(link).trim(), pubDate: decodeXml(pubDate || '').trim(), source });
  }
  return items;
}

function xmlTag(block, tag) {
  const re = new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)<\\/' + tag + '>', 'i');
  const match = String(block || '').match(re);
  return match ? match[1].trim() : '';
}

function decodeXml(value) {
  return String(value || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0'
    },
    body: JSON.stringify(body)
  };
}
