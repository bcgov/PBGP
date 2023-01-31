import { BroaderReviewScoreInterface } from '../../common/interfaces';
import { BroaderReviewScore } from '../broader-review-score.entity';

export interface BroaderReviewScoreRo extends BroaderReviewScoreInterface {
  user: string;
  displayName: string;
}

export class BroaderReviewScoreResultRo {
  result: BroaderReviewScoreRo[];
  constructor(data: BroaderReviewScore[]) {
    this.result = data.map((score) => {
      return { ...score, user: score.user.id, displayName: score.user.displayName };
    });
  }
}
