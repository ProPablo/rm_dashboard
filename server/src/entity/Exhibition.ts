import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  name: Joi.string().min(3).max(30),
  description: Joi.string(),
  thumbnail: Joi.binary(),
  organiser: Joi.string(),
  createdAt: Joi.date().strip(),
  updatedAt: Joi.date().strip(),
  startDate: Joi.date(),
  finishDate: Joi.date(),
  priceAdult: Joi.number(),
  priceConcession: Joi.number(),
  priceChild: Joi.number(),

})

export const createSchema = editSchema.concat(Joi.object({
  name: Joi.required(),
}));

export interface inputExhibition {
  name: string,
  description: string,
  organiser: string,
  priceAdult: number,
  priceConcession: number,
  priceChild: number,
}

@Entity()
export class Exhibition extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  organiser: string;

  @Column({ type: "double", default: "0.0" })
  priceAdult: number;

  @Column({ type: "double", default: "0.0" })
  priceConcession: number;

  @Column({ type: "double", default: "0.0" })
  priceChild: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  finishDate: Date;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'longblob',
    nullable: true
  })
  thumbnail: Buffer;
}
