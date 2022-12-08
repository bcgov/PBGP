import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class AttachmentDto {
  @IsString()
  @MaxLength(100)
  @MinLength(4)
  id: string;

  @IsString()
  @MaxLength(200)
  @MinLength(4)
  url: string;

  @IsString()
  @IsOptional()
  data: string;
}
