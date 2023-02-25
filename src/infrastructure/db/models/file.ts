import { UUID } from "@src/domain/common/types";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Bag } from "./bag";

@Entity({ name: "files" })
export class File {
  @PrimaryColumn()
  id: UUID

  @OneToOne(() => Bag)
  @JoinColumn({ name: "bag_id" })
  bag: Bag

  @Column("bag_id")
  bagId: UUID

  @Column({ name: "filename", nullable: false })
  filename: string

  @Column({ name: "description", nullable: true })
  description: string | null

  @Column({ name: "path_dir", nullable: false, default: "/" })
  pathDir: string

  @Column("size")
  size: number

  @Column({ name: "created_at", nullable: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date
}
