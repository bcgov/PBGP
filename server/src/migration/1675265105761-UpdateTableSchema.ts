import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableSchema1675265105761 implements MigrationInterface {
  name = 'UpdateTableSchema1675265105761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_pbgp"."pbgp_application" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_pbgp"."pbgp_application" DROP COLUMN "deleted_at"`);
  }
}
