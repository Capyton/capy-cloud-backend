import { UUID } from "@src/utils/uuid";
import { TonAddress } from "@src/domain/user/types";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Bag } from "./bag";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn()
  id: UUID

  @Column({ name: "address", unique: true, nullable: false })
  address: TonAddress

  @Column({ name: "registered_at", nullable: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registeredAt: Date

  @ManyToMany(() => Bag, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinTable({ name: "users_bags" })
  userBags: Bag[]
}
