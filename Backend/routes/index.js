import express from 'express';
import bcrypt from 'bcryptjs';
import { Route, Station, LiveStatus, Event, User, History } from '../models/index.js';
import { computeETA } from '../services/etaEngine.js';
import { recordPosition } from '../services/ingest.js';
import bus from '../services/bus.js';
import { sign, requireRole, ingestAuth } from '../middlewares/auth.js';
import { statusOf, overviewRow, buildDetails, timeAgo } from '../services/details.js';

const router = express.Router();
const wrap = (fn) => (req, res) => fn(req, res).catch(e => res.status(400).json({ error: e.message }));

router.get('/health', (req, res) => res.json({ ok: true, time: new Date() }));

// ---------- Auth ----------
router.post('/auth/register', wrap(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('email & password required');
  const u = await User.create({ email, password: await bcrypt.hash(password, 8), role: 'public' });
  res.json({ token: sign(u), role: u.role });
}));
router.post('/auth/signup', wrap(async (req, res) => {
  const { name, email, organization, password, accessCode } = req.body;
  if (!name || !email || !password) throw new Error('Name, email and password are required');
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');
  const mail = email.trim().toLowerCase();
  if (await User.findOne({ email: mail })) throw new Error('This email is already registered');

  // Staff / Admin need an access code issued by the control room. Passengers need nothing.
  const codes = {
    staff: process.env.STAFF_ACCESS_CODE || 'RAIL-STAFF-2026',
    admin: process.env.ADMIN_ACCESS_CODE || 'RAIL-ADMIN-2026',
  };
  let role = ['staff', 'admin'].includes(req.body.role) ? req.body.role : 'public';
  if (role !== 'public' && accessCode !== codes[role]) {
    return res.status(403).json({ error: `Invalid ${role} access code` });
  }
  const u = await User.create({ name: name.trim(), organization, email: mail, password: await bcrypt.hash(password, 8), role });
  res.json({ token: sign(u), role: u.role, name: u.name });
}));
router.post('/auth/login', wrap(async (req, res) => {
  const u = await User.findOne({ email: String(req.body.email || '').toLowerCase() });
  if (!u || !(await bcrypt.compare(req.body.password || '', u.password))) return res.status(401).json({ error: 'Bad credentials' });
  res.json({ token: sign(u), role: u.role, name: u.name });
}));

// ---------- Public: trains / stations ----------
router.get('/trains', wrap(async (req, res) => {
  res.json(await Route.find({}, 'trainNo trainName zone corridor startTime').lean());
}));
router.get('/stations', wrap(async (req, res) => res.json(await Station.find().lean())));

// all trains with live status (Dashboard)
router.get('/trains/overview', wrap(async (req, res) => {
  const [routes, lives] = await Promise.all([Route.find().lean(), LiveStatus.find().lean()]);
  const lm = new Map(lives.map(l => [l.trainNo, l]));
  res.json(routes.map(r => overviewRow(r, lm.get(r.trainNo))));
}));

// everything TrainDetails page needs in one call
router.get('/trains/:no/details', wrap(async (req, res) => {
  const [route, live, eta] = await Promise.all([
    Route.findOne({ trainNo: req.params.no }).lean(),
    LiveStatus.findOne({ trainNo: req.params.no }).lean(),
    computeETA(req.params.no),
  ]);
  if (!route) return res.status(404).json({ error: 'Train not found' });
  if (!live) return res.status(404).json({ error: 'No live data yet' });
  res.json(buildDetails(route, live, eta));
}));

// alerts derived from live delays + TSR/block events
router.get('/alerts', wrap(async (req, res) => {
  const [routes, lives, events] = await Promise.all([
    Route.find().lean(), LiveStatus.find().lean(), Event.find().sort({ createdAt: -1 }).limit(20).lean(),
  ]);
  const rm = new Map(routes.map(r => [r.trainNo, r]));
  const alerts = [];
  for (const l of lives) {
    if (l.delayMin < 10) continue;
    const r = rm.get(l.trainNo);
    const stop = r && r.stops[l.lastSeq];
    alerts.push({
      id: `delay-${l.trainNo}`, severity: l.delayMin >= 30 ? 'critical' : 'warning',
      title: 'Train delay threshold exceeded', train: l.trainNo, trainName: r ? r.trainName : '',
      location: stop ? stop.stationName : l.lastStationCode,
      message: `Train is running ${Math.round(l.delayMin)} minutes behind schedule.`,
      time: timeAgo(l.updatedAt), status: 'active', ts: l.updatedAt,
    });
  }
  for (const e of events) {
    alerts.push({
      id: `event-${e._id}`, severity: !e.active ? 'info' : e.type === 'BLOCK' ? 'critical' : 'warning',
      title: `${e.type} reported`, train: e.trainNo || '—', trainName: `Corridor ${e.corridor}`,
      location: `km ${e.fromKm} – ${e.toKm}`,
      message: `${e.note || e.type}. Adds about ${e.penaltyMin} min to affected trains.`,
      time: timeAgo(e.createdAt), status: e.active ? 'active' : 'resolved', ts: e.createdAt,
    });
  }
  alerts.sort((a, b) => new Date(b.ts) - new Date(a.ts));
  res.json(alerts);
}));

router.get('/trains/:no/route', wrap(async (req, res) => {
  const r = await Route.findOne({ trainNo: req.params.no }).lean();
  if (!r) return res.status(404).json({ error: 'Train not found' });
  res.json(r);
}));

