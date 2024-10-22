import {
  AudioOutlined,
  PlusCircleFilled,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Input, Popover } from "antd";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
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
    <>
      <AudioOutlined
        style={{
          fontSize: 16,
          color: "#1677ff",
        }}
      />
      <PlusCircleFilled
        style={{
          fontSize: 16,
          color: "#1677ff",
        }}
      />
      <Popover
        placement="top"
        content={
          <EmojiPicker
            onEmojiClick={(e: EmojiClickData) => handleEmoji(e.emoji)}
          />
        }
      >
        <SmileOutlined style={{color: "#0147f3"}} />
      </Popover>
    </>
  );

  function handleEmoji(emoji: string) {
    setMessage((prevMessage) => prevMessage + emoji);
  }

  function handleSend() {
    console.log("here: ", message);
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
