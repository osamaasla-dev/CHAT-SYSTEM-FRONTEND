import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { setSocketInstance } from "./socket.instance";
import { baseListeners } from "./Listeners/base";
import { blockListeners } from "./Listeners/block";
import { presenceListeners } from "./Listeners/presence";
import { messageListeners } from "./Listeners/messages";
import { notificationListeners } from "./Listeners/notifications";
import { getBackendWebSocketUrl } from "@/shared/lib/backend-url";

type UseWebSocketParams = {
  enabled: boolean;
  onForcedDisconnect?: () => void;
  onUnauthorized?: () => void;
};

export const useWebSocket = ({
  enabled,
  onForcedDisconnect,
  onUnauthorized,
}: UseWebSocketParams) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current && enabled) {
      const backendUrl = getBackendWebSocketUrl();

      const socket = io(backendUrl, {
        withCredentials: true,
        reconnectionAttempts: 8,
        reconnectionDelay: 500,
        timeout: 10_000,
      });

      // Attach grouped listeners by concern
      baseListeners.attach(socket, {
        onForcedDisconnect,
        onUnauthorized,
      });
      blockListeners.attachAll(socket);
      presenceListeners.attachAll(socket);
      messageListeners.attachAll(socket);
      notificationListeners.attachAll(socket);

      socketRef.current = socket;
      setSocketInstance(socket);
    }

    return () => {
      // cleanup on unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
        setSocketInstance(null);
        socketRef.current = null;
      }
    };
  }, [enabled, onForcedDisconnect, onUnauthorized]);
};
