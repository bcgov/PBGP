import { Application } from '@/application/application.entity';
import { GenericException } from '@/common/generic-exception';
import { User } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoreDto } from './dto/score.dto';
import { Score } from './score.entity';
import { ScoreError } from './score.errors';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>
  ) {}

  async getScores(applicationId: string) {
    return await this.scoreRepository.find({ id: applicationId });
  }

  async getScore(id: string) {
    const score = await this.scoreRepository.findOne(id);
    if (!score) {
      throw new GenericException(ScoreError.SCORE_NOT_FOUND);
    }
    return score;
  }

  async createScore(user: User, application: Application, scoreDto: ScoreDto): Promise<Score> {
    const score = await this.scoreRepository.create(scoreDto);
    score.user = user;
    score.application = application;

    return this.scoreRepository.save(score);
  }

  async updateScore(
    user: User,
    application: Application,
    scoreId: string,
    scoreDto: ScoreDto
  ): Promise<Score> {
    const score = await this.getScore(scoreId);
    if (score.userId !== user.id) {
      throw new GenericException(ScoreError.USER_MISMATCH);
    }
    if (score.applicationId !== application.id) {
      throw new GenericException(ScoreError.APPLICATION_MISMATCH);
    }
    return this.scoreRepository.save({ ...score, ...scoreDto });
  }
}
