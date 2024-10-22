import { AudioOutlined, SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useSocket } from "../../contexts/SocketContext";

interface Props {
  room: string;
}

export default function ChatInput({ room }: Props) {
  const [message, setMessage] = useState<string | null>("");
  const { socket } = useSocket();
  const { Search } = Input;
  const { user } = useAuth();

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  function handleSend() {
    if (message && socket) {
      socket.emit("message", {
        room,
        message,
        senderId: user?.id,
        senderFullName: user?.firstName + " " + user?.lastName,
      });
      setMessage("");
    }
  }
  return (
    <>
      <Search
        placeholder="Enter a message..."
        enterButton={<SendOutlined />}
        size="middle"
        style={{
          width: "600px",
          marginTop: "20px",
          fontSize: "15px",
          alignSelf: "bottom",
        }}
        value={message!}
        suffix={suffix}
        onChange={(e) => setMessage(e.target.value)}
        onSearch={handleSend}
      />
    </>
  );
}
