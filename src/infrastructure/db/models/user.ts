import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Bag } from "./bag";

// @Entity({ name: "users" })
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletAddress: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registeredAt: Date;

  @ManyToMany(() => Bag)
  @JoinTable({ name: "users_bags" })
  bagId: Bag[];
}
