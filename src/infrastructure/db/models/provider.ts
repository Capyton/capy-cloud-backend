import { UUID } from "@src/domain/common/types";
import { ProviderAddress } from "@src/domain/provider/types";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Bag } from "./bag";

@Entity({ name: "providers" })
export class Provider {
  @PrimaryColumn()
  id: UUID

  @Column()
  address: ProviderAddress

  @Column()
  maxContracts: number | null

  @Column()
  maxTotalSize: number | null

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date

  @ManyToMany(() => Bag, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinTable({ name: "providers_bags" })
  providerBags: Bag[]
}
