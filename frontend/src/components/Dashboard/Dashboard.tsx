import type { TabsProps } from "antd";
import { Badge, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useProject } from "../../contexts/ProjectContext";
import { useSocket } from "../../contexts/SocketContext";
import ChatProject from "../ChatProject/ChatProject";
import Overview from "../Overview/Overview";

interface LayoutProps {
  children: React.ReactNode;
}
function Background({ children }: LayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f6f6f6",
        borderTop: "2px solid #d9d9d9",
        marginLeft: " -30px",
        minHeight: "100vh",
        marginTop: "-20px",
      }}
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  const { messages } = useSocket();
  const { selectedProjectId } = useProject();
  const [countNewMessages, setCountNewMessages] = React.useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("1");

  useEffect(() => {
    if (activeTab !== "1" && selectedProjectId) {
      // TO DO AFTER : only count the new messages
      const messageCount = messages?.[`room_${selectedProjectId}`]?.length ?? 0;
      setCountNewMessages(messageCount);
    }
  }, [messages, selectedProjectId, activeTab]);

  const onChange = (key: string) => {
    setActiveTab(key);
    if (key === "1") {
      setCountNewMessages(0);
      // TO DO AFTER : apply logic to set new messages to status "seen"
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <p style={{ fontWeight: "bold", fontSize: "15px" }}>
          Discussions <Badge count={countNewMessages} />
        </p>
      ),
      children: (
        <Background>
          <ChatProject />
        </Background>
      ),
    },
    {
      key: "2",
      label: <p style={{ fontWeight: "bold", fontSize: "15px" }}>Tasks</p>,
      children: <Background>'Content of Tab Pane 2'</Background>,
    },
    {
      key: "3",
      label: <p style={{ fontWeight: "bold", fontSize: "15px" }}>Overview</p>,
      children: (
        <Background>
          <Overview />
        </Background>
      ),
    },
  ];

  return (
    <>
      <Tabs
     
        style={{
          width: "100%",
          paddingLeft: "30px",
          borderTop: "1px solid #d9d9d9",
        }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        tabBarGutter={40}
      />
    </>
  );
}
