import type { KeyboardEvent, RefObject } from "react";

import { EmojiPickerPopover } from "@/shared/components";

type MessageBubbleEditFormProps = {
  draftContent: string;
  editorRef: RefObject<HTMLTextAreaElement | null>;
  isSavingEdit: boolean;
  canSubmitEdit: boolean;
  onDraftChange: (nextContent: string) => void;
  onEmojiSelect: (emoji: string) => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const MessageBubbleEditForm = ({
  draftContent,
  editorRef,
  isSavingEdit,
  canSubmitEdit,
  onDraftChange,
  onEmojiSelect,
  onCancel,
  onSave,
  onKeyDown,
}: MessageBubbleEditFormProps) => {
  return (
    <div className="w-full space-y-2">
      <textarea
        ref={editorRef}
        autoFocus
        value={draftContent}
        onChange={(event) => onDraftChange(event.target.value)}
        onKeyDown={onKeyDown}
        className="w-full resize-none rounded-md border border-gray-light bg-white px-2 py-1 text-sm text-primary-dark outline-none focus:border-primary"
        disabled={isSavingEdit}
      />
      <div className="flex items-center justify-between">
        <EmojiPickerPopover
          disabled={isSavingEdit}
          onEmojiSelect={onEmojiSelect}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSavingEdit}
            className="cursor-pointer rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-light disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              void onSave();
            }}
            disabled={!canSubmitEdit || isSavingEdit}
            className="cursor-pointer rounded-md bg-primary px-2 py-1 text-xs text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
