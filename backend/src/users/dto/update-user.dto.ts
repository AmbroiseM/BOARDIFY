import { Project } from "src/projects/entities/project.entity"
import { UserRole } from "../entities/user.entity"


export class UpdateUserDto {
    email: string
    password: string
    firstName: string
    lastName: string
    role: UserRole
    project : Project
}