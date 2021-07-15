import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Zone } from './Zone';
import { Beacon } from './Beacon';
import { ArtefactMedia } from "./ArtefactMedia";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  acquisitionDate: [Joi.allow("").strip(), Joi.date()], //Strip if empty string
  createdAt: Joi.date().strip(),
  updatedAt: Joi.date().strip(),
  name: Joi.string().min(3).max(30),
  thumbnail: Joi.binary().allow(null),
  description: Joi.string().allow(null),
  coordX: Joi.number(),
  coordY: Joi.number(),
  zoneId: Joi.number().allow(null),
  Media: Joi.any().strip(),
  priority: Joi.number(),
})

export const createSchema = editSchema.concat(Joi.object({
  name: Joi.string().required().messages({
    'any.required': "Name field cannot be empty"
  }),
}));

export interface inputArtefact {
  Name: string,
  Description: string,
  Image: string,
  CoordX: number,
  CoordY: number,
}

@Entity()
export class Artefact extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'longblob',
    nullable: true
  })
  thumbnail: Buffer;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  acquisitionDate: Date;

  @Column({ type: "double", default: "0.0" })
  coordX: number;

  @Column({ type: "double", default: "0.0" })
  coordY: number;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  zoneId: number;
  @ManyToOne(() => Zone, zone => zone.Artefacts, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "zoneId" })
  Zone: Zone;

  @Column({ default: () => '-1' })
  priority: number;

  @OneToOne(() => ArtefactMedia, ArtefactMedia => ArtefactMedia.Artefact, { nullable: true })
  Media: ArtefactMedia;

  // This doesnt create a column
  // MediaType: number;
}
