import { Application } from '../application/application.entity';
import { ScoreBaseEntity } from '../common/score-base.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'pbgp_score',
})
export class BroaderReviewScore extends ScoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'score_id' })
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @OneToOne(() => Application, (application) => application.id)
  @JoinColumn()
  application: Application;

  @Column({ type: 'uuid' })
  applicationId: string;
}
