import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeGeometryTo326521790006050523 implements MigrationInterface {
    name = "ChangeGeometryTo326521790006050523";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE "areas"
      ALTER COLUMN "geometry"
      TYPE geometry(Polygon, 32652)
      USING ST_Transform("geometry", 32652)
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE "areas"
      ALTER COLUMN "geometry"
      TYPE geometry(Polygon, 4326)
      USING ST_Transform("geometry", 4326)
    `);
    }
}
