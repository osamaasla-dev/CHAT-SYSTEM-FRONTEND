import { useIsMutating } from "@tanstack/react-query";

import { useChatStore } from "@/features/app/stores/chat.store";
import { usePresenceStore } from "@/features/app/stores/presence.store";
import { CREATE_BLOCK_MUTATION_KEY, useCreateBlock } from "../useCreateBlock";
import { UNBLOCK_USER_MUTATION_KEY, useUnblockUser } from "../useUnblockUser";

export type UseBlockButtonLogicArgs = {
  blockedUserId: string;
  isBlocked: boolean;
};

export type UseBlockButtonLogicResult = {
  label: string;
  isMutatingForUser: boolean;
  handleClick: () => void;
};

export const useBlockButtonLogic = ({
  blockedUserId,
  isBlocked,
}: UseBlockButtonLogicArgs): UseBlockButtonLogicResult => {
  const { mutate: unblock } = useUnblockUser(blockedUserId);
  const { mutate: block } = useCreateBlock(blockedUserId);

  const selectedUserId = useChatStore((state) => state.selectedUserId);
  const unsubscribeFromPresence = usePresenceStore(
    (state) => state.unsubscribeFromPresence,
  );
  const clearPresence = usePresenceStore((state) => state.clearPresence);
  const startPresence = usePresenceStore((state) => state.startPresence);

  const isBlocking =
    useIsMutating({ mutationKey: CREATE_BLOCK_MUTATION_KEY(blockedUserId) }) >
    0;
  const isUnblocking =
    useIsMutating({ mutationKey: UNBLOCK_USER_MUTATION_KEY(blockedUserId) }) >
    0;

  const isMutatingForUser = isBlocking || isUnblocking;

  const handleClick = () => {
    if (isMutatingForUser) return;

    if (isBlocked) {
      unblock(undefined, {
        onSuccess: () => {
          if (selectedUserId === blockedUserId) {
            void startPresence(blockedUserId);
          }
        },
      });
    } else {
      block(undefined, {
        onSuccess: () => {
          if (selectedUserId === blockedUserId) {
            unsubscribeFromPresence(blockedUserId);
            clearPresence(blockedUserId);
          }
        },
      });
    }
  };

  const label = isBlocked ? "Unblock" : "Block";

  return {
    label,
    isMutatingForUser,
    handleClick,
  };
};
