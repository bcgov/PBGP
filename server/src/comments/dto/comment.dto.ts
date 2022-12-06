import { IsString, MaxLength, MinLength } from 'class-validator';

export class CommentDto {
  @IsString()
  @MaxLength(2000)
  @MinLength(4)
  comment: string;
}
