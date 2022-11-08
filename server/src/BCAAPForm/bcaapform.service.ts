import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BCAAPForm } from './bcaapform.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BCAAPFormService {
  constructor(
    @InjectRepository(BCAAPForm)
    private bcaapFormRepository: Repository<BCAAPForm>
  ) {}
}
