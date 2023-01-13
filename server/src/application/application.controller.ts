import { SUCCESS_RESPONSE } from '../common/constants';
import { SaveApplicationDto } from '../common/dto/save-application.dto';
import { GetApplicationsDto } from '../common/dto/get-applications.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';
import { PaginationRO } from '../common/ro/pagination.ro';
import { CommentDto } from '../comments/dto/comment.dto';
import { GetUser } from '../common/decorator';
import { Comment } from '../comments/comment.entity';
import { AssignToUserDto } from '../common/dto/assign-to-user.dto';
import { User } from '../user/user.entity';
import { CommentResultRo } from './ro/app-comment.ro';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ScoreDto, WorkshopScoreDto } from '../score/dto/score.dto';

@ApiBearerAuth()
@Controller('applications')
@ApiTags('application')
@UseInterceptors(ClassSerializerInterceptor)
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('/:applicationId')
  getApplication(@Param('applicationId') applicationId: string) {
    return this.applicationService.getApplication(applicationId);
  }

  @Get()
  getApplications(@Query() query: GetApplicationsDto): Promise<PaginationRO<Application>> {
    return this.applicationService.getApplications(query);
  }

  @Patch('/:applicationId')
  async saveApplication(
    // To-do: Get the logged-in user data (id) as well
    // and allow to update only the applications that belong to them.
    @Param('applicationId') applicationId: string,
    @Body() applicationDto: SaveApplicationDto
  ) {
    await this.applicationService.updateApplication(applicationId, applicationDto);
    return SUCCESS_RESPONSE;
  }

  @Patch('/:applicationId/assign')
  async assignToUser(
    @Param('applicationId') applicationId: string,
    @Body() assignToUserDto: AssignToUserDto,
    @GetUser() user: User
  ): Promise<any> {
    await this.applicationService.assignToUser(applicationId, assignToUserDto, user);
    return SUCCESS_RESPONSE;
  }

  @Patch('/:applicationId/unassign')
  async unassignUser(
    @Param('applicationId') applicationId: string,
    @GetUser() user: User
  ): Promise<any> {
    await this.applicationService.unassignUser(applicationId, user);
    return SUCCESS_RESPONSE;
  }

  @Get('/:applicationId/comments')
  async getComments(@Param('applicationId') applicationId: string): Promise<CommentResultRo> {
    return await this.applicationService.getComments(applicationId);
  }

  @Post('/:applicationId/comments')
  async createComment(
    @Param('applicationId') applicationId: string,
    @Body() commentDto: CommentDto,
    @GetUser() user: User
  ): Promise<Comment> {
    return await this.applicationService.createComment(applicationId, commentDto, user);
  }

  @Patch('/:applicationId/status')
  async updateStatus(
    @Param('applicationId') applicationId: string,
    @Body() statusDto: UpdateStatusDto,
    @GetUser() user: User
  ): Promise<any> {
    await this.applicationService.updateStatus(applicationId, statusDto, user);
    return SUCCESS_RESPONSE;
  }

  // Broader Review Score Section
  @Get('/:applicationId/scores')
  async getScores(@Param('applicationId') applicationId: string) {
    return this.applicationService.getBroaderReviewScores(applicationId);
  }

  @Post('/:applicationId/scores')
  async createScore(
    @Body() scoreDto: ScoreDto,
    @GetUser() user: User,
    @Param('applicationId') applicationId: string
  ) {
    return this.applicationService.createBroaderReviewScore(user, applicationId, scoreDto);
  }

  @Patch('/:applicationId/scores/:scoreId')
  async updateScore(
    @Param('applicationId') applicationId: string,
    @Param('scoreId') scoreId: string,
    @Body() scoreDto: ScoreDto,
    @GetUser() user: User
  ) {
    return this.applicationService.updateBroaderReviewScore(user, applicationId, scoreId, scoreDto);
  }

  // Workshop Score Section
  @Get('/:applicationId/workshop-scores')
  async getWorkshopScores(@Param('applicationId') applicationId: string) {
    return this.applicationService.getWorkshopScores(applicationId);
  }

  @Post('/:applicationId/workshop-scores')
  async createWorkshopScore(
    @Body() scoreDto: WorkshopScoreDto,
    @GetUser() user: User,
    @Param('applicationId') applicationId: string
  ) {
    return this.applicationService.createWorkshopScore(user, applicationId, scoreDto);
  }

  @Patch('/:applicationId/workshop-scores/:scoreId')
  async updateWorkshopScore(
    @Param('applicationId') applicationId: string,
    @Param('scoreId') scoreId: string,
    @Body() scoreDto: WorkshopScoreDto,
    @GetUser() user: User
  ) {
    return this.applicationService.updateWorkshopScore(user, applicationId, scoreId, scoreDto);
  }
}
