import { useState } from "react";

import type { MuteChatNotificationsPayload } from "../../types/chat.types";
import { useUpdateChatNotifications } from "../useUpdateChatNotifications";

export type UseMuteChatNotificationsDialogLogicParams = {
  chatId: string;
  onClose: () => void;
};

const EIGHT_HOURS_IN_MS = 8 * 60 * 60 * 1000;
const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

type MuteOptionKey = "8h" | "1w" | "forever";

export const useMuteChatNotificationsDialogLogic = ({
  chatId,
  onClose,
}: UseMuteChatNotificationsDialogLogicParams) => {
  const [selectedOption, setSelectedOption] = useState<MuteOptionKey>("8h");

  const { mutate: updateChatNotifications, isPending } =
    useUpdateChatNotifications(chatId);

  const buildPayload = (): MuteChatNotificationsPayload => {
    const now = Date.now();

    if (selectedOption === "8h") {
      return {
        mute: true,
        muteUntil: new Date(now + EIGHT_HOURS_IN_MS).toISOString(),
        muteForever: false,
      };
    }

    if (selectedOption === "1w") {
      return {
        mute: true,
        muteUntil: new Date(now + ONE_WEEK_IN_MS).toISOString(),
        muteForever: false,
      };
    }

    return {
      mute: true,
      muteUntil: null,
      muteForever: true,
    };
  };

  const handleConfirm = () => {
    const payload = buildPayload();

    updateChatNotifications(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return {
    selectedOption,
    setSelectedOption,
    isPending,
    handleConfirm,
  };
};
