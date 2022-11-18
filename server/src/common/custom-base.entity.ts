import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CustomBaseEntity {
  @CreateDateColumn({ name: 'db_create_timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'db_last_update_timestamp' })
  updatedAt: Date;
}
