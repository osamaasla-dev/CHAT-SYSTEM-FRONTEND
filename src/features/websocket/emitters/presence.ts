import { getSocketInstance } from "../socket.instance";
import { SOCKET_EVENTS } from "../events";
import { devLog } from "@/shared/utils";

export const presenceEmitters = {
  subscribe: (userId: string) => {
    const socket = getSocketInstance();
    if (!socket) return;

    socket.emit(
      SOCKET_EVENTS.CHAT_PRESENCE_SUBSCRIBE,
      { userId },
      (res: { status: "success" | "error"; message?: string }) => {
        if (res.status === "success") {
          devLog("Presence subscribed successfully");
        }
        if (res.status === "error") {
          devLog("Presence subscribe failed", res.message);
        }
      },
    );
  },

  unsubscribe: (userId: string) => {
    const socket = getSocketInstance();
    if (!socket) return;

    socket.emit(
      SOCKET_EVENTS.CHAT_PRESENCE_UNSUBSCRIBE,
      { userId },
      (res: { status: string }) => {
        if (res.status === "success") {
          devLog("Presence unsubscribed successfully");
        }
      },
    );
  },
};
