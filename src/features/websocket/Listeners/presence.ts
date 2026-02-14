import type { Socket } from "socket.io-client";

import { SOCKET_EVENTS } from "../events";
import { usePresenceStore } from "@/features/app/stores/presence.store";

export const presenceListeners = {
  update: (socket: Socket) => {
    socket.on(
      SOCKET_EVENTS.CHAT_PRESENCE_UPDATE,
      (data: {
        userId: string;
        status: "online" | "offline";
        timestamp: string;
      }) => {
        // logic خاص بالبريزينس
        console.log("[socket] Chat presence update", data.userId, data.status);

        const { updatePresence } = usePresenceStore.getState();
        updatePresence(data.userId, data.status, data.timestamp);
      },
    );
  },

  attachAll(socket: Socket) {
    this.update(socket);
  },
};
