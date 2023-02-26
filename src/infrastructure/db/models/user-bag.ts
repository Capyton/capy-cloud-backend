import { UUID } from "@src/utils/uuid";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Bag } from "./bag";
import { User } from "./user";

@Entity({ name: "users_bags" })
export class UserBag {
    @PrimaryColumn()
    id: UUID

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column("user_id")
    userId: UUID

    @OneToOne(() => Bag)
    @JoinColumn({ name: "bag_id" })
    bag: Bag

    @Column("bag_id")
    bagId: UUID
}
