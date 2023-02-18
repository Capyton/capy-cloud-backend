import { UserRepo } from "@src/application/user/interfaces"
import { UUID } from "@src/domain/common/types"
import { User } from "@src/domain/user/entities"
import { TonAddress } from "@src/domain/user/types"

export class CreateUser {
  constructor(
    readonly id: UUID,
    readonly address: TonAddress,
  ) {}
}

export class CreateUserHandler {
  constructor(
    readonly userRepo: UserRepo,
  ) {}

  async execute(command: CreateUser): Promise<void> {
    const user = User.create(command.id, command.address)
    await this.userRepo.addUser(user)
  }
}
