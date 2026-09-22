import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { Area } from './entities/area.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirflowModule } from '../airflow/airflow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Area]), 
    AirflowModule,
  ],
  providers: [AreasService],
  controllers: [AreasController]
})
export class AreasModule {}
