import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// One shared socket.io connection for the whole app
const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });

/*
 * room:  'subscribe:train' | 'subscribe:station' | 'subscribe:all'
 * arg:   train no / station code / null
 * event: 'eta' | 'arrival' | 'status'
 */
export function useLive(room, arg, event, onData) {
  const cb = useRef(onData);

  useEffect(() => {
    cb.current = onData;
  }, [onData]);

  useEffect(() => {
    if (!room) return;
    const handler = (data) => cb.current && cb.current(data);
    const join = () => socket.emit(room, arg);

    join();
    socket.on("connect", join); // rejoin after reconnect
    socket.on(event, handler);
    return () => {
      socket.off("connect", join);
      socket.off(event, handler);
    };
  }, [room, arg, event]);
}
