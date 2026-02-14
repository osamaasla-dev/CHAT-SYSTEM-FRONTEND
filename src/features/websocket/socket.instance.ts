import type { Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export const setSocketInstance = (socket: Socket | null) => {
  socketInstance = socket;
};

export const getSocketInstance = () => socketInstance;
