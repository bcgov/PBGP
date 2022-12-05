import { Application } from '@/application/application.entity';
import { User } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  async getAppUserAndComments(applicationId: string) {
    const query = this.commentRepository
      .createQueryBuilder('cmt')
      .select(
        `usr.id as "userId", 
        usr.displayName as "displayName",
        cmt.id as "commentId", 
        cmt.comment, 
        cmt.createdAt as "createdAt"`
      )
      .innerJoin(Application, 'app', 'cmt.application_id = app.id')
      .innerJoin(User, 'usr', 'usr.id = cmt.user_id')
      .where('app.id = :id', { id: applicationId })
      .orderBy('cmt.createdAt', 'ASC');

    return await query.execute();
  }

  async createComment(
    commentDto: CommentDto,
    application: Application,
    user: User
  ): Promise<Comment> {
    const comment = this.commentRepository.create(commentDto);
    comment.application = application;
    comment.userId = user.id;

    return await this.commentRepository.save(comment);
  }
}
