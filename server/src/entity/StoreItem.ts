import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  name: Joi.string().min(3).max(30),
  description: Joi.string().allow(null),
  thumbnail: Joi.binary().allow(null),
  createdAt: Joi.date().strip(),
  updatedAt: Joi.date().strip(),
  cost: Joi.number(),
  inStock: Joi.boolean(),
})

export const createSchema = editSchema.concat(Joi.object({
  name: Joi.required(),
}));

@Entity()
export class StoreItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column( {nullable: true} )
  description: string;

  @Column( {type: "double", default: "0.0"} )
  cost: number;

  @Column( {default: false} )
  inStock: boolean;

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
