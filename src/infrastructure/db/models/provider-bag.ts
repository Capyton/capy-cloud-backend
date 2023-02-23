import { UUID } from "@src/domain/common/types";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Bag } from "./bag";
import { Provider } from "./provider";

@Entity({ name: "providers_bags" })
export class ProviderBag {
    @PrimaryColumn()
    id: UUID

    @OneToOne(() => Provider)
    @JoinColumn({ name: "provider_id" })
    provider: Provider

    @Column("provider_id")
    providerId: UUID

    @OneToOne(() => Bag)
    @JoinColumn({ name: "bag_id" })
    bag: Bag

    @Column("bag_id")
    bagId: UUID
}
