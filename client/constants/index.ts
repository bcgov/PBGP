export * from './keycloak.constants';
export * from '../pages/form-pages/contact-info';
export * from '../pages/form-pages/general-project-info';
export * from '../pages/form-pages/facility-info';
export * from '../pages/form-pages/funding-eligibility';
export * from '../pages/form-pages/environmental-info';
export * from './enums';
export * from './constants';

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
