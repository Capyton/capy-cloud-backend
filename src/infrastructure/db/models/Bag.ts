import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity({ name: "bags" })
@Entity()
export class Bag {
  //
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bagId: string;

  @Column()
  fileId: string;
}
git remote set-url origin https://OdysseusReturn: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@github.com/OdysseusReturn/Capyton/capy-cloud-backend.git