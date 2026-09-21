import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { AreaStatus } from "../enums/area-status.enum";

@Entity("areas")
export class Area {
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty({
        description: "Уникальный идентификатор территории",
        format: "uuid",
        readOnly: true,
    })
    id!: string;

    @Column()
    @ApiProperty({
        description: "Название территории",
        example: "Участок в Московской области",
    })
    name!: string;

    @Column({
        type: "geometry",
        spatialFeatureType: "Polygon",
        srid: 32652,
    })
    @ApiProperty({
        description: "Геометрия полигона GeoJSON",
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
    geometry!: object;

    @Column({ type: "timestamptz" })
    @ApiProperty({
        description: "Начало периода в формате ISO 8601 с часовым поясом",
        example: "2026-01-01T00:00:00.000Z",
        format: "date-time",
    })
    dateBefore!: string;

    @Column({ type: "timestamptz" })
    @ApiProperty({
        description: "Конец периода в формате ISO 8601 с часовым поясом",
        example: "2026-01-31T23:59:59.999Z",
        format: "date-time",
    })
    dateAfter!: string;

    @Column({
        type: "enum",
        enum: AreaStatus,
        default: AreaStatus.PROCESSING,
    })
    @ApiProperty({
        description: "Статус обработки территории",
        enum: AreaStatus,
        example: AreaStatus.PROCESSING,
    })
    status!: AreaStatus;

    @CreateDateColumn()
    @ApiProperty({
        description: "Дата создания",
        format: "date-time",
        readOnly: true,
    })
    createdAt!: Date;

    @UpdateDateColumn()
    @ApiProperty({
        description: "Дата последнего обновления",
        format: "date-time",
        readOnly: true,
    })
    updatedAt!: Date;
}
