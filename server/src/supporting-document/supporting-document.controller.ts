import { Controller } from '@nestjs/common';
import { SupportingDocumentService } from './supporting-document.service';

@Controller('supporting-documents')
export class SupportingDocumentController {
  constructor(private supportingDocumentService: SupportingDocumentService) {}
}
