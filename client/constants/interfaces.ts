export interface ContactInfoInterface {
  facilityName: string;
  applicantName: string;
  primaryContactName: string;
  phoneNumber: string;
  mailingAddress: string;
  mailingAddressPostalCode: string;
  isOneApplication: string;
  priority: string;
}

export interface GeneralInfoInterface {
  estimatedCost: string;
  projectType: string;
  facilityMasterPlan: string;
  standardCompliance: string;
  standardComplianceExplanation: string;
  estimatedStartDate: string;
  estimatedEndDate: string;
  projectTitle: string;
  projectScope: string;
  projectRationale: string;
}

export interface FundingEligibilityInterface {
  communityServed: string;
  communityServedExplanation: string;
  facilityHas: string;
  projectAppliedFor: string;
  additionalFunding: string;
}

export interface EnvironmentalInfoInterface {
    benefitsForEnvironment: string;
    bestPracticesForDesign: string;
    identifyRiskForEnvironment: string;
    innovationForProjectEnvironment: string;
}