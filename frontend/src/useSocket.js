import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'); // ek hi connection poori app me

// room: 'subscribe:train' | 'subscribe:station' | 'subscribe:all'
// event: 'eta' | 'arrival' | 'status'
export function useLive(room, arg, event, onData) {
  useEffect(() => {
    socket.emit(room, arg);
    socket.on(event, onData);
    return () => socket.off(event, onData);
  }, [room, arg, event]);
}