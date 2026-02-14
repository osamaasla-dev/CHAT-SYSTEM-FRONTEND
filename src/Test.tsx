import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
export const Test = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:4000";

      socketRef.current = io(backendUrl, {
        withCredentials: true,
      });
      socketRef.current.on("unauthorized", (data: { reason: string }) => {
        console.log("Unauthorized", data.reason);
      });
      socketRef.current.on("forced_disconect", () => {
        console.log("forced_disconect");
      });
      socketRef.current.on("connect_error", (error: Error) => {
        console.log("Connect error", error.message);
      });
      socketRef.current.on("connect", () => {
        console.log("Connected to server", socketRef.current?.id);
      });
      socketRef.current.on("disconnect", () => {
        console.log("Disconnected from server");
      });
      socketRef.current?.on("message", (data) => {
        console.log("Message from server", data);
      });
    }
  }, []);

  const sendMessage = () => {
    socketRef.current?.emit(
      "message",
      { message: "Hello from client" },
      (response: { status: string }) => {
        console.log("Response from server", response);
      },
    );
  };

  return (
    <div>
      <button className="bg-blue-500" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};
