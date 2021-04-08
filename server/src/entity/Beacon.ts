import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Zone } from "./Zone";

export const editSchema = Joi.object({
  Name: Joi.string().alphanum().min(3).max(30),
  CoordX: Joi.number(),
  CoordY: Joi.number(),
  MACAddress: Joi.string().pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/),
  Activation: Joi.boolean(),
  zoneId: Joi.number(),
})

export const createSchema = editSchema.concat(Joi.object({
  Name: Joi.required(),
  MACAddress: Joi.required(),
}));

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
  Activation: boolean;

  @Column()
  CoordX: number;

  @Column()
  CoordY: number;

  @OneToMany(() => Artefact, Artefact => Artefact.Beacon)
  Artefacts: Artefact[]

  @Column({ nullable: true })
  zoneId: number;
  @ManyToOne(() => Zone, zone => zone.Beacons, {
    nullable: true
  })
  @JoinColumn({ name: "zoneId" })
  Zone: Zone;

}
