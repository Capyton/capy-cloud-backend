import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Controller, Get, Param } from "@nestjs/common"
import { GetBagByBagId, GetBagByBagIdHandler } from "@src/application/bag/queries/get-bag-by-bag-id"
import { GetFilesByBagId, GetFilesByBagIdHandler } from "@src/application/file/queries/get-files-by-bag-id"
import { GetUserBagsByUserId, GetUserBagsByUserIdHandler } from "@src/application/user_bag/queries/get-user-bags-by-user-id"
import {
    BagReader as ParamBagReader,
    UserBagReader as ParamUserBagReader,
    UserPayloadFromAuthToken,
} from "@src/api/param_decorators"

import { Bag } from "@src/application/bag/dto"
import { BagId } from "@src/domain/bag/types"
import { BagReader } from "@src/application/bag/interfaces"
import { File } from "@src/application/file/dto"
import { FileReader } from "@src/application/file/interfaces"
import { FileReader as ParamFileReader } from "@src/api/param_decorators"
import { UserBagReader } from "@src/application/user_bag/interfaces"
import { UserPayload } from "@src/application/auth/dto"

@ApiTags("Bags")
@Controller("bags")
export class BagController {
    @ApiOperation({ summary: "Get user bags ids by an auth token" })
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: "Bags ids",
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
    getUserBagsIds(
        @ParamUserBagReader() userBagReader: UserBagReader,
        @UserPayloadFromAuthToken() userPayload: UserPayload,
    ): Promise<BagId[]> {
        const userBagHandler = new GetUserBagsByUserIdHandler(userBagReader)
        const userBagsIds = userBagHandler.execute(new GetUserBagsByUserId(userPayload.id))
            .then((userBags) => userBags.map((userBag) => userBag.bagId))

        return userBagsIds
    }

    @ApiOperation({ summary: "Get a bag by a bag id" })
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
                    description: "Bag id in database",
                },
                bagId: {
                    nullable: false,
                    title: "Bag id",
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
        description: "Bag id not found",
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

    @ApiOperation({ summary: "Get bag files by bag id" })
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
        description: "Files",
        schema: {
            nullable: false,
            type: "array",
            items: {
                nullable: false,
                type: "object",
                properties: {
                    id: {
                        nullable: false,
                        type: "string",
                        format: "uuid",
                        description: "File id",
                    },
                    bagId: {
                        nullable: false,
                        type: "string",
                        format: "uuid",
                        description: "Bag id",
                    },
                    filename: {
                        nullable: false,
                        type: "string",
                        description: "Filename",
                    },
                    description: {
                        nullable: true,
                        type: "string",
                        description: "Description of the file",
                    },
                    pathDir: {
                        nullable: false,
                        type: "string",
                        description: "Path directory of the file in the bag",
                    },
                    size: {
                        nullable: false,
                        type: "number",
                        description: "Size of the file in bytes",
                    },
                    createdAt: {
                        nullable: false,
                        type: "string",
                        format: "date-time",
                        description: "Date of creation of the file",
                    },
                },
            },
        },
    })
    @Get(":bagId/files")
    getFilesByBagId(
        @ParamFileReader() fileReader: FileReader,
        @Param("bagId") bagId: BagId,
    ): Promise<File[]> {
        const filesHandler = new GetFilesByBagIdHandler(fileReader)
        const files = filesHandler.execute(new GetFilesByBagId(bagId))

        return files
    }
}
