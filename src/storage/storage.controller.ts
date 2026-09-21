import { Controller, Get, Param } from "@nestjs/common";
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";
import { StorageService } from "./storage.service";

@Controller("storage")
@ApiTags("Хранилище")
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Get("files")
    getFiles() {
        return this.storageService.listFiles();
    }

    @Get("analysis/:analysisId")
    @ApiOperation({ summary: "Получить файлы анализа" })
    @ApiParam({
        name: "analysisId",
        description: "Id анализа",
        example: "e431b706-e394-433a-a003-caa1ab484038",
    })
    @ApiOkResponse({
        description:
            "Список файлов анализа с временными ссылками на скачивание",
        schema: {
            type: "object",
            properties: {
                analysisId: {
                    type: "string",
                    example: "e431b706-e394-433a-a003-caa1ab484038",
                },
                files: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            fileName: {
                                type: "string",
                                nullable: true,
                                example: "result.tif",
                            },
                            size: {
                                type: "number",
                                nullable: true,
                                example: 204800,
                            },
                            url: {
                                type: "string",
                                format: "uri",
                                example:
                                    "https://storage.example.com/result.tif?signature=...",
                            },
                        },
                    },
                },
            },
        },
    })
    @ApiNotFoundResponse({ description: "Файлы для анализа не найдены" })
    async getAnalysisFiles(@Param("analysisId") analysisId: string) {
        const files = await this.storageService.getAnalysisFiles(analysisId);

        return {
            analysisId,
            files,
        };
    }
}
