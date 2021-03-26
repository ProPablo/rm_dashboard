import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Registration } from "./Registration";
import { Source } from "./Source";
import { Timestamp } from './Timestamp';

export const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().pattern(/^[a-z0-9]{3,}@[a-z0-9]{3,}\.[a-z0-9]{2,}$/i).required(),
    sourceId: Joi.number()
})

@Entity()
export class Student extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Registration, Registration => Registration.student)
    registrations: Registration[]

    @OneToMany(() => Timestamp, timestamp => timestamp.student)
    timestamps: Timestamp[]

    @Column({ nullable: true })
    sourceId: number
    @ManyToOne(() => Source, source => source.referred, {
        nullable: true
    })
    @JoinColumn({ name: "sourceId" })
    source: Source
}
