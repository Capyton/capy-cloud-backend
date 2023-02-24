import { UUID } from "@src/domain/common/types"
import { TonAddress } from "./types"


export class User {
  constructor(
    readonly id: UUID,
    readonly address: TonAddress,
    readonly registeredAt: Date,
  ) { }

  static create(id: UUID, address: TonAddress): User {
    return new User(id, address, new Date())
  }
}
