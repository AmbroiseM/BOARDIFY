import React from "react";
import { ProjectProvider } from "../contexts/ProjectContext";
import { SocketProvider } from "../contexts/SocketContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      id="layout"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <ProjectProvider>
          <SocketProvider>
            <Sidebar />
            <main style={{ width: "100%" }}>{children}</main>
          </SocketProvider>
        </ProjectProvider>
      </div>
    </div>
  );
}
