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
