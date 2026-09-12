import { BadRequestException, Injectable } from "@nestjs/common";
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
                "dateBefore must be earlier than dateAfter",
            );
        }

        const area = this.areaRepository.create({
            geometry: createAreaDto.geometry,
            dateBefore: createAreaDto.dateBefore,
            dateAfter: createAreaDto.dateAfter,
            status: AreaStatus.PROCESSING,
        });

        return this.areaRepository.save(area);
    }
}
