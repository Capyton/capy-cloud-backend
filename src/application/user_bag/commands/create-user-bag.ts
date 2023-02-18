import { UserBagRepo } from "@src/application/user_bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { UserBag } from "@src/domain/user_bag/entities"

export class CreateUserBag {
  constructor(
    readonly id: UUID,
    readonly userId: UUID,
    readonly bagId: UUID,
  ) { }
}

export class CreateUserBagHandler {
  constructor(
    readonly userBagRepo: UserBagRepo,
  ) { }

  async execute(command: CreateUserBag): Promise<void> {
    const userBag = UserBag.create(
      command.id, command.userId, command.bagId
    )
    await this.userBagRepo.addUserBag(userBag)
  }
}
