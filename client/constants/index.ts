export * from './keycloak.constants';

export const PlanningSteps = [
  'Contact Information',
  'General Project Information and Description',
  'Facility Information',
  'Funding Eligibility',
  'Environmental / Climate Considerations',
  'Funding and Project Cost Estimate Information',
  'Support Documentation and Checklist',
  'Authorization',
];

export const FacilityType = [
    {label: 'Airport', value: 'Airport'},
    {label: 'Water Aerodrome', value: 'Water Aerodrome'},
    {label: 'Heliport', value: 'Heliport'},
    {label: 'Other', value: 'Other'},
];

export const StatusPerTransport = [
    {label: 'Certified', value: 'Certified'},
    {label: 'Registered', value: 'Registered'},
    {label: 'N/A - please explain', value: 'N/A'},
];