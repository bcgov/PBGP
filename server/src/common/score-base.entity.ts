import { ScoreDataDto } from '@/score/dto/score.dto';
import { Column } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

export class ScoreBaseEntity extends CustomBaseEntity {
  @Column({ type: 'jsonb', nullable: true })
  data: ScoreDataDto;

  @Column({ type: 'int', nullable: true })
  finalScore: number;

  @Column({ type: 'varchar', length: '2000', nullable: true })
  overallComments: string;
}
