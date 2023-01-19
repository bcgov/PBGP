import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkshopScore } from './workshop-score.entity';
import { WorkshopScoreService } from './workshop-score.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkshopScore])],
  exports: [WorkshopScoreService],
  controllers: [],
  providers: [WorkshopScoreService],
})
export class WorkshopScoreModule {}
