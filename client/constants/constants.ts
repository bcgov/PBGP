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
