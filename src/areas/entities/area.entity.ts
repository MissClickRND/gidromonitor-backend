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
    @ApiProperty({ format: "uuid", readOnly: true })
    id!: string;

    @Column({
        type: "geometry",
        spatialFeatureType: "Polygon",
        srid: 4326,
    })
    @ApiProperty({ description: "GeoJSON Polygon geometry" })
    geometry!: object;

    @Column({
        type: "date",
    })
    @ApiProperty({ example: "2026-01-01", format: "date" })
    dateBefore!: string;

    @Column({
        type: "date",
    })
    @ApiProperty({ example: "2026-01-31", format: "date" })
    dateAfter!: string;

    @Column({
        type: "enum",
        enum: AreaStatus,
        default: AreaStatus.PROCESSING,
    })
    @ApiProperty({ enum: AreaStatus, example: AreaStatus.PROCESSING })
    status!: AreaStatus;

    @CreateDateColumn()
    @ApiProperty({ format: "date-time", readOnly: true })
    createdAt!: Date;

    @UpdateDateColumn()
    @ApiProperty({ format: "date-time", readOnly: true })
    updatedAt!: Date;
}
