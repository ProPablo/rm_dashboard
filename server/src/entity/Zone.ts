import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Beacon } from "./Beacon";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  CreatedAt: Joi.date().strip(),
  UpdatedAt: Joi.date().strip(),
  Name: Joi.string().min(3).max(30),
  Description: Joi.string().min(3).max(30),
})

export const createSchema = editSchema.concat(Joi.object({
  Name: Joi.required(),
}));

export interface inputZone {
  Name: string,
  Description: string,
}

@Entity()
export class Zone extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column( {nullable: true} )
  Description: string;

  @CreateDateColumn()
  CreatedAt: Date

  @UpdateDateColumn()
  UpdatedAt: Date

  @OneToMany(() => Artefact, Artefact => Artefact.Zone)
  Artefacts: Artefact[]

  @OneToMany(() => Beacon, Beacon => Beacon.Zone)
  Beacons: Beacon[]
}
