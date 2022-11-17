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
import { ApiBody } from '@nestjs/swagger';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';
import { PaginationRO } from '../common/ro/pagination.ro';

@Controller('applications')
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

  @Post()
  @ApiBody({ type: SaveApplicationDto })
  createApplication(@Body() applicationDto: SaveApplicationDto): Promise<Application> {
    return this.applicationService.createApplication(applicationDto);
  }

  @Patch('/:applicationId')
  @ApiBody({ type: SaveApplicationDto })
  async saveApplication(
    // To-do: Get the logged-in user data (id) as well
    // and allow to update only the applications that belong to them.
    @Param('applicationId') applicationId: string,
    @Body() applicationDto: SaveApplicationDto
  ) {
    await this.applicationService.updateApplication(applicationId, applicationDto);
    return SUCCESS_RESPONSE;
  }
}
