import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";

import { AreasService } from "./areas.service";
import { CreateAreaDto } from "./dto/create-area.dto";
import { Area } from "./entities/area.entity";

@Controller("areas")
@ApiTags("Территории")
export class AreasController {
    constructor(private readonly areasService: AreasService) {}

    @Post()
    @ApiOperation({ summary: "Создать территорию для обработки" })
    @ApiCreatedResponse({ type: Area })
    @ApiBadRequestResponse({
        description: "Некорректные даты или тело запроса",
    })
    create(@Body() createAreaDto: CreateAreaDto) {
        return this.areasService.create(createAreaDto);
    }

    @Get()
    @ApiOperation({ summary: "Получить список территорий" })
    @ApiOkResponse({ type: Area, isArray: true })
    findAll() {
        return this.areasService.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "Получить территорию по id" })
    @ApiParam({
        name: "id",
        description: "Уникальный идентификатор территории",
        format: "uuid",
    })
    @ApiOkResponse({ type: Area })
    @ApiNotFoundResponse({ description: "Территория не найдена" })
    findOne(@Param("id") id: string) {
        return this.areasService.findOne(id);
    }
}
