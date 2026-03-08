import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { setSocketInstance } from "./socket.instance";
import { baseListeners } from "./Listeners/base";
import { blockListeners } from "./Listeners/block";
import { presenceListeners } from "./Listeners/presence";
import { messageListeners } from "./Listeners/messages";
import { notificationListeners } from "./Listeners/notifications";

const getBackendUrl = () =>
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:4000";

type UseWebSocketParams = {
  enabled: boolean;
  onForcedDisconnect?: () => void;
};

export const useWebSocket = ({
  enabled,
  onForcedDisconnect,
}: UseWebSocketParams) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current && enabled) {
      const backendUrl = getBackendUrl();

      const socket = io(backendUrl, {
        withCredentials: true,
      });

      // Attach grouped listeners by concern
      baseListeners.attach(socket, {
        onForcedDisconnect,
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
  }, [enabled, onForcedDisconnect]);
};
