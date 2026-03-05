import { getSocketInstance } from "../socket.instance";
import { SOCKET_EVENTS } from "../events";

type SocketAckSuccess<T> = {
  status: "success";
  data: T;
};

type SocketAckError = {
  status: "error";
  message?: string;
};

const emitWithAck = <T>(
  event: string,
  payload?: unknown,
): Promise<SocketAckSuccess<T>> => {
  const socket = getSocketInstance();

  if (!socket) {
    return Promise.reject(new Error("SOCKET_NOT_CONNECTED"));
  }

  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error("SOCKET_ACK_TIMEOUT"));
    }, 8000);

    socket.emit(event, payload, (ack: SocketAckSuccess<T> | SocketAckError) => {
      window.clearTimeout(timeoutId);

      if (!ack || ack.status === "error") {
        reject(new Error(ack?.message || "FAILED"));
        return;
      }

      resolve(ack);
    });
  });
};

export const messageEmitters = {
  markSeen: (chatId: string) =>
    emitWithAck<{ updatedCount: number; messageIds: string[] }>(
      SOCKET_EVENTS.MESSAGE_SEEN,
      {
        chatId,
      },
    ),
  syncDelivered: () =>
    emitWithAck<{ updatedCount: number; messageIds: string[] }>(
      SOCKET_EVENTS.MESSAGE_SYNC_DELIVERED,
    ),
};
