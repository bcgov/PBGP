export * from './keycloak.constants';

export * from '../pages/form-pages/contact-info';
export * from '../pages/form-pages/general-project-info';

export enum FormTitles {
  CONTACT_INFO = 'Contact Information',
  GENERAL_INFO = 'General Project Information and Description',
  FACILITY_INFO = 'Facility Information',
  FUNDING_ELIGIBILITY = 'Funding Eligibility',
  ENVIRONMENTAL_CONSIDERATION = 'Environmental / Climate Considerations',
  FUNDING_INFO = 'Funding and Project Cost Estimate Information',
  SUPPORT_DOCUMENTATION = 'Support Documentation and Checklist',
  AUTHORIZATION = 'Authorization',
}

export const PlanningSteps = [
  FormTitles.CONTACT_INFO,
  FormTitles.GENERAL_INFO,
  FormTitles.FACILITY_INFO,
  FormTitles.FUNDING_ELIGIBILITY,
  FormTitles.ENVIRONMENTAL_CONSIDERATION,
  FormTitles.FUNDING_INFO,
  FormTitles.SUPPORT_DOCUMENTATION,
  FormTitles.AUTHORIZATION,
];
