import { genSalt, hash } from "bcrypt";
import Joi from "joi";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Zone } from "./Zone";

export enum MediaType {
  image,
  video,
}

// export const schema = Joi.object({

// });

@Entity()
export class ZoneMedia extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  src: string;

  @Column()
  title: string;

  @Column({
    type: "enum",
    enum: MediaType,
    default: MediaType.video
  })
  type: MediaType;

  @CreateDateColumn()
  CreatedAt: Date

  @UpdateDateColumn()
  UpdatedAt: Date;

  @Column()
  zoneId: number;
  @OneToOne(() => Zone, Zone => Zone.media)
  @JoinColumn({ name: "zoneId" })
  Zone: Zone;

}
