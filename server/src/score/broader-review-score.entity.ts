import { Application } from '../application/application.entity';
import { ScoreBaseEntity } from '../common/score-base.entity';
import { User } from '../user/user.entity';
import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { CompletionStatus } from '../common/enums';

@Entity({
  name: 'pbgp_border_review_score',
})
export class BroaderReviewScore extends ScoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'border_review_score_id' })
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Application)
  @JoinColumn()
  application: Application;

  @Column({ type: 'varchar', length: 30, nullable: false, default: CompletionStatus.IN_PROGRESS })
  completionStatus: CompletionStatus;
}
