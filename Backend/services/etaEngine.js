import { LiveStatus, Route, History, Event } from '../models/index.js';
import { getWeather } from './weather.js';
import { loadOthers, sectionCongestion } from './congestion.js';

const cache = new Map(); 
const TTL = 5000;
const invalidate = (no) => cache.delete(no);
const r1 = (x) => Math.round(x * 10) / 10;

async function historyMap(trainNo) {
  const agg = await History.aggregate([
    { $match: { trainNo } },
    { $group: { _id: { f: '$fromSeq', h: '$hour' }, sum: { $sum: '$deltaMin' }, n: { $sum: 1 } } },
  ]);
  const m = new Map(); const all = new Map();
  for (const a of agg) {
    m.set(`${a._id.f}_${a._id.h}`, { avg: a.sum / a.n, n: a.n });
    const t = all.get(a._id.f) || { sum: 0, n: 0 };
    t.sum += a.sum; t.n += a.n; all.set(a._id.f, t);
  }
  return { m, all };
}


async function computeETA(trainNo) {
  const hit = cache.get(trainNo);
  if (hit && Date.now() - hit.t < TTL) return hit.data;

  const [live, route] = await Promise.all([
    LiveStatus.findOne({ trainNo }).lean(), Route.findOne({ trainNo }).lean(),
  ]);
  if (!live || !route) return null;

  const [events, others, hist, weather] = await Promise.all([
    Event.find({ active: true, corridor: route.corridor, $or: [{ trainNo: null }, { trainNo }] }).lean(),
    loadOthers(route.corridor, trainNo),
    historyMap(trainNo),
    getWeather(route.corridor, live.lat, live.lng),
  ]);

  const stops = route.stops;
  const runStart = new Date(live.runStart).getTime();
  let delay = live.delayMin;
  let cursor = Date.now();
  const out = [];

  for (let i = live.lastSeq + 1, k = 0; i < stops.length; i++, k++) {
    const prev = stops[i - 1], cur = stops[i];
    const run = Math.max(1, cur.schedArrMin - prev.schedDepMin);
    const hour = new Date(cursor).getHours();

    const h = hist.m.get(`${prev.seq}_${hour}`);
    const a = hist.all.get(prev.seq);
    const histAdj = h && h.n >= 3 ? h.avg : a && a.n >= 3 ? a.sum / a.n : 0;
    const cong = sectionCongestion(others, prev.km, cur.km);
    const wx = run * weather.multiplier;
    const tsr = events
      .filter(e => e.fromKm <= cur.km && e.toKm >= prev.km)
      .reduce((s, e) => s + e.penaltyMin, 0);

    const gross = delay + histAdj + cong + wx + tsr;
    const recovery = Math.min(cur.recoveryMin || 0, Math.max(0, gross));
    delay = Math.max(gross - recovery, -5);

    const sched = runStart + cur.schedArrMin * 60000;
    const eta = sched + delay * 60000;
    cursor = eta;
    out.push({
      seq: cur.seq, stationCode: cur.stationCode, stationName: cur.stationName,
      scheduledArrival: new Date(sched),
      baselineETA: new Date(sched + live.delayMin * 60000), // static: schedule + current delay
      predictedETA: new Date(eta),
      predictedDelayMin: r1(delay),
      confidence: Math.round(Math.max(0.5, 0.95 - 0.04 * k) * 100) / 100,
      factors: { history: r1(histAdj), congestion: r1(cong), weather: r1(wx), tsr: r1(tsr), recovery: r1(recovery) },
    });
  }

  const data = {
    trainNo, trainName: route.trainName, zone: route.zone, asOf: new Date(),
    currentDelayMin: live.delayMin, lastStation: live.lastStationCode, speed: live.speed,
    weather: weather.condition, stops: out,
    route: `${stops[0].stationName} → ${stops[stops.length - 1].stationName}`,
  };
  cache.set(trainNo, { t: Date.now(), data });
  return data;
}

export { computeETA, invalidate };
