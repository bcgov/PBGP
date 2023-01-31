import { WorkshopScore } from '../workshop-score.entity';

const roHeaders = {
  sheet: 'Raw Data',
  columns: [
    { label: 'Facility Name ', value: 'facilityName' },
    { label: 'Project', value: 'projectTitle' },
    { label: 'Estimated Project Cost', value: 'totalEstimatedCost' },
    { label: 'Raw Ask', value: 'asks' },
    { label: 'Overall Score', value: 'finalScore' },
    { label: 'Score Ratio', value: 'scoreRatio' }, // Score ÷ Points Available (possible rename to “Ratio”)
  ],
};

export class RawDataRo {
  result: any;
  constructor(data: WorkshopScore[]) {
    this.result = [{ ...roHeaders, ...this.convertWorkshopScoreToContent(data) }];
  }
  convertWorkshopScoreToContent(data: WorkshopScore[]) {
    const content = data.map((item) => {
      return {
        facilityName: item.application.facilityName,
        projectTitle: item.application.projectTitle,
        totalEstimatedCost: item.application.totalEstimatedCost,
        asks: item.application.asks,
        finalScore: item.finalScore,
        scoreRatio: 0, // Implement ratio calculation here later
      };
    });
    return { content };
  }
}
