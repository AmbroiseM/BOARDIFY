import { useProject } from "../../contexts/ProjectContext";
import ChatInput from "../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";
import './ChatProject.css'; // Importez le fichier CSS

export default function ChatProject() {
  const { selectedProjectId } = useProject();
  const room = `room_${selectedProjectId}`;

  return (
    <div className="chat-container">
      <ChatMessage room={room} />
      <ChatInput room={room} />
    </div>
  );
}