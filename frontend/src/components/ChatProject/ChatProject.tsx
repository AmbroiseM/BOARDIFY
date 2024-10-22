import { useProject } from "../../contexts/ProjectContext";
import ChatInput from "../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";

export default function ChatProject() {
  const { selectedProjectId } = useProject();
  const room = `room_${selectedProjectId}`;

  return (
    <>
      <ChatMessage room={room} />
      <ChatInput room={room} />
    </>
  );
}
