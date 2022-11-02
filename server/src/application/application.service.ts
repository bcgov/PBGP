import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { In, Repository } from 'typeorm';
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

  async getOrCreateApplication(userId): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { user: userId, isSubmitted: false },
    });

    return application ? application : this.createApplication();
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
