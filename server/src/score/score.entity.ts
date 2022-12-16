import { Application } from '@/application/application.entity';
import { User } from '@/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'pbgp_score',
})
export class Score extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'score_id' })
  id: string;

  @Column({ type: 'int', nullable: true })
  projectTypeScore: number;

  @Column({ type: 'int', nullable: true })
  projectNeedScore: number;

  @Column({ type: 'int', nullable: true })
  projectFundingScore: number;

  @Column({ type: 'int', nullable: true })
  pastBcaapFundingScore: number;

  @Column({ type: 'int', nullable: true })
  facilityMasterPlanScore: number;

  @Column({ type: 'int', nullable: true })
  facilityUsageScore: number;

  @Column({ type: 'int', nullable: true })
  trafficDataScore: number;

  @Column({ type: 'int', nullable: true })
  climatePerspectiveScore: number;

  @Column({ type: 'int', nullable: true })
  climateBestPracticesScore: number;

  @Column({ type: 'int', nullable: true })
  environmentalRisksScore: number;

  @Column({ type: 'int', nullable: true })
  environmentalInnovationScore: number;

  @Column({ type: 'int', nullable: true })
  projectDescriptionScore: number;

  @Column({ type: 'int', nullable: true })
  climateGoalsScore: number;

  @Column({ type: 'int', nullable: true })
  organizationClimateGoalScore: number;

  @Column({ type: 'int', nullable: true })
  successMeasurementScore: number;

  @Column({ type: 'int', nullable: true })
  safetyScore: number;

  @Column({ type: 'int', nullable: true })
  medevacScore: number;

  @Column({ type: 'int', nullable: true })
  localBenefitsScore: number;

  @Column({ type: 'int', nullable: true })
  longTermScore: number;

  @Column({ type: 'int', nullable: true })
  communitySupportScore: number;

  @Column({ type: 'int', nullable: true })
  concernsScore: number;

  @Column({ type: 'int', nullable: true })
  contingencyPlanScore: number;

  @Column({ type: 'int', nullable: true })
  classBCostScore: number;

  @Column({ type: 'int', nullable: true })
  thirdPartyContributionScore: number;

  @Column({ type: 'varchar', length: '2000', nullable: true })
  overallComments: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Application)
  @JoinColumn()
  application: User;
}
