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
} from '../../application/application.interfaces';

export declare class SaveApplicationDto {
  contactInfo: ContactInfo;
  generalProjectInfo: GeneralProjectInfo;
  facilityInfo: FacilityInfo;
  fundingEligibility: FundingEligibility;
  climateConsiderations: ClimateConsiderationsAirside | ClimateConsiderationsEnvironmental;
  projectBenefits: ProjectBenefits;
  projectFunding: ProjectFunding;
  supportAndAuthorization: SupportAndAuthorization;
  isSubmitted: boolean;
}
