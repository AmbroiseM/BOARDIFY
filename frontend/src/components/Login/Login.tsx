import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AuthDto } from "../../types/auth.response.dto";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    try {
      await login({ email, password } as AuthDto);
      navigate("/home");
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="left">
          <h1
            style={{
              fontSize: "70px",
              marginTop: "5px",
              color: "rgba(1,116,243,255)",
            }}
          >
            BOARDIFY{" "}
          </h1>

          <div className="card">
            <Form
              name="login"
              initialValues={{ remember: true }}
              style={{ width: "450px", marginTop: "5px" }}
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please input your Mail!" }]}
              >
                <h3 style={{ color: "rgba(20,77,154,255)" }}>
                  Email <span style={{ color: "red" }}>*</span>
                  <Input
                    className="input"
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </h3>
              </Form.Item>

              <Form.Item
                style={{ marginTop: "-40px" }}
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <h3 style={{ color: "rgba(20,77,154,255)" }}>
                  Password <span style={{ color: "red" }}>*</span>
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </h3>
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox
                      style={{
                        fontWeight: "bold",
                        color: "rgba(20,77,154,255)",
                      }}
                    >
                      Remember me
                    </Checkbox>
                  </Form.Item>
                  <a style={{ color: "rgba(20,77,154,255)" }} href="">
                    Forgot password
                  </a>
                </Flex>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "rgba(1,116,243,255)",
                    color: "white",
                  }}
                  size="large"
                  block
                  type="primary"
                  htmlType="submit"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
          <h6 style={{ color: "white", marginTop: "80px" }}>
            {"© 2024 Boardify All Rights Reserved "}
            
          </h6>
        </div>
      </div>
    </>
  );
}
