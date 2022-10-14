import { Controller } from '@nestjs/common';
// import { BCAAPApplication } from './bcaap-application.entity';
import { BCAAPApplicationService } from './bcaap-application.service';

@Controller('bcaap-applications')
export class BCAAPApplicationController {
  constructor(private BCAAPApplicationService: BCAAPApplicationService) {}
}
