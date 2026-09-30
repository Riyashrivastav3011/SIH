import { LiveStatus } from '../models/index.js';

const loadOthers = (corridor, trainNo) =>
  LiveStatus.find({ corridor, trainNo: { $ne: trainNo } }).lean();

// Trains sitting in / just before the section slow this one down.
function sectionCongestion(others, fromKm, toKm) {
  const near = others.filter(o => o.km >= fromKm - 40 && o.km <= toKm);
  if (!near.length) return 0;
  const avgDelay = near.reduce((s, o) => s + Math.max(0, o.delayMin), 0) / near.length;
  return Math.min(near.length * 0.8 + 0.05 * avgDelay, 6); // minutes
}

export { loadOthers, sectionCongestion };
