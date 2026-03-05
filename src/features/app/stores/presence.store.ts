import { create } from "zustand";

import { userStatusApi } from "@/features/chats/services/chat.api";
import { presenceEmitters } from "@/features/websocket";

export type PresenceStatus = "online" | "offline";

export type UserPresence = {
  status: PresenceStatus;
  timestamp?: string;
};

export type PresenceStoreState = {
  /**
   * Map of userId -> presence info (online/offline + last update timestamp)
   */
  presences: Record<string, UserPresence>;
  updatePresence: (
    userId: string,
    status: PresenceStatus,
    timestamp?: string,
  ) => void;
  clearPresence: (userId: string) => void;
  subscribeToPresence: (userId: string) => void;
  unsubscribeFromPresence: (userId: string) => void;
  fetchInitialPresence: (userId: string) => Promise<void>;
  startPresence: (userId: string) => Promise<void>;
};

export const usePresenceStore = create<PresenceStoreState>((set, get) => ({
  presences: {},
  updatePresence: (userId, status, timestamp) => {
    set((state) => ({
      presences: {
        ...state.presences,
        [userId]: { status, timestamp },
      },
    }));
  },
  clearPresence: (userId) => {
    set((state) => {
      const next = { ...state.presences };
      delete next[userId];
      return { presences: next };
    });
  },
  subscribeToPresence: (userId: string) => {
    presenceEmitters.subscribe(userId);
  },
  unsubscribeFromPresence: (userId: string) => {
    presenceEmitters.unsubscribe(userId);
  },
  fetchInitialPresence: async (userId: string) => {
    try {
      const state = await userStatusApi(userId);

      // If backend returns null (e.g. user is blocked / not visible),
      // remove any existing presence entry so UI hides the status.
      if (!state) {
        const { clearPresence } = get();
        clearPresence(userId);
        return;
      }

      set((current) => ({
        presences: {
          ...current.presences,
          [userId]: {
            status: state.status,
            timestamp: state.lastSeen,
          },
        },
      }));
    } catch (error) {
      // Non-fatal: realtime socket events will still update presence
      console.log("Failed to fetch initial user status", error);
    }
  },
  startPresence: async (userId: string) => {
    const { subscribeToPresence, fetchInitialPresence } = get();

    // subscribe (no-op if already subscribed)
    subscribeToPresence(userId);

    // seed initial value from API (errors are handled inside fetchInitialPresence)
    await fetchInitialPresence(userId);
  },
}));
