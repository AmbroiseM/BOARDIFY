import { Task } from "src/tasks/entities/task.entity"

export class UpdateSprintDto
 {
    id: number
    name: string
    startDate: Date
    endDate: Date
    projectId: number
    tasks: Task[]
}