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

  @Column("filename")
  filename: string

  @Column("description")
  description: string | null

  @Column("path_dir")
  pathDir: string

  @Column("size")
  size: number

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date
}
