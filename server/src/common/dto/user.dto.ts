import { IsBoolean, IsOptional } from 'class-validator';

export class UserAccessDto {
  @IsBoolean()
  @IsOptional()
  isAuthorized?: boolean;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
