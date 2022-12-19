import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { ScoreService } from './score.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  exports: [ScoreService],
  controllers: [],
  providers: [ScoreService],
})
export class ScoreModule {}
