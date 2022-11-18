import { FormMetaData } from '../FormMetaData/formmetadata.entity';
import { ReviewStatuses } from '../common/enums';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'pbgp_application',
})
export class Application extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'application_id' })
  id: string;

  @Column({ type: 'jsonb', nullable: true })
  // It's dynamic, so putting any here
  submission: any;

  @Column({ type: 'varchar', length: '300', nullable: false, unique: true })
  submissionId: string;

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

  @OneToOne(() => FormMetaData)
  @JoinColumn({ name: 'form_metadata_id' })
  form: FormMetaData;
}
