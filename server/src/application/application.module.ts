import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comments/comment.module';
import { BroaderReviewScoreModule } from '../score/broader-review-score.module';
import { WorkshopScoreModule } from '../score/workshop-score.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    UserModule,
    CommentModule,
    BroaderReviewScoreModule,
    WorkshopScoreModule,
  ],
  exports: [ApplicationService],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
