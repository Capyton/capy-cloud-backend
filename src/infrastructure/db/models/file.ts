import { UUID } from "@src/utils/uuid";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Bag } from "./bag";

@Entity({ name: "files" })
export class File {
  @PrimaryColumn({ name: "id" })
  id: UUID

  @OneToOne(() => Bag)
  @JoinColumn({ name: "bag_id" })
  bag: Bag

  @Column({ name: "bag_id" })
  bagId: UUID

  @Column({ name: "filename", nullable: false })
  filename: string

  @Column({ type: String, name: "description", nullable: true })
  description: string | null

  @Column({ name: "path_dir", nullable: false, default: "/" })
  pathDir: string

  @Column({ name: "size" })
  size: number

  @Column({ name: "created_at", nullable: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date
}
