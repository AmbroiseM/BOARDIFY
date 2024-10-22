import Sider from "antd/es/layout/Sider";
import MembersList from "../components/MembersList/MembersList";
import ProjectList from "../components/ProjectList/ProjectList";

export default function Sidebar({ onSelectedProject }: any) {
  return (
    <>
      <Sider
        width={240}
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
