import { User } from "@src/domain/user/entities";
import { TonAddress } from "@src/domain/user/types";


export interface UserRepo {
  getUserByAddress(address: TonAddress): Promise<User>
  addUser(user: User): Promise<void>
}
