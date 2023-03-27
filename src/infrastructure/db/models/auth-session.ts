/* eslint-disable indent */

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { UUID } from "@src/utils/uuid"
import { User } from "./user"

@Entity({ name: "auth_sessions" })
export class AuthSession {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: UUID

  @ManyToOne(() => User, (user) => user.authSessions)
  @JoinColumn({ name: "user_id" })
  user: User

  @Column({ type: "uuid", name: "user_id" })
  userId: UUID

  @Column({ name: "refresh_token", unique: false, nullable: false })
  refreshToken: string

  @Column({ name: "expires_at", type: "timestamp", nullable: false })
  expiresAt: Date
}
