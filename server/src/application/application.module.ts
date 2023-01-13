import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comments/comment.module';
import { BroaderReviewScoreModule } from '../score/broader-review-score.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    UserModule,
    CommentModule,
    BroaderReviewScoreModule,
  ],
  exports: [ApplicationService],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
