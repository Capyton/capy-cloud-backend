import { UUID } from "@src/utils/uuid"
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"
import { Bag } from "./bag"
import { Provider } from "./provider"

@Entity({ name: "providers_bags" })
export class ProviderBag {
    @PrimaryColumn({ name: "id " })
    id: UUID

    @OneToOne(() => Provider)
    @JoinColumn({ name: "provider_id" })
    provider: Provider

    @Column({ name: "provider_id" })
    providerId: UUID

    @OneToOne(() => Bag)
    @JoinColumn({ name: "bag_id" })
    bag: Bag

    @Column({ name: "bag_id" })
    bagId: UUID
}
