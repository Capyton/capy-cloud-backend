import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity({ name: "files" })
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  description: string;

  @Column()
  size: number;

  @Column()
  isCached: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registeredAt: Date;
}
