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
      const delay = d.currentDelayMin;
      io.to('all').emit('status', {
        trainNo, trainNumber: trainNo, number: trainNo,
        trainName: d.trainName, name: d.trainName, route: d.route, zone: d.zone,
        delayMin: delay, delayMinutes: delay, delay,
        lastStation: d.lastStation,
        status: delay >= 30 ? 'Critical' : delay >= 10 ? 'Delayed' : 'On Time',
      });
      d.stops.forEach(st => io.to('station:' + st.stationCode).emit('arrival', { trainNo, trainName: d.trainName, ...st }));
    } catch (e) { console.error('socket push', e.message); }
  });
  return io;
}
export { init };
