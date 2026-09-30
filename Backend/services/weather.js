const cache = new Map();
const MULT = { clear: 0, rain: 0.05, fog: 0.10, storm: 0.15 };

async function getWeather(corridor, lat, lng) {
  const c = cache.get(corridor);
  if (c && Date.now() - c.t < 10 * 60 * 1000) return c.v;
  let condition;
  try {
    if (process.env.OPENWEATHER_KEY && lat != null) {
      const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}`);
      const j = await r.json();
      const m = (j.weather && j.weather[0] && j.weather[0].main || '').toLowerCase();
      condition = /rain|drizzle/.test(m) ? 'rain' : /fog|mist|haze|smoke/.test(m) ? 'fog' : /thunder|storm/.test(m) ? 'storm' : 'clear';
    }
  } catch (e) { /* fall back to mock */ }
  if (!condition) { // mock, changes every 10 minutes
    const conds = ['clear', 'clear', 'rain', 'fog', 'clear', 'storm'];
    condition = conds[(Math.floor(Date.now() / 600000) + corridor.length) % conds.length];
  }
  const v = { condition, multiplier: MULT[condition] };
  cache.set(corridor, { t: Date.now(), v });
  return v;
}
export  {getWeather};
