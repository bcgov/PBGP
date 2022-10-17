import { Controller, Get, Param, Post } from '@nestjs/common';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('/:applicationId')
  getCurrentProfileSelection(@Param('applicationId') applicationId: string) {
    return this.applicationService.getApplication(applicationId);
  }

  @Post()
  createApplication(): Promise<Application> {
    return this.applicationService.createApplication();
  }
}
