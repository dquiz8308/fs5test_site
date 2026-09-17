// FS5 Sleeper proxy. League/matchup endpoints use Sleeper's public v1 API.
// Player-name lookups are handled specially: Sleeper's full NFL player catalog is
// now ~14MB, so we filter it server-side and return only the requested IDs.

let playerCatalogCache = null;
let playerCatalogFetchedAt = 0;
const PLAYER_CATALOG_CACHE_MS = 24 * 60 * 60 * 1000;

exports.handler = async function (event) {
  const qs = event.queryStringParameters || {};
  const source = qs.source === 'scoreboard' ? 'scoreboard' : (qs.source === 'data' ? 'data' : (qs.source === 'players' ? 'players' : (qs.source === 'news' ? 'news' : 'app')));

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
