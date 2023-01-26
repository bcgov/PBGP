import { Application } from '../application/application.entity';
import { ScoreDataDto } from '../score/dto/score.dto';
import { REQUEST_METHODS } from './constants';
import { CompletionStatuses } from './enums';

export interface AxiosOptions {
  method: REQUEST_METHODS;
  headers: any;
  url: string;
}

export interface BroaderReviewScoreInterface {
  createdAt: Date;
  updatedAt: Date;
  data: ScoreDataDto;
  finalScore: number;
  overallComments: string;
  id: string;
  completionStatus: CompletionStatuses;
  application: Application;
}
