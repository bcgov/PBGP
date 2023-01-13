import { Application } from '../application/application.entity';
import { GenericException } from '../common/generic-exception';
import { User } from '../user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkshopScoreDto } from './dto/score.dto';
import { ScoreError } from './score.errors';
import { WorkshopScore } from './workshop-score.entity';

@Injectable()
export class WorkshopScoreService {
  constructor(
    @InjectRepository(WorkshopScore)
    private workshopScoreRepository: Repository<WorkshopScore>
  ) {}

  async getWorkshopScores(applicationId: string) {
    return await this.workshopScoreRepository.find({
      where: { application: applicationId },
      relations: ['user'],
      loadRelationIds: true,
    });
  }

  async getWorkshopScore(id: string) {
    const score = await this.workshopScoreRepository.findOne(id, {
      relations: ['user', 'application'],
    });
    if (!score) {
      throw new GenericException(ScoreError.SCORE_NOT_FOUND);
    }
    return score;
  }

  async createWorkshopScore(
    user: User,
    application: Application,
    scoreDto: WorkshopScoreDto
  ): Promise<WorkshopScore> {
    const score = await this.workshopScoreRepository.create(scoreDto);
    score.user = user;
    score.application = application;

    return this.workshopScoreRepository.save(score);
  }

  async updateWorkshopScore(
    user: User,
    application: Application,
    scoreId: string,
    scoreDto: WorkshopScoreDto
  ): Promise<WorkshopScore> {
    const score = await this.getWorkshopScore(scoreId);
    if (score.user.id !== user.id) {
      throw new GenericException(ScoreError.USER_MISMATCH);
    }
    if (score.application.id !== application.id) {
      throw new GenericException(ScoreError.APPLICATION_MISMATCH);
    }
    return this.workshopScoreRepository.save({ ...score, ...scoreDto });
  }
}
