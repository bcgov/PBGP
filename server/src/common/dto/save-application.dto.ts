import { ReviewStatuses } from '../enums';

export declare class SaveApplicationDto {
  submissionId: string;
  submission: any; // dynamic
  confirmationId: string;
  facilityName: string;
  projectTitle: string;
  totalEstimatedCost: number;
  asks: number;
  assignedTo: string;
  status: ReviewStatuses;
}
