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

export enum CompletionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}

export enum SyncTypes {
  ALL = 'ALL',
  SUBMISSIONS = 'SUBMISSIONS',
  ATTACHMENTS = 'ATTACHMENTS',
  SOFT_DELETE = 'SOFT_DELETE',
}
