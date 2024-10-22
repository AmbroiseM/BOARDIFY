import { ProjectCardDto } from './../dto/projet-card.dto';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { IProjectRepository } from './project.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class ProjectRepository implements IProjectRepository {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    async createProject(project: Partial<Project>): Promise<Project> {
        return await this.projectRepository.save(project);
    }

    findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }
    async findById(id: number): Promise<Project | null> {
        return await this.projectRepository.findOneBy({ id });
    }

    async findProjectCardById(id: number): Promise<ProjectCardDto | null> {

        const projectCard: ProjectCardDto = await this.projectRepository.createQueryBuilder('project')
            .leftJoinAndSelect('project.members', 'user')
            .select(['project.id', 'project.name', 'project.description', 'user.id', 'user.firstName', 'user.lastName', 'user.role'])
            .where('project.id = :id', { id })
            .getOne();
        return projectCard;
    }
    
    async delete(id: number): Promise<void> {
        await this.projectRepository.delete(id);
    }

    async getProjectForUserId(userId: number): Promise<Project | null> {

        // TO DO later : use a more typeorm way to do this
        const query = 'SELECT p.* FROM "project" p JOIN "user" u ON p."id" = u."project_id" WHERE u."id" = $1';
        return this.projectRepository.query(query, [userId]);
    }
}
