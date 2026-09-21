import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Area } from "./entities/area.entity";
import { CreateAreaDto } from "./dto/create-area.dto";
import { AreaStatus } from "./enums/area-status.enum";

@Injectable()
export class AreasService {
    constructor(
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>,
    ) {}

    async create(createAreaDto: CreateAreaDto): Promise<Area> {
        if (createAreaDto.dateBefore >= createAreaDto.dateAfter) {
            throw new BadRequestException(
                "Начальная дата должна быть раньше конечной даты",
            );
        }

        const result = await this.areaRepository.query(
            `
        INSERT INTO areas (
            "name",
            "geometry",
            "dateBefore",
            "dateAfter",
            "status"
        )
        VALUES (
            $1,
            ST_Transform(
                ST_SetSRID(
                    ST_GeomFromGeoJSON($2),
                    4326
                ),
                32652
            ),
            $3,
            $4,
            $5
        )
        RETURNING *
        `,
            [
                createAreaDto.name,
                JSON.stringify(createAreaDto.geometry),
                createAreaDto.dateBefore,
                createAreaDto.dateAfter,
                AreaStatus.PROCESSING,
            ],
        );

        return result[0];
    }

    async findAll(): Promise<Area[]> {
        const { entities, raw } = await this.areaRepository
            .createQueryBuilder("area")
            .addSelect(
                `ST_AsGeoJSON(
                ST_Transform(area.geometry, 4326)
            )`,
                "geometry_4326",
            )
            .orderBy("area.createdAt", "DESC")
            .getRawAndEntities();

        return entities.map((area, index) => ({
            ...area,
            geometry: JSON.parse(raw[index].geometry_4326),
        }));
    }

    async findOne(id: string): Promise<Area> {
        const { entities, raw } = await this.areaRepository
            .createQueryBuilder("area")
            .addSelect(
                `ST_AsGeoJSON(
                ST_Transform(area.geometry, 4326)
            )`,
                "geometry_4326",
            )
            .where("area.id = :id", { id })
            .getRawAndEntities();

        if (!entities.length) {
            throw new NotFoundException("Территория не найдена");
        }

        return {
            ...entities[0],
            geometry: JSON.parse(raw[0].geometry_4326),
        };
    }
}
