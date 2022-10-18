import { Controller, Get, Param, Post } from '@nestjs/common';
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
  createApplication(): Promise<Application> {
    return this.applicationService.createApplication();
  }
}
