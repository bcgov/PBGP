import { FormSteps } from './enums';

export const FormStepTitles: Record<keyof typeof FormSteps, string> = {
  [FormSteps.CONTACT_INFO]: 'Contact Information',
  [FormSteps.GENERAL_INFO]: 'General Project Information and Description',
  [FormSteps.FACILITY_INFO]: 'Facility Information',
  [FormSteps.FUNDING_ELIGIBILITY]: 'Funding Eligibility',
  [FormSteps.ENVIRONMENTAL_CONSIDERATION]: 'Environmental / Climate Considerations',
  [FormSteps.FUNDING_INFO]: 'Funding and Project Cost Estimate Information',
  [FormSteps.SUPPORT_DOCUMENTATION]: 'Support Documentation and Checklist',
  [FormSteps.AUTHORIZATION]: 'Authorization',
};
export const PlanningSteps = Object.values(FormStepTitles);

export const FacilityType = [
  { label: 'Airport', value: 'Airport' },
  { label: 'Water Aerodrome', value: 'Water Aerodrome' },
  { label: 'Heliport', value: 'Heliport' },
  { label: 'Other', value: 'Other' },
];

export const StatusPerTransport = [
  { label: 'Certified', value: 'Certified' },
  { label: 'Registered', value: 'Registered' },
  { label: 'N/A - please explain', value: 'N/A' },
];

export const FacilityUsage = [
  { label: 'Scheduled passenger services', value: 'Scheduled passenger services' },
  { label: 'Chartered passenger services', value: 'Chartered passenger services' },
  { label: 'Wildfire service', value: 'Wildfire service' },
  { label: 'General aviation', value: 'General aviation' },
  { label: 'Cargo services', value: 'Cargo services' },
  { label: 'Medevac', value: 'Medevac' },
  { label: 'Flight training', value: 'Flight training' },
  { label: 'Other (please explain)', value: 'Other (please explain)' },
];

