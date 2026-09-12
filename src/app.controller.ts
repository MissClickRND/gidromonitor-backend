import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@Controller()
@ApiTags("Система")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: "Проверить доступность API" })
    @ApiOkResponse({
        description: "API доступен",
        schema: { type: "string", example: "Гидромонитор API работает" },
    })
    getHello(): string {
        return this.appService.getHello();
    }
}
