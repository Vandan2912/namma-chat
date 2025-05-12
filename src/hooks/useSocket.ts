// src/hooks/useSocket.ts
import { useEffect } from "react";
import { initSocket } from "@/lib/socket";
import { setupSocketHandlers } from "@/sockets/handlers";

export const useSocket = (token: string) => {
  useEffect(() => {
    const socket = initSocket(token);
    setupSocketHandlers(socket);
    return () => {
      socket.disconnect();
    };
  }, [token]);
};
