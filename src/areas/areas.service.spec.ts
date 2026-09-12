import { Test, TestingModule } from '@nestjs/testing';
import { AreasService } from './areas.service';
import { Area } from './entities/area.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AreasService', () => {
  let service: AreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AreasService,
        {
          provide: getRepositoryToken(Area),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AreasService>(AreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
