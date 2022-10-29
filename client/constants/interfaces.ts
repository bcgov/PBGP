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
  indigenousCommunityServed: string;
  indigenousCommunityServedExplanation: string;
  revenueStream: string;
  revenueStreamExplanation: string;
  greenhouseReductionPlan: string;
  greenhouseReductionPlanExplanation: string;
  activeTransportationSupported: string;
  activeTransportationSupportExplanation: string;
  requiredForMedevac: string;
  requiredForMedevacExplanation: string;
  requiredForWildfireSuppression: string;
  requiredForWildfireSuppressionExplanation: string;
  requiredForEmergency: string;
  requiredForEmergencyExplanation: string;
  requiredForExtraordinaryEvent: string;
  requiredForExtraordinaryEventExplanation: string;
  requiredToCorrectNonCompliance: string;
  requiredToCorrectNonComplianceExplanation: string;
  requiredForClimateChange: string;
  requiredForClimateChangeExplanation: string;
  BCAAPFunding: string;
  BCAAPFundingExplanation: string;
}

export interface EnvironmentalInfoInterface {
  environmentalProjectDescription: string;
  environmentalGoals: string;
  projectStrategy: string;
  successAssessment: string;
}

export interface FacilityInfoInterface {
  facilityType: string;
  status: string;
  eligibleForACAP: string;
  madeForACAP: string;
  facilityUsage: string;
  passengerVolumes: string;
  cargoTonnes: string;
  aircraftMovements: string;
}

export interface FundingProjectCostInfoInterface {
  contingencyPlan: string;
  contingencyPlanExplanation: string;
  totalEstimatedCost: string;
  potentialBCAAPShare: string;
  thirdPartyContributions: string;
  applicantShare: string;
  totalRequest: string;
}

export interface AuthorizationInterface {
  projectManagerSignature: string;
  financialOfficerSignature: string;
}
