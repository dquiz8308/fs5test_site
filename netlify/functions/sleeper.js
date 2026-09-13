// FS5 Sleeper proxy. League/matchup endpoints use Sleeper's public v1 API.
// Player-name lookups are handled specially: Sleeper's full NFL player catalog is
// now ~14MB, so we filter it server-side and return only the requested IDs.

exports.handler = async function (event) {
  const qs = event.queryStringParameters || {};
  const source = qs.source === 'data' ? 'data' : (qs.source === 'players' ? 'players' : (qs.source === 'news' ? 'news' : 'app'));

  if (source === 'news') {
    return getPlayerNews(qs.player || '', qs.team || '');
  }

  // Independent live-game clock feed. This is deliberately separate from
  // Sleeper so a slow/failed third-party scoreboard can never block the
  // Live Scores page from loading. ESPN's public scoreboard exposes the
  // current quarter and displayed game clock.
  if (source === 'clock') {
    return getLiveGameClock();
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


async function getLiveGameClock() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  const url = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'User-Agent': 'FS5-Live-Scores/1.0' },
      signal: controller.signal
    });
    const text = await response.text();
    if (!response.ok) return json(502, { error: `ESPN scoreboard returned ${response.status}.` });
    const payload = JSON.parse(text || '{}');
    const games = (payload.events || []).map(normalizeEspnGame).filter(Boolean);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=15, stale-while-revalidate=30'
      },
      body: JSON.stringify({ source: 'espn', updated: new Date().toISOString(), games })
    };
  } catch (err) {
    const message = err && err.name === 'AbortError' ? 'ESPN scoreboard timed out.' : (err && err.message ? err.message : 'Unable to load live game clock.');
    return json(504, { error: message });
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeEspnGame(event) {
  const competition = event && event.competitions && event.competitions[0];
  const status = competition && competition.status ? competition.status : (event && event.status) || {};
  if (!competition) return null;
  const competitors = competition.competitors || [];
  const teams = competitors.map(function (c) {
    const t = c.team || {};
    return { abbreviation: t.abbreviation || '', id: t.id || '', name: t.displayName || t.name || '' };
  });
  const period = Number(status.period || 0);
  const displayClock = String(status.displayClock || '');
  const state = String((status.type && status.type.state) || '').toLowerCase();
  const shortDetail = String((status.type && status.type.shortDetail) || '');
  const completed = state === 'post' || /final/i.test(shortDetail);
  const pregame = state === 'pre';
  const inGame = state === 'in';
  let remainingSeconds = null;
  if (completed) remainingSeconds = 0;
  else if (pregame) remainingSeconds = 3600;
  else if (inGame) {
    const match = displayClock.match(/^(\d+):(\d{2})$/);
    const clockSeconds = match ? Number(match[1]) * 60 + Number(match[2]) : 0;
    if (period >= 1 && period <= 4) remainingSeconds = Math.max(0, (4 - period) * 900 + clockSeconds);
    else if (period >= 5) remainingSeconds = Math.max(0, 600 + clockSeconds);
    else remainingSeconds = 0;
  }
  return {
    id: String(event.id || competition.id || ''),
    teams,
    state: inGame ? 'in_game' : (completed ? 'complete' : (pregame ? 'pre_game' : state || 'unknown')),
    period,
    displayClock,
    detail: shortDetail,
    remainingSeconds,
    remainingPct: remainingSeconds == null ? null : Math.max(0, Math.min(100, Math.round(remainingSeconds / 36)))
  };
}

async function getRequestedPlayers(idsParam) {
  const ids = String(idsParam || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 300);

  if (!ids.length) return json(200, {});

  try {
    const response = await fetch('https://api.sleeper.app/v1/players/nfl', {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'User-Agent': 'FS5-Live-Scores/1.0' }
    });
    if (!response.ok) return json(502, { error: `Sleeper player catalog returned ${response.status}.` });

    const all = await response.json();
    const wanted = {};
    ids.forEach(id => {
      if (all && all[id]) wanted[id] = all[id];
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400'
      },
      body: JSON.stringify(wanted)
    };
  } catch (err) {
    return json(502, { error: err && err.message ? err.message : 'Unable to load Sleeper player catalog.' });
  }
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body)
  };
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
