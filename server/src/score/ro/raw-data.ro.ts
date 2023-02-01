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

export class RawDataRo {
  result: any;
  constructor(data: WorkshopScore[]) {
    this.result = [{ ...roHeaders, ...this.convertWorkshopScoreToContent(data) }];
  }
  convertWorkshopScoreToContent(data: WorkshopScore[]) {
    const content = data.map((item: WorkshopScore) => {
      return {
        facilityName: item.application.submission.facilityName,
        projectTitle: item.application.submission.projectTitle,
        totalEstimatedCost: item.application.totalEstimatedCost,
        asks: item.application.asks,
        finalScore: item.finalScore,
        scoreRatio: `${(item.finalScore / 112).toFixed(3)}`,
      };
    });
    return { content };
  }
}
