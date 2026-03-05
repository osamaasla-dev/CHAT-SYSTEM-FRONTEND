import { SOCKET_EVENTS } from "../events";
import { getSocketInstance } from "../socket.instance";

export const chatEmitters = {
  join: (chatId: string) => {
    const socket = getSocketInstance();
    if (!socket) return;

    socket.emit(SOCKET_EVENTS.CHAT_JOIN, { chatId });
  },
  leave: (chatId: string) => {
    const socket = getSocketInstance();
    if (!socket) return;

    socket.emit(SOCKET_EVENTS.CHAT_LEAVE, { chatId });
  },
  typing: (chatId: string, isTyping: boolean) => {
    const socket = getSocketInstance();
    if (!socket) return;

    socket.emit(SOCKET_EVENTS.CHAT_TYPING, { chatId, isTyping });
  },
};
