import { Bag as BagDTO } from "@src/application/bag/dto/bag"
import { Bag } from "@src/domain/bag/entities"
import { UUID } from "@src/domain/common/types"


export interface BagRepo {
  acquireBagById(id: UUID): Promise<Bag>

  addBag(bag: Bag): Promise<void>
  updateBad(bag: Bag): Promise<void>
  deleteBagById(id: UUID): Promise<void>
}

export interface BagReader {
  getBagById(id: UUID): Promise<BagDTO>
}
