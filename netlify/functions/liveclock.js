exports.handler = async function () {
  const feeds = [
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',
    'https://cdn.espn.com/core/nfl/scoreboard?xhr=1'
  ];
  let lastError = 'Live scoreboard unavailable.';
  for (const url of feeds) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    try {
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'FS5-Live-Scores/1.0' },
        signal: controller.signal
      });
      const text = await response.text();
      if (!response.ok) { lastError = 'Scoreboard returned ' + response.status; continue; }
      const payload = JSON.parse(text || '{}');
      const games = (payload.events || []).map(normalizeGame).filter(Boolean);
      return json(200, { source: 'ESPN', updated: new Date().toISOString(), games });
    } catch (err) {
      lastError = err && err.name === 'AbortError' ? 'Scoreboard timed out.' : (err.message || lastError);
    } finally { clearTimeout(timeout); }
  }
  return json(504, { error: lastError, games: [] });
};

function normalizeGame(event) {
  const competition = event && event.competitions && event.competitions[0];
  const status = (competition && competition.status) || (event && event.status) || {};
  if (!competition) return null;
  const teams = (competition.competitors || []).map(c => ({
    abbreviation: c.team && c.team.abbreviation || '',
    id: c.team && c.team.id || '',
    name: c.team && (c.team.displayName || c.team.name) || ''
  }));
  const type = status.type || {};
  const state = String(type.state || '').toLowerCase();
  const detail = String(type.shortDetail || '');
  const period = Number(status.period || 0);
  const displayClock = String(status.displayClock || '');
  const completed = state === 'post' || /final/i.test(detail);
  const pregame = state === 'pre';
  const inGame = state === 'in';
  let remainingSeconds = null;
  if (completed) remainingSeconds = 0;
  else if (pregame) remainingSeconds = 3600;
  else if (inGame) {
    const m = displayClock.match(/^(\d+):(\d{2})$/);
    const clock = m ? Number(m[1]) * 60 + Number(m[2]) : null;
    if (clock != null && period >= 1 && period <= 4) remainingSeconds = Math.max(0, (4 - period) * 900 + clock);
    else if (clock != null && period >= 5) remainingSeconds = Math.max(0, 600 + clock);
  }
  return {
    id: String(event.id || competition.id || ''), teams,
    state: inGame ? 'in_game' : (completed ? 'complete' : (pregame ? 'pre_game' : state || 'unknown')),
    period, displayClock, detail, remainingSeconds,
    remainingPct: remainingSeconds == null ? null : Math.max(0, Math.min(100, Math.round(remainingSeconds / 36)))
  };
}

function json(statusCode, body) {
  return { statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=10, stale-while-revalidate=20' }, body: JSON.stringify(body) };
}
