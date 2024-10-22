import { useEffect, useState } from "react";
import { useProject } from "../../contexts/ProjectContext";
import { ProjectMemberDto } from "../../types/Project/project.member.dto";
import Member from "./Member";

export default function MembersList() {
  const { projectMembers } = useProject();
  const [members, setMembers] = useState<ProjectMemberDto[]>(
    projectMembers as ProjectMemberDto[]
  );

  useEffect(() => {
    if (projectMembers) {
      setMembers(projectMembers);
    }
  }, [projectMembers]);

  function handleClickOnMember(id: number) {
    setMembers((previous) =>
      previous.map((member) =>
        member.id === id
          ? { ...member, clicked: !member.clicked }
          : { ...member, clicked: false }
      )
    );
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <p style={{ fontWeight: "550" }}>Members</p>
      <div className="scroll" style={{ 
        height: "30vh", 
        overflowY: "auto",
        marginTop: "10px",
        paddingRight: "10px",
      }}>
        {members.map((member) => (
          <Member
            key={member.id}
            id={member.id}
            firstName={member.firstName}
            lastName={member.lastName}
            clicked={member.clicked}
            onClick={handleClickOnMember}
          />
        ))}
      </div>
    </div>
  );
}