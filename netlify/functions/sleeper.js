// Same-origin Netlify proxy for Sleeper's public read-only APIs.
// This avoids browser/CORS differences between Sleeper endpoints and lets the
// site fail gracefully if one upstream feed is unavailable.
exports.handler = async function (event) {
  const qs = event.queryStringParameters || {};
  const source = qs.source === 'data' ? 'data' : 'app';
  let path = qs.path || '';
  try { path = decodeURIComponent(path); } catch (_) {}

  if (!path.startsWith('/')) path = '/' + path;
  // League/stats/projections/state endpoints use the /v1 prefix. Schedule does not.
  if (!path.startsWith('/v1/') && !path.startsWith('/schedule/')) path = '/v1' + path;
  if (!/^\/(v1\/)?[A-Za-z0-9_?=&.\-\/]+$/.test(path)) {
    return json(400, { error: 'Invalid Sleeper API path.' });
  }

  const hosts = source === 'data'
    ? ['https://api.sleeper.com']
    : ['https://api.sleeper.app'];

  // Matchups are documented on api.sleeper.app. If that host has a transient
  // problem, also try api.sleeper.com as a fallback before returning the error.
  if (path.includes('/league/') && path.includes('/matchups/')) {
    hosts.push('https://api.sleeper.com');
  }

  let lastError = 'Sleeper request failed.';
  for (const host of hosts) {
    try {
      const url = host + path;
      const response = await fetch(url, {
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
      // Try the next allowed host for matchup requests.
      if (!path.includes('/matchups/')) break;
    } catch (err) {
      lastError = err && err.message ? err.message : lastError;
    }
  }
  return json(502, { error: lastError, path, source });
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body)
  };
}
