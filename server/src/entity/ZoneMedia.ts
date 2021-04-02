import { genSalt, hash } from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, OneToOne, JoinColumn } from "typeorm";
import { Zone } from "./Zone";

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

  @Column()
  ext: string;

  @Column()
  zoneId: number;
  @OneToOne(() => Zone, Zone => Zone.media)
  @JoinColumn({ name: "zoneId" })
  Zone: Zone;

}
