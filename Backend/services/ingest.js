import { LiveStatus, Route, History } from '../models/index.js';
import bus from './bus.js';

async function recordPosition({ trainNo, stationCode, delayMin, speed = 0, lat, lng, runStart }) {
  const route = await Route.findOne({ trainNo }).lean();
  if (!route) throw new Error('Unknown train');
  const stop = route.stops.find(s => s.stationCode === stationCode);
  if (!stop) throw new Error('Station not on route');

  const prev = await LiveStatus.findOne({ trainNo }).lean();
  if (prev && stop.seq > prev.lastSeq) {
    const n = stop.seq - prev.lastSeq;
    const delta = (delayMin - prev.delayMin) / n;
    const hour = new Date().getHours();
    const docs = [];
    for (let f = prev.lastSeq; f < stop.seq; f++) docs.push({ trainNo, fromSeq: f, hour, deltaMin: delta });
    await History.insertMany(docs);
  }
  const rs = runStart ? new Date(runStart)
    : prev ? prev.runStart
    : new Date(Date.now() - (stop.schedArrMin + delayMin) * 60000);

  // per-stop actual delays (used for the route/delay chart)
  let stopDelays = [];
  if (stop.seq === 0 || !prev) stopDelays[stop.seq] = delayMin;
  else {
    stopDelays = [...(prev.stopDelays || [])];
    if (stop.seq > prev.lastSeq) {
      const n = stop.seq - prev.lastSeq;
      for (let f = prev.lastSeq + 1; f <= stop.seq; f++)
        stopDelays[f] = Math.round((prev.delayMin + (delayMin - prev.delayMin) * (f - prev.lastSeq) / n) * 10) / 10;
    }
  }
  stopDelays = Array.from(stopDelays, v => v ?? 0);

  const live = await LiveStatus.findOneAndUpdate({ trainNo }, {
    trainNo, zone: route.zone, corridor: route.corridor,
    lastSeq: stop.seq, lastStationCode: stationCode, delayMin, speed,
    lat: lat ?? stop.lat, lng: lng ?? stop.lng, km: stop.km,
    runStart: rs, stopDelays, updatedAt: new Date(),
  }, { upsert: true, returnDocument: 'after' });
  bus.emit('update', trainNo);
  return live;
}

export { recordPosition };
