export class ProjectCardDto {
    id: number
    name: string
    description: string
    members: {
        id: number,
        firstName: string,
        lastName: string,
        role: string
    }[] = []

    static fromEntity(project: any): ProjectCardDto {
        const dto = new ProjectCardDto();
        dto.id = project.id;
        dto.name = project.name;
        dto.description = project.description;
        dto.members = project.members.map(member => ({
          id: member.id,
          firstName: member.firstName,
          lastName: member.lastName,
          role: member.role
        }));
        return dto;
      }

}
