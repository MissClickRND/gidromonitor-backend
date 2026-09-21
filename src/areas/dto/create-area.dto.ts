import { IsDateString, IsObject, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAreaDto {
    @IsString()
    @ApiProperty({
        description: "Название территории",
        example: "Участок в Московской области",
    })
    name!: string;

    @IsObject()
    @ApiProperty({
        description: "Геометрия полигона GeoJSON в координатах WGS 84",
        type: "object",
        additionalProperties: true,
        example: {
            type: "Polygon",
            coordinates: [
                [
                    [37.6, 55.7],
                    [37.7, 55.7],
                    [37.7, 55.8],
                    [37.6, 55.7],
                ],
            ],
        },
    })
    geometry!: {
        type: "Polygon";
        coordinates: number[][][];
    };

    @IsDateString()
    @ApiProperty({
        description: "Начало периода в формате ISO 8601 с часовым поясом",
        example: "2026-01-01T00:00:00.000Z",
        format: "date-time",
    })
    dateBefore!: string;

    @IsDateString()
    @ApiProperty({
        description: "Конец периода в формате ISO 8601 с часовым поясом",
        example: "2026-01-31T23:59:59.999Z",
        format: "date-time",
    })
    dateAfter!: string;
}
