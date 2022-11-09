export enum RESPONSE_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const SUCCESS_RESPONSE = {
  status: RESPONSE_STATUS.SUCCESS,
};

export enum Permissions {
  PERFORM = 'X',
  ASSIST = 'A',
  CONTINUED_EDUCATION = 'C(E)',
  LIMITS = 'L',
}

export enum CareActivityType {
  ASPECT_OF_PRACTICE = 'Aspect of Practice',
  TASK = 'Task',
  RESTRICTED_ACTIVITY = 'Restricted Activity',
}

export enum ClinicalType {
  CLINICAL = 'Clinical',
  SUPPORT = 'Clinical Support',
}

export enum ActivitiesActionType {
  GREEN_CHECK = 'X',
  YELLOW = 'A',
  YELLOW_EXCLAMATION = 'C(E)',
  YELLOW_CAUTION = 'L',
  RED = '',
  GREY = 'MIXED',
}

export enum REQUEST_METHODS {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

// CHEFS Stuff
export const CHEFS_FORM_IDS = ['4b19eee6-f42d-481f-8279-cbc28ab68cf0'];
export const CHEFS_BASE_URL = 'https://submit.digital.gov.bc.ca/app/api/v1';
