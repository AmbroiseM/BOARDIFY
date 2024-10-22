import { DownOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useSocket } from "../../contexts/SocketContext";
import ChatDrawer from "../ChatDrawer/ChatDrawer";

export default function Member({
  id,
  firstName,
  lastName,
  clicked,
  onClick,
}: any) {
  const online = "#11be95";
  const offline = "#d9d9d9";
  const { allOnlineUsers, messages } = useSocket();
  const { user } = useAuth();
  const isOnline = allOnlineUsers?.[id];
  const [newMessages, setNewMessages] = useState<number>(0);

  console.log("id: ", id, "clicked: ", clicked);
  useEffect(() => {
    if (!clicked) {
      if (
        messages?.[`room_${Math.min(id, user?.id!)}_${Math.max(id, user?.id!)}`]
      ) {
        setNewMessages(
          messages[
            `room_${Math.min(id, user?.id!)}_${Math.max(id, user?.id!)}`
          ].filter((message: any) => message.senderId === id).length
        );
      }
    }
  }, [messages]);

  function handleChatDrawer() {
    onClick(id);
  }

  return (
    <>
      <Card
        onClick={handleChatDrawer}
        style={{
          width: "100%",
          marginTop: "10px",
          color: clicked ? "white" : "",
          backgroundColor: clicked ? "rgba(1,116,243,255)" : "white",
          padding: 0,
          border: "1px solid #d9d9d9",
        }}
        styles={{
          body: {
            height: "50px",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
            padding: "0 10px",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              cursor: "pointer",
            }}
          >
            <Avatar>
              {firstName.charAt(0).toUpperCase()}
              {lastName.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                {firstName} {lastName}{" "}
                {newMessages > 0 && (
                  <Badge style={{ marginLeft: "10px" }} count={newMessages} />
                )}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  margin: 0,
                  fontWeight: "500",
                  color: clicked ? "white" : "gray",
                }}
              >
                <span style={{ color: isOnline ? online : offline }}>
                  {" ● "}
                </span>
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>

            <DownOutlined
              style={{ position: "absolute", right: "10px", fontSize: "11px" }}
            />
          </span>
        </div>
      </Card>
      {clicked && (
        <ChatDrawer
          id={id}
          open={clicked}
          handleChatDrawer={handleChatDrawer}
        />
      )}
    </>
  );
}
