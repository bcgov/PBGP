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
    @Body() assignToUserDto: AssignToUserDto
  ): Promise<void> {
    return this.applicationService.assignToUser(applicationId, assignToUserDto);
  }

  @Patch('/:applicationId/unassign')
  async unassignUser(@Param('applicationId') applicationId: string): Promise<void> {
    return this.applicationService.unassignUser(applicationId);
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
}
