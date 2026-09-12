import { IsDateString, IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAreaDto {
    @IsObject()
    @ApiProperty({
        description: "GeoJSON Polygon geometry in WGS 84 coordinates",
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
    @ApiProperty({ example: "2026-01-01", format: "date" })
    dateBefore!: string;

    @IsDateString()
    @ApiProperty({ example: "2026-01-31", format: "date" })
    dateAfter!: string;
}
