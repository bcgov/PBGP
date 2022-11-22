import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(100)
  @MinLength(10)
  externalId: string;

  @IsString()
  @MaxLength(100)
  @MinLength(4)
  userName: string;

  @IsString()
  @MaxLength(200)
  @MinLength(4)
  displayName: string;

  @IsBoolean()
  isAuthorized = false;

  @IsBoolean()
  isAdmin = false;
}
