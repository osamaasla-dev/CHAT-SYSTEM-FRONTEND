import type { Socket } from "socket.io-client";

import { clearClientSessionState } from "@/features/auth/session";
import { messageOutboxRuntime } from "@/features/messages/offline/message-outbox.runtime";
import { devLog } from "@/shared/utils";
import { SOCKET_EVENTS } from "../events";

type BaseListenersOptions = {
  onForcedDisconnect?: () => void;
  onUnauthorized?: () => void;
};

export const baseListeners = {
  attach(socket: Socket, options?: BaseListenersOptions) {
    socket.on(SOCKET_EVENTS.UNAUTHORIZED, (data: { reason: string }) => {
      devLog("[socket] Unauthorized", data.reason);
      socket.disconnect();
      void clearClientSessionState().finally(() => {
        options?.onUnauthorized?.();
      });
    });

    socket.on(SOCKET_EVENTS.FORCED_DISCONNECT, () => {
      devLog("[socket] Forced disconnect");
      socket.disconnect();
      void clearClientSessionState().finally(() => {
        options?.onForcedDisconnect?.();
      });
    });

    socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error: Error) => {
      devLog("[socket] Connect error", error.message);
    });

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      void messageOutboxRuntime.kick();
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      devLog("[socket] Disconnected");
    });

    socket.on(SOCKET_EVENTS.MESSAGE, (data: { message: string }) => {
      devLog("[socket] Message", data.message);
    });
  },
};
