import React from "react";
import Sprint from "../Sprint/Sprint";
import { ConfigProvider } from "antd";

export default function SprintList() {
  return (
    <>
      {/*   <div style={{ backgroundColor: 'blue', width: '70%' }}> </div> */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgba(1,116,243,255)",
              headerColor: "white",
            },
          },
        }}
      >
        <Sprint name={"Sprint 1 "} />
        <Sprint name={"Sprint 2"} />
        <Sprint name={"Sprint 3"} />
      </ConfigProvider>
    </>
  );
}