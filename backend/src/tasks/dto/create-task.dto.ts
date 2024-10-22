import { Comment } from "src/comments/entities/comment.entity"
import { User } from "src/users/entities/user.entity"
import { TaskPriority } from "../entities/task.entity"

export class CreateTaskDto {
    name: string
    description: string
    priority: TaskPriority
    project: number
    assignee: User
    comments: Comment[]
}