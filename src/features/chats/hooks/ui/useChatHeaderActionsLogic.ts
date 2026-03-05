import { useState } from "react";

import { useBlockButtonLogic } from "@/features/blocks";
import { useClearChat } from "../../hooks/useClearChat";
import { useDeleteChat } from "../../hooks/useDeleteChat";
import { useUpdateChatNotifications } from "../../hooks/useUpdateChatNotifications";

export type UseChatHeaderActionsLogicParams = {
  chatId: string;
  blockedUserId: string;
  isBlocked: boolean;
  notificationsMuted: boolean;
  onClose: () => void;
};

export const useChatHeaderActionsLogic = ({
  chatId,
  blockedUserId,
  isBlocked,
  notificationsMuted,
  onClose,
}: UseChatHeaderActionsLogicParams) => {
  const { mutate: clearChat, isPending: isClearing } = useClearChat(chatId);
  const { mutate: deleteChat, isPending: isDeleting } = useDeleteChat(chatId);

  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMuteDialogOpen, setIsMuteDialogOpen] = useState(false);

  const { mutate: updateMuteNotifications, isPending: isUpdatingMute } =
    useUpdateChatNotifications(chatId);

  const {
    label: blockLabel,
    isMutatingForUser: isBlockingMutating,
    handleClick: handleBlockClick,
  } = useBlockButtonLogic({ blockedUserId, isBlocked });

  const handleCloseChat = () => {
    onClose();
  };

  const handleConfirmClearChat = () => {
    clearChat();
  };

  const handleConfirmDeleteChat = async () => {
    await deleteChat();
    onClose();
  };

  const handleToggleMute = () => {
    if (!chatId) return;

    if (notificationsMuted) {
      // Unmute directly
      updateMuteNotifications({
        mute: false,
        muteUntil: null,
        muteForever: false,
      });
    } else {
      // Open dialog to choose mute duration
      setIsMuteDialogOpen(true);
    }
  };

  return {
    // block
    blockLabel,
    isBlockingMutating,
    handleBlockClick,

    // clear chat
    isClearing,
    isClearDialogOpen,
    setIsClearDialogOpen,
    handleConfirmClearChat,

    // delete chat
    isDeleting,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleConfirmDeleteChat,

    // mute / unmute
    isUpdatingMute,
    isMuteDialogOpen,
    setIsMuteDialogOpen,
    handleToggleMute,
    notificationsMuted,

    // close
    handleCloseChat,
  };
};
