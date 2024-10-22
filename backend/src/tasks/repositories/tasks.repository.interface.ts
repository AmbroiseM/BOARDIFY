import { CreateTaskDto } from "../dto/create-task.dto"
import { Task } from "../entities/task.entity"



export interface ITasksRepository {
    createTask(task: CreateTaskDto): Promise<Task>
    findAll(): Promise<Task[]>
    findById(id: number): Promise<Task | null>
    delete(id: number): Promise<void>
}