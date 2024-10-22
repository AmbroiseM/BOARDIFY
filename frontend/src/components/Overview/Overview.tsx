import { Button } from "antd";
import SprintList from "../SprintList/SprintList";
import "./Overview.css";

export default function Overview() {
  return (
    <>
      <div
        className="scroll overview"
        style={{
          width: "90%",
          padding: "20px",
          paddingLeft: "40px",
          paddingRight: "40px",
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
