import { GetUser } from '@/common/decorator';
import { User } from '@/user/user.entity';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ScoreDto } from './dto/score.dto';
import { ScoreService } from './score.service';

@ApiBearerAuth()
@Controller('scores')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @Get()
  async getScores() {}

  @Get('/:id')
  async getScore() {}

  @Post()
  async createScore(@Body() scoreDto: ScoreDto, @GetUser() user: User) {
    return this.scoreService.createScore(user, scoreDto);
  }

  @Patch('/:id')
  async updateScore(@Param('id') scoreId: string, @Body() ScoreDto: ScoreDto) {}
}
