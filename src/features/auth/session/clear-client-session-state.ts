import toast from "react-hot-toast";

import { useChatStore } from "@/features/app/stores/chat.store";
import { usePresenceStore } from "@/features/app/stores/presence.store";
import { messageOutboxRuntime } from "@/features/messages/offline/message-outbox.runtime";
import { queryClient } from "@/shared/lib/query-client";

export const clearClientSessionState = async (): Promise<void> => {
  const selectedUserId = useChatStore.getState().selectedUserId;
  if (selectedUserId) {
    usePresenceStore.getState().unsubscribeFromPresence(selectedUserId);
  }

  useChatStore.setState({
    selectedUserId: null,
    blockedUsers: {},
  });

  usePresenceStore.setState({
    presences: {},
  });

  await messageOutboxRuntime.clearQueue();
  queryClient.clear();
  toast.dismiss();
};
