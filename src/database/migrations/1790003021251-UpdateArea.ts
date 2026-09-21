import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateArea1790003021251 implements MigrationInterface {
    name = "UpdateArea1790003021251";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "areas"`);

        await queryRunner.query(`
        ALTER TABLE "areas"
        ADD "name" character varying NOT NULL
    `);

        await queryRunner.query(`
        ALTER TABLE "areas"
        DROP COLUMN "dateBefore"
    `);

        await queryRunner.query(`
        ALTER TABLE "areas"
        ADD "dateBefore" TIMESTAMP WITH TIME ZONE NOT NULL
    `);

        await queryRunner.query(`
        ALTER TABLE "areas"
        DROP COLUMN "dateAfter"
    `);

        await queryRunner.query(`
        ALTER TABLE "areas"
        ADD "dateAfter" TIMESTAMP WITH TIME ZONE NOT NULL
    `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "dateAfter"`);
        await queryRunner.query(
            `ALTER TABLE "areas" ADD "dateAfter" date NOT NULL`,
        );
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "dateBefore"`);
        await queryRunner.query(
            `ALTER TABLE "areas" ADD "dateBefore" date NOT NULL`,
        );
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "name"`);
    }
}
