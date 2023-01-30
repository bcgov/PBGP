import { ApplicationType } from '../common/constants';

export enum ApplicationStatus {
  INITIAL_REVIEW = 'INITIAL_REVIEW',
  DISCARD = 'DISCARD',
  FUNDING_REVIEW = 'FUNDING_REVIEW',
  BROADER_REVIEW = 'BROADER_REVIEW',
  WORKSHOP = 'WORKSHOP',
}

export const findApplicationType = (chefsFormId: string): ApplicationType => {
  switch (chefsFormId) {
    case process.env.DEVELOPMENT_PLANNING:
      return ApplicationType.DEVELOPMENT_PLANNING;

    case process.env.SMALL_PROJECT:
      return ApplicationType.SMALL_PROJECT;

    case process.env.ENVIRONMENT_PLANNING:
      return ApplicationType.ENVIRONMENT_PLANNING;

    default:
      return ApplicationType.LARGE_PROJECT;
  }
};

export const ScoreFields = [
  {
    name: 'projectTypeScore',
    label: 'Type of Project',
    score: 10,
  },
  {
    name: 'projectNeedScore',
    label: 'Need for project',
    score: 5,
  },
  {
    name: 'projectFundingScore',
    label: 'Need for funding',
    score: 5,
  },
  {
    name: 'pastBcaapFundingScore',
    label: 'Past BCAAP funding',
    score: 3,
  },
  {
    name: 'facilityMasterPlanScore',
    label: 'Project in Master Plan',
    criteria: [
      ApplicationType.LARGE_PROJECT,
      ApplicationType.SMALL_PROJECT,
      ApplicationType.ENVIRONMENT_PLANNING,
    ],
    score: 2,
  },
  {
    name: 'facilityUsageScore',
    label: 'Facility usage',
    score: 2,
  },
  {
    name: 'trafficDataScore',
    label: 'Traffic data',
    criteria: [ApplicationType.LARGE_PROJECT],
    score: 3,
  },
  {
    name: 'climatePerspectiveScore',
    label: 'Environmental / Climate Benefits',
    criteria: [ApplicationType.LARGE_PROJECT],
    score: 5,
  },
  {
    name: 'climateBestPracticesScore',
    label: 'Environmental / Climate Best Practices',
    criteria: [ApplicationType.LARGE_PROJECT],
    score: 5,
  },
  {
    name: 'environmentalRisksScore',
    label: 'Environmental Risk and Mitigation',
    criteria: [ApplicationType.LARGE_PROJECT, ApplicationType.SMALL_PROJECT],
    score: 5,
  },
  {
    name: 'environmentalInnovationScore',
    label: 'Environmental / Climate Innovation',
    criteria: [ApplicationType.LARGE_PROJECT, ApplicationType.SMALL_PROJECT],
    score: 5,
  },
  {
    name: 'projectDescriptionScore',
    label: 'Type of Environmental Project',
    criteria: [ApplicationType.ENVIRONMENT_PLANNING],
    score: 2,
  },
  {
    name: 'climateGoalsScore',
    label: 'Environmental / Climate Goals of Project',
    criteria: [ApplicationType.ENVIRONMENT_PLANNING],
    score: 5,
  },
  {
    name: 'organizationClimateGoalScore',
    label: 'Fit With Organization’s Broader Goals',
    criteria: [ApplicationType.ENVIRONMENT_PLANNING],
    score: 5,
  },
  {
    name: 'successMeasurementScore',
    label: 'Measuring Project Success',
    criteria: [ApplicationType.ENVIRONMENT_PLANNING],
    score: 5,
  },
  {
    name: 'safetyScore',
    label: 'Safety',
    criteria: [ApplicationType.LARGE_PROJECT],
    score: 15,
  },
  {
    name: 'medevacScore',
    label: 'Medevac / Wildfire Suppression',
    criteria: [ApplicationType.LARGE_PROJECT],
    score: 15,
  },
  {
    name: 'localBenefitsScore',
    label: 'Economic Benefits',
    criteria: [ApplicationType.LARGE_PROJECT],
    score: 10,
  },
  {
    name: 'longTermScore',
    label: 'Long Term Goals and Vision',
    criteria: [ApplicationType.LARGE_PROJECT],
    score: 5,
  },
  {
    name: 'communitySupportScore',
    label: 'Letters of Support',
    criteria: [ApplicationType.LARGE_PROJECT],
    score: 3,
  },
  {
    name: 'concernsScore',
    label: 'Concerns Raised / Addressed',
    criteria: [ApplicationType.LARGE_PROJECT],
    score: 5,
  },
  {
    name: 'contingencyPlanScore',
    label: 'Contingency Plan',
    score: 2,
  },
  {
    name: 'classBCostScore',
    label: 'Cost Estimates',
    score: 5,
  },
  {
    name: 'thirdPartyContributionScore',
    label: 'Applicant or third-party contributions',
    score: 2,
  },
];
