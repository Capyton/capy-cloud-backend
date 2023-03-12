import { UUID } from "@src/utils/uuid"
import { User } from "@src/application/user/dto"
import { UserReader } from "@src/application/user/interfaces/persistence"

export class GetUserById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetUserByIdHandler {
    constructor(
        readonly userReader: UserReader,
    ) { }

    execute(command: GetUserById): Promise<User> {
        return this.userReader.getUserById(command.id)
    }
}
