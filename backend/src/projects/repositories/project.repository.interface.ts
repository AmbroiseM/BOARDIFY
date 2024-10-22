import { Project } from '../entities/project.entity';

export interface IProjectRepository {
  createProject(project: Partial<Project>): Promise<Project>;
  findAll(): Promise<Project[]>;
  findById(id: number): Promise<Project | null>;
  delete(id: number): Promise<void>;
}
