import Joi, { number } from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Artefact } from "./Artefact"
import { Beacon } from "./Beacon";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  createdAt: Joi.date().strip(),
  updatedAt: Joi.date().strip(),
  name: Joi.string().min(3).max(30),
  coordX: Joi.number(),
  coordY: Joi.number(),
  width: Joi.number(),
  height: Joi.number(),
  description: [Joi.allow(null), Joi.string().min(3).max(30)],
  priority: Joi.number(),
})

export const createSchema = editSchema.concat(Joi.object({
  name: Joi.string().required().messages({
    'any.required': "Name field cannot be empty"
  }),
}));

@Entity()
export class Zone extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("longtext", { nullable: true })
  description: string;

  @Column( {type: "double", default: "0.0"} )
  coordX: number;

  @Column( {type: "double", default: "0.0"} )
  coordY: number;

  @Column( {type: "double", default: "30"} )
  width: number;

  @Column( {type: "double", default: "30"} )
  height: number;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ default: () => '-1' })
  priority: number;

  @OneToMany(() => Artefact, Artefact => Artefact.Zone)
  Artefacts: Artefact[]

  @OneToMany(() => Beacon, Beacon => Beacon.Zone)
  Beacons: Beacon[]

}
