import { ReviewStatuses } from "../enums";

export declare class SaveApplicationDto {
  submission: any; // dynamic
  confirmationId: string;
  facilityName: string;
  assignedTo: string;
  status: ReviewStatuses;

}
