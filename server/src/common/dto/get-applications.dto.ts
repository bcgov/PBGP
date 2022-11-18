import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { OrderByOptions, ApplicationSortOptions } from '../enums';
import { PaginationDto } from './pagination.dto';

export class GetApplicationsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @MinLength(0)
  facilityName: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @MinLength(0)
  confirmationId: string;

  @IsOptional()
  @IsEnum(OrderByOptions)
  order = OrderByOptions.ASC;

  @IsOptional()
  @IsEnum(ApplicationSortOptions)
  orderBy = ApplicationSortOptions.FACILITY_NAME;
}
