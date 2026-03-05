import { useEffect } from "react";

import { messageOutboxRuntime } from "../offline/message-outbox.runtime";

type UseOfflineMessageOutboxParams = {
  enabled: boolean;
};

export const useOfflineMessageOutbox = ({
  enabled,
}: UseOfflineMessageOutboxParams) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const runOutbox = () => {
      void messageOutboxRuntime.kick();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        runOutbox();
      }
    };

    runOutbox();
    window.addEventListener("online", runOutbox);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("online", runOutbox);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);
};
