import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Beacon } from "./Beacon";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  createdAt: Joi.date().strip(),
  updatedAt: Joi.date().strip(),
  name: Joi.string().min(3).max(30),
  description: Joi.string().min(3).max(30),
})

export const createSchema = editSchema.concat(Joi.object({
  name: Joi.required(),
}));

@Entity()
export class Zone extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column( {nullable: true} )
  description: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Artefact, Artefact => Artefact.Zone)
  Artefacts: Artefact[]

  @OneToMany(() => Beacon, Beacon => Beacon.Zone)
  Beacons: Beacon[]
}
