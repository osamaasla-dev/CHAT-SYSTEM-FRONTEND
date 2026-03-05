import { Send } from "lucide-react";

import { useChatComposerLogic } from "../hooks/ui";
import { EmojiPickerPopover } from "@/shared/components";

type ChatComposerProps = {
  chatId: string;
  disabled?: boolean;
  onSend: (content: string) => Promise<void> | void;
};

export const ChatComposer = ({
  chatId,
  disabled = false,
  onSend,
}: ChatComposerProps) => {
  const {
    inputRef,
    value,
    isSendDisabled,
    handleChange,
    handleEmojiSelect,
    handleSendClick,
    handleKeyDown,
  } = useChatComposerLogic({
    chatId,
    disabled,
    onSend,
  });

  return (
    <div className="border-t border-gray-light bg-light p-3 relative">
      <div className="flex items-center gap-2">
        <EmojiPickerPopover
          disabled={disabled}
          onEmojiSelect={handleEmojiSelect}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          disabled={disabled}
          className="h-10 flex-1 rounded-full border border-gray-light bg-white px-4 text-sm outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={handleSendClick}
          disabled={isSendDisabled}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
};
