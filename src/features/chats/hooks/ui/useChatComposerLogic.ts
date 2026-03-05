import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from "react";

import { chatEmitters } from "@/features/websocket";

export type UseChatComposerLogicParams = {
  chatId: string;
  disabled: boolean;
  onSend: (content: string) => Promise<void> | void;
};

const TYPING_STOP_DELAY_MS = 1200;

export const useChatComposerLogic = ({
  chatId,
  disabled,
  onSend,
}: UseChatComposerLogicParams) => {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const stopTypingTimeoutRef = useRef<number | null>(null);

  const clearTypingTimeout = useCallback(() => {
    if (stopTypingTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(stopTypingTimeoutRef.current);
    stopTypingTimeoutRef.current = null;
  }, []);

  const emitStopTyping = useCallback(() => {
    if (!isTyping) {
      return;
    }

    chatEmitters.typing(chatId, false);
    setIsTyping(false);
  }, [chatId, isTyping]);

  const scheduleStopTyping = useCallback(() => {
    clearTypingTimeout();
    stopTypingTimeoutRef.current = window.setTimeout(() => {
      emitStopTyping();
    }, TYPING_STOP_DELAY_MS);
  }, [clearTypingTimeout, emitStopTyping]);

  useEffect(
    () => () => {
      clearTypingTimeout();
      emitStopTyping();
    },
    [clearTypingTimeout, emitStopTyping],
  );

  const applyNextValue = useCallback(
    (nextValue: string) => {
      if (disabled) {
        return;
      }

      setValue(nextValue);

      if (!nextValue.trim()) {
        clearTypingTimeout();
        emitStopTyping();
        return;
      }

      if (!isTyping) {
        chatEmitters.typing(chatId, true);
        setIsTyping(true);
      }

      scheduleStopTyping();
    },
    [
      chatId,
      clearTypingTimeout,
      disabled,
      emitStopTyping,
      isTyping,
      scheduleStopTyping,
    ],
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextValue = event.target.value;
    applyNextValue(nextValue);
  };

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      if (!emoji || disabled) {
        return;
      }

      const inputElement = inputRef.current;
      if (!inputElement) {
        applyNextValue(`${value}${emoji}`);
        return;
      }

      const selectionStart = inputElement.selectionStart ?? value.length;
      const selectionEnd = inputElement.selectionEnd ?? value.length;
      const nextValue =
        value.slice(0, selectionStart) + emoji + value.slice(selectionEnd);

      applyNextValue(nextValue);

      const nextCursorPosition = selectionStart + emoji.length;
      window.requestAnimationFrame(() => {
        inputElement.focus();
        inputElement.setSelectionRange(nextCursorPosition, nextCursorPosition);
      });
    },
    [applyNextValue, disabled, value],
  );

  const sendMessage = useCallback(() => {
    const content = value.trim();
    if (!content || disabled) {
      return;
    }

    setValue("");
    clearTypingTimeout();
    emitStopTyping();

    void Promise.resolve(onSend(content)).catch(() => undefined);
  }, [clearTypingTimeout, disabled, emitStopTyping, onSend, value]);

  const handleSendClick = () => {
    sendMessage();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();
    sendMessage();
  };

  return {
    inputRef,
    value,
    isSendDisabled: disabled || !value.trim(),
    handleChange,
    handleEmojiSelect,
    handleSendClick,
    handleKeyDown,
  };
};
