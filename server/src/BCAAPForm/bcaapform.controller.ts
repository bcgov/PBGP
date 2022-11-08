import { Controller } from '@nestjs/common';
import { BCAAPFormService } from './bcaapform.service';

@Controller('forms')
export class BCAAPFormController {
  constructor(private bcaapFormService: BCAAPFormService) {}
}
