import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';
import { OrderByOptions, ApplicationSortOptions } from '../enums';
import { PaginationDto } from './pagination.dto';

export class GetApplicationsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @MinLength(0)
  facilityName = '';

  @IsOptional()
  @IsEnum(OrderByOptions)
  order = OrderByOptions.ASC;

  @IsOptional()
  @IsEnum(ApplicationSortOptions)
  orderBy = ApplicationSortOptions.FACILITY_NAME;

  filter(query: SelectQueryBuilder<any>): SelectQueryBuilder<any> {
    return super.filter(query);
  }
}
