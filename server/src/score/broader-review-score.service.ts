import { Application } from '@/application/application.entity';
import { GenericException } from '@/common/generic-exception';
import { User } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoreDto } from './dto/score.dto';
import { BroaderReviewScore } from './broader-review-score.entity';
import { BroaderReviewScoreError } from './broader-review-score.errors';

@Injectable()
export class BroaderReviewScoreService {
  constructor(
    @InjectRepository(BroaderReviewScore)
    private scoreRepository: Repository<BroaderReviewScore>
  ) {}

  async getBroaderReviewScores(applicationId: string) {
    return await this.scoreRepository.find({ id: applicationId });
  }

  async getBroaderReviewScore(id: string) {
    const score = await this.scoreRepository.findOne(id);
    if (!score) {
      throw new GenericException(BroaderReviewScoreError.SCORE_NOT_FOUND);
    }
    return score;
  }

  async createBroaderReviewScore(
    user: User,
    application: Application,
    scoreDto: ScoreDto
  ): Promise<BroaderReviewScore> {
    const score = await this.scoreRepository.create(scoreDto);
    score.user = user;
    score.application = application;

    return this.scoreRepository.save(score);
  }

  async updateBroaderReviewScore(
    user: User,
    application: Application,
    scoreId: string,
    scoreDto: ScoreDto
  ): Promise<BroaderReviewScore> {
    const score = await this.getBroaderReviewScore(scoreId);
    if (score.userId !== user.id) {
      throw new GenericException(BroaderReviewScoreError.USER_MISMATCH);
    }
    if (score.applicationId !== application.id) {
      throw new GenericException(BroaderReviewScoreError.APPLICATION_MISMATCH);
    }
    return this.scoreRepository.save({ ...score, ...scoreDto });
  }
}
