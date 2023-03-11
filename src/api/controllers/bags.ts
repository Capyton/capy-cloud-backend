import { Controller, Get, Param } from "@nestjs/common"
import {
    BagReader as ParamBagReader,
    UserBagReader as ParamUserBagReader,
    UserPayloadFromAuthToken
} from "@src/api/param_decorators"
import { UserPayload } from "@src/application/auth/dto"
import { Bag } from "@src/application/bag/dto"
import { BagReader } from "@src/application/bag/interfaces"
import { GetBagByBagId, GetBagByBagIdHandler } from "@src/application/bag/queries/get-bag-by-bag-id"
import { UserBagReader } from "@src/application/user_bag/interfaces"
import { GetUserBagsByUserId, GetUserBagsByUserIdHandler } from "@src/application/user_bag/queries/get-user-bags-by-user-id"
import { BagId } from "@src/domain/bag/types"

@Controller("bags")
export class BagController {
    @Get("me")
    async getUserBags(
        @ParamUserBagReader() userBagReader: UserBagReader,
        @UserPayloadFromAuthToken() userPayload: UserPayload,
    ): Promise<BagId[]> {
        const userBagHandler = new GetUserBagsByUserIdHandler(userBagReader)
        const userBags = userBagHandler.execute(new GetUserBagsByUserId(userPayload.id))
            .then((userBags) => userBags.map((userBag) => userBag.bagId))

        return userBags
    }

    @Get("info/:bagId")
    getBag(
        @ParamBagReader() bagReader: BagReader,
        @Param("bagId") bagId: BagId,
    ): Promise<Bag> {
        const bagHandler = new GetBagByBagIdHandler(bagReader)
        const bag = bagHandler.execute(new GetBagByBagId(bagId))

        return bag
    }
}
