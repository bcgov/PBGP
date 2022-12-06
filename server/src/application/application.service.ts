import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { SaveApplicationDto } from '../common/dto/save-application.dto';
import { GetApplicationsDto } from '../common/dto/get-applications.dto';
import { Repository } from 'typeorm';
import { PaginationRO } from '../common/ro/pagination.ro';
import { FormMetaData } from '../FormMetaData/formmetadata.entity';
import { UserService } from '../user/user.service';
import { AssignToUserDto } from '../common/dto/assign-to-user.dto';
import { Comment } from '../comments/comment.entity';
import { CommentDto } from '../comments/dto/comment.dto';
import { User } from '../user/user.entity';
import { CommentResultRo } from './ro/app-comment.ro';
import { CommentService } from '../comments/comment.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  async getApplications(query: GetApplicationsDto): Promise<PaginationRO<Application>> | null {
    const queryBuilder = this.applicationRepository.createQueryBuilder('app');

    if (query.facilityName) {
      queryBuilder.andWhere('app.facilityName ILIKE :facilityName', {
        facilityName: `%${query.facilityName}%`,
      });
    }

    if (query.confirmationId) {
      queryBuilder.andWhere('app.confirmationId = :confirmationId', {
        confirmationId: query.confirmationId,
      });
    }

    if (query.assignedTo) {
      queryBuilder.andWhere('app.assignedTo = :assignedTo', {
        assignedTo: query.assignedTo,
      });
    }

    if (query.orderBy) {
      queryBuilder.orderBy({ [`app.${query.orderBy}`]: query.order });
    }

    query.filter(queryBuilder);

    const applications = await queryBuilder.getManyAndCount();
    return new PaginationRO<Application>(applications);
  }

  async getApplication(applicationId: string): Promise<Application | undefined> {
    const application = await this.applicationRepository.findOne(applicationId, {
      relations: ['user', 'form'],
    });

    if (application) {
      return application;
    }

    return;
  }

  async createApplication(
    applicationDto: SaveApplicationDto,
    formMetaData: FormMetaData
  ): Promise<Application> {
    const application = this.applicationRepository.create(applicationDto);
    application.form = formMetaData;

    return await this.applicationRepository.save(application);
  }

  async updateApplication(
    applicationId: string,
    applicationDto: SaveApplicationDto
  ): Promise<void> {
    await this.applicationRepository.update(applicationId, applicationDto);
  }

  async assignToUser(applicationId: string, assignToUserDto: AssignToUserDto): Promise<void> {
    const application = await this.getApplication(applicationId);
    if (application) {
      const user = await this.userService.getUser(assignToUserDto.userId);
      if (user) {
        application.assignedTo = user;
      }
      await this.applicationRepository.save(application);
    }
  }

  async unassignUser(applicationId: string): Promise<void> {
    const application = await this.getApplication(applicationId);
    if (application) {
      // simplified for now, but if there are multiple users that
      // can be assigned/unassigned - will need to include the passed
      // user ID's.
      application.assignedTo = null;
    }
    await this.applicationRepository.save(application);
  }

  async getComments(applicationId: string): Promise<CommentResultRo> {
    const res = await this.commentService.getAllComments(applicationId);
    if (res.length > 0) {
      return new CommentResultRo(res);
    }
    return;
  }

  async createComment(applicationId: string, commentDto: CommentDto, user: User): Promise<Comment> {
    const application = await this.getApplication(applicationId);
    if (application && user) {
      return await this.commentService.createComment(commentDto, application, user);
    }
    return;
  }
}
