import { create } from "zustand";

import { usePresenceStore } from "@/features/app/stores/presence.store";

export type ChatStoreState = {
  selectedUserId: string | null;
  openChat: (userId: string) => void;
  closeChat: () => void;
};

export const useChatStore = create<ChatStoreState>((set, get) => ({
  selectedUserId: null,
  openChat: (userId: string) => {
    const previousUserId = get().selectedUserId;
    const { unsubscribeFromPresence, startPresence } =
      usePresenceStore.getState();

    if (previousUserId && previousUserId !== userId) {
      // Unsubscribe presence for the previously opened chat before opening a new one
      unsubscribeFromPresence(previousUserId);
    }

    set({ selectedUserId: userId });

    // Start presence flow (subscribe + initial fetch, with duplicate protection)
    void startPresence(userId);
  },
  closeChat: () => {
    const currentUserId = get().selectedUserId;
    const { unsubscribeFromPresence } = usePresenceStore.getState();

    if (currentUserId) {
      unsubscribeFromPresence(currentUserId);
    }
    set({ selectedUserId: null });
  },
}));
