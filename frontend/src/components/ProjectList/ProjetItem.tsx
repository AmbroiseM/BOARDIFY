import { Card } from "antd";
import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { FcBriefcase } from "react-icons/fc";

export default function ProjetItem({ id, name, clicked, onClick }: any) {
  return (
    <Card
      onClick={() => onClick(id)}
      style={{
        width: "100%",
        marginTop: "10px",
        color: clicked ? "white" : "",
        backgroundColor: clicked ? "rgba(1,116,243,255)" : "white",
        padding: 0,
        border: "1px solid #d9d9d9",
        cursor: "pointer",
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
        <span style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <FcBriefcase
            style={{
              marginTop: "0px",
              fontSize: "18px",
              backgroundColor: clicked ? "white" : "",
              padding: "5px",
              borderRadius: "20%",
            }}
          />
          <p style={{ margin: 0, fontWeight: "bold" }}> {name}</p>
        </span>
        <MoreOutlined style={{ fontSize: "20px" }} />
      </div>
    </Card>
  );
}
