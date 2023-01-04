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
  getApplicationScores: (applicationId: string) => `/applications/${applicationId}/scores`,
  updateApplicationScores:  (applicationId: string, scoreId: string) => `/applications/${applicationId}/scores/${scoreId}`,
  getApplicationAttachments: (id: string) => `attachments/${id}`,
  getApplicationScores: (applicationId: string) => `/applications/${applicationId}/scores`,
  updateApplicationScores:  (applicationId: string, scoreId: string) => `/applications/${applicationId}/scores/${scoreId}`,
};
