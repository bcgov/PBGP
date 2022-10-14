import { User } from '@/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';
import {
  ContactInfo,
  GeneralProjectInfo,
  FacilityInfo,
  FundingEligibility,
  ClimateConsiderations,
  ProjectBenefits,
  ProjectFunding,
  SupportAndAuthorization,
} from './bcaap-application.interfaces';

@Entity()
export class BCAAPApplication extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true })
  priority: number;

  @Column({ type: 'jsonb', nullable: true })
  contactInfo: ContactInfo;

  @Column({ type: 'jsonb', nullable: true })
  generalProjectInfo: GeneralProjectInfo;

  @Column({ type: 'jsonb', nullable: true })
  facilityInfo: FacilityInfo;

  @Column({ type: 'jsonb', nullable: true })
  fundingEligibility: FundingEligibility;

  @Column({ type: 'jsonb', nullable: true })
  climateConsiderations: ClimateConsiderations;

  @Column({ type: 'jsonb', nullable: true })
  projectBenefits: ProjectBenefits;

  @Column({ type: 'jsonb', nullable: true })
  projectFunding: ProjectFunding;

  @Column({ type: 'jsonb', nullable: true })
  supportAndAuthorization: SupportAndAuthorization;

  @Column({ type: 'boolean', nullable: false })
  isSubmitted: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
