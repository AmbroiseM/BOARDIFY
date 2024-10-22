import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { User } from 'src/users/entities/user.entity';
import { ProjectCardDto } from './dto/projet-card.dto';
import { ProjectMemberDto } from './dto/project-member.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectRepository,
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository
  ) { }

  async createProject(project: CreateProjectDto): Promise<void> {

    const name = project.name.charAt(0).toUpperCase() + project.name.slice(1).toLowerCase();

    // TO DO after : actually get the manager selected from the frontend, for now get the admin
    const manager: User = await this.userRepository.findById(project.manager);

    const newProject: Partial<Project> = {
      name: name,
      description: project.description,
      manager: manager ? manager : null
    }
    const createdProject = await this.projectRepository.createProject(newProject);
    manager.project = createdProject;

    await this.userRepository.updateUser(manager.id, { project: createdProject });
  }


  async getMembersForProject(projectId: number): Promise<ProjectMemberDto[] | null> {
    return await this.userRepository.getMembersForProject(projectId);
  }

  async getProjects(): Promise<Project[] | null> {
    return await this.projectRepository.findAll();
  }

  async getProjectByid(id: number): Promise<ProjectCardDto | null> {
    return await this.projectRepository.findProjectCardById(id);
  }

  async getProjectForUser(id: number): Promise<Project | null> {
    return await this.projectRepository.getProjectForUserId(id);
  }

}
