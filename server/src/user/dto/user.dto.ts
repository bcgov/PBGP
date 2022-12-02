import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(100)
  @MinLength(4)
  userId: string;

  @IsString()
  @MaxLength(100)
  @MinLength(4)
  userName: string;

  @IsString()
  @MaxLength(200)
  @MinLength(4)
  displayName: string;

  @IsString()
  @MaxLength(100)
  @MinLength(4)
  externalId: string;

  @IsBoolean()
  @IsOptional()
  isAuthorized: boolean;

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
