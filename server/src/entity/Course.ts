import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Registration } from "./Registration";

export interface inputCourse {
    name: string
}

@Entity()
export class Course extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Registration, Registration => Registration.course)
    enrolled: Registration[]
}
