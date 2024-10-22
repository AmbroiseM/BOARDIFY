import { ProjectMemberDto } from "src/projects/dto/project-member.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { LoginUserDto } from "src/auth/dto/login.user.dto";


export interface IUserRepository {
    createUser(user: Partial<User>): Promise<User>
    updateUser(id: number, updateUserDto: Partial<UpdateUserDto>): Promise<User>
    findAll(): Promise<User[]>
    findById(id: number): Promise<User | null>
    delete(id: number): Promise<void>
    findByEmail(email: string): Promise<LoginUserDto | null>
    getMembersForProject(projectId: number): Promise<ProjectMemberDto[] | null>;
}