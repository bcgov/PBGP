import { SUCCESS_RESPONSE } from '../common/constants';
import { SaveApplicationDto } from '../common/dto/save-application.dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('/:applicationId')
  getApplication(@Param('applicationId') applicationId: string) {
    // To-do: Get the logged-in user data (id) and return only
    // the applicatio that belong to them.
    return this.applicationService.getApplication(applicationId);
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
