import { ProviderAddress } from "@src/domain/provider/types";
import { UUID } from "@src/utils/uuid";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Bag } from "./bag";

@Entity({ name: "providers" })
export class Provider {
  @PrimaryColumn({ name: "id" })
  id: UUID

  @Column({ name: "address", unique: true, nullable: false })
  address: ProviderAddress

  @Column({ type: Number, name: "max_contracts", nullable: true })
  maxContracts: number | null

  @Column({ type: Number, name: "max_total_size", nullable: true })
  maxTotalSize: number | null

  @Column({ name: "created_at", nullable: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date

  @ManyToMany(() => Bag, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinTable({ name: "providers_bags" })
  providerBags: Bag[]
}
