import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Zone } from "./Zone";

export const schema = Joi.object({
  Name: Joi.string().alphanum().min(3).max(30).required(),
  Description: Joi.string().min(3).max(30).required(),
})

@Entity()
export class Beacon extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Visits: string;

  @Column()
  Name: string;

  @Column()
  MACAddress: string;

  @CreateDateColumn()
  CoordX: Date

  @UpdateDateColumn()
  CoordY: Date

  @OneToMany(() => Artefact, Artefact => Artefact.Beacon)
  Artefacts: Artefact[]

  @ManyToOne(() => Zone, Zone => Zone.Beacons)
  Zones: Zone[]

}
