import type { Socket } from "socket.io-client";

import { usePresenceStore } from "@/features/app/stores/presence.store";
import { devLog } from "@/shared/utils";
import { SOCKET_EVENTS } from "../events";

export const presenceListeners = {
  update: (socket: Socket) => {
    socket.on(
      SOCKET_EVENTS.CHAT_PRESENCE_UPDATE,
      (data: {
        userId: string;
        status: "online" | "offline";
        timestamp: string;
      }) => {
        devLog("[socket] Chat presence update", data.userId, data.status);

        const { updatePresence } = usePresenceStore.getState();
        updatePresence(data.userId, data.status, data.timestamp);
      },
    );
  },

  attachAll(socket: Socket) {
    this.update(socket);
  },
};
