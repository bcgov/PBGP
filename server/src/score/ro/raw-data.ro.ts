import { findApplicationType } from '../../application/constants';
import { ApplicationVsDetailsInfo } from '../../application/ro/application-score.ro';
import { WorkshopScore } from '../workshop-score.entity';

const roHeaders = {
  sheet: 'Raw Data',
  columns: [
    { label: 'Facility Name ', value: 'facilityName' },
    { label: 'Project', value: 'projectTitle' },
    { label: 'Estimated Project Cost', value: 'totalEstimatedCost' },
    { label: 'Raw Ask', value: 'asks' },
    { label: 'Overall Score', value: 'finalScore' },
    { label: 'Score Ratio', value: 'scoreRatio' },
  ],
};

export interface RawData {
  sheet: string;
  columns: { label: string; value: string }[];

  content: {
    facilityName: string;
    projectTitle: string;
    totalEstimatedCost: string;
    asks: string;
    finalScore: number;
    scoreRatio: string;
  }[];
}

export class RawDataRo {
  result: RawData[];
  constructor(data: WorkshopScore[]) {
    this.result = [{ ...roHeaders, ...this.convertWorkshopScoreToContent(data) }];
  }
  convertWorkshopScoreToContent(data: WorkshopScore[]) {
    const content = data.map((item: WorkshopScore) => {
      const applicationType = findApplicationType(item.application.form.chefsFormId);

      return {
        facilityName: item.application.submission.facilityName,
        projectTitle: item.application.submission.projectTitle,
        totalEstimatedCost: item.application.totalEstimatedCost,
        asks: item.application.asks,
        finalScore: item.finalScore,
        scoreRatio: `${(
          item.finalScore / ApplicationVsDetailsInfo[applicationType].totalScore
        ).toFixed(3)}`,
      };
    });
    return { content };
  }
}
