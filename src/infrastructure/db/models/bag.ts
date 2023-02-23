import { BagId } from "@src/domain/bag/types";
import { UUID } from "@src/domain/common/types";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { File } from "./file";

@Entity({ name: "bags" })
export class Bag {
  @PrimaryColumn()
  id: UUID

  @Column()
  bagId: BagId

  @OneToMany(() => File, file => file.bag, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  bagFiles: File[]
}
