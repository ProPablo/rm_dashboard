import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Zone } from './Zone';
import { Beacon } from './Beacon';



export const schema = Joi.object({
  Name: Joi.string().min(3).max(30).required(),
  Description: Joi.string(),
  Image: Joi.string().base64(),
  CoordX: Joi.number(),
  CoordY: Joi.number(),
  Activation: Joi.boolean().required(),
})

export interface inputArtefact {
  Name: string,
  Description: string,
  Image: string,
  CoordX: number,
  CoordY: number,
  Activation: boolean

}

@Entity()
export class Artefact extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column({ nullable: true })
  Image: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  AcquisitionDate: Date;

  @Column({ type: "double" })
  CoordX: number;

  @Column({ type: "double" })
  CoordY: number;

  @Column()
  Activation: boolean;

  @CreateDateColumn()
  CreatedAt: Date

  @UpdateDateColumn()
  UpdatedAt: Date;

  @ManyToOne(() => Zone, zone => zone.Artefacts)
  Zone: Zone;

  @ManyToOne(() => Beacon, beacon => beacon.Artefacts)
  Beacon: Beacon;



  //   @Column({ nullable: true })
  //   sourceId: number
  //   @ManyToOne(() => Source, source => source.referred, {
  //     nullable: true
  //   })
  //   @JoinColumn({ name: "sourceId" })
  //   source: Source
}
