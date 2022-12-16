import { Application } from '@/application/application.entity';
import { ApplicationService } from '@/application/application.service';
import { User } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoreDto } from './dto/score.dto';
import { Score } from './score.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    private applicationService: ApplicationService
  ) {}

  async createScore(user: User, scoreDto: ScoreDto): Promise<Score> {
    const score = await this.scoreRepository.create(scoreDto);
    const application = await this.applicationService.getApplication(scoreDto.applicationId);
    score.user = user;
    score.application = application;

    return this.scoreRepository.save(score);
  }
}
