import { Controller } from '@nestjs/common';
import { FormMetaDataService } from './formmetadata.service';

@Controller('forms')
export class FormMetaDataController {
  constructor(private formMetaDataService: FormMetaDataService) {}
}
