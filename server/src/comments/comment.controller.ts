import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';

@ApiBearerAuth()
@Controller('comments')
@ApiTags('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}
}
