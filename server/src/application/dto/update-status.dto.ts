import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApplicationStatus } from '../constants';

export class UpdateStatusDto {
  @ApiProperty({ enum: ApplicationStatus })
  @IsString()
  @IsNotEmpty()
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
