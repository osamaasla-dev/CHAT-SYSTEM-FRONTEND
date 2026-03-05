import type { Socket } from "socket.io-client";

import { messageOutboxRuntime } from "@/features/messages/offline/message-outbox.runtime";
import { SOCKET_EVENTS } from "../events";

type BaseListenersOptions = {
  onForcedDisconnect?: () => void;
};

export const baseListeners = {
  attach(socket: Socket, options?: BaseListenersOptions) {
    socket.on(SOCKET_EVENTS.UNAUTHORIZED, (data: { reason: string }) => {
      console.log("[socket] Unauthorized", data.reason);
    });

    socket.on(SOCKET_EVENTS.FORCED_DISCONNECT, () => {
      console.log("[socket] Forced disconnect");
      socket.disconnect();
      options?.onForcedDisconnect?.();
    });

    socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error: Error) => {
      console.log("[socket] Connect error", error.message);
    });

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      void messageOutboxRuntime.kick();
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log("[socket] Disconnected");
    });

    socket.on(SOCKET_EVENTS.MESSAGE, (data: { message: string }) => {
      console.log("[socket] Message", data.message);
    });
  },
};
