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

export const FacilityUsage = [
    {label: 'Scheduled passenger services', value: 'Scheduled passenger services'},
    {label: 'Chartered passenger services', value: 'Chartered passenger services'},
    {label: 'Wildfire service', value: 'Wildfire service'},
    {label: 'General aviation', value: 'General aviation'},
    {label: 'Cargo services', value: 'Cargo services'},
    {label: 'Medevac', value: 'Medevac'},
    {label: 'Flight training', value: 'Flight training'},
    {label: 'Other (please explain)', value: 'Other (please explain)'},
    
];