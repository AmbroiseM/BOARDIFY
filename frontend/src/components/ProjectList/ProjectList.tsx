import { Button } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useProject } from "../../contexts/ProjectContext";
import api from "../../services/api";
import ProjectForm from "../ProjectForm/ProjectForm";
import ProjetItem from "./ProjetItem";

export default function ProjectList() {
  const { user } = useAuth();
  const { setSelectedProjectId } = useProject();
  const [projects, setProjects] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user && user?.id) {
      getProjectForUserId(user?.id!);
    }
  }, [user]);

  async function getProjectForUserId(userId: number) {
    try {
      const request = await api.get(`/projects/user/${userId}`);
      //TO DO : define the type of request later
      const userProjects = (await request.data) as any;
      userProjects.forEach((project: any) => {
        // TO DO later : add a value for a default selected project
        onClickOnProject(project.id);
        setProjects([
          ...projects,
          { id: project.id, name: project.name, clicked: true },
        ]);
      });
    } catch (error) {
      console.log("Unable to get the requested projects for this user", error);
    }
  }

  function onClickOnProject(projectId: number) {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, clicked: !project.clicked }
          : { ...project, clicked: false }
      )
    );
    setSelectedProjectId(projectId);
  }

  function handleButtonAddProject() {
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  function addProject(name: string) {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    getProjectForUserId(user?.id!);
  }

  return (
    <>
      <div>
        <p style={{ fontWeight: "550" }}>Projects</p>
      </div>
      {projects.map((project) => (
        <ProjetItem
          key={project.id}
          id={project.id}
          name={project.name}
          clicked={project.clicked}
          onClick={onClickOnProject}
        />
      ))}
      <Button
        onClick={handleButtonAddProject}
        style={{
          color: "rgba(1,116,243,255)",
          fontWeight: "500",
          marginTop: "20px",
          width: "60%",
          marginLeft: "20%",
          borderColor: "rgba(1,116,243,255)",
        }}
        type="dashed"
      >
        + Add Project
      </Button>
      <ProjectForm
        isModalOpen={showPopup}
        handleClose={handleClosePopup}
        addProject={addProject}
      />
    </>
  );
}
