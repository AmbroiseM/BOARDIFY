import { UserRole } from "../auth.response.dto"


export interface CreateUserDto {
    firstName: string
    lastName: string
    email: string
    password: string
    role: UserRole
    project : number
}