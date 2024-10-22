import { Comment } from "src/comments/entities/comment.entity"
import { Project } from "src/projects/entities/project.entity"
import { Sprint } from "src/sprint/entites/sprint.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.LOW })
    priority: TaskPriority

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => User, user => user.assignedTasks)
    assignee: User

    @ManyToOne(() => Project, project => project.tasks)
    project: Project

    @OneToMany(() => Comment, comment => comment.task)
    comments: Comment[]

    @ManyToOne(() => Sprint, sprint => sprint.tasks)
    sprint : Sprint

}