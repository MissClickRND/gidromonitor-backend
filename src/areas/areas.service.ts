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

        const area = this.areaRepository.create({
            name: createAreaDto.name,
            geometry: createAreaDto.geometry,
            dateBefore: createAreaDto.dateBefore,
            dateAfter: createAreaDto.dateAfter,
            status: AreaStatus.PROCESSING,
        });

        return this.areaRepository.save(area);
    }

    async findAll(): Promise<Area[]> {
        return this.areaRepository.find({
            order: {
                createdAt: "DESC",
            },
        });
    }

    async findOne(id: string): Promise<Area> {
        const area = await this.areaRepository.findOne({
            where: { id },
        });

        if (!area) {
            throw new NotFoundException("Территория не найдена");
        }

        return area;
    }
}
