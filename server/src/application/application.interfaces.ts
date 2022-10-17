export interface ContactInfo {
  facilityName: string;
  mailingAddress: string;
  contactEmail: string;
  applicantName: string;
  primaryContactName: string;
  phoneNumber: string;
  applicationPriority: string;
}

export interface GeneralProjectInfo {
  estimatedCost: string;
  projectType: string;
  facilityMasterPlan: string;
  facilityMasterPlanExplanation: string;
  standardCompliance: string;
  standardComplianceExplanation: string;
  estimatedStartDate: string;
  estimatedEndDate: string;
  projectTitle: string;
  projectScope: string;
  projectRationale: string;
}

export interface FacilityInfo {
  facilityType: string;
  status: string;
  eligibleForACAP: string;
  madeForACAP: string;
  facilityUsage: [string];
  passengerVolumes: string;
  cargoTonnes: string;
  aircraftMovements: string;
}

export interface FundingEligibility {
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

export interface ClimateConsiderationsAirside {
  projectBenefits: string;
  bestPractices: string;
  environmentRisks: string;
  innovations: string;
}

export interface ClimateConsiderationsEnvironmental {
  environmentalProjectDescription: string;
  environmentalGoals: string;
  projectStrategy: string;
  successAssessment: string;
}

export interface ProjectBenefits {
  safetyImprovement: string;
  medevacBenefits: string;
  localEconomicBenefits: string;
  longTermGoals: string;
  issuesConcerns: string;
}

export interface ProjectFunding {
  contingencyPlan: string;
  contingencyPlanExplanation: string;
  totalEstimatedCost: string;
  potentialBCAAPShare: string;
  thirdPartyContributions: string;
  applicantShare: string;
  totalRequest: string;
}

export interface SupportAndAuthorization {
  communitySupport: string;
  docList: [string];
  projectManagerSignature: string;
  financialOfficerSignature: string;
}
