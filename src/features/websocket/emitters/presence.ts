import { getSocketInstance } from "../socket.instance";
import { SOCKET_EVENTS } from "../events";

export const presenceEmitters = {
  subscribe: (userId: string) => {
    const socket = getSocketInstance();
    if (!socket) return;

    socket.emit(
      SOCKET_EVENTS.CHAT_PRESENCE_SUBSCRIBE,
      { userId },
      (res: { status: "success" | "error"; message?: string }) => {
        if (res.status === "success") {
          console.log("Presence subscribed successfully");
        }
        if (res.status === "error") {
          console.log("Presence subscribe failed", res.message);
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
          console.log("Presence unsubscribed successfully");
        }
      },
    );
  },
};
