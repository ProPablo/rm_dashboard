import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Zone } from './Zone';
import { Beacon } from './Beacon';

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  AcquisitionDate: Joi.date(),
  CreatedAt: Joi.date().strip(),
  UpdatedAt: Joi.date().strip(),
  Name: Joi.string().min(3).max(30),
  Description: Joi.string(),
  CoordX: Joi.number(),
  CoordY: Joi.number(),
  zoneId: Joi.number(), 
})

export const createSchema = editSchema.concat(Joi.object({
  Name: Joi.required(),
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
  Name: string;

  @Column()
  Description: string;

  @Column({
    type: 'longblob',
    nullable: true
  })
  Image: Buffer;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  AcquisitionDate: Date;

  @Column({ type: "double" })
  CoordX: number;

  @Column({ type: "double" })
  CoordY: number;

  @CreateDateColumn()
  CreatedAt: Date

  @UpdateDateColumn()
  UpdatedAt: Date;

  @Column({ nullable: true })
  zoneId: number;
  @ManyToOne(() => Zone, zone => zone.Artefacts, {
    nullable: true
  })
  @JoinColumn({ name: "zoneId" })
  Zone: Zone;



  //   @Column({ nullable: true })
  //   sourceId: number
  //   @ManyToOne(() => Source, source => source.referred, {
  //     nullable: true
  //   })
  //   @JoinColumn({ name: "sourceId" })
  //   source: Source
}
