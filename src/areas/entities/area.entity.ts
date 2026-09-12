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

    @Column({
        type: "geometry",
        spatialFeatureType: "Polygon",
        srid: 4326,
    })
    @ApiProperty({ description: "Геометрия полигона GeoJSON" })
    geometry!: object;

    @Column({
        type: "date",
    })
    @ApiProperty({
        description: "Начальная дата периода",
        example: "2026-01-01",
        format: "date",
    })
    dateBefore!: string;

    @Column({
        type: "date",
    })
    @ApiProperty({
        description: "Конечная дата периода",
        example: "2026-01-31",
        format: "date",
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
