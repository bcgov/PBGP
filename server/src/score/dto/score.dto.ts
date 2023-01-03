import { CompletionStatuses } from '../../common/enums';
import { WorkshopScoreStatus } from '../../common/enums';

import {
  IsEmpty,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ScoreDataDto {
  @IsNumber()
  @Max(10)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  projectTypeScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  projectNeedScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  projectFundingScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  pastBcaapFundingScore: number;

  @IsNumber()
  @IsIn([0, 2])
  @IsOptional()
  @IsEmpty()
  facilityMasterPlanScore: number;

  @IsNumber()
  @Max(2)
  @Min(1)
  @IsOptional()
  @IsEmpty()
  facilityUsageScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  trafficDataScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  climatePerspectiveScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  climateBestPracticesScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  environmentalRisksScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  environmentalInnovationScore: number;

  @IsNumber()
  @Max(2)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  projectDescriptionScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  climateGoalsScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  organizationClimateGoalScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  successMeasurementScore: number;

  @IsNumber()
  @Max(15)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  safetyScore: number;

  @IsNumber()
  @Max(15)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  medevacScore: number;

  @IsNumber()
  @Max(10)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  localBenefitsScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  longTermScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  communitySupportScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  concernsScore: number;

  @IsNumber()
  @IsIn([0, 2])
  @IsOptional()
  @IsEmpty()
  contingencyPlanScore: number;

  @IsNumber()
  @Max(5)
  @Min(1)
  @IsOptional()
  @IsEmpty()
  classBCostScore: number;

  @IsNumber()
  @Max(2)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  thirdPartyContributionScore: number;
}

export class ScoreDto {
  @IsOptional()
  data: ScoreDataDto;

  @IsString()
  @MaxLength(2000)
  @MinLength(0)
  @IsOptional()
  overallComments: string;

  @IsNumber()
  @IsOptional()
  @Max(112)
  @Min(0)
  finalScore: number;

  @IsEnum(CompletionStatuses)
  completionStatus: CompletionStatuses;
}

export class WorkshopScoreDto extends ScoreDto {
  @IsEnum(WorkshopScoreStatus)
  status: WorkshopScoreStatus;
}
