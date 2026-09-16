// FS5 Sleeper proxy. League/matchup endpoints use Sleeper's public v1 API.
// Player-name lookups are handled specially: Sleeper's full NFL player catalog is
// now ~14MB, so we filter it server-side and return only the requested IDs.

exports.handler = async function (event) {
  const qs = event.queryStringParameters || {};
  const source = qs.source === 'scoreboard' ? 'scoreboard' : (qs.source === 'data' ? 'data' : (qs.source === 'players' ? 'players' : (qs.source === 'news' ? 'news' : 'app')));

  if (source === 'scoreboard') {
    return getNflScoreboard(qs.season || '2026', qs.week || '1');
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


async function getNflScoreboard(season, week) {
  // ESPN is the source for real-world NFL kickoff times and scores. Query the
  // seven calendar days of the NFL week IN PARALLEL so the Netlify function does
  // not time out before it can return completed games. Sleeper's schedule is
  // merged in the browser only for fantasy game state (pre_game/in_game/complete).
  const seasonStart = new Date(Date.UTC(Number(season), 8, 9));
  const weekStart = new Date(seasonStart.getTime() + (Math.max(1, Number(week) || 1) - 1) * 7 * 86400000);
  const ymd = d => d.toISOString().slice(0, 10).replace(/-/g, '');
  const urls = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart.getTime() + i * 86400000);
    urls.push('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=' + ymd(d) + '&limit=1000');
  }

  const results = await Promise.allSettled(urls.map(async url => {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'FS5-Live-Scores/1.0' }
    });
    if (!response.ok) throw new Error(`NFL scoreboard returned ${response.status}.`);
    return response.json();
  }));

  const collected = new Map();
  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    const data = result.value || {};
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
        week: Number(week),
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
  }

  if (!collected.size) {
    return json(502, { error: 'NFL scoreboard unavailable.' });
  }

  return json(200, Array.from(collected.values()));
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
