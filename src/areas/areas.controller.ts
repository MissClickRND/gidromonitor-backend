import { Body, Controller, Post } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";

import { AreasService } from "./areas.service";
import { CreateAreaDto } from "./dto/create-area.dto";
import { Area } from "./entities/area.entity";

@Controller("areas")
@ApiTags("areas")
export class AreasController {
    constructor(private readonly areasService: AreasService) {}

    @Post()
    @ApiOperation({ summary: "Create an area for processing" })
    @ApiCreatedResponse({ type: Area })
    @ApiBadRequestResponse({ description: "Invalid dates or request body" })
    create(@Body() createAreaDto: CreateAreaDto) {
        return this.areasService.create(createAreaDto);
    }
}
