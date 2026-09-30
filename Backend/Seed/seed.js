import dotenv from 'dotenv'
dotenv.config();
const bcrypt = require('bcryptjs');
import connectDB from '../src/config/db.js';
import { Station, Train, Route, History, User, LiveStatus, Event } from '../src/models';

// Approximate coordinates/km markers (demo data)
const S = {
  NDLS: ['New Delhi', 28.64, 77.22, 'NR'], MTJ: ['Mathura Jn', 27.49, 77.67, 'NCR'], AGC: ['Agra Cantt', 27.15, 78.00, 'NCR'],
  GWL: ['Gwalior', 26.22, 78.18, 'NCR'], JHS: ['Jhansi', 25.45, 78.58, 'NCR'], BINA: ['Bina', 24.18, 78.20, 'WCR'],
  BPL: ['Bhopal', 23.27, 77.41, 'WCR'],
  ALJN: ['Aligarh', 27.89, 78.07, 'NCR'], CNB: ['Kanpur Central', 26.45, 80.35, 'NCR'], PRYJ: ['Prayagraj', 25.44, 81.83, 'NCR'],
  DDU: ['DD Upadhyaya', 25.28, 83.12, 'ECR'], GAYA: ['Gaya', 24.80, 85.00, 'ECR'], ASN: ['Asansol', 23.68, 86.99, 'ER'],
  BWN: ['Barddhaman', 23.25, 87.86, 'ER'], HWH: ['Howrah', 22.58, 88.34, 'ER'],
};
const KM = {
  A: { NDLS: 0, MTJ: 141, AGC: 195, GWL: 313, JHS: 415, BINA: 519, BPL: 701 },
  B: { NDLS: 0, ALJN: 130, CNB: 440, PRYJ: 634, DDU: 764, GAYA: 998, ASN: 1300, BWN: 1400, HWH: 1450 },
};
const TRAINS = [
  ['12002', 'Bhopal Shatabdi Exp', 'A', ['NDLS', 'AGC', 'GWL', 'JHS', 'BPL'], 85, '06:00'],
  ['12626', 'Kerala Exp (demo)', 'A', ['NDLS', 'MTJ', 'AGC', 'GWL', 'JHS', 'BINA', 'BPL'], 60, '11:30'],
  ['12301', 'Howrah Rajdhani', 'B', ['NDLS', 'CNB', 'PRYJ', 'DDU', 'GAYA', 'ASN', 'HWH'], 80, '16:55'],
  ['12303', 'Poorva Exp (demo)', 'B', ['NDLS', 'ALJN', 'CNB', 'PRYJ', 'DDU', 'GAYA', 'ASN', 'BWN', 'HWH'], 65, '08:00'],
  ['12381', 'Howrah Mail (demo)', 'B', ['NDLS', 'ALJN', 'CNB', 'PRYJ', 'DDU', 'GAYA', 'ASN', 'BWN', 'HWH'], 55, '20:30'],
];

function buildStops(corr, codes, speed, halt = 2) {
  const km0 = KM[corr][codes[0]];
  let halts = 0; // cumulative halt minutes of stops already passed
  return codes.map((c, i) => {
    const dist = KM[corr][c] - km0;
    const arr = i === 0 ? 0 : Math.round(dist / speed * 60 + halts);
    const h = i === 0 || i === codes.length - 1 ? 0 : halt;
    halts += h;
    const st = S[c];
    return { seq: i, stationCode: c, stationName: st[0], lat: st[1], lng: st[2], km: KM[corr][c],
      distanceKm: dist, schedArrMin: arr, schedDepMin: arr + h, haltMin: h, recoveryMin: i === 0 ? 0 : 1 };
  });
}

(async () => {
  await connectDB();
  await Promise.all([Station, Train, Route, History, User, LiveStatus, Event].map(m => m.deleteMany({})));
  await Station.insertMany(Object.entries(S).map(([code, v]) => ({ code, name: v[0], lat: v[1], lng: v[2], zone: v[3] })));

  const hist = [];
  for (const [no, name, corr, codes, speed, start] of TRAINS) {
    const stops = buildStops(corr, codes, speed);
    const zone = S[codes[0]][3];
    await Train.create({ number: no, name, type: 'Express', zone });
    await Route.create({ trainNo: no, trainName: name, zone, corridor: corr, startTime: start, stops });
    // synthetic history: 6 samples per section per hour, worse at peak hours & long sections
    for (let f = 0; f < stops.length - 1; f++) {
      const secKm = stops[f + 1].km - stops[f].km;
      for (let h = 0; h < 24; h++) {
        const peak = (h >= 7 && h <= 10) || (h >= 17 && h <= 21);
        for (let k = 0; k < 6; k++) {
          const mean = (peak ? 1.8 : 0.5) * (secKm / 150 + 0.5);
          hist.push({ trainNo: no, fromSeq: f, hour: h, deltaMin: Math.round((mean + (Math.random() * 3 - 1.5)) * 10) / 10 });
        }
      }
    }
  }
  await History.insertMany(hist);
  await User.create([
    { email: 'admin@rail.in', password: await bcrypt.hash('admin123', 8), role: 'admin' },
    { email: 'staff@rail.in', password: await bcrypt.hash('staff123', 8), role: 'staff' },
  ]);
  console.log(`Seeded: ${Object.keys(S).length} stations, ${TRAINS.length} trains, ${hist.length} history rows`);
  console.log('Users: admin@rail.in/admin123, staff@rail.in/staff123');
  process.exit(0);
})();
