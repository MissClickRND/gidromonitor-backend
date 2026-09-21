import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AreasModule } from './areas/areas.module';
import { join } from 'node:path';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.getOrThrow<string>('DB_HOST'),

        port: Number(configService.getOrThrow<string>('DB_PORT')),

        username: configService.getOrThrow<string>('DB_USERNAME'),

        password: configService.getOrThrow<string>('DB_PASSWORD'),

        database:
          configService.get<string>('DB_DATABASE') ??
          configService.getOrThrow<string>('DB_NAME'),

        autoLoadEntities: true,
        synchronize: false,
        migrations: [join(__dirname, 'database/migrations/*{.ts,.js}')],
        migrationsRun: true,
      }),
    }),

    AreasModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
