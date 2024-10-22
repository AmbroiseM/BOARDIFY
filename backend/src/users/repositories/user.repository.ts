import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { Repository } from 'typeorm';
import { ProjectMemberDto } from 'src/projects/dto/project-member.dto';
import { LoginUserDto } from 'src/auth/dto/login.user.dto';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async getMembersForProject(projectId: number): Promise<ProjectMemberDto[] | null> {
    const members: ProjectMemberDto[] = await this.userRepository.createQueryBuilder('user')
      .select(['user.id', 'user.firstName', 'user.lastName', 'user.role'])
      .innerJoin('user.project', 'project')
      .where('project.id = :projectId', { projectId })
      .getMany();

    return members;
  }

  async findByEmail(email: string): Promise<LoginUserDto | null> {
    const user = await this.userRepository.createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.firstName', 'user.lastName',  'user.password', 'user.role', 'project.id', 'project.name'])
      .innerJoin('user.project', 'project')
      .where('user.email = :email', { email })
      .getOne();
    return user
  }

  async createUser(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: Partial<UpdateUserDto>): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
