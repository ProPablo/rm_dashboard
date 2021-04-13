import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";

export const editSchema = Joi.object({
  id: Joi.number().strip(),
  Name: Joi.string().min(3).max(30),
  Description: Joi.string(),
  Cost: Joi.number(),
  InStock: Joi.boolean(),

})

export const createSchema = editSchema.concat(Joi.object({
  Name: Joi.required(),
}));

export interface inputStoreItem {
  Name: string,
  Description: string,
  Cost: number,
  InStock: boolean,
  Image: string,
}

@Entity()
export class StoreItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column({type: "double"})
  Cost: number;

  @Column()
  InStock: boolean;

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
