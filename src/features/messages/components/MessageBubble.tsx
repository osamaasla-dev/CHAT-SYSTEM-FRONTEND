import { useState } from "react";
import { EmojiPickerPopover } from "@/shared/components";

import { useMessageBubbleEditLogic } from "../hooks/ui";
import { useToggleMessageReaction } from "../hooks/useToggleMessageReaction";
import type { ChatMessageItem } from "../types/message.types";
import { isOptimisticMessage } from "../utils/message-state.utils";
import { MessageBubbleActions } from "./MessageBubbleActions";
import { MessageBubbleEditForm } from "./MessageBubbleEditForm";
import { MessageBubbleMeta } from "./MessageBubbleMeta";
import { MessageBubbleReactions } from "./MessageBubbleReactions";

type MessageBubbleProps = {
  message: ChatMessageItem;
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const {
    isEditing,
    draftContent,
    setDraftContent,
    editorRef,
    isSavingEdit,
    canSubmitEdit,
    startEditing,
    cancelEditing,
    saveEdit,
    handleEditorKeyDown,
    handleEmojiSelect,
  } = useMessageBubbleEditLogic({
    chatId: message.chatId,
    messageId: message.id,
    content: message.content,
    isDeleted: message.isDeleted,
  });

  const messageBodyText = message.isDeleted
    ? "This message was deleted"
    : (message.content ?? "");
  const hasReactions = message.reactions.length > 0;
  const canReact =
    !message.isDeleted &&
    !isOptimisticMessage(message);

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const { mutate: toggleReaction } = useToggleMessageReaction(message.chatId);

  const handleEmojiReactionSelect = (emoji: string) => {
    const normalizedEmoji = emoji.trim();
    if (!canReact || !normalizedEmoji) {
      return;
    }

    toggleReaction({
      messageId: message.id,
      emoji: normalizedEmoji,
    });
  };

  const bubbleWidthClass = isEditing ? "w-[85vw] max-w-[34rem]" : "max-w-[75%]";
  const showOutsideEmojiPicker = canReact && !isEditing;
  const showOutsideActions = message.isOwn && !isEditing && !message.isDeleted;
  const hasOutsideControls = showOutsideEmojiPicker || showOutsideActions;

  return (
    <div
      className={`group flex ${!message.isOwn && "justify-end"} ${
        hasReactions ? "mb-3" : ""
      }`}
    >
      <div
        className={`flex items-start gap-1 ${
          message.isOwn ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {hasOutsideControls && (
          <div className="flex shrink-0 items-start gap-1 pt-0.5">
            {showOutsideActions && (
              <MessageBubbleActions
                chatId={message.chatId}
                messageId={message.id}
                createdAt={message.createdAt}
                contentType={message.contentType}
                isOwn={message.isOwn}
                isDeleted={message.isDeleted}
                localState={message.localState}
                onEditRequested={startEditing}
              />
            )}

            {showOutsideEmojiPicker && (
              <div
                className={`transition-opacity duration-150 ${
                  isEmojiPickerOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                }`}
              >
                <EmojiPickerPopover
                  openDirection={message.isOwn ? "right" : "left"}
                  onOpenChange={setIsEmojiPickerOpen}
                  onEmojiSelect={(emoji) => {
                    handleEmojiReactionSelect(emoji);
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div
          className={`${bubbleWidthClass} overflow-visible rounded-xl px-3 py-2 shadow-sm min-w-30 ${
            message.isOwn
              ? "bg-emerald-100 text-primary-dark rounded-bl-sm"
              : "bg-white text-primary-dark rounded-br-sm"
          }`}
        >
          {isEditing ? (
            <MessageBubbleEditForm
              draftContent={draftContent}
              editorRef={editorRef}
              isSavingEdit={isSavingEdit}
              canSubmitEdit={canSubmitEdit}
              onDraftChange={setDraftContent}
              onEmojiSelect={handleEmojiSelect}
              onCancel={cancelEditing}
              onSave={saveEdit}
              onKeyDown={handleEditorKeyDown}
            />
          ) : (
            <p
              dir="auto"
              className={`text-start text-sm wrap-break-word ${
                message.isDeleted ? "italic text-muted-foreground" : ""
              }`}
            >
              {messageBodyText}
            </p>
          )}

          <MessageBubbleMeta
            isOwn={message.isOwn}
            isDeleted={message.isDeleted}
            editedAt={message.editedAt}
            createdAt={message.createdAt}
            localState={message.localState}
            ticks={message.ticks}
          />

          <MessageBubbleReactions
            chatId={message.chatId}
            messageId={message.id}
            reactions={message.reactions}
            canReact={canReact}
            isOwn={message.isOwn}
          />
        </div>
      </div>
    </div>
  );
};
