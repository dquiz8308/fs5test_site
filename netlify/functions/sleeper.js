// FS5 Sleeper proxy. League/matchup endpoints use Sleeper's public v1 API.
// Player-name lookups are handled specially: Sleeper's full NFL player catalog is
// now ~14MB, so we filter it server-side and return only the requested IDs.

exports.handler = async function (event) {
  const qs = event.queryStringParameters || {};
  const source = qs.source === 'data' ? 'data' : (qs.source === 'players' ? 'players' : 'app');

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
