import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAreas1710000000000 implements MigrationInterface {
    name = "CreateAreas1710000000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "postgis"`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(
            `CREATE TYPE "public"."areas_status_enum" AS ENUM('processing', 'completed', 'failed')`,
        );
        await queryRunner.query(`
            CREATE TABLE "areas" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "geometry" geometry(Polygon,4326) NOT NULL,
                "dateBefore" date NOT NULL,
                "dateAfter" date NOT NULL,
                "status" "public"."areas_status_enum" NOT NULL DEFAULT 'processing',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_areas_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "areas"`);
        await queryRunner.query(`DROP TYPE "public"."areas_status_enum"`);
    }
}
