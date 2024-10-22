import { Task } from "src/tasks/entities/task.entity"



export class CreateSprintDto {
    id: number
    name: string
    startDate: Date
    endDate: Date
    projectId: number
    tasks: Task[]
}