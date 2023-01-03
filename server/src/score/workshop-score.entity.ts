import { Application } from '../application/application.entity';
import { ScoreBaseEntity } from '../common/score-base.entity';
import { User } from '../user/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, Column } from 'typeorm';
import { WorkshopScoreStatus } from '../common/enums';

@Entity({
  name: 'pbgp_workshop_score',
})
export class WorkshopScore extends ScoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'border_workshop_id' })
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 30,
    default: WorkshopScoreStatus.IN_PROGRESS,
  })
  status: WorkshopScoreStatus;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Application, (application) => application.id)
  @JoinColumn()
  application: Application;
}
