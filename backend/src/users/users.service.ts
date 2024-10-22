import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from "src/auth/dto/login.user.dto";
import { ProjectRepository } from "src/projects/repositories/project.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./repositories/user.repository";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        @Inject(forwardRef(() => ProjectRepository))
        private readonly projectRepository: ProjectRepository,

    ) {
    }

    async findByEmail(email: string): Promise<LoginUserDto | null> {
        try {
            const existingUser = await this.userRepository.findByEmail(email);
            if (!existingUser) {
                throw new ConflictException('User with this email does not exist');
            }
            return existingUser;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to retrieve user');
        }
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const existingUser = await this.userRepository.findByEmail(createUserDto.email);
            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }
            const project = await this.projectRepository.findById(createUserDto.projectId);
            const password = bcrypt.hashSync(createUserDto.password, 10);
            const newUser : Partial<User> = { ...createUserDto, project: project, password: password };

            return await this.userRepository.createUser(newUser);

        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async updateUser(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User> {
        try {
            return await this.userRepository.updateUser(id, updateUserDto);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async deleteUser(id: number): Promise<void> {
        try {
            await this.userRepository.delete(id)
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete user');
        }
    }

}