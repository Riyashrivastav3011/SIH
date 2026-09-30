import express from 'express';
import bcrypt from 'bcryptjs';
import { Route, Station, LiveStatus, Event, User, History } from '../models/index.js';
import { computeETA } from '../services/etaEngine.js';
import { recordPosition } from '../services/ingest.js';
import bus from '../services/bus.js';
import { sign, requireRole, ingestAuth } from '../middlewares/auth.js';

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
router.post('/auth/login', wrap(async (req, res) => {
  const u = await User.findOne({ email: req.body.email });
  if (!u || !(await bcrypt.compare(req.body.password || '', u.password))) return res.status(401).json({ error: 'Bad credentials' });
  res.json({ token: sign(u), role: u.role });
}));

// ---------- Public: trains / stations ----------
router.get('/trains', wrap(async (req, res) => {
  res.json(await Route.find({}, 'trainNo trainName zone corridor startTime').lean());
}));
router.get('/stations', wrap(async (req, res) => res.json(await Station.find().lean())));

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
  const ev = await Event.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
  res.json(ev);
}));

// ---------- Control room dashboard ----------
router.get('/dashboard/delayed', requireRole('staff', 'admin'), wrap(async (req, res) => {
  const min = Number(req.query.min || 15);
  res.json(await LiveStatus.find({ delayMin: { $gte: min } }).sort({ delayMin: -1 }).lean());
}));

router.get('/dashboard/zones', requireRole('staff', 'admin'), wrap(async (req, res) => {
  res.json(await LiveStatus.aggregate([
    { $group: {
        _id: '$zone',
        trains: { $sum: 1 },
        delayed: { $sum: { $cond: [{ $gte: ['$delayMin', 15] }, 1, 0] } },
        avgDelay: { $avg: '$delayMin' },
        maxDelay: { $max: '$delayMin' } } },
    { $sort: { avgDelay: -1 } },
  ]));
}));

router.get('/dashboard/summary', requireRole('staff', 'admin'), wrap(async (req, res) => {
  const [live, hist] = await Promise.all([LiveStatus.find().lean(), History.countDocuments()]);
  const avg = live.length ? live.reduce((s, l) => s + l.delayMin, 0) / live.length : 0;
  res.json({ liveTrains: live.length, avgDelayMin: Math.round(avg * 10) / 10,
    delayed15: live.filter(l => l.delayMin >= 15).length, historyRecords: hist });
}));

export default router;
