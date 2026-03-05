import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { useEditMessage } from "../useEditMessage";

type UseMessageBubbleEditLogicParams = {
  chatId: string;
  messageId: string;
  content: string | null;
  isDeleted: boolean;
};

export const useMessageBubbleEditLogic = ({
  chatId,
  messageId,
  content,
  isDeleted,
}: UseMessageBubbleEditLogicParams) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftContent, setDraftContent] = useState(content ?? "");
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const { mutateAsync: editMessage, isPending: isSavingEdit } = useEditMessage(
    chatId,
  );

  const originalContent = content ?? "";
  const trimmedDraftContent = draftContent.trim();

  const canSubmitEdit = useMemo(() => {
    if (!isEditing || isDeleted) {
      return false;
    }

    return (
      trimmedDraftContent.length > 0 && trimmedDraftContent !== originalContent
    );
  }, [isDeleted, isEditing, originalContent, trimmedDraftContent]);

  const startEditing = () => {
    if (isDeleted) {
      return;
    }

    setDraftContent(originalContent);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftContent(originalContent);
    setIsEditing(false);
  };

  const saveEdit = async () => {
    if (!canSubmitEdit) {
      return;
    }

    await editMessage({
      messageId,
      content: trimmedDraftContent,
    });

    setIsEditing(false);
  };

  const handleEditorKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void saveEdit();
    }
  };

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      if (!emoji || isDeleted || isSavingEdit) {
        return;
      }

      const editorElement = editorRef.current;
      if (!editorElement) {
        setDraftContent((currentDraft) => `${currentDraft}${emoji}`);
        return;
      }

      const selectionStart =
        editorElement.selectionStart ?? editorElement.value.length;
      const selectionEnd =
        editorElement.selectionEnd ?? editorElement.value.length;
      const nextCursorPosition = selectionStart + emoji.length;

      setDraftContent((currentDraft) => {
        return (
          currentDraft.slice(0, selectionStart) +
          emoji +
          currentDraft.slice(selectionEnd)
        );
      });

      window.requestAnimationFrame(() => {
        editorElement.focus();
        editorElement.setSelectionRange(nextCursorPosition, nextCursorPosition);
      });
    },
    [isDeleted, isSavingEdit],
  );

  return {
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
  };
};
