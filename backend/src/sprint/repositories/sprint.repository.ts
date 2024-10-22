import { Project } from "src/projects/entities/project.entity";
import { ISprintRepository } from "./sprint.interface.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sprint } from "../entites/sprint.entity";
import { CreateSprintDto } from "../dto/create-sprint.dto";
import { CreateProjectDto } from "src/projects/dto/create-project.dto";


export class SprintRepository implements ISprintRepository {

    constructor(@InjectRepository(Sprint)
    private readonly sprintRepository: Repository<Sprint>) { }

    createSprint(sprint: CreateSprintDto): Promise<Sprint> {
        throw new Error("Method not implemented.");
    }
    updateSprint(id: number, updateProjectDto: Partial<CreateSprintDto>): Promise<Sprint> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Sprint[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Sprint | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    

}