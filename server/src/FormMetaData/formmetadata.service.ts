import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormMetaData } from './formmetadata.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormMetaDataService {
  constructor(
    @InjectRepository(FormMetaData)
    private formMetaDataRepository: Repository<FormMetaData>
  ) {}
}
