import { BagId } from "@src/domain/bag/types";
import { UUID } from "@src/domain/common/types";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { File } from "./file";

@Entity({ name: "bags" })
export class Bag {
  @PrimaryColumn()
  id: UUID

  @Column({ name: "bag_id", unique: true, nullable: false })
  bagId: BagId

  @Column({ name: "description", nullable: true })
  description: string | null

  @Column({ name: "size", nullable: false })
  size: number

  @Column({ name: "is_uploaded", nullable: false })
  isUploaded: boolean

  @Column({ name: "created_at", nullable: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date

  @OneToMany(() => File, file => file.bag, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  bagFiles: File[]
}
