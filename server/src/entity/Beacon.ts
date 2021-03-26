import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Zone } from "./Zone";

export const schema = Joi.object({
  Name: Joi.string().alphanum().min(3).max(30).required(),
  CoordX: Joi.number(),
  CoordY: Joi.number(),
  MACAddress: Joi.string().pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/).required(),
})

export interface inputBeacon {
    Name: string,
    Visits: number,
    MACAddress: string,
    CoordX: number,
    CoordY: number,
    Activation: boolean
  }

@Entity()
export class Beacon extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column({ default: () => "0" })
  Visits: number;

  @Column()
  MACAddress: string;

  @Column()
  CoordX: number;

  @Column()
  CoordY: number;

  @OneToMany(() => Artefact, Artefact => Artefact.Beacon)
  Artefacts: Artefact[]

  @ManyToOne(() => Zone, Zone => Zone.Beacons)
  Zones: Zone[]

}
