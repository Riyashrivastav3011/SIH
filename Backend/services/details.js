
const r1 = (x) => Math.round((x ?? 0) * 10) / 10;

// ON_TIME < 10 min, DELAYED < 30 min, CRITICAL >= 30 min
export const statusOf = (delay = 0) => (delay >= 30 ? 'CRITICAL' : delay >= 10 ? 'DELAYED' : 'ON_TIME');

export const fmtTime = (d) =>
  new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });

export function timeAgo(date) {
  const s = Math.max(0, Math.round((Date.now() - new Date(date).getTime()) / 1000));
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} hr ago`;
  return `${Math.round(s / 86400)} day ago`;
}

export function overviewRow(route, live) {
  const first = route.stops[0], last = route.stops[route.stops.length - 1];
  const delay = live ? live.delayMin : 0;
  return {
    number: route.trainNo, name: route.trainName, zone: route.zone,
    origin: first.stationName, originCode: first.stationCode,
    destination: last.stationName, destCode: last.stationCode,
    status: statusOf(delay), delayMinutes: r1(delay),
    lastStation: live ? live.lastStationCode : null,
    speed: live ? live.speed : 0, live: !!live,
  };
}

// Shape used by TrainDetails.jsx (same keys as the old mock data)
export function buildDetails(route, live, eta) {
  const stops = route.stops;
  const first = stops[0], last = stops[stops.length - 1];
  const cur = stops[live.lastSeq] || first;
  const runStart = new Date(live.runStart).getTime();
  const upcoming = new Map((eta?.stops || []).map((s) => [s.seq, s]));
  const next = eta?.stops?.[0];

  const stations = stops.map((s) => {
    const sched = runStart + s.schedArrMin * 60000;
    if (s.seq <= live.lastSeq) {
      const d = live.stopDelays?.[s.seq] ?? 0;
      return {
        code: s.stationCode, name: s.stationName, lat: s.lat, lng: s.lng,
        scheduledArrival: fmtTime(sched), actualArrival: fmtTime(sched + d * 60000),
        delayMinutes: r1(d), status: 'COMPLETED', distanceFromOrigin: s.distanceKm,
      };
    }
    const u = upcoming.get(s.seq);
    return {
      code: s.stationCode, name: s.stationName, lat: s.lat, lng: s.lng,
      scheduledArrival: fmtTime(sched), actualArrival: u ? fmtTime(u.predictedETA) : '--',
      delayMinutes: r1(u ? u.predictedDelayMin : live.delayMin),
      status: next && next.seq === s.seq ? 'NEXT' : 'UPCOMING', distanceFromOrigin: s.distanceKm,
    };
  });

  const nextStop = next ? stops[next.seq] : last;
  const covered = cur.distanceKm;
  const remaining = Math.max(0, last.distanceKm - covered);
  const hoursRun = Math.max(0.1, (Date.now() - runStart - live.delayMin * 60000 * 0) / 3600000);
  const sched0 = nextStop.schedArrMin;

  // delay factors: sum of what the engine added over the remaining sections
  const f = { history: 0, congestion: 0, weather: 0, tsr: 0 };
  (eta?.stops || []).forEach((s) => { for (const k in f) f[k] += Math.max(0, s.factors[k]); });
  let factors = [
    { name: 'Congestion', value: r1(f.congestion) },
    { name: 'Speed Restriction', value: r1(f.tsr) },
    { name: 'Weather', value: r1(f.weather) },
    { name: 'Historical Pattern', value: r1(f.history) },
    { name: 'Current Delay', value: r1(Math.max(0, live.delayMin)) },
  ].filter((x) => x.value > 0);
  if (!factors.length) factors = [{ name: 'On Schedule', value: 1 }];

  return {
    number: route.trainNo, name: route.trainName,
    origin: first.stationName, originCode: first.stationCode,
    destination: last.stationName, destCode: last.stationCode,
    status: statusOf(live.delayMin),
    currentLocation: { lat: live.lat, lng: live.lng, name: `${live.speed > 0 ? 'Near' : 'At'} ${cur.stationName}` },
    eta: {
      nextStation: nextStop.stationName, nextStationCode: nextStop.stationCode,
      scheduled: next ? fmtTime(next.scheduledArrival) : fmtTime(runStart + sched0 * 60000),
      predicted: next ? fmtTime(next.predictedETA) : fmtTime(runStart + sched0 * 60000 + live.delayMin * 60000),
      baseline: next ? fmtTime(next.baselineETA) : null,
      delayMinutes: r1(next ? next.predictedDelayMin : live.delayMin),
      confidence: Math.round((next ? next.confidence : 0.95) * 100),
      speed: live.speed || 0,
      distanceCovered: covered, distanceRemaining: remaining,
      avgSpeed: Math.round(covered / hoursRun) || 0,
    },
    stations, delayFactors: factors,
    weather: eta?.weather || 'clear', updatedAt: live.updatedAt,
  };
}
