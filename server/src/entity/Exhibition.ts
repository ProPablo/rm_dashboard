import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  Name: Joi.string().min(3).max(30),
  Description: Joi.string(),
  Organiser: Joi.string(),
  CreatedAt: Joi.date().strip(),
  UpdatedAt: Joi.date().strip(),
  StartDate: Joi.date(),
  FinishDate: Joi.date(),
  PriceAdult: Joi.number(),
  PriceConcession: Joi.number(),
  PriceChild: Joi.number(),

})

export const createSchema = editSchema.concat(Joi.object({
  Name: Joi.required(),
}));

export interface inputExhibition {
  Name: string,
  Description: string,
  Organiser: string,
  PriceAdult: number,
  PriceConcession: number,
  PriceChild: number,
}

@Entity()
export class Exhibition extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column( {nullable: true} )
  Description: string;

  @Column( {nullable: true} )
  Organiser: string;

  @Column({ type: "double", default: "0.0" })
  PriceAdult: number;

  @Column({ type: "double", default: "0.0" })
  PriceConcession: number;

  @Column({ type: "double", default: "0.0"})
  PriceChild: number;

  @CreateDateColumn()
  StartDate: Date

  @UpdateDateColumn()
  FinishDate: Date;

  @CreateDateColumn()
  CreatedAt: Date

  @UpdateDateColumn()
  UpdatedAt: Date;

  @Column({
    type: 'longblob',
    nullable: true
  })
  Image: Buffer;
}
