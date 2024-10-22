import { Sprint } from "../entites/sprint.entity";
import { CreateSprintDto } from "../dto/create-sprint.dto";
import { UpdateSprintDto } from "../dto/update-sprint.dto";

export interface ISprintRepository {
    createSprint(sprint: CreateSprintDto): Promise<Sprint>;
    updateSprint(id: number, updateSprint: Partial<UpdateSprintDto>): Promise<Sprint>;
    findAll(): Promise<Sprint[]>;
    findById(id: number): Promise<Sprint | null>;
    delete(id: number): Promise<void>;
}