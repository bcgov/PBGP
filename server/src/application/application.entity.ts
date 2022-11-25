import { FormMetaData } from '../FormMetaData/formmetadata.entity';
import { ReviewStatuses } from '../common/enums';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';
import { User } from '@/user/user.entity';
import { Comment } from '../comments/comment.entity';

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

  @Column({ type: 'varchar', length: '100', nullable: true })
  projectTitle: string;

  @Column({ type: 'money', nullable: true })
  totalEstimatedCost: number;

  @Column({ type: 'money', nullable: true })
  asks: number;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
    default: ReviewStatuses.INITIAL_REVIEW,
  })
  status: ReviewStatuses;

  @ManyToOne(() => FormMetaData, (form) => form.applications)
  form: FormMetaData;

  // Might belong to multiple users in the future, so
  // change to ManyToMany accordingly if needed.
  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.application)
  comments: Comment[];
}
