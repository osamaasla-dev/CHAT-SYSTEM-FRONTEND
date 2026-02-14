import type { Socket } from "socket.io-client";

import { useChatStore } from "@/features/app/stores/chat.store";
import { usePresenceStore } from "@/features/app/stores/presence.store";
import { SOCKET_EVENTS } from "../events";

export const blockListeners = {
  blockUser: (socket: Socket) => {
    socket.on(SOCKET_EVENTS.BLOCK_USER, (data: { userId: string }) => {
      const selectedUserId = useChatStore.getState().selectedUserId;
      const { unsubscribeFromPresence, clearPresence } =
        usePresenceStore.getState();

      if (selectedUserId === data.userId) {
        unsubscribeFromPresence(data.userId);
        clearPresence(data.userId);
      }
    });
  },

  unblockUser: (socket: Socket) => {
    socket.on(SOCKET_EVENTS.UNBLOCK_USER, (data: { userId: string }) => {
      const selectedUserId = useChatStore.getState().selectedUserId;
      const { startPresence } = usePresenceStore.getState();

      if (selectedUserId === data.userId) {
        void startPresence(data.userId);
      }
    });
  },

  attachAll(socket: Socket) {
    this.blockUser(socket);
    this.unblockUser(socket);
  },
};
