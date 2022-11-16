import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';
import { OrderByOptions } from '../enums';
import { PaginationDto } from './pagination.dto';

export class GetApplicationsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  facilityName = '';

  @IsOptional()
  @IsEnum(OrderByOptions)
  order = OrderByOptions.ASC;

  @IsOptional()
  @IsString()
  orderBy = 'facilityName';

  filter(query: SelectQueryBuilder<any>): SelectQueryBuilder<any> {
    return super.filter(query);
  }
}
