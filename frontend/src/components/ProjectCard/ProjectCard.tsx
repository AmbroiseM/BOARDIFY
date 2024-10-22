import { Avatar, Button, Card, Popover } from "antd";
import { useEffect, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import { useAuth } from "../../contexts/AuthContext";
import { useProject } from "../../contexts/ProjectContext";
import api from "../../services/api";
import { ProjectCardDto } from "../../types/Project/project.card";
import { ProjectMemberDto } from "../../types/Project/project.member.dto";
import UserForm from "../UserForm/UserForm";

export default function ProjectCard() {
  const { user } = useAuth();
  const { selectedProjectId, setProjectMembers } = useProject();
  const [showUserForm, setShowUserForm] = useState(false);
  const [project, setProject] = useState<ProjectCardDto>({} as ProjectCardDto);

  useEffect(() => {
    if (selectedProjectId) {
      getProjectCardById(selectedProjectId);
    }
  }, [selectedProjectId]);

  async function getProjectCardById(id: number) {
    try {
      const request = await api.get(`/projects/card/${id}`);
      const project: ProjectCardDto = request.data as ProjectCardDto;
      const projectMembers: ProjectMemberDto[] =
        project.members
          ?.filter((member) => member.id !== user?.id)
          .map((member) => ({
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            role: member.role,
            clicked: false,
          })) || [];
      setProjectMembers(projectMembers);
      setProject(project);
    } catch (error) {
      console.log("Couldn't get the requested project card", error);
    }
  }

  async function handleClose() {
    setShowUserForm(false);
    getProjectCardById(selectedProjectId!);
  }

  return (
    <>
      <Card
        style={{
          width: "100%",
          height: "70px",
          borderRadius: "0px",
          border: "1px solid #d9d9d9",
          borderLeftColor: "white",
          borderBottomColor: "white",
          padding: "0",
        }}
        styles={{
          body: {
            height: "100%",
            padding: "0 24px",
          },
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          width: "100%", 
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <FcBriefcase
              style={{
                fontSize: "38px",
                padding: "5px",
                borderRadius: "20%",
                backgroundColor: "rgba(203, 221, 241, 255)",
              }}
            />
            <h2 style={{ margin: 0, fontWeight: "bold" }}>{project.name}</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar.Group
              size="large"
              maxCount={3}
              maxStyle={{
                color: "rgba(1,116,243,255)",
                backgroundColor: "rgba(203, 221, 241, 255)",
                border: "2px solid rgba(1,116,243,255)",
              }}
            >
              {project.members?.map((member) => (
                <Popover key={member.id} content={member.firstName}>
                  <Avatar style={{ backgroundColor: "rgb(193 196 199)" }}>
                    {member.firstName.charAt(0).toUpperCase()}
                    {member.lastName.charAt(0).toUpperCase()}
                  </Avatar>
                </Popover>
              ))}
            </Avatar.Group>
            <Button
              onClick={() => setShowUserForm(true)}
              type="primary"
              style={{
                marginLeft: "20px",
                backgroundColor: "rgba(1,116,243,255)",
              }}
            >
              + Add Member
            </Button>
          </div>
        </div>
      </Card>

      {showUserForm && (
        <UserForm handleClose={handleClose} isModalOpen={showUserForm} />
      )}
    </>
  );
}