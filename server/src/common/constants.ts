export enum RESPONSE_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const SUCCESS_RESPONSE = {
  status: RESPONSE_STATUS.SUCCESS,
};

export enum REQUEST_METHODS {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export enum UserRoles {
  ADMIN = 'ADMIN',
}

export enum ApplicationType {
  LARGE_PROJECT = 'LP',
  SMALL_PROJECT = 'SP',
  ENVIRONMENT_PLANNING = 'EP',
  DEVELOPMENT_PLANNING = 'DP',
}
