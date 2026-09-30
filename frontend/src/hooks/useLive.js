import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// Poori app me ek hi socket connection
const socket = io(SOCKET_URL);

/*
 * room:  'subscribe:train' | 'subscribe:station' | 'subscribe:all'
 * arg:   train no / station code / null
 * event: 'eta' | 'arrival' | 'status'
 */
export function useLive(room, arg, event, onData) {
  const callbackRef = useRef(onData);

  useEffect(() => {
    callbackRef.current = onData;
  }, [onData]);

  useEffect(() => {
    if (!room) return;

    const handler = (data) => {
      if (typeof callbackRef.current === "function") callbackRef.current(data);
    };

    const join = () => socket.emit(room, arg);

    join();                          // abhi room join karo
    socket.on("connect", join);      // reconnect par dobara join
    socket.on(event, handler);

    return () => {
      socket.off("connect", join);
      socket.off(event, handler);
    };
  }, [room, arg, event]);

  return { socket };
}