router.get('/trains/:no/status', wrap(async (req, res) => {
  const s = await LiveStatus.findOne({ trainNo: req.params.no }).lean();
  if (!s) return res.status(404).json({ error: 'No live status' });
  res.json(s);
}));

// all upcoming stations ETA (or ?station=CODE for one)
router.get('/trains/:no/eta', wrap(async (req, res) => {
  const data = await computeETA(req.params.no);
  if (!data) return res.status(404).json({ error: 'No live data for train' });
  if (req.query.station) {
    const st = data.stops.find(s => s.stationCode === req.query.station.toUpperCase());
    return res.json({ ...data, stops: st ? [st] : [] });
  }
  res.json(data);
}));

// station display board
router.get('/stations/:code/arrivals', wrap(async (req, res) => {
  const code = req.params.code.toUpperCase();
  const lives = await LiveStatus.find().lean();
  const all = await Promise.all(lives.map(l => computeETA(l.trainNo)));
  const rows = [];
  for (const d of all) {
    if (!d) continue;
    const st = d.stops.find(s => s.stationCode === code);
    if (st) rows.push({ trainNo: d.trainNo, trainName: d.trainName, currentDelayMin: d.currentDelayMin,
      lastStation: d.lastStation, ...st });
  }
  rows.sort((a, b) => new Date(a.predictedETA) - new Date(b.predictedETA));
  res.json({ station: code, count: rows.length, arrivals: rows });
}));

// ---------- Ingestion (feed providers / simulator) ----------
router.post('/ingest/position', ingestAuth, wrap(async (req, res) => {
  const { trainNo, stationCode, delayMin } = req.body;
  if (!trainNo || !stationCode || typeof delayMin !== 'number') throw new Error('trainNo, stationCode, delayMin(number) required');
  res.json(await recordPosition(req.body));
}));

// ---------- Events (TSR / block / halt) ----------
router.get('/events', wrap(async (req, res) => res.json(await Event.find({ active: true }).lean())));
router.post('/events', requireRole('staff', 'admin'), wrap(async (req, res) => {
  const ev = await Event.create(req.body);
  const trains = ev.trainNo ? [ev.trainNo] : (await Route.find({ corridor: ev.corridor }, 'trainNo').lean()).map(t => t.trainNo);
  trains.forEach(t => bus.emit('update', t)); // recompute ETAs immediately
  res.json(ev);
}));
router.delete('/events/:id', requireRole('staff', 'admin'), wrap(async (req, res) => {
  const ev = await Event.findByIdAndUpdate(req.params.id, { active: false }, { returnDocument: 'after' });
  res.json(ev);
}));

// ---------- Control room dashboard ----------
// responses carry both raw keys and the aliases the ControlRoom page reads
router.get('/dashboard/delayed', requireRole('staff', 'admin'), wrap(async (req, res) => {
  const min = Number(req.query.min || 15);
  const [lives, routes] = await Promise.all([
    LiveStatus.find({ delayMin: { $gte: min } }).sort({ delayMin: -1 }).lean(), Route.find().lean(),
  ]);
  const rm = new Map(routes.map(r => [r.trainNo, r]));
  res.json(lives.map(l => {
    const r = rm.get(l.trainNo);
    const d = Math.round(l.delayMin * 10) / 10;
    return { ...l, number: l.trainNo, trainNumber: l.trainNo,
      trainName: r ? r.trainName : '', name: r ? r.trainName : '',
      route: r ? `${r.stops[0].stationName} → ${r.stops[r.stops.length - 1].stationName}` : '',
      delayMinutes: d, delay: d, status: d >= 30 ? 'Critical' : 'Delayed' };
  }));
}));

router.get('/dashboard/zones', requireRole('staff', 'admin'), wrap(async (req, res) => {
  const rows = await LiveStatus.aggregate([
    { $group: {
        _id: '$zone',
        trains: { $sum: 1 },
        delayed: { $sum: { $cond: [{ $gte: ['$delayMin', 15] }, 1, 0] } },
        avgDelay: { $avg: '$delayMin' },
        maxDelay: { $max: '$delayMin' } } },
    { $sort: { avgDelay: -1 } },
  ]);
  res.json(rows.map(z => {
    const avg = Math.round((z.avgDelay || 0) * 10) / 10;
    return { ...z, name: z._id, zone: z._id, activeTrains: z.trains, delayedTrains: z.delayed,
      averageDelay: avg, delay: avg, status: avg >= 20 ? 'Congested' : avg >= 10 ? 'Delayed' : 'Operational' };
  }));
}));

router.get('/dashboard/summary', requireRole('staff', 'admin'), wrap(async (req, res) => {
  const [live, hist] = await Promise.all([LiveStatus.find().lean(), History.countDocuments()]);
  const n = live.length;
  const avg = n ? Math.round(live.reduce((s, l) => s + l.delayMin, 0) / n * 10) / 10 : 0;
  const delayed = live.filter(l => l.delayMin >= 15).length;
  const onTime = live.filter(l => l.delayMin < 10).length;
  res.json({
    liveTrains: n, avgDelayMin: avg, delayed15: delayed, historyRecords: hist,
    activeTrains: n, onSchedule: n ? Math.round(onTime / n * 100) : 0, delayed, averageDelay: avg,
  });
}));

export default router;
