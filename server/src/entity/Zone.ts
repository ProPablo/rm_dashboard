import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Beacon } from "./Beacon";
import { ZoneMedia } from "./ZoneMedia";

export const editSchema = Joi.object({
  Name: Joi.string().alphanum().min(3).max(30),
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

  @Column()
  Description: string;

  @CreateDateColumn()
  CreatedAt: Date

  @UpdateDateColumn()
  UpdatedAt: Date

  @OneToMany(() => Artefact, Artefact => Artefact.Zone)
  Artefacts: Artefact[]

  @OneToMany(() => Beacon, Beacon => Beacon.Zone)
  Beacons: Beacon[]

  @OneToOne(() => ZoneMedia, ZoneMedia => ZoneMedia.Zone, { nullable: true })
  media: ZoneMedia;
}
