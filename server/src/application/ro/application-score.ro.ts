import { ApplicationType } from '../../common/constants';
import { WorkshopScore } from '../../score/workshop-score.entity';
import { findApplicationType, ScoreFields } from '../constants';

type ScoreFieldsType = {
  name: string;
  label: string;
  criteria?: ApplicationType[];
  score: number;
};

export const ApplicationVsDetailsInfo = {};

ApplicationVsDetailsInfo[ApplicationType.DEVELOPMENT_PLANNING] = {
  heading: 'Facility Master Plan',
  totalScore: 34,
};
ApplicationVsDetailsInfo[ApplicationType.ENVIRONMENT_PLANNING] = {
  heading: 'Environmental Project',
  totalScore: 53,
};
ApplicationVsDetailsInfo[ApplicationType.LARGE_PROJECT] = {
  heading: 'Large Project',
  totalScore: 112,
};
ApplicationVsDetailsInfo[ApplicationType.SMALL_PROJECT] = {
  heading: 'Small Project',
  totalScore: 46,
};

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
    this.scoreData = {};
    Object.assign(this.scoreData, data);
    this.fields = ScoreFields;
    this.applicationType = findApplicationType(form.chefsFormId);
    this.applicationHeading = ApplicationVsDetailsInfo[this.applicationType].heading;
    this.points = `${(
      finalScore / ApplicationVsDetailsInfo[this.applicationType].totalScore
    ).toFixed(3)}`;
  }
}
