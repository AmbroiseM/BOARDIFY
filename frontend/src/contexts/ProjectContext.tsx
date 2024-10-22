import React, { useState } from "react";
import { ProjectMemberDto } from "../types/Project/project.member.dto";

interface ProjectContextType {
  selectedProjectId: number | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
  projectMembers: ProjectMemberDto[] | null;
  setProjectMembers: React.Dispatch<
    React.SetStateAction<ProjectMemberDto[] | null>
  >;
}

export const ProjectContext = React.createContext<
  ProjectContextType | undefined
>(undefined);

export function ProjectProvider({ children }: any) {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [projectMembers, setProjectMembers] = useState<
    ProjectMemberDto[] | null
  >([] as ProjectMemberDto[]);
  const value = {
    selectedProjectId,
    setSelectedProjectId,
    projectMembers,
    setProjectMembers,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProject() {
  const context = React.useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
