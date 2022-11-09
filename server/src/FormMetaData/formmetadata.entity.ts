import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity()
export class FormMetaData extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '200', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: '2000', nullable: false, default: '' })
  description: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  active: boolean;

  @Column({ type: 'varchar', length: '100', nullable: false })
  chefsFormId: string;
}
