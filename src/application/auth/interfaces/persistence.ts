import { User } from "@src/domain/user/entities";


export interface UserRepo {
  addUser(user: User): Promise<void>
}
