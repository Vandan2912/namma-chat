// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      auth: { token },
      transports: ["websocket"],
    });
  }
  return socket;
};


export const getSocket = (): Socket => {
  if (!socket) throw new Error("Socket not initialized");
  return socket;
};
