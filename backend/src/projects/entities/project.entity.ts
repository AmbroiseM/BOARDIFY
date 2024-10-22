import { Sprint } from 'src/sprint/entites/sprint.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToOne(() => User)
  @JoinColumn()
  manager: User;

  @OneToMany(() => User, (user) => user.project)
  members: User[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(() => Sprint, (sprint) => sprint.project)
  sprints: Sprint[];
}
