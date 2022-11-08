import { BCAAPForm } from '@/BCAAPForm/bcaapform.entity';
import { ReviewStatuses } from '@/common/enums';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity()
export class Application extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: true })
  // It's dynamic, so putting any here
  submission: any;

  @Column({ type: 'varchar', length: '200', nullable: false })
  confirmationId: string;

  @Column({ type: 'varchar', length: '200', nullable: false })
  facilityName: string;

  @Column({ type: 'varchar', length: '100', nullable: true })
  assignedTo: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
    default: ReviewStatuses.INITIAL_REVIEW,
  })
  status: ReviewStatuses;

  @OneToOne(() => BCAAPForm)
  @JoinColumn()
  form: BCAAPForm;
}
