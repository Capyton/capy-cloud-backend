import { User } from "@src/application/user/dto"
import { UserReader } from "@src/application/user/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class GetUserById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetUserByIdHandler {
    constructor(
        readonly userReader: UserReader,
    ) { }

    async execute(command: GetUserById): Promise<User> {
        return await this.userReader.getUserById(command.id)
    }
}
