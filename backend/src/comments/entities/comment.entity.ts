import { Task } from "src/tasks/entities/task.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"



@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @ManyToOne(() => Task, task => task.comments)
    @JoinColumn()
    task: Task

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column()
    postedAt: Date

    @Column()
    modifiedAt: Date
    
}