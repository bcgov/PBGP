import { Application } from '../application/application.entity';
import { GenericException } from '../common/generic-exception';
import { User } from '../user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoreDto } from './dto/score.dto';
import { ScoreError } from './score.errors';
import { WorkshopScore } from './workshop-score.entity';
import { CompletionStatus } from '../common/enums';

@Injectable()
export class WorkshopScoreService {
  constructor(
    @InjectRepository(WorkshopScore)
    private workshopScoreRepository: Repository<WorkshopScore>
  ) {}

  async getWorkshopScoreForApplication(applicationId: string) {
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
    scoreDto: ScoreDto
  ): Promise<WorkshopScore> {
    const existingScore = await this.workshopScoreRepository.findOne({
      where: { application },
    });
    if (existingScore) {
      throw new GenericException(ScoreError.SCORE_EXISTS);
    }
    const score = this.workshopScoreRepository.create({ ...scoreDto, user, application });

    return this.workshopScoreRepository.save(score);
  }

  async updateWorkshopScore(
    application: Application,
    scoreId: string,
    scoreDto: ScoreDto
  ): Promise<WorkshopScore> {
    const score = await this.getWorkshopScore(scoreId);

    if (score.application.id !== application.id) {
      throw new GenericException(ScoreError.APPLICATION_MISMATCH);
    }
    return this.workshopScoreRepository.save({ ...score, ...scoreDto });
  }

  async getApplicationDetailsWithFinalScore(applicationId: string): Promise<WorkshopScore> {
    return this.workshopScoreRepository
      .createQueryBuilder('workshop')
      .innerJoinAndSelect('workshop.application', 'application')
      .innerJoinAndSelect('application.form', 'form')
      .where('application.id = :applicationId', { applicationId })
      .andWhere('workshop.completionStatus = :status', { status: CompletionStatus.COMPLETE })
      .getOne();
  }
}
