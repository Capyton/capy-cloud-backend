import { Bag } from "@src/domain/bag/entities"
import { Bag as BagDTO } from "@src/application/bag/dto/bag"
import { BagId } from "@src/domain/bag/types"
import { UUID } from "@src/utils/uuid"

export interface BagRepo {
    getBagById(id: UUID): Promise<Bag>
    addBag(bag: Bag): Promise<void>
    updateBad(bag: Bag): Promise<void>
    deleteBagById(id: UUID): Promise<void>
}

export interface BagReader {
    getBagById(id: UUID): Promise<BagDTO>
    getBagByBagId(bagId: BagId): Promise<BagDTO>
}
