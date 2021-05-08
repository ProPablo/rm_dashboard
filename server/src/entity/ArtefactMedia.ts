import { genSalt, hash } from "bcrypt";
import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Artefact } from "./Artefact";
import { Zone } from "./Zone";

export enum MediaType {
  image,
  video,
}

// export const schema = Joi.object({

// });

@Entity()
export class ArtefactMedia extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  src: string;

  @Column()
  title: string;

  @Column({
    type: "enum",
    enum: MediaType,
    default: MediaType.video
  })
  type: MediaType;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  artefactId: number;

  @OneToOne(() => Artefact, Artefact => Artefact.MediaSrc, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "artefactId" })
  Artefact: Artefact;

}
