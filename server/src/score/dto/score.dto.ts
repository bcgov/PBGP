import { CompletionStatuses } from '@/common/enums';
import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
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
  projectTypeScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  projectNeedScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  projectFundingScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  pastBcaapFundingScore: number;

  @IsNumber()
  @IsIn([0, 2])
  @IsOptional()
  facilityMasterPlanScore: number;

  @IsNumber()
  @Max(2)
  @Min(1)
  @IsOptional()
  facilityUsageScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  trafficDataScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  climatePerspectiveScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  climateBestPracticesScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  environmentalRisksScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  environmentalInnovationScore: number;

  @IsNumber()
  @Max(2)
  @Min(0)
  @IsOptional()
  projectDescriptionScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  climateGoalsScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  organizationClimateGoalScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  successMeasurementScore: number;

  @IsNumber()
  @Max(15)
  @Min(0)
  @IsOptional()
  safetyScore: number;

  @IsNumber()
  @Max(15)
  @Min(0)
  @IsOptional()
  medevacScore: number;

  @IsNumber()
  @Max(10)
  @Min(0)
  @IsOptional()
  localBenefitsScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  longTermScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  communitySupportScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  concernsScore: number;

  @IsNumber()
  @IsIn([0, 2])
  @IsOptional()
  contingencyPlanScore: number;

  @IsNumber()
  @Max(5)
  @Min(1)
  @IsOptional()
  classBCostScore: number;

  @IsNumber()
  @Max(2)
  @Min(0)
  @IsOptional()
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
  @IsOptional()
  completionStatus: CompletionStatuses;
}
