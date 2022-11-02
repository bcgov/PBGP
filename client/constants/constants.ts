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

export const APIUrl = process.env.NEXT_PUBLIC_API_URL || `http://localhost:8080/api/v1`;
