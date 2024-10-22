import React, { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// TO DO : put this in a separate file
export interface Message {
  id?: number;
  content: string;
  senderId: number;
  roomId: string;
  senderFullName: string;
}

interface SocketContextType {
  socket: Socket | null;
  allOnlineUsers: Record<number, string>;
  addMessage: (roomId: string, message: Message) => void;
  messages?: Record<string, Message[]>;
}

export const SocketContext = React.createContext<SocketContextType | undefined>(
  undefined
);

export function SocketProvider({ children }: any) {
  const token = localStorage.getItem("access_token");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [allOnlineUsers, setAllOnlineUsers] = useState<Record<number, string>>(
    {}
  );
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const addMessage = useCallback((roomId: string, message: Message) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [roomId]: [...(prevMessages?.[roomId] || []), message],
    }));
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    newSocket.on("connect_error", (error) => {
      console.error("Erreur de connexion:", error);
    });

    newSocket.on("disconnect", () => {
      console.log("Déconnecté du serveur WebSocket");
    });

    newSocket.on("newMessage", (payload: Message) => {
      console.log("Nouveau message dans", { ...payload });
      addMessage(payload.roomId, payload);
    });

    newSocket.on("userStatusChange", ({ userId, status }) => {
      setAllOnlineUsers((prevUsers) => {
        const newUsers = { ...prevUsers };
        if (status === "online") {
          newUsers[userId] = status;
        } else {
          delete newUsers[userId];
        }
        return newUsers;
      });
    });

    newSocket.on("roomJoined", ({ userId, userFullName, projectRoom }) => {
      console.log(
        `L'utilisateur ${userFullName} écoute donne dans la room ${projectRoom}`
      );
    });

    newSocket.on("getOnlineUsers", (users: Record<number, string>) => {
      setAllOnlineUsers((prevUsers) => ({ ...prevUsers, ...users }));
      console.log("Liste des utilisateurs en ligne:", users);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const value = {
    socket,
    allOnlineUsers,
    addMessage,
    messages,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const context = React.useContext(SocketContext) as SocketContextType;
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
}
