import { IsString, MaxLength, MinLength } from 'class-validator';

export class AssignToUserDto {
  @IsString()
  @MaxLength(100)
  @MinLength(0)
  userId: string;
}
