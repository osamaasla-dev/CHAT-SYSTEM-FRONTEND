import { SOCKET_EVENTS } from "../events";
import { getSocketInstance } from "../socket.instance";

export const blockEmitters = {
  blockUser: (userId: string) => {
    const socket = getSocketInstance();
    socket?.emit(SOCKET_EVENTS.BLOCK_USER, { userId });
  },
  unblockUser: (userId: string) => {
    const socket = getSocketInstance();
    socket?.emit(SOCKET_EVENTS.UNBLOCK_USER, { userId });
  },
};
