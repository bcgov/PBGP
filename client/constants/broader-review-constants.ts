import { ReviewCompletionStatus } from './constants';
import { ApplicationType } from './enums';

const evaluationObj1 = [
  { value: 'Airside', text: 'Airside / core aviation infrastructure' },
  { value: 'Transitional', text: 'Transitional infrastructure' },
  { value: 'Groundside', text: 'Groundside / ancillary infrastructure' },
  { value: 'Climate', text: 'Climate / environmental project' },
  { value: 'Facility', text: 'Facility master plan' },
  { value: 'GPS', text: 'GPS approach' },
];

const evaluationObj2 = [
  { value: 'yes', text: 'Yes' },
  { value: 'no', text: 'No' },
  { value: 'N/A', text: 'N/A' },
];

const evaluationObj3 = [
  { value: 'EergyRetrofitting', text: 'Energy retrofitting to low / zero carbon fuels' },
  { value: 'EquipmentElectrification', text: 'Equipment electrification' },
  { value: 'Baselining', text: 'Greenhouse gas audit (baselining) ' },
  { value: 'Mitigation', text: 'Mitigation' },
  { value: 'Operational', text: 'Operational' },
  { value: 'PilotingInnovativeTechnologies', text: 'Piloting innovative technologies' },
  { value: 'Other', text: 'Other' },
];

