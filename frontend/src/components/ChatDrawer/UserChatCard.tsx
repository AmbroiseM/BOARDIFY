import { Avatar, Tag } from "antd";
import { useProject } from "../../contexts/ProjectContext";
import { useSocket } from "../../contexts/SocketContext";

export default function UserChatCard({ id }: any) {
  const { projectMembers } = useProject();
  const { allOnlineUsers } = useSocket();
  const isOnline = allOnlineUsers?.[id];
  const user = projectMembers?.find((member) => member.id === id);
  const online = "#11be95";
  const offline = "#d9d9d9";

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Avatar size={85} style={{ fontWeight: "bold", fontSize: "30px" }}>
            {user?.firstName.charAt(0)}
            {user?.lastName.charAt(0)}
          </Avatar>
          <span
            style={{
              color: isOnline ? online : offline,
              fontSize: "25px",
              padding: "5px",
              marginTop: "50px",
              marginLeft: "-10px",
            }}
          >
            {" ● "}
          </span>
        </div>

        <h2 style={{ fontWeight: "bold", margin: "0" }}>
          {user?.firstName} {user?.lastName}
        </h2>
        <h4 style={{ fontWeight: "bold", margin: "0" }}>
          @{user?.firstName}.{user?.lastName}
        </h4>
        <Tag
          style={{
            marginTop: "10px",
            fontSize: "15px",
            padding: "5px",
            fontWeight: "500",
            color: "#232323",
          }}
        >
          {user?.role === "PO" ? "Product Owner" : "User"}
        </Tag>
      </div>
    </>
  );
}
