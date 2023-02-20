import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Bag } from "./bag";

// @Entity({ name: "providers" })
@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: number;

  @Column()
  maxContracts: number;

  @Column()
  maxTotalSize: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToMany(() => Bag)
  @JoinTable({ name: "providers_bags" })
  bagId: Bag[];
}
