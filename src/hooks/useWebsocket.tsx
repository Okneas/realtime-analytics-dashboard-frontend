import { useEffect } from "react";

let socket: WebSocket | null = null;
const subscribers: Map<string, number> = new Map();
const listeners: Map<string, Set<(msg: any) => void>> = new Map();
const activeChannels = new Set<string>();

let attempt = 0;
let reconnecting = false;

const scheduleReconnect = () => {
  if (reconnecting) return;
  reconnecting = true;

  const delay = Math.min(1000 * 2 ** attempt, 30_000);
  const jitter = Math.random() * 1000;
  setTimeout(() => {
    attempt++;
    reconnecting = false;
    connect();
  }, delay + jitter);
};

const connect = () => {
  if (socket) return socket;
  socket = new WebSocket(
    process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000/ws/stream",
  );
  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type !== "tick") return;
    const subs = listeners.get(msg.data.symbol);
    if (!subs) return;
    for (const callback of subs) callback(msg);
  };
  socket.onclose = () => {
    scheduleReconnect();
  };
  socket.onopen = () => {
    attempt = 0;
    for (const symbol of activeChannels) {
      socket!.send(JSON.stringify({ action: "subscribe", symbols: [symbol] }));
    }
  };
  return socket;
};

const subscribe = (symbol: string) => {
  connect();
  const count = subscribers.get(symbol) ?? 0;
  subscribers.set(symbol, count + 1);

  if (count === 0) {
    activeChannels.add(symbol);
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "subscribe", symbols: [symbol] }));
    }
  }
};

const unsubscribe = (symbol: string) => {
  const count = subscribers.get(symbol) ?? 0;
  if (count === 0) return;

  subscribers.set(symbol, count - 1);
  if (count === 1) {
    activeChannels.delete(symbol);
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "unsubscribe", symbols: [symbol] }));
    }
  }
};

const on = (symbol: string, callback: (msg: any) => void) => {
  if (!listeners.has(symbol)) listeners.set(symbol, new Set());
  listeners.get(symbol)!.add(callback);

  return () => {
    listeners.get(symbol)!.delete(callback);
  };
};

const useWebsocket = (symbol: string, onMessage: (msg: any) => void) => {
  useEffect(() => {
    subscribe(symbol);
    const off = on(symbol, onMessage);

    return () => {
      off();
      unsubscribe(symbol);
    };
  }, [symbol]);

  return {
    connect,
    subscribe,
    unsubscribe,
    on,
  };
};

export default useWebsocket;
