import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Zone } from "./Zone";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  CreatedAt: Joi.date().strip(),
  UpdatedAt: Joi.date().strip(),
  Name: Joi.string().min(3).max(30),
  CoordX: Joi.number(),
  CoordY: Joi.number(),
  MACAddress: Joi.string().pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/),
  Activation: Joi.boolean().default(false),
  zoneId: Joi.number(),
  Visits: Joi.number(),
})

export const createSchema = editSchema.concat(Joi.object({
  Name: Joi.required(),
  MACAddress: Joi.required(),
  Visits: Joi.forbidden(),
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

  @Column({ nullable: true })
  zoneId: number;
  @ManyToOne(() => Zone, zone => zone.Beacons, {
    nullable: true
  })
  @JoinColumn({ name: "zoneId" })
  Zone: Zone;

}
