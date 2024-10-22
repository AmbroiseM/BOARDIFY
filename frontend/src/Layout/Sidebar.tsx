import Sider from "antd/es/layout/Sider";
import MembersList from "../components/MembersList/MembersList";
import ProjectList from "../components/ProjectList/ProjectList";

export default function Sidebar() {
  return (
    <>
      <Sider
        width={250}
        style={{
          background: "white",
          borderRight: "1px solid #d9d9d9",
          padding: "0 15px",
          borderTop: "1px solid #d9d9d9",
        }}
      >
        <ProjectList />
        <MembersList />
      </Sider>
    </>
  );
}
