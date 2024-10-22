import { Project } from "src/projects/entities/project.entity"
import { Task } from "src/tasks/entities/task.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Sprint {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @ManyToOne(() => Project, project => project.sprints)
    project: Project

    @OneToMany(() => Task, task => task.sprint)
    tasks: Task[]
}