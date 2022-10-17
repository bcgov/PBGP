import { Controller } from '@nestjs/common';
// import { Application } from './bcaap-application.entity';
import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}
}