export const EvaluationBoardData = [
  {
    obj: evaluationObj1,
    label: 'What type of project is being applied for?',
    description:
      'Refer `Project Scope` and `Type of Project` in General Project Information and Description section',
    name: 'projectTypeScore',
    tooltiptext:
      'Score 8-10 for airside safety, GPS approach, climate or facility master plan. Score 6-7 for airside other. Score 4-5 for transitional. Score 0-3 for groundside or ancillary. The scores range is based on the type of project, while the score within the range is a relative priority based on an assessment of the project scope.',
  },
  {
    name: 'projectNeedScore',
    label: 'Need for project?',
    description: 'Refer `Project Rationale` in General Project Information and Description section',
    tooltiptext:
      'Score 4-5 if critical to maintain services or if project is required by Transport Canada. Score 2-3 if project deemed important. Score 0-1 if project is intended to expand services.',
  },
  {
    name: 'projectFundingScore',
    label: 'Need for funding?',
    description: 'Refer `Project Rationale` in General Project Information and Description section',
    tooltiptext:
      'Score 4-5 if project cannot proceed without BCAAP funding. Score 2-3 if BCAAP funding will expedite the project. Score 0-1 if BCAAP funding is minimally important to whether the project proceeds.',
  },
  {
    name: 'pastBcaapFundingScore',
    label: 'Past BCAAP funding?',
    description: 'BCAAP staff to evaluate this line',
    tooltiptext:
      'Score 0 if BCAAP funded project still underway at facility. Score 1, 2 or 3, respectively, if a BCAAP project was approved at facility 2, 3 or 4 (or more) years ago.',
  },
  {
    name: 'facilityMasterPlanScore',
    label: 'Is this project identified in your facility master plan?',
    description: 'BCAAP staff to evaluate this line',
    tooltiptext: 'Score 2 if “yes”, score 0 if “no” or “NA”.',
    obj: evaluationObj2,
    criteria: [
      ApplicationType.LARGE_PROJECT,
      ApplicationType.SMALL_PROJECT,
      ApplicationType.ENVIRONMENT_PLANNING,
    ],
  },
  {
    name: 'facilityUsageScore',
    label: 'Facility usage?',
    description: '',
    tooltiptext:
      'Score 2 if application checks 3 or more of the facility usage boxes. Score 1 is fewer than 3 are checked.',
    obj: null,
  },
  {
    name: 'trafficDataScore',
    label: 'Traffic data? ',
    description: '',
    tooltiptext:
      'Score 0 to 3, respectively, if the applicant provides 0 years of data, 1 year of date, 2 years of date, or 3 or more years of ',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT],
  },
  {
    name: 'climatePerspectiveScore',
    label: 'Outline the benefits of the project from an environmental and/or climate perspective.',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project will result in significant environmental benefit. Score 2-3 if modest benefit. Score 0-1 if minimal benefit.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT],
  },
  {
    name: 'climateBestPracticesScore',
    label:
      'How are best practices from an environmental and/or climate perspective incorporated into the design and construction of this project?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project incorporates significant environmental best practices into design and construction. Score 2-3 if modest incorporation. Score 0-1 if minimal incorporation.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT],
  },
  {
    name: 'environmentalRisksScore',
    label:
      'Have any specific environmentally related risks been identified with this project and, if yes, what is your planning for addressed these risks?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates minimal environmental risk to project. Score 2-3 if modest risk. Score 0-1 if high risk.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT, ApplicationType.SMALL_PROJECT],
  },
  {
    name: 'environmentalInnovationScore',
    label:
      'Is any type of innovation from an environmental and/or climate perspective being incorporated into this project?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project incorporates significant innovation. Score 2-3 if modest innovation. Score 0-1 if minimal innovation.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT, ApplicationType.SMALL_PROJECT],
  },
  {
    name: 'projectDescriptionScore',
    label: 'Which of the following best describes your project?',
    description: '',
    tooltiptext:
      'Score 2 if checked or if “other” is checked and project inserted is aligned with program goals, 1 if environmental but not fully aligned with program goals, or 0 if not.',
    obj: evaluationObj3,
    criteria: [ApplicationType.ENVIRONMENT_PLANNING],
  },
  {
    name: 'climateGoalsScore',
    label:
      'What are the environmental and/or climate goals of your project? How will this project result in sustainable environmental / climate benefits moving forward?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project will result in significant environmental benefit. Score 2-3 if modest benefit. Score 0-1 if minimal benefit.',
    obj: null,
    criteria: [ApplicationType.ENVIRONMENT_PLANNING],
  },
  {
    name: 'organizationClimateGoalScore',
    label:
      'How does this project fit with your organization’s broader environmental and/or climate goals? Is this project part of a broader strategy? Please provide details.',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project is part of a significant broader environmental strategy. Score 2-3 if modest; score 0-1 if minimal.',
    obj: null,
    criteria: [ApplicationType.ENVIRONMENT_PLANNING],
  },
  {
    name: 'successMeasurementScore',
    label: 'How will this project be assessed to determine success? How will success be measured?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project includes significant measurable assessment metrics. Score 2-3 if modest; score 0-1 if minimal.',
    obj: null,
    criteria: [ApplicationType.ENVIRONMENT_PLANNING],
  },
  {
    name: 'safetyScore',
    label: 'How will this project improve safety?',
    description: '',
    tooltiptext:
      'Score 11-15 if applicant demonstrates that the project will bring significant safety benefits. Score 6-10 for modest safety benefits. Score 0-5 for minimal safety benefits.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT],
  },
  {
    name: 'medevacScore',
    label: 'How will the project benefit medevac and/or wildfire suppression? ',
    description: '',
    tooltiptext:
      'Score 11-15 if applicant demonstrates and BCEHS, BCWS or EMBC confirms, that the project will bring significant medevac or wildfire benefits. Score 6-10 for modest benefits. Score 0-5 for minimal benefits.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT],
  },
  {
    name: 'localBenefitsScore',
    label:
      'How will this project provide local, regional and/or provincial economic benefits, including how this project may support your facility in recovery from the impacts of COVID-19?',
    description: '',
    tooltiptext:
      'Score 8-10 if applicant demonstrates and JERI or TACS confirms, that the project will bring significant economic benefits. Score 4-7 for modest benefits. Score 0-3 for minimal benefits.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT],
  },
  {
    name: 'longTermScore',
    label:
      'How will the project advance the long-term goals and visions for the facility and community?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that the project is fully consistent with community vision. Score 2-3 for modest consistency, score 0-1 for limited consistency.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT],
  },
  {
    name: 'communitySupportScore',
    label: 'Community support.',
    description: '',
    tooltiptext:
      'Score 1 point if there is a letter of support from the local chamber of commerce or business association. Score an additional 2 points if there are at least 3 letters of support or an additional 1 point if there are at least 2 letters of support.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT],
  },
  {
    name: 'concernsScore',
    label:
      'Have any concerns or issues with respect to this project been raised by facility users or by members of the surrounding community? What are those concerns or issues? What plans, if any, do you have to addresses these concerns or issues?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant can demonstrate that there are no local concerns or, if there are concerns, that there are appropriate mitigations in place. Score 0-3 if applicant does not detail any process for identifying or addressing concerns or if applicant identifies but fails to adequately address concerns.',
    obj: null,
    criteria: [ApplicationType.LARGE_PROJECT],
  },
  {
    name: 'contingencyPlanScore',
    label:
      'Do you have a contingency plan in place to ensure the project will be completed if costs increase?',
    description: '',
    tooltiptext: 'Score 2 for “yes” and 0 for “no”',
    obj: null,
  },
  {
    name: 'classBCostScore',
    label: 'Class B Project Cost Estimates',
    description: '',
    tooltiptext:
      'Score 5 (high) to 1 (low) based on assessor’s confidence with the project cost estimate provided. Estimates must be Class B or better, but elements to review include the use of broad contingencies or the application of multiple layers of contingencies. Engineering Branch may provide some insight to this line for high-cost projects.',
    obj: null,
  },
  {
    name: 'thirdPartyContributionScore',
    label: 'Applicant or third-party contributions',
    description: '',
    tooltiptext:
      'Score 1 point for the presence of third-party contributions. Score 1 point if the ask of BCAAP is less than the eligible ask of BCAAP.',
    obj: null,
  },
];

export const INITIAL_BROADER_REVIEW_VALUES = {
  projectTypeScore: '',
  projectNeedScore: '',
  projectFundingScore: '',
  pastBcaapFundingScore: '',
  facilityMasterPlanScore: '',
  facilityUsageScore: '',
  trafficDataScore: '',
  climatePerspectiveScore: '',
  climateBestPracticesScore: '',
  environmentalRisksScore: '',
  environmentalInnovationScore: '',
  projectDescriptionScore: '',
  climateGoalsScore: '',
  organizationClimateGoalScore: '',
  successMeasurementScore: '',
  safetyScore: '',
  medevacScore: '',
  localBenefitsScore: '',
  longTermScore: '',
  communitySupportScore: '',
  contingencyPlanScore: '',
  classBCostScore: '',
  concernsScore: '',
  thirdPartyContributionScore: '',
  completionStatus: ReviewCompletionStatus.IN_PROGRESS,
  finalScore: '',
  overallComments: '',
};
