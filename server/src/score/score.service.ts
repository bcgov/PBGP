import { ApplicationService } from '@/application/application.service';
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
    private scoreRepository: Repository<Score>,
    private applicationService: ApplicationService
  ) {}

  async getScore(id: string) {
    const score = await this.scoreRepository.findOne(id);
    if (!score) {
      throw new GenericException(ScoreError.SCORE_NOT_FOUND);
    }
    return score;
  }

  async createScore(user: User, scoreDto: ScoreDto): Promise<Score> {
    const score = await this.scoreRepository.create(scoreDto);
    const application = await this.applicationService.getApplication(scoreDto.applicationId);
    score.user = user;
    score.application = application;

    return this.scoreRepository.save(score);
  }

  async updateScore(scoreId: string, scoreDto: ScoreDto, user: User): Promise<Score> {
    const score = await this.getScore(scoreId);
    const application = await this.applicationService.getApplication(scoreDto.applicationId);
    if (score.userId !== user.id) {
      throw new GenericException(ScoreError.USER_MISMATCH);
    }
    if (score.applicationId !== application.id) {
      throw new GenericException(ScoreError.APPLICATION_MISMATCH);
    }
    return this.scoreRepository.save({ ...score, ...scoreDto });
  }
}
