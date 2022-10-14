import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BCAAPApplication } from './bcaap-application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BCAAPApplicationService {
  constructor(
    @InjectRepository(BCAAPApplication)
    private BCAAPApplicationRepository: Repository<BCAAPApplication>
  ) {}
}
