import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Beacon } from "./Beacon";
import { ZoneMedia } from "./ZoneMedia";

export const schema = Joi.object({
  Name: Joi.string().alphanum().min(3).max(30).required(),
  Description: Joi.string().min(3).max(30).required(),
})

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
  createdAt: Date

  @UpdateDateColumn()
  UpdatedAt: Date

  @OneToMany(() => Artefact, Artefact => Artefact.Zone)
  Artefacts: Artefact[]

  @OneToMany(() => Beacon, Beacon => Beacon.Zones)
  Beacons: Beacon[]

  @OneToOne(() => ZoneMedia, ZoneMedia => ZoneMedia.Zone, { nullable: true })
  media: ZoneMedia;
}
