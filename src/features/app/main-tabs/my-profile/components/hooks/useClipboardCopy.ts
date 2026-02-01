import { useCallback, useState } from "react";

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
      console.error(error);
      return false;
    }
  }, [resetDelay]);

  return { isCopied, copy };
};
