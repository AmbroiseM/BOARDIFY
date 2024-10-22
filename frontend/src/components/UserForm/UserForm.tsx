import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";
import { useProject } from "../../contexts/ProjectContext";
import api from "../../services/api";
import { CreateUserDto } from "../../types/User/create.user.dto";

export default function UserForm({ handleClose, isModalOpen }: any) {
  const [form] = Form.useForm();
  const { selectedProjectId } = useProject();
  const { Option } = Select;
  const [generatedEmail, setGeneratedEmail] = useState("");

  const generateEmail = (firstName: string, lastName: string) => {
    const email = `${firstName.toLowerCase()}${lastName
      .charAt(0)
      .toLowerCase()}@boardify.fr`;
    return email;
  };

  useEffect(() => {
    const firstName = form.getFieldValue("firstName") || "";
    const lastName = form.getFieldValue("lastName") || "";
    setGeneratedEmail(generateEmail(firstName, lastName));
  }, [form]);

  function onValuesChange(changedValues: any, allValues: any) {
    if ("firstName" in changedValues || "lastName" in changedValues) {
      const email = generateEmail(
        allValues.firstName || "",
        allValues.lastName || ""
      );
      setGeneratedEmail(email);
      form.setFieldsValue({ email });
    }
  }

  function onRoleChange(value: string) {
    switch (value) {
      case "PO":
        form.setFieldsValue({ note: "PO" });
        break;
      case "USER":
        form.setFieldsValue({ note: "USER" });
        break;
      case "DIRECTOR":
        form.setFieldsValue({ note: "DIRECTOR" });
        break;
      case "MANAGER":
        form.setFieldsValue({ note: "MANAGER" });
        break;
      default:
        form.setFieldsValue({ note: "USER" });
    }
  }

  async function saveUser() {
    try {
      console.log("here: ", {
        ...form.getFieldsValue(),
        project: selectedProjectId,
      });
      await api.post("/users/", {
        ...form.getFieldsValue(),
        projectId: selectedProjectId,
      } as CreateUserDto);
      handleClose();
    } catch (error) {
      console.log("Unable to add a new user to the project", error);
    }
  }

  return (
    <>
      <Modal
        title="New User"
        open={isModalOpen}
        onCancel={handleClose}
        onOk={saveUser}
      >
        <Form form={form} onValuesChange={onValuesChange}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input value={generatedEmail} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select
              placeholder="Select a role"
              onChange={onRoleChange}
              allowClear
            >
              <Option value="USER">USER</Option>
              <Option value="DIRECTOR">DIRECTOR</Option>
              <Option value="MANAGER">MANAGER</Option>
              <Option value="PO">PO</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
