import { Injectable } from "@nestjs/common";
import { SprintRepository } from "./repositories/sprint.repository";
import { Sprint } from "./entites/sprint.entity";
import { CreateSprintDto } from "./dto/create-sprint.dto";

@Injectable()
export class SprintService {

    constructor(private readonly sprintRepository: SprintRepository) { }

    async createSprint(sprint: CreateSprintDto): Promise<Sprint> {
        return await this.sprintRepository.createSprint(sprint)
    }

    async updateSprint(id: number, updateSprint: Partial<CreateSprintDto>): Promise<Sprint> {
        return await this.sprintRepository.updateSprint(id, updateSprint)
    }


}