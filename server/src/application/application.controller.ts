import { SUCCESS_RESPONSE, UserRoles } from '../common/constants';
import { SaveApplicationDto } from '../common/dto/save-application.dto';
import { GetApplicationsDto } from '../common/dto/get-applications.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';
import { PaginationRO } from '../common/ro/pagination.ro';
import { Roles } from '../common/decorator';
import { AssignToUserDto } from '../common/dto/assign-to-user.dto';

@ApiBearerAuth()
@Controller('applications')
@ApiTags('application')
@UseInterceptors(ClassSerializerInterceptor)
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('/:applicationId')
  getApplication(@Param('applicationId') applicationId: string) {
    // To-do: Get the logged-in user data (id) and return only
    // the applicatio that belong to them.
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

  @Patch('/:applicationId/assign-to-user')
  @Roles(UserRoles.ADMIN)
  async assignToUser(
    @Param('applicationId') applicationId: string,
    @Body() assignToUserDto: AssignToUserDto
  ): Promise<void> {
    return this.applicationService.assignToUser(applicationId, assignToUserDto);
  }
}
