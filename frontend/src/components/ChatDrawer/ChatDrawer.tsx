import { Drawer } from "antd";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useProject } from "../../contexts/ProjectContext";
import { useSocket } from "../../contexts/SocketContext";
import UserChatCard from "../ChatDrawer/UserChatCard";
import ChatInput from "../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";

export default function ChatDrawer({ id, open, handleChatDrawer }: any) {
  const { projectMembers } = useProject();
  const { user } = useAuth();
  const { socket } = useSocket();

  const projectMember = projectMembers?.find((member) => member.id === id);
  const roomId = `room_${Math.min(id, user?.id!)}_${Math.max(
    id,
    user?.id!
  )}`;

  useEffect(() => {
    socket?.emit("joinRoom", roomId);
  }, [roomId, socket]);

  return (
    <>
      <Drawer
        title={` Chat with ${projectMember?.firstName} ${projectMember?.lastName}`}
        placement="right"
        size="large"
        open={open}
        onClose={handleChatDrawer}
        style={{ padding: "0px" }}
      >
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
          id={id}
        >
          <UserChatCard id={id} />
          <ChatMessage room={roomId} />
          <ChatInput room={roomId} />
        </div>
      </Drawer>
    </>
  );
}
