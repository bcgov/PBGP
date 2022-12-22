import { Application } from '../application/application.entity';
import { ScoreBaseEntity } from '../common/score-base.entity';
import { User } from '../user/user.entity';
import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

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
}
