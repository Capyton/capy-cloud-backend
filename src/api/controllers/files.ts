import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Controller, Get, Param } from "@nestjs/common"
import { GetFilesByBagId, GetFilesByBagIdHandler } from "@src/application/file/queries/get-files-by-bag-id"

import { BagId } from "@src/domain/bag/types"
import { File } from "@src/application/file/dto"
import { FileReader } from "@src/application/file/interfaces"
import { FileReader as ParamFileReader } from "@src/api/param_decorators"

@ApiTags("Files")
@Controller("files")
export class FileController {
    @ApiOperation({ summary: "Get files by bag id" })
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
    @Get(":bagId")
    getFilesByBagId(
        @ParamFileReader() fileReader: FileReader,
        @Param("bagId") bagId: BagId,
    ): Promise<File[]> {
        const filesHandler = new GetFilesByBagIdHandler(fileReader)
        const files = filesHandler.execute(new GetFilesByBagId(bagId))

        return files
    }
}
