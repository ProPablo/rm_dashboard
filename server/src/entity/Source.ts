import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Student } from "./Student";

export interface inputSource {
    name: string,
    clicks?: number
}

@Entity()
export class Source extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('int', { default: () => "0" })
    clicks: number;

    @OneToMany(() => Student, student => student.source)
    referred: Student[]
}
