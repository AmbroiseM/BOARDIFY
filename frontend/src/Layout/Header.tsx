import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Input, Layout, MenuProps, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const { Header } = Layout;
  const { Search } = Input;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p>
          {" "}
          Signed in as
          <p style={{ whiteSpace: "preline", fontWeight: "bold" }}>
            {user?.email}
          </p>
        </p>
      ),
    },
    {
      key: "2",
      danger: true,
      label: "Logout",
      onClick: () => {
        navigate("/login");
        logout();
      },
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <h1 style={{ fontSize: "20px", color: "rgba(1,116,243,255)" }}>
        {" "}
        BOARDIFY
      </h1>
      <Search
        placeholder="input search text"
        style={{ width: 500 }}
        allowClear
        enterButton
      />

      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              size={32}
              icon={<UserOutlined />}
            />
          </Space>
        </a>
      </Dropdown>
    </Header>
  );
}

export default Header;
