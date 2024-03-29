/* eslint-disable indent */

import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"

import { Bag } from "./bag"
import { Provider } from "./provider"
import { UUID } from "@src/utils/uuid"

@Entity({ name: "providers_bags" })
export class ProviderBag {
    @PrimaryColumn({ type: "uuid", name: "id" })
    id: UUID

    @OneToOne(() => Provider)
    @JoinColumn({ name: "provider_id" })
    provider: Provider

    @Column({ type: "uuid", name: "provider_id" })
    providerId: UUID

    @OneToOne(() => Bag)
    @JoinColumn({ name: "bag_id" })
    bag: Bag

    @Column({ type: "uuid", name: "bag_id" })
    bagId: UUID
}
