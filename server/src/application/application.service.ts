import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { Repository } from 'typeorm';
import { SaveApplicationDto } from '@/common/dto/save-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>
  ) {}

  async getApplication(applicationId: string): Promise<Application | undefined> {
    const application = await this.applicationRepository.findOne(applicationId);

    if (application) {
      return application;
    }

    return;
  }

  async createApplication(): Promise<Application> {
    const application = this.applicationRepository.create();

    await this.applicationRepository.save(application);

    return application;
  }

  async saveApplication(applicationId: string, applicationDto: SaveApplicationDto): Promise<void> {
    await this.applicationRepository.update(applicationId, applicationDto);
  }
}
