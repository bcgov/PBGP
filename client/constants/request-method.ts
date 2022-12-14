export enum REQUEST_METHOD {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export const API_ENDPOINT = {
  VALIDATE_USER: '/validate',
  FETCH_USERS: '/users',
  updateUserAccess: (id: string) => `/users/${id}/access`,
  getApplicationComments: (applicationId: string) => `/applications/${applicationId}/comments`,
  APPLICATIONS: '/applications',
  getApplicationDetails: (applicationId: string) => `/applications/${applicationId}`,
  getApplicationStatus: (applicationId: string) => `/applications/${applicationId}/status`,
  getApplicationEvaluator: (applicationId: string) => `/applications/${applicationId}/assign`,
};
