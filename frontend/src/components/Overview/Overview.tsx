import React from "react";
import SprintList from "../SprintList/SprintList";
import "./Overview.css";
import { Button } from "antd";

export default function Overview() {
  return (
    <>
      <div
        className="scroll"
        style={{
          width: "95%",
          height: "650px",
          padding: "20px",
          alignContent: "center",
          overflowY: "auto",
        }}
      >
        <Button
          style={{
            color: "rgba(1,116,243,255)",
            fontWeight: "500",
            marginTop: "20px",
            width: "200px",
            marginLeft: "40%",
            borderColor: "rgba(1,116,243,255)",
          }}
          type="dashed"
        >
          + Add Sprint
        </Button>
        <SprintList />
      </div>
    </>
  );
}
