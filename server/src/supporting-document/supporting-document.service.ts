import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportingDocument } from './supporting-document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupportingDocumentService {
  constructor(
    @InjectRepository(SupportingDocument)
    private supportingDocumentRepository: Repository<SupportingDocument>
  ) {}
}
