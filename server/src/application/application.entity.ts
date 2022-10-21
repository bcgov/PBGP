import { SupportingDocument } from '@/supporting-document/supporting-document.entity';
import { User } from '@/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';
import {
  ContactInfo,
  GeneralProjectInfo,
  FacilityInfo,
  FundingEligibility,
  ClimateConsiderationsAirside,
  ClimateConsiderationsEnvironmental,
  ProjectBenefits,
  ProjectFunding,
  SupportAndAuthorization,
} from './application.interfaces';

@Entity()
export class Application extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: true })
  contactInfo: ContactInfo;

  @Column({ type: 'jsonb', nullable: true })
  generalProjectInfo: GeneralProjectInfo;

  @Column({ type: 'jsonb', nullable: true })
  facilityInfo: FacilityInfo;

  @Column({ type: 'jsonb', nullable: true })
  fundingEligibility: FundingEligibility;

  @Column({ type: 'jsonb', nullable: true })
  climateConsiderations: ClimateConsiderationsAirside | ClimateConsiderationsEnvironmental;

  @Column({ type: 'jsonb', nullable: true })
  projectBenefits: ProjectBenefits;

  @Column({ type: 'jsonb', nullable: true })
  projectFunding: ProjectFunding;

  @Column({ type: 'jsonb', nullable: true })
  supportAndAuthorization: SupportAndAuthorization;

  @Column({ type: 'boolean', nullable: false, default: false })
  isSubmitted: boolean;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @OneToMany(() => SupportingDocument, (supportingDocument) => supportingDocument.application)
  supportingDocuments: SupportingDocument[];
}
