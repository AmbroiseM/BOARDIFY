import { Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { Task } from "../entities/task.entity";
import { ITasksRepository } from "./tasks.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";



export class TaskRepository implements ITasksRepository {

    constructor(@InjectRepository(Task)
    private readonly taskRepository: Repository<Task>) { }

    createTask(task: CreateTaskDto): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}