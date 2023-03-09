import { TonAddress } from "@src/domain/user/types"
import { UUID } from "@src/utils/uuid"

export class UserPayload {
  constructor(
    readonly id: UUID,
    readonly address: TonAddress,
  ) { }
}
