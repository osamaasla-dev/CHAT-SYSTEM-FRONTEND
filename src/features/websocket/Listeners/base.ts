import type { Socket } from "socket.io-client";

import { SOCKET_EVENTS } from "../events";

export const baseListeners = {
  attach(socket: Socket) {
    socket.on(SOCKET_EVENTS.UNAUTHORIZED, (data: { reason: string }) => {
      console.log("[socket] Unauthorized", data.reason);
    });

    socket.on(SOCKET_EVENTS.FORCED_DISCONNECT, () => {
      console.log("[socket] Forced disconnect");
    });

    socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error: Error) => {
      console.log("[socket] Connect error", error.message);
    });

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log("[socket] Connected", socket.id);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log("[socket] Disconnected");
    });

    socket.on(SOCKET_EVENTS.MESSAGE, (data: { message: string }) => {
      console.log("[socket] Message", data.message);
    });
  },
};
