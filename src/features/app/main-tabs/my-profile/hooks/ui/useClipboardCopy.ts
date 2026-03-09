import { useCallback, useState } from "react";
import { devError } from "@/shared/utils";

export const useClipboardCopy = (resetDelay = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (value: string | null | undefined) => {
    if (!value || !navigator?.clipboard) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), resetDelay);
      return true;
    } catch (error) {
      devError("Clipboard write failed", error);
      return false;
    }
  }, [resetDelay]);

  return { isCopied, copy };
};
