import { IsBoolean, IsJSON, IsString, MaxLength, MinLength } from 'class-validator';

export class FormMetaDataDto {
  @IsString()
  @MaxLength(200)
  @MinLength(5)
  name: string;

  @IsString()
  @MaxLength(2000)
  @MinLength(0)
  description: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  @MaxLength(100)
  @MinLength(5)
  chefsFormId: string;

  @IsString()
  @MaxLength(100)
  @MinLength(5)
  versionId: string;

  @IsJSON()
  versionSchema: any;
}
