import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ProjectProvider } from "../contexts/ProjectContext";
import { SocketProvider } from "../contexts/SocketContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div
        style={{
          display: "flex",
          height: "95vh",
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
