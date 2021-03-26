import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./Course";
import { Student } from "./Student";

export interface inputRegistration {
    courseId: number,
    studentId: number,
    courseStart: Date,

}
// Joi allows less than the original obj but not more
export const schema = Joi.object({
    courseId: Joi.number().required(),
    studentId: Joi.number().required(),
    courseStart: Joi.date(),
    coursePeriod: Joi.number().required(),
    courseAmount: Joi.number().allow(null), // value returned is alos null
})

@Entity()
export class Registration extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    studentId: number
    @ManyToOne(() => Student, student => student.registrations, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "studentId" })
    student: Student;

    @PrimaryColumn()
    courseId: number
    @ManyToOne(() => Course, course => course.enrolled)
    @JoinColumn({ name: "courseId" })
    course: Course

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    courseStart: Date;

    @Column("int")
    coursePeriod: number

    @Column("int", { nullable: true })
    courseAmount: number

    @Column("float", { nullable: true })
    desired: number
}
