import { BagFile as BagFileDTO } from "@src/application/bag_file/dto/bag-file"
import { BagFile } from "@src/domain/bag_file/entities"
import { UUID } from "@src/domain/common/types"


export interface BagFileRepo {
  acquireBagFileById(id: UUID): Promise<BagFile>

  addBagFile(BagFile: BagFile): Promise<void>
  deleteBagFileById(id: UUID): Promise<void>
  deleteBagFilesByBagId(bagId: UUID): Promise<void>
}

export interface BagFileReader {
  getBagFileById(id: UUID): Promise<BagFileDTO>
  getBagFilesByBagId(bagId: UUID): Promise<BagFileDTO[]>
}
