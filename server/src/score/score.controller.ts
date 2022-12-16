import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ScoreService } from './score.service';

@ApiBearerAuth()
@Controller('scores')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}
}
