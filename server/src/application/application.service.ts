import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { SaveApplicationDto } from '@/common/dto/save-application.dto';
import { GetApplicationsQuery } from '@/common/interfaces';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>
  ) {}

  async getApplications(query: GetApplicationsQuery): Promise<Application[]> | null {
    const facilityName = query.facilityName;
    const orderBy = query.orderBy ? query.orderBy : 'facilityName';
    const order = query.order || 'ASC';
    const skip = query.skip || 0;
    const take = query.take || 25;

    const queryBuilder = this.applicationRepository
      .createQueryBuilder('app')
      .orderBy(`app.${orderBy}`, order)
      .skip(skip)
      .take(take);

    if (facilityName) queryBuilder.andWhere('app.facilityName = :facilityName', { facilityName });

    const applications = await queryBuilder.getMany();

    return applications;
  }

  async getApplication(applicationId: string): Promise<Application | undefined> {
    const application = await this.applicationRepository.findOne(applicationId);

    if (application) {
      return application;
    }

    return;
  }

  async createApplication(applicationDto: SaveApplicationDto): Promise<Application> {
    const application = this.applicationRepository.create(applicationDto);

    await this.applicationRepository.save(application);

    return application;
  }

  async updateApplication(
    applicationId: string,
    applicationDto: SaveApplicationDto
  ): Promise<void> {
    await this.applicationRepository.update(applicationId, applicationDto);
  }
}
