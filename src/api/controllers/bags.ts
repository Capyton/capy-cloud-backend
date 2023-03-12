import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger"
import { Controller, Get, Param } from "@nestjs/common"
import { GetBagByBagId, GetBagByBagIdHandler } from "@src/application/bag/queries/get-bag-by-bag-id"
import { GetUserBagsByUserId, GetUserBagsByUserIdHandler } from "@src/application/user_bag/queries/get-user-bags-by-user-id"
import {
    BagReader as ParamBagReader,
    UserBagReader as ParamUserBagReader,
    UserPayloadFromAuthToken,
} from "@src/api/param_decorators"

import { Bag } from "@src/application/bag/dto"
import { BagId } from "@src/domain/bag/types"
import { BagReader } from "@src/application/bag/interfaces"
import { UserBagReader } from "@src/application/user_bag/interfaces"
import { UserPayload } from "@src/application/auth/dto"

@Controller("bags")
export class BagController {
    /**
     * Get all bag ids of the user by user auth token
     * @returns Bag ids
     */
    @ApiOperation({ summary: "Get all bag ids of the user by user auth token" })
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: "Bag ids",
        schema: {
            type: "array",
            items: {
                type: "string",
                description: "Bag id",
                example: "bagId",
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: (
            "Unauthorized | " +
            "JWT token is expired | " +
            "Invalid JWT token | " +
            "Unknown JWT token error"
        ),
    })
    @Get("ids")
    getUserBagIds(
        @ParamUserBagReader() userBagReader: UserBagReader,
        @UserPayloadFromAuthToken() userPayload: UserPayload,
    ): Promise<BagId[]> {
        const userBagHandler = new GetUserBagsByUserIdHandler(userBagReader)
        const userBagIds = userBagHandler.execute(new GetUserBagsByUserId(userPayload.id))
            .then((userBags) => userBags.map((userBag) => userBag.bagId))

        return userBagIds
    }

    /**
     * Get a bag by bag id
     * @param bagId - Bag id of the bag
     * @returns Bag
     */
    @ApiOperation({ summary: "Get a bag by bag id" })
    @ApiParam({
        schema: {
            nullable: false,
            title: "Bag id",
            type: "string",
            description: "Bag id of the bag",
        },
        name: "bagId",
    })
    @ApiResponse({
        status: 200,
        description: "Bag",
        schema: {
            nullable: false,
            type: "object",
            properties: {
                id: {
                    nullable: false,
                    title: "Bag id",
                    type: "string",
                    format: "uuid",
                    description: "Bag id",
                },
                bagId: {
                    nullable: false,
                    title: "Bag bag id",
                    type: "string",
                    description: "Bag id",
                },
                description: {
                    nullable: true,
                    title: "Bag description",
                    type: "string",
                    description: "Bag description",
                },
                size: {
                    nullable: false,
                    title: "Bag total size",
                    type: "number",
                    description: "Bag size",
                },
                isUploaded: {
                    nullable: false,
                    title: "Is bag uploaded",
                    type: "boolean",
                    description: "Is bag uploaded",
                },
                createdAt: {
                    nullable: false,
                    title: "Bag created at",
                    type: "string",
                    format: "date-time",
                    description: "Bag created at",
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: "Bag bag id not found",
    })
    @Get(":bagId")
    getBag(
        @ParamBagReader() bagReader: BagReader,
        @Param("bagId") bagId: BagId,
    ): Promise<Bag> {
        const bagHandler = new GetBagByBagIdHandler(bagReader)
        const bag = bagHandler.execute(new GetBagByBagId(bagId))

        return bag
    }
}
