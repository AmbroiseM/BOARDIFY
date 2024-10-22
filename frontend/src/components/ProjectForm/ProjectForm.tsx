import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { ProjectCreateDto } from "../../types/Project/project.create.dto";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

export default function ProjectForm({
  isModalOpen,
  handleClose,
  addProject,
}: any) {
  const [name, setName] = useState<string | null>(null);
  const [form] = Form.useForm();
  const { user } = useAuth();

  function closePopup() {
    addProject(name);
    handleClose();
    goHere();
  }

  async function goHere() {
    console.log("here: ", { ...form.getFieldsValue(), manager: user?.id });
    try {
      await api.post("/projects/", {
        ...form.getFieldsValue(),
        manager: user?.id,
      } as ProjectCreateDto);
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    }
  }

  return (
    <>
      <Modal
        title="New Project"
        open={isModalOpen}
        onCancel={handleClose}
        onOk={closePopup}
      >
        <Form style={{ marginTop: "50px" }} form={form}>
          <Form.Item
            label="Project Name"
            name="name"
            rules={[
              { required: true, message: "Please input your project name!" },
            ]}
          >
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Project Description"
            name="description"
            rules={[
              {
                required: false,
                message: "Please input your project description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Manager"
            name="manager"
            rules={[
              {
                required: false,
                message: "Please select the project manager!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
