import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Zone } from "./Zone";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  createdAt: Joi.date().strip(),
  updatedAt: Joi.date().strip(),
  name: Joi.string().min(3).max(30),
  coordX: Joi.number(),
  coordY: Joi.number(),
  macAddress: Joi.string().pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/).message("Invalid MAC Address, e.g. D4:A9:53:AA:9A:76"),
  activation: Joi.boolean().default(false),
  zoneId: Joi.number().allow(null),
  visits: Joi.number(),
})

export const createSchema = editSchema.concat(Joi.object({
  name: Joi.required(),
  macAddress: Joi.required(),
  visits: Joi.forbidden(),
}));



@Entity()
export class Beacon extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column( {nullable: true} )
  name: string;

  @Column({ default: () => "0" })
  visits: number;

  @Column()
  macAddress: string;

  @Column( {default: false} )
  activation: boolean;

  @Column( {type: "double", default: "0.0"} )
  coordX: number;

  @Column( {type: "double", default: "0.0"} )
  coordY: number;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  zoneId: number;
  @ManyToOne(() => Zone, zone => zone.Beacons, {
    nullable: true
  })
  @JoinColumn({ name: "zoneId" })
  Zone: Zone;

}
