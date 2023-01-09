import * as Yup from 'yup';

const minValidationText = 'Must be greater than or equal to ';
const maxValidationText = 'Must be less than or equal to ';

export const BROADER_REVIEW_VALIDATION_SCHEMA = Yup.object().shape({
  projectTypeScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(10, maxValidationText + '10'),
  projectNeedScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  projectFundingScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  pastBcaapFundingScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(3, maxValidationText + '3'),
  facilityMasterPlanScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(2, maxValidationText + '2'),
  facilityUsageScore: Yup.number()
    .min(1, minValidationText + '1')
    .max(2, maxValidationText + '2'),
  trafficDataScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(3, maxValidationText + '3'),
  climatePerspectiveScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  climateBestPracticesScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  environmentalRisksScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  environmentalInnovationScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  projectDescriptionScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(2, maxValidationText + '2'),
  climateGoalsScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  organizationClimateGoalScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  successMeasurementScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  safetyScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(15, maxValidationText + '15'),
  medevacScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(15, maxValidationText + '15'),
  localBenefitsScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(10, maxValidationText + '10'),
  longTermScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  communitySupportScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(3, maxValidationText + '3'),
  concernsScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5'),
  contingencyPlanScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '2'),
  classBCostScore: Yup.number()
    .min(1, minValidationText + '1')
    .max(5, maxValidationText + '5'),
  thirdPartyContributionScore: Yup.number()
    .min(1, minValidationText + '1')
    .max(2, maxValidationText + '2'),
});
