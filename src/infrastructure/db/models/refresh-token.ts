/* eslint-disable indent */

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm"
import { UUID } from "@src/utils/uuid"
import { User } from "./user"

@Entity({ name: "refresh_tokens" })
export class RefreshToken {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: UUID

  @Column({ name: "token", unique: false, nullable: false })
  token: string

  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({ name: "user_id" })
  user: User

  @Column({ type: "uuid", name: "user_id" })
  userId: UUID

  @Column({ name: "expires_at", type: "timestamp", nullable: false })
  expiresAt: Date
}
