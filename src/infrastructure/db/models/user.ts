/* eslint-disable indent */

import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm"

import { Bag } from "./bag"
import { RefreshToken } from "./refresh-token"
import { TonAddress } from "@src/domain/user/types"
import { UUID } from "@src/utils/uuid"

@Entity({ name: "users" })
export class User {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: UUID

  @Column({ name: "address", unique: true, nullable: false })
  address: TonAddress

  @Column({ name: "registered_at", nullable: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registeredAt: Date

  @ManyToMany(() => Bag, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinTable({ name: "users_bags" })
  userBags: Bag[]

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  refreshTokens: RefreshToken[]
}
