import { Route, LiveStatus } from '../models/index.js';
import { recordPosition } from '../services/ingest.js';

// Fake live feed: each tick, every train may cross its next station with a random delay change.
// runStart is re-derived so "now" == scheduled + delay at the station just crossed.
async function start(tickMs = 4000) {
  const routes = await Route.find().lean();
  const state = new Map();
  for (const r of routes) {
    const live = await LiveStatus.findOne({ trainNo: r.trainNo }).lean();
    const seq = live ? live.lastSeq : 0;
    const delay = live ? live.delayMin : Math.round(Math.random() * 5);
    state.set(r.trainNo, { seq, delay });
    const s0 = r.stops[seq];
    await recordPosition({ trainNo: r.trainNo, stationCode: s0.stationCode, delayMin: delay,
      speed: 0, runStart: new Date(Date.now() - (s0.schedArrMin + delay) * 60000) }).catch(() => {});
  }
  console.log(`Simulator running for ${routes.length} trains (tick ${tickMs}ms)`);

  setInterval(async () => {
    for (const r of routes) {
      try {
        const st = state.get(r.trainNo);
        if (Math.random() > 0.7) continue;
        let seq = st.seq + 1, delay = st.delay;
        if (seq >= r.stops.length) { seq = 0; delay = Math.round(Math.random() * 5); } // new run
        else {
          const h = new Date().getHours();
          const peak = (h >= 7 && h <= 10) || (h >= 17 && h <= 21);
          let d = Math.random() * 4 - 1 + (peak ? 1.5 : 0);
          if (Math.random() < 0.08) d += 10 + Math.random() * 10; // signal halt / TSR spike
          delay = Math.max(0, Math.round((delay + d) * 10) / 10);
        }
        const stop = r.stops[seq];
        st.seq = seq; st.delay = delay;
        await recordPosition({
          trainNo: r.trainNo, stationCode: stop.stationCode, delayMin: delay,
          speed: Math.round(40 + Math.random() * 60),
          runStart: new Date(Date.now() - (stop.schedArrMin + delay) * 60000),
        });
      } catch (e) { console.error('sim', e.message); }
    }
  }, tickMs);
}

export { start };
