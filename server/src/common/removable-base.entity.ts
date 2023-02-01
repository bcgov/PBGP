import { DeleteDateColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';

export class RemovableBaseEntity extends CustomBaseEntity {
  @DeleteDateColumn()
  deletedAt?: Date;
}
