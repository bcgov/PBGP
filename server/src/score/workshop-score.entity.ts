import { Application } from '../application/application.entity';
import { ScoreBaseEntity } from '../common/score-base.entity';
import { User } from '../user/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'pbgp_workshop_score',
})
export class WorkshopScore extends ScoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'border_review_score_id' })
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Application, (application) => application.id)
  @JoinColumn()
  application: Application;
}
