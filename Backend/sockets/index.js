import { Server } from 'socket.io';
import bus from '../services/bus.js';
import { computeETA, invalidate } from '../services/etaEngine.js';

function init(httpServer) {
  const io = new Server(httpServer, { cors: { origin: '*' } });
  io.on('connection', (s) => {
    s.on('subscribe:train', (no) => s.join('train:' + no));
    s.on('subscribe:station', (c) => s.join('station:' + String(c).toUpperCase()));
    s.on('subscribe:all', () => s.join('all')); // control room
  });

  bus.on('update', async (trainNo) => {
    try {
      invalidate(trainNo);
      const d = await computeETA(trainNo);
      if (!d) return;
      io.to('train:' + trainNo).emit('eta', d);
      io.to('all').emit('status', { trainNo, trainName: d.trainName, delayMin: d.currentDelayMin, lastStation: d.lastStation, zone: d.zone });
      d.stops.forEach(st => io.to('station:' + st.stationCode).emit('arrival', { trainNo, trainName: d.trainName, ...st }));
    } catch (e) { console.error('socket push', e.message); }
  });
  return io;
}
export { init };