export const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

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
    description: 'Project scope?',
    name: 'data.projectTypeScore',
    tooltiptext:
      'Score 8-10 for airside safety, GPS approach, climate or facility master plan; score 6-7 for airside other; score 4-5 for transitional; or score 0-3 for groundside or ancillary. The scores range is based on the type of project, while the score within the range is a relative priority based on an assessment of the project scope. The “response” column in the table will include only the response from the application instead of the complete list included above.',
  },
  {
    name: 'data.projectNeedScore',
    label: 'Need for project?',
    description: 'Drawn from Project Rationale',
    tooltiptext:
      'Score 4-5 if critical to maintain services or if project is required by Transport Canada; score 2-3 if project deemed important; score 0-1 if project is intended to expand services.',
  },
  {
    name: 'data.projectFundingScore',
    label: 'Need for funding?',
    description: 'Drawn from Project Rationale',
    tooltiptext:
      'Score 4-5 if project cannot proceed without BCAAP funding; score 2-3 if BCAAP funding will expedite the project; score 0-1 if BCAAP funding is minimally important to whether the project proceeds.',
  },
  {
    name: 'data.pastBcaapFundingScore',
    label: 'Past BCAAP funding?',
    description: 'BCAAP staff to evaluate this line',
    tooltiptext:
      'Score 0 if BCAAP funded project still underway at facility; score 1, 2 or 3, respectively, if a BCAAP project was approved at facility 2, 3 or 4 (or more) years ago.',
  },
  {
    name: 'data.facilityMasterPlanScore',
    label: 'Is this project identified in your facility master plan?',
    description: 'BCAAP staff to evaluate this line',
    tooltiptext: 'Score 2 if “yes”, score 0 if “no” or “NA”.',
    obj: evaluationObj2,
  },
  {
    name: 'data.facilityUsageScore',
    label: 'Facility usage?',
    description: '',
    tooltiptext:
      'Score 2 if application checks 3 or more of the facility usage boxes; score 1 is fewer than 3 are checked.',
    obj: null,
  },
  {
    name: 'data.trafficDataScore',
    label: 'Traffic data? ',
    description: '',
    tooltiptext:
      'Score 0 to 3, respectively, if the applicant provides 0 years of data, 1 year of date, 2 years of date, or 3 or more years of data.',
    obj: null,
  },
  {
    name: 'data.climatePerspectiveScore',
    label: 'Outline the benefits of the project from an environmental and/or climate perspective.',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project will result in significant environmental benefit; score 2-3 if modest benefit; score 0-1 if minimal benefit.',
    obj: null,
  },
  {
    name: 'data.climateBestPracticesScore',
    label:
      'How are best practices from an environmental and/or climate perspective incorporated into the design and construction of this project?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project incorporates significant environmental best practices into design and construction; score 2-3 if modest incorporation; score 0-1 if minimal incorporation.',
    obj: null,
  },
  {
    name: 'data.environmentalRisksScore',
    label:
      'Have any specific environmentally related risks been identified with this project and, if yes, what is your planning for addressed these risks?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates minimal environmental risk to project; score 2-3 if modest risk; score 0-1 if high risk.',
    obj: null,
  },
  {
    name: 'data.environmentalInnovationScore',
    label:
      'Is any type of innovation from an environmental and/or climate perspective being incorporated into this project?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project incorporates significant innovation; score 2-3 if modest innovation; score 0-1 if minimal innovation.',
    obj: null,
  },
  {
    name: 'data.projectDescriptionScore',
    label: 'Which of the following best describes your project?',
    description: '',
    tooltiptext:
      'Score 2 if checked or if “other” is checked and project inserted is aligned with program goals, 1 if environmental but not fully aligned with program goals, or 0 if not.',
    obj: evaluationObj3,
  },
  {
    name: 'data.climateGoalsScore',
    label:
      'What are the environmental and/or climate goals of your project? How will this project result in sustainable environmental / climate benefits moving forward?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project will result in significant environmental benefit; score 2-3 if modest benefit; score 0-1 if minimal benefit.',
    obj: null,
  },
  {
    name: 'data.organizationClimateGoalScore',
    label:
      'How does this project fit with your organization’s broader environmental and/or climate goals? Is this project part of a broader strategy? Please provide details.',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project is part of a significant broader environmental strategy; score 2-3 if modest; score 0-1 if minimal.',
    obj: null,
  },
  {
    name: 'data.successMeasurementScore',
    label: 'How will this project be assessed to determine success? How will success be measured?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that project includes significant measurable assessment metrics; score 2-3 if modest; score 0-1 if minimal.',
    obj: null,
  },
  {
    name: 'data.safetyScore',
    label: 'How will this project improve safety?',
    description: '',
    tooltiptext:
      'Score 11-15 if applicant demonstrates that the project will bring significant safety benefits; score 6-10 for modest safety benefits; score 0-5 for minimal safety benefits.',
    obj: null,
  },
  {
    name: 'data.medevacScore',
    label: 'How will the project benefit medevac and/or wildfire suppression? ',
    description: '',
    tooltiptext:
      'Score 11-15 if applicant demonstrates and BCEHS, BCWS or EMBC confirms, that the project will bring significant medevac or wildfire benefits; score 6-10 for modest benefits; score 0-5 for minimal benefits.',
    obj: null,
  },
  {
    name: 'data.localBenefitsScore',
    label:
      'How will this project provide local, regional and/or provincial economic benefits, including how this project may support your facility in recovery from the impacts of COVID-19?',
    description: '',
    tooltiptext:
      'Score 8-10 if applicant demonstrates and JERI or TACS confirms, that the project will bring significant economic benefits; score 4-7 for modest benefits; score 0-3 for minimal benefits.',
    obj: null,
  },
  {
    name: 'data.longTermScore',
    label:
      'How will the project advance the long-term goals and visions for the facility and community?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant demonstrates that the project is fully consistent with community vision; score 2-3 for modest consistency, score 0-1 for limited consistency.',
    obj: null,
  },
  {
    name: 'data.communitySupportScore',
    label: 'Community support.',
    description: '',
    tooltiptext:
      'Score 1 point if there is a letter of support from the local chamber of commerce or business association. Score an additional 2 points if there are at least 3 letters of support or an additional 1 point if there are at least 2 letters of support.',
    obj: null,
  },
  {
    name: 'data.concernsScore',
    label:
      'Have any concerns or issues with respect to this project been raised by facility users or by members of the surrounding community? What are those concerns or issues? What plans, if any, do you have to addresses these concerns or issues?',
    description: '',
    tooltiptext:
      'Score 4-5 if applicant can demonstrate that there are no local concerns or, if there are concerns, that there are appropriate mitigations in place. Score 0-3 if applicant does not detail any process for identifying or addressing concerns or if applicant identifies but fails to adequately address concerns.',
    obj: null,
  },
  {
    name: 'data.contingencyPlanScore',
    label:
      'Do you have a contingency plan in place to ensure the project will be completed if costs increase?',
    description: '',
    tooltiptext: 'Score 2 for “yes” and 0 for “no”',
    obj: null,
  },
  {
    name: 'data.classBCostScore',
    label: 'Class B Project Cost Estimates',
    description: '',
    tooltiptext:
      'Score 1 point for the presence of third-party contributions. Score 1 point if the ask of BCAAP is less than the eligible ask of BCAAP.',
    obj: null,
  },
];

export const defaultBroadReviewValues = {
  projectTypeScore: 0,
  projectNeedScore: 0,
  projectFundingScore: 0,
  pastBcaapFundingScore: 0,
  facilityMasterPlanScore: 0,
  facilityUsageScore: 0,
  trafficDataScore: 0,
  climatePerspectiveScore: 0,
  climateBestPracticesScore: 0,
  environmentalRisksScore: 0,
  environmentalInnovationScore: 0,
  projectDescriptionScore: 0,
  climateGoalsScore: 0,
  organizationClimateGoalScore: 0,
  successMeasurementScore: 0,
  safetyScore: 0,
  medevacScore: 0,
  localBenefitsScore: 0,
  longTermScore: 0,
  communitySupportScore: 0,
  contingencyPlanScore: 0,
  classBCostScore: 0,
  concernsScore: 0,
};

export enum NextStatusUpdates {
  PROCEED = 'Proceed to Next Step',
  DISCARD = 'Discard',
}
