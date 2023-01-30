import { ApplicationType } from '../../common/constants';
import { WorkshopScore } from '../../score/workshop-score.entity';
import { findApplicationType, ScoreFields } from '../constants';

type ScoreFieldsType = {
  name: string;
  label: string;
  criteria?: ApplicationType[];
  score: number;
};

export const ApplicationVsHeading = {};

ApplicationVsHeading[ApplicationType.DEVELOPMENT_PLANNING] = 'Facility Master Plan';
ApplicationVsHeading[ApplicationType.ENVIRONMENT_PLANNING] = 'Environmental Project';
ApplicationVsHeading[ApplicationType.LARGE_PROJECT] = 'Large Project';
ApplicationVsHeading[ApplicationType.SMALL_PROJECT] = 'Small Project';

export class ApplicationFinalScoreRO {
  confirmationId: string;

  applicantName: string;

  facilityName: string;

  projectTitle: string;

  totalCost: string;

  initialAsk: string;

  overallScore: string;

  points: string;

  comments: string;

  scoreData: any;

  fields: ScoreFieldsType[];

  applicationHeading: string;

  applicationType: ApplicationType;

  constructor(workshopScore: WorkshopScore) {
    const { application, finalScore, overallComments, data } = workshopScore;
    const { submission, form } = application;
    this.confirmationId = application.confirmationId;
    this.applicantName = submission.applicantName;
    this.facilityName = submission.facilityName;
    this.projectTitle = submission.projectTitle;
    this.totalCost = `${application.totalEstimatedCost?.split('.')[0]}.`;
    this.initialAsk = `${application.asks?.split('.')[0]}.`;
    this.overallScore = `${finalScore}`;
    this.comments = overallComments;
    this.points = `${(finalScore / 112).toFixed(3)}`;
    this.scoreData = {};
    Object.assign(this.scoreData, data);
    this.fields = ScoreFields;
    this.applicationType = findApplicationType(form.chefsFormId);
    this.applicationHeading = ApplicationVsHeading[this.applicationType];
  }
}
