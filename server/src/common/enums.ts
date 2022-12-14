export enum ReviewStatuses {
  INITIAL_REVIEW = 'Initial Review',
  FUNDING_REVIEW = 'Funding Review',
  BROADER_REVIEW = 'Broader Review',
  WORKSHOP = 'Workshop',
}

export enum OrderByOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ApplicationSortOptions {
  FACILITY_NAME = 'facilityName',
  CONFIRMATION_ID = 'confirmationId',
  ASSIGNED_TO = 'assignedTo',
  STATUS = 'status',
  SUBMISSION_ID = 'submissionId',
  UPDATED_AT = 'updatedAt',
}

export enum AxiosResponseTypes {
  BLOB = 'blob',
  ARRAY_BUFFER = 'arraybuffer',
  STREAM = 'stream',
}
