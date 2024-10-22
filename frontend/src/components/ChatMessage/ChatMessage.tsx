import Avatar from "antd/es/avatar/avatar";
import { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Message, useSocket } from "../../contexts/SocketContext";
import "./ChatMessage.css";

interface Props {
  room: string;
}

export default function ChatMessage({ room }: Props) {
  const { messages } = useSocket();
  const { user } = useAuth();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <>
      <div
        ref={chatContainerRef}
        className="scroll"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          width: "90%",
          overflowY: "auto",
          height: "600px",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #d9d9d9",
          marginTop: "20px",
        }}
      >
        {messages?.[room]?.map((message: Message) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
              alignSelf:
                user?.id === message.senderId ? "flex-end" : "flex-start",
            }}
          >
            {user?.id !== message.senderId && (
              <Avatar
                size={25}
                style={{
                  marginTop: "30px",
                  marginRight: "5px",
                  fontSize: "15px",
                  
                }}
              >
                {message.senderFullName.split(" ")[0][0] +
                  message.senderFullName.split(" ")[1][0]}
              </Avatar>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  marginTop: "15px",
                  backgroundColor:
                    user?.id === message.senderId ? "#1677ff" : "#DCF8C6",
                  color: user?.id === message.senderId ? "white" : "black",
                  padding: "10px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "500",
                  width: "fit-content",
                  float: user?.id === message.senderId ? "left" : "right",
                }}
              >
                {message.content}
              </div>
              {message.senderId !== user?.id && (
                <p
                  style={{
                    fontSize: "11px",
                    margin: "0",
                    color: "gray",
                    fontWeight: "500",
                  }}
                >
                  {message.senderFullName}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
