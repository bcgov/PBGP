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
  getApplicationAttachments: (id: string) => `attachments/${id}`,
  getBroaderScores: (applicationId: string) => `/applications/${applicationId}/broader`,
  updateBroaderScores: (applicationId: string, scoreId: string) =>
    `/applications/${applicationId}/broader/${scoreId}`,
  getWorkshopScores: (applicationId: string) => `/applications/${applicationId}/workshop`,
  updateWorksopScores: (applicationId: string, scoreId: string) =>
    `/applications/${applicationId}/workshop/${scoreId}`,
  downloadApplicationScore: (applicationId: string) => `/applications/${applicationId}/download`,
  APPLICATIONS_RAW_DATA: '/applications/raw-data',
};
