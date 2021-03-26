import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Timestamp extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  time: Date;

  @PrimaryColumn()
  studentId: number;
  @ManyToOne(() => Student, student => student.timestamps, {
    // Normal Cascade doesnt work here
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "studentId" })
  student: Student;
}
