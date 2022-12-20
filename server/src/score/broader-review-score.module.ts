import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BroaderReviewScore } from './broader-review-score.entity';
import { BroaderReviewScoreService } from './broader-review-score.service';

@Module({
  imports: [TypeOrmModule.forFeature([BroaderReviewScore])],
  exports: [BroaderReviewScoreService],
  controllers: [],
  providers: [BroaderReviewScoreService],
})
export class BroaderReviewScoreModule {}
