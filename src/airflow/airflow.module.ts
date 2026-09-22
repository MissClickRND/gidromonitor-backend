import { Module } from '@nestjs/common';
import { AirflowService } from './airflow.service';
import { AirflowController } from './airflow.controller';

@Module({
  providers: [AirflowService],
  controllers: [AirflowController],
  exports: [AirflowService]
})
export class AirflowModule {}
