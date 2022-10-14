import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity()
export class BCAAPApplication extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
