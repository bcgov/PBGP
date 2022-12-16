import { ApplicationModule } from '@/application/application.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreController } from './score.controller';
import { Score } from './score.entity';
import { ScoreService } from './score.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score]), ApplicationModule],
  exports: [ScoreService],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
