import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTables1674494729855 implements MigrationInterface {
  name = 'UpdateTables1674494729855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "app_pbgp"."pbgp_workshop_score" ("db_create_timestamp" TIMESTAMP NOT NULL DEFAULT now(), "db_last_update_timestamp" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "data" jsonb, "final_score" integer, "overall_comments" character varying(2000), "border_workshop_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "completion_status" character varying(30) NOT NULL DEFAULT 'IN_PROGRESS', "user_id" uuid, "application_id" uuid, CONSTRAINT "REL_90089ed08ab0e10aeb92c84078" UNIQUE ("application_id"), CONSTRAINT "PK_4f5dfce4a1ce8d7000233ee53a3" PRIMARY KEY ("border_workshop_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "app_pbgp"."pbgp_workshop_score" ADD CONSTRAINT "FK_dc4b4a0fd53b0aa23a7757fdbd3" FOREIGN KEY ("user_id") REFERENCES "app_pbgp"."pbgp_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "app_pbgp"."pbgp_workshop_score" ADD CONSTRAINT "FK_90089ed08ab0e10aeb92c840786" FOREIGN KEY ("application_id") REFERENCES "app_pbgp"."pbgp_application"("application_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_pbgp"."pbgp_workshop_score" DROP CONSTRAINT "FK_90089ed08ab0e10aeb92c840786"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_pbgp"."pbgp_workshop_score" DROP CONSTRAINT "FK_dc4b4a0fd53b0aa23a7757fdbd3"`
    );
    await queryRunner.query(`DROP TABLE "app_pbgp"."pbgp_workshop_score"`);
  }
}
