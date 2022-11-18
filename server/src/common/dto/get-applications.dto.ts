import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { OrderByOptions, ApplicationSortOptions } from '../enums';
import { PaginationDto } from './pagination.dto';

export class GetApplicationsDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @MinLength(0)
  facilityName: string;

  @ApiPropertyOptional({ enum: OrderByOptions })
  @IsOptional()
  @IsEnum(OrderByOptions)
  order = OrderByOptions.ASC;

  @ApiPropertyOptional({ enum: ApplicationSortOptions })
  @IsOptional()
  @IsEnum(ApplicationSortOptions)
  orderBy = ApplicationSortOptions.FACILITY_NAME;
}
