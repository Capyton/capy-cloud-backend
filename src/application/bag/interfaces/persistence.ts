import { Bag } from "@src/domain/bag/entities"
import { UUID } from "@src/domain/common/types"


export interface BagRepo {
  acquireBagById(id: UUID): Promise<Bag>

  addBag(bag: Bag): Promise<void>
  updateBad(bag: Bag): Promise<void>
  deleteBagById(id: UUID): Promise<void>
}

export interface BagRepoReader {
  getBagById(id: UUID): Promise<Bag>
}
