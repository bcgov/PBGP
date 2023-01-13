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
    return await this.scoreRepository.find({
      where: { application: applicationId },
      relations: ['user'],
      loadRelationIds: true,
    });
  }

  async getBroaderReviewScore(id: string) {
    const score = await this.scoreRepository.findOne(id, { relations: ['user', 'application'] });
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
    // const scoreObj = { finalScore: 0, data: scoreDto, overallComments: scoreDto.overallComments}
    const score = this.scoreRepository.create(scoreDto);
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
    if (score.user.id !== user.id) {
      throw new GenericException(BroaderReviewScoreError.USER_MISMATCH);
    }
    if (score.application.id !== application.id) {
      throw new GenericException(BroaderReviewScoreError.APPLICATION_MISMATCH);
    }
    return this.scoreRepository.save({ ...score, ...scoreDto });
  }
}
